<script lang="ts">
    import IMG_0156 from '$lib/assets/gif/IMG_0156.gif';
    import IMG_0157 from '$lib/assets/gif/IMG_0157.gif';
    
    let currentGif = $state(IMG_0156);
    let showBubble = $state(true);
    
    // Form data based on ActivityGoal schema
    let formData = $state({
        stepsGoal: 10000,
        activityGoal: 30,
        burnGoal: 500,
    });
    
    function toggleGif() {
        currentGif = currentGif === IMG_0156 ? IMG_0157 : IMG_0156;
        showBubble = true;
        setTimeout(() => showBubble = false, 3000);
    }
    
    function handleSubmit(e: Event) {
        e.preventDefault();
        console.log('Activity Goal:', {
            ...formData,
            dateSet: new Date(),
        });
        alert('Cel zapisany! 🦭✨');
    }
</script>

<svelte:head>
    <title>Seal Your Habits - Olaf</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] flex items-center justify-center p-8">
    <div class="max-w-2xl w-full">
        <!-- Olaf with Speech Bubble -->
        <div class="relative mb-12">
            <!-- Speech Bubble -->
            {#if showBubble}
                <div class="absolute -top-40 left-1/2 -translate-x-1/2 bg-white px-8 py-6 rounded-3xl shadow-2xl border-4 border-sky-300 min-w-[350px] animate-fade-in z-10">
                    <p class="font-['Lato'] text-xl font-semibold text-slate-800 text-center leading-relaxed">
                        {#if currentGif === IMG_0156}
                            Cześć! Jestem Olaf! 👋<br/>
                            Kliknij mnie! 🦭
                        {:else}
                            Świetnie! Teraz ustaw<br/>
                            swoje cele! 🎯
                        {/if}
                    </p>
                    <!-- Bubble tail -->
                    <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-b-4 border-r-4 border-sky-300 transform rotate-45"></div>
                </div>
            {/if}
            
            <!-- Olaf GIF - clickable -->
            <button 
                onclick={toggleGif}
                class="mx-auto block hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-sky-300 rounded-3xl"
            >
                <img 
                    src={currentGif} 
                    alt="Olaf the Seal" 
                    class="w-64 h-64 object-contain mx-auto rounded-3xl"
                />
            </button>
        </div>

        <!-- Activity Goal Form -->
        <div class="bg-white rounded-3xl shadow-2xl border-3 border-sky-300 p-8">
            <h2 class="font-['Lato'] text-3xl font-bold text-slate-800 mb-6 text-center">
                Ustaw swoje cele dzienne
            </h2>
            
            <form onsubmit={handleSubmit} class="space-y-6">
                <!-- Steps Goal -->
                <div>
                    <label for="stepsGoal" class="block font-['Lato'] text-lg font-semibold text-slate-700 mb-2">
                        🚶 Cel kroków
                    </label>
                    <input
                        id="stepsGoal"
                        type="number"
                        bind:value={formData.stepsGoal}
                        min="0"
                        class="w-full px-4 py-3 border-2 border-sky-200 rounded-xl font-['Lato'] text-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        required
                    />
                </div>

                <!-- Activity Goal (minutes) -->
                <div>
                    <label for="activityGoal" class="block font-['Lato'] text-lg font-semibold text-slate-700 mb-2">
                        ⏱️ Cel aktywności (minuty)
                    </label>
                    <input
                        id="activityGoal"
                        type="number"
                        bind:value={formData.activityGoal}
                        min="0"
                        class="w-full px-4 py-3 border-2 border-sky-200 rounded-xl font-['Lato'] text-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        required
                    />
                </div>

                <!-- Burn Goal (calories) -->
                <div>
                    <label for="burnGoal" class="block font-['Lato'] text-lg font-semibold text-slate-700 mb-2">
                        🔥 Cel spalonych kalorii
                    </label>
                    <input
                        id="burnGoal"
                        type="number"
                        bind:value={formData.burnGoal}
                        min="0"
                        class="w-full px-4 py-3 border-2 border-sky-200 rounded-xl font-['Lato'] text-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        required
                    />
                </div>

                <!-- Submit Button -->
                <button
                    type="submit"
                    class="w-full px-6 py-4 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-['Lato'] text-xl font-bold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-sky-500/30"
                >
                    🎯 Zapisz cele
                </button>
            </form>
        </div>
    </div>
</div>

<style>
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    .animate-fade-in {
        animation: fade-in 0.3s ease-out;
    }
</style>

