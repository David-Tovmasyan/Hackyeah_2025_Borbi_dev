<script>
    import Sidebar from "$lib/ui/Sidebar.svelte";
    import Content from "$lib/ui/Content.svelte";

</script>

<div class="
    min-h-screen w-full
    bg-gradient-to-br from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5]
    flex flex-col md:flex-row
    relative
"
id="layout"
>
    <Sidebar />
    
    <!-- Main Content Area -->
    <main class="
        flex-1 
        md:ml-0
        pb-20 md:pb-0
        overflow-x-hidden
        h-screen md:min-h-screen
        w-full
        md:w-auto
    ">
        <div class="
            h-full 
            p-4 md:p-6 
            max-w-full
            mx-auto
            overflow-y-auto
        ">
            <Content />
        </div>
    </main>
</div>
