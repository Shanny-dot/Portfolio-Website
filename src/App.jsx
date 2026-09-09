import React from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import MainframeNavbar from './components/MainframeNavbar';
import HeroSection from './components/HeroSection';
import WhatITestSection from './components/WhatITestSection';
import BugHuntSection from './components/BugHuntSection';
import ToolkitSection from './components/ToolkitSection';
import ProjectCaseStudies from './components/ProjectCaseStudies';
import MetricsDashboard from './components/MetricsDashboard';
import ContactSection from './components/ContactSection';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#070a11] text-slate-100 font-body selection:bg-white selection:text-black">
      {/* Mouse Scrubbing Background Video */}
      <BackgroundVideo />

      {/* Fixed Mainframe Navbar */}
      <MainframeNavbar />

      {/* Main Content Area */}
      <main className="relative z-10">
        <HeroSection />

        {/* Portfolio Content Sections with Dark Glass Backdrop */}
        <div className="relative z-10 bg-[#070a11]/90 backdrop-blur-xl border-t border-white/10">
          <WhatITestSection />
          <BugHuntSection />
          <ToolkitSection />
          <ProjectCaseStudies />
          <MetricsDashboard />
          <ContactSection />
        </div>
      </main>
    </div>
  );
}
