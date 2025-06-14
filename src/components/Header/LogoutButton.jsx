import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutButton() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-4 py-2 text-sm sm:text-base rounded-full bg-white text-red-600 font-medium hover:bg-red-100 transition duration-300 shadow"
      aria-label="Logout"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
