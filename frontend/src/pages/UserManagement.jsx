import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, fetchUsers } from '../api/users';

export default function UserManagement() {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [formError, setFormError] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setNewUser({ name: '', email: '', password: '', role: 'User' });
      setIsCreatingUser(false);
      setFormError('');
    },
    onError: (err) => {
      setFormError(err?.response?.data?.message || 'Failed to create user');
    },
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || newUser.password.length < 8) {
      setFormError('Name, email, and password (min 8 chars) are required');
      return;
    }
    createMutation.mutate(newUser);
  };

  if (isLoading) {
    return <div className="rounded-[2rem] bg-white/5 p-6 text-brand-300">Loading users…</div>;
  }

  if (error) {
    return <div className="rounded-[2rem] bg-white/5 p-6 text-red-400">Unable to load users.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 rounded-[2rem] bg-white/5 p-6 shadow-panel">
          <h2 className="text-xl font-semibold text-white">User Management</h2>
          <p className="mt-2 text-sm text-brand-300">Manage system users and their roles.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsCreatingUser(true)}
          className="ml-6 rounded-2xl bg-brand-300 px-6 py-3 text-sm font-semibold text-brand-950 transition hover:bg-white"
        >
          Add User
        </button>
      </div>

      {isCreatingUser && (
        <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
          <h3 className="text-lg font-semibold text-white">Create New User</h3>
          <div className="mt-4 space-y-4">
            <label className="block text-sm text-brand-300">
              Name
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-brand-800 px-4 py-2 text-white outline-none"
                placeholder="Full name"
              />
            </label>
            <label className="block text-sm text-brand-300">
              Email
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-brand-800 px-4 py-2 text-white outline-none"
                placeholder="Email address"
              />
            </label>
            <label className="block text-sm text-brand-300">
              Password
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-brand-800 px-4 py-2 text-white outline-none"
                placeholder="Min 8 characters"
              />
            </label>
            <label className="block text-sm text-brand-300">
              Role
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-brand-800 px-4 py-2 text-white outline-none"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </label>
            {formError && <p className="text-sm text-red-400">{formError}</p>}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleAddUser}
                disabled={createMutation.isPending}
                className="rounded-2xl bg-green-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-green-600 disabled:opacity-50"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setIsCreatingUser(false)}
                className="rounded-2xl bg-white/10 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-[2rem] bg-white/5 p-6 shadow-panel">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-sm font-semibold text-brand-300">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-brand-300">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-brand-300">Role</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-brand-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-sm text-white">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-brand-300">{user.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.role === 'Admin'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={user.verified ? 'text-green-400' : 'text-yellow-400'}>
                      {user.verified ? 'Active' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
