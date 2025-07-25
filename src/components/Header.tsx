'use client';

import Link from 'next/link';
import { useState } from 'react';
import {FaGithub, FaBars, FaNewspaper } from 'react-icons/fa';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <header className="bg-gray-950 text-yellow-500 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
        <Link href="/news" className="hidden md:flex items-center gap-2 text-yellow-400 hover:text-yellow-300 cursor-pointer">
          <FaNewspaper className="w-5 h-5" />
          <span className="text-sm">News</span>
        </Link>

        <Link href="/home" className="flex items-center gap-3 text-2xl font-bold">
          <img src="/Logo-Live-Stocks-2.png" alt="Live Stocks" className="h-8" />
        </Link>

        <a
          href="https://github.com/yourusername/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-yellow-400 hover:text-yellow-300 cursor-pointer"
        >
          <FaGithub className="w-5 h-5" />
          <span className="text-sm">GitHub</span>
        </a>


        <div className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars className="w-6 h-6 text-yellow-400" />
        </div>
      </div>


      {menuOpen && (
        <div className="md:hidden px-4 py-2 pb-4 bg-zinc-800 border-t border-zinc-700 space-y-4">
          <Link href="/news" className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 cursor-pointer">
            <FaNewspaper className="w-5 h-5" />
            <span>News</span>
          </Link>

          <a
            href="https://github.com/yourusername/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 cursor-pointer"
          >
            <FaGithub className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>
      )}
    </header>
  );
}
