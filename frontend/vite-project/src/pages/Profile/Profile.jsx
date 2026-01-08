import { useState, useEffect } from 'react';
import { Edit, Save, X, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import profileService from '../../services/profileService';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    address: '',
    city: '',
    country: '',
    dateOfBirth: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await profileService.get();
      setProfile(data);
      setFormData({
        phoneNumber: data.phoneNumber || '',
        address: data.address || '',
        city: data.city || '',
        country: data.country || '',
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : ''
      });
    } catch (error) {
      if (error.response?.status === 404) {
        setEditing(true);
      } else {
        toast.error('Erreur lors du chargement du profil');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (profile) {
        await profileService.update(formData);
        toast.success('Profil modifié avec succès');
      } else {
        await profileService.create(formData);
        toast.success('Profil créé avec succès');
      }
      loadProfile();
      setEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        phoneNumber: profile.phoneNumber || '',
        address: profile.address || '',
        city: profile.city || '',
        country: profile.country || '',
        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : ''
      });
      setEditing(false);
    }
  };

  if (loading) {
    return (
      <Layout title="Profil">
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Profil">
      <div className="page-header">
        <h2>Mon Profil</h2>
        {!editing && profile && (
          <button onClick={() => setEditing(true)} className="btn btn-primary">
            <Edit />
            Modifier
          </button>
        )}
      </div>

      <div className="table-container profile-container">
        <div className="modal-body">
          <div className="profile-section">
            <h3 className="profile-section-title">Informations du compte</h3>
            
            <div className="profile-info-grid">
              <div className="profile-info-item">
                <div className="profile-info-icon">
                  <User size={20} />
                </div>
                <div>
                  <p className="profile-info-label">Nom</p>
                  <p className="profile-info-value">{user?.name}</p>
                </div>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="profile-info-label">Email</p>
                  <p className="profile-info-value">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="profile-section-title">Informations personnelles</h3>

          {editing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  <Phone size={16} />
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Ex: +216 12 345 678"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <MapPin size={16} />
                  Adresse
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Ex: 123 Avenue Habib Bourguiba"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Ville</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Ex: Tunis"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Pays</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Ex: Tunisie"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Calendar size={16} />
                  Date de naissance
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="profile-form-actions">
                <button type="submit" className="btn btn-primary">
                  <Save />
                  Enregistrer
                </button>
                {profile && (
                  <button type="button" onClick={handleCancel} className="btn btn-secondary">
                    <X />
                    Annuler
                  </button>
                )}
              </div>
            </form>
          ) : profile ? (
            <div className="profile-info-grid">
              <div className="profile-info-item">
                <div className="profile-info-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="profile-info-label">Téléphone</p>
                  <p className="profile-info-value">{profile.phoneNumber || '-'}</p>
                </div>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="profile-info-label">Adresse</p>
                  <p className="profile-info-value">{profile.address || '-'}</p>
                </div>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="profile-info-label">Ville / Pays</p>
                  <p className="profile-info-value">
                    {profile.city && profile.country ? `${profile.city}, ${profile.country}` : profile.city || profile.country || '-'}
                  </p>
                </div>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-icon">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="profile-info-label">Date de naissance</p>
                  <p className="profile-info-value">
                    {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('fr-FR') : '-'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <p>Aucune information de profil. Créez votre profil pour commencer.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;