import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function Home() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('AI Agents');
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeDeploymentFilter, setActiveDeploymentFilter] = useState('cost');
  
  const deploymentChartRef = useRef(null);
  const applicationsChartRef = useRef(null);
  const deploymentChartInstance = useRef(null);
  const applicationsChartInstance = useRef(null);

  const navLinks = [
    { name: 'Deployment', href: '#deployment' },
    { name: 'Tools', href: '#tools' },
    { name: 'Evaluation', href: '#evaluation' },
    { name: 'Applications', href: '#applications' }
  ];

  const mockData = [
    {
      title: "deployment",
      content: {
        intro: "When deploying a marketing automation system with AI agents, businesses have three primary options: on-premises, cloud-based, and a hybrid approach. The right choice depends on factors like budget, data security needs, and technical expertise.",
        chartData: {
          cost: {
            labels: ["On-Premises", "Cloud-Based"],
            datasets: [{ label: "Cost (1=Low, 10=High)", data: [9, 3], backgroundColor: ["#f472b6", "#2dd4bf"] }]
          },
          scalability: {
            labels: ["On-Premises", "Cloud-Based"],
            datasets: [{ label: "Scalability (1=Low, 10=High)", data: [2, 9], backgroundColor: ["#f472b6", "#2dd4bf"] }]
          },
          security: {
            labels: ["On-Premises", "Cloud-Based"],
            datasets: [{ label: "Security (1=Low, 10=High)", data: [10, 7], backgroundColor: ["#f472b6", "#2dd4bf"] }]
          },
          maintenance: {
            labels: ["On-Premises", "Cloud-Based"],
            datasets: [{ label: "Maintenance (1=Low, 10=High)", data: [9, 2], backgroundColor: ["#f472b6", "#2dd4bf"] }]
          }
        },
        tableData: {
          headers: ["Feature", "On-Premises", "Cloud-Based", "Hybrid"],
          rows: [
            ["Pros", "Full control, high customization, no internet reliance.", "Low upfront cost, high scalability, reduced maintenance.", "Balance of control and flexibility."],
            ["Cons", "High initial cost, slow scalability, requires dedicated IT.", "Data security concerns, less customization, variable costs.", "More complex to manage than single-solution."],
            ["Cost", "High initial CapEx, lower OpEx.", "Low initial CapEx, higher OpEx.", "Combination of both."],
            ["Scalability", "Manual and slow.", "Automatic and rapid.", "Scalable with a mix of resources."],
            ["Tech Requirements", "Extensive infrastructure, in-house team.", "Minimal requirements, internet connection.", "Complex blend of infrastructure and cloud services."]
          ]
        }
      }
    },
    {
      title: "tools",
      content: {
        intro: "The landscape of AI marketing automation is evolving rapidly. Here are some of the leading tools and platforms across different categories.",
        tabs: ["AI Agents", "Automation Suites", "Orchestration Tools"],
        sections: {
          "AI Agents": [
            { name: "AutoGPT", description: "An open-source, experimental AI agent that can autonomously execute tasks based on a given objective." },
            { name: "Jasper", description: "An AI-powered content platform that helps generate high-quality marketing copy, from blog posts to ad text." },
            { name: "ChatGPT & Other LLMs", description: "Large language models that can be integrated into workflows to generate personalized content and assist with ideation." }
          ],
          "Automation Suites": [
            { name: "HubSpot", description: "An all-in-one platform with built-in AI tools for lead scoring, content suggestions, and campaign optimization." },
            { name: "Salesforce Marketing Cloud", description: "A robust, enterprise-level platform with its own AI, Einstein, for predictive analytics and customer journey orchestration." },
            { name: "ActiveCampaign", description: "A platform known for its powerful email marketing and CRM automation, with AI features for predictive sending." }
          ],
          "Orchestration Tools": [
            { name: "Zapier", description: "A popular no-code automation tool that allows you to connect thousands of apps and create workflows with AI." },
            { name: "Make", description: "A powerful visual platform for building and automating complex workflows, offering a higher degree of customization." }
          ]
        }
      }
    },
    {
      title: "evaluation",
      content: {
        intro: "Choosing the right platform is critical. Here are the key parameters to evaluate.",
        parameters: [
          { name: "Ease of Use", description: "How intuitive is the user interface? Is it easy to build campaigns and workflows without a technical background?" },
          { name: "Integrations", description: "Does the platform connect with your existing CRM, social media, and analytics tools? A wide range of native integrations is a significant plus." },
          { name: "Pricing", description: "Consider the total cost of ownership, including subscription fees, usage-based costs, and potential add-ons." },
          { name: "Customization", description: "Can you tailor the AI models and workflows to your specific business needs and data?" },
          { name: "Scalability", description: "Can the platform grow with your business? Can it handle increasing data volume and more complex campaigns?" },
          { name: "Security & Support", description: "What security measures are in place to protect your data? How reliable is the customer support team?" }
        ]
      }
    },
    {
      title: "applications",
      content: {
        intro: "AI-powered marketing automation is a key driver for business growth.",
        chartData: {
          labels: ["Lead Gen & Scoring", "Customer Nurturing", "Predictive Analytics", "Content Creation", "Retention Strategies"],
          datasets: [{
            data: [20, 25, 20, 15, 20],
            backgroundColor: ["#14b8a6", "#34d399", "#8b5cf6", "#f43f5e", "#2563eb"],
            hoverOffset: 4
          }]
        },
        items: [
          { name: "Lead Generation & Scoring", description: "AI agents analyze visitor behavior to identify high-quality leads and score them based on conversion likelihood." },
          { name: "Customer Nurturing & Personalization", description: "AI creates hyper-personalized customer journeys by analyzing past interactions to deliver the right content at the right time." },
          { name: "Predictive Analytics & Campaign Optimization", description: "Instead of A/B testing, AI runs continuous, real-time optimizations to predict which campaign elements will perform best." },
          { name: "Content Creation & Management", description: "AI agents can generate a wide range of content, from product descriptions and blog posts to social media updates." },
          { name: "Retention Strategies", description: "AI can predict customer churn by analyzing behavior patterns and then trigger automated campaigns to re-engage at-risk customers." }
        ]
      }
    }
  ];

  useEffect(() => {
    setData(mockData);
  }, []);

  const createDeploymentChart = (filter) => {
    if (!data) return;
    const deploymentData = data.find(d => d.title === 'deployment').content.chartData[filter];
    const chartConfig = {
      type: 'bar',
      data: deploymentData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, max: 10, ticks: { stepSize: 1 } },
          x: { grid: { display: false } }
        },
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: `Deployment Comparison: ${filter.replace(/^\w/, c => c.toUpperCase())} (1=Low, 10=High)`,
            font: { size: 16 }
          }
        }
      }
    };

    if (deploymentChartInstance.current) {
      deploymentChartInstance.current.destroy();
    }
    deploymentChartInstance.current = new Chart(deploymentChartRef.current, chartConfig);
  };

  const createApplicationsChart = () => {
    if (!data) return;
    const applicationsData = data.find(d => d.title === 'applications').content.chartData;
    const chartConfig = {
      type: 'doughnut',
      data: applicationsData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          title: {
            display: true,
            text: 'Key Application Areas for Business Growth',
            font: { size: 16 }
          }
        }
      }
    };

    if (applicationsChartInstance.current) {
      applicationsChartInstance.current.destroy();
    }
    applicationsChartInstance.current = new Chart(applicationsChartRef.current, chartConfig);
  };

  useEffect(() => {
    if (data) {
      createDeploymentChart(activeDeploymentFilter);
      createApplicationsChart();
    }
  }, [data, activeDeploymentFilter]);

  const handleDeploymentFilter = (filter) => {
    setActiveDeploymentFilter(filter);
  };

  const handleAccordionToggle = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-amber-50">
        <p className="text-gray-600 text-lg">Loading project data...</p>
      </div>
    );
  }
  
  const deploymentContent = data.find(d => d.title === 'deployment').content;
  const toolsContent = data.find(d => d.title === 'tools').content;
  const evaluationContent = data.find(d => d.title === 'evaluation').content;
  const applicationsContent = data.find(d => d.title === 'applications').content;

  return (
    <div className="antialiased">
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #fdfcfb;
          color: #1f2937;
        }
        .nav-link.active {
          color: #0d9488;
          border-bottom-color: #0d9488;
        }
        .tab.active {
          background-color: #0d9488;
          color: #ffffff;
        }
        .chart-container {
          position: relative;
          width: 100%;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          height: 350px;
          max-height: 50vh;
        }
        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease-in-out;
        }
        .accordion-header span {
          transition: transform 0.3s ease;
        }
        .accordion-header.open span {
          transform: rotate(180deg);
        }
        .bg-amber-50 { background-color: #fffbeb; }
        .text-gray-600 { color: #4b5563; }
        .text-lg { font-size: 1.125rem; }
        .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        .font-extrabold { font-weight: 800; }
        .text-gray-900 { color: #111827; }
        .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
        .font-bold { font-weight: 700; }
        .text-teal-700 { color: #0f766e; }
        .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .max-w-7xl { max-width: 80rem; }
        .text-center { text-align: center; }
        .mt-6 { margin-top: 1.5rem; }
        .sm\\:text-5xl { font-size: 3rem; line-height: 1; }
        .md\\:text-6xl { font-size: 3.75rem; line-height: 1; }
        .max-w-3xl { max-width: 48rem; }
        .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
        .sm\\:py-24 { padding-top: 6rem; padding-bottom: 6rem; }
        .mt-4 { margin-top: 1rem; }
        .max-w-2xl { max-width: 42rem; }
        .mt-12 { margin-top: 3rem; }
        .mt-8 { margin-top: 2rem; }
        .flex { display: flex; }
        .justify-center { justify-content: center; }
        .flex-wrap { flex-wrap: wrap; }
        .gap-2 { gap: 0.5rem; }
        .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
        .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
        .rounded-full { border-radius: 9999px; }
        .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
        .font-medium { font-weight: 500; }
        .bg-teal-600 { background-color: #0d9488; }
        .text-white { color: #ffffff; }
        .bg-white { background-color: #ffffff; }
        .text-gray-700 { color: #374151; }
        .border { border-width: 1px; }
        .border-gray-300 { border-color: #d1d5db; }
        .mt-16 { margin-top: 4rem; }
        .overflow-x-auto { overflow-x: auto; }
        .min-w-full { min-width: 100%; }
        .divide-y > :not([hidden]) ~ :not([hidden]) { border-top-width: 1px; }
        .divide-gray-200 { border-color: #e5e7eb; }
        .rounded-lg { border-radius: 0.5rem; }
        .bg-gray-50 { background-color: #f9fafb; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        .text-left { text-align: left; }
        .text-xs { font-size: 0.75rem; line-height: 1rem; }
        .uppercase { text-transform: uppercase; }
        .tracking-wider { letter-spacing: 0.05em; }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        .space-x-4 > :not([hidden]) ~ :not([hidden]) { --tw-space-x-reverse: 0; margin-right: calc(1rem * var(--tw-space-x-reverse)); margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse))); }
        .bg-gray-800 { background-color: #1f2937; }
        .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
        .text-gray-400 { color: #9ca3af; }
        .h-16 { height: 4rem; }
        .hidden { display: none; }
        .md\\:block { display: block; }
        .flex-shrink-0 { flex-shrink: 0; }
        .ml-10 { margin-left: 2.5rem; }
        .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .rounded-md { border-radius: 0.375rem; }
        .border-b-2 { border-bottom-width: 2px; }
        .border-transparent { border-color: transparent; }
        .z-50 { z-index: 50; }
        .sticky { position: sticky; }
        .top-0 { top: 0px; }
        .bg-white\\/80 { background-color: rgba(255, 255, 255, 0.8); }
        .backdrop-blur-lg { backdrop-filter: blur(12px); }
        .border-gray-200 { border-color: #e5e7eb; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .max-w-4xl { max-width: 56rem; }
        .space-y-4 > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 0; margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(1rem * var(--tw-space-y-reverse)); }
        .p-5 { padding: 1.25rem; }
        .text-left { text-align: left; }
        .transform { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
        .transition-transform { transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 0.3s; }
        .duration-300 { transition-duration: 0.3s; }
        .rotate-180 { --tw-rotate: 180deg; }
        .pb-5 { padding-bottom: 1.25rem; }
        .text-2xl { font-size: 1.5rem; line-height: 2rem; }
        .grid { display: grid; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .gap-8 { gap: 2rem; }
        .p-6 { padding: 1.5rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .gap-12 { gap: 3rem; }
        .space-y-6 > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 0; margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(1.5rem * var(--tw-space-y-reverse)); }
        .h-80 { height: 20rem; }
        .md\\:h-96 { height: 24rem; }
        .justify-between { justify-content: space-between; }
      `}</style>
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-teal-700">AI in Marketing</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} className="nav-link text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section id="hero" className="py-20 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">Marketing Automation with AI Agents</h2>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">A comprehensive guide to leveraging autonomous AI for scaling marketing efforts, personalizing customer experiences, and driving business growth. Explore the options, tools, and strategies that are redefining the future of marketing.</p>
          </div>
        </section>
        <section id="deployment" className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">Deployment Options</h3>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{deploymentContent.intro}</p>
            </div>
            <div className="mt-12">
              <div className="chart-container">
                <canvas ref={deploymentChartRef}></canvas>
              </div>
              <div className="mt-8 flex justify-center flex-wrap gap-2">
                {['cost', 'scalability', 'security', 'maintenance'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => handleDeploymentFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${activeDeploymentFilter === filter ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                  >
                    {filter.replace(/^\w/, c => c.toUpperCase())}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-16 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    {deploymentContent.tableData.headers.map((header, i) => (
                      <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deploymentContent.tableData.rows.map((row, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 font-medium">{row[0]}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row[1]}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row[2]}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section id="tools" className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">Top Tools & Platforms</h3>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{toolsContent.intro}</p>
            </div>
            <div className="mt-12">
              <div className="flex justify-center border-b border-gray-200">
                {toolsContent.tabs.map(tabName => (
                  <button
                    key={tabName}
                    onClick={() => setActiveTab(tabName)}
                    className={`px-4 py-2 text-sm font-semibold ${activeTab === tabName ? 'active' : 'text-gray-600'}`}
                  >{tabName}</button>
                ))}
              </div>
              <div className="tab-content mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {toolsContent.sections[activeTab].map((tool, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-lg">{tool.name}</h4>
                    <p className="mt-2 text-sm text-gray-600">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="evaluation" className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">Evaluation Parameters</h3>
              <p className="mt-4 text-lg text-gray-600">{evaluationContent.intro}</p>
            </div>
            <div id="accordion-container" className="mt-12 space-y-4">
              {evaluationContent.parameters.map((param, i) => (
                <div key={i} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => handleAccordionToggle(i)}
                    className={`accordion-header w-full flex justify-between items-center p-5 text-left font-semibold ${activeAccordion === i ? 'open' : ''}`}
                  >
                    {param.name}
                    <span className="transform transition-transform duration-300">&#9662;</span>
                  </button>
                  <div className="accordion-content px-5 pb-5" style={{ maxHeight: activeAccordion === i ? '150px' : '0' }}>
                    <p className="text-gray-600">{param.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="applications" className="py-16 sm:py-24 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">Applications in Scaling Businesses</h3>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{applicationsContent.intro}</p>
            </div>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="chart-container h-80 md:h-96">
                <canvas ref={applicationsChartRef}></canvas>
              </div>
              <div className="space-y-6">
                {applicationsContent.items.map((item, i) => (
                  <div key={i}>
                    <h4 className="text-xl font-bold text-teal-700">{item.name}</h4>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 AI Marketing Automation Guide. A project breakdown for internship selection.</p>
        </div>
      </footer>
    </div>
  );
}
