import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../hooks/useAuth';

const Signup: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to home if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create an Account</h1>
          <SignupForm />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;