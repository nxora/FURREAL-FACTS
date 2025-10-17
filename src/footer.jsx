import { useState } from 'react'
import './App.css'

function Footer() {

    return (
    <footer className="bg-gray-900 text-white py-4 mt-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="font-bold">
            All Rights Reserved &copy; <span>Nexora, 2025</span>
          </p>
          <p className="font-bold">
            Made with 💙 by <span>Nexora</span>
          </p>
        </div>
        <div className="flex gap-6 text-2xl">
          <a
            className="text-blue-400 hover:text-blue-300 transition"
            href="https://www.facebook.com/davex.1011"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            className="text-gray-300 hover:text-white transition"
            href="https://www.github.com/nxora"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            className="text-yellow-400 hover:text-yellow-300 transition"
            href="https://www.snapchat.com/@davex.101"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Snapchat"
          >
            <i className="fab fa-snapchat"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer
