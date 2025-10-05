<script lang="ts">
    import { goto } from '$app/navigation';
    // Nowe Olaf GIF-y: olaf2 (machający) na ekranie 1, olaf1 (spokojny) na ekranie 2
    import olaf2 from '$lib/assets/gif/olaf2.gif';
    import olaf1 from '$lib/assets/gif/olaf1.gif';
    
    // Step management - 6 kroków onboardingu
    let currentStep = $state(1); // 1-6
    
    // Form data - zebrane dane użytkownika
    let formData = $state({
        name: '',
        stepsGoal: 10000,
        caloriesGoal: 2000,
        amountOfHours: 8,
    });
    
    function nextStep() {
        if (currentStep < 6) {
            currentStep++;
        }
    }
    
    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
        }
    }
    
    function handleNameSubmit(e: Event) {
        e.preventDefault();
        if (formData.name.trim()) {
            nextStep();
        }
    }
    
    function handleActivitySubmit(e: Event) {
        e.preventDefault();
        nextStep();
    }
    
    function handleDietSubmit(e: Event) {
        e.preventDefault();
        nextStep();
    }
    
    function handleSleepSubmit(e: Event) {
        e.preventDefault();
        console.log('Onboarding Complete:', formData);
        goto('/app');
    }
</script>

<svelte:head>
    <title>Seal Your Habits - Witaj!</title>
</svelte:head>

{#if currentStep === 1}
    <!-- EKRAN 1: Przywitanie użytkownika -->
    <div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] flex items-center justify-center p-8">
        <div class="flex flex-col items-center animate-fade-in">
            <div class="relative mb-12">
                <div class="bg-white px-12 py-6 rounded-3xl shadow-2xl border-[6px] border-[#A7D8F0] max-w-lg">
                    <p class="font-['Lato'] text-3xl font-bold text-slate-900 text-center leading-relaxed">
                        Cześć! Jestem Olaf! 👋
                    </p>
                    <p class="font-['Lato'] text-xl font-semibold text-slate-800 mt-4 text-center leading-relaxed">
                        Witam Cię w bezpiecznym miejscu,<br/>
                        gdzie możesz być sobą!
                    </p>
                    <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-white border-b-[6px] border-r-[6px] border-[#A7D8F0] transform rotate-45"></div>
                </div>
            </div>
            
            <button 
                onclick={nextStep}
                class="hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-[6px] focus:ring-[#7EC8E3] rounded-3xl"
                aria-label="Kliknij Olafa aby przejść dalej"
                autofocus
            >
                <img 
                    src={olaf2} 
                    alt="Olaf the Seal - Click me!" 
                    class="w-80 h-80 object-contain rounded-3xl"
                />
            </button>
            
            <p class="font-['Lato'] text-xl font-bold text-slate-700 mt-8 animate-pulse">
                👆 Kliknij mnie! 
            </p>
        </div>
    </div>

{:else if currentStep === 2}
    <!-- EKRAN 2: Opisanie aplikacji -->
    <div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] flex items-center justify-center p-6">
        <div class="max-w-5xl w-full animate-fade-in">
            <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div class="lg:w-1/2 flex justify-center lg:justify-end">
                    <img 
                        src={olaf1} 
                        alt="Olaf the Seal" 
                        class="w-80 h-80 lg:w-96 lg:h-96 object-contain rounded-3xl"
                    />
                </div>

                <div class="lg:w-1/2 w-full">
                    <div class="bg-white rounded-3xl shadow-2xl border-[6px] border-[#A7D8F0] p-8">
                        <h2 class="font-['Lato'] text-4xl font-bold text-slate-900 mb-6 text-center">
                            Seal Your Habits 🌟
                        </h2>
                        
                        <div class="space-y-6">
                            <div class="flex items-start gap-4">
                                <span class="text-4xl">🎯</span>
                                <div>
                                    <h3 class="font-['Lato'] text-xl font-bold text-slate-900 mb-2">Śledź swoje cele</h3>
                                    <p class="font-['Lato'] text-lg text-slate-700">Monitoruj aktywność, dietę i sen w jednym miejscu</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start gap-4">
                                <span class="text-4xl">📊</span>
                                <div>
                                    <h3 class="font-['Lato'] text-xl font-bold text-slate-900 mb-2">Buduj nawyki</h3>
                                    <p class="font-['Lato'] text-lg text-slate-700">Twórz pozytywne rutyny krok po kroku</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start gap-4">
                                <span class="text-4xl">🏆</span>
                                <div>
                                    <h3 class="font-['Lato'] text-xl font-bold text-slate-900 mb-2">Odblokowuj osiągnięcia</h3>
                                    <p class="font-['Lato'] text-lg text-slate-700">Świętuj swoje sukcesy razem z Olafem!</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onclick={nextStep}
                            class="w-full px-6 py-4 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] hover:from-[#6BB8D3] hover:to-[#4A9DD2] text-white font-['Lato'] text-xl font-bold rounded-3xl transition-all duration-200 hover:scale-105 shadow-2xl shadow-[#7EC8E3]/50 mt-8 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                            autofocus
                        >
                            Dalej! 🚀
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

{:else if currentStep === 3}
    <!-- EKRAN 3: Zarejestrowanie imienia -->
    <div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] flex items-center justify-center p-6">
        <div class="max-w-5xl w-full animate-fade-in">
            <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div class="lg:w-1/2 flex justify-center lg:justify-end">
                    <img 
                        src={olaf2} 
                        alt="Olaf the Seal" 
                        class="w-80 h-80 lg:w-96 lg:h-96 object-contain rounded-3xl"
                    />
                </div>

                <div class="lg:w-1/2 w-full">
                    <div class="bg-white rounded-3xl shadow-2xl border-[6px] border-[#A7D8F0] p-8">
                        <h2 class="font-['Lato'] text-3xl font-bold text-slate-900 mb-4 text-center">
                            Poznajmy się! 😊
                        </h2>
                        <p class="font-['Lato'] text-lg text-slate-700 mb-8 text-center">
                            Jak mam się do Ciebie zwracać?
                        </p>
                        
                        <form onsubmit={handleNameSubmit} class="space-y-6">
                            <div>
                                <label for="name" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    👤 Twoje imię
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    bind:value={formData.name}
                                    placeholder="np. Anna"
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                    autofocus
                                />
                            </div>

                            <div class="flex gap-4">
                                <button
                                    type="button"
                                    onclick={prevStep}
                                    class="px-6 py-4 bg-white border-[6px] border-[#A7D8F0] text-slate-900 font-['Lato'] text-lg font-bold rounded-3xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                                >
                                    ← Wstecz
                                </button>
                                <button
                                    type="submit"
                                    class="flex-1 px-6 py-4 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] hover:from-[#6BB8D3] hover:to-[#4A9DD2] text-white font-['Lato'] text-xl font-bold rounded-3xl transition-all duration-200 hover:scale-105 shadow-2xl shadow-[#7EC8E3]/50 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                                >
                                    Dalej! 🎯
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

{:else if currentStep === 4}
    <!-- EKRAN 4: Dane aktywności -->
    <div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] flex items-center justify-center p-6">
        <div class="max-w-5xl w-full animate-fade-in">
            <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div class="lg:w-1/2 flex justify-center lg:justify-end">
                    <img 
                        src={olaf1} 
                        alt="Olaf the Seal" 
                        class="w-80 h-80 lg:w-96 lg:h-96 object-contain rounded-3xl"
                    />
                </div>

                <div class="lg:w-1/2 w-full">
                    <div class="bg-white rounded-3xl shadow-2xl border-[6px] border-[#A7D8F0] p-8">
                        <h2 class="font-['Lato'] text-3xl font-bold text-slate-900 mb-4 text-center">
                            Aktywność fizyczna 🏃
                        </h2>
                        <p class="font-['Lato'] text-lg text-slate-700 mb-8 text-center">
                            Ile kroków chcesz dziennie zrobić?
                        </p>
                        
                        <form onsubmit={handleActivitySubmit} class="space-y-6">
                            <div>
                                <label for="stepsGoal" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    🚶 Cel kroków
                                </label>
                                <input
                                    id="stepsGoal"
                                    type="number"
                                    bind:value={formData.stepsGoal}
                                    min="0"
                                    step="100"
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                    autofocus
                                />
                                <p class="font-['Lato'] text-base text-slate-600 mt-3 ml-2">
                                    💡 Rekomendowane: 10 000 kroków dziennie
                                </p>
                            </div>

                            <div class="flex gap-4">
                                <button
                                    type="button"
                                    onclick={prevStep}
                                    class="px-6 py-4 bg-white border-[6px] border-[#A7D8F0] text-slate-900 font-['Lato'] text-lg font-bold rounded-3xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                                >
                                    ← Wstecz
                                </button>
                                <button
                                    type="submit"
                                    class="flex-1 px-6 py-4 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] hover:from-[#6BB8D3] hover:to-[#4A9DD2] text-white font-['Lato'] text-xl font-bold rounded-3xl transition-all duration-200 hover:scale-105 shadow-2xl shadow-[#7EC8E3]/50 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                                >
                                    Dalej! 💪
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

