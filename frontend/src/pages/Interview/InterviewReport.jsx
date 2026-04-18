import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import ProgressBar from '../../components/ProgressBar';
import Sidebar from '../../components/Sidebar';
import { downloadResumeLink, getInterviewReportLink } from '../../links';

const InterviewReport = () => {
    const { reportId } = useParams();
    const [resumeReport, setResumeReport] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        if (!reportId) {
            setResumeReport(null);
            return;
        }

        const fetchInterviewReport = async () => {
            try {
                const response = await axios.get(`${getInterviewReportLink}/${reportId}`, {
                    withCredentials: true
                });
                const report = response.data?.interviewReport ?? response.data;
                setResumeReport(report);
            } catch (error) {
                setResumeReport(null);
            }
        }
        fetchInterviewReport();
    }, [reportId]);

    if (!resumeReport) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 bg-slate-950">
                <div className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 p-10 text-center text-slate-300 shadow-lg shadow-cyan-900/20 backdrop-blur-sm">
                    Loading report...
                </div>
            </div>
        );
    }

    const score = resumeReport?.matchScore || 0;

    const handleDownloadResume = async () => {
        if (!reportId || isDownloading) return;

        try {
            setIsDownloading(true);

            const response = await axios.get(`${downloadResumeLink}/${reportId}`, {
                withCredentials: true,
                responseType: 'blob'
            });

            const fileBlob = new Blob([response.data], { type: 'application/pdf' });
            const fileUrl = URL.createObjectURL(fileBlob);
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = `resume_${reportId}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(fileUrl);

        } catch (error) {
            console.error('Failed to download resume PDF:', error);
            alert('Unable to download resume right now. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="flex h-full w-full flex-col bg-slate-950 px-4 py-8 sm:px-6 lg:px-8 md:flex-row">

            <Sidebar className="hidden border-r border-slate-700 bg-slate-900/80 md:block md:w-2/10" />

            <div className='flex flex-col w-full md:w-8/10 md:pl-6'>
                <div className="w-full rounded-3xl border border-slate-700 bg-slate-900/70 p-5 shadow-lg shadow-cyan-900/20 backdrop-blur-sm sm:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="w-full space-y-3 sm:w-1/2">
                            <h2 className="text-2xl font-extrabold tracking-tight text-slate-100">Resume Report</h2>
                            <h2 className="text-lg font-semibold text-cyan-300">{resumeReport.title}</h2>
                            <p className="text-slate-300">
                                Your Score:{" "}
                                <span className="inline-flex items-center rounded-full bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-300/30">
                                    {resumeReport.matchScore ?? "N/A"}
                                </span>
                            </p>

                            <p className='text-slate-300'>We have created a customized resume for you based on the job requirements. It highlights your relevant experience and skills. It is tailored to match the job description and increase your chances of getting shortlisted.</p>
                            <button
                                type="button"
                                onClick={handleDownloadResume}
                                disabled={isDownloading}
                                className="rounded-md bg-cyan-400 px-4 py-2 text-slate-900 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isDownloading ? 'Downloading...' : 'Download Customized Resume'}
                            </button>

                            <p className='text-slate-300'>Want to check your score for another job? <Link to={'/interview-report'} className='text-cyan-300 hover:text-cyan-200'>Click here</Link> to generate another new report.</p>
                        </div>

                        <div className="flex items-center justify-center rounded-2xl ">
                            <ProgressBar percent={score} />
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-3 rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-sm shadow-cyan-900/10">
                    <h3 className="text-lg font-bold text-slate-100">Skills Gap</h3>
                    {(!Array.isArray(resumeReport?.skillGaps) ||
                        resumeReport.skillGaps.length === 0) ? (
                        <p className="rounded-xl bg-emerald-300/10 px-4 py-3 text-emerald-300 ring-1 ring-emerald-300/30">
                            You fit perfectly, no extra skills required
                        </p>
                    ) : (
                        resumeReport.skillGaps.map((ele, idx) => (
                            <ul
                                key={idx}
                                className=" space-y-1 rounded-xl border border-slate-700 bg-slate-800/70 p-4 shadow-sm"
                            >
                                <li className="text-slate-300"><span className="font-medium text-slate-100">Skill:</span> {ele.skill}</li>
                                <li className="text-slate-300"><span className="font-medium text-slate-100">Severity:</span> {ele.severity}</li>
                            </ul>
                        ))
                    )}
                </div>

                <div className="mt-8 space-y-3 rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-sm shadow-cyan-900/10">
                    <h3 className="text-lg font-bold text-slate-100">Preparation Plan</h3>
                    <p className="text-slate-400">
                        Day wise preparation tips to improve your interview performance.
                    </p>
                    {resumeReport?.preparationPlan?.map((ele, idx) => (
                        <ul
                            key={idx}
                            className=" space-y-1 rounded-xl border border-slate-700 bg-slate-800/70 p-4 shadow-sm"
                        >
                            <li className="text-slate-300"><span className="font-medium text-slate-100">Day:</span> {ele.day}</li>
                            <li className="text-slate-300"><span className="font-medium text-slate-100">Focus:</span> {ele.focus}</li>
                            <li className="text-slate-300"><span className="font-medium text-slate-100">Tasks:</span> {ele.tasks.join(", ")}</li>
                        </ul>
                    ))}
                </div>

                <div className="mt-8 space-y-4 rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-sm shadow-cyan-900/10">
                    <h3 className="text-lg font-bold text-slate-100">
                        Technical Questions to Prepare
                    </h3>
                    {resumeReport?.technicalQuestions?.length > 0 ? (
                        resumeReport.technicalQuestions.map((ele, idx) => (
                            <ul
                                key={idx}
                                className=" space-y-1 rounded-xl border border-slate-700 bg-slate-800/70 p-4 shadow-sm"
                            >
                                <li className="text-slate-300"><span className="font-medium text-slate-100">Question:</span> {ele.question}</li>
                                <li className="text-slate-300">
                                    Intention: {ele.intention}
                                </li>
                                <li className="text-slate-300"><span className="font-medium text-slate-100">Expected Answer:</span> {ele.answer}</li>
                            </ul>
                        ))
                    ) : (
                        <p className="rounded-xl bg-slate-800/70 px-4 py-3 text-slate-300 ring-1 ring-slate-700">No technical questions to prepare.</p>
                    )}
                </div>

                <div className="mt-8 space-y-4 rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-sm shadow-cyan-900/10">
                    <h3 className="text-lg font-bold text-slate-100">
                        Behavioral Questions to Prepare
                    </h3>
                    {resumeReport?.behavioralQuestions?.length > 0 ? (
                        resumeReport.behavioralQuestions.map((ele, idx) => (
                            <ul
                                key={idx}
                                className=" space-y-1 rounded-xl border border-slate-700 bg-slate-800/70 p-4 shadow-sm"
                            >
                                <li className="text-slate-300"><span className="font-medium text-slate-100">Question:</span> {ele.question}</li>
                                <li className="text-slate-300">
                                    Intention: {ele.intention}
                                </li>
                                <li className="text-slate-300"><span className="font-medium text-slate-100">Expected Answer:</span> {ele.answer}</li>
                            </ul>
                        ))
                    ) : (
                        <p className="rounded-xl bg-slate-800/70 px-4 py-3 text-slate-300 ring-1 ring-slate-700">No behavioral questions to prepare.</p>
                    )}
                </div>

                <Link to='/interview-report' className='mx-auto rounded-full w-[1/2] bg-cyan-400 px-4 py-3 mt-6 mb-6  text-md font-semibold text-slate-900 hover:bg-cyan-300'>
                    Generate New Report
                </Link>
            </div>
        </div>
    );
}

export default InterviewReport