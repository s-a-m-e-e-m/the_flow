import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Home from './pages/Home';
import InterviewReport from './pages/Interview/InterviewReport';
import Navbar from './components/Navbar';
import TasksBoard from './pages/Tasks/Tasksboard';
import Resumescore from './pages/Interview/Resumescore';
import Planner from './pages/Plans/Planner';
import Plan from './pages/Plans/Plan';
import RoadmapViewer from './roadmaps/RoadmapViewer';
import Footer from './components/Footer';
import Unauthorized from './pages/Unauthorized';

const App = () => {
  return (
    <Router>
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        <main className='flex-1 min-h-0'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/home' element={<Home />} />
            <Route path='/tasks' element={<TasksBoard />} />
            <Route path='/planner' element={<Planner />} />
            <Route path='/plan/:planId' element={<Plan />} />
            <Route path='/interview-report' element={<Resumescore />} />
            <Route path='/interview-report/:reportId' element={<InterviewReport />} />
            <Route path='/roadmaps' element={<RoadmapViewer />} />
            <Route path='/' element={<Unauthorized />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
