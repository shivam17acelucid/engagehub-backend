// import React, { useState } from "react";
// import Modal from "react-modal"; // Importing the modal package
// import ForgotPassword from "./forgetPass";

// // Make sure to bind modal to app element for accessibility
// Modal.setAppElement("#root");

// const Login = () => {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

//   const [email, setEmail] = useState(""); // State for email in forgot password modal
//   const [message, setMessage] = useState(""); // State for success/error message in the modal
//   const [showForgotPassword, setShowForgotPassword] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.username || !formData.password) {
//       setError("Username and Password are required!");
//       return;
//     }

//     if (formData.username !== "admin" || formData.password !== "password") {
//       setError("Incorrect username or password");
//     } else {
//       setError("");
//       alert("Login successful!");
//     }
//   };

//   const handleForgotPasswordClick = () => {
//     setShowForgotPassword(true);
//   };

//   const handleForgotPasswordSubmit = (e) => {
//     e.preventDefault();
//     if (!email) {
//       setMessage("Please enter your email address.");
//       return;
//     }
//     // Simulate sending the reset email
//     setMessage("If this email is associated with an account, a reset link has been sent.");
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden lg:flex">
//         {/* Left Side - Form */}
//         <div className="lg:w-1/2 p-8">
//           <h2 className="text-2xl font-bold mb-4">Sign in</h2>

//           {/* Error Message */}
//           {error && (
//             <p className="text-red-500 text-sm mb-4 opacity-0 animate-fade-in">
//               * {error}
//             </p>
//           )}

//           <form onSubmit={handleSubmit}>
//             {/* Username Input */}
//             <div className="mb-4">
//               <label className="block text-gray-700">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition-all"
//               />
//             </div>

//             {/* Password Input */}
//             <div className="mb-4">
//               <label className="block text-gray-700">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition-all"
//               />
//             </div>

//             <div className="mb-4 flex items-center">
//               <input type="checkbox" className="mr-2" id="remember" />
//               <label htmlFor="remember" className="text-sm text-gray-600">
//                 Remember my username
//               </label>
//             </div>

//             <div className="mb-4 flex items-center">
//               <input type="checkbox" className="mr-2" id="terms" />
//               <label htmlFor="terms" className="text-sm text-gray-600">
//                 I agree to the terms and privacy policy
//               </label>
//             </div>

//             {/* Forgot Password Link */}
//             <div className="text-right mb-4">
//               <button
//                 type="button"
//                 onClick={handleForgotPasswordClick}
//                 className="text-sm text-blue-500 hover:underline"
//               >
//                 Forgot your password?
//               </button>
//             </div>
//             {showForgotPassword && <ForgotPassword />}
//             <button
//               type="submit"
//               className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 active:scale-95 focus:outline-none focus:ring focus:ring-red-300 transition-transform"
//             >
//               Sign In
//             </button>
//           </form>
//         </div>

//         {/* Right Side - Branding */}
//         <div className="hidden lg:block lg:w-1/2 bg-gradient-to-r from-pink-500 to-red-500 text-white p-8">
//           <h2 className="text-4xl font-bold mb-4">Rahul Shetty Academy</h2>
//           <p className="text-sm mb-8">
//             An Academy to Learn Earn & Shine in your QA Career
//           </p>
//           <button className="bg-white text-pink-500 px-4 py-2 rounded-lg hover:bg-gray-200">
//             Visit Us
//           </button>
//         </div>
//       </div>

//       {/* Forgot Password Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={() => setIsModalOpen(false)} // Close modal
//         contentLabel="Forgot Password"
//         className="bg-white w-full max-w-md mx-auto p-8 rounded-lg shadow-lg"
//       >
//         <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

//         {message && <p className="text-sm text-blue-500 mb-4">{message}</p>}

//         <form onSubmit={handleForgotPasswordSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email Address</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition-all"
//               placeholder="Enter your email"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 active:scale-95 focus:outline-none focus:ring focus:ring-blue-300 transition-transform"
//           >
//             Send Reset Link
//           </button>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { Menu, X, Eye, Trash2, LogOut, Plus } from 'lucide-react';

// Sample data
const initialProjects = [
  { id: 1, name: 'Nutmeg', assignedUsers: 3, status: 'Hold' },
  { id: 2, name: 'CK Tools', assignedUsers: 7, status: 'Completed' }
];

const initialUsers = [
  { id: 1, name: 'Shivam', phone: '12345678', projectsCount: 1, status: 'Active' }
];

const initialEvents = [
  { id: 1, name: 'Diwali Celebration', description: 'Test' }
];

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeView, setActiveView] = useState('projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState(initialProjects);
  const [users, setUsers] = useState(initialUsers);
  const [events, setEvents] = useState(initialEvents);

  const renderProjects = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Projects List</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} /> Create
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Assigned Users</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id} className="border-b">
              <td className="border p-2">{project.id}</td>
              <td className="border p-2">{project.name}</td>
              <td className="border p-2">{project.assignedUsers}</td>
              <td className="border p-2">{project.status}</td>
              <td className="border p-2">
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye size={20} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderUsers = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User List</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} /> Create
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Phone No</th>
            <th className="border p-2 text-left">Projects Count</th>
            <th className="border p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.phone}</td>
              <td className="border p-2">{user.projectsCount}</td>
              <td className="border p-2">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderEvents = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Event List</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} /> Create
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Description</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id} className="border-b">
              <td className="border p-2">{event.id}</td>
              <td className="border p-2">{event.name}</td>
              <td className="border p-2">{event.description}</td>
              <td className="border p-2">
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye size={20} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-48 bg-white shadow-lg">
        <div className="p-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full mb-4"></div>
        </div>
        <nav className="space-y-1">
          <button
            onClick={() => setActiveView('events')}
            className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 ${
              activeView === 'events' ? 'bg-gray-100' : ''
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveView('users')}
            className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 ${
              activeView === 'users' ? 'bg-gray-100' : ''
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveView('projects')}
            className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 ${
              activeView === 'projects' ? 'bg-gray-100' : ''
            }`}
          >
            Projects
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="flex justify-end p-4">
            <button className="text-gray-600 hover:text-gray-800">
              <LogOut size={24} />
            </button>
          </div>
        </header>
        
        <main className="p-6">
          {activeView === 'projects' && renderProjects()}
          {activeView === 'users' && renderUsers()}
          {activeView === 'events' && renderEvents()}
        </main>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Create ${activeView.slice(0, -1)}`}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {activeView === 'users' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}
          {activeView === 'events' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;
