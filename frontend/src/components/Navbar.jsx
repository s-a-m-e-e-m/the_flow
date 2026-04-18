import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/Authcontext';
import axios from 'axios';
import { SiProgress } from "react-icons/si";
import { logoutLink } from '../links';

const Navbar = () => {
  const { user, loading, setLoading, setUser } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await axios.delete(logoutLink, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      return;
    } finally {
      setLoggingOut(false);
      navigate('/');
    }
  }

  return (
    <nav className='z-50 h-16 w-full bg-gray-800 text-white flex items-center justify-between px-4'>
      <div className='flex gap-4 items-center'>
        <Link to={'/home'} className='flex items-center gap-1 font-bold text-xl'>
          <span>The Flow</span>
          <SiProgress />
        </Link>

        <Link to='/roadmaps' className='text-gray-300 font-medium text-lg hover:text-white transition'>Roadmaps</Link>
      </div>

      <div>
        {user ? (
          <button onClick={handleLogout} disabled={loggingOut} className='bg-red-500 px-3 py-1 rounded text-md font-medium text-white disabled:bg-red-300 disabled:cursor-not-allowed transition hover:bg-red-600 cursor-pointer'>
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
        ) : (
          <Link to={'/login'} className='bg-blue-500 px-3 py-1 rounded text-md font-medium text-white disabled:bg-red-300 disabled:cursor-not-allowed transition hover:bg-blue-600 cursor-pointer'>Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
