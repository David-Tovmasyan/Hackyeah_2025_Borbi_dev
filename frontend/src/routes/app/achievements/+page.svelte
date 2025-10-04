<script lang="ts">
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

<div class="w-full max-w-6xl mx-auto p-6 space-y-6">
    <!-- Header with Progress -->
    <div class="space-y-4">
        <div class="flex items-center justify-between flex-wrap gap-4">
            <h1 class="font-['Lato'] text-3xl font-bold text-stone-50">
                Achievements
            </h1>
            <div class="flex items-center gap-3">
                <span class="font-['Lato'] text-sm text-stone-300">
                    {unlockedCount} / {totalCount} unlocked
                </span>
                <div class="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30">
                    <span class="font-['Lato'] text-sm font-bold text-yellow-400">
                        {completionPercentage}% Complete
                    </span>
                </div>
            </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full h-3 bg-stone-800 rounded-full overflow-hidden border border-stone-700">
            <div 
                class="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 transition-all duration-1000 ease-out rounded-full"
                style="width: {completionPercentage}%"
            ></div>
        </div>
    </div>

    <!-- Filter Tabs -->
    <div class="flex gap-2 flex-wrap">
        <button class="px-4 py-2 rounded-lg bg-stone-700 text-stone-50 font-['Lato'] text-sm font-semibold transition-all duration-200 hover:bg-stone-600">
            All
        </button>
        <button class="px-4 py-2 rounded-lg bg-stone-800/50 text-stone-400 font-['Lato'] text-sm font-semibold transition-all duration-200 hover:bg-stone-700/50">
            Unlocked
        </button>
        <button class="px-4 py-2 rounded-lg bg-stone-800/50 text-stone-400 font-['Lato'] text-sm font-semibold transition-all duration-200 hover:bg-stone-700/50">
            Locked
        </button>
    </div>

    <!-- Achievements Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each achievements as achievement}
            <div 
                class={`group relative bg-gradient-to-br from-stone-900/80 to-stone-800/80 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                    achievement.unlocked 
                        ? 'border-yellow-500/30' 
                        : 'border-stone-700/50 opacity-60'
                }`}
            >
                <!-- Unlocked Badge -->
                {#if achievement.unlocked}
                    <div class="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30 animate-bounce">
                        <span class="text-sm">✓</span>
                    </div>
                {/if}

                <!-- Icon -->
                <div 
                    class="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl mb-4 transition-all duration-300 group-hover:scale-110"
                    class:bg-gradient-to-br={achievement.unlocked}
                    class:shadow-xl={achievement.unlocked}
                    class:bg-stone-800={!achievement.unlocked}
                    class:border={!achievement.unlocked}
                    class:border-stone-700={!achievement.unlocked}
                    class:opacity-50={!achievement.unlocked}
                    style={achievement.unlocked ? `background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); --tw-gradient-from: rgb(var(--color-${achievement.color.split('-')[1]})); --tw-gradient-to: rgb(var(--color-${achievement.color.split('-')[3]}));` : ''}
                >
                    <span class:grayscale={!achievement.unlocked}>
                        {achievement.icon}
                    </span>
                </div>

                <!-- Title & Description -->
                <div class="space-y-2 mb-4">
                    <h3 class="font-['Lato'] text-xl font-bold text-stone-50">
                        {achievement.title}
                    </h3>
                    <p class="text-sm text-stone-400 leading-relaxed">
                        {achievement.description}
                    </p>
                </div>

                <!-- Progress or Unlock Date -->
                {#if achievement.unlocked}
                    <div class="flex items-center gap-2 text-xs text-yellow-400/80">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span class="font-medium">
                            Unlocked {achievement.unlockedDate ? new Date(achievement.unlockedDate).toLocaleDateString() : 'recently'}
                        </span>
                    </div>
                {:else if achievement.progress !== undefined && achievement.target !== undefined}
                    <div class="space-y-2">
                        <div class="flex justify-between text-xs text-stone-400">
                            <span>Progress</span>
                            <span class="font-semibold">{achievement.progress} / {achievement.target}</span>
                        </div>
                        <div class="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                            <div 
                                class="h-full bg-gradient-to-r {achievement.color} transition-all duration-500"
                                style="width: {(achievement.progress / achievement.target) * 100}%"
                            ></div>
                        </div>
                    </div>
                {:else}
                    <div class="flex items-center gap-2 text-xs text-stone-500">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                        </svg>
                        <span>Locked</span>
                    </div>
                {/if}
            </div>
        {/each}
    </div>

    <!-- Motivation Section -->
    <div class="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 text-center space-y-3">
        <h2 class="font-['Lato'] text-2xl font-bold text-stone-50">
            Keep Going! 🚀
        </h2>
        <p class="text-stone-300 max-w-2xl mx-auto">
            Every achievement is a milestone on your journey. Complete your daily tasks consistently to unlock more rewards!
        </p>
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
