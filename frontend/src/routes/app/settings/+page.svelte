<script lang="ts">
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

<div class="w-full max-w-4xl mx-auto p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
        <h1 class="font-['Lato'] text-3xl font-bold text-stone-50">
            Settings
        </h1>
        <div class="px-4 py-2 bg-gradient-to-r from-gray-500/20 to-stone-500/20 rounded-full border border-gray-500/30">
            <span class="font-['Lato'] text-sm text-gray-300">
                Customize your experience
            </span>
        </div>
    </div>

    <!-- Account Section -->
    <div class="bg-gradient-to-br from-stone-900/80 to-stone-800/80 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6 space-y-6">
        <h2 class="font-['Lato'] text-xl font-bold text-stone-50 flex items-center gap-2">
            <svg class="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Account
        </h2>

        <div class="space-y-4">
            <!-- Name -->
            <div class="space-y-2">
                <label for="name" class="block text-sm font-medium text-stone-300">
                    Display Name
                </label>
                <input
                    id="name"
                    type="text"
                    bind:value={userName}
                    class="w-full px-4 py-3 bg-stone-800/50 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your name"
                />
            </div>

            <!-- Email -->
            <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-stone-300">
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    bind:value={email}
                    class="w-full px-4 py-3 bg-stone-800/50 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                />
            </div>

            <!-- Save Button -->
            <button class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-['Lato'] font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25">
                Save Changes
            </button>
        </div>
    </div>

    <!-- Notifications Section -->
    <div class="bg-gradient-to-br from-stone-900/80 to-stone-800/80 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6 space-y-6">
        <h2 class="font-['Lato'] text-xl font-bold text-stone-50 flex items-center gap-2">
            <svg class="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Notifications
        </h2>

        <div class="space-y-4">
            <!-- Enable Notifications -->
            <div class="flex items-center justify-between p-4 bg-stone-800/30 rounded-xl hover:bg-stone-800/50 transition-all duration-200">
                <div class="space-y-1">
                    <p class="font-['Lato'] font-semibold text-stone-100">Push Notifications</p>
                    <p class="text-sm text-stone-400">Receive notifications about your progress</p>
                </div>
                <button
                    onclick={() => notifications = !notifications}
                    aria-label="Toggle notifications"
                    class="relative w-14 h-8 rounded-full transition-all duration-200"
                    class:bg-blue-500={notifications}
                    class:bg-stone-700={!notifications}
                >
                    <div 
                        class="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 shadow-lg"
                        class:translate-x-6={notifications}
                    ></div>
                </button>
            </div>

            <!-- Daily Reminder -->
            <div class="flex items-center justify-between p-4 bg-stone-800/30 rounded-xl hover:bg-stone-800/50 transition-all duration-200">
                <div class="space-y-1">
                    <p class="font-['Lato'] font-semibold text-stone-100">Daily Reminder</p>
                    <p class="text-sm text-stone-400">Get reminded to check in daily</p>
                </div>
                <button
                    onclick={() => dailyReminder = !dailyReminder}
                    aria-label="Toggle daily reminder"
                    class="relative w-14 h-8 rounded-full transition-all duration-200"
                    class:bg-blue-500={dailyReminder}
                    class:bg-stone-700={!dailyReminder}
                >
                    <div 
                        class="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 shadow-lg"
                        class:translate-x-6={dailyReminder}
                    ></div>
                </button>
            </div>

            <!-- Reminder Time -->
            {#if dailyReminder}
                <div class="pl-4 space-y-2">
                    <label for="reminderTime" class="block text-sm font-medium text-stone-300">
                        Reminder Time
                    </label>
                    <input
                        id="reminderTime"
                        type="time"
                        bind:value={reminderTime}
                        class="px-4 py-2 bg-stone-800/50 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                    />
                </div>
            {/if}

            <!-- Weekly Report -->
            <div class="flex items-center justify-between p-4 bg-stone-800/30 rounded-xl hover:bg-stone-800/50 transition-all duration-200">
                <div class="space-y-1">
                    <p class="font-['Lato'] font-semibold text-stone-100">Weekly Report</p>
                    <p class="text-sm text-stone-400">Get a summary of your week every Sunday</p>
                </div>
                <button
                    onclick={() => weeklyReport = !weeklyReport}
                    aria-label="Toggle weekly report"
                    class="relative w-14 h-8 rounded-full transition-all duration-200"
                    class:bg-blue-500={weeklyReport}
                    class:bg-stone-700={!weeklyReport}
                >
                    <div 
                        class="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 shadow-lg"
                        class:translate-x-6={weeklyReport}
                    ></div>
                </button>
            </div>
        </div>
    </div>

    <!-- Appearance Section -->
    <div class="bg-gradient-to-br from-stone-900/80 to-stone-800/80 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6 space-y-6">
        <h2 class="font-['Lato'] text-xl font-bold text-stone-50 flex items-center gap-2">
            <svg class="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Appearance
        </h2>

        <div class="space-y-4">
            <!-- Sound Effects -->
            <div class="flex items-center justify-between p-4 bg-stone-800/30 rounded-xl hover:bg-stone-800/50 transition-all duration-200">
                <div class="space-y-1">
                    <p class="font-['Lato'] font-semibold text-stone-100">Sound Effects</p>
                    <p class="text-sm text-stone-400">Play sounds for actions and achievements</p>
                </div>
                <button
                    onclick={() => soundEffects = !soundEffects}
                    aria-label="Toggle sound effects"
                    class="relative w-14 h-8 rounded-full transition-all duration-200"
                    class:bg-blue-500={soundEffects}
                    class:bg-stone-700={!soundEffects}
                >
                    <div 
                        class="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 shadow-lg"
                        class:translate-x-6={soundEffects}
                    ></div>
                </button>
            </div>

            <!-- Compact View -->
            <div class="flex items-center justify-between p-4 bg-stone-800/30 rounded-xl hover:bg-stone-800/50 transition-all duration-200">
                <div class="space-y-1">
                    <p class="font-['Lato'] font-semibold text-stone-100">Compact View</p>
                    <p class="text-sm text-stone-400">Show more content with less spacing</p>
                </div>
                <button
                    onclick={() => compactView = !compactView}
                    aria-label="Toggle compact view"
                    class="relative w-14 h-8 rounded-full transition-all duration-200"
                    class:bg-blue-500={compactView}
                    class:bg-stone-700={!compactView}
                >
                    <div 
                        class="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 shadow-lg"
                        class:translate-x-6={compactView}
                    ></div>
                </button>
            </div>
        </div>
    </div>

    <!-- Data & Privacy -->
    <div class="bg-gradient-to-br from-stone-900/80 to-stone-800/80 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6 space-y-4">
        <h2 class="font-['Lato'] text-xl font-bold text-stone-50 flex items-center gap-2">
            <svg class="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Data & Privacy
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button class="p-4 bg-stone-800/30 rounded-xl hover:bg-stone-800/50 transition-all duration-200 text-left group">
                <p class="font-['Lato'] font-semibold text-stone-100 group-hover:text-blue-400 transition-colors">
                    Export Data
                </p>
                <p class="text-sm text-stone-400 mt-1">Download your progress data</p>
            </button>

            <button class="p-4 bg-stone-800/30 rounded-xl hover:bg-red-900/30 hover:border-red-500/30 border border-transparent transition-all duration-200 text-left group">
                <p class="font-['Lato'] font-semibold text-stone-100 group-hover:text-red-400 transition-colors">
                    Delete Account
                </p>
                <p class="text-sm text-stone-400 mt-1">Permanently delete your account</p>
            </button>
        </div>
    </div>

    <!-- App Info -->
    <div class="text-center text-sm text-stone-500 space-y-1">
        <p class="font-['Lato']">Seal Your Habits v1.0.0</p>
        <p>Made with ❤️ for better habits</p>
    </div>
</div>
