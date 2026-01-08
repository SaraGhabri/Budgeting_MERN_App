import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, TrendingUp, TrendingDown, PlusCircle } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBudgets: 0,
    totalExpenses: 0,
    totalAmount: 0,
    expenseAmount: 0
  });

  // TODO: Charger les vraies données depuis l'API
  useEffect(() => {
    // Simuler des données pour l'instant
    setStats({
      totalBudgets: 3,
      totalExpenses: 12,
      totalAmount: 5000,
      expenseAmount: 2340
    });
  }, []);

  const remaining = stats.totalAmount - stats.expenseAmount;
  const percentUsed = stats.totalAmount > 0 
    ? ((stats.expenseAmount / stats.totalAmount) * 100).toFixed(1) 
    : 0;

  return (
    <Layout title="Dashboard">
      <div className="dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <h2 className="dashboard-title">
            Bienvenue, {user?.name} ! 👋
          </h2>
          <p className="dashboard-subtitle">
            Voici un aperçu de vos finances
          </p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {/* Total Budgets */}
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon primary">
                <Wallet />
              </div>
            </div>
            <div className="stat-content">
              <p className="stat-label">Budgets actifs</p>
              <h3 className="stat-value">{stats.totalBudgets}</h3>
            </div>
          </div>

          {/* Total Amount */}
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon success">
                <TrendingUp />
              </div>
              <span className="stat-badge up">Budget total</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Montant alloué</p>
              <h3 className="stat-value">{stats.totalAmount.toFixed(2)} TND</h3>
            </div>
          </div>

          {/* Expenses */}
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon warning">
                <TrendingDown />
              </div>
              <span className="stat-badge down">{percentUsed}%</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Dépenses totales</p>
              <h3 className="stat-value">{stats.expenseAmount.toFixed(2)} TND</h3>
            </div>
          </div>

          {/* Remaining */}
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon danger">
                <Wallet />
              </div>
            </div>
            <div className="stat-content">
              <p className="stat-label">Restant</p>
              <h3 className="stat-value">{remaining.toFixed(2)} TND</h3>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3 className="section-title">Actions rapides</h3>
          <div className="actions-grid">
            <Link to="/budgets" className="action-card">
              <div className="action-icon">
                <Wallet />
              </div>
              <h4 className="action-title">Créer un budget</h4>
              <p className="action-description">Définir un nouveau budget</p>
            </Link>

            <Link to="/expenses" className="action-card">
              <div className="action-icon">
                <PlusCircle />
              </div>
              <h4 className="action-title">Ajouter une dépense</h4>
              <p className="action-description">Enregistrer une dépense</p>
            </Link>

            <Link to="/categories" className="action-card">
              <div className="action-icon">
                <TrendingUp />
              </div>
              <h4 className="action-title">Gérer les catégories</h4>
              <p className="action-description">Organiser vos catégories</p>
            </Link>

            <Link to="/profile" className="action-card">
              <div className="action-icon">
                <Wallet />
              </div>
              <h4 className="action-title">Mon profil</h4>
              <p className="action-description">Modifier vos informations</p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;