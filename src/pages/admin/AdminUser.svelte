<script>
    import { onMount } from 'svelte';
    import { users, page } from '../../lib/store';
    import { getUsers, createUser,updateUser } from '../../lib/api';
    import UserForm from '../../components/forms/UserForm.svelte';
    import UserCard from '../../components/cards/UserCard.svelte';
    import Sidebar from '../../components/layout/Sidebar.svelte';
    import Header from '../../components/layout/Header.svelte';
    import { handleRoleRedirect } from '../../lib/utils/auth';

    let editingUserId = null;
    let statusMessage = '';
    let currentUser = {
        family_name: '',
        given_name: '',
        email: '',
      
    };

    onMount(async () => {
        try {
            handleRoleRedirect('users');
            page.set('user-management');
            const userList = await getUsers();
            $users = userList;
        } catch (error) {
            console.error('Failed to load users:', error);
        }
    });

    function handleEditUser(user) {
        // alert(JSON.stringify(user))
        editingUserId = user.user_id;
        currentUser = { ...user };
    }

    async function handleUserSubmit(event) {
        try {
            const userData = event.detail;
            if (editingUserId) {
                // Handle user update logic
                await updateUser(editingUserId,userData);
            } else {

                await createUser(userData);
            }
            const updatedUsers = await getUsers();
            $users = updatedUsers;
            resetForm();
            statusMessage = 'User successfully saved!';
            setTimeout(() => (statusMessage = ''), 3000);
        } catch (error) {
            console.error('Failed to save user:', error);
            statusMessage = 'Failed to save user. Please try again.';
        }
    }

    function resetForm() {
        editingUserId = null;
        currentUser = {
        family_name: '',
        given_name: '',
        email: '',
      
    };
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <Sidebar />
    <Header />
    
    <main class="ml-64 pt-16 min-h-screen">
        <div class="p-6">
            <div class="max-w-7xl mx-auto">
                <div class="flex justify-between items-center mb-8">
                    <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
                </div>

                {#if statusMessage}
                    <div class="mb-6 p-4 rounded-lg bg-green-50/50 backdrop-blur-sm border border-green-200">
                        <p class="text-green-700">{statusMessage}</p>
                    </div>
                {/if}

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="lg:col-span-1">
                        <div class="bg-white/30 backdrop-blur-lg rounded-lg shadow-lg border border-white/20">
                            <UserForm 
                                {editingUserId}
                                user={currentUser}
                                on:submit={handleUserSubmit}
                            />
                        </div>
                    </div>
                    
                    <!-- Passing users and handleEditUser to UserCard -->
                    <UserCard 
                        users={$users}
                        handleEditUser={handleEditUser}
                    />
                </div>
            </div>
        </div>
    </main>
</div>
