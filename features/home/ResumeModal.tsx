import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Check, Copy, Printer, Mail, Phone, MapPin, Download } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCopyText = () => {
    const resumeText = `
MAFROOK KUTHPUDEEN
Mayiladuthurai, Tamilnadu, India • Mafrooktkc@gmail.com • +918925661541 • linkedin.com/in/k-mafrook
github.com/Mafrook27 • mafrook-portfolio.vercel.app

SUMMARY:
Junior Software Engineer with around 1 year of experience developing business web applications using React.js, TypeScript, Node.js, Express.js, and MongoDB. Worked on loan management software, LMS frontend modules, and a multi-tenant chat module involving session handling, UI flows, API integration, and role-based access. Comfortable building data-driven screens, reusable UI components, REST API integrations, form workflows, and debugging frontend-backend issues in product environments.

SKILLS:
- Frontend: React.js, TypeScript, JavaScript ES6+, HTML5, CSS3, Tailwind CSS, shadcn/ui, Responsive Design, MUI, React Query, zustand
- Backend: Node.js, Express.js, REST API Development, JWT Authentication, Role-Based Access Control, Redis
- Database: MongoDB, Postgres
- Tools & Workflow: Git, GitHub, Postman, VS Code, Chrome DevTools, codex, ai studio, google sitch
- Practices: Documentation, API Integration, input Validation, Error Handling, Debugging, Reusable Components, server and frontend telemetry

WORK EXPERIENCE:
1. Junior Software Engineer - Statlight Software Solutions (Jun 2025 - Present)
   - Develop and maintain frontend and full-stack modules for business web applications, including loan management screens, LMS frontend work, and internal chat module features.
   - Build React.js and TypeScript UI components for dashboards, forms, workflow screens, and user-facing business modules.
   - Work on multi-tenant chat module features involving session handling, UI flows, and frontend-backend integration.
   - Integrate REST APIs using React Query for data fetching, loading states, error states, and form submission workflows.
   - Build and update Node.js, Express.js APIs and MongoDB/Mongoose schemas for authentication, role-based access, workflow records, logs, and application data.
   - Debug issues related to API responses, form validation, data rendering, authentication, and role-based user flows.

2. Apprenticeship - a1ideaz (Oct 2025 - Feb 2026)
   - Trained students in JavaScript, Java, Python, and full-stack development fundamentals with a focus on practical coding sessions.
   - Guided learners in building CRUD applications, authentication flows, REST API basics, and database-connected projects.

EDUCATION:
- Bachelor of Engineering - Computer Science and Engineering (GPA: 8.0/10)
  E.G.S. Pillay Engineering College, Nagapattinam (Oct 2020 - Jun 2024)

PROJECTS:
1. html-formeditor [opensrc] (Mar 2026 - Apr 2026)
   techstack - [ React.js, shadcn, tailwind, typescript ]
   - Built a custom, canvas-style visual editor from scratch to create and manage official company documents and email templates.
   - Eliminated third-party package dependencies by engineering an in-house visual builder, giving the production team complete layout and design control.
   - Implemented seamless HTML import and export engines, allowing users to visually modify templates and export raw, production ready HTML layouts.
   - Designed an intuitive drag-and-drop canvas interface leveraging shadcn/ui components and Tailwind CSS for an optimized, responsive user experience.
   - Ensured strict type safety and code reliability across the entire editing workflow by architecting the application fully in TypeScript.
   - this overcome stress frontend no need wrong about any external package they can maintain and upgrade them to make it proper by themselves this editor

2. AccessVault - Role-Based Credential Management System (Dec 2025 - Feb 2026)
   techstack - [ React.js, Node.js, Express.js, MongoDB, JWT, bcrypt ]
   - Built a credential management application with role-based access for Admin, Manager, and Viewer users.
   - Implemented JWT authentication and bcrypt password hashing for protected login and access control.
   - Created REST APIs for managing credentials, users, roles, and access permissions.
   - Designed MongoDB schemas with validation for users, credentials, roles, and audit logs.
   - Added audit logging to track credential access, updates, and modification history.

LANGUAGES:
- tamil (Native proficiency) • english (Professional working proficiency)
    `;
    navigator.clipboard.writeText(resumeText.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div id="printable-resume-wrapper" className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-bg-surface rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col relative border border-border-custom"
      >
        {/* Modal Top Action Bar */}
        <div className="bg-bg-neutral/50 border-b border-border-custom px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="hidden sm:flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></div>
            <h3 className="font-sans font-semibold text-text-primary text-sm ml-2 flex items-center gap-1.5">
              <FileText size={14} className="text-text-secondary" />
              mafrook-resume.pdf
            </h3>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1.5">
              <button 
                onClick={handleCopyText}
                className="px-2.5 py-1.5 text-xs text-text-secondary hover:text-text-primary border border-border-custom hover:border-text-secondary/35 bg-bg-surface rounded-lg transition-all flex items-center gap-1.5 font-medium active:scale-95"
                title="Copy details as plain-text"
              >
                {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </button>
              <a 
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 text-xs text-text-secondary hover:text-text-primary border border-border-custom hover:border-text-secondary/35 bg-bg-surface rounded-lg transition-all flex items-center gap-1.5 font-medium active:scale-95 cursor-pointer"
              >
                <Printer size={12} />
                <span>Open / Print PDF</span>
              </a>
              <a 
                href="/resume.pdf"
                download="Mafrook_Kuthpudeen_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 text-xs text-white bg-accent hover:bg-accent-hover rounded-lg transition-all flex items-center gap-1.5 font-medium active:scale-95 shadow-sm cursor-pointer"
              >
                <Download size={12} className="text-white" />
                <span>Download PDF</span>
              </a>
            </div>
            <button 
              onClick={onClose}
              className="p-1 px-2.5 text-text-secondary hover:text-text-primary transition-colors hover:bg-bg-neutral rounded-lg text-sm font-bold active:scale-95"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Document Wrapper */}
        <div className="overflow-y-auto p-3 sm:p-6 md:p-12 bg-bg-neutral/40 flex-1 scrollbar-thin">
          <div id="printable-resume" className="bg-bg-surface p-4 sm:p-8 md:p-12 border border-border-custom shadow-sm rounded-xl max-w-3xl mx-auto text-text-primary font-sans print:p-0 print:border-0 print:shadow-none transition-colors duration-300">
            
            {/* Document Header */}
            <div className="border-b border-border-custom pb-6 text-center md:text-left">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                <div>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-text-primary">Mafrook kuthpudeen</h1>
                  <p className="text-accent font-medium tracking-widest text-xs uppercase mt-2">Junior Software Engineer</p>
                </div>
                <div className="text-xs text-text-secondary space-y-1 font-mono text-center md:text-right">
                  <p className="flex items-center justify-center md:justify-end gap-1.5">
                    <Mail size={12} /> <a href="mailto:Mafrooktkc@gmail.com" className="hover:underline text-text-primary">Mafrooktkc@gmail.com</a>
                  </p>
                  <p className="flex items-center justify-center md:justify-end gap-1.5">
                    <Phone size={12} /> <a href="tel:+918925661541" className="hover:underline text-text-primary">+91 8925661541</a>
                  </p>
                  <p className="flex items-center justify-center md:justify-end gap-1.5">
                    <MapPin size={12} /> Mayiladuthurai, Tamilnadu, India
                  </p>
                </div>
              </div>
            </div>

            {/* Document Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
              
              {/* Left Column (35%) */}
              <div className="md:col-span-4 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary/60 mb-3 border-b pb-1 border-border-custom">Technical Skills</h4>
                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="font-semibold text-text-primary">Frontend:</span>
                      <p className="text-text-secondary mt-0.5">React.js, TypeScript, JavaScript ES6+, HTML5, CSS3, Tailwind CSS, shadcn/ui, Responsive Design, MUI, React Query, zustand</p>
                    </div>
                    <div>
                      <span className="font-semibold text-text-primary">Backend:</span>
                      <p className="text-text-secondary mt-0.5">Node.js, Express.js, REST API Development, JWT Authentication, Role-Based Access Control, Redis</p>
                    </div>
                    <div>
                      <span className="font-semibold text-text-primary">Database:</span>
                      <p className="text-text-secondary mt-0.5">MongoDB, Postgres</p>
                    </div>
                    <div>
                      <span className="font-semibold text-text-primary">Tools & Workflow:</span>
                      <p className="text-text-secondary mt-0.5">Git, GitHub, Postman, VS Code, Chrome DevTools, codex, ai studio, google sitch</p>
                    </div>
                    <div>
                      <span className="font-semibold text-text-primary">Practices:</span>
                      <p className="text-text-secondary mt-0.5">Documentation, API Integration, input Validation, Error Handling, Debugging, Reusable Components, server and frontend telemetry</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary/60 mb-3 border-b pb-1 border-border-custom">Education</h4>
                  <div className="text-xs space-y-2">
                    <p className="font-bold text-text-primary">Bachelor of Engineering - Computer Science and Engineering</p>
                    <p className="text-text-secondary font-medium">GPA: 8.0 / 10</p>
                    <p className="text-text-secondary leading-relaxed">E.G.S. Pillay Engineering College, Nagapattinam</p>
                    <p className="text-text-secondary/60 font-mono">Oct 2020 - Jun 2024</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary/60 mb-3 border-b pb-1 border-border-custom">Languages</h4>
                  <ul className="text-xs space-y-2 text-text-secondary list-disc list-inside">
                    <li>tamil (Native proficiency)</li>
                    <li>english (Professional working proficiency)</li>
                  </ul>
                </div>
              </div>

              {/* Right Column (65%) */}
              <div className="md:col-span-8 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary/60 mb-3 border-b pb-1 border-border-custom">Professional Summary</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Junior Software Engineer with around 1 year of experience developing business web applications using React.js, TypeScript, Node.js, Express.js, and MongoDB. Worked on loan management software, LMS frontend modules, and a multi-tenant chat module involving session handling, UI flows, API integration, and role-based access. Comfortable building data-driven screens, reusable UI components, REST API integrations, form workflows, and debugging frontend-backend issues in product environments.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary/60 mb-3 border-b pb-1 border-border-custom">Work Experience</h4>
                  <div className="space-y-4">
                    <div className="text-xs">
                      <div className="flex justify-between items-start font-semibold text-text-primary">
                        <span>Junior Software Engineer</span>
                        <span className="font-mono text-[10px] text-text-secondary/70 whitespace-nowrap">Jun 2025 – Present</span>
                      </div>
                      <p className="text-accent font-medium">Statlight Software Solutions</p>
                      <ul className="list-disc list-outside pl-4 space-y-1.5 mt-2 text-text-secondary leading-relaxed text-[11px]">
                        <li>Develop and maintain frontend and full-stack modules for business web applications, including loan management screens, LMS frontend work, and internal chat module features.</li>
                        <li>Build React.js and TypeScript UI components for dashboards, forms, workflow screens, and user-facing business modules.</li>
                        <li>Work on multi-tenant chat module features involving session handling, UI flows, and frontend-backend integration.</li>
                        <li>Integrate REST APIs using React Query for data fetching, loading states, error states, and form submission workflows.</li>
                        <li>Build and update Node.js, Express.js APIs and MongoDB/Mongoose schemas for authentication, role-based access, workflow records, logs, and application data.</li>
                        <li>Debug issues related to API responses, form validation, data rendering, authentication, and role-based user flows.</li>
                      </ul>
                    </div>

                    <div className="text-xs border-t border-dashed border-border-custom pt-3">
                      <div className="flex justify-between items-start font-semibold text-text-primary">
                        <span>Apprenticeship</span>
                        <span className="font-mono text-[10px] text-text-secondary/70 whitespace-nowrap">Oct 2025 – Feb 2026</span>
                      </div>
                      <p className="text-text-secondary">a1ideaz | Mayiladuthurai, India</p>
                      <ul className="list-disc list-outside pl-4 space-y-1.5 mt-2 text-text-secondary leading-relaxed text-[11px]">
                        <li>Trained students in JavaScript, Java, Python, and full-stack development fundamentals with a focus on practical coding sessions.</li>
                        <li>Guided learners in building CRUD applications, authentication flows, REST API basics, and database-connected projects.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary/60 mb-3 border-b pb-1 border-border-custom">Projects</h4>
                  <div className="space-y-4">
                    <div className="text-xs">
                      <p className="font-bold text-text-primary">html-formeditor [opensrc]</p>
                      <p className="text-[10px] text-text-secondary/60 mt-0.5 font-mono">techstack - [ React.js, shadcn, tailwind, typescript ] | Mar 2026 - Apr 2026</p>
                      <ul className="list-disc list-outside pl-4 space-y-1 mt-1 text-text-secondary leading-relaxed text-[11px]">
                        <li>Built a custom, canvas-style visual editor from scratch to create and manage official company documents and email templates.</li>
                        <li>Eliminated third-party package dependencies by engineering an in-house visual builder, giving the production team complete layout and design control.</li>
                        <li>Implemented seamless HTML import and export engines, allowing users to visually modify templates and export raw, production ready HTML layouts.</li>
                        <li>Designed an intuitive drag-and-drop canvas interface leveraging shadcn/ui components and Tailwind CSS for an optimized, responsive user experience.</li>
                        <li>Ensured strict type safety and code reliability across the entire editing workflow by architecting the application fully in TypeScript.</li>
                        <li>This overcomes frontend stress; no need to worry about external packages as the team can maintain and upgrade it themselves.</li>
                      </ul>
                    </div>

                    <div className="text-xs border-t border-dashed border-border-custom pt-3">
                      <p className="font-bold text-text-primary">AccessVault - Role-Based Credential Management System</p>
                      <p className="text-[10px] text-text-secondary/60 mt-0.5 font-mono">techstack - [ React.js, Node.js, Express.js, MongoDB, JWT, bcrypt ] | Dec 2025 - Feb 2026</p>
                      <ul className="list-disc list-outside pl-4 space-y-1 mt-1 text-text-secondary leading-relaxed text-[11px]">
                        <li>Built a credential management application with role-based access for Admin, Manager, and Viewer users.</li>
                        <li>Implemented JWT authentication and bcrypt password hashing for protected login and access control.</li>
                        <li>Created REST APIs for managing credentials, users, roles, and access permissions.</li>
                        <li>Designed MongoDB schemas with validation for users, credentials, roles, and audit logs.</li>
                        <li>Added audit logging to track credential access, updates, and modification history.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeModal;
