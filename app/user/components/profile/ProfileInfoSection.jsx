'use client';
import { User, Mail, Book, Calendar, Heart, Edit2, UserCircle } from 'lucide-react';
import ProfileField from './ProfileField';

export const ProfileInfoSection = ({ profile, tempProfile, isEditing, onChange, user }) => {
  
  const displayUser = user || {};
  
  // FIELD YANG BISA DIEDIT: full_name, bio, birthday, hobby
  // FIELD READONLY: username, email, class
  const fields = [
    {
      label: "Full Name",
      icon: User,
      fieldName: "full_name",
      value: isEditing ? (tempProfile?.full_name || '') : (displayUser.full_name || ''),
      gradientFrom: "from-blue-50",
      gradientTo: "to-blue-100",
      textColor: "#1e40af",
      readOnly: false // BOLEH DIEDIT
    },
    {
      label: "Username",
      icon: UserCircle,
      fieldName: "username",
      value: displayUser.username || '',
      gradientFrom: "from-gray-50",
      gradientTo: "to-gray-100",
      textColor: "#4b5563",
      readOnly: true // TIDAK BOLEH DIEDIT
    },
    {
      label: "Email",
      icon: Mail,
      fieldName: "email",
      value: displayUser.email || '',
      gradientFrom: "from-purple-50",
      gradientTo: "to-purple-100",
      textColor: "#7c3aed",
      readOnly: true // TIDAK BOLEH DIEDIT
    },
    {
      label: "Class",
      icon: Book,
      fieldName: "class",
      value: profile?.class || '',
      gradientFrom: "from-pink-50",
      gradientTo: "to-pink-100",
      textColor: "#be185d",
      readOnly: true // TIDAK BOLEH DIEDIT
    },
    {
      label: "Birthday",
      icon: Calendar,
      fieldName: "birthday",
      value: isEditing ? (tempProfile?.birthday || '') : (profile?.birthday || ''),
      gradientFrom: "from-green-50",
      gradientTo: "to-green-100",
      textColor: "#047857",
      readOnly: false, // BOLEH DIEDIT
      placeholder: "DD/MM/YYYY"
    },
    {
      label: "Hobby",
      icon: Heart,
      fieldName: "hobby",
      value: isEditing ? (tempProfile?.hobby || '') : (profile?.hobby || ''),
      gradientFrom: "from-yellow-50",
      gradientTo: "to-yellow-100",
      textColor: "#ca8a04",
      readOnly: false // BOLEH DIEDIT
    },
    {
      label: "Bio",
      icon: Edit2,
      fieldName: "bio",
      value: isEditing ? (tempProfile?.bio || '') : (displayUser.bio || ''),
      gradientFrom: "from-indigo-50",
      gradientTo: "to-indigo-100",
      textColor: "#4f46e5",
      readOnly: false // BOLEH DIEDIT
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {fields.map((field) => (
        <ProfileField
          key={field.fieldName}
          label={field.label}
          icon={field.icon}
          value={field.value || ''}
          isEditing={isEditing && !field.readOnly}
          fieldName={field.fieldName}
          gradientFrom={field.gradientFrom}
          gradientTo={field.gradientTo}
          textColor={field.textColor}
          onChange={onChange}
          readOnly={field.readOnly}
          placeholder={field.placeholder}
        />
      ))}
    </div>
  );
};

export default ProfileInfoSection;