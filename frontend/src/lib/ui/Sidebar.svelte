<script lang="ts">
    import { ChevronLeft, ChevronRight, Clipboard, Files, Settings, User, LogOut } from "lucide-svelte";
    import UserIcon from "../UserIcon.svelte";
    import { type Icon } from "lucide-svelte";
    import { type ComponentType, onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { accountStore } from "../../stores/usersStore";
    import {isEmpty} from "$lib/utils";

    const sidebarItems: Array<{ section: string; label: string; path: string; icon: ComponentType<Icon> }> = [
        {
            section: "Overview",
            label: "Notes",
            icon: Clipboard,
            path: "/notes"
        },
        {
            section: "Overview",
            label: "Files",
            icon: Files,
            path: "/files"
        },
        {
            section: "Account",
            label: "Settings",
            icon: Settings,
            path: "/settings"
        },
        {
            section: "Account",
            label: "Account",
            icon: User,
            path: "/account"
        },
        {
            section: "Account",
            label: "Logout",
            icon: LogOut,
            path: "/logout"
        }
    ];

    const handleSidebarToggle = () => {
        sidebarOpen = !sidebarOpen;
    }

    // Animation

    const fadeIn = {
        delay: 100,
        duration: 200
    }

    const fadeOut = {
        delay: 0,
        duration: 100
    }

    let sidebarOpen = $derived(window.innerWidth >= 768);

    onMount(() => {
        window.addEventListener('resize', () => {
            sidebarOpen = window.innerWidth >= 768;
        })
    })
</script>

<aside
        id="sidebar"
        style="transition-duration: 600ms"
        class={`h-full relative transition-all overflow-hidden shadow border-r-[1px] border-gray-300 ${
    sidebarOpen ? 'w-64' : 'w-16'
}`}
        aria-label="Sidebar"
>
    <div class="h-full flex flex-col px-2 overflow-y-auto overflow-x-hidden bg-white">
        <!-- Avatar + username -->
        <div class="flex min-h-12">
            <div class="flex items-center gap-2">
                <UserIcon size={24} />
                {#if sidebarOpen && !isEmpty($accountStore)}
                    <div in:fade={fadeIn} out:fade={fadeOut} class="text-md w-3/4 truncate">{$accountStore.username}</div>
                {/if}
            </div>
        </div>

        <!-- Items section -->
        <div class="flex flex-col">
            {#each sidebarItems as item (item.path)}
                <a
                        href={item.path}
                        class="flex items-center h-10 mb-2 gap-2 text-md text-slate-700 transition-colors hover:text-slate-900"
                >
                    <div>
                        <item.icon  size="24"></item.icon>
                    </div>
                    {#if sidebarOpen}
                        <span in:fade={fadeIn} out:fade={fadeOut}>{item.label}</span>
                    {/if}
                </a>
            {/each}
        </div>
    </div>

    <!-- Dropdown open/close button -->
    <div class="absolute right-1 top-3">
        <button
                class="transform text-slate-500 transition-all rounded-full hover:text-slate-700 hover:bg-slate-300"
                onclick={handleSidebarToggle}
        >
            {#if sidebarOpen}
                <ChevronLeft />
            {:else}
                <ChevronRight />
            {/if}
        </button>
    </div>
</aside>