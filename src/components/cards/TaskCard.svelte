<script>
    import { createEventDispatcher } from 'svelte';
    import {getUser} from '../../lib/api.js';
  import { user } from "../../lib/store";

    export let task;
    const dispatch = createEventDispatcher();
    
    const statusColors = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'in-progress': 'bg-blue-100 text-blue-800',
        'completed': 'bg-green-100 text-green-800'
    };

    function formatDate(dateString) {
        if (!dateString) return 'No deadline set';
        return new Date(dateString).toLocaleDateString();
    }

    // Fetch actual username from the API
    let assignedToName = '';  // Store the name here

    async function fetchUsername(assignedToId) {
        try {
            if($user.userGroup == "Admins"){

                let user = await getUser(assignedToId); // Assuming getUser fetches the user
            assignedToName = user.name;  // Update the name
            console.log('User fetched:', user);
            }else{
                assignedToName = $user.fullName;  // Update the name

            }
           
        } catch (error) {
            console.error(error);
            assignedToName = 'Error fetching user';  // Fallback on error
        }
    }

    // Call the function to fetch the username when the component is mounted
    import { onMount } from 'svelte';

    onMount(() => {
        fetchUsername(task.assigned_to); // Fetch username when the task is assigned
    });

      // Reactively fetch username whenever task.assigned_to changes
      $: if (task?.assigned_to) {
        fetchUsername(task.assigned_to);
    }
</script>

<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
    <div class="p-6">
        <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">{task.title}</h3>
            <span class={`px-2.5 py-1 text-xs font-medium rounded-full ${statusColors[task.task_status]}`}>
                {task.task_status}
            </span>
        </div>
        
        <p class="text-gray-600 mb-4 line-clamp-2">{task.description}</p>
        
        <div class="space-y-2">
            <div class="flex items-center text-sm text-gray-500">
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <!-- Render the assigned user's name -->
                <span class="truncate">{assignedToName || 'Loading...'}</span>
            </div>
            
            <div class="flex items-center text-sm text-gray-500">
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(task.deadline)}</span>
            </div>
        </div>
    </div>
    
    <div class="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div class="flex space-x-3">
            <button
                on:click={() => dispatch('edit')}
                class="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
            </button>
            

            {#if $user.userGroup == "Admins"}
           
            <button
                on:click={() => dispatch('delete')}
                class="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
            </button>
            {/if}
        </div>
    </div>
</div>
