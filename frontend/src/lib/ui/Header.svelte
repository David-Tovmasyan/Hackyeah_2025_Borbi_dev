<script lang="ts">
    import Yoko_Logo from "$lib/components/ui/Yoko_Logo.svelte";
    import {page} from "$app/state";
    import clsx from "clsx";
    import ThemeSwitch from "$lib/components/ThemeSwitch.svelte";
    import Avatar from "$lib/components/Avatar2.svelte";

    let {user} = $props();

    let isMenuOpen = $state(false);

    function isActiveRoute(currentPath:string, routePath:string) {
        if (routePath === "/") {
            return currentPath === "/";
        }
        return currentPath.startsWith(routePath);
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function closeMenu() {
        isMenuOpen = false;
    }

    const routes = [
        { name: "Home", path: "/"},
        { name: "Components", path: "/components"},
        { name: "Posts", path: "/posts"},
        { name: "Contact", path: "/contact"},
    ];
</script>

<header class="
    shadow-sm dark:border-b-1 dark:border-b-neutral-800 h-16 px-5
    flex items-center justify-between relative
  ">
    <a href="/" class="flex items-center justify-center h-full">
        <Yoko_Logo />
    </a>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex items-center gap-4 md:mr-24 lg:mr-48">
        {#each routes as route}
            <a
                    href={route.path}
                    class={clsx(
                isActiveRoute(page?.url?.pathname, route.path) ? "text-blue-500" : "text-slate-900",
                "hover:text-blue-500 transition-colors dark:text-white"
                )}
            >
                {route.name}
            </a>
        {/each}
    </nav>

    <!--    ThemeSwitcher-->
    <div class="absolute right-20 top-3 md:right-5 flex gap-2 items-center">
        <ThemeSwitch />
        <Avatar data={{ email: user?.email, username: user?.name}}>
            <div>IM POPUP</div>
        </Avatar>
    </div>
    <!-- Mobile Menu Button -->
    <button
            onclick={toggleMenu}
            class="md:hidden flex items-center justify-center w-10 h-10"
            aria-label="Toggle menu"
    >
        <div class="flex flex-col w-6 h-4 justify-between">
            <span class={clsx(
                "block h-0.5 bg-slate-900 transition-transform duration-300 dark:bg-white",
                isMenuOpen ? "rotate-45 translate-y-2" : ""
            )}></span>
            <span class={clsx(
                "block h-0.5 bg-slate-900 transition-opacity duration-300 dark:bg-white",
                isMenuOpen ? "opacity-0" : "opacity-100"
            )}></span>
            <span class={clsx(
                "block h-0.5 bg-slate-900 transition-transform duration-300 dark:bg-white",
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            )}></span>
        </div>
    </button>
</header>

<!-- Mobile Navigation Menu -->
<div class={clsx(
    "fixed w-screen top-17 md:hidden overflow-hidden bg-white dark:bg-neutral-900 shadow-sm transition-all duration-150",
    isMenuOpen ? "max-h-fit opacity-100" : "max-h-0 opacity-0"
)}>
    <nav class="flex flex-col">
        {#each routes as route}
            <a
                    href={route.path}
                    onclick={closeMenu}
                    class={clsx(
                isActiveRoute(page?.url?.pathname, route.path) ? "text-blue-500" : "text-slate-900 dark:text-white",
                "hover:text-blue-500 transition-colors pl-5 py-3 border-b border-slate-200 dark:border-neutral-800 last:border-b-0"
                )}
            >
                {route.name}
            </a>
        {/each}
    </nav>
</div>