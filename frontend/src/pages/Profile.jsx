import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.user?.name || '',
    email: user?.user?.email || '',
    bio: user?.user?.bio || '',
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSave = async () => {
    try {
      // In a real application, you would send this to the backend
      console.log('Profile updated:', form);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <h2 className="text-xl font-semibold text-white">My Profile</h2>
        <p className="mt-2 text-sm text-brand-300">Manage your account information and preferences.</p>
      </div>

      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <div className="space-y-6">
          {/* User Info */}
          <div>
            <h3 className="text-lg font-semibold text-white">Account Information</h3>
            <div className="mt-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm text-brand-300">
                    Name
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-brand-800 px-4 py-2 text-white outline-none disabled:opacity-50"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm text-brand-300">
                    Email
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      disabled
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-brand-800 px-4 py-2 text-white outline-none disabled:opacity-50"
                    />
                  </label>
                </div>
              </div>
              <label className="block text-sm text-brand-300">
                Bio
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="4"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-brand-800 px-4 py-2 text-white outline-none disabled:opacity-50"
                />
              </label>
            </div>
          </div>

          {/* Role Info */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-lg font-semibold text-white">Role & Permissions</h3>
            <div className="mt-4">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm text-brand-300">Role</p>
                <p className="mt-2 text-lg font-semibold text-white">{user?.user?.role}</p>
                <p className="mt-2 text-xs text-brand-400">
                  {user?.user?.role === 'Admin'
                    ? 'You have full access to all features and user management.'
                    : 'You have access to create and manage your own requests.'}
                </p>
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-lg font-semibold text-white">Account Details</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-brand-300">Account Created</span>
                <span className="text-white">{new Date(user?.user?.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-300">Last Updated</span>
                <span className="text-white">{new Date(user?.user?.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-300">Status</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-white/10 pt-6 flex gap-4">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-2xl bg-brand-300 px-6 py-2 text-sm font-semibold text-brand-950 transition hover:bg-white"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-2xl bg-green-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-2xl bg-white/10 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
