import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Card, Badge, Dropdown } from 'react-bootstrap';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

// Dark Mode + Neon Accent Color System
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  body {
    background-color: #0a0a0f;
    color: #e4e4e7;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  
  /* Global Dark Theme Variables */
  :root {
    --bg-primary: #0a0a0f;
    --bg-secondary: #16161d;
    --bg-tertiary: #1e1e28;
    --bg-card: #1a1a24;
    --bg-card-hover: #22222e;
    
    --border-subtle: rgba(139, 92, 246, 0.1);
    --border-accent: rgba(139, 92, 246, 0.3);
    
    --text-primary: #ffffff;
    --text-secondary: #a1a1aa;
    --text-muted: #71717a;
    
    --accent-purple: #8b5cf6;
    --accent-purple-light: #a78bfa;
    --accent-purple-dark: #7c3aed;
    
    --success-green: #10b981;
    --warning-yellow: #f59e0b;
    --error-red: #ef4444;
    --info-blue: #3b82f6;
    
    --glow-purple: 0 0 20px rgba(139, 92, 246, 0.3);
    --glow-purple-strong: 0 0 30px rgba(139, 92, 246, 0.5);
  }

  /* Glassmorphism Cards */
  .glass-card {
    background: linear-gradient(135deg, rgba(26, 26, 36, 0.8), rgba(30, 30, 40, 0.6));
    backdrop-filter: blur(20px);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .glass-card:hover {
    border-color: var(--border-accent);
    box-shadow: var(--glow-purple);
    transform: translateY(-2px);
  }

  /* Search Bar Styling */
  .search-container {
    background: linear-gradient(135deg, rgba(22, 22, 29, 0.95), rgba(26, 26, 36, 0.9));
    backdrop-filter: blur(30px);
    border: 1px solid var(--border-accent);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: var(--glow-purple);
  }

  .form-control-dark {
    background-color: var(--bg-tertiary);
    border: 1px solid var(--border-subtle);
    color: var(--text-primary);
    border-radius: 12px;
    padding: 0.75rem 1rem;
    transition: all 0.3s ease;
  }

  .form-control-dark:focus {
    background-color: var(--bg-card);
    border-color: var(--accent-purple);
    color: var(--text-primary);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }

  .form-control-dark::placeholder {
    color: var(--text-muted);
  }

  .input-group-text-dark {
    background-color: var(--bg-tertiary);
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
  }

  /* Primary Button - Neon Purple */
  .btn-neon-purple {
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    border: none;
    color: white;
    font-weight: 600;
    padding: 0.75rem 2rem;
    border-radius: 12px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
  }

  .btn-neon-purple:hover {
    background: linear-gradient(135deg, var(--accent-purple-light), var(--accent-purple));
    box-shadow: 0 6px 25px rgba(139, 92, 246, 0.5);
    transform: translateY(-2px);
    color: white;
  }

  /* Tag Buttons */
  .tag-btn {
    background-color: var(--bg-tertiary);
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    margin: 0.25rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .tag-btn:hover {
    background-color: var(--bg-card-hover);
    border-color: var(--accent-purple);
    color: var(--accent-purple-light);
    transform: translateY(-1px);
  }

  /* Stats Cards */
  .stats-card {
    background: linear-gradient(135deg, rgba(26, 26, 36, 0.9), rgba(30, 30, 40, 0.7));
    backdrop-filter: blur(20px);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
  }

  .stats-card:hover {
    border-color: var(--accent-purple);
    box-shadow: var(--glow-purple);
  }

  .stats-icon {
    font-size: 2.5rem;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Job Cards */
  .job-card {
    background: linear-gradient(135deg, rgba(26, 26, 36, 0.95), rgba(30, 30, 40, 0.85));
    backdrop-filter: blur(20px);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    padding: 1.75rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100%;
  }

  .job-card:hover {
    border-color: var(--accent-purple);
    box-shadow: var(--glow-purple-strong);
    transform: translateY(-4px);
  }

  .company-avatar {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    border: 2px solid var(--border-subtle);
    object-fit: cover;
    transition: all 0.3s ease;
  }

  .job-card:hover .company-avatar {
    border-color: var(--accent-purple);
    box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
  }

  /* Badges */
  .badge-verified {
    background: linear-gradient(135deg, var(--success-green), #059669);
    color: white;
    font-size: 0.75rem;
    padding: 0.4em 0.8em;
    border-radius: 6px;
    font-weight: 600;
  }

  .badge-premium {
    background: linear-gradient(135deg, var(--warning-yellow), #d97706);
    color: white;
    font-size: 0.75rem;
    padding: 0.4em 0.8em;
    border-radius: 6px;
    font-weight: 600;
  }

  .badge-skill {
    background-color: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.3);
    color: var(--accent-purple-light);
    font-size: 0.8rem;
    padding: 0.5em 1em;
    border-radius: 8px;
    font-weight: 500;
  }

  /* Rating Stars */
  .star-rating {
    color: var(--warning-yellow);
    font-size: 0.875rem;
  }

  /* Job Meta Info */
  .job-meta {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  .job-meta i {
    color: var(--accent-purple-light);
    margin-right: 0.5rem;
  }

  .job-meta strong {
    color: var(--text-primary);
  }

  /* Divider */
  .divider-dark {
    border-color: var(--border-subtle);
    opacity: 1;
  }

  /* Category Cards */
  .category-card {
    background: linear-gradient(135deg, rgba(26, 26, 36, 0.9), rgba(30, 30, 40, 0.7));
    backdrop-filter: blur(20px);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    padding: 2.5rem 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .category-card:hover {
    border-color: var(--accent-purple);
    box-shadow: var(--glow-purple-strong);
    transform: translateY(-4px);
  }

  .category-icon {
    font-size: 3.5rem;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
  }

  .category-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .category-count {
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  /* Browse Button */
  .btn-outline-purple {
    background-color: transparent;
    border: 2px solid var(--accent-purple);
    color: var(--accent-purple);
    padding: 0.6rem 1.5rem;
    border-radius: 10px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .btn-outline-purple:hover {
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    border-color: var(--accent-purple);
    color: white;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
  }

  /* Load More Button */
  .btn-load-more {
    background-color: var(--bg-card);
    border: 1px solid var(--border-accent);
    color: var(--text-primary);
    padding: 0.875rem 2.5rem;
    border-radius: 12px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .btn-load-more:hover {
    background-color: var(--bg-card-hover);
    border-color: var(--accent-purple);
    color: var(--accent-purple-light);
    box-shadow: var(--glow-purple);
  }

  /* Dropdown Styling */
  .dropdown-toggle {
    background-color: var(--bg-tertiary) !important;
    border: 1px solid var(--border-subtle) !important;
    color: var(--text-primary) !important;
    border-radius: 10px !important;
  }

  .dropdown-toggle:hover {
    border-color: var(--accent-purple) !important;
  }

  .dropdown-menu {
    background-color: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    padding: 0.5rem;
  }

  .dropdown-item {
    color: var(--text-secondary);
    border-radius: 8px;
    padding: 0.6rem 1rem;
    transition: all 0.2s ease;
  }

  .dropdown-item:hover {
    background-color: var(--bg-card-hover);
    color: var(--accent-purple-light);
  }

  /* Gradient Background */
  .gradient-bg {
    background: radial-gradient(circle at 20% 10%, rgba(139, 92, 246, 0.15), transparent 40%),
                radial-gradient(circle at 80% 90%, rgba(167, 139, 250, 0.1), transparent 50%),
                var(--bg-primary);
  }

  /* Text Utilities */
  .text-gradient-purple {
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--accent-purple);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent-purple-light);
  }

  /* ==========================================
     HERO SECTION - REDESIGNED
     ========================================== */

  .hero-header {
    padding: 2rem 0 3rem;
    overflow: hidden;
  }

  .hero-glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.5;
    pointer-events: none;
  }

  .hero-glow-1 {
    width: 400px;
    height: 400px;
    background: rgba(139, 92, 246, 0.3);
    top: -100px;
    left: 10%;
    animation: float 8s ease-in-out infinite;
  }

  .hero-glow-2 {
    width: 300px;
    height: 300px;
    background: rgba(167, 139, 250, 0.25);
    bottom: -50px;
    right: 15%;
    animation: float 6s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(20px, -20px); }
  }

  .hero-badge-container {
    position: relative;
    z-index: 1;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1.25rem;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--accent-purple-light);
  }

  .hero-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 800;
    color: white;
    line-height: 1.1;
    letter-spacing: -0.03em;
    position: relative;
    z-index: 1;
  }

  .hero-title-highlight {
    display: inline-block;
  }

  .hero-subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 600px;
    line-height: 1.6;
    position: relative;
    z-index: 1;
  }

  .hero-stats-inline {
    display: inline-flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    position: relative;
    z-index: 1;
  }

  .hero-stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-stat-value {
    font-size: 1.25rem;
    font-weight: 800;
    color: white;
  }

  .hero-stat-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
  }

  .hero-stat-divider {
    width: 1px;
    height: 30px;
    background: rgba(255, 255, 255, 0.1);
  }

  /* ==========================================
     SEARCH CONTAINER - REDESIGNED
     ========================================== */

  .search-container-premium {
    background: linear-gradient(135deg, rgba(22, 22, 29, 0.95), rgba(26, 26, 36, 0.9));
    backdrop-filter: blur(30px);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  }

  .search-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr auto;
    gap: 1rem;
    align-items: center;
  }

  @media (max-width: 992px) {
    .search-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 576px) {
    .search-grid {
      grid-template-columns: 1fr;
    }
  }

  .search-field {
    display: flex;
    align-items: center;
    background: var(--bg-tertiary);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 14px;
    padding: 0 1rem;
    transition: all 0.3s ease;
  }

  .search-field:focus-within {
    border-color: var(--accent-purple);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }

  .search-field-icon {
    color: var(--text-muted);
    margin-right: 0.75rem;
    flex-shrink: 0;
  }

  .search-input,
  .search-select {
    background: transparent !important;
    border: none !important;
    color: var(--text-primary) !important;
    padding: 0.875rem 0 !important;
    box-shadow: none !important;
  }

  .search-input::placeholder {
    color: var(--text-muted);
  }

  .search-select option {
    background: var(--bg-card);
    color: var(--text-primary);
  }

  .search-submit-btn {
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    border: none;
    color: white;
    font-weight: 600;
    padding: 0.875rem 2rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.35);
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .search-submit-btn:hover {
    box-shadow: 0 12px 35px rgba(139, 92, 246, 0.5);
  }

  .search-tags {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .search-tags-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent-purple-light);
  }

  .search-tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .search-tag {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--text-secondary);
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .search-tag:hover,
  .search-tag.active {
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.3);
    color: var(--accent-purple-light);
  }

  /* ==========================================
     FEATURE HIGHLIGHTS
     ========================================== */

  .feature-highlight-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-secondary);
    transition: all 0.3s ease;
  }

  .feature-highlight-card:hover {
    border-color: rgba(139, 92, 246, 0.3);
    background: rgba(139, 92, 246, 0.05);
  }

  .feature-highlight-card i {
    font-size: 1.25rem;
  }

  /* ==========================================
     JOBS SECTION HEADER
     ========================================== */

  .jobs-section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
  }

  .jobs-header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .jobs-header-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    margin: 0;
    display: flex;
    align-items: center;
  }

  .jobs-header-title i {
    color: var(--accent-purple);
  }

  .jobs-header-count {
    font-size: 0.85rem;
    color: var(--text-secondary);
    padding: 0.4rem 0.75rem;
    background: rgba(139, 92, 246, 0.1);
    border-radius: 6px;
  }

  .jobs-header-filters {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .filter-chip {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--text-secondary);
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.2s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .filter-chip:hover,
  .filter-chip.active {
    background: rgba(139, 92, 246, 0.1);
    border-color: var(--accent-purple);
    color: var(--accent-purple-light);
  }

  .filter-dropdown {
    background: transparent !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    color: var(--text-secondary) !important;
    font-size: 0.8rem !important;
    font-weight: 600 !important;
    padding: 0.5rem 1rem !important;
    border-radius: 8px !important;
  }

  .filter-dropdown:hover {
    border-color: var(--accent-purple) !important;
    color: var(--accent-purple-light) !important;
  }

  /* ==========================================
     JOB CARDS - ENHANCED
     ========================================== */

  .job-card {
    background: linear-gradient(145deg, rgba(26, 26, 36, 0.95), rgba(30, 30, 40, 0.85));
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 20px;
    padding: 1.75rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .job-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-purple), var(--accent-purple-light));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .job-card:hover {
    border-color: var(--accent-purple);
    box-shadow: 0 20px 60px rgba(139, 92, 246, 0.2);
    transform: translateY(-6px);
  }

  .job-card:hover::before {
    opacity: 1;
  }

  /* ==========================================
     HORIZONTAL JOB CARDS - NEW LAYOUT
     ========================================== */

  .jobs-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .job-card-horizontal {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1.5rem;
    background: linear-gradient(145deg, rgba(26, 26, 36, 0.95), rgba(30, 30, 40, 0.85));
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 20px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    position: relative;
  }

  .job-card-horizontal::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, var(--accent-purple), var(--accent-purple-light));
    border-radius: 20px 0 0 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .job-card-horizontal:hover {
    border-color: rgba(139, 92, 246, 0.3);
    box-shadow: 0 12px 40px rgba(139, 92, 246, 0.15);
    background: linear-gradient(145deg, rgba(30, 30, 40, 0.95), rgba(34, 34, 46, 0.9));
  }

  .job-card-horizontal:hover::before {
    opacity: 1;
  }

  @media (max-width: 992px) {
    .job-card-horizontal {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    .job-card-left {
      display: none;
    }
    .job-card-right {
      flex-direction: row;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding-top: 1rem;
    }
  }

  /* Left Section */
  .job-card-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    min-width: 80px;
  }

  .job-company-avatar {
    position: relative;
    width: 64px;
    height: 64px;
  }

  .job-company-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 14px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    object-fit: cover;
  }

  .verified-badge-small {
    position: absolute;
    bottom: -4px;
    right: -4px;
    width: 20px;
    height: 20px;
    background: var(--success-green);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    color: white;
    border: 2px solid var(--bg-card);
  }

  .job-quick-stats {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .quick-stat {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    color: var(--text-secondary);
  }

  .quick-stat i {
    color: var(--warning-yellow);
    font-size: 0.65rem;
  }

  .quick-stat i.bi-people {
    color: var(--accent-purple-light);
  }

  /* Main Content Section */
  .job-card-main {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .job-card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .job-badges {
    display: flex;
    gap: 0.5rem;
  }

  .mini-badge {
    font-size: 0.65rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  .mini-badge.verified {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success-green);
  }

  .mini-badge.premium {
    background: rgba(245, 158, 11, 0.15);
    color: var(--warning-yellow);
  }

  .mini-badge.level {
    background: rgba(139, 92, 246, 0.1);
    color: var(--accent-purple-light);
  }

  .job-company-name {
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-left: auto;
  }

  .job-card-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: white;
    margin: 0 0 0.5rem;
    line-height: 1.3;
  }

  .job-card-description {
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin: 0 0 0.75rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .job-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.75rem;
  }

  .job-tag {
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.3rem 0.6rem;
    background: rgba(139, 92, 246, 0.08);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 6px;
    color: var(--accent-purple-light);
  }

  .job-tag.more {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    color: var(--text-secondary);
  }

  .job-card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .meta-item i {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .meta-item.highlight {
    color: var(--success-green);
    font-weight: 600;
  }

  .meta-item.highlight i {
    color: var(--success-green);
  }

  /* Right Action Section */
  .job-card-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    gap: 0.75rem;
    min-width: 140px;
  }

  .job-budget-display {
    text-align: right;
  }

  .budget-label {
    display: block;
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .budget-value {
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--success-green);
  }

  .apply-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    border: none;
    color: white;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0.65rem 1.25rem;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .apply-btn:hover {
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.5);
  }

  .save-btn {
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .save-btn:hover {
    background: rgba(139, 92, 246, 0.1);
    border-color: var(--accent-purple);
    color: var(--accent-purple-light);
  }
`;

// Enhanced job data
const jobs = [
  {
    logo: 'https://randomuser.me/api/portraits/men/32.jpg',
    title: 'Full-Stack React Developer for E-commerce Platform',
    company: 'TechCorp Solutions',
    rating: 5.0,
    reviews: 154,
    verified: true,
    description: 'We\'re looking for an experienced React developer to build a scalable e-commerce platform with advanced features including real-time inventory management, payment processing, and user analytics dashboard.',
    budget: '$3,000 - $5,000',
    duration: '2-3 months',
    location: 'Remote',
    level: 'Expert Level',
    tags: ['React.js', 'Node.js', 'MongoDB', 'TypeScript'],
    proposals: 15,
  },
  {
    logo: 'https://randomuser.me/api/portraits/women/44.jpg',
    title: 'UI/UX Designer for Mobile Banking App',
    company: 'DesignStudio Pro',
    rating: 4.9,
    reviews: 98,
    premium: true,
    description: 'Design a modern, intuitive mobile banking application with a focus on user experience, accessibility, and security. Deliver wireframes, prototypes, and final designs.',
    rate: '$45/hr',
    hours: '40 hours/week',
    location: 'US/EU Timezone',
    level: 'Intermediate',
    tags: ['Figma', 'Sketch', 'Prototyping', 'Mobile Design'],
    proposals: 8,
  },
  {
    logo: 'https://randomuser.me/api/portraits/men/67.jpg',
    title: 'Python Data Scientist for ML Project',
    company: 'DataAnalytics Inc',
    rating: 5.0,
    reviews: 108,
    verified: true,
    description: 'Build machine learning models for customer behavior analysis. Experience with pandas, scikit-learn, and TensorFlow is required. Large dataset project.',
    budget: '$4,000 - $6,000',
    duration: '3-4 months',
    location: 'Remote',
    level: 'Expert Level',
    tags: ['Python', 'Machine Learning', 'TensorFlow', 'Pandas'],
    proposals: 23,
  },
  {
    logo: 'https://randomuser.me/api/portraits/women/21.jpg',
    title: 'Senior DevOps Engineer - Cloud Infrastructure',
    company: 'CloudScale Systems',
    rating: 4.8,
    reviews: 76,
    verified: true,
    description: 'Seeking an experienced DevOps engineer to architect and implement scalable cloud infrastructure using AWS, Kubernetes, and Terraform. CI/CD pipeline expertise required.',
    budget: '$5,500 - $8,000',
    duration: '4-6 months',
    location: 'Remote',
    level: 'Expert Level',
    tags: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
    proposals: 12,
  },
];

// Categories data
const categories = [
  { icon: 'bi-code-slash', title: 'Web Development', jobs: 1247 },
  { icon: 'bi-phone', title: 'Mobile Development', jobs: 892 },
  { icon: 'bi-palette', title: 'Design & Creative', jobs: 1567 },
  { icon: 'bi-pencil-square', title: 'Writing & Content', jobs: 743 },
];

function JobListing() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay }
    })
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`bi bi-star-fill me-1 star-rating`}
        style={{ opacity: i < Math.floor(rating) ? 1 : 0.3 }}
      />
    ));
  };

  return (
    <>
      <Navbar />
      <style>{customStyles}</style>
      <Container
        fluid
        className="p-4 p-md-5 gradient-bg"
        style={{ minHeight: '100vh' }}
      >

        {/* Hero Header Section - Redesigned */}
        <header className="hero-header text-center mb-5 pt-4 position-relative">
          <div className="hero-glow-orb hero-glow-1" />
          <div className="hero-glow-orb hero-glow-2" />

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-badge-container mb-4"
          >
            <span className="hero-badge">
              <i className="bi bi-lightning-charge-fill me-2" />
              Over 12,000+ Jobs Available
            </span>
          </motion.div>

          <motion.h1
            className="hero-title mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Find Your Perfect<br />
            <span className="text-gradient-purple hero-title-highlight">Freelance Project</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle mx-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover thousands of opportunities from top companies worldwide.
            Join our growing community of successful freelancers.
          </motion.p>

          <motion.div
            className="hero-stats-inline mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="hero-stat-item">
              <span className="hero-stat-value">48K+</span>
              <span className="hero-stat-label">Freelancers</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-item">
              <span className="hero-stat-value">$2.4M</span>
              <span className="hero-stat-label">Paid Monthly</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-item">
              <span className="hero-stat-value">98%</span>
              <span className="hero-stat-label">Satisfaction</span>
            </div>
          </motion.div>
        </header>

        {/* Search Bar - Redesigned */}
        <Row className="justify-content-center mb-5">
          <Col lg={10} xl={9}>
            <motion.div
              className="search-container-premium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Form>
                <div className="search-grid">
                  <div className="search-field main">
                    <div className="search-field-icon">
                      <i className="bi bi-search" />
                    </div>
                    <Form.Control
                      type="text"
                      placeholder="Search jobs, skills, companies..."
                      className="search-input"
                    />
                  </div>

                  <div className="search-field">
                    <div className="search-field-icon">
                      <i className="bi bi-grid" />
                    </div>
                    <Form.Select className="search-select">
                      <option>All Categories</option>
                      <option>Web Development</option>
                      <option>Mobile Development</option>
                      <option>UI/UX Design</option>
                      <option>Data Science</option>
                    </Form.Select>
                  </div>

                  <div className="search-field">
                    <div className="search-field-icon">
                      <i className="bi bi-geo-alt" />
                    </div>
                    <Form.Control
                      type="text"
                      placeholder="Location"
                      className="search-input"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="search-submit-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <i className="bi bi-search me-2" />
                    Search Jobs
                  </motion.button>
                </div>
              </Form>

              {/* Popular Tags - Redesigned */}
              <div className="search-tags">
                <span className="search-tags-label">
                  <i className="bi bi-lightning-charge me-1" />
                  Trending:
                </span>
                <div className="search-tags-list">
                  {['React.js', 'Python', 'UI/UX Design', 'Node.js', 'Data Science', 'Mobile Dev'].map((tag, i) => (
                    <motion.button
                      key={tag}
                      className={`search-tag ${i === 0 ? 'active' : ''}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>

        {/* Feature Highlights - Compact */}
        <Row className="mb-5 g-3">
          {[
            { icon: 'bi-shield-check', text: 'Verified Employers', color: '#10b981' },
            { icon: 'bi-cash-stack', text: 'Secure Payments', color: '#8b5cf6' },
            { icon: 'bi-lightning-charge', text: 'Quick Matching', color: '#f59e0b' },
            { icon: 'bi-headset', text: '24/7 Support', color: '#3b82f6' },
          ].map((feature, i) => (
            <Col md={3} sm={6} key={i}>
              <motion.div
                className="feature-highlight-card"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              >
                <i className={`bi ${feature.icon}`} style={{ color: feature.color }} />
                <span>{feature.text}</span>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Job Listings Section - Redesigned Header */}
        <Row ref={ref}>
          <Col xs={12}>
            <motion.div
              className="jobs-section-header mb-4"
              initial="hidden"
              animate={controls}
              variants={sectionVariants}
              custom={0.2}
            >
              <div className="jobs-header-left">
                <h3 className="jobs-header-title">
                  <i className="bi bi-briefcase-fill me-2" />
                  Available Jobs
                </h3>
                <span className="jobs-header-count">{jobs.length} jobs found</span>
              </div>
              <div className="jobs-header-filters">
                <button className="filter-chip active">
                  <i className="bi bi-clock me-1" />
                  Recent
                </button>
                <button className="filter-chip">
                  <i className="bi bi-graph-up me-1" />
                  Trending
                </button>
                <button className="filter-chip">
                  <i className="bi bi-currency-dollar me-1" />
                  Top Pay
                </button>
                <Dropdown>
                  <Dropdown.Toggle className="filter-dropdown">
                    <i className="bi bi-sliders me-2" />
                    More Filters
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Most Proposals</Dropdown.Item>
                    <Dropdown.Item>Least Proposals</Dropdown.Item>
                    <Dropdown.Item>Newest First</Dropdown.Item>
                    <Dropdown.Item>Highest Budget</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </motion.div>

            <div className="jobs-list">
              {jobs.map((job, index) => (
                <motion.div
                  key={index}
                  className="job-card-horizontal"
                  initial="hidden"
                  animate={controls}
                  variants={sectionVariants}
                  custom={index * 0.1 + 0.3}
                  whileHover={{ x: 4 }}
                >
                  {/* Left: Company Avatar & Quick Info */}
                  <div className="job-card-left">
                    <div className="job-company-avatar">
                      <img src={job.logo} alt={job.company} />
                      {job.verified && (
                        <div className="verified-badge-small">
                          <i className="bi bi-patch-check-fill" />
                        </div>
                      )}
                    </div>
                    <div className="job-quick-stats">
                      <div className="quick-stat">
                        <i className="bi bi-star-fill" />
                        <span>{job.rating}</span>
                      </div>
                      <div className="quick-stat">
                        <i className="bi bi-people" />
                        <span>{job.proposals}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Main Content */}
                  <div className="job-card-main">
                    <div className="job-card-header">
                      <div className="job-badges">
                        {job.verified && <span className="mini-badge verified">Verified</span>}
                        {job.premium && <span className="mini-badge premium">Premium</span>}
                        <span className="mini-badge level">{job.level}</span>
                      </div>
                      <span className="job-company-name">{job.company}</span>
                    </div>

                    <Link to="/Job/next" className="text-decoration-none">
                      <h4 className="job-card-title" style={{ cursor: 'pointer' }}>{job.title}</h4>
                    </Link>

                    <p className="job-card-description">{job.description}</p>

                    <div className="job-card-tags">
                      {job.tags.slice(0, 4).map(tag => (
                        <span key={tag} className="job-tag">{tag}</span>
                      ))}
                      {job.tags.length > 4 && <span className="job-tag more">+{job.tags.length - 4}</span>}
                    </div>

                    <div className="job-card-meta">
                      <div className="meta-item">
                        <i className="bi bi-geo-alt" />
                        <span>{job.location}</span>
                      </div>
                      <div className="meta-item">
                        <i className="bi bi-clock" />
                        <span>{job.duration || job.hours}</span>
                      </div>
                      <div className="meta-item highlight">
                        <i className="bi bi-currency-dollar" />
                        <span>{job.budget || job.rate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Section */}
                  <div className="job-card-right">
                    <div className="job-budget-display">
                      <span className="budget-label">Budget</span>
                      <span className="budget-value">{job.budget || job.rate}</span>
                    </div>
                    <Link to="/Job/next">
                      <motion.button
                        className="apply-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                        <i className="bi bi-arrow-right" />
                      </motion.button>
                    </Link>
                    <button className="save-btn">
                      <i className="bi bi-bookmark" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>


            {/* Load More Button */}
            <motion.div
              className="text-center mt-5"
              initial="hidden"
              animate={controls}
              variants={sectionVariants}
              custom={jobs.length * 0.1 + 0.5}
            >
              <motion.button
                className="btn btn-load-more"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <i className="bi bi-arrow-clockwise me-2" />
                Load More Jobs
              </motion.button>
            </motion.div>
          </Col>
        </Row >

        {/* Popular Categories Section */}
        < motion.div
          className="mt-5 pt-5 text-center"
          initial="hidden"
          animate={controls}
          variants={sectionVariants}
          custom={0.5}
        >
          <h2 className="display-5 fw-bold mb-3 text-white">
            Popular <span className="text-gradient-purple">Categories</span>
          </h2>
          <p className="lead mb-5" style={{ color: 'var(--text-secondary)' }}>
            Explore jobs by category and find your perfect match
          </p>

          <Row className="g-4 justify-content-center">
            {categories.map((category, index) => (
              <Col xs={12} sm={6} md={4} lg={3} key={index}>
                <motion.div
                  className="category-card"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial="hidden"
                  animate={controls}
                  variants={sectionVariants}
                  custom={jobs.length * 0.1 + 0.8 + index * 0.15}
                >
                  <i className={`bi ${category.icon} category-icon d-block`} />
                  <h4 className="category-title">{category.title}</h4>
                  <p className="category-count mb-4">{category.jobs} jobs available</p>
                  <motion.button
                    className="btn btn-outline-purple"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse Jobs
                    <i className="bi bi-arrow-right ms-2" />
                  </motion.button>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div >

      </Container >

      <Footer />
    </>
  );
}

export default JobListing;
