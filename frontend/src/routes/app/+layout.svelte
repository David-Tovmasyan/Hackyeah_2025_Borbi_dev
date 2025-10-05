<script lang="ts">
    import Sidebar from '$lib/ui/Sidebar.svelte';
    import Header from '$lib/ui/Header.svelte';
    import {onMount} from "svelte";

    onMount(async () => {
        const d = new Date();
        let hour = d.getHours();
        if(hour == 9){
            let permission = await Notification.requestPermission();
            if(permission == 'granted'){
                const notification = new Notification('Przypomnienie o rutynie', {});
                setTimeout(() => notification.close(), 10*1000);
            }
        }
    })


    let { children } = $props();
</script>

<!-- 
    LAYOUT - Design dla neuroatypowych:
    ✓ Pastelowe tło gradientowe - łagodne dla oczu  
    ✓ Duże odstępy - komfort wizualny
    ✓ Tylko jasne kolory - zgodnie z NEUROATYPICAL_DESIGN_GUIDE.md
-->
<div class="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5]">
    <Header />
    
    <div class="flex">
        <Sidebar />
        
        <main class="flex-1 min-h-[calc(100vh-5rem)] overflow-auto pb-20 md:pb-0 p-6 space-y-8">
            {@render children?.()}
        </main>
    </div>
</div>
