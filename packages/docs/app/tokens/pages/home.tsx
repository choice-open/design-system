"use client"
import React from "react";
import { SectionHero, SectionInstallation } from "../components/home";

// ============================================================================
// Home Page
// ============================================================================

export const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <SectionHero />

      {/* Installation & Quick Start */}
      <SectionInstallation />
    </>
  );
};

export default HomePage;
