'use client';
import { useState } from 'react';
import Sidebar from './../components/layout/SideBar';
import SupportHeader from './../components/support/SupportHeader';
import SupportHero from './../components/support/SupportHero';
import HelpCards from './../components/support/HelpCards';
import FAQSection from './../components/support/FAQSection';
import ContactInfo from './../components/support/ContactInfo';
import ContactForm from './../components/support/ContactForm';
import Footer from './../components/shared/Footer';
import LogoutConfirmationModal from './../components/shared/LogoutConfirmationModal';
import { faqs } from './../components/support/data/faqData';

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    window.location.href = '/login';
    setShowLogoutModal(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleSubmit = () => {
    alert('Thank you for contacting us! We will respond within 24 hours.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar activePage="support" onLogoutClick={handleLogoutClick} />
      
      <LogoutConfirmationModal 
        isOpen={showLogoutModal}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
      
      <div className="ml-64">
        <SupportHeader />

        <div className="px-8 py-12">
          <SupportHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
          <HelpCards />

          <div className="grid grid-cols-3 gap-8">
            <FAQSection filteredFAQs={filteredFAQs} />

            <div className="space-y-6">
              <ContactInfo />
              <ContactForm 
                contactForm={contactForm}
                setContactForm={setContactForm}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}