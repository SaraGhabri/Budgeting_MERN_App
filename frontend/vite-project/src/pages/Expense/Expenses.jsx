
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Receipt } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import expenseService from '../../services/expenseService';
import budgetService from '../../services/budgetService';
import categoryService from '../../services/categoryService';
import toast from 'react-hot-toast';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    budget: '',
    category: ''
  });

  // Charger les données
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [expensesData, budgetsData, categoriesData] = await Promise.all([
        expenseService.getAll(),
        budgetService.getAll(),
        categoryService.getAll()
      ]);
      setExpenses(expensesData);
      setBudgets(budgetsData);
      setCategories(categoriesData);
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  // Ouvrir le modal
  const openModal = (expense = null) => {
    if (expense) {
      setEditingExpense(expense);
      setFormData({
        description: expense.description,
        amount: expense.amount,
        date: expense.date.split('T')[0],
        budget: expense.budget?._id || '',
        category: expense.category?._id || ''
      });
    } else {
      setEditingExpense(null);
      setFormData({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        budget: '',
        category: ''
      });
    }
    setShowModal(true);
  };

  // Fermer le modal
  const closeModal = () => {
    setShowModal(false);
    setEditingExpense(null);
  };

  // Gérer les changements
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExpense) {
        await expenseService.update(editingExpense._id, formData);
        toast.success('Dépense modifiée avec succès');
      } else {
        await expenseService.create(formData);
        toast.success('Dépense créée avec succès');
      }
      loadData();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  // Supprimer une dépense
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
      try {
        await expenseService.delete(id);
        toast.success('Dépense supprimée avec succès');
        loadData();
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  return (
    <Layout title="Dépenses">
      <div className="page-header">
        <h2>Gestion des Dépenses</h2>
        <button onClick={() => openModal()} className="btn btn-primary">
          <Plus />
          Nouvelle Dépense
        </button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement...</p>
        </div>
      ) : expenses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <Receipt />
          </div>
          <h3 className="empty-title">Aucune dépense</h3>
          <p>Ajoutez votre première dépense</p>
          <button onClick={() => openModal()} className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <Plus />
            Ajouter une dépense
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Montant</th>
                <th>Date</th>
                <th>Budget</th>
                <th>Catégorie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense._id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {expense.description}
                  </td>
                  <td>{expense.amount.toFixed(2)} TND</td>
                  <td>{new Date(expense.date).toLocaleDateString('fr-FR')}</td>
                  <td>
                    {expense.budget ? (
                      <span className="badge info">{expense.budget.name}</span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {expense.category ? (
                      <span className="badge success">{expense.category.name}</span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        onClick={() => openModal(expense)}
                        className="icon-btn edit"
                        title="Modifier"
                      >
                        <Edit />
                      </button>
                      <button
                        onClick={() => handleDelete(expense._id)}
                        className="icon-btn delete"
                        title="Supprimer"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Create/Edit */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingExpense ? 'Modifier la dépense' : 'Nouvelle dépense'}
              </h3>
              <button onClick={closeModal} className="modal-close">
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Ex: Courses alimentaires"
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
                    placeholder="Ex: 50.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Budget *</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >

                    <option value="">Sélectionner un budget</option>
                    {budgets.map((budget) => (
                      <option key={budget._id} value={budget._id}>
                        {budget.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Catégorie *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                    required 
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={closeModal} className="btn btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingExpense ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Expenses;

