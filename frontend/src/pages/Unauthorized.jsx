import React from 'react'
import { Link } from 'react-router-dom'
import { FaTasks, FaRoute } from 'react-icons/fa'
import { GrPlan } from 'react-icons/gr'
import { MdWorkOutline, MdOutlineWorkspacePremium } from 'react-icons/md'
import { RiFolderChartLine } from 'react-icons/ri'
import { BsGraphUpArrow } from 'react-icons/bs'

const appFeatures = [
  {
    title: 'Smart Dashboard',
    description: 'See your focus areas, profile strength, milestones, and quick actions in one place.',
    icon: <BsGraphUpArrow size='1.1rem' />,
  },
  {
    title: 'Task Manager',
    description: 'Create, update, prioritize, and track deadlines with status-based task progress.',
    icon: <FaTasks size='1.1rem' />,
  },
  {
    title: 'Study Planner',
    description: 'Generate day-wise study plans from your selected subjects and timeline.',
    icon: <GrPlan size='1.1rem' />,
  },
  {
    title: 'Career Hub',
    description: 'Upload your resume, compare against job descriptions, and get AI interview reports.',
    icon: <MdWorkOutline size='1.1rem' />,
  },
  {
    title: 'Roadmap Viewer',
    description: 'Explore structured career roadmaps with stage-wise and skill-wise learning paths.',
    icon: <FaRoute size='1.1rem' />,
  },
  {
    title: 'Inventory Workspace',
    description: 'Store and organize personal workspace assets in one dedicated area.',
    icon: <RiFolderChartLine size='1.1rem' />,
  },
]

const roadmapFlow = [
  'Choose your target role and goals.',
  'Get a staged learning roadmap with key skills.',
  'Turn roadmap goals into daily tasks and study plans.',
  'Use interview reports to close skill gaps and improve job readiness.',
]

const userBenefits = [
  'Faster learning with clear direction instead of random preparation.',
  'Better interview confidence through role-specific preparation plans.',
  'Higher resume relevance by matching your profile to real job requirements.',
  'Consistent progress tracking with saved plans, reports, and milestones.',
]

const Unauthorized = () => {
  return (
    <div className='min-h-[calc(100vh-2rem)] bg-slate-950 px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-6xl'>
        <section className='rounded-3xl border border-cyan-400/35 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 p-6 shadow-lg shadow-cyan-900/20 sm:p-8 lg:p-10'>
          <p className='text-md font-semibold uppercase tracking-[0.2em] text-cyan-200/90'>New Here?</p>
          <h1 className='mt-2 text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl'>
            Welcome to The Flow
          </h1>
          <p className='mt-4 max-w-3xl text-md leading-6 text-slate-300 sm:text-base'>
            The Flow is your AI-powered workspace for learning, planning, and career growth. Build a clear path,
            stay consistent with your goals, and prepare for interviews with personalized guidance.
          </p>

          <div className='mt-6 flex flex-wrap gap-3'>
            <Link
              to='/signup'
              className='rounded-md bg-cyan-400 px-5 py-2.5 text-md font-semibold text-slate-900 transition hover:bg-cyan-300'
            >
              Create Free Account
            </Link>
            <Link
              to='/login'
              className='rounded-md border border-cyan-300 px-5 py-2.5 text-md font-semibold text-cyan-100 transition hover:bg-cyan-300/10'
            >
              Login
            </Link>
          </div>
        </section>

        <section className='mt-6 rounded-2xl border border-slate-700 bg-slate-900/70 p-5 sm:p-6'>
          <h2 className='text-2xl font-bold text-slate-100'>Everything You Can Do in The Flow</h2>
          <p className='mt-2 text-md text-slate-400'>
            Once you sign up, you get access to all productivity and career modules in a single connected system.
          </p>

          <div className='mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {appFeatures.map((feature) => (
              <article
                key={feature.title}
                className='rounded-xl border border-slate-700 bg-slate-800/70 p-4 transition hover:border-cyan-300/60 hover:bg-slate-800'
              >
                <h3 className='flex items-center gap-2 text-base font-semibold text-slate-100'>
                  <span className='text-cyan-300'>{feature.icon}</span>
                  {feature.title}
                </h3>
                <p className='mt-2 text-md text-slate-400'>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className='mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <article className='rounded-2xl border border-slate-700 bg-slate-900/70 p-5 sm:p-6'>
            <h3 className='flex items-center gap-2 text-xl font-bold text-slate-100'>
              <span className='text-cyan-300'>
                <FaRoute size='1.2rem' />
              </span>
              Roadmap Section
            </h3>
            <p className='mt-2 text-md text-slate-400'>
              Your roadmap connects learning with outcomes so you always know what to do next.
            </p>
            <ol className='mt-4 space-y-2 text-md text-slate-300'>
              {roadmapFlow.map((step, idx) => (
                <li key={step} className='rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2'>
                  <span className='mr-2 font-semibold text-cyan-300'>{idx + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>

            <Link to='/roadmaps'
              className='mt-4 inline-flex rounded-md bg-cyan-400 px-5 py-2.5 text-md font-semibold text-slate-900 transition hover:bg-cyan-300'>
              Explore Roadmaps
            </Link>
          </article>

          <article className='rounded-2xl border border-slate-700 bg-slate-900/70 p-5 sm:p-6'>
            <h3 className='flex items-center gap-2 text-xl font-bold text-slate-100'>
              <span className='text-cyan-300'>
                <MdOutlineWorkspacePremium size='1.3rem' />
              </span>
              Benefits for You
            </h3>
            <p className='mt-2 text-md text-slate-400'>
              This platform is designed to reduce overwhelm and turn effort into visible progress.
            </p>
            <ul className='mt-4 space-y-2 text-md text-slate-300'>
              {userBenefits.map((benefit) => (
                <li key={benefit} className='rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2'>
                  {benefit}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className='mt-6 rounded-2xl border border-cyan-400/35 bg-cyan-400/10 p-5 text-center sm:p-6'>
          <h3 className='text-xl font-bold text-slate-100'>Start Building Your Career System Today</h3>
          <p className='mx-auto mt-2 max-w-2xl text-md text-slate-300'>
            Join The Flow to unlock your personalized roadmap, focused daily action plans, and interview-ready growth.
          </p>
          <Link
            to='/signup'
            className='mt-4 inline-flex rounded-md bg-cyan-400 px-5 py-2.5 text-md font-semibold text-slate-900 transition hover:bg-cyan-300'
          >
            Get Started
          </Link>
        </section>
      </div>
    </div>
  )
}

export default Unauthorized
