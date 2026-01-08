import api from './api';

const expenseService = {
  // Récupérer toutes les dépenses
  getAll: async () => {
    const response = await api.get('/expenses');
    return response.data;
  },

  // Récupérer une dépense par ID
  getById: async (id) => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },

  // Créer une dépense
  create: async (expenseData) => {
    const response = await api.post('/expenses', expenseData);
    return response.data;
  },

  // Mettre à jour une dépense
  update: async (id, expenseData) => {
    const response = await api.put(`/expenses/${id}`, expenseData);
    return response.data;
  },

  // Supprimer une dépense
  delete: async (id) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  }
};

export default expenseService;