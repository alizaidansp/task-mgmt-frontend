<script>
    export let users = [];
    export let handleEditUser;
</script>

<div class="lg:col-span-2">
    <div class="bg-white/30 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 overflow-hidden">
        <div class="p-6 overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    {#if users.length === 0}
                        <tr>
                            <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">
                                No users found
                            </td>
                        </tr>
                    {:else}
                        {#each users as user}
                            <tr class="hover:bg-white/20 transition-colors duration-200">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-capitalize">
                                    {user.given_name} {user.family_name}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                               
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        class="text-indigo-600 hover:text-indigo-900 mr-3"
                                        on:click={() => handleEditUser(user)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>
    </div>
</div>
