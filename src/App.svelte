<script>
    import './app.css';
  

    import Router from 'svelte-spa-router';
    import Login from './pages/Login.svelte';
    import AdminUser from './pages/admin/AdminUser.svelte';
    import AdminDashboard from './pages/admin/AdminDashboard.svelte';
    import UserDashboard from './pages/user/UserDashboard.svelte';
    import {handleRoleRedirect} from './lib/utils/auth';
    import { isAuthenticated } from './lib/store';
    
    const routes = {
        // guest endpoints
        '/': Login,
        '/login': Login,
        

        // Admin endpoints
        '/admin/dashboard': AdminDashboard,
        '/admin/users': AdminUser,

        // User endpoints
        '/user/dashboard': UserDashboard,

       
    };

   

    

   
 


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