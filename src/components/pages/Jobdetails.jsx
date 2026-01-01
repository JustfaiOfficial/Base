import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Badge, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

// Dark Mode + Neon Accent Color System (matching Job Listing)
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  body {
    background-color: #0a0a0f;
    color: #e4e4e7;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  
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

  .gradient-bg {
    background: radial-gradient(circle at 20% 10%, rgba(139, 92, 246, 0.15), transparent 40%),
                radial-gradient(circle at 80% 90%, rgba(167, 139, 250, 0.1), transparent 50%),
                var(--bg-primary);
    min-height: 100vh;
  }

  .glass-card {
    background: linear-gradient(135deg, rgba(26, 26, 36, 0.8), rgba(30, 30, 40, 0.6));
    backdrop-filter: blur(20px);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .glass-card:hover {
    border-color: var(--border-accent);
  }

  .job-header-card {
    background: linear-gradient(135deg, rgba(26, 26, 36, 0.95), rgba(30, 30, 40, 0.85));
    backdrop-filter: blur(30px);
    border: 1px solid var(--border-accent);
    border-radius: 20px;
    box-shadow: var(--glow-purple);
  }

  /* Header Top Bar */
  .job-header-bar {
    background: linear-gradient(90deg, var(--accent-purple), var(--accent-purple-dark));
    padding: 0.75rem 1.5rem;
  }

  .header-bar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-bar-label {
    font-size: 0.8rem;
    font-weight: 700;
    color: white;
    display: flex;
    align-items: center;
  }

  .header-bar-time {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
  }

  /* Company Info */
  .job-header-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .job-company-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .company-logo-wrapper {
    position: relative;
  }

  .company-logo {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    border: 2px solid rgba(139, 92, 246, 0.3);
    object-fit: cover;
  }

  .verified-check {
    position: absolute;
    bottom: -4px;
    right: -4px;
    width: 22px;
    height: 22px;
    background: var(--success-green);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: white;
    border: 2px solid var(--bg-card);
  }

  .company-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .company-name {
    font-size: 1rem;
    font-weight: 700;
    color: white;
  }

  .company-rating {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--warning-yellow);
  }

  .company-rating i {
    font-size: 0.7rem;
  }

  .company-meta {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  /* Header Actions */
  .job-header-actions {
    display: flex;
    gap: 0.5rem;
  }

  .action-btn {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .action-btn:hover {
    background: rgba(139, 92, 246, 0.15);
    border-color: var(--accent-purple);
    color: var(--accent-purple-light);
  }

  .action-btn.saved {
    background: rgba(245, 158, 11, 0.2);
    border-color: var(--warning-yellow);
    color: var(--warning-yellow);
  }

  /* Job Title */
  .job-main-title {
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: 800;
    color: white;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  /* Badges Row */
  .job-badges-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .job-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .job-badge.active {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success-green);
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    background: var(--success-green);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .job-badge.featured {
    background: rgba(139, 92, 246, 0.15);
    color: var(--accent-purple-light);
  }

  .job-badge.urgent {
    background: rgba(239, 68, 68, 0.15);
    color: var(--error-red);
  }

  .job-badge.views, .job-badge.proposals {
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-secondary);
  }

  /* Key Details Grid */
  .job-key-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    padding: 1.25rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .key-detail-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .key-detail-icon {
    width: 40px;
    height: 40px;
    background: rgba(139, 92, 246, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-purple-light);
    flex-shrink: 0;
  }

  .key-detail-item.highlight .key-detail-icon {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success-green);
  }

  .key-detail-content {
    display: flex;
    flex-direction: column;
  }

  .key-detail-label {
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .key-detail-value {
    font-size: 0.95rem;
    font-weight: 700;
    color: white;
  }

  .key-detail-value.green {
    color: var(--success-green);
  }

  .btn-apply {
    background: linear-gradient(135deg, var(--success-green), #059669);
    border: none;
    color: white;
    font-weight: 700;
    padding: 1rem 2.5rem;
    border-radius: 12px;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  }

  .btn-apply:hover {
    background: linear-gradient(135deg, #059669, var(--success-green));
    box-shadow: 0 6px 25px rgba(16, 185, 129, 0.5);
    transform: translateY(-2px);
    color: white;
  }

  .btn-save {
    background-color: transparent;
    border: 2px solid var(--accent-purple);
    color: var(--accent-purple);
    font-weight: 600;
    padding: 1rem 2.5rem;
    border-radius: 12px;
    font-size: 1.1rem;
    transition: all 0.3s ease;
  }

  .btn-save:hover {
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    border-color: var(--accent-purple);
    color: white;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
  }

  /* Action Card Styles */
  .action-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05));
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .action-header-text {
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
  }

  .action-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 0.75rem;
    background: rgba(139, 92, 246, 0.2);
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--accent-purple-light);
  }

  .btn-primary-action {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    background: linear-gradient(135deg, var(--success-green), #059669);
    border: none;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1rem;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  }

  .btn-primary-action:hover {
    box-shadow: 0 6px 25px rgba(16, 185, 129, 0.5);
  }

  .btn-secondary-action {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-secondary-action:hover {
    background: rgba(139, 92, 246, 0.1);
    border-color: var(--accent-purple);
    color: var(--accent-purple-light);
  }

  .action-stats {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .action-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-num {
    font-size: 1.25rem;
    font-weight: 800;
    color: white;
  }

  .stat-text {
    font-size: 0.7rem;
    color: var(--text-muted);
  }

  .action-stat-divider {
    width: 1px;
    background: rgba(255, 255, 255, 0.1);
  }

  /* Client Card Styles */
  .client-card-header {
    height: 80px;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    position: relative;
    overflow: hidden;
  }

  .client-header-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
    filter: blur(2px);
  }

  .client-header-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0.75rem;
  }

  .client-verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.75rem;
    background: rgba(16, 185, 129, 0.9);
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 600;
    color: white;
  }

  .client-avatar-main {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    border: 4px solid var(--bg-card);
    border-radius: 50%;
    overflow: hidden;
  }

  .client-avatar-main img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .client-rating-display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    font-size: 0.8rem;
  }

  .rating-text {
    margin-left: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.8rem;
  }

  .client-bio {
    text-align: center;
    font-size: 0.85rem;
    font-style: italic;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  .client-stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .client-stat-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .client-stat-item i {
    font-size: 1rem;
    color: var(--accent-purple-light);
  }

  .client-stat-item.highlight i {
    color: var(--success-green);
  }

  .client-stat-content {
    display: flex;
    flex-direction: column;
  }

  .client-stat-value {
    font-size: 0.9rem;
    font-weight: 700;
    color: white;
  }

  .client-stat-label {
    font-size: 0.65rem;
    color: var(--text-muted);
  }

  .btn-view-profile {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.85rem;
    margin-top: 1rem;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--accent-purple-light);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-view-profile:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: var(--accent-purple);
  }

  /* Similar Skills */
  .similar-skills-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .similar-skill-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.75rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .similar-skill-item i {
    font-size: 0.9rem;
  }

  .badge-active {
    background: linear-gradient(135deg, var(--success-green), #059669);
    color: white;
    font-size: 0.85rem;
    padding: 0.5em 1em;
    border-radius: 8px;
    font-weight: 600;
  }

  .badge-featured {
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    color: white;
    font-size: 0.85rem;
    padding: 0.5em 1em;
    border-radius: 8px;
    font-weight: 600;
  }

  .badge-urgent {
    background: linear-gradient(135deg, var(--error-red), #dc2626);
    color: white;
    font-size: 0.85rem;
    padding: 0.5em 1em;
    border-radius: 8px;
    font-weight: 600;
  }

  .badge-views {
    background-color: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.3);
    color: var(--accent-purple-light);
    font-size: 0.85rem;
    padding: 0.5em 1em;
    border-radius: 8px;
    font-weight: 500;
  }

  .skill-badge-primary {
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    color: white;
    font-size: 0.9rem;
    padding: 0.6em 1.2em;
    border-radius: 8px;
    font-weight: 600;
  }

  .skill-badge-secondary {
    background-color: rgba(139, 92, 246, 0.15);
    border: 1px solid rgba(139, 92, 246, 0.3);
    color: var(--accent-purple-light);
    font-size: 0.9rem;
    padding: 0.6em 1.2em;
    border-radius: 8px;
    font-weight: 500;
  }

  .skill-badge-nice {
    background-color: var(--bg-tertiary);
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    font-size: 0.9rem;
    padding: 0.6em 1.2em;
    border-radius: 8px;
    font-weight: 500;
  }

  .progress-skill {
    height: 10px;
    background-color: rgba(139, 92, 246, 0.1);
    border-radius: 10px;
    overflow: hidden;
  }

  .progress-bar-skill {
    background: linear-gradient(90deg, var(--accent-purple), var(--accent-purple-light));
    border-radius: 10px;
    transition: width 1s ease-in-out;
  }

  .client-avatar {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-light));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
  }

  .stat-item {
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  .stat-item strong {
    color: var(--text-primary);
  }

  .divider-dark {
    border-color: var(--border-subtle);
    opacity: 1;
  }

  .icon-action {
    color: var(--text-secondary);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .icon-action:hover {
    color: var(--accent-purple-light);
    transform: scale(1.2);
  }

  .similar-job-card {
    background: linear-gradient(135deg, rgba(26, 26, 36, 0.9), rgba(30, 30, 40, 0.7));
    backdrop-filter: blur(20px);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    padding: 1.75rem;
    transition: all 0.3s ease;
    height: 100%;
  }

  .similar-job-card:hover {
    border-color: var(--accent-purple);
    box-shadow: var(--glow-purple);
    transform: translateY(-4px);
  }

  .text-gradient-purple {
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .circular-progress-container {
    position: relative;
    width: 160px;
    height: 160px;
  }

  .circular-progress-bg {
    fill: none;
    stroke: rgba(139, 92, 246, 0.1);
    stroke-width: 10;
  }

  .circular-progress-bar {
    fill: none;
    stroke: url(#gradient);
    stroke-width: 10;
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: center;
    transition: stroke-dashoffset 1.5s ease-in-out;
  }

  .meta-icon {
    color: var(--accent-purple-light);
    margin-right: 0.5rem;
  }

  .check-icon {
    color: var(--accent-purple);
    margin-right: 0.75rem;
  }

  /* Section Headers */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
    background: rgba(139, 92, 246, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .section-header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .section-icon {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: white;
  }

  .section-subtitle {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .match-score-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.75rem 1.25rem;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05));
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 12px;
  }

  .match-label {
    font-size: 0.65rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .match-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--success-green);
  }

  /* Skills Match Cards */
  .skills-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .skill-match-card {
    display: grid;
    grid-template-columns: 140px 1fr 50px;
    gap: 1rem;
    align-items: center;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  .skill-match-card:hover {
    background: rgba(139, 92, 246, 0.05);
    border-color: rgba(139, 92, 246, 0.2);
  }

  .skill-match-info {
    display: flex;
    flex-direction: column;
  }

  .skill-match-name {
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
  }

  .skill-match-level {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .skill-match-bar {
    height: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    overflow: hidden;
  }

  .skill-match-fill {
    height: 100%;
    border-radius: 4px;
  }

  .skill-match-percent {
    font-size: 0.85rem;
    font-weight: 700;
    color: white;
    text-align: right;
  }

  /* Match Summary Card */
  .match-summary-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    text-align: center;
  }

  .match-summary-content {
    margin-top: 1rem;
  }

  .match-features {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: left;
  }

  .match-feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .match-feature i {
    font-size: 0.9rem;
  }

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

  /* Activity Timeline */
  .activity-timeline {
    position: relative;
    padding-left: 2rem;
  }

  .activity-timeline::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, var(--accent-purple) 0%, rgba(139, 92, 246, 0.1) 100%);
  }

  .activity-item {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    position: relative;
  }

  .activity-item:last-child {
    padding-bottom: 0;
  }

  .activity-dot {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-left: -2.5rem;
    z-index: 1;
    font-size: 0.75rem;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .activity-content {
    flex: 1;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .activity-item:last-child .activity-content {
    border-bottom: none;
    padding-bottom: 0;
  }

  /* Attachments Section */
  .attachment-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .attachment-card:hover {
    background: rgba(139, 92, 246, 0.05);
    border-color: rgba(139, 92, 246, 0.2);
  }

  .attachment-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .attachment-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .attachment-name {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .attachment-size {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .attachment-download {
    color: var(--text-muted);
    transition: all 0.3s ease;
    font-size: 1.1rem;
  }

  .attachment-card:hover .attachment-download {
    color: var(--accent-purple-light);
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

// Circular Progress Component
const CircularProgress = ({ percentage }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-progress-container mx-auto">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <circle
          className="circular-progress-bg"
          cx="80"
          cy="80"
          r={radius}
        />
        <motion.circle
          className="circular-progress-bar"
          cx="80"
          cy="80"
          r={radius}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <motion.div
        className="position-absolute top-50 start-50 translate-middle text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="fw-bold text-white mb-0">{percentage}%</h2>
        <p className="text-gradient-purple mb-0 fw-semibold">Match</p>
      </motion.div>
    </div>
  );
};

// Skill Progress Bar Component
const SkillProgressBar = ({ skill, level, percentage, delay = 0 }) => {
  const getColor = () => {
    if (percentage >= 90) return 'var(--success-green)';
    if (percentage >= 70) return 'var(--accent-purple)';
    if (percentage >= 50) return 'var(--info-blue)';
    return 'var(--warning-yellow)';
  };

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="text-white fw-semibold">{skill}</span>
        <span className="fw-bold" style={{ color: getColor() }}>{level}</span>
      </div>
      <div className="progress-skill">
        <motion.div
          className="progress-bar-skill"
          initial={{ width: '0%' }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );
};

// Similar Jobs Data
const similarJobs = [
  {
    title: 'React Dashboard Development',
    price: '$70-$90/hr',
    type: 'Hourly',
    description: 'Looking for a React developer to build an analytics dashboard with real-time data visualization and interactive charts.',
    skills: ['React', 'D3.js', 'Charts', 'TypeScript'],
    posted: '3 hours ago',
  },
  {
    title: 'Full-Stack Web Application',
    price: '$5,000',
    type: 'Fixed',
    description: 'Need a full-stack developer to create a social networking platform with user authentication and real-time messaging.',
    skills: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
    posted: '5 hours ago',
  },
  {
    title: 'Mobile App Backend API',
    price: '$65-$85/hr',
    type: 'Hourly',
    description: 'Seeking a backend developer to build RESTful APIs for a mobile fitness tracking application with complex data models.',
    skills: ['Node.js', 'MongoDB', 'REST API', 'AWS'],
    posted: '8 hours ago',
  },
];

const JobDetailsPage = () => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <>
      <Navbar />
      <style>{customStyles}</style>

      <div className="gradient-bg">
        <Container className="py-5">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Row className="g-4">
              {/* Left Column - Main Content */}
              <Col lg={8}>
                {/* Job Header - Premium Redesign */}
                <motion.div variants={cardVariants}>
                  <Card className="job-header-card border-0 mb-4 overflow-hidden">
                    {/* Header Top Bar */}
                    <div className="job-header-bar">
                      <div className="header-bar-content">
                        <span className="header-bar-label">
                          <i className="bi bi-lightning-charge-fill me-1" />
                          High Priority Project
                        </span>
                        <span className="header-bar-time">
                          <i className="bi bi-clock me-1" />
                          Posted 2 hours ago
                        </span>
                      </div>
                    </div>

                    <Card.Body className="p-4">
                      {/* Company & Title Row */}
                      <div className="job-header-top mb-4">
                        <div className="job-company-info">
                          <div className="company-logo-wrapper">
                            <img
                              src="https://randomuser.me/api/portraits/men/32.jpg"
                              alt="TechCorp"
                              className="company-logo"
                            />
                            <span className="verified-check">
                              <i className="bi bi-patch-check-fill" />
                            </span>
                          </div>
                          <div className="company-details">
                            <div className="d-flex align-items-center gap-2">
                              <span className="company-name">TechCorp Solutions</span>
                              <span className="company-rating">
                                <i className="bi bi-star-fill" />
                                4.9
                              </span>
                            </div>
                            <span className="company-meta">
                              San Francisco, CA • Member since 2019
                            </span>
                          </div>
                        </div>
                        <div className="job-header-actions">
                          <motion.button
                            className={`action-btn ${isSaved ? 'saved' : ''}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsSaved(!isSaved)}
                          >
                            <i className={`bi ${isSaved ? 'bi-bookmark-fill' : 'bi-bookmark'}`} />
                          </motion.button>
                          <motion.button
                            className="action-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <i className="bi bi-share" />
                          </motion.button>
                          <motion.button
                            className="action-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <i className="bi bi-three-dots-vertical" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Job Title */}
                      <h1 className="job-main-title mb-4">
                        Senior Full Stack Developer for E-Commerce Platform
                      </h1>

                      {/* Badges Row */}
                      <div className="job-badges-row mb-4">
                        <span className="job-badge active">
                          <span className="badge-dot"></span>
                          Actively Hiring
                        </span>
                        <span className="job-badge featured">
                          <i className="bi bi-star-fill" />
                          Featured
                        </span>
                        <span className="job-badge urgent">
                          <i className="bi bi-fire" />
                          Urgent
                        </span>
                        <span className="job-badge views">
                          <i className="bi bi-eye" />
                          234 views
                        </span>
                        <span className="job-badge proposals">
                          <i className="bi bi-people" />
                          12 proposals
                        </span>
                      </div>

                      {/* Key Details Grid */}
                      <div className="job-key-details">
                        <div className="key-detail-item highlight">
                          <div className="key-detail-icon">
                            <i className="bi bi-currency-dollar" />
                          </div>
                          <div className="key-detail-content">
                            <span className="key-detail-label">Budget</span>
                            <span className="key-detail-value green">$75-$120/hr</span>
                          </div>
                        </div>
                        <div className="key-detail-item">
                          <div className="key-detail-icon">
                            <i className="bi bi-calendar3" />
                          </div>
                          <div className="key-detail-content">
                            <span className="key-detail-label">Duration</span>
                            <span className="key-detail-value">3-6 months</span>
                          </div>
                        </div>
                        <div className="key-detail-item">
                          <div className="key-detail-icon">
                            <i className="bi bi-briefcase" />
                          </div>
                          <div className="key-detail-content">
                            <span className="key-detail-label">Experience</span>
                            <span className="key-detail-value">5+ years</span>
                          </div>
                        </div>
                        <div className="key-detail-item">
                          <div className="key-detail-icon">
                            <i className="bi bi-geo-alt" />
                          </div>
                          <div className="key-detail-content">
                            <span className="key-detail-label">Location</span>
                            <span className="key-detail-value">Remote Worldwide</span>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>

                {/* Skills Match Analysis - Premium Redesign */}
                <motion.div variants={cardVariants}>
                  <Card className="glass-card border-0 mb-4 overflow-hidden">
                    <div className="section-header">
                      <div className="section-header-left">
                        <div className="section-icon">
                          <i className="bi bi-bar-chart-line" />
                        </div>
                        <div>
                          <h3 className="section-title mb-0">Skills Match Analysis</h3>
                          <span className="section-subtitle">See how well your skills align with this project</span>
                        </div>
                      </div>
                      <div className="match-score-badge">
                        <span className="match-label">Your Match</span>
                        <span className="match-value">88%</span>
                      </div>
                    </div>

                    <Card.Body className="p-4">
                      <Row>
                        <Col lg={7}>
                          <div className="skills-grid">
                            {[
                              { skill: 'React.js', level: 'Expert', percentage: 95, color: '#10b981' },
                              { skill: 'Node.js', level: 'Advanced', percentage: 85, color: '#8b5cf6' },
                              { skill: 'MongoDB', level: 'Intermediate', percentage: 70, color: '#3b82f6' },
                              { skill: 'E-commerce', level: 'Expert', percentage: 92, color: '#10b981' },
                              { skill: 'TypeScript', level: 'Advanced', percentage: 80, color: '#8b5cf6' },
                              { skill: 'AWS', level: 'Intermediate', percentage: 65, color: '#f59e0b' },
                            ].map((item, index) => (
                              <motion.div
                                key={item.skill}
                                className="skill-match-card"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="skill-match-info">
                                  <span className="skill-match-name">{item.skill}</span>
                                  <span className="skill-match-level" style={{ color: item.color }}>{item.level}</span>
                                </div>
                                <div className="skill-match-bar">
                                  <motion.div
                                    className="skill-match-fill"
                                    style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}99)` }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${item.percentage}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                  />
                                </div>
                                <span className="skill-match-percent">{item.percentage}%</span>
                              </motion.div>
                            ))}
                          </div>
                        </Col>
                        <Col lg={5}>
                          <div className="match-summary-card">
                            <CircularProgress percentage={88} />
                            <div className="match-summary-content">
                              <h4 className="text-gradient-purple fw-bold mb-2">Excellent Match!</h4>
                              <p style={{ color: 'var(--text-secondary)' }} className="small mb-3">
                                Your profile matches 88% of the required skills for this project.
                              </p>
                              <div className="match-features">
                                <div className="match-feature">
                                  <i className="bi bi-check-circle-fill" style={{ color: 'var(--success-green)' }} />
                                  <span>4 of 6 required skills</span>
                                </div>
                                <div className="match-feature">
                                  <i className="bi bi-check-circle-fill" style={{ color: 'var(--success-green)' }} />
                                  <span>Experience level matches</span>
                                </div>
                                <div className="match-feature">
                                  <i className="bi bi-check-circle-fill" style={{ color: 'var(--success-green)' }} />
                                  <span>Similar projects completed</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </motion.div>

                {/* Job Description */}
                <motion.div variants={cardVariants}>
                  <Card className="glass-card border-0 p-4 mb-4">
                    <Card.Body>
                      <h3 className="text-white mb-3 fw-bold">Job Description</h3>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                        We are looking for an experienced Full Stack Developer to join our dynamic team and help build the next generation of our E-commerce platform. This is an exciting opportunity to work with cutting-edge technologies and contribute to a product that serves millions of users worldwide.
                      </p>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                        As a Senior Full Stack Developer, you will be responsible for designing, developing, and maintaining both frontend and backend components of our platform. You'll work closely with our product, design, and DevOps teams to deliver high-quality, scalable solutions.
                      </p>

                      <h4 className="text-white mt-4 mb-3 fw-bold">Key Responsibilities</h4>
                      <motion.ul
                        className="list-unstyled d-flex flex-column gap-2"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <motion.li variants={listItemVariants} style={{ color: 'var(--text-secondary)' }}>
                          <i className="bi bi-check-circle-fill check-icon" />
                          Develop and maintain web applications using React.js and Node.js
                        </motion.li>
                        <motion.li variants={listItemVariants} style={{ color: 'var(--text-secondary)' }}>
                          <i className="bi bi-check-circle-fill check-icon" />
                          Design and implement RESTful APIs and GraphQL endpoints
                        </motion.li>
                        <motion.li variants={listItemVariants} style={{ color: 'var(--text-secondary)' }}>
                          <i className="bi bi-check-circle-fill check-icon" />
                          Optimize application performance and ensure scalability
                        </motion.li>
                        <motion.li variants={listItemVariants} style={{ color: 'var(--text-secondary)' }}>
                          <i className="bi bi-check-circle-fill check-icon" />
                          Collaborate with UI/UX designers to implement pixel-perfect designs
                        </motion.li>
                        <motion.li variants={listItemVariants} style={{ color: 'var(--text-secondary)' }}>
                          <i className="bi bi-check-circle-fill check-icon" />
                          Write clean, maintainable, and well-documented code
                        </motion.li>
                        <motion.li variants={listItemVariants} style={{ color: 'var(--text-secondary)' }}>
                          <i className="bi bi-check-circle-fill check-icon" />
                          Participate in code reviews and maintain coding standards
                        </motion.li>
                      </motion.ul>
                    </Card.Body>
                  </Card>
                </motion.div>

                {/* Skills Required */}
                <motion.div variants={cardVariants}>
                  <Card className="glass-card border-0 p-4 mb-4">
                    <Card.Body>
                      <h3 className="text-white mb-4 fw-bold">Skills Required</h3>

                      <h5 className="fw-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                        Primary Skills
                      </h5>
                      <motion.div
                        className="d-flex flex-wrap gap-2 mb-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {['React.js', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Express.js'].map((skill, index) => (
                          <motion.span
                            key={skill}
                            variants={listItemVariants}
                            className="skill-badge-primary"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </motion.div>

                      <h5 className="fw-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                        Secondary Skills
                      </h5>
                      <motion.div
                        className="d-flex flex-wrap gap-2 mb-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {['GraphQL', 'Docker', 'AWS', 'Redis', 'Jest', 'Cypress', 'Git', 'Agile/Scrum'].map((skill, index) => (
                          <motion.span
                            key={skill}
                            variants={listItemVariants}
                            className="skill-badge-secondary"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </motion.div>

                      <h5 className="fw-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                        Nice to Have
                      </h5>
                      <motion.div
                        className="d-flex flex-wrap gap-2"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {['Next.js', 'Microservices', 'Kubernetes', 'CI/CD'].map((skill, index) => (
                          <motion.span
                            key={skill}
                            variants={listItemVariants}
                            className="skill-badge-nice"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </motion.div>
                    </Card.Body>
                  </Card>
                </motion.div>

                {/* Project Timeline / Activity */}
                <motion.div variants={cardVariants}>
                  <Card className="glass-card border-0 p-4 mb-4">
                    <Card.Body>
                      <h3 className="text-white mb-4 fw-bold">
                        <i className="bi bi-activity me-2" style={{ color: 'var(--accent-purple)' }} />
                        Project Activity
                      </h3>

                      <div className="activity-timeline">
                        {[
                          { icon: 'bi-send-fill', color: '#8b5cf6', title: 'Job Posted', time: '2 hours ago', description: 'Project was published and is now accepting proposals' },
                          { icon: 'bi-people-fill', color: '#10b981', title: '12 Proposals Received', time: '1 hour ago', description: 'Multiple freelancers have shown interest' },
                          { icon: 'bi-eye-fill', color: '#3b82f6', title: '234 Views', time: '30 minutes ago', description: 'Project is gaining traction' },
                          { icon: 'bi-chat-dots-fill', color: '#f59e0b', title: 'Client Active', time: 'Just now', description: 'Client is online and reviewing proposals' },
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            className="activity-item"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="activity-dot" style={{ backgroundColor: item.color }}>
                              <i className={`bi ${item.icon}`} />
                            </div>
                            <div className="activity-content">
                              <div className="d-flex justify-content-between align-items-start">
                                <h6 className="text-white mb-1 fw-semibold">{item.title}</h6>
                                <small style={{ color: 'var(--text-muted)' }}>{item.time}</small>
                              </div>
                              <p style={{ color: 'var(--text-secondary)' }} className="mb-0 small">{item.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>

                {/* Attachments Section */}
                <motion.div variants={cardVariants}>
                  <Card className="glass-card border-0 p-4 mb-4">
                    <Card.Body>
                      <h3 className="text-white mb-4 fw-bold">
                        <i className="bi bi-paperclip me-2" style={{ color: 'var(--accent-purple)' }} />
                        Attachments
                      </h3>

                      <Row className="g-3">
                        {[
                          { name: 'Project_Requirements.pdf', size: '2.4 MB', icon: 'bi-file-pdf-fill', color: '#ef4444' },
                          { name: 'UI_Mockups.fig', size: '8.1 MB', icon: 'bi-palette-fill', color: '#8b5cf6' },
                          { name: 'Database_Schema.sql', size: '156 KB', icon: 'bi-database-fill', color: '#3b82f6' },
                          { name: 'API_Documentation.md', size: '89 KB', icon: 'bi-file-code-fill', color: '#10b981' },
                        ].map((file, index) => (
                          <Col md={6} key={index}>
                            <motion.div
                              className="attachment-card"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="attachment-icon" style={{ backgroundColor: `${file.color}20`, color: file.color }}>
                                <i className={`bi ${file.icon}`} />
                              </div>
                              <div className="attachment-info">
                                <span className="attachment-name">{file.name}</span>
                                <span className="attachment-size">{file.size}</span>
                              </div>
                              <i className="bi bi-download attachment-download" />
                            </motion.div>
                          </Col>
                        ))}
                      </Row>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
              <Col lg={4}>
                {/* Action Card - Premium */}
                <motion.div variants={cardVariants} className="mb-4">
                  <Card className="glass-card border-0 overflow-hidden">
                    <div className="action-card-header">
                      <span className="action-header-text">Ready to Apply?</span>
                      <span className="action-badge">
                        <i className="bi bi-lightning-charge-fill me-1" />
                        Quick Apply
                      </span>
                    </div>
                    <Card.Body className="p-4">
                      <div className="d-grid gap-3">
                        <Link to="/milestone" className="text-decoration-none">
                          <motion.button
                            className="btn-primary-action w-100"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <i className="bi bi-send-fill" />
                            Submit Proposal
                          </motion.button>
                        </Link>
                        <motion.button
                          className="btn-secondary-action"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <i className="bi bi-bookmark" />
                          Save for Later
                        </motion.button>
                      </div>
                      <div className="action-stats mt-4">
                        <div className="action-stat">
                          <span className="stat-num">12</span>
                          <span className="stat-text">Proposals</span>
                        </div>
                        <div className="action-stat-divider" />
                        <div className="action-stat">
                          <span className="stat-num">3</span>
                          <span className="stat-text">Interviewing</span>
                        </div>
                        <div className="action-stat-divider" />
                        <div className="action-stat">
                          <span className="stat-num">234</span>
                          <span className="stat-text">Views</span>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>

                {/* Client Information - Premium */}
                <motion.div variants={cardVariants}>
                  <Card className="glass-card border-0 mb-4 overflow-hidden">
                    <div className="client-card-header">
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Client"
                        className="client-header-avatar"
                      />
                      <div className="client-header-overlay">
                        <span className="client-verified-badge">
                          <i className="bi bi-patch-check-fill" />
                          Verified Client
                        </span>
                      </div>
                    </div>
                    <Card.Body className="p-4">
                      <div className="text-center mb-3" style={{ marginTop: '-50px' }}>
                        <div className="client-avatar-main">
                          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Client" />
                        </div>
                        <h5 className="text-white fw-bold mt-2 mb-1">TechCorp Solutions</h5>
                        <div className="client-rating-display">
                          {[1, 2, 3, 4, 5].map(i => (
                            <i key={i} className="bi bi-star-fill" style={{ color: i <= 4 ? 'var(--warning-yellow)' : 'rgba(255,255,255,0.2)' }} />
                          ))}
                          <span className="rating-text">4.9 (127 reviews)</span>
                        </div>
                      </div>

                      <p className="client-bio">
                        "We're a fast-growing tech company focused on delivering innovative e-commerce solutions worldwide."
                      </p>

                      <div className="client-stats-grid">
                        <div className="client-stat-item">
                          <i className="bi bi-calendar3" />
                          <div className="client-stat-content">
                            <span className="client-stat-value">Jan 2019</span>
                            <span className="client-stat-label">Member since</span>
                          </div>
                        </div>
                        <div className="client-stat-item">
                          <i className="bi bi-briefcase" />
                          <div className="client-stat-content">
                            <span className="client-stat-value">47</span>
                            <span className="client-stat-label">Jobs posted</span>
                          </div>
                        </div>
                        <div className="client-stat-item highlight">
                          <i className="bi bi-graph-up-arrow" />
                          <div className="client-stat-content">
                            <span className="client-stat-value">89%</span>
                            <span className="client-stat-label">Hire rate</span>
                          </div>
                        </div>
                        <div className="client-stat-item highlight">
                          <i className="bi bi-currency-dollar" />
                          <div className="client-stat-content">
                            <span className="client-stat-value">$245K+</span>
                            <span className="client-stat-label">Total spent</span>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        className="btn-view-profile"
                        whileHover={{ scale: 1.02 }}
                      >
                        View Full Profile
                        <i className="bi bi-arrow-right" />
                      </motion.button>
                    </Card.Body>
                  </Card>
                </motion.div>

                {/* Similar Skills Card */}
                <motion.div variants={cardVariants}>
                  <Card className="glass-card border-0 p-4 mb-4">
                    <Card.Body>
                      <h5 className="text-white mb-3 fw-bold">
                        <i className="bi bi-lightbulb me-2" style={{ color: 'var(--warning-yellow)' }} />
                        Similar to Your Skills
                      </h5>
                      <div className="similar-skills-list">
                        {['React.js', 'Node.js', 'MongoDB', 'TypeScript'].map((skill, i) => (
                          <motion.div
                            key={skill}
                            className="similar-skill-item"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <i className="bi bi-check-circle-fill" style={{ color: 'var(--success-green)' }} />
                            <span>{skill}</span>
                          </motion.div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            </Row>

            {/* Similar Projects Section */}
            <motion.div
              className="mt-5 pt-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-5">
                <h2 className="text-white fw-bold mb-3">
                  Similar <span className="text-gradient-purple">Projects</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Discover more opportunities that match your expertise
                </p>
              </div>

              <Row className="g-4">
                {similarJobs.map((job, index) => (
                  <Col lg={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                    >
                      <div className="similar-job-card">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h5 className="text-white fw-bold mb-0">{job.title}</h5>
                          <Badge className="badge-featured ms-2">{job.type}</Badge>
                        </div>

                        <p className="fw-bold mb-3" style={{ color: 'var(--success-green)', fontSize: '1.1rem' }}>
                          {job.price}
                        </p>

                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }} className="small mb-4">
                          {job.description}
                        </p>

                        <div className="d-flex flex-wrap gap-2 mb-4">
                          {job.skills.map(skill => (
                            <span key={skill} className="skill-badge-secondary small">
                              {skill}
                            </span>
                          ))}
                        </div>

                        <hr className="divider-dark mb-3" />

                        <div className="d-flex justify-content-between align-items-center">
                          <small style={{ color: 'var(--text-secondary)' }}>
                            <i className="bi bi-clock me-2" />
                            {job.posted}
                          </small>
                          <motion.a
                            href="#"
                            className="text-decoration-none fw-semibold"
                            style={{ color: 'var(--accent-purple-light)' }}
                            whileHover={{ scale: 1.05 }}
                          >
                            View Details
                            <i className="bi bi-arrow-right ms-2" />
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          </motion.div>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default JobDetailsPage;
