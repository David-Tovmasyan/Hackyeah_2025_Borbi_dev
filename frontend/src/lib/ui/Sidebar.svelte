<script lang="ts">

    const sidebarItems: Array<{ section: string; label: string; path: string }> = [
        {
            section: "Roadmap",
            label: "Roadmap",
            path: "/app/roadmap"
        },
        {
            section: "History",
            label: "History",
            path: "/app/history"
        },
        {
            section: "Achievements",
            label: "Achievements",
            path: "/app/achievements"
        },
        {
            section: "Settings",
            label: "Settings",
            path: "/app/settings"
        },
        {
            section: "Account",
            label: "Logout",
            path: "/app/logout"
        }
    ];

</script>

<aside
        id="sidebar"
                aria-label="Sidebar"
>
    <div class="h-full flex flex-col px-2 overflow-y-auto overflow-x-hidden bg-white">

        <!-- Items section -->
        <div>
            {#each sidebarItems as item (item.path)}
                <a
                        href={item.path}
                        class="flex items-center h-10 mb-2 gap-2 text-md text-slate-700 transition-colors hover:text-slate-900"
                >
                    {item.label}
                </a>
            {/each}
        </div>
    </div>
</aside>