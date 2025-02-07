import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../redux/api/user';
import { setCredentials } from '../../redux/features/auth/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { UserInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await login({
        email: formData.email,
        password: formData.password
      });
      if (result.data) {
             // If the request succeeds
             console.log('Login successful:', result.data);
             dispatch(setCredentials(result.data)); // Store user info in Redux
             toast.success('Login successful!');
             navigate(redirect); // Redirect to the specified path
           } else if (result.error) {
             // If the request fails
             console.error('Login failed:', result.error);
             toast.error(result.error.data?.message || 'Failed to Login.');
           }
         } catch (err) {
           console.error('Unexpected error:', err);
           toast.error('An unexpected error occurred.');
         }
       };
          

  useEffect(() => {
    if (UserInfo) {
      navigate(redirect);
    }
  }, [navigate, UserInfo, redirect]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden"
      >
        <div className="px-6 py-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-white mb-8">
            Sign in to your account
          </h2>
          
          <form onSubmit={submitHandler} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg bg-gray-800 border-transparent focus:border-purple-500 focus:bg-gray-900 focus:ring-0 text-white px-4 py-2 transition-colors duration-200"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg bg-gray-800 border-transparent focus:border-purple-500 focus:bg-gray-900 focus:ring-0 text-white px-4 py-2 transition-colors duration-200"
                required
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
              className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
            >
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;