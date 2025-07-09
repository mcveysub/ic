import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, FileText, Check, X, Clock, AlertTriangle, ArrowLeft, MessageSquare, Shield, TrendingDown } from 'lucide-react';

const InvestmentCommitteeDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const committeMembers = [
    { id: 1, name: 'Sarah Chen', role: 'Chief Investment Officer', limit: 10000000, status: 'online' },
    { id: 2, name: 'Michael Rodriguez', role: 'Portfolio Manager', limit: 5000000, status: 'online' },
    { id: 3, name: 'Emily Johnson', role: 'Risk Manager', limit: 2000000, status: 'away' },
    { id: 4, name: 'David Kim', role: 'Compliance Officer', limit: 1000000, status: 'online' }
  ];

  const pendingApprovals = [
    { 
      id: 1, 
      type: 'Equity Purchase', 
      amount: 8500000, 
      company: 'TechCorp Solutions', 
      requiredVotes: 3, 
      currentVotes: 2, 
      deadline: '2025-07-10', 
      priority: 'high',
      description: 'Strategic acquisition of 15% stake in leading AI software company with strong growth trajectory and defensible moats.',
      sector: 'Technology',
      geography: 'North America',
      memberVotes: {
        1: { vote: 'approve', value: 9000000, comments: 'Strong strategic fit with our tech portfolio. Valuation appears reasonable at 12x forward earnings.' },
        2: { vote: 'approve', value: 8200000, comments: 'Excellent management team and market position. Some concern about competition but overall positive.' },
        3: { vote: 'pending', value: null, comments: null },
        4: { vote: 'pending', value: null, comments: null }
      },
      hotIssues: [
        { issue: 'Regulatory approval for data privacy compliance', status: 'resolved', resolvedDate: '2025-07-05' },
        { issue: 'Competitive threat from Google AI division', status: 'monitoring', lastUpdate: '2025-07-07' },
        { issue: 'Key personnel retention post-acquisition', status: 'unresolved', escalated: true }
      ]
    },
    { 
      id: 2, 
      type: 'Fixed Income', 
      amount: 3200000, 
      company: 'Municipal Bond Series A', 
      requiredVotes: 2, 
      currentVotes: 1, 
      deadline: '2025-07-09', 
      priority: 'medium',
      description: 'Investment in AAA-rated municipal bonds from growing metropolitan area with strong credit profile.',
      sector: 'Fixed Income',
      geography: 'Domestic',
      memberVotes: {
        1: { vote: 'pending', value: null, comments: null },
        2: { vote: 'approve', value: 3200000, comments: 'Solid credit quality and attractive yield in current environment.' },
        3: { vote: 'pending', value: null, comments: null },
        4: { vote: 'pending', value: null, comments: null }
      },
      hotIssues: [
        { issue: 'Interest rate sensitivity analysis', status: 'resolved', resolvedDate: '2025-07-06' },
        { issue: 'Municipal budget pressures from declining tax base', status: 'monitoring', lastUpdate: '2025-07-08' }
      ]
    },
    { 
      id: 3, 
      type: 'Real Estate', 
      amount: 12000000, 
      company: 'Commercial Plaza Fund', 
      requiredVotes: 4, 
      currentVotes: 2, 
      deadline: '2025-07-12', 
      priority: 'high',
      description: 'Investment in diversified commercial real estate fund focused on prime urban office and retail properties.',
      sector: 'Real Estate',
      geography: 'Global',
      memberVotes: {
        1: { vote: 'approve', value: 11500000, comments: 'Strong asset quality but concerned about office space demand post-COVID.' },
        2: { vote: 'approve', value: 12000000, comments: 'Diversification benefits and attractive yield. Well-managed fund with good track record.' },
        3: { vote: 'pending', value: null, comments: null },
        4: { vote: 'pending', value: null, comments: null }
      },
      hotIssues: [
        { issue: 'Remote work impact on office demand', status: 'unresolved', escalated: true },
        { issue: 'Retail vacancy rates in key markets', status: 'monitoring', lastUpdate: '2025-07-07' },
        { issue: 'ESG compliance and green building certifications', status: 'resolved', resolvedDate: '2025-07-04' }
      ]
    },
    { 
      id: 4, 
      type: 'Alternative Investment', 
      amount: 5500000, 
      company: 'Hedge Fund Alpha', 
      requiredVotes: 2, 
      currentVotes: 1, 
      deadline: '2025-07-11', 
      priority: 'medium',
      description: 'Investment in market-neutral hedge fund with quantitative trading strategies and strong risk management.',
      sector: 'Alternatives',
      geography: 'Global',
      memberVotes: {
        1: { vote: 'pending', value: null, comments: null },
        2: { vote: 'pending', value: null, comments: null },
        3: { vote: 'approve', value: 5200000, comments: 'Good diversification benefits but concerned about fee structure and liquidity terms.' },
        4: { vote: 'pending', value: null, comments: null }
      },
      hotIssues: [
        { issue: 'High management fees vs performance', status: 'unresolved', escalated: false },
        { issue: 'Liquidity terms and redemption notice period', status: 'monitoring', lastUpdate: '2025-07-06' },
        { issue: 'Operational due diligence findings', status: 'resolved', resolvedDate: '2025-07-03' }
      ]
    }
  ];

  const portfolioMetrics = {
    totalAUM: 2847000000,
    ytdReturn: 8.7,
    monthlyReturn: 2.1,
    cashPosition: 187000000,
    allocations: {
      equity: 45,
      fixedIncome: 30,
      alternatives: 15,
      cash: 10
    }
  };

  const getApprovalMatrix = (amount) => {
    if (amount <= 1000000) return { required: 1, members: ['Any member'] };
    if (amount <= 5000000) return { required: 2, members: ['CIO or Portfolio Manager + 1 other'] };
    if (amount <= 10000000) return { required: 3, members: ['CIO + 2 others'] };
    return { required: 4, members: ['All members'] };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getVoteIcon = (vote) => {
    if (vote === 'approve') return <Check className="w-4 h-4 text-green-600" />;
    if (vote === 'reject') return <X className="w-4 h-4 text-red-600" />;
    return <Clock className="w-4 h-4 text-gray-400" />;
  };

  const getStatusIcon = (status) => {
    if (status === 'resolved') return <Check className="w-4 h-4 text-green-600" />;
    if (status === 'unresolved') return <AlertTriangle className="w-4 h-4 text-red-600" />;
    return <Clock className="w-4 h-4 text-purple-600" />;
  };

  const ProjectDetailPage = ({ project }) => (
    <div className="space-y-6">
      {/* Back Button */}
      <button 
        onClick={() => setSelectedProject(null)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Pending Approvals
      </button>

      {/* Project Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.company}</h1>
            <p className="text-gray-600 mt-1">{project.type} • {project.sector}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600">{formatCurrency(project.amount)}</p>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              project.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'
            }`}>
              {project.priority} priority
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{project.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm">Deadline: {project.deadline}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm">Geography: {project.geography}</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm">Votes: {project.currentVotes}/{project.requiredVotes}</span>
          </div>
        </div>
      </div>

      {/* Member Approval Values */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Committee Member Evaluations</h2>
        <div className="space-y-4">
          {committeMembers.map((member) => {
            const memberVote = project.memberVotes[member.id];
            return (
              <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {memberVote?.value && (
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Valuation</p>
                        <p className="font-semibold">{formatCurrency(memberVote.value)}</p>
                      </div>
                    )}
                    <div className="flex items-center">
                      {getVoteIcon(memberVote?.vote)}
                      <span className="ml-2 text-sm font-medium capitalize">
                        {memberVote?.vote || 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
                {memberVote?.comments && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-700">{memberVote.comments}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hot Button Issues */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Hot Button Issues</h2>
        <div className="space-y-3">
          {project.hotIssues.map((issue, index) => (
            <div key={index} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start">
                {getStatusIcon(issue.status)}
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{issue.issue}</p>
                  <div className="flex items-center mt-1 space-x-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      issue.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      issue.status === 'unresolved' ? 'bg-red-100 text-red-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {issue.status}
                    </span>
                    {issue.resolvedDate && (
                      <span className="text-xs text-gray-500">Resolved: {issue.resolvedDate}</span>
                    )}
                    {issue.lastUpdate && (
                      <span className="text-xs text-gray-500">Updated: {issue.lastUpdate}</span>
                    )}
                    {issue.escalated && (
                      <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-800 font-medium">
                        Escalated
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
          <MessageSquare className="w-4 h-4 inline mr-2" />
          Add Comment
        </button>
        <button className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
          <X className="w-4 h-4 inline mr-2" />
          Reject
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          <Check className="w-4 h-4 inline mr-2" />
          Approve
        </button>
      </div>
    </div>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Portfolio Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total AUM</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(portfolioMetrics.totalAUM)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">YTD Return</p>
              <p className="text-2xl font-bold text-green-900">{portfolioMetrics.ytdReturn}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Cash Position</p>
              <p className="text-2xl font-bold text-purple-900">{formatCurrency(portfolioMetrics.cashPosition)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Pending Approvals Alert */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
          <div>
            <h3 className="font-semibold text-orange-800">Pending Approvals</h3>
            <p className="text-sm text-orange-700">{pendingApprovals.length} items require committee action</p>
          </div>
        </div>
      </div>

      {/* Asset Allocation Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Asset Allocation</h3>
        <div className="space-y-3">
          {Object.entries(portfolioMetrics.allocations).map(([asset, percentage]) => (
            <div key={asset} className="flex items-center justify-between">
              <span className="text-sm font-medium capitalize">{asset}</span>
              <div className="flex items-center w-64">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium w-8">{percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ApprovalMatrixTab = () => (
    <div className="space-y-6">
      {/* Committee Members */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Committee Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {committeMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-3">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Limit: {formatCurrency(member.limit)}</p>
                <div className="flex items-center mt-1">
                  <div className={`w-2 h-2 rounded-full mr-2 ${member.status === 'online' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                  <span className="text-sm text-gray-600 capitalize">{member.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approval Matrix */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Approval Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Investment Amount</th>
                <th className="text-left py-2">Required Votes</th>
                <th className="text-left py-2">Authorization Requirements</th>
                <th className="text-left py-2">Special Conditions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3">Up to $1M</td>
                <td className="py-3">1</td>
                <td className="py-3">Any committee member</td>
                <td className="py-3">None</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3">$1M - $5M</td>
                <td className="py-3">2</td>
                <td className="py-3">CIO or Portfolio Manager + 1 other</td>
                <td className="py-3">Risk assessment required</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3">$5M - $10M</td>
                <td className="py-3">3</td>
                <td className="py-3">CIO + 2 others</td>
                <td className="py-3">Full committee review</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3">Above $10M</td>
                <td className="py-3">4</td>
                <td className="py-3">All members (unanimous)</td>
                <td className="py-3">Board notification required</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const PendingApprovalsTab = () => (
    <div className="space-y-6">
      {pendingApprovals.map((item) => {
        const matrix = getApprovalMatrix(item.amount);
        const unresolvedIssues = item.hotIssues.filter(issue => issue.status === 'unresolved').length;
        const escalatedIssues = item.hotIssues.filter(issue => issue.escalated).length;
        
        return (
          <div key={item.id} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{item.company}</h3>
                <p className="text-sm text-gray-600">{item.type} • {item.sector}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(item.amount)}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    item.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {item.priority} priority
                  </div>
                  {unresolvedIssues > 0 && (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {unresolvedIssues} issues
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm">Deadline: {item.deadline}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm">Required votes: {matrix.required}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 text-gray-400 mr-2">
                  {item.currentVotes >= item.requiredVotes ? <Check className="w-4 h-4 text-green-500" /> : <Clock className="w-4 h-4" />}
                </div>
                <span className="text-sm">Current votes: {item.currentVotes}/{item.requiredVotes}</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm">{escalatedIssues} escalated</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {committeMembers.slice(0, item.currentVotes).map((member) => (
                  <div key={member.id} className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedProject(item)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  View Details
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  <Check className="w-4 h-4 inline mr-2" />
                  Approve
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                  <X className="w-4 h-4 inline mr-2" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // If a project is selected, show the project detail page
  if (selectedProject) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <ProjectDetailPage project={selectedProject} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Investment Committee Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage portfolio decisions and approvals</p>
        </div>

        {/* Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview', icon: TrendingUp },
              { key: 'matrix', label: 'Approval Matrix', icon: Users },
              { key: 'pending', label: 'Pending Approvals', icon: FileText }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'matrix' && <ApprovalMatrixTab />}
        {activeTab === 'pending' && <PendingApprovalsTab />}
      </div>
    </div>
  );
};

export default InvestmentCommitteeDashboard;