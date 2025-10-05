<script lang="ts">
    import olaf1 from '$lib/assets/gif/olaf1.gif';
    
    let notifications = $state(true);
    let dailyReminder = $state(true);
    let reminderTime = $state("09:00");
    let weeklyReport = $state(true);
    let soundEffects = $state(true);
    let darkMode = $state(true);
    let compactView = $state(false);
    let userName = $state("User");
    let email = $state("user@example.com");
</script>

<!-- SETTINGS PAGE z kolorami landing page -->
<div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] p-6">
    <div class="w-full max-w-4xl mx-auto space-y-6">
        <!-- Header with Olaf -->
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
                <img src={olaf1} alt="Olaf" class="w-16 h-16 object-contain rounded-full border-[4px] border-[#A7D8F0]" />
                <h1 class="font-['Lato'] text-2xl md:text-3xl font-bold text-slate-900">
                    Ustawienia ⚙️
                </h1>
            </div>

        </div>

        <!-- Account Section -->
        <div class="bg-white/90 backdrop-blur-sm border-[6px] border-[#A7D8F0] rounded-3xl p-8 space-y-6 shadow-lg shadow-[#A7D8F0]/20">
            <h2 class="font-['Lato'] text-2xl font-bold text-slate-900 flex items-center gap-3">
                <svg class="w-7 h-7 text-[#5DADE2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Konto
            </h2>

            <div class="space-y-6">
                <!-- Name -->
                <div class="space-y-3">
                    <label for="name" class="block text-lg font-bold text-slate-900">
                        👤 Wyświetlana nazwa
                    </label>
                    <input
                        id="name"
                        type="text"
                        bind:value={userName}
                        class="w-full px-6 py-4 bg-[#F0F9FF] border-[6px] border-[#B5E3FF] rounded-3xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all duration-200 font-['Lato'] text-lg"
                        placeholder="Wpisz swoje imię"
                    />
                </div>

                <!-- Email -->
                <div class="space-y-3">
                    <label for="email" class="block text-lg font-bold text-slate-900">
                        📧 Adres email
                    </label>
                    <input
                        id="email"
                        type="email"
                        bind:value={email}
                        class="w-full px-6 py-4 bg-[#F0F9FF] border-[6px] border-[#B5E3FF] rounded-3xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all duration-200 font-['Lato'] text-lg"
                        placeholder="twoj.email@przyklad.pl"
                    />
                </div>

                <!-- Save Button -->
                <button class="w-full px-6 py-4 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] hover:from-[#6BB8D3] hover:to-[#4A9DD2] text-white font-['Lato'] text-xl font-bold rounded-3xl transition-all duration-200 hover:scale-105 shadow-2xl shadow-[#7EC8E3]/50 mt-8 focus:outline-none focus:ring-[6px] focus:ring-[#A7D8F0]">
                    Zapisz zmiany 💾
                </button>
            </div>
    </div>

        <!-- Notifications Section -->
        <div class="bg-white/90 backdrop-blur-sm border-[6px] border-[#A7D8F0] rounded-3xl p-8 space-y-6 shadow-lg shadow-[#A7D8F0]/20">
            <h2 class="font-['Lato'] text-2xl font-bold text-slate-900 flex items-center gap-3">
                <svg class="w-7 h-7 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Powiadomienia
            </h2>

        <div class="space-y-4">
                <!-- Enable Notifications -->
                <div class="flex items-center justify-between p-6 bg-[#F0F9FF] rounded-2xl hover:bg-[#E8F4F8] transition-all duration-200 border-[4px] border-[#B5E3FF]">
                    <div class="space-y-2">
                        <p class="font-['Lato'] font-bold text-slate-900 text-lg">🔔 Powiadomienia push</p>
                        <p class="text-base text-slate-600">Otrzymuj powiadomienia o swoich postępach</p>
                    </div>
                    <button
                        onclick={() => notifications = !notifications}
                        aria-label="Przełącz powiadomienia"
                        class="relative w-16 h-9 rounded-full transition-all duration-200 border-[4px]"
                        class:bg-[#7EC8E3]={notifications}
                        class:border-[#5DADE2]={notifications}
                        class:bg-slate-300={!notifications}
                        class:border-slate-400={!notifications}
                    >
                        <div 
                            class="absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full transition-transform duration-200 shadow-lg"
                            class:translate-x-7={notifications}
                        ></div>
                    </button>
                </div>

                <!-- Daily Reminder -->
                <div class="flex items-center justify-between p-6 bg-[#F0F9FF] rounded-2xl hover:bg-[#E8F4F8] transition-all duration-200 border-[4px] border-[#B5E3FF]">
                    <div class="space-y-2">
                        <p class="font-['Lato'] font-bold text-slate-900 text-lg">⏰ Codzienne przypomnienie</p>
                        <p class="text-base text-slate-600">Otrzymaj przypomnienie aby sprawdzić postępy</p>
                    </div>
                    <button
                        onclick={() => dailyReminder = !dailyReminder}
                        aria-label="Przełącz codzienne przypomnienie"
                        class="relative w-16 h-9 rounded-full transition-all duration-200 border-[4px]"
                        class:bg-[#7EC8E3]={dailyReminder}
                        class:border-[#5DADE2]={dailyReminder}
                        class:bg-slate-300={!dailyReminder}
                        class:border-slate-400={!dailyReminder}
                    >
                        <div 
                            class="absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full transition-transform duration-200 shadow-lg"
                            class:translate-x-7={dailyReminder}
                        ></div>
                    </button>
                </div>

                <!-- Reminder Time -->
                {#if dailyReminder}
                    <div class="pl-6 space-y-3">
                        <label for="reminderTime" class="block text-lg font-bold text-slate-900">
                            🕕 Godzina przypomnienia
                        </label>
                        <input
                            id="reminderTime"
                            type="time"
                            bind:value={reminderTime}
                            class="px-6 py-3 bg-[#F0F9FF] border-[4px] border-[#B5E3FF] rounded-2xl text-slate-900 focus:outline-none focus:ring-[4px] focus:ring-[#A7D8F0] focus:border-[#A7D8F0] transition-all duration-200 font-['Lato'] text-lg"
                        />
                    </div>
                {/if}

                <!-- Weekly Report -->
                <div class="flex items-center justify-between p-6 bg-[#F0F9FF] rounded-2xl hover:bg-[#E8F4F8] transition-all duration-200 border-[4px] border-[#B5E3FF]">
                    <div class="space-y-2">
                        <p class="font-['Lato'] font-bold text-slate-900 text-lg">📈 Raport tygodniowy</p>
                        <p class="text-base text-slate-600">Otrzymuj podsumowanie tygodnia w każdą niedzielę</p>
                    </div>
                    <button
                        onclick={() => weeklyReport = !weeklyReport}
                        aria-label="Przełącz raport tygodniowy"
                        class="relative w-16 h-9 rounded-full transition-all duration-200 border-[4px]"
                        class:bg-[#7EC8E3]={weeklyReport}
                        class:border-[#5DADE2]={weeklyReport}
                        class:bg-slate-300={!weeklyReport}
                        class:border-slate-400={!weeklyReport}
                    >
                        <div 
                            class="absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full transition-transform duration-200 shadow-lg"
                            class:translate-x-7={weeklyReport}
                        ></div>
                    </button>
                </div>
        </div>
    </div>

        <!-- Appearance Section -->
        <div class="bg-white/90 backdrop-blur-sm border-[6px] border-[#A7D8F0] rounded-3xl p-8 space-y-6 shadow-lg shadow-[#A7D8F0]/20">
            <h2 class="font-['Lato'] text-2xl font-bold text-slate-900 flex items-center gap-3">
                <svg class="w-7 h-7 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Wygląd
            </h2>

        <div class="space-y-4">
                <!-- Sound Effects -->
                <div class="flex items-center justify-between p-6 bg-[#F0F9FF] rounded-2xl hover:bg-[#E8F4F8] transition-all duration-200 border-[4px] border-[#B5E3FF]">
                    <div class="space-y-2">
                        <p class="font-['Lato'] font-bold text-slate-900 text-lg">🔊 Efekty dźwiękowe</p>
                        <p class="text-base text-slate-600">Odtwarzaj dźwięki przy akcjach i osiągnięciach</p>
                    </div>
                    <button
                        onclick={() => soundEffects = !soundEffects}
                        aria-label="Przełącz efekty dźwiękowe"
                        class="relative w-16 h-9 rounded-full transition-all duration-200 border-[4px]"
                        class:bg-[#7EC8E3]={soundEffects}
                        class:border-[#5DADE2]={soundEffects}
                        class:bg-slate-300={!soundEffects}
                        class:border-slate-400={!soundEffects}
                    >
                        <div 
                            class="absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full transition-transform duration-200 shadow-lg"
                            class:translate-x-7={soundEffects}
                        ></div>
                    </button>
                </div>

                <!-- Compact View -->
                <div class="flex items-center justify-between p-6 bg-[#F0F9FF] rounded-2xl hover:bg-[#E8F4F8] transition-all duration-200 border-[4px] border-[#B5E3FF]">
                    <div class="space-y-2">
                        <p class="font-['Lato'] font-bold text-slate-900 text-lg">📋 Widok kompaktowy</p>
                        <p class="text-base text-slate-600">Pokaż więcej treści z mniejszymi odstępami</p>
                    </div>
                    <button
                        onclick={() => compactView = !compactView}
                        aria-label="Przełącz widok kompaktowy"
                        class="relative w-16 h-9 rounded-full transition-all duration-200 border-[4px]"
                        class:bg-[#7EC8E3]={compactView}
                        class:border-[#5DADE2]={compactView}
                        class:bg-slate-300={!compactView}
                        class:border-slate-400={!compactView}
                    >
                        <div 
                            class="absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full transition-transform duration-200 shadow-lg"
                            class:translate-x-7={compactView}
                        ></div>
                    </button>
                </div>
        </div>
    </div>

        <!-- Data & Privacy -->
        <div class="bg-white/90 backdrop-blur-sm border-[6px] border-[#A7D8F0] rounded-3xl p-8 space-y-6 shadow-lg shadow-[#A7D8F0]/20">
            <h2 class="font-['Lato'] text-2xl font-bold text-slate-900 flex items-center gap-3">
                <svg class="w-7 h-7 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Dane i Prywatność
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button class="p-6 bg-[#F0F9FF] border-[4px] border-[#B5E3FF] rounded-2xl hover:bg-[#E8F4F8] hover:border-[#A7D8F0] transition-all duration-200 text-left group">
                    <p class="font-['Lato'] font-bold text-slate-900 group-hover:text-[#5DADE2] transition-colors text-lg">
                        📤 Eksportuj dane
                    </p>
                    <p class="text-base text-slate-600 mt-2">Pobierz swoje dane o postępach</p>
                </button>

                <button class="p-6 bg-[#FFE8D9] border-[4px] border-[#FFB88C] rounded-2xl hover:bg-red-100 hover:border-red-400 transition-all duration-200 text-left group">
                    <p class="font-['Lato'] font-bold text-slate-900 group-hover:text-red-600 transition-colors text-lg">
                        🗑️ Usuń konto
                    </p>
                    <p class="text-base text-slate-600 mt-2">Trwale usuń swoje konto</p>
                </button>
            </div>
        </div>

        <!-- App Info -->
        <div class="text-center text-base text-slate-600 space-y-2">
            <p class="font-['Lato'] font-bold">Seal Your Habits v1.0.0</p>
            <p class="font-['Lato']">Stworzone z ❤️ dla lepszych nawyków</p>
        </div>
    </div>
</div>
