// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
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
  FormControl,
  CircularProgress
} from '@mui/material';
import { dashboardService } from '../DashBoardService';
import ViewModal from './ViewModal';
import moment from 'moment';

const Dashboard = () => {
  // State management
  const [activeMenu, setActiveMenu] = useState('events');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    events: [],
    users: [],
    projects: []
  });
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItemData, setNewItemData] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  // Fetch data when activeMenu changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let data;
        switch (activeMenu) {
          case 'events':
            data = await dashboardService.getEvents();
            break;
          case 'users':
            data = await dashboardService.getUsers();
            break;
          case 'projects':
            data = await dashboardService.getProjects();
            break;
          default:
            data = [];
        }
        setDashboardData(prev => ({
          ...prev,
          [activeMenu]: data
        }));
      } catch (error) {
        showAlert('Failed to fetch data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeMenu]);

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
  };

  // CRUD Operations
  const handleCreate = async () => {
    try {
      await dashboardService.createItem(activeMenu, newItemData);
      // Refresh the data
      const newData = await dashboardService[`get${activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}`]();
      setDashboardData(prev => ({
        ...prev,
        [activeMenu]: newData
      }));
      setIsCreateModalOpen(false);
      setNewItemData({});
      showAlert(`New ${activeMenu.slice(0, -1)} created successfully`);
    } catch (error) {
      showAlert('Failed to create item', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await dashboardService.deleteItem(activeMenu, id);
      setDashboardData(prev => ({
        ...prev,
        [activeMenu]: prev[activeMenu].filter(item => item.id ? item.id !== id : item.eventId !== id)
      }));
      showAlert(`${activeMenu.slice(0, -1)} deleted successfully`);
    } catch (error) {
      showAlert('Failed to delete item', 'error');
    }
  };

  // const handleView = (item) => {
  //   setSelectedItem(item);
  //   setIsViewModalOpen(true);
  // };

  const getStatusBadgeClass = (status) => {
    const statusColors = {
      'Hold': 'warning',
      'Active': 'info',
      'Completed': 'success',
      'default': 'default'
    };
    return statusColors[status] || statusColors.default;
  };

  const renderTableHeaders = () => {
    const headers = {
      events: ['ID', 'Name', 'Description', 'Date', 'Actions'],
      users: ['ID', 'Name', 'Phone No', 'Email', 'Designation', 'Actions'],
      projects: ['ID', 'Name', 'Assigned Users', 'Status', 'Actions']
    };

    return headers[activeMenu].map((header, index) => (
      <th key={index} className="pb-2 font-semibold text-indigo-600">{header}</th>
    ));
  };

  const renderTableRows = () => {
    const data = dashboardData[activeMenu];

    return data.map((item) => (
      <tr key={item.id} className="border-b border-indigo-50 hover:bg-indigo-50/50 transition-colors">
        <td className="border border-gray-200 p-4">{item.id ? item.id : item.eventId}</td>
        <td className="border border-gray-200 p-4">{item.name}</td>
        {activeMenu === 'events' && (
          <>
            <td className="border border-gray-200 p-2">{item.description}</td>
            <td className="border border-gray-200 p-2">{moment(item.createdAt).format('DD-MM-YYYY')}</td>
          </>
        )}
        {activeMenu === 'users' && (
          <>
            <td className="border border-gray-200 p-4">{item.phoneNumber}</td>
            <td className="border border-gray-200 p-4">{item.email}</td>
            <td className="border border-gray-200 p-4">{item.designation}</td>
          </>
        )}
        {activeMenu === 'projects' && (
          <>
            <td className="border border-gray-200">2</td>
            <td className="border border-gray-200 text-center">
              <Alert
                severity={getStatusBadgeClass(item.status)}
                className="text-center flex justify-center items-center"
                style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}
              >
                {item.status}
              </Alert>
            </td>
          </>
        )}
        <td className=" p-4 border border-gray-200 align-items-center">
          <div >
            <Button
              onClick={() => handleView(item)}
              color="primary"
              size="small"
              startIcon={<Eye className="h-4 w-4" />}
              sx={{ padding: '2px 6px', alignItems: 'center', minWidth: 'auto' }}
            />
            {activeMenu === 'users' || activeMenu === 'events' ? <Button
              onClick={() => handleDelete(item.id ? item.id : item.eventId)}
              color="error"
              size="small"
              startIcon={<Trash2 className="h-4 w-4" />}
              sx={{ padding: '2px 6px', minWidth: 'auto' }}
            /> : null}

          </div>
        </td>
      </tr>
    ));
  };

  const renderCreateForm = () => {
    const fields = {
      events: [
        { name: 'name', label: 'Event Name', type: 'text' },
        { name: 'description', label: 'Description', type: 'text' }
      ],
      users: [
        { name: 'name', label: 'User Name', type: 'text' },
        { name: 'phoneNumber', label: 'Phone Number', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'designation', label: 'Designation', type: 'text' },
        { name: 'password', label: 'Password', type: 'text' },
        { name: 'gender', label: 'Gender', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' }

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
  const navItems = [
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'projects', icon: FolderOpen, label: 'Projects' }
  ];

  const handleView = async(item) => {
    const feedback = await dashboardService.getFeedback(item);
    // For events, you might want to fetch additional data like feedbacks
    const mockFeedbacks = [
      { name: 'Naveen', comment: 'This is best' },
      { name: 'Shivam', comment: 'This should be there' }
    ];

    // For users, you might want to fetch their projects
    const mockProjects = ['NutMeg', 'ReciproCup'];

    // Enhance the data based on the type
    const enhancedData = {
      ...item,
      feedbacks: activeMenu === 'events' ? feedback : undefined,
      projects: activeMenu === 'users' ? mockProjects : undefined,
      users: activeMenu === 'projects' ? ['Naveen', 'Shivam'] : undefined
    };

    setSelectedItem(enhancedData);
    setIsViewModalOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${isSidebarExpanded ? 'w-64' : 'w-20'
          } bg-indigo-600 transition-all duration-300 ease-in-out min-h-screen`}
      >
        {/* Dashboard Title */}
        <div className="p-6 flex items-center">
          <button
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className={`text-white flex items-center ${!isSidebarExpanded ? 'mx-auto' : ''}`}
          >
            <Menu className="h-6 w-6" />
            {isSidebarExpanded && (
              <span className="ml-3 text-xl font-bold">Dashboard</span>
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 space-y-2 px-4">

          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveMenu(id)}
              className={`w-full flex items-center p-3 rounded-lg transition-colors duration-100
                ${activeMenu === id ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'}
              `}
            >
              <Icon className="h-5 w-5 min-w-[20px]" />
              {isSidebarExpanded && (
                <span className="ml-3 font-medium">{label}</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm">
          <div className="flex justify-between items-center px-8 py-4">
            <div className="flex items-center">
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
        <main className="pt-20 p-8 h-screen overflow-y-auto">
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
              {isLoading ? (
                <div className="flex justify-center items-center p-2">
                  <CircularProgress />
                </div>
              ) : (
                <table className="w-full ">
                  <thead>
                    <tr className="text-center">
                      {renderTableHeaders()}
                    </tr>
                  </thead>
                  <tbody className=" border-b border-gray-200 text-center">
                    {renderTableRows()}
                  </tbody>
                </table>
              )}
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
      <ViewModal
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        data={selectedItem}
        type={activeMenu.slice(0, -1)} // 'events' -> 'event'
      />
    </div>
  );
};

export default Dashboard;
