
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Layout from '../components/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-8">The page you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/">Go to Home</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
