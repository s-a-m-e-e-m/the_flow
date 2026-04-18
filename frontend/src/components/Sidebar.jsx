import React from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { GrPlan } from "react-icons/gr";
import { MdWorkOutline } from "react-icons/md";

const Sidebar = ({ className = '' }) => {
  const navItems = [
    { to: '/home', label: 'Dashboard', icon: <MdDashboard size="1.1rem" /> },
    { to: '/tasks', label: 'Tasks', icon: <FaTasks size="1rem" /> },
    { to: '/planner', label: 'Study Plan', icon: <GrPlan size="1rem" /> },
    { to: '/interview-report', label: 'Career Hub', icon: <MdWorkOutline size="1.1rem" /> },
  ];

  return (
    <aside className={`self-stretch flex flex-col gap-6 border border-slate-700 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-5 text-slate-100 shadow-lg shadow-cyan-950/20 ${className}`}>
      <section className='pb-4 border-b border-slate-700/80'>
        <p className='text-md font-semibold tracking-[0.22em] uppercase text-cyan-300/90'>The Flow</p>
        <h3 className='mt-2 text-xl font-extrabold tracking-tight text-white'>Academic Architect</h3>
        <p className='mt-2 text-md text-slate-400'>Organize tasks, study plans, and career prep in one workspace.</p>
      </section>

      <section className='flex flex-col gap-2'>
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className='group flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-300/60 hover:bg-slate-800 hover:text-white'
          >
            <span className='text-cyan-300 group-hover:text-cyan-200'>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </section>
    </aside>
  )
}

export default Sidebar