import { useState } from 'react';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext'; // Assuming you have an auth context

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resetPassword } = useAuth(); // Assuming your auth context provides this
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (err) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back to Login
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
            Forgot Password
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your email to receive a password reset link
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {message ? (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
            <div className="flex flex-col items-center">
              <FiCheckCircle className="w-8 h-8 mb-2 text-green-500" />
              <p className="font-medium">{message}</p>
              <p className="text-sm mt-2">
                Didn't receive the email?{' '}
                <button
                  onClick={handleSubmit}
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                  disabled={isSubmitting}
                >
                  Resend
                </button>
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className={`flex items-center border rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}>
                <span className="px-3 text-gray-400 dark:text-gray-500">
                  <FiMail />
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@zentra.app"
                  className="w-full p-2 outline-none dark:bg-transparent dark:text-white"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
          Remember your password?{' '}
          <Link
            to="/login"
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}