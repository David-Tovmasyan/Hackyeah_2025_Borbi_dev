<script lang="ts">
    import { goto } from '$app/navigation';
    import { createUser, type OnboardingData } from '$lib/api';
    import { setUser } from '$lib/stores/user';
    // Nowe Olaf GIF-y: olaf2 (machający) na ekranie 1, olaf1 (spokojny) na ekranie 2
    import olaf2 from '$lib/assets/gif/olaf2.gif';
    import olaf1 from '$lib/assets/gif/olaf1.gif';
    
    // Step management - 6 kroków onboardingu
    let currentStep = $state(1); // 1-6
    
    // Form data - zebrane dane użytkownika
    let formData = $state({
        // Krok 1: Imię
        name: '',
        
        // Krok 2: Aktywność fizyczna - obecny poziom
        currentSteps: '',
        
        // Krok 3: Cel kroków
        stepsGoal: 10000,
        
        // Krok 4: Regularność jedzenia
        eatingRegularity: '', // irregular, sometimes, mostly, regular, planned
        
        // Krok 5: Posiłki
        meals: [],
        
        // Krok 6: Sen - regularność
        sleepRegularity: '', // irregular, mostly-regular, regular, very-regular, shift-work
        
        // Krok 7: Nawodnienie
        waterGoal: 8,
        
        // Krok 8: Cele kaloryczne
        caloriesGoal: 2000,
        
        // Krok 9: Problemy zdrowotne
        medicalConcerns: [],
        
        // Krok 10: Motywacja
        motivation: '',
        
        // Krok 11: Preferencje powiadomień
        notifications: {
            meals: false,
            water: false,
            activity: false,
            sleep: false
        },
        
        // Krok 12: Podsumowanie
        // - ostateczne potwierdzenie
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
    
    async function handleSleepSubmit(e: Event) {
        e.preventDefault();
        
        try {
            console.log('Sending onboarding data:', formData);
            
            // Wysyłamy dane do API (lub mock)
            const response = await createUser(formData as OnboardingData);
            console.log('User created successfully:', response);
            
            // Ustawiamy nowego użytkownika w store
            if (response.user) {
                const newUser = {
                    id: response.user.id,
                    username: response.user.username || formData.name,
                    hp: response.user.hp || 100,
                    xp: response.user.xp || 0,
                    spentPrestige: response.user.spentPrestige || 0,
                    level: Math.floor((response.user.xp || 0) / 200) + 1,
                    streak: 1, // Nowy użytkownik zaczyna z 1 dniem
                    dailyProgress: {
                        steps: 0,
                        stepsGoal: formData.stepsGoal,
                        water: 0,
                        waterGoal: formData.waterGoal || 8,
                        meals: 0,
                        mealsGoal: 3
                    }
                };
                
                setUser(newUser);
            }
            
            goto('/app');
        } catch (error) {
            console.error('Failed to create user:', error);
            // In case of error, we can show a message or try again
            alert('An error occurred while saving data. Please try again.');
        }
    }
</script>

<svelte:head>
        <title>Seal Your Habits - Welcome!</title>
</svelte:head>

{#if currentStep === 1}
    <!-- EKRAN 1: Przywitanie użytkownika -->
    <div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] flex items-center justify-center p-8">
        <div class="flex flex-col items-center animate-fade-in">
            <div class="relative mb-12">
                <div class="bg-white px-12 py-6 rounded-3xl shadow-2xl border-[6px] border-[#A7D8F0] max-w-lg">
                    <p class="font-['Lato'] text-3xl font-bold text-slate-900 text-center leading-relaxed">
                        Hi! I'm Olaf! 👋
                    </p>
                    <p class="font-['Lato'] text-xl font-semibold text-slate-800 mt-4 text-center leading-relaxed">
                        Welcome to a safe place,<br/>
                        where you can be yourself!
                    </p>
                    <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-white border-b-[6px] border-r-[6px] border-[#A7D8F0] transform rotate-45"></div>
                </div>
            </div>
            
            <button 
                onclick={nextStep}
                class="hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-[6px] focus:ring-[#7EC8E3] rounded-3xl"
                aria-label="Click Olaf to continue"
            >
                <img 
                    src={olaf2} 
                    alt="Olaf the Seal - Click me!" 
                    class="w-80 h-80 object-contain rounded-3xl"
                />
            </button>
            
            <p class="font-['Lato'] text-xl font-bold text-slate-700 mt-8 animate-pulse">
                👆 Click me! 
            </p>
            
            <!-- Przycisk logowania -->
            <div class="mt-8">
                <a 
                    href="/login"
                    class="inline-block px-6 py-3 bg-white/80 border-[4px] border-[#A7D8F0] text-slate-900 font-['Lato'] text-lg font-bold rounded-3xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-[6px] focus:ring-[#7EC8E3] shadow-lg"
                >
                    🔑 Already have an account? Log in
                </a>
            </div>
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
                                    <h3 class="font-['Lato'] text-xl font-bold text-slate-900 mb-2">Track your goals</h3>
                                    <p class="font-['Lato'] text-lg text-slate-700">Monitor activity, diet and sleep in one place</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start gap-4">
                                <span class="text-4xl">📊</span>
                                <div>
                                    <h3 class="font-['Lato'] text-xl font-bold text-slate-900 mb-2">Build habits</h3>
                                    <p class="font-['Lato'] text-lg text-slate-700">Build positive routines step by step</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start gap-4">
                                <span class="text-4xl">🏆</span>
                                <div>
                                    <h3 class="font-['Lato'] text-xl font-bold text-slate-900 mb-2">Unlock Achievements</h3>
                                    <p class="font-['Lato'] text-lg text-slate-700">Celebrate your success with Olaf!</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onclick={nextStep}
                            class="w-full px-6 py-4 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] hover:from-[#6BB8D3] hover:to-[#4A9DD2] text-white font-['Lato'] text-xl font-bold rounded-3xl transition-all duration-200 hover:scale-105 shadow-2xl shadow-[#7EC8E3]/50 mt-8 focus:outline-none focus:ring-[#6px] focus:ring-[#A7D8F0]"
                        >
                            Next! 🚀
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
                            What should I call you?
                        </p>
                        
                        <form onsubmit={handleNameSubmit} class="space-y-6">
                            <!-- svelte-ignore element_implicitly_closed -->
                            <div>
                                <label for="name" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    👤 Your name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    bind:value={formData.name}
                                    placeholder="For example, John"
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                />
                            <div class="flex gap-4 mt-6">
                                <button
                                    type="button"
                                    onclick={prevStep}
                                    class="px-6 py-4 bg-white border-[6px] border-[#A7D8F0] text-slate-900 font-['Lato'] text-lg font-bold rounded-3xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="submit"
                                    class="flex-1 px-6 py-4 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] hover:from-[#6BB8D3] hover:to-[#4A9DD2] text-white font-['Lato'] text-xl font-bold rounded-3xl transition-all duration-200 hover:scale-105 shadow-2xl shadow-[#7EC8E3]/50 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                                >
                                    Next! 🎯
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
                            Physical activity 🏃
                        </h2>
                        <p class="font-['Lato'] text-lg text-slate-700 mb-8 text-center">
                            How many steps do you want to take daily?
                        </p>
                        
                        <form onsubmit={handleActivitySubmit} class="space-y-6">
                            <!-- svelte-ignore element_implicitly_closed -->
                            <div>
                                <!-- svelte-ignore element_implicitly_closed -->
                                <label for="stepsGoal" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                            <div>
                                <label for="stepsGoal" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    🚶 Steps goal
                                </label>
                                <input
                                    id="stepsGoal"
                                    type="number"
                                    bind:value={formData.stepsGoal}
                                    min="0"
                                    step="100"
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                />
                            </div>

                            <div class="flex gap-4 mt-6">
                                <button
                                    type="button"
                                    onclick={prevStep}
                                    class="px-6 py-4 bg-white border-[6px] border-[#A7D8F0] text-slate-900 font-['Lato'] text-lg font-bold rounded-3xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="submit"
                                    class="flex-1 px-6 py-4 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] hover:from-[#6BB8D3] hover:to-[#4A9DD2] text-white font-['Lato'] text-xl font-bold rounded-3xl transition-all duration-200 hover:scale-105 shadow-2xl shadow-[#7EC8E3]/50 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                                >
                                    Next! 💪
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
                            Healthy Eating 🥗
                        </h2>
                        <p class="font-['Lato'] text-lg text-slate-700 mb-8 text-center">
                            How regularly do you eat?
                        </p>
                        
                        <form onsubmit={handleDietSubmit} class="space-y-6">
                            <div>
                                <label for="eatingRegularity" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    🍽️ Meal Regularity
                                </label>
                                <select
                                    id="eatingRegularity"
                                    bind:value={formData.eatingRegularity}
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                >
                                    <option value="">Choose an option...</option>
                                    <option value="irregular">Irregularly - I eat when I remember</option>
                                    <option value="sometimes">Sometimes regularly - depends on the day</option>
                                    <option value="mostly">Mostly regularly - 2-3 meals daily</option>
                                    <option value="regular">Very regularly - fixed meal times</option>
                                    <option value="planned">I have a detailed meal plan</option>
                                </select>
                                <p class="font-['Lato'] text-base text-slate-600 mt-3 ml-2">
                                    💡 We'll help you establish a regular meal schedule!
                                </p>
                            </div>

                            <div class="flex gap-4">
                                <button
                                    type="button"
                                    onclick={prevStep}
                                    class="px-6 py-4 bg-white border-[6px] border-[#A7D8F0] text-slate-900 font-['Lato'] text-lg font-bold rounded-3xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="submit"
                                    class="flex-1 px-6 py-4 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] hover:from-[#6BB8D3] hover:to-[#4A9DD2] text-white font-['Lato'] text-xl font-bold rounded-3xl transition-all duration-200 hover:scale-105 shadow-2xl shadow-[#7EC8E3]/50 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                                >
                                    Next! 🥕
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
                            Rest & Recovery 😴
                        </h2>
                        <p class="font-['Lato'] text-lg text-slate-700 mb-8 text-center">
                            What's your sleep rhythm?
                        </p>
                        
                        <form onsubmit={handleSleepSubmit} class="space-y-6">
                            <div>
                                <label for="sleepRegularity" class="block font-['Lato'] text-2xl font-bold text-slate-900 mb-3">
                                    🌙 Sleep Regularity
                                </label>
                                <select
                                    id="sleepRegularity"
                                    bind:value={formData.sleepRegularity}
                                    class="w-full px-6 py-4 border-[6px] border-[#B5E3FF] rounded-3xl font-['Lato'] text-xl text-slate-900 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all bg-[#F0F9FF]"
                                    required
                                >
                                    <option value="">Choose an option...</option>
                                    <option value="irregular">Irregularly - different hours every day</option>
                                    <option value="mostly-regular">Fairly regularly - similar hours during the week</option>
                                    <option value="regular">Regularly - fixed bedtime</option>
                                    <option value="very-regular">Very regularly - always at the same time</option>
                                    <option value="shift-work">Shift work - variable hours due to work</option>
                                </select>
                                <p class="font-['Lato'] text-base text-slate-600 mt-3 ml-2">
                                    💡 We'll help you establish an ideal sleep schedule!
                                </p>
                            </div>

                            <div class="flex gap-4">
                                <button
                                    type="button"
                                    onclick={prevStep}
                                    class="px-6 py-4 bg-white border-[6px] border-[#A7D8F0] text-slate-900 font-['Lato'] text-lg font-bold rounded-3xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]"
                                >
                                    ← Back
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

