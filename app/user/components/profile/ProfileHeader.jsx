'use client';

export const ProfileHeader = ({ profileImage, profile }) => {
  const displayName = profile?.full_name || profile?.email?.split('@')[0] || 'User';
  
  // Hitung umur dari birthday
  const calculateAge = (birthdayStr) => {
    if (!birthdayStr || !birthdayStr.includes('/')) return null;
    try {
      const [day, month, year] = birthdayStr.split('/');
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    } catch {
      return null;
    }
  };

  const age = profile?.birthday ? calculateAge(profile.birthday) : null;

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
        <p className="text-gray-500 mt-1">Manage your personal information</p>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {profile?.birthday && (
            <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1">
              🎂 {profile.birthday} {age && `(${age} years)`}
            </span>
          )}
          {profile?.hobby && (
            <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center gap-1">
              ⚽ {profile.hobby}
            </span>
          )}
          {profile?.class && (
            <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-1">
              🏫 {profile.class}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-md">
        <img 
          src={profileImage || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
          alt="Avatar" 
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=User';
          }}
        />
        <div>
          <p className="font-semibold text-sm text-gray-800">{displayName}</p>
          <p className="text-xs text-gray-500 line-clamp-1">
            {profile?.bio || 'No bio added yet'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;