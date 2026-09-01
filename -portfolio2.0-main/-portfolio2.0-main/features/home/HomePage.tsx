import React, { useState, useEffect } from 'react';

import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { SkillsSection } from './SkillsSection';
import { ExperienceSection } from './ExperienceSection';
import { ProjectsSection } from './ProjectsSection';
import { CertificationsSection } from './CertificationsSection';

import { useUi } from '../../context/UiContext';
import { experience } from '../../lib/data';

const roles = ['UI Engineer', 'Fullstack Engineer', 'Backend Developer', 'Frontend Developer'];

const calculateTotalExperience = () => {
  let totalMonths = 0;
  experience.forEach((exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate ? new Date(exp.endDate) : new Date();
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
    totalMonths += months;
  });

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let label = '';
  if (years > 0) label += `${years} ${years === 1 ? 'Year' : 'Years'}`;
  if (months > 0) {
    if (label) label += ' & ';
    label += `${months} ${months === 1 ? 'Month' : 'Months'}`;
  }

  return {
    label: label || '0 Months',
    years,
    months,
    shortLabel: years > 0 ? `${years}Y ${months}M` : `${months}M`,
  };
};

export const HomePage: React.FC = () => {
  const { setResumeOpen, chromeHidden, pulseChromeHidden } = useUi();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Dynamic role ticker
  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(roleInterval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('Mafrooktkc@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const totalExp = calculateTotalExperience();

  return (
    <>
      <HeroSection setIsResumeOpen={setResumeOpen} currentRoleIndex={currentRoleIndex} roles={roles} />

      <main>
        <AboutSection
          setIsResumeOpen={setResumeOpen}
          handleCopyEmail={handleCopyEmail}
          copiedEmail={copiedEmail}
          totalExp={totalExp}
        />
        <SkillsSection />
        <ExperienceSection totalExp={totalExp} />
        <ProjectsSection hideNavbar={chromeHidden} />
        <CertificationsSection onNavInteraction={pulseChromeHidden} />
      </main>
    </>
  );
};

export default HomePage;
