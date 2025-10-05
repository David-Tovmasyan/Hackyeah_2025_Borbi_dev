<script lang="ts">
    import { goto } from '$app/navigation';
    // Nowe Olaf GIF-y: olaf2 (machający) na ekranie 1, olaf1 (spokojny) na ekranie 2
    import olaf2 from '$lib/assets/gif/olaf2.gif';
    import olaf1 from '$lib/assets/gif/olaf1.gif';
    
    // Step management - rozszerzony onboarding
    let currentStep = $state(1); // 1-12
    
    // Form data - zebrane dane użytkownika
    let formData = $state({
        name: '',
        // Aktywność
        currentSteps: 0, // obecna średnia kroków dziennie
        stepsGoal: 10000,
        activityTime: 30, // minuty dziennie
        // Dieta
        mealsCount: 3, // 3-5 posiłków
        mealInterval: 3, // godziny między posiłkami
        meals: [
            { name: 'Śniadanie', notes: '', time: '08:00' },
            { name: 'Obiad', notes: '', time: '13:00' },
            { name: 'Kolacja', notes: '', time: '19:00' }
        ],
        // Sen
        bedTime: '22:00',
        sleepHours: 8,
    });
    
    function nextStep() {
        if (currentStep < 12) {
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
        nextStep();
    }
    
    function handleActivityDetailSubmit(e: Event) {
        e.preventDefault();
        nextStep();
    }
    
    function handleMealsSetupSubmit(e: Event) {
        e.preventDefault();
        // Generuj posiłki na podstawie liczby
        generateMeals();
        nextStep();
    }
    
    function handleMealsDetailsSubmit(e: Event) {
        e.preventDefault();
        nextStep();
    }
    
    function handleSleepDetailSubmit(e: Event) {
        e.preventDefault();
        nextStep();
    }
    
    function handleReadyConfirm(e: Event) {
        e.preventDefault();
        console.log('Onboarding Complete:', formData);
        goto('/app');
    }
    
    function generateMeals() {
        const mealNames = ['Śniadanie', 'Drugie śniadanie', 'Obiad', 'Podwieczorek', 'Kolacja'];
        const startHour = 7;
        
        formData.meals = [];
        for (let i = 0; i < formData.mealsCount; i++) {
            const hour = startHour + (i * formData.mealInterval);
            const timeStr = `${hour.toString().padStart(2, '0')}:00`;
            
            formData.meals.push({
                name: mealNames[i] || `Posiłek ${i + 1}`,
                notes: '',
                time: timeStr
            });
        }
    }
    
    function addMeal() {
        if (formData.meals.length < 5) {
            const lastMealTime = formData.meals[formData.meals.length - 1]?.time || '18:00';
            const [hours, minutes] = lastMealTime.split(':').map(Number);
            const newHour = (hours + formData.mealInterval) % 24;
            const newTime = `${newHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            
            formData.meals.push({
                name: `Posiłek ${formData.meals.length + 1}`,
                notes: '',
                time: newTime
            });
            formData.mealsCount = formData.meals.length;
        }
    }
    
    function removeMeal(index: number) {
        if (formData.meals.length > 3) {
            formData.meals.splice(index, 1);
            formData.mealsCount = formData.meals.length;
        }
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
                            Ile kroków robisz teraz średnio dziennie?
                        </p>
                        
                        <form onsubmit={handleActivitySubmit} class="space-y-6">
                            <div>
                                <label for="currentSteps" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    👣 Obecna średnia kroków dziennie
                                </label>
                                <input
                                    id="currentSteps"
                                    type="number"
                                    bind:value={formData.currentSteps}
                                    min="0"
                                    step="100"
                                    placeholder="np. 5000, 8000, 12000..."
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                />
                                <p class="font-['Lato'] text-base text-slate-600 mt-3 ml-2">
                                    💡 Jeśli nie wiesz dokładnie, podaj przybliżoną liczbę. Możesz sprawdzić w telefonie!
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
                            Jak wygląda Twoje odżywianie?
                        </p>
                        
                        <form onsubmit={handleDietSubmit} class="space-y-6">
                            <div>
                                <label for="eatingHabits" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    🍽️ Jak często jesz?
                                </label>
                                <select
                                    id="eatingHabits"
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                >
                                    <option value="">Wybierz opcję...</option>
                                    <option value="irregular">Nieregularnie, jak się przypomnę</option>
                                    <option value="basic">3 podstawowe posiłki dziennie</option>
                                    <option value="frequent">Często, małe porcje</option>
                                    <option value="planned">Mam zaplanowane posiłki</option>
                                </select>
                                <p class="font-['Lato'] text-base text-slate-600 mt-3 ml-2">
                                    💡 Pomżemy Ci zaplanować regularne posiłki!
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
                            Jak wygląda Twój sen?
                        </p>
                        
                        <form onsubmit={handleSleepSubmit} class="space-y-6">
                            <div>
                                <label for="sleepQuality" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    🌙 Jak śpisz?
                                </label>
                                <select
                                    id="sleepQuality"
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                >
                                    <option value="">Wybierz opcję...</option>
                                    <option value="poor">Słabo, mam problemy z zasypianiem</option>
                                    <option value="irregular">Nieregularnie, różne pory</option>
                                    <option value="ok">W porządku, ale mogłoby być lepiej</option>
                                    <option value="good">Dobrze, mam regularne godziny</option>
                                </select>
                                <p class="font-['Lato'] text-base text-slate-600 mt-3 ml-2">
                                    💡 Pomżemy Ci ustalić idealny harmonogram snu!
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
                                    Dalej! 😴
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

{:else if currentStep === 7}
    <!-- EKRAN 7: Szczegóły aktywności -->
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
                            Więcej o aktywności 🏃‍♂️
                        </h2>
                        <p class="font-['Lato'] text-lg text-slate-700 mb-8 text-center">
                            Uzupełnij szczegóły swojej aktywności fizycznej
                        </p>
                        
                        <form onsubmit={handleActivityDetailSubmit} class="space-y-6">
                            <div>
                                <label for="stepsGoal" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    👣 Cel dziennych kroków
                                </label>
                                <input
                                    id="stepsGoal"
                                    type="number"
                                    bind:value={formData.stepsGoal}
                                    min="1000"
                                    step="500"
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                />
                                <p class="font-['Lato'] text-base text-slate-600 mt-2 ml-2">
                                    💡 Rekomendowane: 8000-12000 kroków dziennie
                                </p>
                            </div>

                            <div>
                                <label for="activityTime" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    ⏱️ Czas aktywności ruchowej (minuty)
                                </label>
                                <input
                                    id="activityTime"
                                    type="number"
                                    bind:value={formData.activityTime}
                                    min="10"
                                    max="180"
                                    step="5"
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                />
                                <p class="font-['Lato'] text-base text-slate-600 mt-2 ml-2">
                                    💡 WHO rekomenduje minimum 150 minut tygodniowo (~30 min/dzień)
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
                                    Dalej! 🏃‍♂️
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

{:else if currentStep === 8}
    <!-- EKRAN 8: Setup posiłków -->
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
                            Plan posiłków 🍽️
                        </h2>
                        <p class="font-['Lato'] text-lg text-slate-700 mb-8 text-center">
                            Zaplanujmy Twoje codzienne posiłki
                        </p>
                        
                        <form onsubmit={handleMealsSetupSubmit} class="space-y-6">
                            <div>
                                <label for="mealsCount" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    🥘 Liczba posiłków dziennie
                                </label>
                                <select
                                    id="mealsCount"
                                    bind:value={formData.mealsCount}
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                >
                                    <option value={3}>3 posiłki</option>
                                    <option value={4}>4 posiłki</option>
                                    <option value={5}>5 posiłków</option>
                                </select>
                                <p class="font-['Lato'] text-base text-slate-600 mt-2 ml-2">
                                    💡 Regularne posiłki pomagają utrzymać stały poziom energii
                                </p>
                            </div>

                            <div>
                                <label for="mealInterval" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    ⏰ Interwał między posiłkami (godziny)
                                </label>
                                <select
                                    id="mealInterval"
                                    bind:value={formData.mealInterval}
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                >
                                    <option value={2}>Co 2 godziny</option>
                                    <option value={3}>Co 3 godziny</option>
                                    <option value={4}>Co 4 godziny</option>
                                    <option value={5}>Co 5 godzin</option>
                                </select>
                                <p class="font-['Lato'] text-base text-slate-600 mt-2 ml-2">
                                    💡 Rekomendowane: co 3-4 godziny dla optymalnego trawienia
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
                                    Generuj plan! 🍽️
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

{:else if currentStep === 9}
    <!-- EKRAN 9: Szczegóły posiłków -->
    <div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] flex items-center justify-center p-6">
        <div class="max-w-6xl w-full animate-fade-in">
            <div class="bg-white rounded-3xl shadow-2xl border-[6px] border-[#A7D8F0] p-8">
                <h2 class="font-['Lato'] text-3xl font-bold text-slate-900 mb-4 text-center">
                    Twoje posiłki 📝
                </h2>
                <p class="font-['Lato'] text-lg text-slate-700 mb-8 text-center">
                    Dostosuj nazwy i dodaj notatki do swoich posiłków
                </p>
                
                <form onsubmit={handleMealsDetailsSubmit} class="space-y-6">
                    {#each formData.meals as meal, index}
                        <div class="bg-[#F0F9FF] rounded-2xl p-6 border-[4px] border-[#B5E3FF] hover:border-[#7EC8E3] transition-colors duration-200">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="font-['Lato'] text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <span class="text-2xl">🍽️</span>
                                    Posiłek {index + 1} - {meal.time}
                                </h3>
                                {#if formData.meals.length > 3}
                                    <button
                                        type="button"
                                        onclick={() => removeMeal(index)}
                                        class="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-[4px] focus:ring-red-300"
                                        aria-label="Usuń posiłek"
                                    >
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                {/if}
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="meal-name-{index}" class="block font-['Lato'] text-lg font-bold text-slate-900 mb-2">
                                        📛 Nazwa posiłku
                                    </label>
                                    <input
                                        id="meal-name-{index}"
                                        type="text"
                                        bind:value={meal.name}
                                        class="w-full px-4 py-3 border-[4px] border-[#A7D8F0] rounded-2xl font-['Lato'] text-lg text-slate-900 focus:outline-none focus:ring-[4px] focus:ring-[#7EC8E3] focus:border-[#7EC8E3] transition-all bg-white"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label for="meal-time-{index}" class="block font-['Lato'] text-lg font-bold text-slate-900 mb-2">
                                        ⏰ Godzina
                                    </label>
                                    <input
                                        id="meal-time-{index}"
                                        type="time"
                                        bind:value={meal.time}
                                        class="w-full px-4 py-3 border-[4px] border-[#A7D8F0] rounded-2xl font-['Lato'] text-lg text-slate-900 focus:outline-none focus:ring-[4px] focus:ring-[#7EC8E3] focus:border-[#7EC8E3] transition-all bg-white"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div class="mt-4">
                                <label for="meal-notes-{index}" class="block font-['Lato'] text-lg font-bold text-slate-900 mb-2">
                                    📝 Notatki (opcjonalne)
                                </label>
                                <textarea
                                    id="meal-notes-{index}"
                                    bind:value={meal.notes}
                                    rows="2"
                                    class="w-full px-4 py-3 border-[4px] border-[#A7D8F0] rounded-2xl font-['Lato'] text-base text-slate-900 focus:outline-none focus:ring-[4px] focus:ring-[#7EC8E3] focus:border-[#7EC8E3] transition-all bg-white resize-none"
                                    placeholder="np. sałatka z kurczakiem, owsianka z owocami..."
                                ></textarea>
                            </div>
                        </div>
                    {/each}
                    
                    {#if formData.meals.length < 5}
                        <button
                            type="button"
                            onclick={addMeal}
                            class="w-full py-4 border-[4px] border-dashed border-[#B5E3FF] rounded-2xl font-['Lato'] text-lg font-bold text-slate-600 hover:border-[#7EC8E3] hover:text-slate-800 hover:bg-[#F0F9FF] transition-all duration-200 focus:outline-none focus:ring-[4px] focus:ring-[#7EC8E3]"
                        >
                            ➕ Dodaj kolejny posiłek
                        </button>
                    {/if}

                    <div class="flex gap-4 pt-6 border-t-[4px] border-[#B5E3FF]">
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
                            Dalej! 🥗
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

{:else if currentStep === 10}
    <!-- EKRAN 10: Szczegóły snu -->
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
                            Plan snu 🌙
                        </h2>
                        <p class="font-['Lato'] text-lg text-slate-700 mb-8 text-center">
                            Zaplanuj swój harmonogram snu
                        </p>
                        
                        <form onsubmit={handleSleepDetailSubmit} class="space-y-6">
                            <div>
                                <label for="bedTime" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    🛏️ Godzina pójścia spać
                                </label>
                                <input
                                    id="bedTime"
                                    type="time"
                                    bind:value={formData.bedTime}
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                />
                                <p class="font-['Lato'] text-base text-slate-600 mt-2 ml-2">
                                    💡 Regularna pora snu pomaga w lepszej regeneracji
                                </p>
                            </div>

                            <div>
                                <label for="sleepHours" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    ⏰ Docelowa ilość snu (godziny)
                                </label>
                                <input
                                    id="sleepHours"
                                    type="number"
                                    bind:value={formData.sleepHours}
                                    min="6"
                                    max="12"
                                    step="0.5"
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                />
                                <p class="font-['Lato'] text-base text-slate-600 mt-2 ml-2">
                                    💡 Rekomendowane: 7-9 godzin dla optymalnej regeneracji
                                </p>
                            </div>

                            <div class="p-4 bg-[#F0F9FF] rounded-2xl border-[4px] border-[#B5E3FF]">
                                <p class="font-['Lato'] text-lg font-semibold text-slate-900 mb-2">
                                    🌅 Twój plan snu:
                                </p>
                                <p class="font-['Lato'] text-base text-slate-700">
                                    Pójście spać: <strong>{formData.bedTime}</strong><br/>
                                    Sen przez: <strong>{formData.sleepHours} godzin</strong><br/>
                                    Pobudka około: <strong>{(() => {
                                        const [hours, minutes] = formData.bedTime.split(':').map(Number);
                                        const wakeTime = new Date();
                                        wakeTime.setHours(hours + formData.sleepHours);
                                        wakeTime.setMinutes(minutes);
                                        return wakeTime.toLocaleTimeString('pl-PL', {hour: '2-digit', minute: '2-digit'});
                                    })()}</strong>
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
                                    Dalej! 🌙
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

{:else if currentStep === 11}
    <!-- EKRAN 11: Podsumowanie -->
    <div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] flex items-center justify-center p-6">
        <div class="max-w-5xl w-full animate-fade-in">
            <div class="bg-white rounded-3xl shadow-2xl border-[6px] border-[#A7D8F0] p-8">
                <h2 class="font-['Lato'] text-4xl font-bold text-slate-900 mb-6 text-center">
                    Twój osobisty plan! 🎯
                </h2>
                <p class="font-['Lato'] text-xl text-slate-700 mb-8 text-center">
                    Oto podsumowanie Twoich celów, {formData.name}!
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <!-- Aktywność -->
                    <div class="bg-[#F0F9FF] rounded-2xl p-6 border-[4px] border-[#B5E3FF] text-center">
                        <div class="text-4xl mb-3">🏃‍♂️</div>
                        <h3 class="font-['Lato'] text-xl font-bold text-slate-900 mb-3">Aktywność</h3>
                        <p class="font-['Lato'] text-base text-slate-700">
                            <strong>{formData.stepsGoal.toLocaleString()}</strong> kroków dziennie<br/>
                            <strong>{formData.activityTime}</strong> minut ćwiczeń
                        </p>
                    </div>
                    
                    <!-- Dieta -->
                    <div class="bg-[#F0F9FF] rounded-2xl p-6 border-[4px] border-[#B5E3FF] text-center">
                        <div class="text-4xl mb-3">🍽️</div>
                        <h3 class="font-['Lato'] text-xl font-bold text-slate-900 mb-3">Dieta</h3>
                        <p class="font-['Lato'] text-base text-slate-700">
                            <strong>{formData.mealsCount}</strong> posiłków dziennie<br/>
                            Co <strong>{formData.mealInterval}</strong> godziny
                        </p>
                    </div>
                    
                    <!-- Sen -->
                    <div class="bg-[#F0F9FF] rounded-2xl p-6 border-[4px] border-[#B5E3FF] text-center">
                        <div class="text-4xl mb-3">😴</div>
                        <h3 class="font-['Lato'] text-xl font-bold text-slate-900 mb-3">Sen</h3>
                        <p class="font-['Lato'] text-base text-slate-700">
                            Spać o <strong>{formData.bedTime}</strong><br/>
                            <strong>{formData.sleepHours}</strong> godzin snu
                        </p>
                    </div>
                </div>
                
                <div class="text-center">
                    <button
                        onclick={nextStep}
                        class="px-8 py-4 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] hover:from-[#6BB8D3] hover:to-[#4A9DD2] text-white font-['Lato'] text-2xl font-bold rounded-3xl transition-all duration-200 hover:scale-105 shadow-2xl shadow-[#7EC8E3]/50 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                    >
                        Wygląda świetnie! 🚀
                    </button>
                </div>
            </div>
        </div>
    </div>

{:else if currentStep === 12}
    <!-- EKRAN 12: Gotowość na przemianę -->
    <div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] flex items-center justify-center p-6">
        <div class="max-w-5xl w-full animate-fade-in">
            <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div class="lg:w-1/2 flex justify-center lg:justify-end">
                    <div class="relative">
                        <!-- Chmurka mowy Olafa -->
                        <div class="absolute -top-24 left-1/2 -translate-x-1/2 bg-white px-8 py-4 rounded-3xl shadow-2xl border-[6px] border-[#A7D8F0] max-w-sm z-10">
                            <p class="font-['Lato'] text-lg font-bold text-slate-900 text-center leading-relaxed">
                                Czy jesteś gotowy/a na przemianę, {formData.name}? 🌟
                            </p>
                            <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-b-[6px] border-r-[6px] border-[#A7D8F0] transform rotate-45"></div>
                        </div>
                        
                        <img 
                            src={olaf2} 
                            alt="Olaf the Seal" 
                            class="w-80 h-80 lg:w-96 lg:h-96 object-contain rounded-3xl"
                        />
                    </div>
                </div>

                <div class="lg:w-1/2 w-full">
                    <div class="bg-white rounded-3xl shadow-2xl border-[6px] border-[#A7D8F0] p-8">
                        <h2 class="font-['Lato'] text-4xl font-bold text-slate-900 mb-6 text-center">
                            Twoja przygoda zaczyna się teraz! ✨
                        </h2>
                        <p class="font-['Lato'] text-xl text-slate-700 mb-8 text-center leading-relaxed">
                            Masz wszystko czego potrzebujesz, żeby zacząć budować zdrowe nawyki. 
                            Jestem tu, żeby Ci towarzyszyć w tej podróży!
                        </p>
                        
                        <div class="space-y-4 mb-8">
                            <div class="flex items-center gap-4 p-4 bg-[#F0F9FF] rounded-2xl border-[4px] border-[#B5E3FF]">
                                <span class="text-3xl">📱</span>
                                <p class="font-['Lato'] text-base text-slate-700">
                                    <strong>Śledź swoje postępy</strong> - każdy dzień to nowy krok do przodu
                                </p>
                            </div>
                            
                            <div class="flex items-center gap-4 p-4 bg-[#F0F9FF] rounded-2xl border-[4px] border-[#B5E3FF]">
                                <span class="text-3xl">🏆</span>
                                <p class="font-['Lato'] text-base text-slate-700">
                                    <strong>Odblokowuj osiągnięcia</strong> - świętuj swoje sukcesy
                                </p>
                            </div>
                            
                            <div class="flex items-center gap-4 p-4 bg-[#F0F9FF] rounded-2xl border-[4px] border-[#B5E3FF]">
                                <span class="text-3xl">💪</span>
                                <p class="font-['Lato'] text-base text-slate-700">
                                    <strong>Buduj swoją passę</strong> - każdy dzień się liczy
                                </p>
                            </div>
                        </div>
                        
                        <form onsubmit={handleReadyConfirm} class="space-y-6">
                            <div class="flex gap-4">
                                <button
                                    type="button"
                                    onclick={prevStep}
                                    class="px-6 py-4 bg-white border-[6px] border-[#A7D8F0] text-slate-900 font-['Lato'] text-lg font-bold rounded-3xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                                >
                                    ← Sprawdź jeszcze raz
                                </button>
                                <button
                                    type="submit"
                                    class="flex-1 px-8 py-5 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] hover:from-[#6BB8D3] hover:to-[#4A9DD2] text-white font-['Lato'] text-2xl font-bold rounded-3xl transition-all duration-200 hover:scale-105 shadow-2xl shadow-[#7EC8E3]/50 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] animate-pulse"
                                >
                                    TAK! Jestem gotowy/a! 🚀
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

