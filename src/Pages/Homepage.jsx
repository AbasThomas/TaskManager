import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Homepage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  const logoRef = useRef(null);
  const taskCardsRef = useRef([]);

  // Add to ref array
  const addToRefs = (el) => {
    if (el && !taskCardsRef.current.includes(el)) {
      taskCardsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Hero animation
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    });

    // Logo animation
    gsap.from(logoRef.current, {
      rotation: 360,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)"
    });

    // Features animation
    gsap.from(".feature-item", {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)"
    });

    // Task card animations
    taskCardsRef.current.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        x: i % 2 === 0 ? -50 : 50,
        duration: 0.8,
        ease: "power2.out"
      });
    });

    // CTA animation
    gsap.from(ctaRef.current, {
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div ref={logoRef} className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">Zentra</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-indigo-600 transition">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition">How it works</a>
            <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition">Pricing</a>
          </div>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md hover:shadow-lg">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="container mx-auto px-6 py-20 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Focus. Organize. <span className="text-indigo-600">Achieve.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
          Zentra helps you manage tasks effortlessly so you can focus on what really matters.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl text-lg font-medium">
            Try for Free
          </button>
          <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-indigo-400 hover:text-indigo-600 transition text-lg font-medium">
            Watch Demo
          </button>
        </div>
      </section>

      {/* App Preview */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -inset-4 bg-indigo-100 rounded-3xl opacity-50 blur-lg"></div>
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gray-100 h-10 flex items-center px-4 space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="p-6 h-96 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">Z</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Zentra Task Manager</h3>
                <p className="text-gray-600">Loading your organized life...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="container mx-auto px-6 py-12 md:py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to stay productive and organized
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="feature-item bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Task Management</h3>
            <p className="text-gray-600">
              Create, organize, and prioritize tasks with ease. Set due dates, labels, and reminders.
            </p>
          </div>

          <div className="feature-item bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Time Tracking</h3>
            <p className="text-gray-600">
              Track time spent on tasks and projects. Analyze your productivity patterns.
            </p>
          </div>

          <div className="feature-item bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Analytics</h3>
            <p className="text-gray-600">
              Get insights into your productivity with beautiful charts and reports.
            </p>
          </div>
        </div>
      </section>

      {/* Task Cards Section */}
      <section id="how-it-works" className="container mx-auto px-6 py-12 md:py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How Zentra Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple steps to organize your workflow
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div ref={addToRefs} className="flex flex-col md:flex-row items-center gap-8 p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Create Tasks</h3>
              <p className="text-gray-600">
                Quickly add tasks with our intuitive interface. Add descriptions, due dates, and priority levels.
              </p>
            </div>
          </div>

          <div ref={addToRefs} className="flex flex-col md:flex-row items-center gap-8 p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Organize</h3>
              <p className="text-gray-600">
                Group tasks into projects, add tags, and categorize your work for better organization.
              </p>
            </div>
          </div>

          <div ref={addToRefs} className="flex flex-col md:flex-row items-center gap-8 p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Focus</h3>
              <p className="text-gray-600">
                Use our focus mode to concentrate on one task at a time without distractions.
              </p>
            </div>
          </div>

          <div ref={addToRefs} className="flex flex-col md:flex-row items-center gap-8 p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
              4
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Complete</h3>
              <p className="text-gray-600">
                Mark tasks as done and celebrate your progress with our achievement system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-10 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to boost your productivity?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of professionals who are already achieving more with Zentra.
          </p>
          <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition shadow-lg hover:shadow-xl text-lg font-bold">
            Get Started - It's Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Z</span>
              </div>
              <span className="text-2xl font-bold text-white">Zentra</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <a href="#" className="hover:text-white transition">Features</a>
              <a href="#" className="hover:text-white transition">Pricing</a>
              <a href="#" className="hover:text-white transition">Blog</a>
              <a href="#" className="hover:text-white transition">About</a>
              <a href="#" className="hover:text-white transition">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Zentra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}