// lib/utils/roleRoutes.js

export const roleRoutes = {
    Admins: {
        default: '/admin/dashboard', // Default route for Admins
        profile: '/admin/profile',
        settings: '/admin/settings',
        tasks: '/admin/tasks',
        users:'/admin/users',
    },
    TeamMembers: {
        default: '/user/dashboard', // Default route for Users
        profile: '/user/profile',
        settings: '/user/settings',
        tasks: '/user/tasks',
    },
    Guests: {
        login: '/login', // Default route for Guests
        register: '/register',
    },
};
