'use client';
import { X, Check, Loader2 } from 'lucide-react';

export const ProfileActionButtons = ({ isEditing, onCancel, onConfirm, isSaving = false }) => {
  if (!isEditing) return null;

  return (
    <div className="flex gap-4 mt-8 justify-end">
      <button
        onClick={onCancel}
        disabled={isSaving}
        className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition flex items-center gap-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <X className="w-5 h-5" />
        Cancel
      </button>
      <button
        onClick={onConfirm}
        disabled={isSaving}
        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition flex items-center gap-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Check className="w-5 h-5" />
            Save Changes
          </>
        )}
      </button>
    </div>
  );
};

export default ProfileActionButtons;