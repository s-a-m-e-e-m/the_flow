import React, { useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './Authcontext';
import { loginLink } from '../links';

const Login = () => {
  const { loading, setLoading, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const response = await axios.post(loginLink, {
        email,
        password
      }, { withCredentials: true });
      setUser(response.data.user);
      navigate('/home');
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <p className='mx-auto mt-10 w-fit rounded-full border border-slate-700 bg-slate-900/90 px-5 py-2 text-sm font-medium text-slate-200 shadow-lg shadow-cyan-950/20'>
        Loading...
      </p>
    );
  }

  return (
    <div className='w-full h-full bg-slate-950 px-4 py-8 sm:px-6 lg:px-8'>
      <section className='mx-auto grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/70 shadow-lg shadow-cyan-950/20 md:grid-cols-2'>
        <div className='hidden border-r border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 p-8 md:flex md:flex-col md:justify-between'>
          <div>
            <p className='text-lg text-cyan-200/90'>Welcome back</p>
            <h1 className='mt-2 text-3xl font-bold tracking-tight text-slate-50'>
              Continue your from where you left
            </h1>
          </div>
        </div>

        <div className='p-6 sm:p-8'>
          <h2 className='text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl'>
            Login to your account
          </h2>
          <p className='mt-2 text-sm text-slate-400'>
            Use your email and password to access your dashboard.
          </p>

          <form onSubmit={handleSubmit} className='mt-6 flex flex-col gap-4'>
            <section className='flex flex-col gap-2'>
              <label htmlFor='email' className='text-sm font-medium text-slate-200'>Email</label>
              <input
                type='email'
                name='email'
                className='rounded-md border border-slate-700 bg-slate-800 px-3 py-2.5 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30'
                placeholder='Enter your email'
                required
              />
            </section>

            <section className='flex flex-col gap-2'>
              <label htmlFor='password' className='text-sm font-medium text-slate-200'>Password</label>
              <input
                type='password'
                name='password'
                className='rounded-md border border-slate-700 bg-slate-800 px-3 py-2.5 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30'
                placeholder='Enter your password'
                required
              />
            </section>

            <button
              type='submit'
              className='mt-2 w-full cursor-pointer rounded-md bg-cyan-500 px-4 py-2.5 font-semibold text-slate-900 transition hover:bg-cyan-400'
            >
              Login
            </button>
          </form>

          <p className='mt-5 text-sm text-slate-300'>
            Don't have an account? &nbsp;
            <Link className='font-semibold text-cyan-300 hover:text-cyan-200' to='/signup'>
              Signup
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}

export default Login