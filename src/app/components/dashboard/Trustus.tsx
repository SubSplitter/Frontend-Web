import React from 'react';

export default function TrustUs() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-900 via-transparent via-[45%] to-transparent"></div>
      <div className="fixed inset-0 bg-gradient-to-t from-purple-900 via-transparent via-[45%] to-transparent"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_100%_45%,_rgba(1,2,20,0.9)_80%,_transparent_100%)] backdrop-blur-xl"></div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Hero section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Trust Our AI Platform?</h1>
          <p className="text-lg text-purple-200 max-w-3xl mx-auto">
            Powered by AI, for creators. Our suite of integrated AI tools empowers you to elevate your podcast...
          </p>
        </div>
        
        {/* Security & Privacy section */}
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 mb-16 border border-purple-500/20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
              <div className="w-32 h-32 rounded-full bg-purple-600/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Security, Privacy, and Uptime Guarantee</h2>
              <p className="text-purple-200 mb-4">
                We take your data and security seriously. With 99.9% uptime, bank-level encryption, and a transparent privacy policy, your content and listener data are always protected.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-purple-900/40 text-purple-200 text-sm rounded-full">256-bit Encryption</span>
                <span className="px-3 py-1 bg-purple-900/40 text-purple-200 text-sm rounded-full">GDPR Compliant</span>
                <span className="px-3 py-1 bg-purple-900/40 text-purple-200 text-sm rounded-full">99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-12">Trusted by Leading Podcasters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-16 rounded-full bg-purple-800 border-4 border-black/50 overflow-hidden flex items-center justify-center">
                    <span className="text-2xl text-purple-200">
                      {['🎙️', '🎧', '🎤'][i - 1]}
                    </span>
                  </div>
                </div>
                <div className="pt-8 text-center">
                  <p className="italic text-purple-200 mb-4">
                    "{['This platform revolutionized how I manage my podcast. The analytics alone are worth it!', 
                       'I switched from another service and have never looked back. The growth in my audience speaks for itself.', 
                       'The all-in-one solution I needed. Superior customer support too!'][i - 1]}"
                  </p>
                  <p className="font-semibold text-white">
                    {['Sarah Chen - Tech Talk Today', 'Marcus Johnson - History Uncovered', 'Alicia Rodriguez - Mindful Conversations'][i - 1]}
                  </p>
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { value: '10M+', label: 'Podcast Episodes Hosted' },
              { value: '99.9%', label: 'Uptime Guarantee' },
              { value: '24/7', label: 'Customer Support' }
            ].map((stat, i) => (
              <div key={i} className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                <p className="text-4xl font-bold text-purple-300 mb-2">{stat.value}</p>
                <p className="text-white">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Technology Stack */}
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 mb-16 border border-purple-500/20">
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">Powered by Enterprise-Grade Technology</h2>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {['AWS', 'Google Cloud', 'Cloudflare', 'MongoDB', 'Redis'].map((tech, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-lg bg-purple-900/40 flex items-center justify-center mb-2">
                  <span className="text-xl text-purple-200 font-mono">{tech.charAt(0)}</span>
                </div>
                <span className="text-purple-200">{tech}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-purple-200 max-w-2xl mx-auto">
            Our infrastructure is built on the same technology trusted by Fortune 500 companies, ensuring reliability, scalability, and security for podcasts of any size.
          </p>
        </div>
        
        {/* Security Certifications */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">Industry Certifications</h2>
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
            Enhance customer experience and<br />maximize revenue with your podcasts.
          </h2>
          <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
            Join thousands of successful creators who trust our platform to grow their audience and monetize their content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-lg transition duration-300">
              Start Free Trial
            </button>
            <button className="px-8 py-3 bg-transparent hover:bg-purple-900/30 text-purple-300 border border-purple-500 rounded-full text-lg transition duration-300">
              Try Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}