'use client';
import { HelpCircle } from 'lucide-react';
import FAQItem from './FAQItem';

export const FAQSection = ({ filteredFAQs }) => {
  return (
    <div className="col-span-2">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-600">Quick answers to questions you may have</p>
      </div>

      <div className="space-y-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl">
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No FAQs found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQSection;