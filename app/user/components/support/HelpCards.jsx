'use client';
import { HelpCircle, FileText, MessageCircle, Mail } from 'lucide-react';

export const HelpCards = () => {
  const cards = [
    {
      icon: HelpCircle,
      title: "FAQs",
      description: "Find answers to common questions",
      color: "from-blue-500 to-blue-600",
      iconColor: "text-white"
    },
    {
      icon: FileText,
      title: "User Guide",
      description: "Learn how to use our platform",
      color: "from-purple-500 to-purple-600",
      iconColor: "text-white"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      color: "from-pink-500 to-pink-600",
      iconColor: "text-white"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a detailed message",
      color: "from-green-500 to-green-600",
      iconColor: "text-white"
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-12">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer">
            <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center mb-4`}>
              <Icon className={`w-7 h-7 ${card.iconColor}`} />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{card.title}</h3>
            <p className="text-sm text-gray-600">{card.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HelpCards;