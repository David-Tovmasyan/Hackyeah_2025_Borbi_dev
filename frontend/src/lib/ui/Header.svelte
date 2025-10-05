<script lang="ts">
    import Logo from "$lib/components/Logo.svelte";
    import { isDarkMode, toggleTheme } from "$lib/stores/theme";
</script>

<div>
    <!-- HEADER - Landing Page Colors Only -->
    <header class="
        h-20 w-full
        flex items-center justify-between relative
        bg-[#D4EAF7] text-slate-900
        border-b-[6px] border-[#A7D8F0] shadow-lg shadow-[#A7D8F0]/30
      ">
        <div class="flex items-center justify-center h-full w-full">
            <a href="/" class="flex items-center justify-center h-full w-fit focus:outline-none focus:ring-[6px] focus:ring-[#7EC8E3] rounded-xl">
                <Logo />
            </a>
        </div>

    </header>
</div>
