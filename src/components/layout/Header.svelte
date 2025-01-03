<script>
    import { user } from '../../lib/store';
    import { push } from 'svelte-spa-router';
    import { clickOutside } from '../../lib/utils/clickOutside';
    
    let showDropdown = false;

    function handleLogout() {
        // Clear user data and redirect to login
        $user = null;
        push('/login');
    }
</script>

<header class="fixed top-0 right-0 left-64 h-16 bg-white/10 backdrop-blur-lg border-b border-white/20 z-10">
    <div class="h-full px-6 flex items-center justify-between">
        <div class="flex-1">
            <input
                type="search"
                placeholder="Search..."
                class="w-64 px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            />
        </div>

        <div class="relative" use:clickOutside={() => showDropdown = false}>
            <button
                on:click={() => showDropdown = !showDropdown}
                class="flex items-center space-x-3 focus:outline-none"
            >
                <span class="text-sm font-medium text-gray-700">{$user?.name || 'User'}</span>
                <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
            </button>

            {#if showDropdown}
                <div class="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg py-1 border border-gray-100">
                    <a
                        href="/settings"
                        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                    </a>
                    <button
                        on:click={handleLogout}
                        class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            {/if}
        </div>
    </div>
</header>