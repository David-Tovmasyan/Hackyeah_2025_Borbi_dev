<script lang="ts">
    import Sidebar from '$lib/ui/Sidebar.svelte';
    import Header from '$lib/ui/Header.svelte';
    
    let { children } = $props();
</script>

<div class="min-h-screen dark:bg-[#0a0a0a] light:bg-sky-50">
    <Header />
    
    <div class="flex">
        <Sidebar />
        
        <main class="flex-1 min-h-[calc(100vh-4rem)] overflow-auto pb-20 md:pb-0">
            {@render children?.()}
        </main>
    </div>
</div>
