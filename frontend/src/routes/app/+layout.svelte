<script lang="ts">
    import Sidebar from '$lib/ui/Sidebar.svelte';
    import Header from '$lib/ui/Header.svelte';
    
    let { children } = $props();
</script>

<!-- 
    LAYOUT - Design dla neuroatypowych:
    ✓ Pastelowe tło (#E8F4F8) - łagodne dla oczu
    ✓ Duże odstępy - komfort wizualny
-->
<div class="min-h-screen dark:bg-[#1a1918] light:bg-gradient-to-b light:from-[#E8F4F8] light:to-[#D1E7ED]">
    <Header />
    
    <div class="flex">
        <Sidebar />
        
        <main class="flex-1 min-h-[calc(100vh-5rem)] overflow-auto pb-20 md:pb-0">
            {@render children?.()}
        </main>
    </div>
</div>
