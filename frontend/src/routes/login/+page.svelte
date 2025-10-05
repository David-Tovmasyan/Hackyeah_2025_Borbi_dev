<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { loginUserWithAPI, isUserLoggedIn } from '$lib/stores/user';
    import { getAllUsers } from '$lib/api';
    import olaf1 from '$lib/assets/gif/olaf1.gif';

    let username = $state('');
    let availableUsers = $state<any[]>([]);
    let isLoading = $state(false);
    let errorMessage = $state('');

    // Sprawdź czy użytkownik już jest zalogowany
    onMount(async () => {
        if (isUserLoggedIn()) {
            goto('/app');
            return;
        }

        // Załaduj listę dostępnych użytkowników
        try {
            const response = await getAllUsers();
            availableUsers = response.users;
        } catch (error) {
            console.error('Error loading users:', error);
        }
    });

    async function handleLogin(e: Event) {
        e.preventDefault();
        
        if (!username.trim()) {
            errorMessage = 'Wprowadź nazwę użytkownika';
            return;
        }

        isLoading = true;
        errorMessage = '';

        try {
            const success = await loginUserWithAPI(username.trim());
            
            if (success) {
                goto('/app');
            } else {
                errorMessage = 'Nie znaleziono użytkownika';
            }
        } catch (error) {
            errorMessage = 'Błąd podczas logowania. Spróbuj ponownie.';
            console.error('Login error:', error);
        } finally {
            isLoading = false;
        }
    }

    function quickLogin(userToLogin: string) {
        username = userToLogin;
        handleLogin(new Event('submit'));
    }
</script>

<svelte:head>
    <title>Logowanie - Seal Your Habits</title>
</svelte:head>

<!-- 
    LOGOWANIE - Design zgodny z NEUROATYPICAL_DESIGN_GUIDE:
    ✓ Jasne, pastelowe tło gradientowe
    ✓ Duże, czytelne elementy 
    ✓ Pozytywne wsparcie z Olafem
    ✓ Wysokie kontrasty WCAG AAA
-->
<div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] flex items-center justify-center p-6">
    <div class="max-w-4xl w-full animate-fade-in">
        <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <!-- Olaf po lewej stronie -->
            <div class="lg:w-1/2 flex justify-center lg:justify-end">
                <img 
                    src={olaf1} 
                    alt="Olaf the Seal" 
                    class="w-80 h-80 lg:w-96 lg:h-96 object-contain rounded-3xl"
                />
            </div>

            <!-- Formularz logowania po prawej -->
            <div class="lg:w-1/2 w-full">
                <div class="bg-white rounded-3xl shadow-2xl border-[6px] border-[#A7D8F0] p-8">
                    <h1 class="font-['Lato'] text-4xl font-bold text-slate-900 mb-4 text-center">
                        Witaj z powrotem! 👋
                    </h1>
                    <p class="font-['Lato'] text-lg text-slate-700 mb-8 text-center">
                        Zaloguj się do swojego konta
                    </p>
                    
                    <form onsubmit={handleLogin} class="space-y-6">
                        <div>
                            <label for="username" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                👤 Nazwa użytkownika
                            </label>
                            <input
                                id="username"
                                type="text"
                                bind:value={username}
                                placeholder="np. user lub borbi"
                                class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        {#if errorMessage}
                            <div class="bg-red-100 border-[6px] border-red-300 rounded-3xl p-4">
                                <p class="font-['Lato'] text-red-800 font-semibold text-center">
                                    ⚠️ {errorMessage}
                                </p>
                            </div>
                        {/if}

                        <div class="flex gap-4">
                            <button
                                type="button"
                                onclick={() => goto('/')}
                                class="px-6 py-4 bg-white border-[6px] border-[#A7D8F0] text-slate-900 font-['Lato'] text-lg font-bold rounded-3xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                            >
                                ← Strona główna
                            </button>
                            
                            <button
                                type="submit"
                                disabled={isLoading}
                                class="flex-1 px-6 py-4 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] hover:from-[#6BB8D3] hover:to-[#4A9DD2] text-white font-['Lato'] text-xl font-bold rounded-3xl transition-all duration-200 hover:scale-105 shadow-2xl shadow-[#7EC8E3]/50 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? '🔄 Logowanie...' : '🚀 Zaloguj się'}
                            </button>
                        </div>
                    </form>

                    <!-- Szybkie logowanie dla testów -->
                    {#if availableUsers.length > 0}
                        <div class="mt-8 pt-6 border-t-4 border-[#B5E3FF]">
                            <h3 class="font-['Lato'] text-xl font-bold text-slate-900 mb-4 text-center">
                                🧪 Dostępni użytkownicy testowi:
                            </h3>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {#each availableUsers as user}
                                    <button
                                        onclick={() => quickLogin(user.username)}
                                        disabled={isLoading}
                                        class="p-4 bg-[#F0F9FF] border-[4px] border-[#B5E3FF] rounded-2xl hover:bg-[#E8F4F8] transition-colors duration-200 disabled:opacity-50"
                                    >
                                        <div class="font-['Lato'] text-lg font-bold text-slate-900">
                                            {user.username}
                                        </div>
                                        <div class="font-['Lato'] text-sm text-slate-600">
                                            Level {Math.floor(user.xp / 200) + 1} • {user.xp} XP
                                        </div>
                                    </button>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    <!-- Link do onboardingu -->
                    <div class="mt-6 text-center">
                        <p class="font-['Lato'] text-base text-slate-600">
                            Nie masz konta? 
                            <a href="/" class="text-[#5DADE2] font-bold hover:text-[#4A9DD2] transition-colors">
                                Rozpocznij onboarding
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-fade-in {
        animation: fade-in 0.6s ease-out;
    }
</style>