<script>
    import { createEventDispatcher,onMount } from 'svelte';
import { getUser,getUsers } from '../../lib/api';
    
    export let editingTaskId = null;
    export let users = [];
    export let task = {
        title: '',
        description: '',
        assigned_to: '',
        deadline: '',
        task_status: 'pending'
    };

    const dispatch = createEventDispatcher();

    function handleSubmit() {
        dispatch('submit', task);
    }

    onMount(async () => {
    try {
        users = await getUsers();
        console.log('Users fetched:', users);
    } catch (error) {
        console.error('Error while fetching users:', error);
    }
});

    
</script>

<div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">
        {editingTaskId ? 'Edit Task' : 'Create New Task'}
    </h2>
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <div>
            <label for="title" class="block text-sm font-medium text-gray-700 p10">Title</label>
            <input 
                type="text" 
                id="title" 
                bind:value={task.title} 
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            />
        </div>

        <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
                id="description" 
                bind:value={task.description} 
                required
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
        </div>

        <div>
            <label for="assigned_to" class="block text-sm font-medium text-gray-700">Assign To</label>
            <select 
                id="assigned_to" 
                bind:value={task.assigned_to} 
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
                <option value="" disabled>Select User</option>
                {#each users as user}
                    <option value={user.username}>{user.name}</option>
                {/each}
            </select>
        </div>

        <div>
            <label for="deadline" class="block text-sm font-medium text-gray-700">Deadline</label>
            <input 
                type="date" 
                id="deadline" 
                bind:value={task.deadline}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
        </div>

        <div>
            <label for="task_status" class="block text-sm font-medium text-gray-700">Status</label>
            <select 
                id="task_status" 
                bind:value={task.task_status}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
        </div>

        <button 
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {editingTaskId ? 'Update Task' : 'Create Task'}
        </button>
    </form>
</div>