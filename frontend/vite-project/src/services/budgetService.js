import api from './api';

const budgetService = {
  // Récupérer tous les budgets
  getAll: async () => {
    const response = await api.get('/budgets');
    return response.data;
  },

  // Récupérer un budget par ID
  getById: async (id) => {
    const response = await api.get(`/budgets/${id}`);
    return response.data;
  },

  // Créer un budget
  create: async (budgetData) => {
    const response = await api.post('/budgets', budgetData);
    return response.data;
  },

  // Mettre à jour un budget
  update: async (id, budgetData) => {
    const response = await api.put(`/budgets/${id}`, budgetData);
    return response.data;
  },

  // Supprimer un budget
  delete: async (id) => {
    const response = await api.delete(`/budgets/${id}`);
    return response.data;
  }
};

export default budgetService;