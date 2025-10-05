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

<!-- LOGOUT PAGE z kolorami landing page -->
<div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] w-full flex items-center justify-center p-8">
    <div class="max-w-md w-full mx-auto space-y-8 text-center">
        <!-- Olaf waving goodbye -->
        <div class="flex justify-center">
            <div class="w-32 h-32 rounded-full bg-gradient-to-br from-[#FFE8D9] to-[#FFD4B8] border-[6px] border-[#FFB88C] flex items-center justify-center p-2 shadow-2xl shadow-[#FFB88C]/40">
                <img src={olaf2} alt="Olaf says goodbye" class="w-full h-full object-contain" />
            </div>
        </div>

        <!-- Title -->
        <div class="space-y-4">
            <h1 class="font-['Lato'] text-4xl font-bold text-slate-900">
                Do zobaczenia! 👋
            </h1>
            <p class="font-['Lato'] text-lg text-slate-700">
                Dziękujemy za używanie Seal Your Habits!
            </p>
        </div>

        <!-- Countdown -->
        <div class="flex justify-center">
            <div class="w-24 h-24 rounded-full bg-white border-[6px] border-[#FFB88C] flex items-center justify-center shadow-xl shadow-[#FFB88C]/30">
                <span class="font-['Lato'] text-4xl font-bold text-orange-600">
                    {countdown}
                </span>
            </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full h-4 bg-white/80 rounded-full overflow-hidden border-[4px] border-[#A7D8F0]">
            <div 
                class="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-1000 ease-linear rounded-full"
                style="width: {((3 - countdown) / 3) * 100}%"
            ></div>
        </div>

        <!-- Cancel Button -->
        <button 
            onclick={() => window.location.href = '/app/roadmap'}
            class="px-8 py-4 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] hover:from-[#6BB8D3] hover:to-[#4A9DD2] rounded-3xl text-white font-['Lato'] text-lg font-bold transition-all duration-200 hover:scale-105 shadow-2xl shadow-[#7EC8E3]/50 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
        >
            Anuluj wylogowanie
        </button>

        <!-- Stats Summary (Last session) -->
        <div class="bg-white/90 backdrop-blur-sm border-[6px] border-[#A7D8F0] rounded-3xl p-6 space-y-4 shadow-xl shadow-[#A7D8F0]/30">
            <p class="text-base text-slate-700 font-['Lato'] font-bold">Twoje postępy w tej sesji:</p>
            <div class="grid grid-cols-3 gap-3">
                <div class="p-4 bg-[#F0F9FF] border-[4px] border-[#B5E3FF] rounded-2xl">
                    <p class="text-3xl font-bold text-orange-500">3</p>
                    <p class="text-sm text-slate-600 font-['Lato'] font-semibold">Dni z rzędu</p>
                </div>
                <div class="p-4 bg-[#F0F9FF] border-[4px] border-[#B5E3FF] rounded-2xl">
                    <p class="text-3xl font-bold text-green-500">3</p>
                    <p class="text-sm text-slate-600 font-['Lato'] font-semibold">Osiągnięcia</p>
                </div>
                <div class="p-4 bg-[#F0F9FF] border-[4px] border-[#B5E3FF] rounded-2xl">
                    <p class="text-3xl font-bold text-[#5DADE2]">100%</p>
                    <p class="text-sm text-slate-600 font-['Lato'] font-semibold">Ten tydzień</p>
                </div>
            </div>
        </div>
    </div>
</div>
