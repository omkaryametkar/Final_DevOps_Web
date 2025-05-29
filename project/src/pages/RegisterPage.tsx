import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import RegisterForm from '../components/Auth/RegisterForm';
import { Film } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleRegister = (name: string, email: string, password: string) => {
    // In a real app, you would register with a backend
    // For this demo, we'll just redirect to the home page
    console.log('Register with:', name, email, password);
    navigate('/');
  };
  
  return (
    <Layout>
      <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Film className="h-12 w-12 text-red-500 mx-auto" />
            <h2 className="mt-6 text-3xl font-extrabold text-white">Create a new account</h2>
            <p className="mt-2 text-sm text-gray-400">
              Join CineTicket to start booking movie tickets
            </p>
          </div>
          
          <RegisterForm onRegister={handleRegister} />
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;