"use client";

import React, { useState, useEffect } from "react";

// Import section components
import Navigation from "../sections/Navigation";
import Background from "../sections/Background";
import LandingSection from "../sections/LandingSection";
import HeroSection from "../sections/HeroSection";
import ServicesSection from "../sections/ServicesSection";
import AboutSection from "../sections/AboutSection";
import SkillsSection from "../sections/SkillsSection";
import ProjectsSection from "../sections/ProjectsSection";
import ReviewsSection from "../sections/ReviewsSection";
import ContactSection from "../sections/ContactSection";
import Footer from "../sections/Footer";

const HomeScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const navItems = [
        "home",
        "services",
        "about",
        "skills",
        "projects",
        "reviews",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of navItems) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  // Data for sections
  const skills = [
    {
      category: "Mobile Development",
      items: ["Flutter", "Dart", "SwiftUI", "Kotlin"],
    },
    {
      category: "State Management",
      items: ["BLoC", "Provider", "Riverpod", "GetX"],
    },
    { category: "Architecture", items: ["MVVM", "MVC", "Clean Architecture"] },
    {
      category: "Backend & Database",
      items: ["Firebase", "Supabase", "Node.js", "Django", "MySQL"],
    },
    {
      category: "Tools & APIs",
      items: ["RESTful APIs", "WebRTC", "MQTT", "GeoJSON"],
    },
  ];

  const projects = [
    {
      title: "Eduport - E-Learning Platform",
      description:
        "iOS e-learning app with Flutter and BLoC state management for students from standard 10-12. Features include mock tests, video classes, and performance analysis.",
      tech: ["Flutter", "BLoC", "Firebase", "iOS"],
      link: "https://apps.apple.com/in/app/eduport-sslc-11-12-science/id6443499408",
      stats: "10K+ Downloads",
    },
    {
      title: "The1andOnly - E-Commerce with Publishing",
      description:
        "Cross-platform e-commerce app with book publishing features, WordPress backend, and multimedia processing capabilities.",
      tech: ["Flutter", "WordPress", "WooCommerce", "Stripe"],
      link: "https://apps.apple.com/in/app/the1andonly/id6744329968",
      stats: "Multi-platform",
    },
    {
      title: "Kevell Care - Healthcare App",
      description:
        "Healthcare application with real-time video chat, IoT device integration for health monitoring, and comprehensive appointment management.",
      tech: ["Flutter", "BLoC", "WebRTC", "IoT", "MQTT"],
      link: "#",
      stats: "Healthcare Innovation",
    },
    {
      title: "Last Minute Flights",
      description:
        "Flight booking application with dynamic filtering, real-time updates, and comprehensive ticket management system.",
      tech: ["Flutter", "GetX", "REST APIs"],
      link: "https://play.google.com/store/apps/details?id=com.lastairfare.lastminuteflights",
      stats: "Travel Solution",
    },
  ];

  const experiences = [
    {
      title: "Lead Flutter Developer",
      company: "Geneza Solutions, Lucknow",
      period: "Feb 2024 - Present",
      type: "Remote Contract",
      highlights: [
        "Developed Telios Flutter applications with cross-platform functionality",
        "Implemented MVVM design pattern and GetX for state management",
        "Integrated GeoJSON for map interactions and survey data collection",
        "Built Rutu Bhonsle e-commerce app with measurement customization",
      ],
    },
    {
      title: "Flutter Developer",
      company: "Lascade Solutions, Kochi",
      period: "Jul 2024 - Jan 2025",
      type: "Remote Contract",
      highlights: [
        "Developed Last Minute Flights booking application",
        "Implemented dynamic filtering and real-time flight updates",
        "Built comprehensive ticket management system",
      ],
    },
    {
      title: "Lead Flutter Mobile Developer",
      company: "Kevell Corp, Madhura",
      period: "Feb 2023 - Feb 2024",
      type: "Full-time",
      highlights: [
        "Led development of Mango financial application with BLoC architecture",
        "Spearheaded Kevell Care healthcare app with WebRTC integration",
        "Implemented IoT health monitoring devices integration",
        "Built admin panels for comprehensive management",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <Background />

      <Navigation
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />

      <LandingSection />
      <HeroSection scrollToSection={scrollToSection} />
      <ServicesSection />
      <AboutSection experiences={experiences} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomeScreen;
