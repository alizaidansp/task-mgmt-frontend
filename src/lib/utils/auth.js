import { push } from "svelte-spa-router"; // Default import
import { roleRoutes } from "./roleRoutes";
import { user, isAuthenticated } from "../../lib/store";
import { get } from "svelte/store"; // To get the store value outside the Svelte component

export function handleRoleRedirect(routeName = "default") {
  // Accessing the value of isAuthenticated store
  const authStatus = get(isAuthenticated); // Getting the current value of isAuthenticated
    const user_data=get(user);
  const userGroup = user_data?.userGroup; // Get the user's role from the store
  // First, check if the user is authenticated

  if (!authStatus) {
    // If not authenticated, redirect to the login page
    window.location.href = "/login";
    return; // Stop further execution
  }
  if (!userGroup || userGroup.length === 0) {
    push("/login"); // Redirect to login if no role
    return;
  }

  const role = userGroup[0]; // Assuming a user belongs to one group
  const routes = roleRoutes[role];

  if (routes?.[routeName]) {
    push(routes[routeName]); // Redirect to the specified route
  } else if (routes?.default) {
    push(routes.default); // Fallback to the default route for the role
  } else {
    console.error("No valid route found for role:", role);
    push("/login"); //  Fallback to login
  }
}
