<script lang="ts">
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
            path: "/app/roadmap",
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

    
    
</script>

<!-- Desktop Sidebar -->
<aside id="sidebar" class="sidebar-desktop">
    <div class="sidebar-content">
        

        <!-- Navigation Items -->
        <nav class="sidebar-nav">
            {#each sidebarItems as item (item.path)}
                <a href={item.path} class="nav-item" style="--item-color: {item.color}">
                    <div class="nav-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            {@html getIcon(item.icon)}
                        </svg>
                    </div>
                    <span class="nav-label">{item.label}</span>
                    <div class="nav-indicator"></div>
                </a>
            {/each}
        </nav>
    </div>
</aside>

<!-- Mobile Bottom Navigation -->
<nav class="mobile-nav">
    <div class="mobile-nav-container">
        {#each sidebarItems as item (item.path)}
            <a href={item.path} class="mobile-nav-item" style="--item-color: {item.color}">
                <div class="mobile-nav-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        {@html getIcon(item.icon)}
                    </svg>
                </div>
                <span class="mobile-nav-label">{item.label}</span>
            </a>
        {/each}
    </div>
</nav>

<style>
    /* Desktop Sidebar */
    .sidebar-desktop {
        display: none;
        width: 280px;
        height: 100vh;
        background: linear-gradient(180deg, #1c1917 0%, #0f0e0d 100%);
        border-right: 1px solid rgba(68, 64, 60, 0.3);
        position: sticky;
        top: 0;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .sidebar-desktop::-webkit-scrollbar {
        width: 4px;
    }

    .sidebar-desktop::-webkit-scrollbar-track {
        background: transparent;
    }

    .sidebar-desktop::-webkit-scrollbar-thumb {
        background: rgba(168, 162, 158, 0.2);
        border-radius: 10px;
    }

    .sidebar-content {
        display: flex;
        flex-direction: column;
        padding: 2rem 0;
        height: 100%;
    }

    .sidebar-nav {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0 1rem;
    }

    .nav-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.875rem 1rem;
        border-radius: 12px;
        color: #a8a29e;
        text-decoration: none;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
    }

    .nav-item:hover {
        background: rgba(68, 64, 60, 0.3);
        color: #fafaf9;
        transform: translateX(4px);
    }

    .nav-item:active {
        transform: translateX(4px) scale(0.98);
    }

    .nav-icon {
        width: 24px;
        height: 24px;
        color: var(--item-color, #a8a29e);
        transition: all 0.2s ease;
        flex-shrink: 0;
    }

    .nav-item:hover .nav-icon {
        color: var(--item-color, #fafaf9);
        transform: scale(1.1);
    }

    .nav-label {
        font-family: 'Comic Relief', system-ui, sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        letter-spacing: -0.01em;
    }

    .nav-indicator {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%) translateX(100%);
        width: 3px;
        height: 60%;
        background: var(--item-color, #3b82f6);
        border-radius: 10px 0 0 10px;
        transition: transform 0.2s ease;
    }

    .nav-item:hover .nav-indicator {
        transform: translateY(-50%) translateX(0);
    }

    /* Mobile Bottom Navigation */
    .mobile-nav {
        display: block;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(28, 25, 23, 0.95);
        backdrop-filter: blur(20px);
        border-top: 1px solid rgba(68, 64, 60, 0.3);
        box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
        z-index: 50;
        padding: env(safe-area-inset-bottom, 0);
    }

    .mobile-nav-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0.5rem;
        max-width: 600px;
        margin: 0 auto;
    }

    .mobile-nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        padding: 0.5rem;
        min-width: 60px;
        border-radius: 12px;
        color: #78716c;
        text-decoration: none;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
    }

    .mobile-nav-item:active {
        transform: scale(0.92);
    }

    .mobile-nav-item:active .mobile-nav-icon {
        background: rgba(68, 64, 60, 0.5);
    }

    .mobile-nav-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        transition: all 0.2s ease;
        color: var(--item-color, #a8a29e);
    }

    .mobile-nav-icon svg {
        width: 24px;
        height: 24px;
    }

    .mobile-nav-label {
        font-family: 'Comic Relief', system-ui, sans-serif;
        font-size: 0.65rem;
        font-weight: 600;
        color: #a8a29e;
        text-align: center;
        transition: color 0.2s ease;
    }

    /* Responsive breakpoints */
    @media (min-width: 768px) {
        .sidebar-desktop {
            display: block;
        }

        .mobile-nav {
            display: none;
        }
    }

    @media (max-width: 480px) {
        .mobile-nav-item {
            min-width: 50px;
            padding: 0.4rem;
        }

        .mobile-nav-icon {
            width: 36px;
            height: 36px;
        }

        .mobile-nav-icon svg {
            width: 20px;
            height: 20px;
        }

        .mobile-nav-label {
            font-size: 0.6rem;
        }
    }

    @media (max-width: 360px) {
        .mobile-nav-label {
            display: none;
        }

        .mobile-nav-icon {
            width: 44px;
            height: 44px;
        }
    }
</style>