import api from './api';

const profileService = {
  // Récupérer le profil
  get: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  // Créer un profil
  create: async (profileData) => {
    const response = await api.post('/profile', profileData);
    return response.data;
  },

  // Mettre à jour le profil
  update: async (profileData) => {
    const response = await api.put('/profile', profileData);
    return response.data;
  },

  // Supprimer le profil
  delete: async () => {
    const response = await api.delete('/profile');
    return response.data;
  }
};

export default profileService;

