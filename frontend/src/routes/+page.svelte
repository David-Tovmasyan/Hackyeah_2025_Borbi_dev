<script lang="ts">
    import { goto } from '$app/navigation';
    import { isDarkMode, toggleTheme } from '$lib/stores/theme';
</script>

<div class="min-h-screen
            dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:via-stone-950 dark:to-[#0a0a0a] dark:text-stone-50
            light:bg-gradient-to-b light:from-sky-50 light:via-sky-100 light:to-sky-50 light:text-slate-800">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="dark:opacity-5 light:opacity-10">
            <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0); background-size: 40px 40px;"></div>
        </div>

        <!-- Header/Nav -->
        <nav class="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto md:px-12">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-blue-500/20">
                    🦭
                </div>
                <h1 class="font-['Lato'] text-2xl font-black tracking-tight dark:text-stone-50 light:text-slate-800">
                    Seal Your Habits
                </h1>
            </div>
            
            <div class="flex gap-4 items-center">
                <!-- Dark Mode Toggle -->
                <button
                    onclick={toggleTheme}
                    class="p-2.5 rounded-xl transition-all duration-200
                           dark:bg-stone-800 dark:hover:bg-stone-700 
                           light:bg-sky-100 light:hover:bg-sky-200
                           border dark:border-stone-700 light:border-sky-300"
                    aria-label="Toggle dark mode"
                >
                    {#if $isDarkMode}
                        <svg class="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                        </svg>
                    {:else}
                        <svg class="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd" />
                        </svg>
                    {/if}
                </button>
                
                <button 
                    onclick={() => goto('/auth')}
                    class="px-6 py-2.5 rounded-xl font-['Lato'] font-semibold transition-all duration-200 border
                           dark:bg-stone-800/50 dark:text-stone-200 dark:hover:bg-stone-700/50 dark:border-stone-700
                           light:bg-sky-100 light:text-slate-700 light:hover:bg-sky-200 light:border-sky-300"
                >
                    Sign In
                </button>
                <button 
                    onclick={() => goto('/app')}
                    class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-['Lato'] font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg shadow-blue-500/25"
                >
                    Get Started
                </button>
            </div>
        </nav>

        <!-- Hero Content -->
        <div class="relative z-10 max-w-7xl mx-auto px-6 py-20 md:px-12 md:py-32">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <!-- Left: Text Content -->
                <div class="space-y-8">
                    <div class="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                        <span class="text-blue-400 font-['Lato'] font-semibold text-sm">🧬 Biohacking Made Simple</span>
                    </div>
                    
                    <h2 class="font-['Lato'] text-5xl md:text-7xl font-black leading-tight">
                        Master Your Days,
                        <br />
                        <span class="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Seal Your Habits
                        </span>
                    </h2>
                    
                    <p class="text-xl text-stone-400 leading-relaxed max-w-xl font-['Lato']">
                        The ultimate biohacking companion that helps you build powerful habits, track your daily progress, 
                        and optimize your life—one day at a time. Meet Olaf, your friendly seal guide! 🦭
                    </p>

                    <div class="flex flex-col sm:flex-row gap-4">
                        <button 
                            onclick={() => goto('/app')}
                            class="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-['Lato'] text-lg font-bold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-xl shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Start Your Journey
                        </button>
                        <button 
                            onclick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                            class="px-8 py-4 rounded-2xl bg-stone-800/50 text-stone-200 font-['Lato'] text-lg font-bold hover:bg-stone-700/50 transition-all duration-200 border border-stone-700"
                        >
                            Learn More
                        </button>
                    </div>

                    <!-- Stats -->
                    <div class="grid grid-cols-3 gap-6 pt-8">
                        <div class="text-center">
                            <div class="font-['Lato'] text-3xl font-black text-blue-400">100%</div>
                            <div class="text-sm text-stone-500 font-['Lato'] mt-1">Free Forever</div>
                        </div>
                        <div class="text-center">
                            <div class="font-['Lato'] text-3xl font-black text-cyan-400">Daily</div>
                            <div class="text-sm text-stone-500 font-['Lato'] mt-1">Check-ins</div>
                        </div>
                        <div class="text-center">
                            <div class="font-['Lato'] text-3xl font-black text-blue-400">∞</div>
                            <div class="text-sm text-stone-500 font-['Lato'] mt-1">Possibilities</div>
                        </div>
                    </div>
                </div>

                <!-- Right: Olaf Mascot & Visual -->
                <div class="relative">
                    <!-- Olaf the Seal -->
                    <div class="relative">
                        <!-- Glow Effect -->
                        <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl rounded-full"></div>
                        
                        <!-- Main Seal Container -->
                        <div class="relative bg-gradient-to-br from-stone-900/80 to-stone-800/80 backdrop-blur-sm border border-stone-700/50 rounded-3xl p-12 shadow-2xl">
                            <!-- Seal Emoji Large -->
                            <div class="text-center space-y-6">
                                <div class="text-[12rem] leading-none animate-bounce-slow">
                                    🦭
                                </div>
                                <div class="space-y-2">
                                    <h3 class="font-['Lato'] text-3xl font-black text-stone-50">
                                        Meet Olaf!
                                    </h3>
                                    <p class="text-stone-400 font-['Lato'] text-lg">
                                        Your personal habit-sealing companion
                                    </p>
                                </div>
                                
                                <!-- Olaf's Quote Bubble -->
                                <div class="relative bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
                                    <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500/10 border-l border-t border-blue-500/20 rotate-45"></div>
                                    <p class="font-['Lato'] text-blue-300 italic">
                                        "Let's seal those habits and make every day count! 💪"
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Floating Elements -->
                        <div class="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-3xl animate-bounce shadow-xl shadow-blue-500/30">
                            ✓
                        </div>
                        <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-2xl animate-pulse shadow-xl shadow-orange-500/30">
                            🔥
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Features Section -->
    <div id="features" class="relative py-24 px-6 md:px-12">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-16 space-y-4">
                <h2 class="font-['Lato'] text-4xl md:text-5xl font-black text-stone-50">
                    Why Seal Your Habits?
                </h2>
                <p class="text-xl text-stone-400 max-w-2xl mx-auto font-['Lato']">
                    Biohacking your daily routine has never been easier with Olaf by your side
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div class="group bg-gradient-to-br from-stone-900/80 to-stone-800/80 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02]">
                    <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                        📍
                    </div>
                    <h3 class="font-['Lato'] text-2xl font-bold text-stone-50 mb-4">Visual Roadmap</h3>
                    <p class="text-stone-400 font-['Lato'] leading-relaxed">
                        Track your journey with a beautiful daily roadmap. Watch your progress unfold like a path to success.
                    </p>
                </div>

                <!-- Feature 2 -->
                <div class="group bg-gradient-to-br from-stone-900/80 to-stone-800/80 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-8 hover:border-orange-500/30 transition-all duration-300 hover:scale-[1.02]">
                    <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
                        🔥
                    </div>
                    <h3 class="font-['Lato'] text-2xl font-bold text-stone-50 mb-4">Streak Tracking</h3>
                    <p class="text-stone-400 font-['Lato'] leading-relaxed">
                        Build momentum with daily streaks. Keep the fire burning and watch Olaf celebrate your consistency!
                    </p>
                </div>

                <!-- Feature 3 -->
                <div class="group bg-gradient-to-br from-stone-900/80 to-stone-800/80 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-8 hover:border-yellow-500/30 transition-all duration-300 hover:scale-[1.02]">
                    <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
                        🏆
                    </div>
                    <h3 class="font-['Lato'] text-2xl font-bold text-stone-50 mb-4">Achievement System</h3>
                    <p class="text-stone-400 font-['Lato'] leading-relaxed">
                        Unlock badges and rewards as you hit milestones. Gamify your biohacking journey!
                    </p>
                </div>

                <!-- Feature 4 -->
                <div class="group bg-gradient-to-br from-stone-900/80 to-stone-800/80 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02]">
                    <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                        📊
                    </div>
                    <h3 class="font-['Lato'] text-2xl font-bold text-stone-50 mb-4">Progress Analytics</h3>
                    <p class="text-stone-400 font-['Lato'] leading-relaxed">
                        Visualize your habit history with detailed stats and insights into your performance.
                    </p>
                </div>

                <!-- Feature 5 -->
                <div class="group bg-gradient-to-br from-stone-900/80 to-stone-800/80 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-8 hover:border-green-500/30 transition-all duration-300 hover:scale-[1.02]">
                    <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform duration-300">
                        🎯
                    </div>
                    <h3 class="font-['Lato'] text-2xl font-bold text-stone-50 mb-4">Daily Check-ins</h3>
                    <p class="text-stone-400 font-['Lato'] leading-relaxed">
                        Simple one-tap check-ins to mark your daily progress. Olaf makes it easy and fun!
                    </p>
                </div>

                <!-- Feature 6 -->
                <div class="group bg-gradient-to-br from-stone-900/80 to-stone-800/80 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300 hover:scale-[1.02]">
                    <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                        🦭
                    </div>
                    <h3 class="font-['Lato'] text-2xl font-bold text-stone-50 mb-4">Olaf Support</h3>
                    <p class="text-stone-400 font-['Lato'] leading-relaxed">
                        Your friendly seal mascot guides you every step of the way with motivation and encouragement!
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- CTA Section -->
    <div class="relative py-24 px-6 md:px-12">
        <div class="max-w-4xl mx-auto">
            <div class="relative bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 md:p-16 overflow-hidden shadow-2xl">
                <!-- Background Pattern -->
                <div class="absolute inset-0 opacity-10">
                    <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgb(255 255 255) 1px, transparent 0); background-size: 30px 30px;"></div>
                </div>

                <div class="relative z-10 text-center space-y-8">
                    <div class="text-6xl">🦭</div>
                    <h2 class="font-['Lato'] text-4xl md:text-5xl font-black text-white">
                        Ready to Seal Your Habits?
                    </h2>
                    <p class="text-xl text-blue-100 max-w-2xl mx-auto font-['Lato']">
                        Join thousands of biohackers who are transforming their lives one day at a time with Olaf!
                    </p>
                    <button 
                        onclick={() => goto('/app')}
                        class="px-10 py-5 rounded-2xl bg-white text-blue-600 font-['Lato'] text-xl font-black hover:bg-blue-50 transition-all duration-200 shadow-xl hover:scale-[1.05] active:scale-[0.98]"
                    >
                        Start Free Today
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="relative py-12 px-6 md:px-12 border-t border-stone-800">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xl">
                        🦭
                    </div>
                    <span class="font-['Lato'] text-lg font-bold text-stone-300">Seal Your Habits</span>
                </div>
                
                <p class="text-stone-500 font-['Lato'] text-sm">
                    © 2025 Seal Your Habits. Made with ❤️ for better habits.
                </p>
            </div>
        </div>
    </footer>
</div>

<style>
    @keyframes bounce-slow {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-20px);
        }
    }

    .animate-bounce-slow {
        animation: bounce-slow 3s ease-in-out infinite;
    }
</style>
>>>>>>> 3dced618c8f041cfc3f60c86e1ce317b5195b55f
