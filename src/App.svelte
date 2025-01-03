<script>
    import './app.css';
    import {onMount} from 'svelte';

    import Router from 'svelte-spa-router';
    import Login from './pages/Login.svelte';
    import AdminUser from './pages/admin/AdminUser.svelte';
    import AdminDashboard from './pages/admin/AdminDashboard.svelte';
    
    import { isAuthenticated } from './lib/store';
    
    
    const routes = {
        // guest endpoints
        '/': Login,
        '/login': Login,

        // Admin endpoints
        '/admin/dashboard': AdminDashboard,
        '/admin/users': AdminUser,

       
    };

    
    function conditionsFailed() {
    // Redirect unauthenticated users to login page
    // if (!$isAuthenticated) {
    //     return '/login';
    // }
   
    //     // Check if the user is authenticated

    
    // // Prevent authenticated users from accessing the login page
    // if ($isAuthenticated && window.location.pathname === '/login') {
    //     // Get the referrer (the page the user came from)
    //     const referrer = document.referrer;
        
    //     // If there's a referrer, redirect to it, else go to the dashboard
    //     if (referrer) {
    //         return referrer; // Redirect to the page they came from
    //     } else {
    //         return '/'; // If no referrer, redirect to the dashboard
    //     }
    // }
}

// onMount( () => {  
//         conditionsFailed()

//      })

</script>

<main>
    <Router 
        {routes} 
       
    />
</main>

<style>
    main {
        width: 100%;
        min-height: 100vh;
    }
</style>