import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../auth/Authcontext';
import axios from 'axios';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { allResumeReportsLink, resumeScoreLink } from '../../links';

const Resumescore = () => {
  const [pastInterviewReports, setPastInterviewReports] = useState([]);
  const [interviewReportId, setInterviewReportId] = useState(null);
  const { loading, setLoading, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchUserInterviewReports = async () => {
    try {
      const response = await axios.get(allResumeReportsLink, { withCredentials: true });
      const reports = Array.isArray(response.data?.interviewReports)
        ? response.data.interviewReports
        : [];
      setPastInterviewReports(reports);

    } catch (error) {
      setPastInterviewReports([]);
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    fetchUserInterviewReports();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resume = e.target.resume.files[0];
    const selfDescription = e.target.selfDescription.value;
    const jobDescription = e.target.jobDescription.value;
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('selfDescription', selfDescription);
    formData.append('jobDescription', jobDescription);
    setLoading(true);
    try {
      const response = await axios.post(resumeScoreLink, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const createdReport = response.data?.interviewReport;
      setInterviewReportId(createdReport?._id || null);
      fetchUserInterviewReports();
    } catch (error) {
      setInterviewReportId(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className='mx-auto mt-10 w-fit rounded-full border border-slate-700 bg-slate-900/90 px-5 py-2 text-sm font-medium text-slate-200 shadow-lg shadow-cyan-950/20'>Loading...</p>
  }

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 sm:flex-row">
      {/* Sidebar */}
      <Sidebar className="hidden border-r border-slate-700 bg-slate-900/80 p-4 lg:block lg:w-2/10" />

      {/* Resume Score Section */}
      <div className="w-full p-3 sm:w-5/10 sm:p-5 lg:w-4/10 lg:p-8">
        <section className='rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 p-4 shadow-lg shadow-cyan-900/20 sm:p-6'>
          <p className='text-xs sm:text-sm text-cyan-200/90'>Career Hub</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
            Calculate Your Resume Score
          </h2>
          <p className='mt-3 max-w-2xl text-sm leading-6 text-slate-300'>
            Upload your resume and compare it against a role description to generate a match report.
          </p>
        </section>
        <form onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-4 items-stretch rounded-2xl border border-slate-700 bg-slate-900/70 p-4 shadow-lg shadow-cyan-950/10 sm:p-6">
          <section className="flex flex-col gap-2">
            <label
              htmlFor="resume-file"
              className="text-sm font-medium text-slate-200">
              Upload Resume
            </label>
            <input
              type="file"
              name="resume"
              accept="application/pdf"
              required
              className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-slate-200 file:mr-4 file:rounded-md file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            />
          </section>

          <section className="flex flex-col gap-2">
            <label
              htmlFor="self-description"
              className="text-sm font-medium text-slate-200">
              Self Description
            </label>
            <textarea
              name="selfDescription"
              rows="6"
              required
              placeholder="Enter a brief summary of yourself"
              className="rounded-md border border-slate-700 bg-slate-800 p-3 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            ></textarea>
          </section>

          <section className="flex flex-col gap-2">
            <label
              htmlFor="job-description"
              className="text-sm font-medium text-slate-200">
              Job Description
            </label>
            <textarea
              name="jobDescription"
              rows="6"
              required
              placeholder="Enter job description"
              className="rounded-md border border-slate-700 bg-slate-800 p-3 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            ></textarea>
          </section>

          <button
            type="submit"
            className="rounded-md bg-cyan-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400">
            Calculate Score
          </button>
        </form>

        {interviewReportId && (
          <p className="mt-4 text-slate-300">
            Your resume report is ready{" "}
            <Link
              to={`/interview-report/${interviewReportId}`}
              className="inline-block rounded-md border border-cyan-300 bg-cyan-400 px-3 py-1 mt-2 font-semibold text-slate-950 transition hover:bg-cyan-300">
              View Report
            </Link>
          </p>
        )}
      </div>

      {/* Previous Reports Section */}
      <div className="w-full p-3 sm:w-5/10 sm:p-5 lg:w-4/10 lg:p-8">
        <section className='rounded-2xl border border-slate-700 bg-slate-900/70 p-4 shadow-lg shadow-cyan-950/10 sm:p-6'>
          <h2 className="text-xl font-bold text-slate-100 mb-2">
            Previous Interview Reports
          </h2>
          <p className="mb-4 text-sm text-slate-400">
            View all your previous interview reports and track your progress over
            time.
          </p>
          {pastInterviewReports?.length === 0 ? (
            <p className="text-slate-400">No reports so far</p>
          ) : (
            <div className="space-y-4">
              {pastInterviewReports.map((ele) => (
                <section
                  key={ele._id}
                  className="rounded-xl border border-slate-700 bg-slate-800/80 p-4 shadow-sm">
                  <h4 className="text-lg font-semibold text-slate-100">{ele.title}</h4>
                  <span className="block text-sm text-slate-300">
                    Your Score: {ele.matchScore ?? "N/A"}
                  </span>
                  <p className="text-sm text-slate-400">
                    Created on: {ele.createdAt ? ele.createdAt.slice(0, 10) : "N/A"}
                  </p>
                  <Link
                    to={`/interview-report/${ele._id}`}
                    className="inline-flex items-center rounded-lg bg-cyan-500 px-3 py-1.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-400 mt-2"
                  >
                    View
                  </Link>
                </section>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Resumescore