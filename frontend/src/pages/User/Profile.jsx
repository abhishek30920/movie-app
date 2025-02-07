import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../../redux/api/user';
import { setCredentials } from '../../redux/features/auth/authSlice';

const Profile = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useProfileMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setFormData({
        userName: userInfo.userName || '',
        email: userInfo.email || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [userInfo]);

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
      const res = await updateProfile({
        _id: userInfo._id,
        name: formData.userName,
        email: formData.email,
        password: formData.password,
      }).unwrap();
      
      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'An error occurred while updating profile');
    }
  };

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
            Update Profile
          </h2>
          
          <form onSubmit={submitHandler} className="space-y-6">
            {[
              { name: 'userName', label: 'Username', type: 'text' },
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'password', label: 'New Password', type: 'password' },
              { name: 'confirmPassword', label: 'Confirm New Password', type: 'password' }
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
                  required={field.type === 'password' ? false : true}
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
                  Updating...
                </div>
              ) : (
                'Update Profile'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Note: Leave password fields empty to keep current password
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;