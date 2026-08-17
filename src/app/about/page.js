// app/about/page.jsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Custom CSS for Animations ---
const animationStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in { animation: fadeInUp 0.8s ease-out forwards; }
  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
`;

// --- Reusable Glass Container ---
const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-black/30 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- UPDATED HEADER ---
const PageHeader = ({ title, breadcrumbs }) => (
  
  <header className="relative pt-48 pb-12 flex flex-col items-start justify-center text-left animate-fade-in">
    <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white drop-shadow-lg">
      {title}
    </h1>
    <p className="mt-4 text-sm md:text-base text-gray-300 font-medium tracking-wide">
      <Link href="/" className="hover:text-white transition-colors hover:underline">Home</Link> 
      <span className="mx-2">/</span> 
      <span className="text-blue-200">{breadcrumbs}</span>
    </p>
    
  </header>
);

const TeamMemberCard = ({ imageUrl, name, role, description, delay }) => (
  <div className={`animate-fade-in opacity-0 ${delay}`}>
    <GlassCard className="p-8 text-center hover:bg-black/40 transition-all duration-500 hover:scale-105 group">
      <div className="relative w-28 h-28 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 group-hover:border-blue-400 transition-colors duration-500"></div>
        <Image src={imageUrl} alt={name} fill className="rounded-full object-cover p-1" />
      </div>
      <p className="text-xs text-blue-300 uppercase tracking-widest font-semibold mb-2">{role}</p>
      <h3 className="text-2xl font-bold text-white mb-3">{name}</h3>
      <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
    </GlassCard>
  </div>
);

const FeatureSection = ({ imageUrl, title, children, reverse = false }) => (
  <GlassCard className="p-6 md:p-10 animate-fade-in opacity-0 delay-100">
    <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
      <div className="w-full md:w-1/2">
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
          <Image src={imageUrl} alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 border-b border-white/10 pb-4 inline-block md:block">
          {title}
        </h2>
        <div className="space-y-4 text-gray-200 leading-relaxed text-lg">
          {children}
        </div>
      </div>
    </div>
  </GlassCard>
);

export default function AboutPage() {
  const teamMembers = [
    { imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop', name: 'Hammad', role: 'Founder', description: 'I believe in quality, transparency, and long-term value for our users and clients' },
    { imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop', name: 'Ali', role: 'CEO', description: 'I believe in quality, transparency, and long-term value for our users and clients' },
    { imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop', name: 'Arslan', role: 'Marketing Head', description:'I believe in quality, transparency, and long-term value for our users and clients'},
    { imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop', name: 'Ahmad', role: 'Lead Developer', description: 'I believe in quality, transparency, and long-term value for our users and clients' },
    { imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop', name: 'Awais', role: 'Ops Manager', description: 'I believe in quality, transparency, and long-term value for our users and clients' },
    { imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop', name: 'Umar', role: 'Finance Director', description: 'I believe in quality, transparency, and long-term value for our users and clients' },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <style jsx global>{animationStyles}</style>

      {/* Full Page Fixed Background */}
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="/images/background.jpg" 
          alt="Main Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-blue-900/60"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        <PageHeader title="About Us" breadcrumbs="About" />

        <section className="py-12">
          <FeatureSection imageUrl="/images/logocar.jpeg" title="Car Company">
            <p>Hates wrongdoing, rejects false accusations, and only pursues what is praiseworthy.</p>
            <p>Are the debts of pleasures of the body often held against someone, from which their comforts, labors, pains, and any delightful escape arise?</p>
          </FeatureSection>
        </section>

        <section className="py-12">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} {...member} delay={`delay-${(index % 3 + 1) * 100}`} />
            ))}
          </div>
        </section>
        
        <section className="py-12">
          <FeatureSection imageUrl="/images/history.jpg" title="Our History" reverse={true}>
            <p>Hates wrongdoing, rejects false accusations, and seeks only what is worthy of praise.</p>
            <p>Are the debts of the body’s pleasures often accompanied by troubles, from which come their comforts, labors, pains, and any delightful escapes?</p>
          </FeatureSection>
        </section>

        <section className="py-12 animate-fade-in delay-300">
          <GlassCard className="bg-gradient-to-r from-blue-600/40 to-blue-800/40 border-blue-400/30">
            <div className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
              <div className="mb-8 md:mb-0">
                <h2 className="text-3xl font-bold text-white">What are you waiting for?</h2>
                <p className="mt-2 text-blue-100 max-w-xl">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Experience the luxury today.
                </p>
              </div>
              <a href="#" className="bg-white text-blue-700 font-bold py-4 px-10 rounded-full shadow-lg hover:bg-blue-50 hover:scale-105 transition-transform duration-300 whitespace-nowrap">
                Rent a Car Now
              </a>
            </div>
          </GlassCard>
        </section>

      </div>
    </main>
  );
}