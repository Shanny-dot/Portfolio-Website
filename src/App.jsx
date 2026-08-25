import React from 'react';
import HeaderNav from './components/HeaderNav';
import HeroSection from './components/HeroSection';
import WhatITestSection from './components/WhatITestSection';
import BugHuntSection from './components/BugHuntSection';
import ToolkitSection from './components/ToolkitSection';
import ProjectCaseStudies from './components/ProjectCaseStudies';
import MetricsDashboard from './components/MetricsDashboard';
import ContactSection from './components/ContactSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#070a11] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Fixed Header Bar */}
      <HeaderNav />

      {/* Main Single Page Sections */}
      <main className="relative z-10">
        <HeroSection />
        <WhatITestSection />
        <BugHuntSection />
        <ToolkitSection />
        <ProjectCaseStudies />
        <MetricsDashboard />
        <ContactSection />
      </main>
    </div>
  );
}
