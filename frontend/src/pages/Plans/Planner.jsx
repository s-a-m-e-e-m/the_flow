import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { AuthContext } from '../../auth/Authcontext';
import axios from 'axios';
import Plan from '../Plans/Plan';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { createPlanLink, getAllPlansLink } from '../../links';

const Planner = () => {
  const [subjectInputs, setSubjectInputs] = useState([{ id: 1, value: '' }]);
  const { user, loading, setLoading } = useContext(AuthContext);
  const [planId, setPlanId] = useState(null);
  const [allPlans, setAllPlans] = useState([]);

  const navigate = useNavigate();

  const fetchAllPlans = async () => {
    try {
      const response = await axios.get(getAllPlansLink, { withCredentials: true });
      setAllPlans(response.data?.studyPlans);
    } catch (error) {
      setAllPlans([]);
    }
  }

  useEffect(() => {
    if(!user){
      navigate('/login');
    }
    fetchAllPlans();
  }, [user]);

  const addInputSubject = () => {
    setSubjectInputs((prev) => [...prev, { id: Date.now(), value: '' }]);
  }

  const removeSubjectInput = (id) => {
    setSubjectInputs((prev) => {
      if (prev.length == 1) return;

      return prev.filter((subject) => subject.id !== id)
    })
  }

  const handleInputChange = (id, value) => {
    setSubjectInputs((prev) =>
      prev.map((subject) => (subject.id === id ? { ...subject, value } : subject))
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedSubjects = subjectInputs.map((subject) => subject.value.trim()).filter(Boolean);
    const days = e.target.days.value;

    try {
      setLoading(true);
      const response = await axios.post(createPlanLink, {
        subjects: cleanedSubjects, days: parseInt(days)
      }, { withCredentials: true });
      setPlanId(response.data?._id);
      fetchAllPlans();
    } catch (error) {
      setPlanId(null);
    } finally {
      setLoading(false);
    }
  }

  if(loading){
    return <p className='mx-auto mt-10 w-fit rounded-full border border-slate-700 bg-slate-900/90 px-5 py-2 text-sm font-medium text-slate-200 shadow-lg shadow-cyan-950/20'>Loading...</p>
  }

  return (
    <div className='relative flex min-h-[calc(100vh-2rem)] w-full flex-col bg-slate-950 sm:flex-row'>

      {/* Sidebar */}
      <Sidebar className="hidden border-r border-slate-700 bg-slate-900/80 p-4 lg:block lg:w-2/10" />

      <div className="w-full p-3 sm:w-5/10 sm:p-5 lg:w-4/10 lg:p-6">
        <form onSubmit={handleSubmit} className='mt-2 flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/70 p-5 shadow-lg shadow-cyan-950/10 sm:p-6'>
          {subjectInputs.map((subject, index) => (
            <div key={subject.id} className='flex w-full gap-2'>
              <input type='text' value={subject.value}
                onChange={(e) => handleInputChange(subject.id, e.target.value)}
                placeholder={`Subject ${index + 1}`} className='w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-slate-100 placeholder:text-slate-400 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30' />
              <button onClick={() => removeSubjectInput(subject.id)}
                disabled={subjectInputs.length === 1} className='rounded-xl bg-rose-500 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-40'>Remove</button>
            </div>
          ))}

          <div className='flex w-full gap-2'>
            <input type="number" name='days' placeholder='number of days' className='w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-slate-100 placeholder:text-slate-400 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30' />
            <select name="" id="" className='rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-slate-100 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30'>
              <option value="">Intensity</option>
              <option value="deep">Deep</option>
              <option value="medium">Medium</option>
              <option value="light">Light</option>
            </select>
          </div>

          <button type='button' onClick={addInputSubject} className='w-full rounded-xl bg-cyan-500 px-4 py-2.5 font-semibold text-slate-950 shadow-sm transition hover:bg-cyan-400'>
            + Add another subject
          </button>

          <button type='submit' className='w-full rounded-xl bg-emerald-500 px-4 py-2.5 font-semibold text-slate-950 shadow-sm transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60' disabled={loading}>
            Generate Study Plan
          </button>
        </form>

        {planId && (
          <Link to={`/plan/${planId}`} className='mt-4 inline-flex items-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20'>
            Your plan is generated! See here
          </Link>
        )}
      </div>

      <div className='m-3 w-full rounded-2xl border border-slate-700 bg-slate-900/70 p-6 text-slate-100 shadow-lg shadow-cyan-950/10 sm:w-5/10 lg:w-4/10'>
          <h2 className="text-xl font-bold text-slate-100 mb-2">
            Previous Study Plans
          </h2>
          <p className="mb-4 text-sm text-slate-400">
            View all your previous study plans and track your progress over
            time.
          </p>
        {allPlans.length > 0 ? allPlans.map((plan, index) => (
          <section key={index} className='mb-3 rounded-xl border border-slate-700 bg-slate-800/80 p-3 last:mb-0'>
            <h3 className='mb-2 text-base font-semibold text-slate-100'>{plan.title}</h3>
            <Link to={`/plan/${plan._id}`} className='inline-flex items-center rounded-lg bg-cyan-500 px-3 py-1.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-400'>View</Link>
          </section>
        )) : (
          <p className='rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-slate-300'>No study plans yet, start planning your learning journey!</p>
        )}
      </div>

    </div>
  )
}

export default Planner
