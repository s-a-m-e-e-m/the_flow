import React from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/Authcontext';
import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { MdStars } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { GrPlan } from "react-icons/gr";
import { MdWorkOutline } from "react-icons/md";
import { RiFolderChartLine } from "react-icons/ri";

const quickActions = [
        {
            title: 'Manage Tasks',
            description: 'Plan your day with priority-based tasks.',
            icon: <FaTasks size="1.1rem" />,
            to: '/tasks',
            cta: 'Open Tasks',
        },
        {
            title: 'Study Planner',
            description: 'Build and track your AI learning plan.',
            icon: <GrPlan size="1.1rem" />,
            to: '/planner',
            cta: 'Open Planner',
        },
        {
            title: 'Career Hub',
            description: 'Generate interview reports and improve resume match.',
            icon: <MdWorkOutline size="1.1rem" />,
            to: '/interview-report',
            cta: 'Open Career Hub',
        },
        {
            title: 'Roadmap Viewer',
            description: 'The roadmap gives you a clear view of the skills and milestones needed to reach your target role.',
            icon: <RiFolderChartLine size="1.1rem" />,
            to: '/roadmaps',
            cta: 'Open Roadmaps',
        },
    ];

const Home = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const roadmap = user?.careerRoadmap?.stages || [];
    const roadmapPreview = roadmap.slice(0, 3).flatMap(stage => stage.skills);
    const profileStrength = Math.min(
        100,
        [user?.targetRole, roadmap.length > 0].filter(Boolean).length * 50
    );

    const firstName = user?.username ? user.username.split(' ')[0] : 'Learner';

    return (
        <div className='w-full h-full flex bg-slate-950'>
            <Sidebar className='hidden md:flex md:w-72 md:shrink-0 border-slate-700 bg-slate-900/80' />

            <div className='flex-1 p-3 sm:p-5 lg:p-8'>
                <section className='rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 p-4 sm:p-6 lg:p-8 shadow-lg shadow-cyan-900/20'>
                    <p className='text-xs sm:text-sm text-cyan-200/90'>Welcome back</p>
                    <h1 className='mt-1 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight'>
                        {firstName}, shape your next career move
                    </h1>
                    <p className='mt-3 max-w-2xl text-sm sm:text-base text-slate-300'>
                        The Flow keeps your tasks, interview prep, and learning roadmap together. Focus on one step at a time and keep momentum every day.
                    </p>

                    <section className='mt-5 flex flex-wrap gap-3'>
                        <Link
                            to='/tasks'
                            className='rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-300 transition-colors'
                        >
                            Start Today's Tasks
                        </Link>
                        <Link
                            to='/interview-report'
                            className='rounded-md border border-cyan-300 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/10 transition-colors'
                        >
                            Check Resume Match
                        </Link>
                    </section>
                </section>

                <section className='mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4'>
                    <article className='rounded-xl border border-slate-700 bg-slate-900/70 p-4'>
                        <p className='text-xs text-slate-400'>Target Role</p>
                        <h3 className='mt-2 text-lg font-semibold text-slate-100'>{user?.targetRole || 'No role selected'}</h3>
                    </article>

                    <article className='rounded-xl border border-slate-700 bg-slate-900/70 p-4'>
                        <p className='text-xs text-slate-400'>Roadmap Skills</p>
                        <h3 className='mt-2 text-lg font-semibold text-slate-100'>{roadmap.length}</h3>
                    </article>

                    <article className='rounded-xl border border-slate-700 bg-slate-900/70 p-4'>
                        <p className='text-xs text-slate-400'>Profile Strength</p>
                        <h3 className='mt-2 text-lg font-semibold text-slate-100'>{profileStrength}%</h3>
                        <div className='mt-3 h-2 rounded-full bg-slate-700'>
                            <div className='h-2 rounded-full bg-emerald-400' style={{ width: `${profileStrength}%` }}></div>
                        </div>
                    </article>

                    <article className='rounded-xl border border-slate-700 bg-slate-900/70 p-4'>
                        <p className='text-xs text-slate-400'>Next Milestone</p>
                        <h3 className='mt-2 text-lg font-semibold text-slate-100'>Next interview-ready report</h3>
                    </article>
                </section>

                <section className='mt-4 sm:mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4'>
                    <section className='xl:col-span-2 rounded-2xl border border-slate-700 bg-slate-900/70 p-4 sm:p-5'>
                        <h2 className='text-xl font-bold'>Quick Actions</h2>
                        <p className='mt-1 text-sm text-slate-400'>Jump into key workflows and keep your progress moving.</p>

                        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3'>
                            {quickActions.map((action) => (
                                <Link
                                    key={action.title}
                                    to={action.to}
                                    className='group rounded-xl border border-slate-700 bg-slate-800/70 p-4 hover:border-cyan-300/60 hover:bg-slate-800 transition-colors'
                                >
                                    <h3 className='flex items-center gap-2 font-semibold text-slate-100'>
                                        <span className='text-cyan-300'>{action.icon}</span>
                                        {action.title}
                                    </h3>
                                    <p className='mt-2 text-sm text-slate-400'>{action.description}</p>
                                    <p className='mt-3 text-sm font-medium text-cyan-300 group-hover:text-cyan-200'>{action.cta}</p>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className='rounded-2xl border border-slate-700 bg-slate-900/70 p-4 sm:p-5'>
                        <h3 className='flex gap-2 items-center text-2xl font-bold mb-3'>
                            <MdStars size={'1.8rem'} />
                            Career Snapshot
                        </h3>

                        <section className='bg-slate-800 border border-slate-700 rounded-md p-3 flex flex-col gap-2'>
                            <p className='text-sm text-slate-300'>Target Role Match</p>
                            <h4 className='font-semibold text-lg'>{user?.targetRole || 'Not set yet'}</h4>
                            <p className='text-sm text-slate-400'>Start matching jobs with your current target role.</p>
                            <Link to="/interview-report" className='mt-1 w-fit bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-3 py-1 rounded-md'>Run Match</Link>
                        </section>

                        <section className='bg-slate-800 border border-slate-700 rounded-md p-3 flex flex-col gap-2 mt-3'>
                            <h3 className='text-lg font-bold'>Roadmap Preview</h3>
                            {roadmapPreview.length === 0 ? (
                                <p className='text-sm text-slate-400'>No roadmap items available yet. Generate one from Career Hub.</p>
                            ) : (
                                <ul className='flex flex-col gap-1.5 list-disc list-inside text-sm text-slate-200'>
                                    {roadmapPreview.map((skill, idx) => (
                                        <li key={idx}>{skill}</li>
                                    ))}
                                </ul>
                            )}
                            <Link to="/roadmaps" className='bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-md mt-2 w-fit text-sm'>View Full Roadmap</Link>
                        </section>
                    </section>
                </section>
            </div>
        </div>
    )
}

export default Home