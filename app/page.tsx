
'use client';

import Header from '@/components/Header';
import TicketForm from '@/components/TicketForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Need Help? We're Here for You
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Submit a support ticket and our team will get back to you promptly. Your ticket will be automatically generated as a PDF for your records.
            </p>
          </div>
          
          <TicketForm />
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-100 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Need immediate assistance? Contact us at{' '}
            <a href="mailto:support@company.com" className="text-blue-600 hover:text-blue-700">
              support@company.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
