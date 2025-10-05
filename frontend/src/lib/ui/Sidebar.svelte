<script lang="ts">
    import { page } from '$app/stores';
    
    type SidebarItem = {
        label: string;
        path: string;
        icon: string;
        color?: string;
    };

    const sidebarItems: SidebarItem[] = [
        {
            label: "Path",
            icon: "path",
            path: "/app",
            color: "#3b82f6"
        },
        {
            label: "Progress",
            path: "/app/history",
            icon: "chart",
            color: "#8b5cf6"
        },
        {
            label: "Achievements",
            path: "/app/achievements",
            icon: "trophy",
            color: "#f59e0b"
        },
        {
            label: "Settings",
            path: "/app/settings",
            icon: "settings",
            color: "#6b7280"
        },
        {
            label: "Logout",
            path: "/app/logout",
            icon: "logout",
            color: "#ef4444"
        }
    ];

    function getIcon(iconName: string) {
        const icons: Record<string, string> = {
            path: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />',
            chart: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />',
            trophy: '<path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />',
            settings: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />',
            logout: '<path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />'
        };
        return icons[iconName] || icons.path;
    }

    $: currentPath = $page.url.pathname;

    
    
</script>

<!-- Desktop Sidebar -->
<aside id="sidebar" class="hidden md:block w-[300px] h-screen sticky top-0 overflow-y-auto overflow-x-hidden
                          dark:bg-gradient-to-b dark:from-stone-900 dark:to-[#0f0e0d] dark:border-stone-600
                          light:bg-gradient-to-b light:from-[#D4EAF7] light:to-[#B5E3FF] light:border-[#A7D8F0]
                          border-r-[6px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent 
                          [&::-webkit-scrollbar-thumb]:dark:bg-stone-400/20 [&::-webkit-scrollbar-thumb]:light:bg-[#7EC8E3]/30 
                          [&::-webkit-scrollbar-thumb]:rounded-lg">
    <div class="flex flex-col py-8 h-full">
        <!-- Navigation Items -->
        <nav class="flex flex-col gap-3 px-4">
            {#each sidebarItems as item (item.path)}
                <a 
                    href={item.path} 
                    class="group relative flex items-center gap-4 px-5 py-4 rounded-2xl no-underline transition-all duration-200 overflow-hidden 
                           {currentPath === item.path 
                               ? 'dark:bg-stone-700/70 dark:text-stone-50 light:bg-[#A7D8F0]/90 light:text-slate-900 border-[4px] dark:border-stone-500 light:border-[#7EC8E3]' 
                               : 'dark:text-stone-400 light:text-slate-800 border-[4px] border-transparent'}
                           dark:hover:bg-stone-700/50 dark:hover:text-stone-50 
                           light:hover:bg-[#B5E3FF]/80 light:hover:text-slate-900
                           hover:translate-x-1 active:translate-x-1 active:scale-[0.98]
                           focus:outline-none focus:ring-[6px] focus:ring-[#7EC8E3]" 
                    style="--item-color: {item.color}"
                >
                    <div class="w-8 h-8 flex-shrink-0 transition-all duration-200 group-hover:scale-110" style="color: var(--item-color, #7EC8E3);">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-full h-full">
                            {@html getIcon(item.icon)}
                        </svg>
                    </div>
                    <span class="font-['Lato'] text-lg font-bold tracking-tight">{item.label}</span>
                    <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-1 h-[70%] rounded-l-lg transition-transform duration-200 group-hover:translate-x-0" style="background: var(--item-color, #7EC8E3);"></div>
                </a>
            {/each}
        </nav>
    </div>
</aside>

<!-- Mobile Bottom Navigation -->
<nav class="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t-[6px]
             dark:bg-[rgba(28,25,23,0.95)] dark:border-stone-600
             light:bg-[rgba(212,234,247,0.95)] light:border-[#A7D8F0]
             backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.3)]" 
     style="padding-bottom: env(safe-area-inset-bottom, 0);">
    <div class="flex justify-around items-center p-3 max-w-[600px] mx-auto">
        {#each sidebarItems as item (item.path)}
            <a 
                href={item.path} 
                class="flex flex-col items-center justify-center gap-1.5 p-2 min-w-[70px] rounded-2xl no-underline transition-all duration-200 relative active:scale-[0.92] 
                       {currentPath === item.path 
                           ? 'dark:text-stone-200 light:text-slate-900 dark:bg-stone-700/50 light:bg-[#A7D8F0]/80' 
                           : 'dark:text-stone-500 light:text-slate-700'}
                       focus:outline-none focus:ring-[6px] focus:ring-[#7EC8E3]
                       [@media(max-width:480px)]:min-w-[60px] [@media(max-width:480px)]:p-1.5 [@media(max-width:360px)]:min-w-0" 
                style="--item-color: {item.color}"
            >
                <div class="w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-200 
                            dark:active:bg-stone-700/70 light:active:bg-[#A7D8F0]/70
                            [@media(max-width:480px)]:w-10 [@media(max-width:480px)]:h-10 [@media(max-width:360px)]:w-12 [@media(max-width:360px)]:h-12" 
                     style="color: var(--item-color, #7EC8E3);">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-7 h-7 [@media(max-width:480px)]:w-6 [@media(max-width:480px)]:h-6">
                        {@html getIcon(item.icon)}
                    </svg>
                </div>
                <span class="font-['Lato'] text-xs font-bold text-center transition-colors duration-200 
                             dark:text-stone-400 light:text-slate-800
                             [@media(max-width:480px)]:text-[0.65rem] [@media(max-width:360px)]:hidden">{item.label}</span>
            </a>
        {/each}
    </div>
</nav>
