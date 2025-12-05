'use client';
import { useState, useEffect } from 'react';

export const ProfileField = ({ 
  label, 
  icon, 
  value, 
  isEditing, 
  fieldName, 
  gradientFrom, 
  gradientTo, 
  textColor,
  onChange,
  readOnly = false,
  placeholder = ""
}) => {
  const IconComponent = icon;
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    console.log(`📝 ${fieldName} changed to: "${newValue}"`);
    
    // Untuk birthday, konversi format jika perlu
    if (fieldName === 'birthday' && newValue.includes('-')) {
      const [year, month, day] = newValue.split('-');
      const formattedDate = `${day}/${month}/${year}`;
      onChange(fieldName, formattedDate);
    } else {
      onChange(fieldName, newValue);
    }
  };

  // Format DD/MM/YYYY ke YYYY-MM-DD untuk date input
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateStr;
  };

  // Format YYYY-MM-DD ke DD/MM/YYYY untuk display
  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return '';
    if (dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  };

  // Render input yang berbeda untuk birthday
  const renderInput = () => {
    if (fieldName === 'birthday' && isEditing && !readOnly) {
      return (
        <div>
          <input
            type="date"
            value={formatDateForInput(inputValue)}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none bg-white text-gray-800 focus:border-blue-500"
            style={{ borderColor: textColor }}
            max={new Date().toISOString().split('T')[0]}
          />
          <p className="text-xs text-gray-500 mt-1">
            Display: {formatDateForDisplay(value)} | Format: DD/MM/YYYY
          </p>
        </div>
      );
    }

    return (
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none bg-white text-gray-800 placeholder-gray-400 focus:border-blue-500"
        style={{ borderColor: textColor }}
        placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
      />
    );
  };

  // Hitung umur dari birthday
  const calculateAge = (birthdayStr) => {
    if (!birthdayStr) return null;
    
    try {
      let birthDate;
      
      if (birthdayStr.includes('/')) {
        const [day, month, year] = birthdayStr.split('/');
        birthDate = new Date(year, month - 1, day);
      } else if (birthdayStr.includes('-')) {
        birthDate = new Date(birthdayStr);
      } else {
        return null;
      }
      
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age;
    } catch (e) {
      console.error('Error calculating age:', e);
      return null;
    }
  };

  const age = fieldName === 'birthday' && value ? calculateAge(value) : null;

  return (
    <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} p-5 rounded-2xl`}>
      <div className="flex items-center justify-between mb-3">
        <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: textColor }}>
          <IconComponent className="w-4 h-4" />
          {label}
        </label>
        {fieldName === 'birthday' && age && !isEditing && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {age} years old
          </span>
        )}
      </div>
      
      {isEditing && !readOnly ? (
        renderInput()
      ) : (
        <p className="text-gray-800 font-semibold text-lg">
          {value || <span className="text-gray-400 italic">No {label.toLowerCase()}</span>}
        </p>
      )}
      
      {fieldName === 'hobby' && value && !isEditing && (
        <div className="mt-2">
          <div className="flex flex-wrap gap-1">
            {value.split(',').map((h, index) => (
              <span key={index} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                {h.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileField;