<script>
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    onMount(()=>{
        goto("/app")
    })
</script>

<div class="text-4xl">
    Landing Page
</div>