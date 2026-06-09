import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { verifyEmail as verifyEmailApi } from '../api/auth';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('Verifying your account...');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Verification token is missing.');
      return;
    }

    const verify = async () => {
      try {
        await verifyEmailApi(token);
        setStatus('success');
        setMessage('Your email has been verified. You can now sign in.');
      } catch (err) {
        setStatus('error');
        setMessage(err?.response?.data?.message || 'Verification failed.');
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-900 px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] bg-white/5 p-10 shadow-panel backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-white">Email Verification</h1>
        <p className="mt-4 text-sm text-brand-300">{message}</p>

        {status === 'success' && (
          <div className="mt-8 text-center">
            <Link to="/login" className="inline-block rounded-3xl bg-brand-300 px-6 py-3 text-sm font-semibold text-brand-950 transition hover:bg-white">
              Go to Sign in
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-8 text-center">
            <Link to="/register" className="inline-block rounded-3xl bg-brand-300 px-6 py-3 text-sm font-semibold text-brand-950 transition hover:bg-white">
              Try registering again
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
