<script lang="ts">
    import achievementsIcon from "$lib/assets/icons/icons8-trophy-64.png";
    import historyIcon from "$lib/assets/icons/activity-history.png";
    import roadmapIcon from "$lib/assets/icons/icons8-checkmark-48.png";
    import settingsIcon from "$lib/assets/icons/icons8-settings-48.png";
    import logoutIcon from "$lib/assets/icons/icons8-logout-48.png";

    const sidebarItems: Array<{ section: string; label: string; path: string, icon: string }> = [
        {
            section: "Roadmap",
            label: "Roadmap",
            icon: roadmapIcon,
            path: "/app/roadmap"
        },
        {
            section: "History",
            label: "History",
            path: "/app/history",
            icon: historyIcon,
        },
        {
            section: "Achievements",
            label: "Achievements",
            path: "/app/achievements",
            icon: achievementsIcon,
        },
        {
            section: "Settings",
            label: "Settings",
            path: "/app/settings",
            icon: settingsIcon,
        },
        {
            section: "Account",
            label: "Logout",
            path: "/app/logout",
            icon: logoutIcon,
        }
    ];

    
    
</script>

<!-- Desktop Sidebar -->
<aside
        id="sidebar"
        aria-label="Sidebar"
        class="min-w-3xs hidden md:block"
>
    <div class="h-full w-full flex flex-col pl-5 pt-10 gap-10 overflow-y-auto overflow-x-hidden bg-white">
        {#each sidebarItems as item (item.path)}
            <div class="flex items-center pl-5 gap-2">
                <img src={item.icon} alt="icon" class="w-10 h-10"/>
                <a
                    href={item.path}
                    class="flex items-center h-10 text-md text-slate-700 transition-colors hover:text-slate-900"
                >
                    <span class="text-xl">{item.label}</span>
                </a>
            </div>
        {/each}
    </div>
</aside>

<!-- Mobile Bottom Navigation -->
<nav 
    class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
    aria-label="Bottom Navigation"
>
    <div class="flex justify-around items-center py-2 px-4 max-w-screen-sm mx-auto">
        {#each sidebarItems as item (item.path)}
            <a
                href={item.path}
                class="flex flex-col items-center justify-center p-2 min-w-0 transition-all duration-200 hover:bg-gray-50 rounded-lg active:scale-95"
            >
                <div class="w-8 h-8 mb-1 flex items-center justify-center">
                    <img 
                        src={item.icon} 
                        alt="{item.label} icon" 
                        class="w-6 h-6 transition-transform duration-200"
                    />
                </div>
                <span class="text-xs text-slate-600 font-medium truncate w-full text-center">
                    {item.label}
                </span>
            </a>
        {/each}
    </div>
</nav>