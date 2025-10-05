<script lang="ts">
    import Sidebar from '$lib/ui/Sidebar.svelte';
    import Header from '$lib/ui/Header.svelte';
    import { initializeUser, isUserLoggedIn, currentUser } from '$lib/stores/user';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    let { children } = $props();
    let isLoading = $state(true);
    
    // Sprawdzenie czy użytkownik jest zalogowany i inicjalizacja
    onMount(async () => {
        if (!isUserLoggedIn()) {
            // Jeśli nie jest zalogowany, przekieruj na stronę logowania
            console.log('🚪 Użytkownik nie jest zalogowany, przekierowanie na /login');
            isLoading = false;
            goto('/login');
            return;
        }
        
        // Jeśli jest zalogowany, spróbuj zainicjalizować dane użytkownika
        const success = await initializeUser();
        
        if (!success) {
            console.log('❌ Nie udało się zainicjalizować użytkownika, przekierowanie na /login');
            goto('/login');
        } else {
            console.log('✅ Użytkownik został pomyślnie zainicjalizowany');
        }
        
        isLoading = false;
    });
</script>

<!-- 
    LAYOUT - Design dla neuroatypowych:
    ✓ Pastelowe tło gradientowe - łagodne dla oczu  
    ✓ Duże odstępy - komfort wizualny
    ✓ Tylko jasne kolory - zgodnie z NEUROATYPICAL_DESIGN_GUIDE.md
-->
<div class="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5]">
    {#if isLoading}
        <!-- Loading screen -->
        <div class="min-h-screen flex items-center justify-center">
            <div class="bg-white rounded-3xl shadow-2xl border-[6px] border-[#A7D8F0] p-12 text-center">
                <div class="text-6xl mb-4">🔄</div>
                <div class="font-['Lato'] text-2xl font-bold text-slate-900">
                    Loading...
                </div>
            </div>
        </div>
    {:else if $currentUser}
        <!-- Aplikacja dla zalogowanego użytkownika -->
        <Header />
        
        <div class="flex">
            <Sidebar />
            
            <main class="flex-1 min-h-[calc(100vh-5rem)] overflow-auto pb-20 md:pb-0 p-6 space-y-8">
                {@render children?.()}
            </main>
        </div>
    {:else}
        <!-- Fallback - przekierowanie do logowania -->
        <div class="min-h-screen flex items-center justify-center">
            <div class="bg-white rounded-3xl shadow-2xl border-[6px] border-[#A7D8F0] p-12 text-center">
                <div class="text-6xl mb-4">🚪</div>
                <div class="font-['Lato'] text-2xl font-bold text-slate-900">
                    Redirecting to login...
                </div>
            </div>
        </div>
    {/if}
</div>
