import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiZap } from 'react-icons/fi';
import AnimatedLogo from '../components/AnimatedLogo';

gsap.registerPlugin(ScrollTrigger);

export default function AuthLayout({ children }) {
//   useEffect(() => {
//     gsap.from(".auth-box", {
//     //   opacity: 0,
//       y: 40,
//       duration: 1,
//       ease: "power3.out"
//     });
//   }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <AnimatedLogo darkMode={true} />
        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Zentra</span>
      </div>
      <div className="auth-box bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-8">
        {children}
      </div>
    </div>
  );
}
