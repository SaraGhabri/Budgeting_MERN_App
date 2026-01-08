import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, TrendingUp, TrendingDown, PlusCircle } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/AuthContext';
import budgetService from '../../services/budgetService';
import expenseService from '../../services/expenseService';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBudgets: 0,
    totalExpenses: 0,
    totalAmount: 0,
    expenseAmount: 0
  });
  const [loading, setLoading] = useState(true);

  // Charger les vraies données depuis l'API
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Charger budgets et expenses en parallèle
      const [budgetsData, expensesData] = await Promise.all([
        budgetService.getAll(),
        expenseService.getAll()
      ]);

      // Calculer les statistiques
      const totalBudgets = budgetsData.length;
      const totalExpenses = expensesData.length;
      
      // Somme de tous les montants de budgets
      const totalAmount = budgetsData.reduce((sum, budget) => {
        return sum + (Number(budget.amount) || 0);
      }, 0);
      
      // Somme de tous les montants de dépenses
      const expenseAmount = expensesData.reduce((sum, expense) => {
        return sum + (Number(expense.amount) || 0);
      }, 0);

      setStats({
        totalBudgets,
        totalExpenses,
        totalAmount,
        expenseAmount
      });
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
      // Garder les stats à 0 en cas d'erreur
    } finally {
      setLoading(false);
    }
  };

  const remaining = stats.totalAmount - stats.expenseAmount;
  const percentUsed = stats.totalAmount > 0 
    ? ((stats.expenseAmount / stats.totalAmount) * 100).toFixed(1) 
    : 0;

  if (loading) {
    return (
      <Layout title="Dashboard">
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement des statistiques...</p>
        </div>
      </Layout>
    );
  }

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