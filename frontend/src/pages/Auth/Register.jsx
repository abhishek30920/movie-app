import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../redux/api/user';
import { setCredentials } from '../../redux/features/auth/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { UserInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const result = await register({
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      });
      
      if (result.data) {
        // If the request succeeds
        console.log('Registration successful:', result.data);
        dispatch(setCredentials(result.data)); // Store user info in Redux
        toast.success('Registration successful!');
        navigate(redirect); // Redirect to the specified path
      } else if (result.error) {
        // If the request fails
        console.error('Registration failed:', result.error);
        toast.error(result.error.data?.message || 'Failed to register.');
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
            Create your account
          </h2>
          
          <form onSubmit={submitHandler} className="space-y-6">
            {[
              { name: 'userName', label: 'Username', type: 'text' },
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'password', label: 'Password', type: 'password' },
              { name: 'confirmPassword', label: 'Confirm Password', type: 'password' }
            ].map((field) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-200">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg bg-gray-800 border-transparent focus:border-purple-500 focus:bg-gray-900 focus:ring-0 text-white px-4 py-2 transition-colors duration-200"
                  required
                />
              </motion.div>
            ))}

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
                  Registering...
                </div>
              ) : (
                'Register'
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;