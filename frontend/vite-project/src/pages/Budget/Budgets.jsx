import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Wallet } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import budgetService from '../../services/budgetService';
import toast from 'react-hot-toast';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    loadBudgets();
  }, []);

  const loadBudgets = async () => {
    try {
      setLoading(true);
      const data = await budgetService.getAll();
      setBudgets(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des budgets');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (budget = null) => {
    if (budget) {
      setEditingBudget(budget);
      setFormData({
        name: budget.name,
        amount: budget.amount,
        startDate: budget.startDate.split('T')[0],
        endDate: budget.endDate.split('T')[0]
      });
    } else {
      setEditingBudget(null);
      setFormData({ name: '', amount: '', startDate: '', endDate: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBudget(null);
    setFormData({ name: '', amount: '', startDate: '', endDate: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBudget) {
        await budgetService.update(editingBudget._id, formData);
        toast.success('Budget modifié avec succès');
      } else {
        await budgetService.create(formData);
        toast.success('Budget créé avec succès');
      }
      loadBudgets();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce budget ?')) {
      try {
        await budgetService.delete(id);
        toast.success('Budget supprimé avec succès');
        loadBudgets();
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const getBudgetStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) return { label: 'À venir', class: 'info' };
    if (now > end) return { label: 'Terminé', class: 'danger' };
    return { label: 'En cours', class: 'success' };
  };

  return (
    <Layout title="Budgets">
      <div className="page-header">
        <h2>Gestion des Budgets</h2>
        <button onClick={() => openModal()} className="btn btn-primary">
          <Plus />
          Nouveau Budget
        </button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement...</p>
        </div>
      ) : budgets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <Wallet />
          </div>
          <h3 className="empty-title">Aucun budget</h3>
          <p>Créez votre premier budget pour commencer</p>
          <button onClick={() => openModal()} className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <Plus />
            Créer un budget
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Montant</th>
                <th>Date début</th>
                <th>Date fin</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((budget) => {
                const status = getBudgetStatus(budget.startDate, budget.endDate);
                // ✅ FIX: Vérifier que amount existe et est un nombre
                const amount = budget.amount || 0;
                return (
                  <tr key={budget._id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {budget.name}
                    </td>
                    <td>{Number(amount).toFixed(2)} TND</td>
                    <td>{new Date(budget.startDate).toLocaleDateString('fr-FR')}</td>
                    <td>{new Date(budget.endDate).toLocaleDateString('fr-FR')}</td>
                    <td>
                      <span className={`badge ${status.class}`}>{status.label}</span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          onClick={() => openModal(budget)}
                          className="icon-btn edit"
                          title="Modifier"
                        >
                          <Edit />
                        </button>
                        <button
                          onClick={() => handleDelete(budget._id)}
                          className="icon-btn delete"
                          title="Supprimer"
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingBudget ? 'Modifier le budget' : 'Nouveau budget'}
              </h3>
              <button onClick={closeModal} className="modal-close">
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Nom du budget *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Ex: Budget mensuel"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Montant (TND) *</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Ex: 1000"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Date de début *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Date de fin *</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={closeModal} className="btn btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingBudget ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Budgets;