{:else if currentStep === 5}
    <!-- EKRAN 5: Dane diety -->
    <div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] flex items-center justify-center p-6">
        <div class="max-w-5xl w-full animate-fade-in">
            <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div class="lg:w-1/2 flex justify-center lg:justify-end">
                    <img 
                        src={olaf2} 
                        alt="Olaf the Seal" 
                        class="w-80 h-80 lg:w-96 lg:h-96 object-contain rounded-3xl"
                    />
                </div>

                <div class="lg:w-1/2 w-full">
                    <div class="bg-white rounded-3xl shadow-2xl border-[6px] border-[#A7D8F0] p-8">
                        <h2 class="font-['Lato'] text-3xl font-bold text-slate-900 mb-4 text-center">
                            Zdrowe odżywianie 🥗
                        </h2>
                        <p class="font-['Lato'] text-lg text-slate-700 mb-8 text-center">
                            Jaki jest Twój dzienny cel kaloryczny?
                        </p>
                        
                        <form onsubmit={handleDietSubmit} class="space-y-6">
                            <div>
                                <label for="caloriesGoal" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    🍎 Cel kalorii
                                </label>
                                <input
                                    id="caloriesGoal"
                                    type="number"
                                    bind:value={formData.caloriesGoal}
                                    min="0"
                                    step="50"
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                    autofocus
                                />
                                <p class="font-['Lato'] text-base text-slate-600 mt-3 ml-2">
                                    💡 Średnia dla dorosłych: 2000-2500 kcal dziennie
                                </p>
                            </div>

                            <div class="flex gap-4">
                                <button
                                    type="button"
                                    onclick={prevStep}
                                    class="px-6 py-4 bg-white border-[6px] border-[#A7D8F0] text-slate-900 font-['Lato'] text-lg font-bold rounded-3xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                                >
                                    ← Wstecz
                                </button>
                                <button
                                    type="submit"
                                    class="flex-1 px-6 py-4 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] hover:from-[#6BB8D3] hover:to-[#4A9DD2] text-white font-['Lato'] text-xl font-bold rounded-3xl transition-all duration-200 hover:scale-105 shadow-2xl shadow-[#7EC8E3]/50 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                                >
                                    Dalej! 🥕
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

{:else if currentStep === 6}
    <!-- EKRAN 6: Dane snu -->
    <div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] flex items-center justify-center p-6">
        <div class="max-w-5xl w-full animate-fade-in">
            <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div class="lg:w-1/2 flex justify-center lg:justify-end">
                    <img 
                        src={olaf1} 
                        alt="Olaf the Seal" 
                        class="w-80 h-80 lg:w-96 lg:h-96 object-contain rounded-3xl"
                    />
                </div>

                <div class="lg:w-1/2 w-full">
                    <div class="bg-white rounded-3xl shadow-2xl border-[6px] border-[#A7D8F0] p-8">
                        <h2 class="font-['Lato'] text-3xl font-bold text-slate-900 mb-4 text-center">
                            Regeneracja 😴
                        </h2>
                        <p class="font-['Lato'] text-lg text-slate-700 mb-8 text-center">
                            Ile godzin snu potrzebujesz?
                        </p>
                        
                        <form onsubmit={handleSleepSubmit} class="space-y-6">
                            <div>
                                <label for="amountOfHours" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    🌙 Cel godzin snu
                                </label>
                                <input
                                    id="amountOfHours"
                                    type="number"
                                    bind:value={formData.amountOfHours}
                                    min="0"
                                    max="12"
                                    step="0.5"
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                    autofocus
                                />
                                <p class="font-['Lato'] text-base text-slate-600 mt-3 ml-2">
                                    💡 Rekomendowane: 7-9 godzin dla dorosłych
                                </p>
                            </div>

                            <div class="flex gap-4">
                                <button
                                    type="button"
                                    onclick={prevStep}
                                    class="px-6 py-4 bg-white border-[6px] border-[#A7D8F0] text-slate-900 font-['Lato'] text-lg font-bold rounded-3xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                                >
                                    ← Wstecz
                                </button>
                                <button
                                    type="submit"
                                    class="flex-1 px-6 py-4 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] hover:from-[#6BB8D3] hover:to-[#4A9DD2] text-white font-['Lato'] text-xl font-bold rounded-3xl transition-all duration-200 hover:scale-105 shadow-2xl shadow-[#7EC8E3]/50 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                                >
                                    Zacznij swoją przygodę! 🚀
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}

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

