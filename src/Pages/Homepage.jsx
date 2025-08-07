  import { useEffect, useRef, useState } from 'react';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { FiSun, FiMoon, FiCheck, FiClock, FiBarChart2, FiLayers, FiZap, FiAward, FiSmartphone, FiUsers, FiServer } from 'react-icons/fi';
  import { FaFigma, FaSlack, FaTrello } from 'react-icons/fa';
  import AnimatedLogo from '../components/AnimatedLogo.jsx';
import { useNavigate } from 'react-router-dom';
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);


  // Feature Data
  const features = [
    {
      icon: <FiCheck className="w-8 h-8" />,
      title: "Task Management",
      description: "Create, organize, and prioritize tasks with ease."
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "Time Tracking",
      description: "Track time spent on tasks and projects."
    },
    {
      icon: <FiBarChart2 className="w-8 h-8" />,
      title: "Analytics",
      description: "Get insights into your productivity."
    }
  ];

  const steps = [
    {
      icon: <FiLayers className="w-8 h-8" />,
      title: "Create Tasks",
      description: "Quickly add tasks with our intuitive interface."
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "Organize",
      description: "Group tasks into projects and categories."
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "Achieve",
      description: "Complete tasks and track your progress."
    }
  ];

  const integrations = [
    { icon: <FaFigma className="w-8 h-8" />, name: "Figma" },
    { icon: <FaSlack className="w-8 h-8" />, name: "Slack" },
    { icon: <FaTrello className="w-8 h-8" />, name: "Trello" },
    { icon: <FiSmartphone className="w-8 h-8" />, name: "Mobile" },
    { icon: <FiUsers className="w-8 h-8" />, name: "Teams" },
    { icon: <FiServer className="w-8 h-8" />, name: "API" }
  ];

    const goToSignup = () => {
    navigate('/signup');
  };

  export default function Homepage() {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const appRef = useRef(null);
    const stepsRef = useRef(null);
    const ctaRef = useRef(null);

    // Toggle dark mode and persist in localStorage
    const toggleDarkMode = () => {
      const newMode = !darkMode;
      setDarkMode(newMode);
      localStorage.setItem('darkMode', JSON.stringify(newMode));
    };

    // Check for saved theme preference
    useEffect(() => {
      const savedMode = JSON.parse(localStorage.getItem('darkMode'));
      if (savedMode !== null) {
        setDarkMode(savedMode);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true);
      }
    }, []);

    // Apply dark mode class to body
    useEffect(() => {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, [darkMode]);

    // Animation setup
    useEffect(() => {
      // Initial styles
      gsap.set([heroRef.current, ".feature-card", ".step-card", ctaRef.current], {
        opacity: 0,
        y: 30
      });

      // Hero animation
      gsap.to(heroRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Features animation
      gsap.to(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)"
      });

      // Steps animation
      gsap.to(".step-card", {
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
      });

      // CTA animation
      gsap.to(ctaRef.current, {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      });

      // Floating animation for app screenshot
      gsap.to(appRef.current, {
        scrollTrigger: {
          trigger: appRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        },
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, []);

    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        {/* Floating Particles Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className={`absolute rounded-full ${darkMode ? 'bg-indigo-500/20' : 'bg-indigo-200/50'}`}
              style={{
                width: Math.random() * 10 + 5 + 'px',
                height: Math.random() * 10 + 5 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: Math.random() * 5 + 's'
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <nav className="container mx-auto px-6 py-6 sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 dark:text-gray-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AnimatedLogo darkMode={darkMode} />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Zentra
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Features</a>
              <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">How it works</a>
              <a href="#integrations" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Integrations</a>
              <a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Pricing</a>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>
              <button onClick={goToSignup} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md hover:shadow-lg    cursor-pointer">
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section ref={heroRef} className="container mx-auto px-6 py-20 md:py-15 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 mb-6">
                <span className="font-medium">Version 3.0 is here</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Organize</span> your work, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Amplify</span> your productivity
              </h1>
              <p className="text-xl text-black dark:text-gray-300 mb-10 max-w-lg">
                Zentra helps you manage tasks effortlessly with powerful features designed for modern teams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={goToSignup} className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition shadow-lg hover:shadow-xl text-lg font-medium flex items-center gap-2">
                  <FiZap className="w-5 h-5" />
                  Get Started - Free
                </button>
                <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-lg font-medium">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div ref={appRef} className="relative">
                <div className="absolute -inset-4 bg-indigo-500/10 rounded-3xl blur-xl"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="bg-gray-100 dark:bg-gray-700 h-12 flex items-center px-4 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-6 h-96 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-2xl">Z</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Zentra Dashboard</h3>
                      <p className="text-gray-600 dark:text-gray-400">Loading your productivity hub...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} id="features" className="container mx-auto px-6 py-20 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to stay productive and organized
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="feature-card bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition border border-gray-200 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section ref={stepsRef} id="how-it-works" className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 relative z-10">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Zentra Works</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Simple steps to organize your workflow
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="step-card bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section id="integrations" className="py-20 relative z-10">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Integrations</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Connect with your favorite tools
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {integrations.map((integration, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-200 dark:border-gray-700 flex flex-col items-center"
                >
                  <div className="text-indigo-600 dark:text-indigo-400 mb-3">
                    {integration.icon}
                  </div>
                  <span className="font-medium">{integration.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="py-20 relative z-10">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your productivity?</h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who are already achieving more with Zentra.
              </p>
              <button onClick={goToSignup} className="px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-100 transition shadow-lg hover:shadow-xl text-lg font-bold flex items-center justify-center gap-2 mx-auto">
                <FiZap className="w-5 h-5" />
                Get Started - It's Free
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-12 relative z-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <AnimatedLogo darkMode={true} />
                  <span className="text-2xl font-bold text-white">Zentra</span>
                </div>
                <p className="mb-4">
                  The modern task management solution for teams and individuals.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-white transition">Twitter</a>
                  <a href="#" className="hover:text-white transition">LinkedIn</a>
                  <a href="#" className="hover:text-white transition">GitHub</a>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition">Features</a></li>
                  <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition">Integrations</a></li>
                  <li><a href="#" className="hover:text-white transition">Updates</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                  <li><a href="#" className="hover:text-white transition">Tutorials</a></li>
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition">Support</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition">About</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition">Press</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-12 pt-8 text-center">
              <p>© {new Date().getFullYear()} Zentra. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Global Styles */}
        <style jsx global>{`
          @keyframes float {
            0% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
            }
            100% {
              transform: translateY(0) rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }