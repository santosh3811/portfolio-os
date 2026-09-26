import React, { useState, useEffect } from 'react';

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Times+New+Roman&display=swap');

  /* Global 90s Cursors */
  body, html, #root {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #008080;
    cursor: url('https://win98icons.alexmeub.com/cursors/arrow.png'), default;
  }
  
  button, .win95-button, .cursor-pointer, [role="button"], a {
    cursor: url('https://win98icons.alexmeub.com/cursors/link.png'), pointer !important;
  }

  .loading-cursor, .loading-cursor * {
    cursor: url('https://win98icons.alexmeub.com/cursors/wait.png'), wait !important;
  }

  body {
    font-family: 'VT323', monospace;
    user-select: none;
  }

  /* Win95 UI Borders */
  .win95-border-outset {
    border-top: 2px solid #dfdfdf;
    border-left: 2px solid #dfdfdf;
    border-bottom: 2px solid #000000;
    border-right: 2px solid #000000;
    box-shadow: inset -1px -1px #808080, inset 1px 1px #ffffff;
  }

  .win95-border-inset {
    border-top: 2px solid #808080;
    border-left: 2px solid #808080;
    border-bottom: 2px solid #ffffff;
    border-right: 2px solid #ffffff;
    box-shadow: inset -1px -1px #dfdfdf, inset 1px 1px #000000;
  }

  .win95-button {
    background-color: #c0c0c0;
    border-top: 2px solid #ffffff;
    border-left: 2px solid #ffffff;
    border-bottom: 2px solid #000000;
    border-right: 2px solid #000000;
    box-shadow: inset -1px -1px #808080;
  }

  .win95-button:active:not(:disabled), .win95-button.active {
    border-top: 2px solid #000000;
    border-left: 2px solid #000000;
    border-bottom: 2px solid #ffffff;
    border-right: 2px solid #ffffff;
    box-shadow: inset 1px 1px #808080;
    padding-top: 2px;
    padding-left: 2px;
  }
  
  .win95-text {
    font-family: 'VT323', monospace;
    font-size: 1.25rem;
    letter-spacing: 0.5px;
  }

  .times-font {
    font-family: 'Times New Roman', Times, serif;
    letter-spacing: normal;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 16px;
    background: #dfdfdf;
    border-left: 1px solid #dfdfdf;
  }
  ::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border-top: 2px solid #ffffff;
    border-left: 2px solid #ffffff;
    border-bottom: 2px solid #000000;
    border-right: 2px solid #000000;
  }
  ::-webkit-scrollbar-button:single-button {
    background: #c0c0c0;
    display: block;
    height: 16px;
    width: 16px;
    border-top: 2px solid #ffffff;
    border-left: 2px solid #ffffff;
    border-bottom: 2px solid #000000;
    border-right: 2px solid #000000;
  }

  /* Fullscreen CRT Scanline Overlay */
  .crt-overlay {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    pointer-events: none;
    z-index: 99999;
    background: 
      linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), 
      linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03)),
      radial-gradient(ellipse at center, transparent 65%, rgba(0,0,0,0.3) 100%);
    background-size: 100% 4px, 6px 100%, 100% 100%;
  }
  
  .desktop-container {
    width: 100vw;
    height: 100vh;
    background-color: #008080;
  }
