<script lang="ts">
    import { onMount } from 'svelte';
    import olaf2 from '$lib/assets/gif/olaf2.gif';
    
    let countdown = $state(3);
    
    onMount(() => {
        const interval = setInterval(() => {
            countdown--;
            if (countdown === 0) {
                clearInterval(interval);
                window.location.href = '/';
            }
        }, 1000);
        
        return () => clearInterval(interval);
    });
</script>

<div class="w-full h-full flex items-center justify-center min-h-[80vh]">
    <div class="max-w-md w-full mx-auto p-8 space-y-8 text-center">
        <!-- Olaf waving goodbye -->
        <div class="flex justify-center">
            <div class="w-32 h-32 rounded-full dark:bg-gradient-to-br dark:from-red-500/20 dark:to-orange-500/20 light:bg-[#FFE8D9] border-[6px] dark:border-red-500/30 light:border-[#FFB88C] flex items-center justify-center p-2">
                <img src={olaf2} alt="Olaf says goodbye" class="w-full h-full object-contain" />
            </div>
        </div>

        <!-- Title -->
        <div class="space-y-3">
            <h1 class="font-['Lato'] text-3xl font-bold dark:text-stone-50 light:text-slate-900">
                Do zobaczenia! 👋
            </h1>
            <p class="dark:text-stone-400 light:text-slate-700">
                Dziękujemy za używanie Seal Your Habits!
            </p>
        </div>

        <!-- Countdown -->
        <div class="flex justify-center">
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-stone-800 to-stone-900 border-4 border-red-500/30 flex items-center justify-center">
                <span class="font-['Lato'] text-3xl font-bold text-red-400">
                    {countdown}
                </span>
            </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
            <div 
                class="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-1000 ease-linear"
                style="width: {((3 - countdown) / 3) * 100}%"
            ></div>
        </div>

        <!-- Cancel Button -->
        <button 
            onclick={() => window.location.href = '/app/roadmap'}
            class="px-6 py-3 bg-stone-700 rounded-xl text-stone-200 font-['Lato'] font-semibold hover:bg-stone-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
            Cancel Logout
        </button>

        <!-- Stats Summary (Last session) -->
        <div class="pt-6 border-t border-stone-700 space-y-3">
            <p class="text-sm text-stone-500 font-['Lato']">Your progress this session:</p>
            <div class="grid grid-cols-3 gap-3">
                <div class="p-3 bg-stone-800/50 rounded-lg">
                    <p class="text-2xl font-bold text-orange-400">3</p>
                    <p class="text-xs text-stone-500">Day Streak</p>
                </div>
                <div class="p-3 bg-stone-800/50 rounded-lg">
                    <p class="text-2xl font-bold text-green-400">3</p>
                    <p class="text-xs text-stone-500">Achievements</p>
                </div>
                <div class="p-3 bg-stone-800/50 rounded-lg">
                    <p class="text-2xl font-bold text-blue-400">100%</p>
                    <p class="text-xs text-stone-500">This Week</p>
                </div>
            </div>
        </div>
    </div>
</div>
