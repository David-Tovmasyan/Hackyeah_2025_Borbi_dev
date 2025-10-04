<script lang="ts">
    import Logo from "$lib/components/Logo.svelte";
    import { isDarkMode, toggleTheme } from "$lib/stores/theme";
</script>

<div>
    <header class="
        h-16 w-full
        flex items-center justify-between relative
        dark:bg-stone-900 dark:text-white
        light:bg-sky-50 light:text-slate-800
        border-b dark:border-stone-800 light:border-sky-200
      ">
        <div class="flex items-center justify-center h-full w-full">
            <a href="/" class="flex items-center justify-center h-full w-fit">
                <Logo />
            </a>
        </div>
        
        <!-- Dark Mode Toggle -->
        <button
            onclick={toggleTheme}
            class="absolute right-6 p-2.5 rounded-xl transition-all duration-200
                   dark:bg-stone-800 dark:hover:bg-stone-700 
                   light:bg-sky-100 light:hover:bg-sky-200
                   border dark:border-stone-700 light:border-sky-300"
            aria-label="Toggle dark mode"
        >
            {#if $isDarkMode}
                <svg class="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
            {:else}
                <svg class="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd" />
                </svg>
            {/if}
        </button>
    </header>
</div>
