
'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';

interface FormData {
  fullName: string;
  department: string;
  issueDescription: string;
}

export default function TicketForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    department: '',
    issueDescription: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const departments = ['HR', 'IT', 'Finance', 'Development', 'Other'];

  const generateTicketNumber = () => {
    return 'TK' + Date.now().toString().slice(-8);
  };

  const generatePDF = (data: FormData, ticketNum: string) => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Support Ticket', 20, 30);
    
    doc.setFontSize(12);
    doc.text(`Ticket Number: ${ticketNum}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 60);
    doc.text(`Time: ${new Date().toLocaleTimeString()}`, 20, 70);
    
    doc.text('Full Name:', 20, 90);
    doc.text(data.fullName, 20, 100);
    
    doc.text('Department:', 20, 120);
    doc.text(data.department, 20, 130);
    
    doc.text('Issue Description:', 20, 150);
    const splitText = doc.splitTextToSize(data.issueDescription, 170);
    doc.text(splitText, 20, 160);
    
    doc.save(`support-ticket-${ticketNum}.pdf`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.department || !formData.issueDescription) {
      alert('Please fill in all fields');
      return;
    }

    if (formData.issueDescription.length > 500) {
      alert('Issue description must be 500 characters or less');
      return;
    }
    
    const ticketNum = generateTicketNumber();
    setTicketNumber(ticketNum);
    
    generatePDF(formData, ticketNum);
    
    setIsSubmitted(true);
    
    setFormData({
      fullName: '',
      department: '',
      issueDescription: ''
    });
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setTicketNumber('');
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="ri-check-line text-2xl text-green-600"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank you! Your ticket has been submitted.</h2>
        <p className="text-gray-600 mb-2">Your ticket number is:</p>
        <p className="text-xl font-bold text-blue-600 mb-6">#{ticketNumber}</p>
        <p className="text-gray-600 mb-8">Your support ticket has been automatically downloaded as a PDF file.</p>
        <button
          onClick={resetForm}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
        >
          Submit Another Ticket
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit a Support Ticket</h2>
      <p className="text-gray-600 mb-8">Please fill out the form below and we'll get back to you as soon as possible.</p>
      
      <form id="support-ticket-form" onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
            Department *
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-left bg-white cursor-pointer pr-8"
              onClick={(e) => {
                const dropdown = e.currentTarget.nextElementSibling as HTMLElement;
                dropdown.classList.toggle('hidden');
              }}
            >
              {formData.department || 'Select a department'}
              <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2"></i>
            </button>
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 hidden">
              {departments.map((dept) => (
                <div
                  key={dept}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
                  onClick={(e) => {
                    setFormData({...formData, department: dept});
                    const dropdown = e.currentTarget.parentElement as HTMLElement;
                    dropdown.classList.add('hidden');
                  }}
                >
                  {dept}
                </div>
              ))}
            </div>
          </div>
          <input type="hidden" name="department" value={formData.department} />
        </div>

        <div>
          <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Issue Description *
          </label>
          <textarea
            id="issueDescription"
            name="issueDescription"
            value={formData.issueDescription}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setFormData({...formData, issueDescription: e.target.value});
              }
            }}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
            placeholder="Please describe your issue in detail..."
            required
          />
          <div className="text-right mt-1">
            <span className={`text-xs ${formData.issueDescription.length > 450 ? 'text-red-500' : 'text-gray-500'}`}>
              {formData.issueDescription.length}/500 characters
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-medium text-lg transition-colors whitespace-nowrap cursor-pointer"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
}
