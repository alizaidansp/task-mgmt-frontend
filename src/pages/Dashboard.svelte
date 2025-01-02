<script>
    import { onMount } from 'svelte';
    import { tasks } from '../lib/store';
    import { listTasks, createTask,updateTask, deleteTask } from '../lib/api';
    import TaskForm from '../components/forms/TaskForm.svelte';
    import TaskCard from '../components/cards/TaskCard.svelte';

    let users = [];
    let editingTaskId = null;
    let assignedTo=null;
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
            const taskList = await listTasks();
            $tasks = taskList;
            // Fetch users here
        } catch (error) {
            console.error('Failed to load tasks:', error);
        }
    });

    async function handleTaskSubmit(event) {
        try {
            const taskData = event.detail;
            if (editingTaskId && assignedTo) {
                console.log("currentTask")
                // alert(JSON.stringify(currentTask),)
                // Handle update
                await updateTask(currentTask.task_id,assignedTo,currentTask)
            } else {
                // alert(JSON.stringify(taskData))
                await createTask(taskData);
            }
            const updatedTasks = await listTasks();
            $tasks = updatedTasks;
            resetForm();
        } catch (error) {
            console.error('Failed to save task:', error);
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

<div class="min-h-screen bg-gray-100">
    <div class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Task Management</h1>
                <div class="flex items-center space-x-4">
                    <span class="relative inline-flex">
                        <button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            New Task
                        </button>
                    </span>
                </div>
            </div>

            {#if statusMessage}
                <div class="mt-4 p-4 rounded-md bg-green-50 border border-green-400">
                    <p class="text-green-700">{statusMessage}</p>
                </div>
            {/if}

            <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div class="lg:col-span-1">
                    <TaskForm 
                        {editingTaskId}
                        {users}
                        task={currentTask}
                        on:submit={handleTaskSubmit}
                    />
                </div>
                
                <div class="lg:col-span-2">
                    <div class="space-y-6">
                        {#if $tasks.length === 0}
                            <div class="text-center py-12 bg-white rounded-lg shadow">
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
</div>