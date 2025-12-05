// app/user/components/shared/Footer.jsx
'use client';
import { Book } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                <Book className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">TB Digital Reads</h3>
              </div>
            </div>
            <p className="text-blue-100 leading-relaxed">
              TB Digital Reads has become an integral part of digital literacy activities at Taruna Bakti Vocational School. 
              Students and teachers have received a variety of positive responses.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-blue-100">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-blue-100">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Our Team</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-blue-100">
          <p>&copy; 2024 TB Digital Reads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;