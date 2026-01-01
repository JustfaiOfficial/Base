import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Table, ProgressBar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const customStyles = `
  :root {
    --bg-primary: #0a0a0f;
    --bg-secondary: #12121a;
    --bg-card: #1a1a28;
    --accent-purple: #8b5cf6;
    --accent-purple-light: #a78bfa;
    --accent-purple-dark: #7c3aed;
    --accent-gradient: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    --success-green: #10b981;
    --warning-yellow: #f59e0b;
    --error-red: #ef4444;
    --info-blue: #3b82f6;
    --text-primary: #ffffff;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --border-subtle: rgba(255, 255, 255, 0.06);
  }

  .payment-page {
    background: var(--bg-primary);
    min-height: 100vh;
    color: white;
    position: relative;
  }

  .payment-page::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 400px;
    background: radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .page-content {
    position: relative;
    z-index: 1;
  }

  /* Header */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .header-icon {
    width: 56px;
    height: 56px;
    background: var(--accent-gradient);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);
  }

  .header-text h1 {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0;
  }

  .header-text p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin: 0.25rem 0 0 0;
  }

  /* Balance Cards */
  .balance-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    padding: 1.75rem;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .balance-card::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    opacity: 0.1;
    transform: translate(30%, -30%);
  }

  .balance-card.primary::before { background: var(--accent-purple); }
  .balance-card.success::before { background: var(--success-green); }
  .balance-card.warning::before { background: var(--warning-yellow); }

  .balance-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  .balance-icon.primary { background: rgba(139, 92, 246, 0.15); color: var(--accent-purple-light); }
  .balance-icon.success { background: rgba(16, 185, 129, 0.15); color: var(--success-green); }
  .balance-icon.warning { background: rgba(245, 158, 11, 0.15); color: var(--warning-yellow); }

  .balance-label {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
  }

  .balance-value {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .balance-change {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .balance-change.up { background: rgba(16, 185, 129, 0.15); color: var(--success-green); }
  .balance-change.down { background: rgba(239, 68, 68, 0.15); color: var(--error-red); }

  /* Action Buttons */
  .btn-action {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.85rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
  }

  .btn-action.primary {
    background: var(--accent-gradient);
    color: white;
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
  }

  .btn-action.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
  }

  .btn-action.secondary {
    background: rgba(139, 92, 246, 0.12);
    border: 1px solid rgba(139, 92, 246, 0.25);
    color: var(--accent-purple-light);
  }

  .btn-action.secondary:hover {
    background: rgba(139, 92, 246, 0.2);
  }

  /* Section Card */
  .section-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 1.5rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border-subtle);
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }

  .section-title i {
    color: var(--accent-purple-light);
  }

  .section-body {
    padding: 1.5rem;
  }

  /* Payment Methods */
  .payment-method {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-subtle);
    border-radius: 14px;
    margin-bottom: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .payment-method:hover {
    background: rgba(139, 92, 246, 0.05);
    border-color: rgba(139, 92, 246, 0.2);
  }

  .payment-method.selected {
    background: rgba(139, 92, 246, 0.08);
    border-color: var(--accent-purple);
  }

  .method-icon {
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
  }

  .method-icon.bank { color: var(--info-blue); }
  .method-icon.paypal { color: #00457C; }
  .method-icon.card { color: var(--warning-yellow); }

  .method-info {
    flex: 1;
  }

  .method-name {
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 0.2rem;
  }

  .method-details {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .method-badge {
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 600;
  }

  .method-badge.default {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success-green);
  }

  .add-method {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    background: transparent;
    border: 2px dashed rgba(139, 92, 246, 0.3);
    border-radius: 14px;
    color: var(--accent-purple-light);
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .add-method:hover {
    background: rgba(139, 92, 246, 0.05);
    border-color: var(--accent-purple);
  }

  /* Transactions Table */
  .transactions-table {
    width: 100%;
  }

  .transactions-table th {
    padding: 0.85rem 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-muted);
    border-bottom: 1px solid var(--border-subtle);
  }

  .transactions-table td {
    padding: 1rem;
    vertical-align: middle;
    border-bottom: 1px solid var(--border-subtle);
    font-size: 0.9rem;
  }

  .transactions-table tr:last-child td {
    border-bottom: none;
  }

  .transactions-table tbody tr {
    transition: background 0.2s ease;
  }

  .transactions-table tbody tr:hover {
    background: rgba(139, 92, 246, 0.03);
  }

  .tx-project {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .tx-avatar {
    width: 40px;
    height: 40px;
    background: var(--accent-gradient);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.85rem;
  }

  .tx-name {
    font-weight: 600;
    margin-bottom: 0.15rem;
  }

  .tx-client {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .tx-amount {
    font-weight: 700;
  }

  .tx-amount.credit { color: var(--success-green); }
  .tx-amount.debit { color: var(--error-red); }

  .tx-status {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.75rem;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .tx-status.completed { background: rgba(16, 185, 129, 0.15); color: var(--success-green); }
  .tx-status.pending { background: rgba(245, 158, 11, 0.15); color: var(--warning-yellow); }
  .tx-status.processing { background: rgba(59, 130, 246, 0.15); color: var(--info-blue); }

  /* Earnings Chart */
  .chart-placeholder {
    height: 200px;
    background: linear-gradient(180deg, rgba(139, 92, 246, 0.1) 0%, transparent 100%);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1rem;
    position: relative;
  }

  .chart-bars {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 150px;
    gap: 0.5rem;
  }

  .chart-bar {
    flex: 1;
    background: var(--accent-gradient);
    border-radius: 6px 6px 0 0;
    min-height: 20px;
    position: relative;
  }

  .chart-bar::after {
    content: attr(data-value);
    position: absolute;
    top: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    color: var(--text-secondary);
  }

  .chart-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 0.75rem;
  }

  .chart-label {
    font-size: 0.7rem;
    color: var(--text-muted);
    text-align: center;
    flex: 1;
  }

  /* Filter Pills */
  .filter-pills {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .filter-pill {
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    color: var(--text-secondary);
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .filter-pill:hover {
    background: rgba(139, 92, 246, 0.1);
    color: white;
  }

  .filter-pill.active {
    background: var(--accent-purple);
    border-color: var(--accent-purple);
    color: white;
  }

  /* Quick Stats */
  .quick-stat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.85rem 0;
    border-bottom: 1px solid var(--border-subtle);
  }

  .quick-stat:last-child { border-bottom: none; }

  .quick-stat-label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .quick-stat-value {
    font-weight: 700;
    font-size: 0.95rem;
  }

  /* Withdrawal Form */
  .withdraw-input {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    padding: 1rem;
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    width: 100%;
    margin-bottom: 1rem;
  }

  .withdraw-input:focus {
    outline: none;
    border-color: var(--accent-purple);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }

  .withdraw-input::placeholder {
    color: var(--text-muted);
  }

  .quick-amounts {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .quick-amount {
    padding: 0.5rem 1rem;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 8px;
    color: var(--accent-purple-light);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .quick-amount:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: var(--accent-purple);
  }

  /* Responsive */
  @media (max-width: 992px) {
    .page-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
    .balance-card { margin-bottom: 1rem; }
  }

  @media (max-width: 576px) {
    .section-header { flex-direction: column; gap: 1rem; align-items: flex-start; }
    .filter-pills { width: 100%; }
    .filter-pill { flex: 1; text-align: center; }
    .balance-value { font-size: 1.5rem; }
    .header-icon { width: 48px; height: 48px; font-size: 1.25rem; }
    .header-text h1 { font-size: 1.5rem; }
    .transactions-table th, .transactions-table td { padding: 0.75rem 0.5rem; font-size: 0.8rem; }
    .tx-project { flex-direction: column; gap: 0.5rem; }
    .tx-avatar { width: 32px; height: 32px; font-size: 0.75rem; }
  }
`;

