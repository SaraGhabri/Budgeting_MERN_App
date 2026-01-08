import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Budgets from './pages/Budget/Budgets';
import Expenses from './pages/Expense/Expenses';
import Categories from './pages/Category/Categories';
import Profile from './pages/Profile/Profile';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Routes publiques */}
      <Route 
        path="/login" 
        element={!user ? <Login /> : <Navigate to="/dashboard" />} 
      />
      <Route 
        path="/register" 
        element={!user ? <Register /> : <Navigate to="/dashboard" />} 
      />
      
      {/* Routes protégées */}
      <Route 
        path="/dashboard" 
        element={user ? <Dashboard /> : <Navigate to="/login" />} 
      />
      
      <Route 
        path="/budgets" 
        element={user ? <Budgets /> : <Navigate to="/login" />}
      />
      
      <Route 
        path="/expenses" 
        element={user ? <Expenses /> : <Navigate to="/login" />}
      />
      
      <Route 
        path="/categories" 
        element={user ? <Categories /> : <Navigate to="/login" />}
      />
      
      <Route 
        path="/profile" 
        element={user ? <Profile /> : <Navigate to="/login" />}
      />
      
      {/* Redirection par défaut */}
      <Route 
        path="/" 
        element={<Navigate to={user ? "/dashboard" : "/login"} />} 
      />
      
      {/* 404 */}
      <Route 
        path="*" 
        element={<Navigate to="/" />} 
      />
    </Routes>
  );
}

export default App;