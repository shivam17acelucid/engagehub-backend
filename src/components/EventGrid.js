import React, { useState, useEffect } from 'react';
import moment from 'moment';

const EventGridWithIPValidation = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [ipAddress, setIpAddress] = useState('');
    const [alreadySubmitted, setAlreadySubmitted] = useState(false);

    // Fetch dummy events
    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch('http://localhost:3000/event/list');
            const data = await response.json();
            setEvents(data.data);
        };

        fetchEvents();
    }, []);

    // Fetch user's IP address
    useEffect(() => {
        const fetchIPAddress = async () => {
            try {
                const response = await fetch('https://api64.ipify.org?format=json'); // Dummy IP fetching API
                const data = await response.json();
                setIpAddress(data.ip);

                // Check if a comment has already been submitted for this IP for the selected event
                const submittedComments = JSON.parse(localStorage.getItem('submittedComments') || '{}');
                setAlreadySubmitted(submittedComments[data.ip]?.includes(selectedEvent?.id));
            } catch (error) {
                console.error('Error fetching IP address:', error);
            }
        };

        fetchIPAddress();
    }, [selectedEvent]);

    const handleSubmit = async () => {
        if (!comment.trim()) return;

        try {
            const submittedComments = JSON.parse(localStorage.getItem('submittedComments') || '{}');

            // Prevent duplicate submissions from the same IP for the same event
            if (submittedComments[ipAddress]?.includes(selectedEvent.id)) {
                alert('You have already submitted a comment for this event!');
                return;
            }

            // Simulate API submission
            await fetch('http://localhost:3000/feedback/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventId: selectedEvent.eventId,
                    createdBy: 'Naveen',
                    feedback: comment
                }),
            });

            // Save submission info to localStorage, associating the IP and event ID
            if (!submittedComments[ipAddress]) {
                submittedComments[ipAddress] = [];
            }
            submittedComments[ipAddress].push(selectedEvent.id);
            localStorage.setItem('submittedComments', JSON.stringify(submittedComments));

            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
            setComment('');
            setAlreadySubmitted(true);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleBackToGrid = () => {
        setSelectedEvent(null); // Go back to the grid view
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Side Navigation */}
            <aside className="w-55 bg-indigo-600 text-white p-6">
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-indigo-700 rounded">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-indigo-700 rounded">
                                Events
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-indigo-700 rounded">
                                Settings
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
                {/* Top Header */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-gray-700">Event Management</h1>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                        Logout
                    </button>
                </header>

                {/* Event Grid or Comment Section */}
                <main className="p-8">
                    {!selectedEvent ? (
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Events</h2>
                            <div className="overflow-x-auto shadow rounded-lg">
                                <table className="w-full bg-white border border-gray-200 rounded-lg">
                                    <thead className="bg-indigo-600 text-white">
                                        <tr>
                                            <th className="border border-gray-200 p-4 px-4 py-2 text-left font-medium">ID</th>
                                            <th className="border border-gray-200 p-4 px-4 py-2 text-left font-medium">Name</th>
                                            <th className="border border-gray-200 p-4 px-4 py-2 text-left font-medium">Description</th>
                                            <th className="border border-gray-200 p-4 px-4 py-2 text-left font-medium">Date</th>
                                            <th className="border border-gray-200 p-4 px-4 py-2 text-left font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {events.map((event) => (
                                            <tr key={event.id} className="hover:bg-indigo-50">
                                                <td className="border border-gray-200 p-4 px-4 py-1 text-sm">{event.eventId}</td>
                                                <td className="border border-gray-200 p-4 px-4 py-1 text-sm">{event.name}</td>
                                                <td className="border border-gray-200 p-4 px-4 py-1 text-sm">{event.description}</td>
                                                <td className="border border-gray-200 p-4 px-4 py-1 text-sm">{moment(event.createdAt).format('DD-MM-YYYY')}</td>
                                                <td className="border border-gray-200 p-4 px-4 py-1 text-sm">
                                                    <button
                                                        className="text-indigo-600 hover:underline"
                                                        onClick={() => setSelectedEvent(event)}
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Details</h2>
                            <div className="bg-white shadow rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-700">{selectedEvent.title}</h3>
                                <p className="text-gray-600 mt-4">{selectedEvent.body}</p>

                                {/* Comment Form */}
                                <div className="mt-6">
                                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Submit a Comment</h4>
                                    <textarea
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        rows="4"
                                        placeholder="Enter your comment..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        disabled={alreadySubmitted}
                                    ></textarea>
                                    <button
                                        className={`mt-4 px-6 py-2 rounded transition ${alreadySubmitted ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                                        onClick={handleSubmit}
                                        disabled={alreadySubmitted}
                                    >
                                        {alreadySubmitted ? 'Already Submitted' : 'Submit'}
                                    </button>
                                </div>

                                {/* Back to Grid Button */}
                                <button
                                    className="mt-4 px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                                    onClick={handleBackToGrid}
                                >Back to Events
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default EventGridWithIPValidation;