const mockTransactions = [
  { id: 1, project: 'E-commerce Platform', client: 'Sarah Johnson', amount: 2500, type: 'credit', status: 'completed', date: 'Dec 28, 2024' },
  { id: 2, project: 'Mobile App UI', client: 'David Chen', amount: 1800, type: 'credit', status: 'completed', date: 'Dec 25, 2024' },
  { id: 3, project: 'Withdrawal to Bank', client: 'Bank ****4523', amount: 3000, type: 'debit', status: 'processing', date: 'Dec 24, 2024' },
  { id: 4, project: 'Dashboard Redesign', client: 'Emily Parker', amount: 1200, type: 'credit', status: 'pending', date: 'Dec 22, 2024' },
  { id: 5, project: 'API Integration', client: 'Tech Solutions', amount: 950, type: 'credit', status: 'completed', date: 'Dec 20, 2024' },
];

const PaymentPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState(1);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const chartData = [65, 45, 80, 55, 90, 70, 85];
  const chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Navbar />
      <style>{customStyles}</style>

      <div className="payment-page">
        <div className="page-content">
          <Container className="py-5">
            {/* Header */}
            <motion.div
              className="page-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="header-left">
                <div className="header-icon">
                  <i className="bi bi-wallet2" />
                </div>
                <div className="header-text">
                  <h1>Payments</h1>
                  <p>Manage your earnings and withdrawals</p>
                </div>
              </div>
              <div className="d-flex gap-2">
                <motion.button
                  className="btn-action secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="bi bi-download" />
                  Export
                </motion.button>
                <motion.button
                  className="btn-action primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="bi bi-arrow-up-right" />
                  Withdraw
                </motion.button>
              </div>
            </motion.div>

            {/* Balance Cards */}
            <Row className="g-4 mb-4">
              <Col md={4}>
                <motion.div
                  className="balance-card primary"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                >
                  <div className="balance-icon primary">
                    <i className="bi bi-wallet2" />
                  </div>
                  <div className="balance-label">Available Balance</div>
                  <div className="balance-value">$12,450</div>
                  <span className="balance-change up">
                    <i className="bi bi-arrow-up" />
                    +12.5% this month
                  </span>
                </motion.div>
              </Col>
              <Col md={4}>
                <motion.div
                  className="balance-card warning"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  <div className="balance-icon warning">
                    <i className="bi bi-hourglass-split" />
                  </div>
                  <div className="balance-label">Pending</div>
                  <div className="balance-value">$3,200</div>
                  <span className="balance-change up">
                    <i className="bi bi-clock" />
                    2 payments pending
                  </span>
                </motion.div>
              </Col>
              <Col md={4}>
                <motion.div
                  className="balance-card success"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                >
                  <div className="balance-icon success">
                    <i className="bi bi-graph-up-arrow" />
                  </div>
                  <div className="balance-label">Total Earned</div>
                  <div className="balance-value">$48,750</div>
                  <span className="balance-change up">
                    <i className="bi bi-arrow-up" />
                    +8.2% vs last month
                  </span>
                </motion.div>
              </Col>
            </Row>

            <Row className="g-4">
              {/* Left Column */}
              <Col lg={8}>
                {/* Earnings Chart */}
                <motion.div
                  className="section-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="section-header">
                    <h5 className="section-title">
                      <i className="bi bi-bar-chart-line" />
                      Earnings Overview
                    </h5>
                    <div className="filter-pills">
                      {['Week', 'Month', 'Year'].map(f => (
                        <button key={f} className={`filter-pill ${f === 'Week' ? 'active' : ''}`}>{f}</button>
                      ))}
                    </div>
                  </div>
                  <div className="section-body">
                    <div className="chart-placeholder">
                      <div className="chart-bars">
                        {chartData.map((val, i) => (
                          <motion.div
                            key={i}
                            className="chart-bar"
                            style={{ height: `${val}%` }}
                            data-value={`$${val * 10}`}
                            initial={{ height: 0 }}
                            animate={{ height: `${val}%` }}
                            transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                          />
                        ))}
                      </div>
                      <div className="chart-labels">
                        {chartLabels.map(l => (
                          <span key={l} className="chart-label">{l}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Transactions */}
                <motion.div
                  className="section-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="section-header">
                    <h5 className="section-title">
                      <i className="bi bi-clock-history" />
                      Recent Transactions
                    </h5>
                    <div className="filter-pills">
                      {['All', 'Income', 'Withdrawals'].map(f => (
                        <button
                          key={f}
                          className={`filter-pill ${activeFilter === f.toLowerCase() ? 'active' : ''}`}
                          onClick={() => setActiveFilter(f.toLowerCase())}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table className="transactions-table">
                      <thead>
                        <tr>
                          <th>Project</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockTransactions.map((tx, i) => (
                          <motion.tr
                            key={tx.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.05 }}
                          >
                            <td>
                              <div className="tx-project">
                                <div className="tx-avatar">{tx.project.charAt(0)}</div>
                                <div>
                                  <div className="tx-name">{tx.project}</div>
                                  <div className="tx-client">{tx.client}</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: 'var(--text-secondary)' }}>{tx.date}</td>
                            <td className={`tx-amount ${tx.type}`}>
                              {tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString()}
                            </td>
                            <td>
                              <span className={`tx-status ${tx.status}`}>
                                <i className={`bi ${tx.status === 'completed' ? 'bi-check-circle' : tx.status === 'pending' ? 'bi-clock' : 'bi-arrow-repeat'}`} />
                                {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </Col>

              {/* Right Column - Sidebar */}
              <Col lg={4}>
                {/* Payment Methods */}
                <motion.div
                  className="section-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="section-header">
                    <h5 className="section-title">
                      <i className="bi bi-credit-card" />
                      Payment Methods
                    </h5>
                  </div>
                  <div className="section-body">
                    <motion.div
                      className={`payment-method ${selectedMethod === 1 ? 'selected' : ''}`}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => setSelectedMethod(1)}
                    >
                      <div className="method-icon bank"><i className="bi bi-bank" /></div>
                      <div className="method-info">
                        <div className="method-name">Chase Bank</div>
                        <div className="method-details">****4523</div>
                      </div>
                      <span className="method-badge default">Default</span>
                    </motion.div>

                    <motion.div
                      className={`payment-method ${selectedMethod === 2 ? 'selected' : ''}`}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => setSelectedMethod(2)}
                    >
                      <div className="method-icon paypal"><i className="bi bi-paypal" /></div>
                      <div className="method-info">
                        <div className="method-name">PayPal</div>
                        <div className="method-details">john@email.com</div>
                      </div>
                    </motion.div>

                    <motion.div
                      className={`payment-method ${selectedMethod === 3 ? 'selected' : ''}`}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => setSelectedMethod(3)}
                    >
                      <div className="method-icon card"><i className="bi bi-credit-card-2-front" /></div>
                      <div className="method-info">
                        <div className="method-name">Visa Card</div>
                        <div className="method-details">****8912</div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="add-method"
                      whileHover={{ scale: 1.01 }}
                    >
                      <i className="bi bi-plus-lg" />
                      Add Payment Method
                    </motion.div>
                  </div>
                </motion.div>

                {/* Quick Withdrawal */}
                <motion.div
                  className="section-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="section-header">
                    <h5 className="section-title">
                      <i className="bi bi-arrow-up-right-circle" />
                      Quick Withdraw
                    </h5>
                  </div>
                  <div className="section-body">
                    <input
                      type="text"
                      className="withdraw-input"
                      placeholder="$0.00"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                    <div className="quick-amounts">
                      {[100, 500, 1000, 2000].map(amt => (
                        <motion.button
                          key={amt}
                          className="quick-amount"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setWithdrawAmount(`$${amt}`)}
                        >
                          ${amt}
                        </motion.button>
                      ))}
                    </div>
                    <motion.button
                      className="btn-action primary w-100"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <i className="bi bi-send" />
                      Withdraw Now
                    </motion.button>
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  className="section-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="section-header">
                    <h5 className="section-title">
                      <i className="bi bi-pie-chart" />
                      Statistics
                    </h5>
                  </div>
                  <div className="section-body">
                    <div className="quick-stat">
                      <span className="quick-stat-label">
                        <i className="bi bi-check-circle" style={{ color: 'var(--success-green)' }} />
                        Completed Projects
                      </span>
                      <span className="quick-stat-value">24</span>
                    </div>
                    <div className="quick-stat">
                      <span className="quick-stat-label">
                        <i className="bi bi-clock" style={{ color: 'var(--warning-yellow)' }} />
                        Avg. Payment Time
                      </span>
                      <span className="quick-stat-value">2.3 days</span>
                    </div>
                    <div className="quick-stat">
                      <span className="quick-stat-label">
                        <i className="bi bi-currency-dollar" style={{ color: 'var(--accent-purple-light)' }} />
                        Avg. Project Value
                      </span>
                      <span className="quick-stat-value">$1,850</span>
                    </div>
                    <div className="quick-stat">
                      <span className="quick-stat-label">
                        <i className="bi bi-arrow-repeat" style={{ color: 'var(--info-blue)' }} />
                        Repeat Clients
                      </span>
                      <span className="quick-stat-value">68%</span>
                    </div>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PaymentPage;
