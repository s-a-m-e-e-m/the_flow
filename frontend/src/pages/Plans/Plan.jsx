import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar';
import { getPlanLink } from '../../links';

const Plan = () => {
    const { planId } = useParams();
    const [plan, setPlan] = useState(null);

    const fetchPlan = async () => {
        try {
            const response = await axios.get(`${getPlanLink}/${planId}`, {
                withCredentials: true
            });
            setPlan(response.data?.studyPlan);
        } catch (error) {
            setPlan(null);
        }
    }

    useEffect(() => {
        if (!planId) {
            return;
        }
        fetchPlan();
    }, [planId]);

    if (!plan) {
        return <p className='mx-auto mt-10 w-fit rounded-full border border-slate-700 bg-slate-900/90 px-5 py-2 text-sm font-medium text-slate-200 shadow-lg shadow-cyan-950/20'>Loading...</p>
    }

    return (
        <div className='flex h-full w-full flex-col gap-2 bg-slate-950 md:flex-row'>

            <Sidebar className='hidden border-r border-slate-700 bg-slate-900/80 md:block md:w-1/5' />

            <div className='flex w-full flex-col gap-4 p-3 sm:p-5 md:w-4/5 md:p-8'>
                <section className='rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 p-4 shadow-lg shadow-cyan-900/20 sm:p-6'>
                    <p className='text-lg text-cyan-200/90'>Study Plan</p>
                    <h1 className='mt-1 text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl'>{plan.title}</h1>
                    <p className='mt-3 max-w-3xl text-md leading-6 text-slate-300'>{plan.description}</p>
                </section>

                <h3 className='px-1 text-lg font-semibold text-slate-100 sm:text-xl'>Your Days Wise Study Plan</h3>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                    {plan.plan.map((day, index) => (
                        <section key={index} className='flex flex-col gap-3 rounded-2xl border border-slate-700 bg-slate-900/70 p-4 shadow-lg shadow-cyan-950/10'>
                            <div className='flex items-center justify-between gap-3'>
                                <span className='rounded-lg bg-cyan-400/10 px-2 py-1 text-sm font-semibold text-cyan-200'>Day {day.day_number}</span>
                                <span className='text-md text-white'>{day.subject}</span>
                            </div>
                            <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-200'>Topics to Study</h3>
                            <ul className='space-y-2'>
                                {day.topics.map((topic, idx) => (
                                    <li key={idx} className='rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-sm text-slate-300'>
                                        {topic}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>

                <Link to='/planner' className='mx-auto rounded-full w-[1/2] bg-cyan-400 px-4 py-3 mt-6 mb-6  text-md font-semibold text-slate-900 hover:bg-cyan-300'>
                    Generate New Study Plan
                </Link>
            </div>

        </div>
    )
}

export default Plan