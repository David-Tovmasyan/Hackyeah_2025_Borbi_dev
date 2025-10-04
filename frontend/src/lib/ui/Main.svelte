<script>
    import Sidebar from "$lib/ui/Sidebar.svelte";
    import Content from "$lib/ui/Content.svelte";

</script>

<div class="
    h-screen w-full mt-5
    bg-stone-800
    flex flex-col-reverse md:flex-row
"
id="layout"
>
    <Sidebar />
    <Content />
</div>

<style>

</style>