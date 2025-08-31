import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { ExternalLink, BookOpen, TrendingUp, Target, Briefcase } from 'lucide-react';


const Header = () => (
  <header style={{ 
    position: 'fixed', 
    top: 0, 
    width: '100%', 
    background: 'rgba(0, 0, 0, 0.9)', 
    padding: '1rem 2rem', 
    zIndex: 1000,
    backdropFilter: 'blur(10px)'
  }}>
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div style={{ color: '#ff9696', fontSize: '1.5rem', fontWeight: 'bold' }}>RoadmapAI</div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', font: 'inherit' }}>Home</Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none', font: 'inherit' }}>About</Link>
        <Link to="/contact" style={{ color: 'white', textDecoration: 'none', font: 'inherit' }}>Contact</Link>
      </div>
    </nav>
  </header>
);

const Footer = () => (
  <footer style={{ 
    background: 'rgba(0, 0, 0, 0.9)', 
    color: 'white', 
    padding: '2rem', 
    textAlign: 'center',
    marginTop: '4rem'
  }}>
    <p>&copy; 2025 RoadmapAI. All rights reserved.</p>
  </footer>
);

const HomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmapSteps, setRoadmapSteps] = useState([]);
  const [showRoadmap, setShowRoadmap] = useState(false);

  // Sample images for gallery
  const sampleCards = [
    { IMG: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmOWZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzMzNzNkYyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkphdmFTY3JpcHQgUm9hZG1hcDwvdGV4dD48L3N2Zz4=', topic: 'JavaScript Roadmap' },
    { IMG: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmZmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzA2OTEwNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRhdGEgU2NpZW5jZSBSb2FkbWFwPC90ZXh0Pjwvc3ZnPg==', topic: 'Data Science Roadmap' },
    { IMG: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmM2M3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2Q5NzcwNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1hY2hpbmUgTGVhcm5pbmcgUm9hZG1hcDwvdGV4dD48L3N2Zz4=', topic: 'Machine Learning Roadmap' },
    { IMG: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmRmMmY4Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzc5MjM5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZ1bGxzdGFjayBSb2FkbWFwPC90ZXh0Pjwvc3ZnPg==', topic: 'Fullstack Roadmap' },
    { IMG: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWZmNmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2MwMjU5OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkN5YmVyc2VjdXJpdHkgUm9hZG1hcDwvdGV4dD48L3N2Zz4=', topic: 'Cybersecurity Roadmap' },
    { IMG: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmZGY0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzA1OTA0YSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRldm9wcyBSb2FkbWFwPC90ZXh0Pjwvc3ZnPg==', topic: 'DevOps Roadmap' },
  ];

  // Job opportunities data for different topics
  const getJobOpportunities = (topic) => {
    const jobData = {
      'javascript': {
        jobs: ['Frontend Developer', 'Full Stack Developer', 'React Developer', 'Node.js Developer'],
        links: [
          { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/search/?keywords=javascript%20developer' },
          { name: 'Stack Overflow Jobs', url: 'https://stackoverflow.com/jobs?q=javascript' },
          { name: 'Indeed', url: 'https://www.indeed.com/jobs?q=javascript+developer' }
        ]
      },
      'data science': {
        jobs: ['Data Scientist', 'Data Analyst', 'ML Engineer', 'Business Intelligence Analyst'],
        links: [
          { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/search/?keywords=data%20scientist' },
          { name: 'Kaggle Jobs', url: 'https://www.kaggle.com/jobs' },
          { name: 'Indeed', url: 'https://www.indeed.com/jobs?q=data+scientist' }
        ]
      },
      'machine learning': {
        jobs: ['ML Engineer', 'AI Research Scientist', 'Data Scientist', 'Computer Vision Engineer'],
        links: [
          { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/search/?keywords=machine%20learning%20engineer' },
          { name: 'Google Jobs', url: 'https://jobs.google.com/search?q=machine%20learning' },
          { name: 'Indeed', url: 'https://www.indeed.com/jobs?q=machine+learning' }
        ]
      },
      'react': {
        jobs: ['React Developer', 'Frontend Developer', 'UI Developer', 'JavaScript Developer'],
        links: [
          { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/search/?keywords=react%20developer' },
          { name: 'Stack Overflow', url: 'https://stackoverflow.com/jobs?q=react' },
          { name: 'Indeed', url: 'https://www.indeed.com/jobs?q=react+developer' }
        ]
      },
      'python': {
        jobs: ['Python Developer', 'Backend Developer', 'Data Scientist', 'DevOps Engineer'],
        links: [
          { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/search/?keywords=python%20developer' },
          { name: 'Python Jobs', url: 'https://www.python.org/jobs/' },
          { name: 'Indeed', url: 'https://www.indeed.com/jobs?q=python+developer' }
        ]
      },
      'default': {
        jobs: ['Software Developer', 'Technical Specialist', 'Project Manager', 'Consultant'],
        links: [
          { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/' },
          { name: 'Stack Overflow', url: 'https://stackoverflow.com/jobs' },
          { name: 'Indeed', url: 'https://www.indeed.com/jobs' }
        ]
      }
    };

    const key = topic.toLowerCase().trim();
    return jobData[key] || jobData['default'];
  };

  const fetchRoadmapFromGemini = async (topic) => {
    if (!topic || topic.trim() === "") {
      setOutputText('⚠️ Please enter a topic to generate a roadmap.');
      setShowRoadmap(false);
      setRoadmapSteps([]);
      return;
    }
    setLoading(true);
    setOutputText('');
    setShowRoadmap(false);

    // Mock API for demonstration
    setTimeout(() => {
      const mockSteps = [
        `Learn ${topic} fundamentals and core concepts`,
        `Practice ${topic} basics with hands-on projects`,
        `Build intermediate ${topic} applications`,
        `Master advanced ${topic} techniques`,
        `Create portfolio projects in ${topic}`,
        `Apply for ${topic} related positions`
      ];

      setOutputText('✅ Roadmap generated successfully!');
      setShowRoadmap(true);
      setRoadmapSteps(mockSteps);
      setLoading(false);
    }, 2000);
  };

  const handleButtonClick = () => {
    fetchRoadmapFromGemini(inputValue);
  };

  const handleReadMore = (topic) => {
    const searchQuery = `${topic} tutorial guide learn complete course`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
  };

  const handleJobLink = (url) => {
    window.open(url, '_blank');
  };

  const SingleGalleryItem = ({ IMG, topic }) => (
    <div
      className="gallery-item"
      style={{ cursor: 'pointer' }}
      onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(topic + ' complete guide information details')}`, '_blank')}
    >
      <img src={IMG} alt={topic} />
    </div>
  );

  const jobData = getJobOpportunities(inputValue);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', background: '#000', minHeight: '100vh' }}>
      <style>{`
        /* Enhanced styles with fixed overlapping issues */
        .loader {
          color: #ffe89e;
          font-size: 1.2rem;
          margin: 1rem 0;
        }

        .home-area {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .big-container {
          margin-top: 4rem;
          background: #000;
          align-items: center;
          min-height: 100vh;
          display: flex;
          flex-wrap: wrap;
          margin-right: -15px;
          margin-left: -15px;
          user-select: none;
        }

        .middle-container {
          margin-left: 15%;
          width: 100%;
        }

        .small-container {
          flex: 0 0 50%;
          max-width: 90%;
          user-select: none;
          position: relative;
          width: 100%;
          padding-right: 15px;
          padding-left: 15px;
        }

        .small-container h2 {
          animation-delay: 900ms;
          opacity: 1;
          font-weight: 700;
          font-size: 82px;
          display: block;
          margin-bottom: 0;
          background: -webkit-linear-gradient(#ff9696, #ffe89e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation-duration: 1s;
          animation-fill-mode: both;
          animation-name: bounceInDown;
          font-family: "Poppins", sans-serif;
          color: white;
          line-height: 1.3;
        }

        .small-container p {
          animation-delay: 500ms;
          opacity: 1;
          color: #ffffff;
          margin-bottom: 50px;
          display: block;
          animation-duration: 1s;
          animation-fill-mode: both;
          animation-name: bounceInDown;
          font-size: 16px;
          font-weight: 400;
          font-family: "Poppins", sans-serif;
          user-select: none;
        }

        .btn-container {
          animation-delay: 100ms;
          opacity: 1;
          animation-duration: 1s;
          animation-fill-mode: both;
          animation-name: bounceInDown;
          user-select: none;
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .btn-1, .btn-2 {
          cursor: pointer;
          position: relative;
          z-index: 1;
          min-width: 160px;
          height: 46px;
          line-height: 42px;
          font-size: 16px;
          font-weight: 500;
          display: inline-block;
          padding: 0 30px;
          text-align: center;
          text-transform: capitalize;
          background-color: transparent;
          color: #ffffff;
          border: 2px solid #fc6060;
          border-radius: 60px;
          transition: all 0.3s ease;
          margin: 0;
          font-family: inherit;
        }

        .btn-1 {
          background: rgba(255, 255, 255, 0.1);
          outline: none;
        }

        .btn-2:hover {
          color: #ffe89e;
          background-color: #fc6060;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(252, 96, 96, 0.3);
        }

        .roadmap-text {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
          font-family: monospace;
          backdrop-filter: blur(10px);
        }

        /* Enhanced 4-Card Section */
        .generated-roadmap-section {
          width: 100%;
          max-width: 1600px;
          margin: 4rem auto;
          padding: 0 2rem;
          position: relative;
          z-index: 10;
          background: transparent;
          clear: both;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 4rem;
          background: -webkit-linear-gradient(#ff9696, #ffe89e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: "Poppins", sans-serif;
        }

        .generated-roadmap-4cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
          perspective: 1000px;
        }

        /* Individual Card Styles */
        .roadmap-card {
          background: #111;
          border-radius: 25px;
          padding: 2.5rem;
          min-height: 450px;
          position: relative;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
          transform-style: preserve-3d;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .roadmap-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
          pointer-events: none;
          border-radius: 25px;
          z-index: 1;
        }

        .roadmap-card:hover {
          transform: translateY(-20px) rotateX(8deg) rotateY(5deg) scale(1.02);
          box-shadow: 
            0 40px 80px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            0 0 50px rgba(65, 105, 225, 0.3);
        }

        /* Card Type Specific Styling */
        .roadmap-info-card {
          background: linear-gradient(270deg, #667eea, #764ba2, #667eea);
          background-size: 400% 400%;
          color: white;
          animation: cardSlideIn 0.8s ease-out 0.2s both, gradientBG 8s ease-in-out infinite;
        }

        .roadmap-steps-card {
          background: linear-gradient(270deg, #f093fb, #f5576c, #f093fb);
          background-size: 400% 400%;
          color: white;
          animation: cardSlideIn 0.8s ease-out 0.4s both, gradientBG 8s ease-in-out infinite;
        }

        .roadmap-trend-card {
          background: linear-gradient(270deg, #4facfe, #00f2fe, #4facfe);
          background-size: 400% 400%;
          color: white;
          animation: cardSlideIn 0.8s ease-out 0.6s both, gradientBG 8s ease-in-out infinite;
        }

        .roadmap-jobs-card {
          background: linear-gradient(270deg, #43e97b, #38f9d7, #43e97b);
          background-size: 400% 400%;
          color: white;
          animation: cardSlideIn 0.8s ease-out 0.8s both, gradientBG 8s ease-in-out infinite;
        }

        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .card-icon {
          width: 70px;
          height: 70px;
          margin-bottom: 1.5rem;
          padding: 20px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
          position: relative;
          z-index: 2;
        }

        .roadmap-card:hover .card-icon {
          transform: scale(1.15) rotateY(15deg) rotateZ(5deg);
          background: rgba(255, 255, 255, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .card-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 2;
          color: white;
          font-family: "Poppins", sans-serif;
        }

        .card-content {
          position: relative;
          z-index: 2;
          line-height: 1.7;
          font-size: 1rem;
        }

        .card-content p {
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
        }

        .read-more-btn, .job-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0.5rem 0.5rem 0.5rem 0;
          padding: 0.8rem 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 2;
          border: 1px solid rgba(255, 255, 255, 0.3);
          text-decoration: none;
        }

        .read-more-btn:hover, .job-link-btn:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        .steps-list {
          list-style: none;
          padding: 0;
          margin: 0;
          position: relative;
          z-index: 2;
        }

        .steps-list li {
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          gap: 1.2rem;
          transition: all 0.4s ease;
          color: white;
          font-size: 0.9rem;
        }

        .steps-list li:hover {
          transform: translateX(15px);
          padding-left: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .step-number {
          width: 35px;
          height: 35px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1rem;
          color: white;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .steps-list li:hover .step-number {
          background: rgba(255, 255, 255, 0.5);
          transform: scale(1.1);
        }

        .trend-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .stat {
          text-align: center;
          padding: 1.2rem 0.8rem;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 15px;
          transition: all 0.4s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat:hover {
          transform: scale(1.1) translateY(-5px);
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: bold;
          display: block;
          color: white;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.85rem;
          opacity: 0.9;
          color: white;
          font-weight: 500;
        }

        .job-list {
          list-style: none;
          padding: 0;
          margin: 1rem 0;
          position: relative;
          z-index: 2;
        }

        .job-list li {
          padding: 0.8rem 0;
          color: white;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .job-list li:hover {
          transform: translateX(10px);
          color: #43e97b;
        }

        .job-list li::before {
          content: "💼";
          font-size: 1.2rem;
        }

        .job-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
          position: relative;
          z-index: 2;
        }

        /* Sample roadmaps styling */
        .roadmap_samples_container {
          padding: 4rem 5%;
          width: 100%;
          margin: 0 auto;
          border-radius: 12px;
          max-width: 1400px;
          background: #111;
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 5;
          clear: both;
          margin-top: 6rem;
        }

        .roadmap_samples_container h3 {
          color: white;
          text-align: center;
          font-size: 2.2rem;
          margin-bottom: 3rem;
          background: -webkit-linear-gradient(#ff9696, #ffe89e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: "Poppins", sans-serif;
          font-weight: 600;
        }

        .roadmap_samples_block {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }

        .gallery-item {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .gallery-item:hover {
          transform: translateY(-15px) scale(1.05);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
        }

        .gallery-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: all 0.4s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.1);
        }

        .view_more {
          display: flex;
          justify-content: center;
          margin-top: 3rem;
        }

        .btna {
          cursor: pointer;
          color: white;
          position: relative;
          z-index: 1;
          min-width: 160px;
          height: 46px;
          line-height: 42px;
          font-size: 16px;
          font-weight: 500;
          display: inline-block;
          padding: 0 30px;
          text-align: center;
          text-transform: capitalize;
          background-color: transparent;
          border: 2px solid #fc6060;
          border-radius: 60px;
          transition: all 0.3s ease;
          outline: none;
          text-decoration: none;
        }

        .btna:hover {
          box-shadow: 0 2px 40px 8px rgba(15, 15, 15, 0.15);
          background-color: #fc6060;
          color: #ffffff;
          font-weight: 500;
          text-decoration: none;
          transform: translateY(-3px);
        }

        /* Animations */
        @keyframes bounceInDown {
          0% {
            opacity: 0;
            transform: translate3d(0, -3000px, 0) scaleY(3);
          }
          60% {
            opacity: 1;
            transform: translate3d(0, 25px, 0) scaleY(0.9);
          }
          75% {
            transform: translate3d(0, -10px, 0) scaleY(0.95);
          }
          90% {
            transform: translate3d(0, 5px, 0) scaleY(0.985);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes cardSlideIn {
          0% {
            opacity: 0;
            transform: translateY(50px) rotateX(-20deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        /* Media queries */
        @media only screen and (max-width: 767px) {
          .small-container h2 {
            font-size: 42px;
          }
          .generated-roadmap-4cards {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .roadmap-card {
            min-height: 400px;
            padding: 2rem;
          }
          .btn-container {
            flex-direction: column;
            align-items: stretch;
          }
        }

        @media screen and (max-width: 1024px) {
          .roadmap_samples_block {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
          }
          .generated-roadmap-4cards {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
          }
        }

        @media screen and (max-width: 600px) {
          .roadmap_samples_block {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>

      <Header />

      {/* Home Section */}

      <div id="home" className="home-area">
        <div className="big-container" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="middle-container" style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center', gap: '2.5rem'}}>
              <div className="small-container" style={{flex: '0 1 520px', minWidth: '320px', maxWidth: '540px'}}>
                <h2>Hello, <br /> Need Guidance?</h2>
                <p>You reached the right place. We provide instant roadmaps essential to ace your career.</p>
                <div className="btn-container">
                  <input
                    className="btn-1"
                    placeholder="Enter Topic (e.g., JavaScript, React, Python)"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleButtonClick()}
                  />
                  <button className="btn-2" onClick={handleButtonClick} disabled={loading}>
                    {loading ? 'Generating...' : 'Get Roadmap'}
                  </button>
                </div>
                {loading && (
                  <p className="loader">🚀 Generating your personalized roadmap...</p>
                )}
                {outputText && (
                  <pre className="roadmap-text">{outputText}</pre>
                )}
              </div>
              <div style={{
                flex: '0 1 480px',
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'center',
                minWidth: '220px',
                height: '340px',
                maxHeight: '420px'
              }}>
                <img 
                  src={require('./logo.png')} 
                  alt="Logo" 
                  style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '420px',
                    minWidth: '220px',
                    objectFit: 'contain',
                    display: 'block',
                    boxShadow: '0 16px 48px 8px rgba(0,0,0,0.35), 0 0 40px 0 #ffe89e',
                    borderRadius: '24px',
                    background: 'rgba(255,255,255,0.03)',
                    transform: 'perspective(800px) rotateY(-18deg) rotateX(8deg) scale(1.04)',
                    transition: 'transform 0.4s cubic-bezier(.23,1,.32,1), box-shadow 0.4s',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'perspective(800px) rotateY(-8deg) rotateX(2deg) scale(1.08)';
                    e.currentTarget.style.boxShadow = '0 32px 64px 16px rgba(0,0,0,0.45), 0 0 80px 0 #ffe89e';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'perspective(800px) rotateY(-18deg) rotateX(8deg) scale(1.04)';
                    e.currentTarget.style.boxShadow = '0 16px 48px 8px rgba(0,0,0,0.35), 0 0 40px 0 #ffe89e';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Enhanced 4-Card Roadmap Section */}
      {showRoadmap && (
        <div className="generated-roadmap-section">
          <h3 className="section-title">Your Personalized Learning Path</h3>
          <div className="generated-roadmap-4cards">
            
            {/* Card 1: Info Card */}
            <div className="roadmap-card roadmap-info-card">
              <div className="card-icon">
                <BookOpen size={30} color="white" />
              </div>
              <h4 className="card-title">About {inputValue || 'Your Topic'}</h4>
              <div className="card-content">
                <p>
                  {inputValue
                    ? `Discover a comprehensive learning path for ${inputValue}. This roadmap covers everything from basics to advanced concepts, designed to help you master the subject systematically.`
                    : 'Enter a topic to get a personalized roadmap with detailed information and resources.'}
                </p>
                <button 
                  className="read-more-btn"
                  onClick={() => handleReadMore(inputValue)}
                >
                  Read More <ExternalLink size={14} />
                </button>
              </div>
            </div>

            {/* Card 2: Steps Card */}
            <div className="roadmap-card roadmap-steps-card">
              <div className="card-icon">
                <Target size={30} color="white" />
              </div>
              <h4 className="card-title">Learning Steps</h4>
              <div className="card-content">
                {roadmapSteps.length > 0 ? (
                  <ul className="steps-list">
                    {roadmapSteps.slice(0, 5).map((step, idx) => (
                      <li key={idx}>
                        <div className="step-number">{idx + 1}</div>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No steps available for this topic.</p>
                )}
              </div>
            </div>

            {/* Card 3: Trend Card */}
            <div className="roadmap-card roadmap-trend-card">
              <div className="card-icon">
                <TrendingUp size={30} color="white" />
              </div>
              <h4 className="card-title">Industry Trends</h4>
              <div className="card-content">
                <p>Market growth and demand for {inputValue || 'this field'} professionals:</p>
                <div className="trend-stats">
                  <div className="stat">
                    <span className="stat-number">98%</span>
                    <span className="stat-label">Popularity</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">250K+</span>
                    <span className="stat-label">Jobs</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">15%</span>
                    <span className="stat-label">YoY Growth</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Jobs & Career Card */}
            <div className="roadmap-card roadmap-jobs-card">
              <div className="card-icon">
                <Briefcase size={30} color="white" />
              </div>
              <h4 className="card-title">Career Opportunities</h4>
              <div className="card-content">
                <p>Popular job roles after mastering {inputValue || 'this topic'}:</p>
                <ul className="job-list">
                  {jobData.jobs.map((job, idx) => (
                    <li key={idx}>{job}</li>
                  ))}
                </ul>
                <div className="job-links">
                  {jobData.links.map((link, idx) => (
                    <button
                      key={idx}
                      className="job-link-btn"
                      onClick={() => handleJobLink(link.url)}
                    >
                      {link.name} <ExternalLink size={12} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Roadmap Samples Section */}
      <div className="roadmap_samples_container">
        <div className="left-side">
          <h3>Roadmap Samples</h3>
        </div>
        <div className="roadmap_samples_block">
          {sampleCards.map((card, idx) => (
            <SingleGalleryItem key={idx} IMG={card.IMG} topic={card.topic} />
          ))}
        </div>
  {/* Modal removed: clicking a card now opens a new tab with information about the topic */}
        <div className="view_more">
          <button className="btna" type="button">View More</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;