import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineDashboard,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/user";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Combined navigation items based on user state
  const getNavigationItems = () => {
    const baseItems = [
      { to: "/", icon: AiOutlineHome, label: "Home" },
      { to: "/movies", icon: MdOutlineLocalMovies, label: "Movies" },
    ];

    if (userInfo) {
      const userItems = [
        { to: "/profile", icon: AiOutlineUser, label: "Profile" },
      ];

   

      userItems.push({
        to: "#",
        icon: AiOutlineLogout,
        label: "Logout",
        onClick: logoutHandler,
      });

      return [...baseItems, ...userItems];
    }

    return [
      ...baseItems,
      { to: "/login", icon: AiOutlineLogin, label: "Login" },
      { to: "/register", icon: AiOutlineUserAdd, label: "Register" },
    ];
  };

  const navItems = getNavigationItems();

  return (
    <div className="relative">
      <nav className="fixed bottom-0 left-0 w-full md:bottom-8 z-50 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0f0f0f]/90 backdrop-blur-lg border border-white/10 rounded-2xl px-4 md:px-12 py-4 shadow-2xl">
            {/* Mobile Menu Button */}
            <div className="md:hidden flex justify-between items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-300 hover:text-white p-2"
              >
                {mobileMenuOpen ? (
                  <AiOutlineClose className="text-2xl" />
                ) : (
                  <AiOutlineMenu className="text-2xl" />
                )}
              </button>
              {userInfo && (
                <span className="text-gray-300 font-medium">
                  {userInfo.username}
                </span>
              )}
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden mt-4"
                >
                  <div className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <motion.div
                        key={item.to}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.onClick ? (
                          <button
                            onClick={item.onClick}
                            className="flex items-center gap-2 text-gray-300 hover:text-white w-full"
                          >
                            <item.icon className="text-xl" />
                            <span>{item.label}</span>
                          </button>
                        ) : (
                          <Link
                            to={item.to}
                            className="flex items-center gap-2 text-gray-300 hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <item.icon className="text-xl" />
                            <span>{item.label}</span>
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-center gap-6">
              {userInfo && (
                <span className="text-gray-300 font-medium mr-4">
                  {userInfo.username}
                </span>
              )}
              {navItems.map((item) => (
                <motion.div
                  key={item.to}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 group"
                    >
                      <motion.div
                        className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className="text-2xl" />
                      </motion.div>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ) : (
                    <Link
                      to={item.to}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 group"
                    >
                      <motion.div
                        className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className="text-2xl" />
                      </motion.div>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;