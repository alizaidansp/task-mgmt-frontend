import { API_CONFIG } from "../config/api";
import { logger } from "./utils/logger";
import { user } from "../lib/store"; // Import user store to get the token
import { get } from "svelte/store";

export async function login(email, password, is_admin = false) {
  try {
    const url = is_admin
      ? `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.login}`
      : `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.user_login}`;
    logger.info("Login request to:", { url });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    logger.info("Login response:", {
      status: response.status,
      statusText: response.statusText,
      data,
    });

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    logger.error("Login error:", error);
    throw error;
  }
}




export async function createTask(data) {
  try {
const currentUser = get(user);


    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.tasks.create}`;

    if (!currentUser || !currentUser?.token) {
      alert("No authentication token found");
    }

    const token = currentUser?.token; // Retrieve the token from the user object

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the Bearer token in the header
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    logger.info("Create task response:", {
      status: response.status,
      statusText: response.statusText,
      data: responseData,
    });

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to create task");
    }

    return responseData;
  } catch (error) {
    logger.error("Create task error:", error);
    throw error;
  }
}

export async function listTasks() {
  try {
    const currentUser = get(user);

    const url =
      currentUser.userGroup[0] == "Admins"
        ? `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.tasks.list}`
        : `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.tasks.listMy(
            currentUser.username
          )}`;
    // Check if the token exists
    if (!currentUser || !currentUser?.token) {
      alert("No authentication token found");
    }

    const token = currentUser?.token; // Retrieve the token from the user object
    // alert(url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token in the header
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    logger.info("List tasks response:", {
      status: response.status,
      statusText: response.statusText,
      data,
    });

    if (!response.ok) {
      throw new Error(data.message || "Failed to list tasks");
    }

    return data;
  } catch (error) {
    logger.error("List tasks error:", error);
    throw error;
  }
}

export async function deleteTask(taskId, assignedTo) {
  try {
const currentUser = get(user);

    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.tasks.delete(
      taskId,
      assignedTo
    )}`;
    // Check if the token exists
    if (!currentUser || !currentUser?.token) {
      alert("No authentication token found");
    }

    const token = currentUser?.token; // Retrieve the token from the user object
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token in the header
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    logger.info("Delete task response:", {
      status: response.status,
      statusText: response.statusText,
      data,
    });

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete task");
    }

    return data;
  } catch (error) {
    logger.error("Delete task error:", error);
    throw error;
  }
}

export async function updateTask(taskId, assignedTo, updatedTask) {
  try {
    const currentUser = get(user);


    
    const url = currentUser.userGroup[0] === "Admins"
    ? `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.tasks.update(taskId, assignedTo)}`
    : `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.tasks.updateMy(taskId, assignedTo)}`;
  
    
    // Check if the token exists
    if (!currentUser || !currentUser?.token) {
      alert("No authentication token found");
    }

    const token = currentUser?.token; // Retrieve the token from the user object

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token in the header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask), // Send the updated task data in the body
    });

    const data = await response.json();

    logger.info("Update task response:", {
      status: response.status,
      statusText: response.statusText,
      data,
    });

    if (!response.ok) {
      throw new Error(data.message || "Failed to update task");
    }

    return data;
  } catch (error) {
    logger.error("Update task error:", error);
    throw error;
  }
}

export async function getUser(assignedToId) {
  try {
const currentUser = get(user);

    // Check if the token exists
    if (!currentUser || !currentUser?.token) {
      alert("No authentication token found");
      return null; // Early exit if no token is available
    }

    const token = currentUser?.token; // Retrieve the token from the user object

    // Construct the URL with the assignedToId to get the specific user
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.user_mgmt.user(
      assignedToId
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token in the header
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    logger.info("Get user response:", {
      status: response.status,
      statusText: response.statusText,
      data,
    });

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch user");
    }

    return data; // Return the user object, assuming the API returns a user object
  } catch (error) {
    logger.error("Get user error:", error);
    throw error;
  }
}

export async function getUsers() {
  try {
    const currentUser = get(user);

    // alert(currentUser)

    // Check if the token exists
    if (!currentUser || !currentUser?.token) {
      alert("Aww..No authentication token found");
      return []; // Early exit if no token is available
    }

    const token = currentUser?.token; // Retrieve the token from the user object

    // Correctly format the URL with backticks for string interpolation
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.user_mgmt.list}`;

    // Send the request with the correct headers
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token in the header
        "Content-Type": "application/json",
      },
    });

    // Parse the response data
    const data = await response.json();

    logger.info("Get users response:", {
      status: response.status,
      statusText: response.statusText,
      data,
      token,
    });

    // Check if the response was not successful
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch users");
    }

    return data.users; // Return the users array
  } catch (error) {
    logger.error("Get users error:", error);
    throw error;
  }
}

export async function createUser(userData) {
  try {
const currentUser = get(user);

    const token = currentUser?.token; // Retrieve the token from the user object

    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.user_mgmt.createTeamMember}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create user");
    }
    return data;
  } catch (error) {
    logger.error("Create user error:", error);
    throw error;
  }
}

export async function updateUser(userId, updatedUser) {
  try {
const currentUser = get(user);

    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.user_mgmt.update(
      userId
    )}`;

    if (!currentUser || !currentUser.token) {
      alert("No authentication token found");
      throw new Error("Authentication required");
    }

    const token = currentUser.token;
    // Remove userId from updatedUser if it exists
    if (updatedUser.user_id) {
      delete updatedUser.user_id;
    }
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    console.log("response", response);

    const data = await response.json();

    logger.info("Update user response:", {
      status: response.status,
      statusText: response.statusText,
      data,
    });

    if (!response.ok) {
      throw new Error(data.message || "Failed to update user");
    }

    return data;
  } catch (error) {
    logger.error("Update user error:", error);
    throw error;
  }
}
