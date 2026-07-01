import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createRecado, deleteRecado, getRecados } from '../services/api';

export default function RecadosPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [recados, setRecados] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [formError, setFormError] = useState('');
  const [listError, setListError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchRecados = useCallback(async () => {
    try {
      const data = await getRecados();
      setRecados(data);
    } catch (err) {
      setListError('Não foi possível carregar os recados.');
    }
  }, []);

  useEffect(() => {
    fetchRecados();
  }, [fetchRecados]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!titulo.trim() || !texto.trim()) {
      setFormError('Preencha o título e o texto.');
      return;
    }
    setFormError('');
    setSubmitting(true);
    try {
      const novoRecado = await createRecado(titulo.trim(), texto.trim());
      setRecados((prev) => [novoRecado, ...prev]);
      setTitulo('');
      setTexto('');
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      await deleteRecado(id);
      setRecados((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setListError('Erro ao excluir recado.');
    } finally {
      setDeletingId(null);
    }
  }

  async function handleLogout() {
    await signOut();
    navigate('/login');
  }

  return (
    <div className="page-wrapper">
      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <span className="header-title">Recados</span>
          <div className="header-right">
            <span className="header-user">Olá, {user?.name}</span>
            <button onClick={handleLogout} className="btn btn-outline btn-sm">
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Formulário de novo recado */}
        <section className="card form-section">
          <h2 className="section-title">Novo recado</h2>

          {formError && <div className="alert alert-error">{formError}</div>}

          <form onSubmit={handleSubmit} className="recado-form">
            <div className="field">
              <label htmlFor="titulo">Título</label>
              <input
                id="titulo"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título do recado"
                maxLength={255}
              />
            </div>

            <div className="field">
              <label htmlFor="texto">Texto</label>
              <textarea
                id="texto"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Escreva seu recado aqui..."
                rows={4}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Adicionando...' : 'Adicionar recado'}
            </button>
          </form>
        </section>

        {/* Lista de recados */}
        <section className="list-section">
          <h2 className="section-title">Meus recados</h2>

          {listError && <div className="alert alert-error">{listError}</div>}

          {recados.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum recado ainda. Adicione o primeiro acima!</p>
            </div>
          ) : (
            <ul className="recados-list">
              {recados.map((recado) => (
                <li key={recado.id} className="recado-item">
                  <div className="recado-body">
                    <h3 className="recado-titulo">{recado.titulo}</h3>
                    <p className="recado-texto">{recado.texto}</p>
                    <span className="recado-data">
                      {new Date(recado.created_at).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(recado.id)}
                    className="btn btn-danger btn-sm"
                    disabled={deletingId === recado.id}
                    aria-label="Excluir recado"
                  >
                    {deletingId === recado.id ? '...' : 'Excluir'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
