import React from 'react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { HiAcademicCap } from 'react-icons/hi'

const Footer = () => {
  const links = [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Login', href: '/login' },
    { label: 'Courses', href: '/courses' },
  ]

  const socials = [
    { icon: <FaGithub />, href: 'https://github.com/Ayushnigam24' },
    { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/ayush-nigam-b44281376?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { icon: <FaInstagram />, href: 'https://www.instagram.com/ayush_nigam24?igsh=MWJyY3YyNGFzaWVpYQ==' },
  ]

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">

        {/* Main row */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-10 mb-10">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-400 flex items-center justify-center">
                <HiAcademicCap className="text-white text-lg" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">Learnify</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Your go-to learning platform — where every course is a step toward a new skill.
            </p>

            {/* Socials */}
            <div className="flex gap-3 mt-5">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-blue-800 hover:bg-blue-600 flex items-center justify-center text-blue-200 hover:text-white transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-blue-200 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-blue-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-blue-400">
            © {new Date().getFullYear()} Learnify. All Rights Reserved.
          </p>
          <p className="text-xs text-blue-500">
            Crafted with ❤️ by{' '}
            <a
              href="https://github.com/Ayushnigam24"
              target="_blank"
              rel="noreferrer"
              className="text-blue-300 hover:text-white font-semibold transition-colors"
            >
              Ayush Nigam
            </a>
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer