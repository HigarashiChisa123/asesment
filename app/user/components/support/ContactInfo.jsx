'use client';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const ContactInfo = () => {
  const contactItems = [
    {
      icon: MapPin,
      title: "Address",
      details: ["Jl. Raya Puspitek, Serpong, Tangerang Selatan"],
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+62 21 1234 5678"],
      color: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["support@tbdigitalreads.com"],
      color: "bg-pink-100",
      iconColor: "text-pink-600"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Fri: 08:00 - 17:00", "Sat: 08:00 - 12:00"],
      color: "bg-green-100",
      iconColor: "text-green-600"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
      
      <div className="space-y-4">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start gap-3">
              <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{item.title}</p>
                {item.details.map((detail, idx) => (
                  <p key={idx} className="text-sm text-gray-600">{detail}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfo;