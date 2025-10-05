<script lang="ts">
    import olaf2 from '$lib/assets/gif/olaf2.gif';
    
    type Achievement = {
        id: string;
        title: string;
        description: string;
        icon: string;
        unlocked: boolean;
        unlockedDate?: string;
        progress?: number;
        target?: number;
        color: string;
    };

    const achievements: Achievement[] = [
        {
            id: "first-step",
            title: "First Step",
            description: "Complete your first day",
            icon: "👣",
            unlocked: true,
            unlockedDate: "2025-10-02",
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: "three-day-streak",
            title: "On Fire!",
            description: "Complete 3 days in a row",
            icon: "🔥",
            unlocked: true,
            unlockedDate: "2025-10-04",
            color: "from-orange-500 to-red-500"
        },
        {
            id: "week-warrior",
            title: "Week Warrior",
            description: "Complete 7 days in a row",
            icon: "⚔️",
            unlocked: false,
            progress: 3,
            target: 7,
            color: "from-purple-500 to-pink-500"
        },
        {
            id: "perfect-week",
            title: "Perfect Week",
            description: "No missed days in a week",
            icon: "⭐",
            unlocked: false,
            progress: 3,
            target: 7,
            color: "from-yellow-400 to-orange-400"
        },
        {
            id: "consistency-king",
            title: "Consistency King",
            description: "Complete 30 days in a row",
            icon: "👑",
            unlocked: false,
            progress: 3,
            target: 30,
            color: "from-yellow-500 to-amber-600"
        },
        {
            id: "early-bird",
            title: "Early Bird",
            description: "Check in before 9 AM",
            icon: "🌅",
            unlocked: false,
            progress: 1,
            target: 5,
            color: "from-sky-400 to-blue-500"
        },
        {
            id: "night-owl",
            title: "Night Owl",
            description: "Check in after 9 PM",
            icon: "🦉",
            unlocked: false,
            progress: 0,
            target: 5,
            color: "from-indigo-500 to-purple-600"
        },
        {
            id: "comeback-kid",
            title: "Comeback Kid",
            description: "Restart after a break",
            icon: "💪",
            unlocked: true,
            unlockedDate: "2025-10-02",
            color: "from-green-500 to-emerald-600"
        },
        {
            id: "century-club",
            title: "Century Club",
            description: "Complete 100 total days",
            icon: "💯",
            unlocked: false,
            progress: 3,
            target: 100,
            color: "from-rose-500 to-pink-600"
        }
    ];

    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;
    const completionPercentage = Math.round((unlockedCount / totalCount) * 100);
</script>

<!-- ACHIEVEMENTS PAGE z kolorami landing page -->
<div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] p-6">
    <div class="w-full max-w-6xl mx-auto space-y-8">
        <!-- Header with Olaf + Progress -->
        <div class="space-y-6">
            <div class="flex items-center justify-between flex-wrap gap-4">
                <div class="flex items-center gap-4">
                    <img src={olaf2} alt="Olaf" class="w-20 h-20 object-contain rounded-full border-[6px] border-[#A7D8F0] shadow-xl shadow-[#A7D8F0]/30" />
                    <h1 class="font-['Lato'] text-4xl font-bold text-slate-900">
                        Osiągnięcia 🏆
                    </h1>
                </div>
                <div class="flex items-center gap-4">
                    <span class="font-['Lato'] text-lg font-bold text-slate-700">
                        {unlockedCount} / {totalCount} odblokowane
                    </span>
                    <div class="px-6 py-3 bg-gradient-to-r from-[#FFE8D9] to-[#FFD4B8] rounded-full border-[6px] border-[#FFB88C] shadow-lg shadow-[#FFB88C]/30">
                        <span class="font-['Lato'] text-lg font-bold text-orange-600">
                            {completionPercentage}%
                        </span>
                    </div>
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="w-full h-4 bg-white/80 rounded-full overflow-hidden border-[6px] border-[#A7D8F0] shadow-lg shadow-[#A7D8F0]/30">
                <div 
                    class="h-full bg-gradient-to-r from-[#7EC8E3] via-[#5DADE2] to-[#4A9DD2] transition-all duration-1000 ease-out rounded-full"
                    style="width: {completionPercentage}%"
                ></div>
            </div>
    </div>

        <!-- Filter Tabs -->
        <div class="flex gap-3 flex-wrap">
            <button class="px-6 py-3 rounded-2xl bg-[#B5E3FF] text-slate-900 font-['Lato'] text-lg font-bold transition-all duration-200 hover:bg-[#A7D8F0] border-[6px] border-[#7EC8E3] hover:scale-105 shadow-lg shadow-[#B5E3FF]/30">
                Wszystkie
            </button>
            <button class="px-6 py-3 rounded-2xl bg-white/80 text-slate-700 font-['Lato'] text-lg font-semibold transition-all duration-200 hover:bg-white/95 border-[6px] border-[#A7D8F0]/70 hover:scale-105">
                Odblokowane
            </button>
            <button class="px-6 py-3 rounded-2xl bg-white/80 text-slate-700 font-['Lato'] text-lg font-semibold transition-all duration-200 hover:bg-white/95 border-[6px] border-[#A7D8F0]/70 hover:scale-105">
                Zablokowane
            </button>
        </div>

        <!-- Achievements Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each achievements as achievement}
                <div class="group relative backdrop-blur-sm rounded-3xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border-[6px]
                            {achievement.unlocked 
                                ? 'bg-gradient-to-br from-[#D4EAF7] to-[#B5E3FF] border-[#FFB88C] shadow-xl shadow-[#B5E3FF]/40'
                                : 'bg-white/80 border-[#A7D8F0]/60 opacity-90 shadow-lg shadow-[#A7D8F0]/20'}"
            >
                    <!-- Unlocked Badge -->
                    {#if achievement.unlocked}
                        <div class="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-xl shadow-orange-500/50 animate-bounce border-[3px] border-white">
                            <span class="text-white font-bold">✓</span>
                        </div>
                    {/if}

                    <!-- Icon -->
                    <div class="w-24 h-24 rounded-3xl flex items-center justify-center text-6xl mb-6 transition-all duration-300 group-hover:scale-110 border-[6px]
                                {achievement.unlocked 
                                    ? 'bg-gradient-to-br from-[#B5E3FF] to-[#A7D8F0] border-[#7EC8E3] shadow-xl shadow-[#B5E3FF]/50' 
                                    : 'bg-white/90 border-[#A7D8F0]/80 opacity-90 shadow-lg'}"
                >
                    <span class:grayscale={!achievement.unlocked}>
                        {achievement.icon}
                    </span>
                </div>

                    <!-- Title & Description -->
                    <div class="space-y-3 mb-6">
                        <h3 class="font-['Lato'] text-2xl font-bold text-slate-900">
                            {achievement.title}
                        </h3>
                        <p class="text-base text-slate-700 leading-relaxed">
                            {achievement.description}
                        </p>
                    </div>

                    <!-- Progress or Unlock Date -->
                    {#if achievement.unlocked}
                        <div class="flex items-center gap-2 text-sm text-orange-600">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <span class="font-['Lato'] font-bold">
                                Odblokowane {achievement.unlockedDate ? new Date(achievement.unlockedDate).toLocaleDateString('pl-PL') : 'niedawno'}
                            </span>
                        </div>
                    {:else if achievement.progress !== undefined && achievement.target !== undefined}
                        <div class="space-y-3">
                            <div class="flex justify-between text-sm text-slate-700">
                                <span class="font-['Lato'] font-bold">Postęp</span>
                                <span class="font-['Lato'] font-bold">{achievement.progress} / {achievement.target}</span>
                            </div>
                            <div class="w-full h-3 bg-white/80 rounded-full overflow-hidden border-[4px] border-[#A7D8F0]">
                                <div class="h-full bg-gradient-to-r from-[#7EC8E3] via-[#5DADE2] to-[#4A9DD2] transition-all duration-500 rounded-full"
                                     style="width: {(achievement.progress / achievement.target) * 100}%"
                                ></div>
                            </div>
                    </div>
                    {:else}
                        <div class="flex items-center gap-2 text-sm text-slate-600">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                            </svg>
                            <span class="font-['Lato'] font-bold">Zablokowane</span>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>

        <!-- Motivation Section -->
        <div class="bg-gradient-to-br from-[#D4EAF7] via-[#B8DCE5] to-[#B5E3FF] backdrop-blur-sm rounded-3xl p-10 text-center space-y-6 border-[6px] border-[#A7D8F0] shadow-2xl shadow-[#A7D8F0]/40">
            <h2 class="font-['Lato'] text-3xl font-bold text-slate-900">
                Tak trzymaj! 🚀
            </h2>
            <p class="font-['Lato'] text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
                Każde osiągnięcie to kamień milowy w Twojej podróży. Wykonuj codzienne zadania systematycznie, aby odblokować więcej nagród!
            </p>
        </div>
    </div>
</div>

<style>
    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-5px);
        }
    }

    .animate-bounce {
        animation: bounce 2s ease-in-out infinite;
    }
</style>