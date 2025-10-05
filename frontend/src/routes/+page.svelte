<script lang="ts">
    import { goto } from '$app/navigation';
    // Nowe Olaf GIF-y: olaf2 (machający) na ekranie 1, olaf1 (spokojny) na ekranie 2
    import olaf2 from '$lib/assets/gif/olaf2.gif';
    import olaf1 from '$lib/assets/gif/olaf1.gif';
    
    // Step management
    let currentStep = $state(1); // 1 = welcome, 2 = form
    
    // Form data based on amountOfHours schema
    // Tylko kroki i minuty aktywności - prosty, przejrzysty formularz dla osób neuroatypowych
    let formData = $state({
        stepsGoal: 8000,
        amountOfHours: 8,
    });
    
    function goToStep2() {
        currentStep = 2;
    }
    
    function handleSubmit(e: Event) {
        e.preventDefault();
        console.log('Activity Goal:', {
            ...formData,
            dateSet: new Date(),
        });
        // Redirect to app
        goto('/app');
    }
</script>

<svelte:head>
    <title>Seal Your Habits - Witaj!</title>
</svelte:head>

{#if currentStep === 1}
    <!-- 
        EKRAN 1: Ekran powitalny
        DESIGN DLA NEUROATYPOWYCH (ADHD, Autyzm, Dysleksja):
        ✓ Pastele (łagodne dla oczu, redukują zmęczenie wzrokowe)
        ✓ Duży kontrast tekstu (WCAG AAA - slate-800/900 na białym)
        ✓ Zaokrąglenia (rounded-full = spokojne, nie agresywne)
        ✓ Duże odstępy (mb-12, mt-10 = czas na przetworzenie informacji)
        ✓ Jeden fokus na raz (tylko Olaf + komunikat)
        ✓ Przewidywalna animacja (bounce-gentle, nie chaotyczna)
        ✓ Wyraźny focus ring (6px grubości = widoczny dla wszystkich)
    -->
    <div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] flex items-center justify-center p-8">
        <div class="flex flex-col items-center animate-fade-in">
            <!-- Speech Bubble - NA GÓRZE (naturalna kolejność czytania) -->
            <div class="relative mb-12 animate-bounce-gentle">
                <div class="bg-white px-12 py-6 rounded-full shadow-2xl border-[6px] border-sky-400 max-w-lg">
                    <p class="font-['Lato'] text-3xl font-bold text-slate-900 text-center leading-relaxed">
                        Cześć! Jestem Olaf! 👋
                    </p>
                    <p class="font-['Lato'] text-xl font-semibold text-slate-800 mt-4 text-center leading-relaxed">
                        Witam Cię w bezpiecznym miejscu,<br/>
                        gdzie możesz być sobą!
                    </p>
                    <!-- Bubble tail -->
                    <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-white border-b-[6px] border-r-[6px] border-sky-400 transform rotate-45"></div>
                </div>
            </div>
            
            <!-- Olaf GIF - clickable z wyraźnym focus -->
            <button 
                onclick={goToStep2}
                class="hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-[6px] focus:ring-sky-500 rounded-3xl"
                aria-label="Kliknij Olafa aby przejść dalej"
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
{:else}
    <!-- 
        EKRAN 2: Formularz z celami aktywności
        DESIGN DLA NEUROATYPOWYCH (ADHD, Autyzm, Dysleksja):
        ✓ Tylko 2 pola (kroki + minuty) - nie przytłacza ilością informacji
        ✓ Duże inputy (py-4, text-xl) - łatwe kliknięcie i wpisanie
        ✓ Wyraźne labele z emoji - wizualna pomoc w identyfikacji
        ✓ Wysokie kontrasty (WCAG AAA) - slate-900 na białym
        ✓ Grube bordery (6px) - wyraźne granice elementów
        ✓ Wielki focus ring (6px) - jasno widać gdzie jesteś
        ✓ Duże odstępy (space-y-6) - czas na przetworzenie każdego pola
        ✓ Podpowiedzi pod inputami - jasne oczekiwania
        ✓ Zaokrąglenia (rounded-3xl) - spokojne, przyjazne kształty
        ✓ Jeden wyraźny przycisk akcji
    -->
    <div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] flex items-center justify-center p-6">
        <div class="max-w-5xl w-full animate-fade-in">
            <!-- Layout: Olaf po lewej (duży), Formularz po prawej -->
            <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <!-- Olaf GIF 1 (spokojny) - DUŻY po lewej -->
                <div class="lg:w-1/2 flex justify-center lg:justify-end">
                    <img 
                        src={olaf1} 
                        alt="Olaf the Seal czeka na Twoje cele" 
                        class="w-80 h-80 lg:w-96 lg:h-96 object-contain rounded-3xl "
                    />
                </div>

                <!-- Activity Goal Form - po prawej -->
                <div class="lg:w-1/2 w-full">
                    <div class="bg-white rounded-3xl shadow-2xl border-[6px] border-[#A7D8F0] p-6">
                <h2 class="font-['Lato'] text-3xl font-bold text-slate-900 mb-2 text-center">
                    Świetnie! 🎉
                </h2>
                <p class="font-['Lato'] text-lg text-slate-700 mb-5 text-center">
                    Ustaw swoje dzienne cele
                </p>
                
                <form onsubmit={handleSubmit} class="space-y-5">
                    <!-- Steps Goal -->
                    <div>
                        <label for="stepsGoal" class="block font-['Lato'] text-xl font-bold text-slate-900 mb-2">
                            🚶 Cel kroków
                        </label>
                        <input
                            id="stepsGoal"
                            type="number"
                            bind:value={formData.stepsGoal}
                            min="0"
                            step="100"
                            class="w-full px-4 py-3 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-lg text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                            required
                            aria-describedby="steps-hint"
                        />
                        <p id="steps-hint" class="font-['Lato'] text-sm text-slate-600 mt-1.5 ml-2">
                            np. 10000
                        </p>
                    </div>

                    <!-- Activity Goal (minutes) -->
                    <div>
                        <label for="amountOfHours" class="block font-['Lato'] text-xl font-bold text-slate-900 mb-2">
                            ⏱️ Cel godzin snu
                        </label>
                        <input
                            id="amountOfHours"
                            type="number"
                            bind:value={formData.amountOfHours}
                            min="0"
                            step="1"
                            max="12"
                            class="w-full px-4 py-3 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-lg text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                            required
                            aria-describedby="activity-hint"
                        />
                        <p id="activity-hint" class="font-['Lato'] text-sm text-slate-600 mt-1.5 ml-2">
                            np. 8
                        </p>
                    </div>

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        class="w-full px-6 py-4 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] hover:from-[#6BB8D3] hover:to-[#4A9DD2] text-white font-['Lato'] text-xl font-bold rounded-3xl transition-all duration-200 hover:scale-105 shadow-2xl shadow-[#7EC8E3]/50 mt-6 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                    >
                        🎯 Zapisz!
                    </button>
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
    
    @keyframes bounce-gentle {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-15px);
        }
    }
    
    .animate-fade-in {
        animation: fade-in 0.6s ease-out;
    }
    
    .animate-bounce-gentle {
        animation: bounce-gentle 2s ease-in-out infinite;
    }
    
</style>

