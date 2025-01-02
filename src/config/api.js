export const API_CONFIG = {
    baseUrl: import.meta.env.VITE_API_BASE_URL,  // Use environment variable
    endpoints: {
        auth: {
            login: 'admin/auth/login',
            info: 'admin/auth/'
        },
        tasks: {
            list: 'admin/task-mgmt/tasks',
            create: 'admin/task-mgmt/create',
            delete: (taskId, assignedTo) => `admin/task-mgmt/tasks/${taskId}/${assignedTo}`,
            update: (taskId, assignedTo) => `admin/task-mgmt/tasks/${taskId}/${assignedTo}`,
            get: (taskId, assignedTo) => `admin/task-mgmt/tasks/${taskId}/${assignedTo}`,
            listMy: (assignedTo) => `admin/task-mgmt/tasks/${assignedTo}`
        },
        user_mgmt: {
            list: 'admin/user-mgmt/users',
            user: (assignedTo) => `admin/user-mgmt/users/${assignedTo}`
        },
        users: {
            createTeamMember: 'admin/user-mgmt/create-team-member'
        }
    }
};
