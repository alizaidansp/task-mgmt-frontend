<script>
    import { login } from '../lib/api';
    import { user, isAuthenticated } from '../lib/store';
    import { push } from 'svelte-spa-router';
    import { logger } from '../lib/utils/logger';

    let email = '';
    let password = '';
    let error = '';

 async function handleLogin() {
    try {
        logger.info('Attempting login with email:', { email });
        
        // Make the login request
        const response = await login(email, password);

        // Update the `user` store with user details
        user.set({
            token: response.access_token,
            username: response.user.username,
            email: response.user.email,
            fullName: `${response.user.given_name} ${response.user.family_name}`,
            userGroup: response.user.user_group
        });

        // Update the authentication status
        isAuthenticated.set(true);

        // Persist the token in localStorage
        // localStorage.setItem('token', response.access_token);

        // Navigate to the dashboard
        push('/dashboard');
    } catch (err) {
        logger.error('Login failed:', err);
        error = 'Login failed. Please try again.';
    }
}

</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
            </h2>
        </div>
        
        {#if error}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">{error}</span>
            </div>
        {/if}
        
        <form class="mt-8 space-y-6" on:submit|preventDefault={handleLogin}>
            <div class="rounded-md shadow-sm space-y-4">
                <div>
                    <label for="email" class="sr-only">Email address</label>
                    <input 
                        id="email" 
                        name="email" 
                        type="email" 
                        required 
                        bind:value={email}
                        class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        required 
                        bind:value={password}
                        class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                </div>
            </div>

            <div>
                <button 
                    type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                    Sign in
                </button>
            </div>
        </form>
    </div>
</div>