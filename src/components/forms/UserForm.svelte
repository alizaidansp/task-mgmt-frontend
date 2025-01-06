<script>
    import { createEventDispatcher,onMount } from 'svelte';
    import { getUsers } from '../../lib/api';
  import LoadingSpinner from '../../components/loaders/loading-spinner.svelte';
    
    export let editingUserId = null;
    export let users = [];
    export let isLoading=false;

    export let user = {
        given_name: '',
        family_name: '',
        email: ''
    };

    const dispatch = createEventDispatcher();

    function handleSubmit() {
        dispatch('submit', user);
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

<div class="p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">
        {editingUserId ? 'Edit User' : 'Create New User'}
    </h2>
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <div>
            <label for="given_name" class="block text-sm font-medium text-gray-700">First Name</label>
            <input 
                type="text" 
                id="given_name" 
                bind:value={user.given_name} 
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
        </div>

        <div>
            <label for="family_name" class="block text-sm font-medium text-gray-700">Surname</label>
            <input 
                type="text" 
                id="family_name" 
                bind:value={user.family_name} 
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
        </div>

        <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input 
                type="email" 
                id="email" 
                bind:value={user.email} 
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
        </div>

        <button 
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
        {#if isLoading}
        <LoadingSpinner />
     {:else}
            {editingUserId ? 'Update User' : 'Create User'}
            {/if}
        </button>
    </form>
</div>
