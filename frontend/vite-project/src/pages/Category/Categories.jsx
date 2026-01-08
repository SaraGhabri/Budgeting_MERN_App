import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Tag } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import categoryService from '../../services/categoryService';
import toast from 'react-hot-toast';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des catégories');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || ''
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', description: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await categoryService.update(editingCategory._id, formData);
        toast.success('Catégorie modifiée avec succès');
      } else {
        await categoryService.create(formData);
        toast.success('Catégorie créée avec succès');
      }
      loadCategories();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        await categoryService.delete(id);
        toast.success('Catégorie supprimée avec succès');
        loadCategories();
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  return (
    <Layout title="Catégories">
      <div className="page-header">
        <h2>Gestion des Catégories</h2>
        <button onClick={() => openModal()} className="btn btn-primary">
          <Plus />
          Nouvelle Catégorie
        </button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <Tag />
          </div>
          <h3 className="empty-title">Aucune catégorie</h3>
          <p>Créez votre première catégorie pour organiser vos dépenses</p>
          <button onClick={() => openModal()} className="btn btn-primary">
            <Plus />
            Créer une catégorie
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Date de création</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="category-name">{category.name}</td>
                  <td className="category-description">{category.description || '-'}</td>
                  <td>{new Date(category.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        onClick={() => openModal(category)}
                        className="icon-btn edit"
                        title="Modifier"
                      >
                        <Edit />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
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

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
              </h3>
              <button onClick={closeModal} className="modal-close">
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Nom de la catégorie *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Ex: Alimentation, Transport, Loisirs..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description (optionnelle)</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Décrivez cette catégorie..."
                    rows="3"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={closeModal} className="btn btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCategory ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Categories;