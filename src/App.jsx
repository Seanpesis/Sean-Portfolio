import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Download, Github, Linkedin, ExternalLink, Play, Search , ChevronUp } from 'lucide-react';

// ==========================================
// DATA & CONFIG
// ==========================================
const myData = {
  social: {
    linkedin: "https://www.linkedin.com/in/sean-pesis-28b3b0225/",
    github: "https://github.com/Seanpesis",
    email: "your.email@example.com" // TODO: Change to your email
  },
  experience: [
    {
      role: "Full Stack Engineer", company: "Herzliya Medical Center", dates: "01/2023 - Present",
      points: [
        "Spearheaded a hospital-wide full-stack software initiative to streamline clinical and administrative workflows across 10+ departments.",
        "Architected and maintained a scalable, cloud-native infrastructure utilizing React, Node.js, Docker, and Kubernetes (99.9% uptime).",
        "Engineered a C# project implementing a WebSocket client/server architecture for real-time data transmission.",
        "Managed complex debugging, CI/CD to internal mission-critical systems, significantly enhancing platform stability."
      ]
    },
    {
      role: "IT Help-Desk & Systems Specialist", company: "Herzliya Medical Center", dates: "01/2021 - 12/2022",
      points: [
        "Automated software deployments, routine patching, and user onboarding/offboarding processes using custom scripting.",
        "Administered user accounts, permissions, and Active Directory across core systems, ensuring strict MFA compliance.",
        "Managed over 450 network endpoints, achieving above 98% data recovery success rate.",
        "Authored technical SOPs and runbooks, built an internal knowledge base, and trained staff."
      ]
    }
  ],
  education: [
    { institution: "Holon Institute of Technology (HIT), Israel", degree: "B.Sc. in Computer Science", grade: "Average: 82" },
    { institution: "Holon Institute of Technology (HIT), Israel", degree: "Advanced JavaScript & Node.js Certification", grade: "Final Grade: 99" }
  ],
  skills: [
    { category: "Languages", items: ["JavaScript", "TypeScript", "C#", "Java", "Python", "Kotlin", "Swift"] },
    { category: "Frontend", items: ["React", "Vue.js", "HTML5", "CSS3", "Android Jetpack", "WPF"] },
    { category: "Backend", items: ["Node.js", "RESTful APIs", "Microservices", "MVC/MVVM", "WebSockets"] },
    { category: "Cloud & DevOps", items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Jenkins"] },
    { category: "Databases", items: ["MongoDB", "MySQL", "SQL", "Firebase Firestore", "SQLite"] },
    { category: "AI & Other", items: ["OpenCV", "MediaPipe", "System V Semaphores", "Agile/Scrum", "SOLID"] },
  ]
};

const projectList = [
  {
    title: 'Marketplace App',
    description: 'A location-based social commerce platform written entirely in Kotlin that allows users to trade products in real-time within their immediate vicinity, featuring MVVM architecture, Firebase Firestore for real-time synchronization, advanced GPS integration for location-based sorting, and a complete checkout flow.',
    challenge: 'Building a real-time, location-based marketplace that enables users to discover and trade products with others in their immediate vicinity, requiring seamless GPS integration and real-time data synchronization.',
    solution: 'Developed a Kotlin-based Android app using MVVM architecture, Firebase Firestore for real-time synchronization, advanced GPS integration for location-based sorting, and a complete checkout flow with Android Jetpack components.',
    techStack: 'Kotlin, MVVM Architecture, Firebase Firestore, GPS Integration, Android Jetpack',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
    link: 'https://github.com/Seanpesis/MarketPlaceApp',
    video: 'https://streamable.com/hr40wm',
    category: 'Mobile',
  },
  {
    title: 'Connect Four',
    description: 'Built my final project for a JavaScript + Node.js course 🎓 – an online Connect Four game 🎮. Includes login with MySQL, real-time game management (create, join, moves, cancel), and a simple frontend in HTML/CSS/JS with Hebrew support.',
    challenge: 'Build a full-stack online game with user authentication, real-time interaction, and win logic — all in JavaScript + Node.js.',
    solution: 'A complete Connect Four app 🎮 with Node.js backend, MySQL database, and a clean HTML/CSS/JS frontend.',
    techStack: 'Node.js, JavaScript, MySQL, HTML, CSS',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/686123aa6866d6a54a85f85a/9b39930c5_image.png',
    link: 'https://github.com/Seanpesis/ConnectFour',
    video: 'https://www.kapwing.com/videos/68d44504e8a85cd0aa0e4d4b',
    category: 'Web',
  },
  {
    title: 'SmartCart',
    description: 'SmartCart is an advanced shopping cart management system developed in Java as part of Computer Science studies. It implements MVC architecture, Strategy Pattern, serialization, and unit testing to ensure clean design, flexibility, and reliability.',
    challenge: 'Building a digital shopping cart system that is both flexible and robust, while applying advanced software engineering principles.',
    solution: 'Developed SmartCart – a Java-based system using MVC, Strategy Pattern, serialization, and unit testing to deliver a modular, persistent, and user-friendly shopping cart.',
    techStack: 'Java, JUnit, MVC Architecture, Design Patterns, Serialization',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    link: 'https://github.com/Seanpesis/SmartCart',
    category: 'Other',
  },
  {
    title: 'WSL2 - Task Manager',
    description: 'The code uses Linux semaphores to synchronize multiple processes, allowing them to safely access shared resources without conflicts.',
    challenge: 'Managing concurrent processes in Linux environments often leads to race conditions and resource conflicts.',
    solution: 'Implemented a sophisticated task management system using System V semaphores to ensure thread-safe operations and prevent deadlocks.',
    techStack: 'C, GCC, Linux (WSL2), System V Semaphores',
    image: 'https://i.postimg.cc/FRknKLvZ/image.png',
    link: 'https://github.com/Seanpesis/task-manager-wsl2',
    video: '/videos/wsl2-demo.mp4',
    category: 'Other',
  },
  {
    title: 'ShelterGuard',
    description: 'A web application that helps drivers in Israel plan safer routes by mapping nearby public shelters, scoring route safety, and suggesting safer alternatives.',
    challenge: 'During security alerts in Israel, drivers need quick access to nearby shelters and safe route alternatives.',
    solution: 'Developed an intelligent route planning application that integrates real-time shelter data with mapping technology.',
    techStack: 'React, Vite, Leaflet, JavaScript, Base44 Hosting',
    image: 'https://i.postimg.cc/nz7bP5Xp/image.png',
    link: 'https://github.com/Seanpesis/shelterguard',
    siteLink: 'https://app--shelter-guard-6ba27339.base44.app/',
    category: 'Web',
  },
  {
    title: 'Friendly Place',
    description: 'Social platform for sharing experiences.',
    challenge: 'Creating meaningful connections and experience sharing in digital spaces.',
    solution: 'Built a comprehensive social platform with real-time interactions and user-generated content management.',
    techStack: 'React, Node.js, MongoDB',
    image: 'https://i.postimg.cc/jj1ZBQ9X/image.png',
    siteLink: 'https://friendlyplace.netlify.app/',
    link: 'https://github.com/Seanpesis/friendly-place',
    category: 'Web',
  },
  {
    title: 'Pactroll',
    description: 'Game similar to Pac-Man but with unique twists.',
    challenge: 'Reimagining classic arcade gameplay for modern mobile platforms.',
    solution: 'Developed a mobile-optimized game using Kotlin with enhanced graphics and smooth animations.',
    techStack: 'Android Studio, Kotlin',
    image: 'https://i.postimg.cc/hPhhtL3x/image.png',
    link: 'https://github.com/Seanpesis/pactroll',
    category: 'Mobile',
  },
  {
    title: 'DevOps Project',
    description: 'DevOps portfolio automating CI/CD pipelines, managing infrastructure with Terraform, and deploying applications using Docker and Kubernetes on AWS.',
    challenge: 'Modern software deployment requires automated, scalable, and reliable infrastructure management.',
    solution: 'Architected a complete DevOps ecosystem with IaC, automated CI/CD pipelines, and containerized deployments.',
    techStack: 'CI/CD, Terraform, Docker, Kubernetes',
    image: 'https://i.postimg.cc/rwHqZ78Y/image.png',
    link: 'https://github.com/Seanpesis/devops-portfolio-project',
    category: 'DevOps',
  },
  {
    title: 'TaskIT',
    description: 'A Hebrew task management desktop app built with WPF and .NET, storing tasks locally with SQLite.',
    challenge: 'Hebrew-speaking users needed a native desktop task management solution with RTL support and offline functionality.',
    solution: 'Created a feature-rich WPF application with full Hebrew localization, RTL interface design, and local SQLite database.',
    techStack: 'C#, .NET 8, WPF, XAML, SQLite, Entity Framework Core',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8ffca1203_IMG_0071.jpg',
    link: 'https://github.com/Seanpesis/TaskIT',
    video: 'https://www.kapwing.com/videos/686166b51a582c7957ff9621',
    downloadLink: 'https://drive.google.com/file/d/1YArZc7dhfWa3THS4VK_ID4fiVBgMaX_L/view?usp=drive_link',
    category: 'Desktop',
  },
  {
    title: 'Tetris Game',
    description: 'Developed in Swift for iPad with responsive controls.',
    challenge: 'Adapting the classic Tetris experience for touch-based iPad interfaces.',
    solution: 'Implemented an optimized Swift-based Tetris game with intuitive touch gestures and adaptive layouts.',
    techStack: 'Swift, Xcode',
    image: 'https://i.postimg.cc/RFBhG2dx/image.png',
    category: 'Mobile',
  },
  {
    title: 'DevSecOps-App',
    description: 'DevSecOps platform integrating Jenkins, Kubernetes, and Slack for secure and automated CI/CD pipeline management.',
    challenge: 'Organizations need integrated security throughout their development lifecycle.',
    solution: 'Built a comprehensive DevSecOps platform that embeds security checks into CI/CD pipelines.',
    techStack: 'Jenkins, Kubernetes, Docker, Helm, Prometheus, Grafana, Node.js, NPM, Jest, GitHub, kubectl',
    image: 'https://i.postimg.cc/7Y0xtKCx/image.png',
    link: 'https://github.com/Seanpesis/devsecops-app',
    category: 'DevOps',
  },
  {
    title: 'Movie Recommendations',
    description: 'Platform to discover and get recommendations for movies based on ratings, genres, titles, and directors.',
    challenge: 'Movie enthusiasts struggle to find personalized recommendations from vast catalogs.',
    solution: 'Developed an intelligent recommendation engine that analyzes user preferences across multiple dimensions.',
    techStack: 'React, CSS, Axios, Git & GitHub',
    image: 'https://i.postimg.cc/8CWB7Qc2/image.png',
    siteLink: 'https://movies-and-chills.netlify.app/',
    link: 'https://github.com/Seanpesis/movie-recommendations',
    category: 'Web',
  },
  {
    title: 'Hand-Controlled Pong',
    description: 'An interactive Pong game built with Python, OpenCV, and MediaPipe Hands that allows players to control paddles using real-time hand movements via a webcam.',
    challenge: 'Traditional gaming interfaces limit accessibility and immersion.',
    solution: 'Engineered a computer vision-powered gaming system using MediaPipe and OpenCV.',
    techStack: 'Python, OpenCV, MediaPipe Hands, NumPy',
    image: 'https://i.postimg.cc/qRJh493X/image.png',
    link: 'https://github.com/Seanpesis/Ping_Pong',
    category: 'AI/CV',
  },
  {
    title: "Hand Gesture Tic-Tac-Toe",
    description: "Hand Gesture Tic-Tac-Toe is an interactive game developed using Python, OpenCV, and Mediapipe, enabling users to play Tic-Tac-Toe through real-time hand gesture recognition.",
    challenge: 'Traditional input methods limit game accessibility and user engagement.',
    solution: 'Created an innovative gesture-based gaming interface using advanced computer vision algorithms.',
    techStack: "Python, OpenCV, Mediapipe, NumPy",
    image: "https://i.postimg.cc/vBxBYbmn/image.png",
    link: 'https://github.com/Seanpesis/tic_tac_toe',
    category: 'AI/CV',
  },
  {
    title: "Emoji Gesture App",
    description: "An innovative application that transforms hand gestures into emojis using real-time computer vision and AI. Built with Python, OpenCV, and MediaPipe.",
    challenge: 'Digital communication often lacks the nuance of face-to-face interaction.',
    solution: 'Developed an AI-powered application that instantly converts hand gestures into contextually appropriate emojis.',
    techStack: "Python, OpenCV, MediaPipe, PyQt, NumPy",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/309bc4554_IMG_1666.jpg",
    link: 'https://github.com/Seanpesis/emoji-gesture-app',
    video: 'https://www.loom.com/share/f9ffbdcc44f7404d82adea40e3183047',
    category: 'AI/CV',
  },
  {
    title: 'LifeLine',
    description: 'Smart personal/family management platform with 500+ beta users – features include two-way calendar sync, AI financial advisor, and SOS alerts.',
    challenge: 'Families struggle to coordinate schedules, manage finances, and ensure safety across multiple platforms.',
    solution: 'Engineered a comprehensive family management ecosystem with integrated calendar synchronization, AI-driven financial insights, and emergency response features.',
    techStack: 'React Native, Node.js, AWS S3, MongoDB',
    image: 'https://i.postimg.cc/ZY6m8Zww/Chat-GPT-Image-Jun-29-2025-03-59-17-PM.png',
    link: 'https://github.com/Seanpesis/lifeline',
    category: 'Mobile',
  },
];

const CATEGORIES = ['All', 'Web', 'Mobile', 'DevOps', 'AI/CV', 'Desktop', 'Other'];

const categoryColors = {
  Web: 'from-blue-500 to-cyan-500',
  Mobile: 'from-purple-500 to-pink-500',
  DevOps: 'from-orange-500 to-red-500',
  'AI/CV': 'from-green-500 to-teal-500',
  Desktop: 'from-indigo-500 to-purple-500',
  Other: 'from-slate-500 to-slate-400',
};

// ==========================================
// COMPONENTS
// ==========================================

function VideoEmbed({ video, title }) {
  if (video.includes("streamable.com")) return <iframe src={video.replace('streamable.com/', 'streamable.com/e/')} className="w-full h-72 md:h-96 rounded-xl shadow-inner" frameBorder="0" allowFullScreen title={title} />;
  if (video.includes("kapwing.com")) return <iframe src={video.replace('/videos/', '/e/')} className="w-full h-72 md:h-96 rounded-xl shadow-inner" frameBorder="0" allowFullScreen title={title} />;
  if (video.includes("loom.com")) return <iframe src={video.replace("/share/", "/embed/").split('?')[0]} className="w-full h-72 md:h-96 rounded-xl shadow-inner" frameBorder="0" allowFullScreen title={title} />;
  if (video.includes("drive.google.com")) return <iframe src={video.replace('/view', '/preview')} className="w-full h-72 md:h-96 rounded-xl shadow-inner" frameBorder="0" allowFullScreen title={title} />;
  if (video.includes("youtube.com") || video.includes("youtu.be")) return <iframe src={video.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/")} className="w-full h-72 md:h-96 rounded-xl shadow-inner" frameBorder="0" allowFullScreen title={title} />;
  return <video src={video} controls autoPlay loop muted className="w-full h-72 md:h-96 rounded-xl object-contain shadow-inner bg-black/5" />;
}

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="fixed w-full px-6 py-4 flex justify-between items-center z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-800/50 transition-colors">
        <h1 className="text-xl font-bold tracking-tight cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          Sean Pesis<span className="text-emerald-500"> - Portfolio</span>
        </h1>
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
            {['About', 'Experience', 'Projects', 'Contact'].map(item => (
              <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:text-emerald-500 transition-colors">{item}</a></li>
            ))}
          </ul>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="md:hidden p-2" onClick={() => setIsOpen(true)}><Menu size={20} /></button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col items-center justify-center gap-8 text-2xl font-semibold">
            <button className="absolute top-6 right-6 p-2" onClick={() => setIsOpen(false)}><X size={32} /></button>
            {['About', 'Experience', 'Projects', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="hover:text-emerald-500">{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => (
  <section className="pt-32 pb-20 px-6 min-h-[90vh] flex flex-col-reverse lg:flex-row items-center justify-center gap-16 max-w-7xl mx-auto">
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex-1 space-y-8 text-center lg:text-left z-10">
      <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
        Building robust <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">digital experiences.</span>
      </h2>
      <p className="text-lg md:text-xl text-gray-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
        I'm <strong className="font-semibold text-gray-900 dark:text-white">Sean</strong>, a Results-driven Full Stack Engineer with 3+ years of experience designing, developing, and deploying scalable web applications. Adept at problem-solving and collaborating within Agile teams.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-4">
        <a href="/Sean_CV.pdf" download className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium overflow-hidden transition-transform hover:scale-105 shadow-xl flex items-center gap-3">
          <Download size={18} className="group-hover:-translate-y-1 transition-transform" /> 
          Download Resume
        </a>
        <div className="flex gap-5">
          <a href={myData.social.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors hover:scale-110 transform duration-300">
            <Github size={28} />
          </a>
          <a href={myData.social.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#0A66C2] transition-colors hover:scale-110 transform duration-300">
            <Linkedin size={28} />
          </a>
        </div>
      </div>
    </motion.div>

    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="flex-1 flex justify-center items-center relative w-full max-w-md lg:max-w-lg">
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 to-cyan-500 blob-shadow z-0" />
      <div className="absolute inset-4 bg-gradient-to-bl from-purple-400 to-blue-500 blob-shadow z-0" style={{ animationDelay: '-4s' }} />
      <div className="relative w-72 h-72 md:w-96 md:h-96 z-10 blob-shape border-4 border-white/20 dark:border-slate-800/50 backdrop-blur-sm bg-gray-200 dark:bg-slate-800">
        <img src="/profile.jpg" alt="Sean" className="w-full h-full object-cover" onError={(e) => e.target.style.opacity = 0} />
      </div>
    </motion.div>
  </section>
);

const Skills = () => (
  <section id="about" className="py-24 px-6 bg-white dark:bg-slate-900/50 border-y border-gray-100 dark:border-slate-800 transition-colors">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16">
        <h3 className="text-sm font-bold tracking-widest text-emerald-500 uppercase mb-2">Technical Arsenal</h3>
        <h2 className="text-3xl md:text-4xl font-bold">Tools & Technologies</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myData.skills.map((skillGroup, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: idx * 0.1 }} className="p-8 rounded-3xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700/50 hover:border-emerald-500/30 transition-colors">
            <h4 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">{skillGroup.category}</h4>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((item, i) => (
                <span key={i} className="px-4 py-2 text-sm bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-slate-700 shadow-sm">{item}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" className="py-24 px-6 max-w-5xl mx-auto">
    <h3 className="text-sm font-bold tracking-widest text-emerald-500 uppercase mb-2">Career Path</h3>
    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-gray-900 dark:text-white">Experience & Education</h2>
    
    <div className="space-y-16">
      {myData.experience.map((exp, idx) => (
        <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pl-6 md:pl-0 border-l-2 border-emerald-500/30 md:border-none ml-4 md:ml-0">
          <div className="hidden md:block absolute w-3 h-3 bg-emerald-500 rounded-full -left-[41px] top-2" />
          <div className="md:flex justify-between items-start mb-4">
            <div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.role}</h4>
              <p className="text-lg text-emerald-600 dark:text-emerald-400 font-medium">{exp.company}</p>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-mono mt-2 md:mt-0 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full">{exp.dates}</span>
          </div>
          <ul className="space-y-3 text-gray-600 dark:text-slate-400">
            {exp.points.map((point, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-emerald-500 shrink-0 mt-0.5">▸</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
      
      <div className="pt-16 mt-16 border-t border-gray-200 dark:border-slate-800">
        <h4 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Education</h4>
        <div className="grid md:grid-cols-2 gap-8">
          {myData.education.map((edu, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700/50">
              <h5 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{edu.degree}</h5>
              <p className="text-gray-600 dark:text-slate-400 text-sm">{edu.institution}</p>
              <p className="text-emerald-600 dark:text-emerald-400 text-sm font-mono mt-4">{edu.grade}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Projects = ({ setSelectedProject }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false); // הסטייט ששולט בתצוגה

  const filtered = projectList.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.techStack.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // מציג רק 3 פרויקטים אם הכפתור לא נלחץ
  const displayedProjects = showAll ? filtered : filtered.slice(0, 3);

  return (
    <section id="projects" className="py-24 px-6 bg-white dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-800 transition-colors relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-100" style={{ backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      <div className="max-w-7xl mx-auto relative z-10">

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h3 className="text-sm font-bold tracking-widest text-emerald-500 uppercase mb-2">Portfolio</h3>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">My Projects</h2>
          <p className="text-gray-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            {projectList.length} projects spanning web, mobile, AI, and DevOps
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects or technologies..." 
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500 transition-all text-sm shadow-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setShowAll(false); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25 border-transparent'
                    : 'bg-white dark:bg-slate-800/50 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-slate-700/50 hover:border-gray-300 dark:hover:border-slate-600 hover:text-gray-900 dark:hover:text-white shadow-sm'
                }`}
              >
                {cat}
                {cat !== 'All' && <span className="ml-2 text-xs opacity-60">{projectList.filter(p => p.category === cat).length}</span>}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <motion.div key={project.title} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} onClick={() => setSelectedProject(project)} whileHover={{ y: -6 }}
                className="group cursor-pointer bg-white dark:bg-slate-800/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700/50 hover:border-emerald-500/30 dark:hover:border-slate-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden shrink-0 bg-gray-100 dark:bg-slate-700">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => e.target.style.display = 'none'}/>
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryColors[project.category] || 'from-slate-500 to-slate-400'}`} />
                  
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-lg bg-gradient-to-r ${categoryColors[project.category] || 'from-slate-500 to-slate-400'} text-white shadow`}>
                      {project.category}
                    </span>
                  </div>
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-semibold bg-black/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 flex items-center gap-2">
                      View Details
                    </span>
                  </div>
                  
                  {project.video && (
                    <div className="absolute bottom-3 left-3">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-black/70 text-white backdrop-blur-sm shadow-sm border border-white/10">
                        <Play size={12} className="text-emerald-400" /> Video
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 dark:text-slate-400 text-sm mb-5 line-clamp-2 leading-relaxed flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.techStack.split(', ').slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2.5 py-1 text-xs rounded-md bg-gray-100 dark:bg-slate-700/60 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-600/40 font-medium">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.split(', ').length > 3 && (
                      <span className="px-2.5 py-1 text-xs rounded-md bg-gray-50 dark:bg-slate-700/40 text-gray-500 dark:text-slate-400 border border-gray-100 dark:border-transparent">
                        +{project.techStack.split(', ').length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-slate-700/50">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-gray-400 hover:text-gray-900 dark:text-slate-500 dark:hover:text-white transition-colors" title="View Source">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.siteLink && (
                      <a href={project.siteLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-emerald-500 hover:text-emerald-600 transition-colors" title="Live Site">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.downloadLink && (
                      <a href={project.downloadLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-blue-500 hover:text-blue-600 transition-colors" title="Download">
                        <Download className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* כפתור Show More / Show Less */}
        {filtered.length > 3 && (
          <motion.div layout className="mt-16 flex justify-center">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-500 hover:text-white dark:hover:text-white transition-all duration-300 shadow-lg shadow-emerald-500/10"
            >
              {showAll ? 'Show Less' : 'Show More Projects'}
            </button>
          </motion.div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-slate-500">
            <p className="text-lg">No projects found for "{search}"</p>
          </div>
        )}
      </div>
    </section>
  );
};
const Contact = () => (
  <section id="contact" className="py-12 px-6 relative overflow-hidden transition-colors">
    
    {/* הילת האור (Glow) - מוקטנת ועדינה יותר */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[60px] md:blur-[90px] rounded-full pointer-events-none" />

    {/* רוחב הכרטיסייה צומצם ל- max-w-3xl */}
    <div className="max-w-3xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-8 md:p-10 rounded-[2rem] bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl border border-gray-200/50 dark:border-slate-700/50 text-center shadow-xl dark:shadow-none"
      >
        <h3 className="text-xs font-bold tracking-widest text-emerald-500 uppercase mb-3">What's Next?</h3>
        <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 dark:text-white tracking-tight">Get In Touch</h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-slate-400 font-light leading-relaxed max-w-xl mx-auto mb-8">
          Whether you have a question, an exciting project, or just want to say hi, my inbox is always open. I'll try my best to get back to you!
        </p>
        
        <div className="flex justify-center">
          <a 
            href={`mailto:${myData.social.email}`} 
            className="group relative px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full transition-all duration-300 shadow-md shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-1 flex items-center justify-center overflow-hidden"
          >
            <span className="relative z-10">Say Hello</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false); // סטייט חדש לכפתור

  // מאזין למצב Dark Mode
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  // מונע גלילה מאחורי המודל של הפרויקט
  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedProject]);

  // מאזין לגלילת העמוד כדי להציג/להסתיר את הכפתור
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // פונקציית הקפיצה למעלה
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-[#0f172a] transition-colors duration-500 relative">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <Skills />
      <Experience />
      <Projects setSelectedProject={setSelectedProject} />
      <Contact />
      
      {/* פה נמצא המודל של הפרויקטים (ללא שינוי, השאר אותו כפי שהוא בקוד שלך) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-gray-900/80 dark:bg-black/90 backdrop-blur-md overflow-y-auto"
          >
            {/* ... תוכן המודל שהיה קודם ... */}
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-4xl my-auto shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10 px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">{selectedProject.title}</h2>
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400 transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-8">
                {selectedProject.video ? (
                  <div className="rounded-xl overflow-hidden bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800">
                    <VideoEmbed video={selectedProject.video} title={selectedProject.title} />
                  </div>
                ) : selectedProject.image && (
                  <div className="rounded-xl overflow-hidden bg-gray-50 dark:bg-slate-800/50 flex items-center justify-center p-4 border border-gray-100 dark:border-slate-800">
                    <img src={selectedProject.image} alt={selectedProject.title} className="max-h-80 object-contain rounded-lg" />
                  </div>
                )}
                
                {/* שאר תוכן המודל (Overview, Challenge, Tech Stack וכו') */}
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2">Overview</h3>
                      <p className="text-gray-700 dark:text-slate-300 leading-relaxed">{selectedProject.description}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="pt-6 border-t border-gray-100 dark:border-slate-800 flex flex-col gap-3">
                      {selectedProject.link && (
                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3.5 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white rounded-xl font-semibold transition-all border border-gray-200 dark:border-slate-700">
                          <Github size={18} /> View Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 text-center transition-colors">
        <div className="flex justify-center gap-6 mb-8">
          <a href={myData.social.github} target="_blank" rel="noreferrer" className="p-4 bg-gray-50 dark:bg-slate-800 shadow-sm rounded-full hover:-translate-y-1 hover:text-emerald-500 transition-all border border-gray-200 dark:border-slate-700">
            <Github size={24} />
          </a>
          <a href={myData.social.linkedin} target="_blank" rel="noreferrer" className="p-4 bg-gray-50 dark:bg-slate-800 shadow-sm rounded-full hover:-translate-y-1 hover:text-[#0A66C2] transition-all border border-gray-200 dark:border-slate-700 text-gray-400">
            <Linkedin size={24} />
          </a>
        </div>
        <p className="text-gray-500 dark:text-slate-500 text-sm font-medium">© {new Date().getFullYear()} Sean Pesis</p>
      </footer>

      {/* כפתור חזרה למעלה */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all z-50 flex items-center justify-center group"
            aria-label="Scroll to top"
          >
            <ChevronUp size={28} className="group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}