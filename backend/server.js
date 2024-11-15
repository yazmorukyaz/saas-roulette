const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for development
const mockSaasTools = [
  // Communication & Collaboration
  {
    id: 1,
    name: "Slack",
    description: "Business communication platform that organizes conversations into channels for transparent collaboration.",
    category: "Communication",
    website: "https://slack.com",
    pricing: "Free - $12.50/user/month",
    features: ["Team messaging", "File sharing", "Video calls", "App integrations", "Thread discussions"],
    rating: 4.5,
    isNew: false,
    popularity: 0.9
  },
  {
    id: 2,
    name: "Zoom",
    description: "Video conferencing and messaging solution for enterprises, with high-quality video and audio capabilities.",
    category: "Communication",
    website: "https://zoom.us",
    pricing: "Free - $19.99/user/month",
    features: ["Video conferencing", "Screen sharing", "Meeting recording", "Chat", "Webinars"],
    rating: 4.6,
    isNew: false,
    popularity: 0.95
  },

  // Project Management
  {
    id: 3,
    name: "Trello",
    description: "Visual collaboration tool that creates a shared perspective on any project.",
    category: "Project Management",
    website: "https://trello.com",
    pricing: "Free - $10/user/month",
    features: ["Kanban boards", "Task management", "Team collaboration", "Power-Ups", "Automation"],
    rating: 4.3,
    isNew: false,
    popularity: 0.85
  },
  {
    id: 4,
    name: "Asana",
    description: "Work management platform designed to help teams organize, track, and manage their work.",
    category: "Project Management",
    website: "https://asana.com",
    pricing: "Free - $24.99/user/month",
    features: ["Task management", "Project timelines", "Team calendars", "Custom fields", "Workflows"],
    rating: 4.4,
    isNew: false,
    popularity: 0.82
  },

  // Marketing
  {
    id: 5,
    name: "Mailchimp",
    description: "All-in-one marketing platform for growing businesses.",
    category: "Marketing",
    website: "https://mailchimp.com",
    pricing: "Free - $299/month",
    features: ["Email marketing", "Landing pages", "Marketing automation", "CRM", "Analytics"],
    rating: 4.2,
    isNew: false,
    popularity: 0.88
  },
  {
    id: 6,
    name: "HubSpot",
    description: "Inbound marketing and sales software that helps companies attract visitors and convert leads.",
    category: "Marketing",
    website: "https://hubspot.com",
    pricing: "Free - Custom pricing",
    features: ["CRM", "Marketing automation", "Content management", "SEO tools", "Analytics"],
    rating: 4.4,
    isNew: false,
    popularity: 0.87
  },

  // Development & Design
  {
    id: 7,
    name: "Figma",
    description: "Collaborative interface design tool that enables teams to create, test, and ship better designs.",
    category: "Design",
    website: "https://figma.com",
    pricing: "Free - $15/user/month",
    features: ["Design tools", "Prototyping", "Collaboration", "Design systems", "Plugins"],
    rating: 4.8,
    isNew: false,
    popularity: 0.92
  },
  {
    id: 8,
    name: "GitHub",
    description: "Development platform inspired by the way you work.",
    category: "Development",
    website: "https://github.com",
    pricing: "Free - $21/user/month",
    features: ["Code hosting", "CI/CD", "Project management", "Team collaboration", "Security"],
    rating: 4.7,
    isNew: false,
    popularity: 0.94
  },

  // Analytics
  {
    id: 9,
    name: "Mixpanel",
    description: "Advanced analytics platform for mobile and web.",
    category: "Analytics",
    website: "https://mixpanel.com",
    pricing: "Free - Custom pricing",
    features: ["User analytics", "Funnel analysis", "A/B testing", "Real-time data", "Custom reports"],
    rating: 4.3,
    isNew: true,
    popularity: 0.75
  },
  {
    id: 10,
    name: "Amplitude",
    description: "Product analytics platform that helps teams build better products.",
    category: "Analytics",
    website: "https://amplitude.com",
    pricing: "Free - Custom pricing",
    features: ["Product analytics", "Behavioral analysis", "User journeys", "Predictive analytics", "Data management"],
    rating: 4.4,
    isNew: true,
    popularity: 0.78
  },

  // Customer Support
  {
    id: 11,
    name: "Intercom",
    description: "Customer messaging platform that helps businesses build better customer relationships.",
    category: "Customer Support",
    website: "https://intercom.com",
    pricing: "Starting at $39/month",
    features: ["Live chat", "Chatbots", "Help center", "Customer data", "Team inbox"],
    rating: 4.5,
    isNew: false,
    popularity: 0.86
  },
  {
    id: 12,
    name: "Zendesk",
    description: "Customer service software and support ticket system.",
    category: "Customer Support",
    website: "https://zendesk.com",
    pricing: "Starting at $49/user/month",
    features: ["Help desk", "Knowledge base", "Live chat", "Call center", "Analytics"],
    rating: 4.3,
    isNew: false,
    popularity: 0.84
  }
];

// Get all categories
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(mockSaasTools.map(tool => tool.category))];
  res.json(categories);
});

// API Routes
app.get('/api/saas', (req, res) => {
  res.json(mockSaasTools);
});

app.get('/api/saas/random', (req, res) => {
  const category = req.query.category;
  let availableTools = mockSaasTools;
  
  if (category) {
    availableTools = mockSaasTools.filter(tool => 
      tool.category.toLowerCase() === category.toLowerCase()
    );
  }

  const randomIndex = Math.floor(Math.random() * availableTools.length);
  res.json(availableTools[randomIndex]);
});

app.get('/api/saas/category/:category', (req, res) => {
  const category = req.params.category;
  const filteredTools = mockSaasTools.filter(tool => 
    tool.category.toLowerCase() === category.toLowerCase()
  );
  res.json(filteredTools);
});

app.get('/api/saas/trending', (req, res) => {
  const trendingTools = mockSaasTools
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5);
  res.json(trendingTools);
});

app.get('/api/saas/new', (req, res) => {
  const newTools = mockSaasTools.filter(tool => tool.isNew);
  res.json(newTools);
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