`;

const Icons = {
  Computer: () => (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <rect x="6" y="6" width="28" height="20" fill="#c0c0c0" stroke="#000" strokeWidth="2"/>
      <rect x="10" y="10" width="20" height="12" fill="#008080" stroke="#000" strokeWidth="2"/>
      <path d="M16 26v4h8v-4zM10 30h20v4H10z" fill="#c0c0c0" stroke="#000" strokeWidth="2"/>
      <rect x="12" y="12" width="4" height="4" fill="#fff" />
    </svg>
  ),
  Folder: () => (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <path d="M4 8h12l4 4h16v20H4z" fill="#fada5e" stroke="#000" strokeWidth="2"/>
      <path d="M4 14h32v14H4z" fill="#fdf0b5" stroke="#000" strokeWidth="1"/>
      <rect x="8" y="18" width="6" height="4" fill="#008080" />
      <rect x="16" y="18" width="6" height="4" fill="#ff0000" />
    </svg>
  ),
  Notepad: () => (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <rect x="8" y="4" width="24" height="32" fill="#fff" stroke="#000" strokeWidth="2"/>
      <path d="M8 10h24" stroke="#008080" strokeWidth="4"/>
      <path d="M12 16h16M12 20h16M12 24h10" stroke="#000" strokeWidth="2"/>
    </svg>
  ),
  Mail: () => (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <rect x="4" y="10" width="32" height="20" fill="#fff" stroke="#000" strokeWidth="2"/>
      <path d="M4 10l16 12 16-12" fill="none" stroke="#000" strokeWidth="2"/>
      <rect x="26" y="12" width="6" height="4" fill="#ff0000" />
    </svg>
  ),
  ControlPanel: () => (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <path d="M4 8h12l4 4h16v20H4z" fill="#fada5e" stroke="#000" strokeWidth="2"/>
      <circle cx="20" cy="22" r="6" fill="#c0c0c0" stroke="#000" strokeWidth="2" />
      <path d="M20 16v12M14 22h12M16 18l8 8M16 26l8-8" stroke="#000" strokeWidth="2"/>
    </svg>
  ),
  TextFile: () => (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <rect x="8" y="4" width="24" height="32" fill="#fff" stroke="#000" strokeWidth="2"/>
      <text x="12" y="24" fontFamily="serif" fontSize="20" fontWeight="bold" fill="#000">A</text>
    </svg>
  )
};

// --- API CONNECTED COMPONENTS ---

const ProjectsApp = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch projects from backend", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4 bg-white h-full text-black font-bold">Loading projects from server...</div>;

  return (
    <div className="p-4 flex flex-wrap gap-4 h-full overflow-auto bg-white text-black">
      {projects.map((proj) => (
        <div key={proj.id} className="w-full sm:w-64 border border-transparent hover:bg-[#000080] hover:text-white p-2 flex flex-col items-center text-center cursor-pointer group">
          <div className="bg-white group-hover:bg-transparent"><Icons.TextFile /></div>
          <h3 className="font-bold text-lg mt-2 text-black group-hover:text-white">{proj.title}</h3>
          <p className="text-sm mt-2 times-font leading-tight text-black group-hover:text-white">{proj.description}</p>
        </div>
      ))}
    </div>
  );
};

const MailApp = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!content.trim()) {
      setStatus("Error: Message cannot be empty.");
      return;
    }
    
    setIsSending(true);
    setStatus("Sending to server...");
    
    try {
      const response = await fetch("http://localhost:8080/api/v1/mail/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: "santoshkarini63@gmail.com",
          subject: subject,
          content: content
        })
      });

      if (response.ok) {
        setStatus("Mail sent successfully!");
        setSubject("");
        setContent("");
      } else {
        setStatus("Error: Could not send mail.");
      }
    } catch (error) {
      setStatus("Error: Cannot connect to server.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-4 h-full flex flex-col justify-center items-center bg-[#c0c0c0]">
      <div className="win95-border-inset bg-white p-6 w-full max-w-sm flex flex-col gap-4 text-black">
        <div className="flex flex-col">
          <label className="mb-1 font-bold text-black">To:</label>
          <input type="text" value="santoshkarini63@gmail.com" disabled className="win95-border-inset p-1 bg-gray-200 text-black times-font font-bold" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-bold text-black">Subject:</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Job Opportunity" className="win95-border-inset p-1 text-black times-font font-bold" />
        </div>
        <div className="flex flex-col flex-grow">
          <label className="mb-1 font-bold text-black">Message:</label>
          <textarea rows={5} value={content} onChange={(e) => setContent(e.target.value)} className="win95-border-inset p-1 resize-none text-black times-font font-bold"></textarea>
        </div>
        
        {status && <div className={`text-sm font-black ${status.includes('Error') ? 'text-red-700' : 'text-blue-900'}`}>{status}</div>}
        
        <button onClick={handleSend} disabled={isSending} className="win95-button py-1 px-4 self-end font-bold text-lg mt-2 disabled:opacity-50 text-black">
          {isSending ? "Sending..." : "Send Mail"}
        </button>
      </div>
    </div>
  );
};

const AdminApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");

  const [messages, setMessages] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginStatus("Verifying credentials...");
    try {
      const res = await fetch("http://localhost:8080/api/v1/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        setIsLoggedIn(true);
        setLoginStatus("");
        fetchMessages();
      } else {
        setLoginStatus("Access Denied: Invalid credentials.");
      }
    } catch (err) {
      setLoginStatus("Error: Cannot connect to server.");
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/admin/mail/all");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setProjectStatus("Error: Fill out all fields.");
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/api/v1/admin/projects/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
      });
      if (res.ok) {
        setProjectStatus("Project successfully added to database!");
        setTitle("");
        setDescription("");
      } else {
        setProjectStatus("Failed to save project.");
      }
    } catch (err) {
      setProjectStatus("Server error.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="p-6 h-full flex flex-col justify-center items-center bg-[#c0c0c0]">
        <form onSubmit={handleLogin} className="win95-border-inset bg-white p-6 w-full max-w-sm flex flex-col gap-3 text-black">
          <h3 className="font-bold text-xl text-center border-b pb-2 mb-2">🔐 Admin Login</h3>
          <div className="flex flex-col">
            <label className="font-bold text-sm">Username:</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="win95-border-inset p-1 times-font" />
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-sm">Password:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="win95-border-inset p-1 times-font" />
          </div>
          {loginStatus && <p className="text-sm font-bold text-red-600">{loginStatus}</p>}
          <button type="submit" className="win95-button py-1 px-4 font-bold text-lg mt-2">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 h-full overflow-auto bg-white text-black flex flex-col gap-6">
      <div className="bg-green-100 border border-green-400 p-2 text-sm flex justify-between items-center">
        <span className="font-bold text-green-800">✅ Authenticated as Admin</span>
        <button onClick={() => setIsLoggedIn(false)} className="win95-button px-2 py-0.5 text-xs font-bold">Logout</button>
      </div>

      <div className="win95-border-inset p-4 bg-gray-50">
        <h3 className="font-bold text-lg mb-2 text-blue-900">➕ Add New Project to Database</h3>
        <form onSubmit={handleAddProject} className="flex flex-col gap-2">
          <input type="text" placeholder="Project Filename (e.g., Cloud_API.exe)" value={title} onChange={e => setTitle(e.target.value)} className="win95-border-inset p-1 times-font text-sm" />
          <textarea placeholder="Project Description..." value={description} onChange={e => setDescription(e.target.value)} rows={2} className="win95-border-inset p-1 times-font text-sm resize-none"></textarea>
          {projectStatus && <p className="text-xs font-bold text-blue-800">{projectStatus}</p>}
          <button type="submit" className="win95-button py-1 px-3 self-end font-bold text-sm">Save Project</button>
        </form>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-2 text-blue-900">📬 Inbox Messages Received ({messages.length})</h3>
        {messages.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No messages received yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {messages.map(msg => (
              <div key={msg.id} className="win95-border-inset p-3 bg-gray-100 text-sm">
                <p className="font-bold">Subject: {msg.subject || "(No Subject)"}</p>
                <p className="times-font my-1">{msg.content}</p>
                <p className="text-xs text-gray-500 text-right">{msg.timestamp}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const portfolioData = {
  guide: {
    id: 'guide',
    title: 'Home (Intro)',
    icon: <Icons.TextFile />,
    objectsCount: 1,
    size: '1.20KB',
    content: (
      <div className="p-6 h-full overflow-auto bg-white text-black">
        <h2 className="text-3xl mb-3 font-black border-b-2 border-dashed border-gray-400 pb-2 text-black" style={{ color: '#000000' }}>Welcome to Santosh's Retro OS</h2>
        <p className="mb-3 text-xl text-blue-900 font-bold">
          System Overview & Professional Portfolio
        </p>
        <p className="text-lg leading-relaxed mb-4 text-black font-medium">
          Step into a fully interactive 90s Windows 95 computing environment built to showcase my journey as a computer science engineer and aspiring <b>Backend Developer</b>. Here, you can execute code repositories, check my technical specifications, explore database connections, and review professional metrics.
        </p>
        <div className="bg-yellow-100 border-2 border-yellow-300 p-3 win95-border-inset inline-block text-lg text-black font-semibold">
          <b className="text-black font-bold">How to Navigate:</b><br/>
          • Double-click or click any desktop shortcut icon to launch system utilities.<br/>
          • Use the <b>Start Menu</b> at the bottom-left to access applications or shut down.<br/>
          • Drag open windows by their title bars or minimize/maximize them freely.
        </div>
      </div>
    )
  },
  computer: {
    id: 'computer',
    title: 'About Me',
    icon: <Icons.Computer />,
    objectsCount: 5,
    size: 'System',
    content: (
      <div className="p-6 h-full overflow-auto bg-[#c0c0c0] text-black">
        <h2 className="text-2xl mb-4 font-black border-b border-gray-500 pb-2 text-black" style={{ color: '#000000' }}>
          System Properties - About Me
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 mb-4">
          <div className="w-36 h-36 bg-white border-2 border-gray-500 flex items-center justify-center shrink-0 win95-border-inset overflow-hidden shadow-md">
            <img src="https://res.cloudinary.com/duceao3wn/image/upload/v1751215226/WhatsApp_Image_2025-06-29_at_22.09.40_v0yj0q.jpg" alt="Karini Siddu Venkata Santosh" className="w-full h-full object-cover" />
          </div>
          <div className="text-lg space-y-1 text-black">
            <p className="font-black text-2xl text-blue-900 mb-1">Karini Siddu Venkata Santosh</p>
            <p className="font-bold text-black">Career Objective: <span className="font-bold text-black">Passionate Backend Developer</span></p>
            <p className="text-black font-medium">Education: B.Tech Computer Science & Engineering (VIT Vellore, 2022–2026)</p>
            <p className="text-black font-medium">Location: Tuni, Andhra Pradesh, India</p>
            <p className="text-sm mt-2 text-black font-semibold leading-tight">
              Specialized in building robust backend architectures, scalable server-side systems, secure database management, and high-performance APIs using Java, Spring Boot, Python, and MySQL.
            </p>
          </div>
        </div>
        <div className="win95-border-inset bg-white p-4 text-base space-y-2 mt-4 text-black">
          <p className="font-black text-lg text-black border-b border-gray-300 pb-1">Connect With Me Online:</p>
          <div className="flex flex-wrap gap-4 pt-1">
            <a href="https://www.linkedin.com/in/santoshkarini/" target="_blank" rel="noreferrer" className="text-blue-800 underline font-black hover:text-blue-950">
              🔗 LinkedIn Profile
            </a>
            <a href="https://github.com/santosh3811" target="_blank" rel="noreferrer" className="text-blue-800 underline font-black hover:text-blue-950">
              💻 GitHub Repositories
            </a>
            <a href="https://www.instagram.com/_santosh_2405" target="_blank" rel="noreferrer" className="text-blue-800 underline font-black hover:text-blue-950">
              📸 Instagram Feed
            </a>
          </div>
        </div>
      </div>
    )
  },
  documents: {
    id: 'documents',
    title: 'Projects (Work)',
    icon: <Icons.Folder />,
    objectsCount: 'API',
    size: 'Server DB',
    content: <ProjectsApp />
  },
  skills: {
    id: 'skills',
    title: 'Skills (Expertise)',
    icon: <Icons.ControlPanel />,
    objectsCount: 6,
    size: '1.4MB',
    content: (
      <div className="p-4 h-full overflow-auto bg-[#c0c0c0] text-black">
        <h2 className="text-2xl mb-4 font-black border-b border-gray-500 pb-2 text-black" style={{ color: '#000000' }}>Installed Tools & Backend Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Java & Spring Boot (Backend)', level: 95 },
            { name: 'Python & REST APIs', level: 90 },
            { name: 'MySQL & RDBMS Architecture', level: 85 },
            { name: 'Data Structures & Algorithms', level: 85 },
            { name: 'Machine Learning & NLP', level: 80 },
            { name: 'Cloud Concepts (Azure AI-900)', level: 75 }
          ].map((skill, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="font-black mb-1 text-black">{skill.name}</label>
              <div className="win95-border-inset bg-white h-6 flex overflow-hidden p-[2px]">
                {Array.from({length: Math.floor(skill.level / 5)}).map((_, i) => (
                  <div key={i} className="bg-[#000080] h-full w-[8px] mr-[2px] shrink-0"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  experience: {
    id: 'experience',
    title: 'Resume (CV)',
    icon: <Icons.Notepad />,
    objectsCount: 1,
    size: '24KB',
    content: (
      <div className="p-6 h-full overflow-auto bg-white text-black times-font relative z-10">
        <div className="max-w-2xl mx-auto border border-gray-300 p-8 shadow-sm bg-white relative z-20 text-black">
          <h1 className="text-3xl font-black text-center mb-1 text-black" style={{ color: '#000000' }}>Karini Siddu Venkata Santosh</h1>
          <p className="text-center text-sm mb-2 text-black font-bold">
            Aspiring Backend Developer | +918760349999 | santoshkarini63@gmail.com
          </p>
          <p className="text-center text-xs mb-4 border-b-2 border-black pb-2 text-blue-900 font-bold">
            LinkedIn: linkedin.com/in/santoshkarini/ | GitHub: github.com/santosh3811
          </p>

          <h2 className="text-xl font-black bg-gray-300 text-black p-1 mb-2 uppercase" style={{ color: '#000000' }}>Key Skills</h2>
          <ul className="list-disc pl-5 mb-4 text-sm space-y-1 text-black font-semibold">
            <li><b className="text-black font-bold">Backend Technologies:</b> Java, Spring Boot, RESTful APIs, RDBMS, MySQL.</li>
            <li><b className="text-black font-bold">Programming & Core:</b> Python, Object-Oriented Programming (OOPs), DSA.</li>
            <li><b className="text-black font-bold">Cloud & Tools:</b> Microsoft Azure AI Fundamentals, GitHub, VS Code, IntelliJ.</li>
            <li><b className="text-black font-bold">Languages Known:</b> Telugu (Native), English, Hindi.</li>
          </ul>
          
          <h2 className="text-xl font-black bg-gray-300 text-black p-1 mb-2 uppercase mt-6" style={{ color: '#000000' }}>Education</h2>
          <div className="mb-4 text-black">
            <div className="flex justify-between font-bold text-black">
              <span>Vellore Institute of Technology, Vellore</span>
              <span>2022 - 2026</span>
            </div>
            <div className="italic text-sm text-black font-bold">B.Tech in Computer Science and Engineering | CGPA: 7.98</div>
          </div>
          <div className="mb-4 text-black">
            <div className="flex justify-between font-bold text-black">
              <span>Sasi Educational Institution, Velivennu</span>
              <span>2020 - 2022</span>
            </div>
            <div className="italic text-sm text-black font-bold">Intermediate Education | 89.9%</div>
          </div>

          <h2 className="text-xl font-black bg-gray-300 text-black p-1 mb-2 uppercase mt-6" style={{ color: '#000000' }}>Certifications & Leadership</h2>
          <ul className="list-disc pl-5 mb-4 text-sm space-y-1 text-black font-semibold">
            <li><b className="text-black font-bold">Microsoft Certified:</b> Azure AI Fundamentals (AI-900)</li>
            <li><b className="text-black font-bold">Sahiti - TLA (Club) - VIT:</b> Head of Events (April 2023 - March 2024). Managed team workflows, budgeting, and coordination.</li>
          </ul>

          <h2 className="text-xl font-black bg-gray-300 text-black p-1 mb-2 uppercase mt-6" style={{ color: '#000000' }}>Strengths</h2>
          <p className="text-sm mb-4 text-black font-bold">
            Hardworking, Rapid Adaptability, Strong Analytical Problem Solving, Continuous Willingness to Learn.
          </p>
        </div>
      </div>
    )
  },
  mail: {
    id: 'mail',
    title: 'Contact',
    icon: <Icons.Mail />,
    objectsCount: 'API',
    size: 'Server DB',
    content: <MailApp />
  },
  admin: {
    id: 'admin',
    title: 'Admin Panel',
    icon: <Icons.ControlPanel />,
    objectsCount: 1,
    size: 'Secure',
    content: <AdminApp />
  }
};

const BootLogoScreen = ({ onComplete }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') onComplete();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden z-50">
       <div className="crt-overlay"></div>
       <div className="flex flex-col items-center">
         <div className="flex gap-1 mb-1">
           <div className="w-16 h-16 bg-[#ff3300] rounded-tl-3xl border-2 border-white"></div>
           <div className="w-16 h-16 bg-[#00cc00] rounded-tr-3xl border-2 border-white"></div>
         </div>
         <div className="flex gap-1">
           <div className="w-16 h-16 bg-[#0066ff] rounded-bl-3xl border-2 border-white"></div>
           <div className="w-16 h-16 bg-[#ffcc00] rounded-br-3xl border-2 border-white"></div>
         </div>
         <h1 className="text-white mt-8 text-6xl font-bold tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
           Portfolio <span className="font-normal text-gray-400">95</span>
         </h1>
       </div>
       
       <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-80 h-8 border-4 border-gray-600 p-1 bg-black">
          <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out_forwards]"></div>
       </div>
       
       <button 
         className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-2xl text-white animate-pulse font-bold border-2 border-white px-6 py-2 bg-black/50 hover:bg-white hover:text-black cursor-pointer" 
         onClick={onComplete}
       >
         PRESS ENTER
       </button>
       
       <style>{`
         @keyframes loading {
           0% { width: 0%; }
           20% { width: 20%; }
           40% { width: 30%; }
           60% { width: 70%; }
           80% { width: 80%; }
           100% { width: 100%; }
         }
       `}</style>
    </div>
  );
};

const Window = ({ app, onClose, onMinimize, onFocus, zIndex, isActive, initialPos, isMinimized }) => {
  const [pos, setPos] = useState(initialPos);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);

  const handlePointerDown = (e) => {
    onFocus();
    if (isMaximized) return;
    setIsDragging(true);
    setDragOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (isDragging && !isMaximized) setPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  return (
    <div 
      className="absolute bg-[#c0c0c0] win95-border-outset flex flex-col p-[2px] select-none shadow-lg"
      style={{
        display: isMinimized ? 'none' : 'flex',
        ...(isMaximized 
          ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 40px)', zIndex }
          : { top: pos.y, left: pos.x, width: '600px', height: '400px', maxWidth: '95vw', zIndex })
      }}
      onMouseDownCapture={onFocus}
      onTouchStartCapture={onFocus}
    >
      <div 
        className={`flex justify-between items-center px-1 py-[2px] ${isActive ? 'bg-[#000080] text-white' : 'bg-[#808080] text-[#c0c0c0]'}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="flex items-center gap-2 px-1 font-bold text-lg cursor-default">
          {app.title}
        </div>
        <div className="flex gap-1 pr-[2px]">
          <button 
            className="win95-button w-6 h-6 flex items-center justify-center p-0 text-black font-bold bg-[#c0c0c0]" 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            title="Minimize"
          >
            <div className="w-3 h-1 bg-black mt-2"></div>
          </button>
          <button 
            className="win95-button w-6 h-6 flex items-center justify-center p-0 text-black font-bold bg-[#c0c0c0]" 
            onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
            title="Maximize"
          >
            <div className="w-3.5 h-3.5 border-2 border-black border-t-[3px]"></div>
          </button>
          <button 
            className="win95-button w-6 h-6 flex items-center justify-center p-0 text-black font-bold bg-[#c0c0c0] ml-1" 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            title="Close"
          >
            <div className="text-[14px] font-black leading-none mb-0.5">X</div>
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 px-2 py-1 text-black bg-[#c0c0c0] text-lg border-b border-[#dfdfdf]">
        <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1"><span className="underline">F</span>ile</span>
        <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1"><span className="underline">E</span>dit</span>
        <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1"><span className="underline">V</span>iew</span>
        <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1"><span className="underline">H</span>elp</span>
      </div>

      <div className="flex-grow p-1 overflow-hidden bg-[#c0c0c0] flex flex-col">
        <div className="bg-white flex-grow win95-border-inset overflow-auto">
          {app.content}
        </div>
      </div>
      
      <div className="flex gap-1 pt-1 pb-[2px] px-1 text-sm text-black bg-[#c0c0c0]">
        <div className="win95-border-inset px-2 py-[2px] flex-grow bg-[#c0c0c0] flex items-center">
          {app.objectsCount !== undefined ? `${app.objectsCount} object(s)` : '1 object(s)'}
        </div>
        <div className="win95-border-inset px-2 py-[2px] w-1/3 bg-[#c0c0c0] flex items-center">
          {app.size || '3.39KB'}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [bootPhase, setBootPhase] = useState('logo');
  const [loadingApp, setLoadingApp] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const [windows, setWindows] = useState({
    guide: { isOpen: false, zIndex: 1, pos: { x: 50, y: 50 } },
    computer: { isOpen: false, zIndex: 1, pos: { x: 80, y: 80 } },
    documents: { isOpen: false, zIndex: 1, pos: { x: 110, y: 110 } },
    skills: { isOpen: false, zIndex: 1, pos: { x: 140, y: 140 } },
    experience: { isOpen: false, zIndex: 1, pos: { x: 170, y: 170 } },
    mail: { isOpen: false, zIndex: 1, pos: { x: 200, y: 200 } },
    admin: { isOpen: false, zIndex: 1, pos: { x: 230, y: 230 } }
  });
  
  const [highestZ, setHighestZ] = useState(10);
  const [activeWindow, setActiveWindow] = useState(null);
  const [time, setTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  useEffect(() => {
    if (bootPhase === 'desktop') {
      setTimeout(() => {
        openApp('guide');
      }, 500);
    }
  }, [bootPhase]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClick = () => setStartMenuOpen(false);
    if (startMenuOpen) document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [startMenuOpen]);

  const handleOpenAppClick = (appId) => {
    if (windows[appId]?.isOpen) {
      focusApp(appId);
      return;
    }
    setLoadingApp(appId);
    setLoadingProgress(0);
  };

  useEffect(() => {
    let interval;
    if (loadingApp) {
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            openApp(loadingApp);
            setLoadingApp(null);
            return 0;
          }
          return Math.min(prev + Math.floor(Math.random() * 20) + 15, 100);
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [loadingApp]);

  const cancelLoading = () => {
    setLoadingApp(null);
    setLoadingProgress(0);
  };

  const openApp = (appId) => {
    const newZ = highestZ + 1;
    setHighestZ(newZ);
    setWindows(prev => ({
      ...prev,
      [appId]: { ...prev[appId], isOpen: true, isMinimized: false, zIndex: newZ }
    }));
    setActiveWindow(appId);
  };

  const closeApp = (appId) => {
    setWindows(prev => ({
      ...prev,
      [appId]: { ...prev[appId], isOpen: false, isMinimized: false }
    }));
    if (activeWindow === appId) setActiveWindow(null);
  };

  const minimizeApp = (appId) => {
    setWindows(prev => ({
      ...prev,
      [appId]: { ...prev[appId], isMinimized: true }
    }));
    if (activeWindow === appId) setActiveWindow(null);
  };

  const focusApp = (appId) => {
    if (activeWindow === appId && !windows[appId].isMinimized) return;
    const newZ = highestZ + 1;
    setHighestZ(newZ);
    setWindows(prev => ({
      ...prev,
      [appId]: { ...prev[appId], zIndex: newZ, isMinimized: false }
    }));
    setActiveWindow(appId);
  };

  if (bootPhase === 'logo') {
    return <BootLogoScreen onComplete={() => setBootPhase('desktop')} />;
  }

  return (
    <div className={`w-screen h-screen win95-text flex flex-col relative overflow-hidden desktop-container ${loadingApp ? 'loading-cursor' : ''}`}>
      <style>{globalStyles}</style>
      <div className="crt-overlay"></div>

      <div className="flex-grow p-4 flex flex-col flex-wrap h-[calc(100vh-40px)] w-screen content-start gap-6 relative z-0" onClick={() => setActiveWindow(null)}>
        {Object.entries(portfolioData).map(([id, app]) => (
          <button 
            key={id}
            className="flex flex-col items-center w-24 gap-1 p-1 hover:bg-black/10 focus:bg-[#000080] focus:text-white cursor-pointer rounded-sm group outline-none"
            onClick={(e) => { e.stopPropagation(); handleOpenAppClick(id); }}
          >
            <div className="drop-shadow-md pointer-events-none">{app.icon}</div>
            <span className="text-white text-center leading-tight bg-[#008080] group-focus:bg-[#000080] group-focus:border-dotted group-focus:border border-transparent p-[2px]">
              {app.title}
            </span>
          </button>
        ))}

        {Object.entries(windows).map(([id, winState]) => (
          winState.isOpen && (
            <Window 
              key={id}
              app={portfolioData[id]}
              initialPos={winState.pos}
              zIndex={winState.zIndex}
              isActive={activeWindow === id}
              isMinimized={winState.isMinimized}
              onClose={() => closeApp(id)}
              onMinimize={() => minimizeApp(id)}
              onFocus={() => focusApp(id)}
            />
          )
        ))}

        {loadingApp && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 win95-border-outset bg-[#c0c0c0] w-[350px] z-[9999] p-[2px] shadow-lg">
            <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-1 py-[2px] flex justify-between items-center font-bold text-sm cursor-default">
              <span>Loading...</span>
              <button className="win95-button w-5 h-5 flex items-center justify-center p-0 text-black font-bold text-[12px]" onClick={cancelLoading}>X</button>
            </div>
            <div className="p-4 flex flex-col gap-3 text-sm text-black">
              <div>12 458K loaded... ( {loadingProgress}% )</div>
              <div className="win95-border-inset bg-[#c0c0c0] h-5 p-[2px] flex gap-[2px] overflow-hidden">
                {Array.from({length: Math.floor(loadingProgress / 5)}).map((_, i) => (
                  <div key={i} className="bg-[#000080] h-full w-[10px] shrink-0"></div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <button onClick={cancelLoading} className="win95-button px-6 py-1 text-black font-bold border-2 border-black">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {startMenuOpen && (
        <div className="absolute bottom-10 left-0 bg-[#c0c0c0] win95-border-outset flex flex-col z-50 w-64 p-1 pb-0 shadow-lg text-black">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#000080] flex items-end justify-center pb-2">
            <span className="text-white transform -rotate-90 text-2xl font-bold tracking-widest origin-center">Windows95</span>
          </div>
          <div className="ml-8">
            {Object.entries(portfolioData).map(([id, app]) => (
              <div key={id} className="flex items-center gap-3 p-2 hover:bg-[#000080] hover:text-white cursor-pointer" onClick={() => { handleOpenAppClick(id); setStartMenuOpen(false); }}>
                <div className="w-8 h-8 flex items-center justify-center scale-75">{app.icon}</div>
                <span className="text-xl">{app.title}</span>
              </div>
            ))}
            <div className="border-t-2 border-t-[#808080] border-b-2 border-b-white my-1 mx-1"></div>
            <div className="flex items-center gap-3 p-2 hover:bg-[#000080] hover:text-white cursor-pointer" onClick={() => window.location.reload()}>
              <div className="w-8 h-8 flex items-center justify-center scale-75"><Icons.Computer /></div>
              <span className="text-xl">Shut Down...</span>
            </div>
          </div>
        </div>
      )}

      <div className="h-10 w-screen bg-[#c0c0c0] win95-border-outset border-b-0 border-l-0 border-r-0 box-border flex items-center justify-between px-1 relative z-40 text-black">
        <div className="flex gap-1 h-full py-1">
          <button 
            className={`win95-button px-2 flex items-center gap-2 font-bold text-lg h-full ${startMenuOpen ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setStartMenuOpen(!startMenuOpen); }}
          >
            <div className="scale-50 h-full flex items-center origin-left"><Icons.Computer /></div>
            Start
          </button>
          
          <div className="w-1 border-r-2 border-[#dfdfdf] border-l-2 border-[#808080] mx-1 h-full"></div>
          
          {Object.entries(windows).map(([id, winState]) => (
            winState.isOpen && (
              <button 
                key={id}
                className={`win95-button px-3 min-w-[120px] flex items-center gap-2 text-lg h-full truncate ${activeWindow === id && !winState.isMinimized ? 'active' : ''}`}
                onClick={() => {
                  if (activeWindow === id && !winState.isMinimized) {
                    minimizeApp(id);
                  } else {
                    focusApp(id);
                  }
                }}
              >
                {portfolioData[id].title}
              </button>
            )
          ))}
        </div>

        <div className="win95-border-inset px-3 h-[80%] flex items-center bg-[#c0c0c0] text-black">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}