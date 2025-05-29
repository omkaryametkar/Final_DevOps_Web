import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import LoginForm from '../components/Auth/LoginForm';
import { Film } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogin = (email: string, password: string) => {
    // In a real app, you would authenticate with a backend
    // For this demo, we'll just redirect to the home page
    console.log('Login with:', email, password);
    navigate('/');
  };
  
  return (
    <Layout>
      <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Film className="h-12 w-12 text-red-500 mx-auto" />
            <h2 className="mt-6 text-3xl font-extrabold text-white">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-400">
              Access your booking history and manage your profile
            </p>
          </div>
          
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;