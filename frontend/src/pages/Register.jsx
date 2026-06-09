import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../api/auth';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      const response = await registerApi({ ...form, role: 'User' });
      setSuccess(response.message || 'Registration successful. Check your email to verify your account.');
      setForm({ name: '', email: '', password: '' });
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-900 px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] bg-white/5 p-10 shadow-panel backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-white">Create your account</h1>
        <p className="mt-2 text-sm text-brand-300">Register to access the request prioritization platform.</p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="block text-sm text-brand-300">
              Full name
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-brand-800 px-4 py-3 text-white outline-none focus:border-brand-300"
              />
            </label>
            <label className="block text-sm text-brand-300">
              Email
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-brand-800 px-4 py-3 text-white outline-none focus:border-brand-300"
              />
            </label>
            <label className="block text-sm text-brand-300">
              Password
              <input
                required
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-brand-800 px-4 py-3 text-white outline-none focus:border-brand-300"
              />
            </label>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-green-400">{success}</p>}

          <button
            type="submit"
            className="w-full rounded-3xl bg-brand-300 px-4 py-3 text-sm font-semibold text-brand-950 transition hover:bg-white"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-brand-300">
          Already have an account?
          {' '}
          <Link to="/login" className="font-semibold text-white hover:text-brand-200">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
