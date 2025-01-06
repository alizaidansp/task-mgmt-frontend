<script>
    import { onMount } from 'svelte';
    import {page, tasks,user,isAuthenticated } from '../../lib/store';
    import { listTasks, createTask, updateTask, deleteTask } from '../../lib/api';
    import TaskForm from '../../components/forms/TaskForm.svelte';
    import TaskCard from '../../components/cards/TaskCard.svelte';
    import Sidebar from '../../components/layout/Sidebar.svelte';
    import Header from '../../components/layout/Header.svelte';
    import { handleRoleRedirect } from '../../lib/utils/auth';
	import InfoToast from '../../components/toasts/InfoToast.svelte';


    let users = [];
    let isLoading=false;
    let editingTaskId = null;
    let assignedTo = null;
    let statusMessage = '';
    let currentTask = {
        title: '',
        description: '',
        assigned_to: '',
        deadline: '',
        task_status: 'pending'
    };


    onMount(async () => {
    try {
     


        // Now, handle the role-based redirect
        handleRoleRedirect('default'); // Assuming 'admin' is the required role for this component
        page.set('task-management'); // Update the page store


        const taskList = await listTasks();
        $tasks = taskList;
        // Fetch users here
    } catch (error) {
        console.error('Failed to load tasks:', error);
    }
});

async function handleTaskSubmit(event) {
    try {
        isLoading=true;
        const taskData = event.detail;
        if (editingTaskId && assignedTo) {
            // console.log("currentTask")
            // alert(JSON.stringify(currentTask),)
            // Handle update
            // alert(currentTask.assigned_to)
            await updateTask(currentTask.task_id,assignedTo,currentTask)
        } else {
            // alert(JSON.stringify(taskData))
            await createTask(taskData);
        }
        const updatedTasks = await listTasks();
        $tasks = updatedTasks;
        statusMessage = 'Task successfully saved!';
        setTimeout(() => (statusMessage = ''), 3000);
        resetForm();
    } catch (error) {
        console.error('Failed to save task:', error);
        statusMessage = 'Failed to save task!. Please try again.';
        setTimeout(() => (statusMessage = ''), 3000);
    }finally{
        isLoading=false;
    }
}

async function handleDeleteTask(taskId, assignedTo) {
    try {
        await deleteTask(taskId, assignedTo);
        const updatedTasks = await listTasks();
        $tasks = updatedTasks;
    } catch (error) {
        console.error('Failed to delete task:', error);
    }
}

function handleEditTask(task) {
    editingTaskId = task.task_id;
    assignedTo = task.assigned_to;
    // instead of
     // Manually copy properties of the task to create a new object
// currentTask = {
//     title: task.title,
//     description: task.description,
//     assigned_to: task.assigned_to,
//     deadline: task.deadline,
//     task_status: task.task_status,
//     // Copy any additional properties explicitly
// };

// spread operator makes it better
    currentTask = { ...task };
}

function resetForm() {
    editingTaskId = null;
    assignedTo=null;
    currentTask = {
        title: '',
        description: '',
        assigned_to: '',
        deadline: '',
        task_status: 'pending'
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
                    <h1 class="text-3xl font-bold text-gray-900">Task Management</h1>
                  
                </div>

               <InfoToast
               statusMessage={statusMessage}  />      

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="lg:col-span-1">
                        <div class="bg-white/30 backdrop-blur-lg rounded-lg shadow-lg border border-white/20">
                            <TaskForm 
                                {editingTaskId}
                                {users}
                                task={currentTask}
                                isLoading={isLoading}
                                on:submit={handleTaskSubmit}
                            />
                        </div>
                    </div>
                    
                    <div class="lg:col-span-2">
                        <div class="space-y-6">
                            {#if $tasks.length === 0}
                                <div class="text-center py-12 bg-white/30 backdrop-blur-lg rounded-lg shadow-lg border border-white/20">
                                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <p class="mt-2 text-sm text-gray-500">No tasks found</p>
                                </div>
                            {:else}
                                {#each $tasks as task}
                                    <TaskCard 
                                        {task}
                                        on:edit={() => handleEditTask(task)}
                                        on:delete={() => handleDeleteTask(task.task_id, task.assigned_to)}
                                    />
                                {/each}
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>