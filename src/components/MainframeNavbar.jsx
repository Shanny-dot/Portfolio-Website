import React, { useState } from 'react';

export default function MainframeNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: 'Labs', href: '#what-i-test' },
    { name: 'Studio', href: '#bug-hunt' },
    { name: 'Openings', href: '#toolkit' },
    { name: 'Shop', href: '#projects' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
        {/* Logo (left) */}
        <a href="#" className="flex flex-row items-center gap-3 group">
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-white font-heading"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-white select-none"
            style={{ letterSpacing: '-0.02em' }}
          >
            ✳︎
          </span>
        </a>

        {/* Desktop nav links (center, hidden below md) */}
        <div className="hidden md:flex flex-row items-center text-[23px] text-white">
          {links.map((link, idx) => (
            <React.Fragment key={link.name}>
              <a
                href={link.href}
                className="hover:opacity-60 transition-opacity"
              >
                {link.name}
              </a>
              {idx < links.length - 1 && <span className="mr-[2px]">,&nbsp;</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Desktop CTA (right, hidden below md) */}
        <a
          href="#contact"
          className="hidden md:block text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>

        {/* Mobile hamburger (visible below md) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative z-20 flex flex-col gap-[5px] p-2 focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 transform ${
              menuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 transform ${
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile overlay (z-index: 9) */}
      <div
        className={`fixed inset-0 bg-black/90 backdrop-blur-md z-[9] flex flex-col justify-center items-start px-8 gap-8 transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity"
          >
            {link.name}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="text-[32px] font-medium text-white underline underline-offset-4 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>
      </div>
    </>
  );
}
