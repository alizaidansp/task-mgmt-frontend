<script>
  import { page } from "../../lib/store";
  import { roleRoutes } from "../../lib/utils/roleRoutes";
  import { link } from "svelte-spa-router";
  import { user } from '../../lib/store';
 


let menuItems = [];
let userGroupMenuItems, adminMenuItems;

adminMenuItems = [
  {
    id: "task-management",
    label: "Task Management",
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>`,
    path: roleRoutes.Admins.default,
  },
  {
    id: "user-management",
    label: "User Management",
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>`,
    path: roleRoutes.Admins.users,
  },
];

userGroupMenuItems = [
  {
    id: "task-management",
    label: "Task Management",
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>`,
    path: roleRoutes.Admins.default,
  }
];


let userGroup = $user.userGroup;
if(userGroup == "TeamMembers"){
    menuItems = userGroupMenuItems;
}else{
    menuItems = adminMenuItems;
}



</script>

<aside
  class="fixed left-0 top-0 h-screen w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 shadow-lg"
>
  <div class="p-6">
    <div class="flex items-center space-x-3 mb-8">
      <div
        class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"
      >
        <svg
          class="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
      <span class="text-xl font-bold text-gray-800">Taskify :)</span>
    </div>

    <nav class="space-y-1">
      {#each menuItems as item}
        <a
          href={item.path}
          use:link
          class="flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors duration-200
                        {$page === item.id
            ? 'bg-indigo-50 text-indigo-700'
            : 'hover:bg-white/40'}"
        >
          {@html item.icon}
          <span class="ml-3">{item.label}</span>
        </a>
      {/each}
    </nav>
  </div>
</aside>
