import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { login as loginApi } from '../api/auth';

export default function Login() {
  const { login } = useAuthContext();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const payload = await loginApi(form);
      login(payload);
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-900 px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] bg-white/5 p-10 shadow-panel backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-white">Admin Sign In</h1>
        <p className="mt-2 text-sm text-brand-300">Access the request prioritization platform.</p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
          <button type="submit" className="w-full rounded-3xl bg-brand-300 px-4 py-3 text-sm font-semibold text-brand-950 transition hover:bg-white">
            Sign in
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-brand-300">
          Don&apos;t have an account?
          {' '}
          <Link to="/register" className="font-semibold text-white hover:text-brand-200">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
