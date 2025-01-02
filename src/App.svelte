<script>
    import './app.css';

    import Router from 'svelte-spa-router';
    import Login from './pages/Login.svelte';
    import Dashboard from './pages/Dashboard.svelte';
    import { isAuthenticated } from './lib/store';

    const routes = {
        '/': Login,
        '/login': Login,
        '/dashboard': Dashboard,
    };

    function conditionsFailed() {
        if (!$isAuthenticated) {
            return '/login';
        }
    }
</script>

<main>
    <Router 
        {routes} 
        conditions={[() => conditionsFailed()]}
    />
</main>

<style>
    main {
        width: 100%;
        min-height: 100vh;
    }
</style>