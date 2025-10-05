<script lang="ts">
    import { loginUserWithAPI, logoutUser, currentUser } from '$lib/stores/user';
    import { goto } from '$app/navigation';

    let testUsername = $state('user');
    let isLoading = $state(false);
    let message = $state('');

    async function testLogin() {
        isLoading = true;
        message = 'Attempting login...';
        
        try {
            const success = await loginUserWithAPI(testUsername);
            if (success) {
                message = '✅ Logowanie udane!';
                setTimeout(() => goto('/app'), 1000);
            } else {
                message = '❌ Logowanie nieudane';
            }
        } catch (error) {
            message = `❌ Błąd: ${error}`;
        } finally {
            isLoading = false;
        }
    }

    function testLogout() {
        logoutUser();
        message = '🚪 Wylogowano';
    }
</script>

<svelte:head>
    <title>Debug - Seal Your Habits</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] flex items-center justify-center p-6">
    <div class="bg-white rounded-3xl shadow-2xl border-[6px] border-[#A7D8F0] p-8 max-w-2xl w-full">
        <h1 class="font-['Lato'] text-3xl font-bold text-slate-900 mb-6 text-center">
            🔧 Debug Panel
        </h1>
        
        <!-- Current User Status -->
        <div class="bg-[#F0F9FF] border-[4px] border-[#B5E3FF] rounded-2xl p-4 mb-6">
            <h2 class="font-['Lato'] text-xl font-bold text-slate-900 mb-2">
                Current User:
            </h2>
            {#if $currentUser}
                <div class="font-['Lato'] text-lg text-slate-800">
                    <p><strong>Name:</strong> {$currentUser.username}</p>
                    <p><strong>ID:</strong> {$currentUser.id}</p>
                    <p><strong>XP:</strong> {$currentUser.xp}</p>
                    <p><strong>Level:</strong> {$currentUser.level}</p>
                    {#if $currentUser.dailyProgress}
                        <p><strong>Kroki:</strong> {$currentUser.dailyProgress.steps}/{$currentUser.dailyProgress.stepsGoal}</p>
                    {/if}
                </div>
            {:else}
                <p class="font-['Lato'] text-lg text-slate-600">No logged in user</p>
            {/if}
        </div>

        <!-- Test Login -->
        <div class="space-y-4">
            <div>
                <label for="testUsername" class="block font-['Lato'] text-lg font-bold text-slate-900 mb-2">
                    Login Test:
                </label>
                <input
                    id="testUsername"
                    bind:value={testUsername}
                    placeholder="user lub borbi"
                    class="w-full px-4 py-3 border-[4px] border-[#B5E3FF] rounded-2xl font-['Lato'] text-lg text-slate-900 focus:outline-none focus:ring-[4px] focus:ring-[#A7D8F0] bg-[#F0F9FF]"
                />
            </div>
            
            <div class="flex gap-3">
                <button
                    onclick={testLogin}
                    disabled={isLoading}
                    class="px-6 py-3 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] text-white font-['Lato'] text-lg font-bold rounded-2xl hover:scale-105 transition-transform disabled:opacity-50"
                >
                    {isLoading ? '🔄' : '🔑'} Log In
                </button>
                
                <button
                    onclick={testLogout}
                    disabled={isLoading}
                    class="px-6 py-3 bg-gradient-to-r from-[#F5A6A6] to-[#E67E7E] text-white font-['Lato'] text-lg font-bold rounded-2xl hover:scale-105 transition-transform disabled:opacity-50"
                >
                    🚪 Wyloguj
                </button>
            </div>
            
            {#if message}
                <div class="bg-[#F0F9FF] border-[4px] border-[#B5E3FF] rounded-2xl p-4">
                    <p class="font-['Lato'] text-lg text-slate-800">{message}</p>
                </div>
            {/if}
        </div>

        <!-- Navigation -->
        <div class="mt-8 flex gap-3">
            <a 
                href="/"
                class="px-4 py-2 border-[4px] border-[#A7D8F0] text-slate-900 font-['Lato'] font-bold rounded-2xl hover:scale-105 transition-transform"
            >
                🏠 Home
            </a>
            
            <a 
                href="/login"
                class="px-4 py-2 border-[4px] border-[#A7D8F0] text-slate-900 font-['Lato'] font-bold rounded-2xl hover:scale-105 transition-transform"
            >
                🔑 Login
            </a>
            
            <a 
                href="/app"
                class="px-4 py-2 border-[4px] border-[#A7D8F0] text-slate-900 font-['Lato'] font-bold rounded-2xl hover:scale-105 transition-transform"
            >
                🎯 App
            </a>
        </div>
    </div>
</div>