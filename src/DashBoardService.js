// src/services/api/config.js
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000',
  ENDPOINTS: {
    events: '/event', // Using posts as fake events
    users: '/user',
    projects: '/project', // Using todos as fake projects
    feedback: '/feedback'
  }
};

// src/services/api/httpClient.js
class HttpClient {
  constructor(baseURL = API_CONFIG.BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // For DELETE requests, some APIs might return empty response
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error(`API Request Failed: ${error.message}`);
      throw error;
    }
  }

  async get(endpoint) {
    return this.request(endpoint);
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

export const httpClient = new HttpClient();

// src/services/api/dashboardService.js
// import { API_CONFIG } from './config';
// import { httpClient } from './httpClient';

class DashboardService {
  // Events API
  async getEvents() {
    try {
      const response = await httpClient.get(API_CONFIG.ENDPOINTS.events + '/list');
      // Transform the posts data to match our events structure
      return response.data;
    } catch (error) {
      console.error('Failed to fetch events:', error);
      throw error;
    }
  }

  getEvent = async (eventId) => {
    try {
      const response = await HttpClient.get(`${API_CONFIG.ENDPOINTS.feedback}/details?eventId=${eventId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch event');
    }
  };

  async createEvent(eventData) {
    try {
      eventData.createdBy = "Shivani"
      const response = await httpClient.post(API_CONFIG.ENDPOINTS.events + '/create', eventData);
      return {
        id: response.eventId,
        name: eventData.name,
        description: eventData.description,
        date: response.createdAt,
      };
    } catch (error) {
      console.error('Failed to create event:', error);
      throw error;
    }
  }

  // Users API
  async getUsers() {
    try {
      const response = await httpClient.get(API_CONFIG.ENDPOINTS.users + '/list');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const response = await httpClient.post(API_CONFIG.ENDPOINTS.users + '/create', userData);
      return {
        id: response.id,
        name: userData.name,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
        designation: userData.designation,
      };
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  }

  // Projects API
  async getProjects() {
    try {
      const response = await httpClient.get(API_CONFIG.ENDPOINTS.projects + '/list');
      const statuses = ['Hold', 'Active', 'Completed'];
      return response.data;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  }

  async createProject(projectData) {
    try {
      const response = await httpClient.post(API_CONFIG.ENDPOINTS.projects + '/create', projectData);
      return {
        id: response.id,
        name: projectData.name,
        assignedUsers: projectData.assignedUsers,
        status: projectData.status,
      };
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  }

  // Generic CRUD operations
  async createItem(type, data) {
    switch (type) {
      case 'events':
        return this.createEvent(data);
      case 'users':
        return this.createUser(data);
      case 'projects':
        return this.createProject(data);
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  }

  async deleteItem(type, id) {
    try {
      let endpoints = type === 'events' ? '/delete?eventId=' : '/delete?id='
      const endpoint = `${API_CONFIG.ENDPOINTS[type] + endpoints + `${id}`}`;
      await httpClient.put(endpoint);
      return true;
    } catch (error) {
      console.error(`Failed to delete ${type} item:`, error);
      throw error;
    }
  }


  submitFeedback = async (eventId, feedbackData) => {
    try {
      const response = await HttpClient.post(
        `${API_CONFIG.ENDPOINTS.events}/events/${eventId}/feedback`,
        feedbackData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit feedback');
    }
  };

  // Optional: Get existing feedback for an event
  getFeedback = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/feedback/details?eventId=${data.eventId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => response.json())
        .catch(error => {
          console.error('Error fetching feedback:', error);
        });
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch feedback');
    }
  }

  // Utility methods
  generateRandomDate() {
    const start = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + 6); // Random date within next 6 months
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
      .toISOString()
      .split('T')[0];
  }
}

export const dashboardService = new DashboardService();