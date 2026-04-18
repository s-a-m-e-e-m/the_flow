import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white p-10 mt-10">
            <div className='flex flex-col sm:justify-between sm:flex-row gap-10 md:gap-50 mb-6'>
                <div className="">
                    <h2 className="text-xl font-bold">The Flow</h2>
                    <p className="text-gray-400">Your only need for managing workflows</p>
                </div>
                <div className="container ">
                    <a href="#about" className="text-gray-400 text-white hover:cursor-pointer">About</a>
                    <div className="grid gap-2">
                        <span>Contact us</span>
                        <ul className='flex flex-col sm:flex-row gap-2'>
                            <li><a href="https://github.com/s-a-m-e-e-m" className="text-gray-400 hover:text-white flex items-center"><FaGithub className="mr-2" /> GitHub</a></li>
                            <li><a href="https://www.linkedin.com/in/mohammad-sameem-728391313/" className="text-gray-400 hover:text-white flex items-center"><FaLinkedin className="mr-2" /> LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <span className="text-gray-400 text-md hover:text-white">© 2026 The Flow. All rights reserved.</span>
        </footer>
    )
}

export default Footer