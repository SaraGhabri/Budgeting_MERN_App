import api from './api';

const categoryService = {
  // Récupérer toutes les catégories
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Récupérer une catégorie par ID
  getById: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // Créer une catégorie
  create: async (categoryData) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },

  // Mettre à jour une catégorie
  update: async (id, categoryData) => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  // Supprimer une catégorie
  delete: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  }
};

export default categoryService;