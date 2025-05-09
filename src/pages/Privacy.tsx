
import React from 'react';
import Layout from '../components/Layout';

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
          
          <div className="prose prose-sm md:prose-base max-w-none">
            <p>
              Last updated: May 9, 2025
            </p>
            
            <h2>Introduction</h2>
            <p>
              Welcome to Plot Palace. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
            </p>
            
            <h2>Important Information</h2>
            <p>
              <strong>No User Accounts or Login Required:</strong> Our plot booking system is designed to be simple and transparent. We do not require users to create accounts or log in to view available plots.
            </p>
            
            <h2>The Data We Collect</h2>
            <p>
              When you book a plot through our system, we collect:
            </p>
            <ul>
              <li>Name (displayed publicly alongside the booked plot)</li>
              <li>Contact information (optional)</li>
              <li>Plot booking details</li>
            </ul>
            
            <h2>How We Use Your Data</h2>
            <p>
              <strong>Public Display:</strong> When you book a plot, your name will be displayed publicly on our plot visualizer to show which plots are already booked. This is the primary purpose of our system - to provide a transparent view of plot availability.
            </p>
            <p>
              <strong>No Marketing:</strong> We do not use your data for marketing purposes or sell it to third parties.
            </p>
            
            <h2>Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.
            </p>
            
            <h2>Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:
            </p>
            <ul>
              <li>The right to request access to your personal data.</li>
              <li>The right to request correction of your personal data.</li>
              <li>The right to request erasure of your personal data.</li>
              <li>The right to object to processing of your personal data.</li>
              <li>The right to request restriction of processing your personal data.</li>
              <li>The right to request transfer of your personal data.</li>
              <li>The right to withdraw consent.</li>
            </ul>
            
            <h2>Contact</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <p>
              Email: privacy@plotpalace.com<br />
              Address: 123 Plot Avenue, Land District, Property City, PC 12345
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
