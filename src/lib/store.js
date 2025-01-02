import { writable } from 'svelte/store';

// Check if there's a user or token stored in localStorage
const storedUser = localStorage.getItem('user');

// Initialize the stores based on what's in localStorage
export const user = writable(storedUser ? JSON.parse(storedUser) : null);
export const isAuthenticated = writable(false); // Authenticated if user or token exists
export const tasks = writable([]);

// Persist user data and token in localStorage when they change
user.subscribe(value => {
    if (value) {
        localStorage.setItem('user', JSON.stringify(value)); // Persist user details
        isAuthenticated.set(true); // Set isAuthenticated to true if user is present
    } else {
        localStorage.removeItem('user'); // Remove user from localStorage
        isAuthenticated.set(false); // Set isAuthenticated to false if no user
    }
});

