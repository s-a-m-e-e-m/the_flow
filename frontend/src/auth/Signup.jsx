import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './Authcontext'
import { signuplink } from '../links';

const Signup = () => {
  const { loading, setLoading, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [customRole, setCustomRole] = useState('');

  const handleSelectRoleChange = (e) => {
    const value = e.target.value;
    setSelectedRole(value);
    if (value) {
      setCustomRole('');
    }
  };

  const handleCustomRoleChange = (e) => {
    const value = e.target.value;
    setCustomRole(value);
    if (value.trim()) {
      setSelectedRole('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const email = (formData.get('email') || '').toString().trim();
    const password = (formData.get('password') || '').toString();
    const username = (formData.get('username') || '').toString().trim();
    
    const normalizedSelectedRole = selectedRole.trim();
    const normalizedCustomRole = customRole.trim();

    if (normalizedSelectedRole && normalizedCustomRole) {
      alert('Please use either the target role list or custom role, not both.');
      setLoading(false);
      return;
    }

    const targetRole = normalizedCustomRole || normalizedSelectedRole;

    if (!targetRole) {
      alert('Please select a target role or enter a custom role.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(signuplink, {
        username,
        email,
        password,
        targetRole
      }, { withCredentials: true });

      setUser(response.data.user);
      navigate('/home');
    } catch (error) {
      console.error("Error during signup:", error);
      alert(error.response?.data?.message || 'Signup failed. Please try again.');
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
            <p className='text-lg text-cyan-200/90'>Let's get started</p>
            <h1 className='mt-2 text-3xl font-bold tracking-tight text-slate-50'>
              Create your account
            </h1>
            <p className='mt-4 text-md leading-6 text-slate-300'>
              Join thousands of individuals managing their career growth with our AI-powered tools.
            </p>
          </div>
        </div>

        <div className='p-6 sm:p-8'>
          <h2 className='text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl'>
            Create your account
          </h2>
          <p className='mt-2 text-sm text-slate-400'>
            Sign up with your email and choose your target role.
          </p>

          <form onSubmit={handleSubmit} className='mt-6 flex flex-col gap-4'>
            <section className='flex flex-col gap-2'>
              <label htmlFor='username' className='text-sm font-medium text-slate-200'>Username</label>
              <input
                type='text'
                name='username'
                className='rounded-md border border-slate-700 bg-slate-800 px-3 py-2.5 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30'
                placeholder='Enter your username'
                required
              />
            </section>

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

            <section className='flex flex-col gap-2'>
              <label htmlFor='targetRole' className='text-sm font-medium text-slate-200'>Target Role</label>
              <select
                name='targetRole'
                value={selectedRole}
                onChange={handleSelectRoleChange}
                className='rounded-md border border-slate-700 bg-slate-800 px-3 py-2.5 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30'
              >
                <option value=''>Select your target role</option>
                <option value='FrontendDeveloper'>Frontend Developer</option>
                <option value='BackendDeveloper'>Backend Developer</option>
                <option value='DataScientist'>Data Scientist</option>
                <option value='Designer'>Designer</option>
                <option value='ProductManager'>Product Manager</option>
                <option value='SoftwareEngineer'>Software Engineer</option>
                <option value='MachineLearningEngineer'>Machine Learning Engineer</option>
                <option value='FullStackDeveloper'>Full-Stack Developer</option>
                <option value='CybersecurityEngineer'>Cybersecurity Engineer</option>
                <option value='DevOpsEngineer'>DevOps Engineer</option>
              </select>
            </section>

            <section className='flex flex-col gap-2'>
              <label htmlFor='customTargetRole' className='text-sm font-medium text-slate-200'>Or enter a custom role</label>
              <input
                type='text'
                name='customTargetRole'
                value={customRole}
                onChange={handleCustomRoleChange}
                className='rounded-md border border-slate-700 bg-slate-800 px-3 py-2.5 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30'
                placeholder='Enter your target role'
              />
            </section>

            <button
              type='submit'
              className='mt-2 w-full cursor-pointer rounded-md bg-cyan-500 px-4 py-2.5 font-semibold text-slate-900 transition hover:bg-cyan-400'
            >
              Create Account
            </button>
          </form>

          <p className='mt-5 text-sm text-slate-300'>
            Already have an account? &nbsp;
            <Link className='font-semibold text-cyan-300 hover:text-cyan-200' to='/login'>
              Login
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}

export default Signup
