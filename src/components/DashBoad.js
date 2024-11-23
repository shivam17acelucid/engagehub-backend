import React, { useState } from 'react';
import { Calendar, Users, FolderOpen, Menu, LogOut, Plus, Eye, Trash2 } from 'lucide-react';
import { 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';

const Dashboard = () => {
  // State management (keeping the same state structure)
  const [activeMenu, setActiveMenu] = useState('events');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    events: [
      { id: 1, name: "Diwali Celebration", description: "Annual festival celebration", date: "2024-11-12" },
      { id: 2, name: "Team Building", description: "Quarterly team activity", date: "2024-12-01" },
      { id: 3, name: "Product Launch", description: "New product release event", date: "2024-12-15" }
    ],
    users: [
      { id: 1, name: "Shivam", phoneNo: "12345678", projectsCount: 3 },
      { id: 2, name: "Priya", phoneNo: "87654321", projectsCount: 5 },
      { id: 3, name: "Rahul", phoneNo: "45678912", projectsCount: 2 }
    ],
    projects: [
      { id: 1, name: "Nutmeg", assignedUsers: 3, status: "Hold" },
      { id: 2, name: "Phoenix", assignedUsers: 5, status: "Active" },
      { id: 3, name: "Sapphire", assignedUsers: 4, status: "Completed" }
    ]
  });
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItemData, setNewItemData] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
  };

  // CRUD Operations (keeping the same logic)
  const handleCreate = () => {
    const newId = Math.max(...dashboardData[activeMenu].map(item => item.id)) + 1;
    const newItem = { id: newId, ...newItemData };
    
    setDashboardData(prev => ({
      ...prev,
      [activeMenu]: [...prev[activeMenu], newItem]
    }));
    
    setIsCreateModalOpen(false);
    setNewItemData({});
    showAlert(`New ${activeMenu.slice(0, -1)} created successfully`);
  };

  const handleDelete = (id) => {
    setDashboardData(prev => ({
      ...prev,
      [activeMenu]: prev[activeMenu].filter(item => item.id !== id)
    }));
    showAlert(`${activeMenu.slice(0, -1)} deleted successfully`);
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  const getStatusBadgeClass = (status) => {
    const statusColors = {
      'Hold': 'warning',
      'Active': 'success',
      'Completed': 'info',
      'default': 'default'
    };
    return statusColors[status] || statusColors.default;
  };

  const renderTableHeaders = () => {
    const headers = {
      events: ['ID', 'Name', 'Description', 'Date', 'Actions'],
      users: ['ID', 'Name', 'Phone No', 'Projects Count', 'Actions'],
      projects: ['ID', 'Name', 'Assigned Users', 'Status', 'Actions']
    };

    return headers[activeMenu].map((header, index) => (
      <th key={index} className="pb-4 font-semibold text-indigo-600">{header}</th>
    ));
  };

  const renderTableRows = () => {
    const data = dashboardData[activeMenu];
    
    return data.map((item) => (
      <tr key={item.id} className="border-b border-indigo-50 hover:bg-indigo-50/50 transition-colors">
        <td className="py-4">{item.id}</td>
        <td>{item.name}</td>
        {activeMenu === 'events' && (
          <>
            <td>{item.description}</td>
            <td>{item.date}</td>
          </>
        )}
        {activeMenu === 'users' && (
          <>
            <td>{item.phoneNo}</td>
            <td>{item.projectsCount}</td>
          </>
        )}
        {activeMenu === 'projects' && (
          <>
            <td>{item.assignedUsers}</td>
            <td>
              <Alert severity={getStatusBadgeClass(item.status)} className="py-0">
                {item.status}
              </Alert>
            </td>
          </>
        )}
        <td>
          <div className="flex space-x-2">
            <Button 
              onClick={() => handleView(item)}
              color="primary"
              size="small"
              startIcon={<Eye className="h-4 w-4" />}
            />
            <Button
              onClick={() => handleDelete(item.id)}
              color="error"
              size="small"
              startIcon={<Trash2 className="h-4 w-4" />}
            />
          </div>
        </td>
      </tr>
    ));
  };

  const renderCreateForm = () => {
    const fields = {
      events: [
        { name: 'name', label: 'Event Name', type: 'text' },
        { name: 'description', label: 'Description', type: 'text' },
        { name: 'date', label: 'Date', type: 'date' }
      ],
      users: [
        { name: 'name', label: 'User Name', type: 'text' },
        { name: 'phoneNo', label: 'Phone Number', type: 'text' },
        { name: 'projectsCount', label: 'Projects Count', type: 'number' }
      ],
      projects: [
        { name: 'name', label: 'Project Name', type: 'text' },
        { name: 'assignedUsers', label: 'Assigned Users', type: 'number' },
        { name: 'status', label: 'Status', type: 'select', options: ['Hold', 'Active', 'Completed'] }
      ]
    };

    return fields[activeMenu].map((field) => (
      <div key={field.name} className="mb-4">
        {field.type === 'select' ? (
          <FormControl fullWidth>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={newItemData[field.name] || ''}
              label={field.label}
              onChange={(e) => setNewItemData(prev => ({ ...prev, [field.name]: e.target.value }))}
            >
              {field.options.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <TextField
            fullWidth
            label={field.label}
            type={field.type}
            value={newItemData[field.name] || ''}
            onChange={(e) => setNewItemData(prev => ({ ...prev, [field.name]: e.target.value }))}
          />
        )}
      </div>
    ));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Sidebar */}
      <div className={`${isSidebarExpanded ? 'w-64' : 'w-16'} bg-gradient-to-b from-indigo-600 to-purple-700 shadow-xl transition-all duration-300`}>
        <div className={`p-4 ${isSidebarExpanded ? 'block' : 'hidden'}`}>
          <h2 className="text-xl font-bold text-white">Dashboard</h2>
        </div>
        <nav className="mt-4">
          <Button 
            fullWidth
            onClick={() => setActiveMenu('events')}
            className={`justify-start p-4 ${activeMenu === 'events' ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'}`}
            startIcon={<Calendar className="h-5 w-5" />}
          >
            <span className={isSidebarExpanded ? 'block' : 'hidden'}>Events</span>
          </Button>
          <Button 
            fullWidth
            onClick={() => setActiveMenu('users')}
            className={`justify-start p-4 ${activeMenu === 'users' ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'}`}
            startIcon={<Users className="h-5 w-5" />}
          >
            <span className={isSidebarExpanded ? 'block' : 'hidden'}>Users</span>
          </Button>
          <Button 
            fullWidth
            onClick={() => setActiveMenu('projects')}
            className={`justify-start p-4 ${activeMenu === 'projects' ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'}`}
            startIcon={<FolderOpen className="h-5 w-5" />}
          >
            <span className={isSidebarExpanded ? 'block' : 'hidden'}>Projects</span>
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm">
          <div className="flex justify-between items-center px-8 py-4">
            <div className="flex items-center">
              <Button
                onClick={toggleSidebar}
                className="min-w-0"
                startIcon={<Menu className="h-6 w-6 text-indigo-600" />}
              />
              <h1 className="ml-4 text-xl font-semibold text-indigo-900">
                {activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                className="min-w-0"
                startIcon={<LogOut className="h-6 w-6" />}
              />
              <div className="h-8 w-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8">
          {alert.show && (
            <Alert 
              severity={alert.type}
              className="mb-4"
            >
              {alert.message}
            </Alert>
          )}
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-50">
            <div className="p-6 flex justify-between items-center border-b border-indigo-100">
              <h2 className="text-lg font-semibold text-indigo-900">
                {`${activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)} List`}
              </h2>
              <Button 
                variant="contained"
                onClick={() => setIsCreateModalOpen(true)}
                startIcon={<Plus className="h-4 w-4" />}
              >
                Create
              </Button>
            </div>
            
            <div className="p-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    {renderTableHeaders()}
                  </tr>
                </thead>
                <tbody>
                  {renderTableRows()}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Create Modal */}
      <Dialog open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <DialogTitle>
          Create New {activeMenu.slice(0, -1)}
        </DialogTitle>
        <DialogContent>
          <div className="mt-4">
            {renderCreateForm()}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <DialogTitle>
          View {activeMenu.slice(0, -1)} Details
        </DialogTitle>
        <DialogContent>
          {selectedItem && (
            <div className="mt-4">
              {Object.entries(selectedItem).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <span className="font-medium text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}: </span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;