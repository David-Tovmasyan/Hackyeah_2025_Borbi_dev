<script lang="ts">
    import { onMount } from 'svelte';
    import olaf2 from '$lib/assets/gif/olaf2.gif';
    import { achievements, achievementStats, type Achievement } from '$lib/stores/achievements';
    import { currentUser } from '$lib/stores/user';
    
    type FilterType = 'all' | 'unlocked' | 'locked';
    let currentFilter: FilterType = 'all';
    
    // Reactive filtered achievements
    $: filteredAchievements = $achievements.filter(a => {
        if (currentFilter === 'unlocked') return a.unlocked;
        if (currentFilter === 'locked') return !a.unlocked;
        return true;
    });
    
    // Stats from derived store
    $: stats = $achievementStats;
    
    // Debug logs
    $: {
        console.log('🎯 Current user:', $currentUser);
        console.log('🎯 Achievements store:', $achievements);
        console.log('🎯 Filtered achievements:', filteredAchievements);
        console.log('🎯 Stats:', stats);
        console.log('🎯 Current filter:', currentFilter);
    }
    
    onMount(() => {
        // Initialize achievements on mount
        console.log('🎯 Mounting achievements component');
        console.log('🎯 Current user on mount:', $currentUser);
        console.log('🎯 Before initialize, achievements count:', $achievements.length);
        
        // Wyczyść localStorage dla testów (można usunąć później)
        localStorage.removeItem('achievements');
        console.log('🎯 Cleared localStorage');
        
        achievements.initialize();
        console.log('🎯 After initialize, achievements:', $achievements);
        
        // Sprawdź osiągnięcia manualnie jeśli user istnieje
        if ($currentUser) {
            console.log('🎯 Manually checking achievements for user:', $currentUser);
            achievements.checkAchievements(
                $currentUser.streak || 0,
                $currentUser.streak || 0,
                $currentUser.streak === 1,
                $currentUser.level || 0
            );
        }
        
        // Sprawdź ponownie po krótkim czasie (async)
        setTimeout(() => {
            console.log('🎯 After timeout, achievements:', $achievements);
            console.log('🎯 After timeout, user:', $currentUser);
        }, 100);
    });
    
    function setFilter(filter: FilterType) {
        currentFilter = filter;
    }
</script>

<!-- ACHIEVEMENTS PAGE - Neuroatypical friendly design -->
<div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] p-4 md:p-8">
    <div class="w-full max-w-6xl mx-auto space-y-8">
        <!-- Header with Olaf + Progress -->
        <div class="space-y-6">
            <div class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6">
                <div class="flex items-center gap-4">
                    <img src={olaf2} alt="Olaf the friendly mascot" class="w-20 h-20 object-contain rounded-full border-[6px] border-[#A7D8F0] shadow-xl shadow-[#A7D8F0]/40 bg-white/80 p-1" />
                    <div class="text-center md:text-left">
                        <h1 class="font-['Lato'] text-3xl md:text-4xl font-bold text-[#0F172A] leading-relaxed mb-1">
                            Achievements
                        </h1>
                        <p class="font-['Lato'] text-lg text-[#334155] font-semibold">Your progress 🏆</p>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <span class="font-['Lato'] text-xl font-bold text-[#0F172A]">
                        {stats.unlocked} / {stats.total}
                    </span>
                    <div class="px-6 py-3 bg-white border-[6px] border-[#A7D8F0] rounded-full shadow-xl shadow-[#A7D8F0]/30">
                        <span class="font-['Lato'] text-2xl font-bold text-[#5DADE2]">
                            {stats.percentage}%
                        </span>
                    </div>
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="w-full h-6 bg-white rounded-full overflow-hidden border-[6px] border-[#A7D8F0] shadow-xl shadow-[#A7D8F0]/30">
                <div 
                    class="h-full bg-gradient-to-r from-[#7EC8E3] via-[#5DADE2] to-[#4A9DD2] transition-all duration-1000 ease-out"
                    style="width: {stats.percentage}%"
                ></div>
            </div>
        </div>

        <!-- Filter Tabs - Clear visual states -->
        <div class="flex gap-4 flex-wrap justify-center md:justify-start">
            <button 
                class="px-8 py-4 rounded-3xl font-['Lato'] text-lg font-bold transition-all duration-200 border-[6px] {currentFilter === 'all' ? 'bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] text-white border-[#5DADE2] shadow-xl shadow-[#5DADE2]/40 scale-105' : 'bg-white text-[#0F172A] border-[#A7D8F0] hover:scale-105 hover:border-[#7EC8E3]'}"
                onclick={() => setFilter('all')}
            >
                All ({stats.total})
            </button>
            <button 
                class="px-8 py-4 rounded-3xl font-['Lato'] text-lg font-bold transition-all duration-200 border-[6px] {currentFilter === 'unlocked' ? 'bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] text-white border-[#5DADE2] shadow-xl shadow-[#5DADE2]/40 scale-105' : 'bg-white text-[#0F172A] border-[#A7D8F0] hover:scale-105 hover:border-[#7EC8E3]'}"
                onclick={() => setFilter('unlocked')}
            >
                Unlocked ({stats.unlocked})
            </button>
            <button 
                class="px-8 py-4 rounded-3xl font-['Lato'] text-lg font-bold transition-all duration-200 border-[6px] {currentFilter === 'locked' ? 'bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] text-white border-[#5DADE2] shadow-xl shadow-[#5DADE2]/40 scale-105' : 'bg-white text-[#0F172A] border-[#A7D8F0] hover:scale-105 hover:border-[#7EC8E3]'}"
                onclick={() => setFilter('locked')}
            >
                Locked ({stats.total - stats.unlocked})
            </button>
        </div>

        <!-- Achievements Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {#if filteredAchievements.length === 0}
                <div class="col-span-full text-center p-12 bg-white rounded-3xl border-[6px] border-[#D4EAF7]">
                    <p class="font-['Lato'] text-xl text-[#334155] font-semibold">
                        {#if $achievements.length === 0}
                            🎯 Loading achievements...
                        {:else}
                            No achievements match this filter.
                        {/if}
                    </p>
                </div>
            {/if}
            {#each filteredAchievements as achievement}
                <div class="group relative rounded-3xl p-8 transition-all duration-300 hover:scale-105 border-[6px]
                            {achievement.unlocked 
                                ? 'bg-white shadow-xl shadow-[#B5E3FF]/40 border-[#A7D8F0]'
                                : 'bg-white/60 border-[#D4EAF7] opacity-80 shadow-lg'}">
                    
                    <!-- Unlocked Badge - Pastelowy -->
                    {#if achievement.unlocked}
                        <div class="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#7EC8E3] to-[#5DADE2] rounded-full flex items-center justify-center shadow-xl shadow-[#7EC8E3]/50 border-[4px] border-white">
                            <span class="text-white font-bold text-xl">✓</span>
                        </div>
                    {/if}

                    <!-- Icon with pastel background -->
                    <div class="w-28 h-28 mx-auto rounded-3xl flex items-center justify-center text-6xl mb-6 transition-all duration-300 group-hover:scale-110 border-[6px]
                                {achievement.unlocked 
                                    ? `bg-gradient-${achievement.color} border-[#B5E3FF] shadow-xl shadow-[#B5E3FF]/40` 
                                    : 'bg-white border-[#D4EAF7] opacity-70'}">
                        <span class:grayscale={!achievement.unlocked} class:opacity-50={!achievement.unlocked}>
                            {achievement.icon}
                        </span>
                    </div>

                    <!-- Title & Description -->
                    <div class="space-y-3 mb-6 text-center">
                        <h3 class="font-['Lato'] text-2xl font-bold text-[#0F172A] leading-relaxed">
                            {achievement.title}
                        </h3>
                        <p class="font-['Lato'] text-base text-[#334155] font-semibold leading-relaxed">
                            {achievement.description}
                        </p>
                    </div>

                    <!-- Progress or Unlock Date -->
                    {#if achievement.unlocked}
                        <div class="flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-[#E8F4F8] to-[#D4EAF7] rounded-3xl border-[4px] border-[#B5E3FF]">
                            <svg class="w-6 h-6 text-[#5DADE2]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <span class="font-['Lato'] text-sm font-bold text-[#0F172A]">
                                Unlocked {achievement.unlockedDate ? new Date(achievement.unlockedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'recently'}
                            </span>
                        </div>
                    {:else}
                        <div class="space-y-4">
                            <div class="flex justify-between items-center px-2">
                                <span class="font-['Lato'] text-base font-bold text-[#334155]">Progress</span>
                                <span class="font-['Lato'] text-base font-bold text-[#5DADE2]">{achievement.progress} / {achievement.target}</span>
                            </div>
                            <div class="w-full h-4 bg-white rounded-full overflow-hidden border-[4px] border-[#D4EAF7]">
                                <div class="h-full bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] transition-all duration-500"
                                     style="width: {Math.min((achievement.progress / achievement.target) * 100, 100)}%"
                                ></div>
                            </div>
                            <div class="flex items-center justify-center gap-2 text-sm text-[#334155] font-semibold">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                                </svg>
                                <span>Locked - Keep going!</span>
                            </div>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>

        <!-- Motivation Section -->
        <div class="bg-white rounded-3xl p-10 md:p-12 text-center space-y-6 border-[6px] border-[#A7D8F0] shadow-xl shadow-[#A7D8F0]/40">
            <div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#D4EAF7] to-[#B5E3FF] flex items-center justify-center border-[6px] border-[#A7D8F0] shadow-lg shadow-[#B5E3FF]/30">
                <span class="text-4xl">🚀</span>
            </div>
            <h2 class="font-['Lato'] text-3xl md:text-4xl font-bold text-[#0F172A] leading-relaxed">
                Keep Going!
            </h2>
            <p class="font-['Lato'] text-lg md:text-xl text-[#334155] font-semibold max-w-2xl mx-auto leading-relaxed">
                Every achievement is a milestone in your journey. Complete your daily goals consistently to unlock more rewards!
            </p>
            
            <!-- Recently unlocked -->
            {#if stats.recentlyUnlocked.length > 0}
                <div class="mt-8 pt-6 border-t-[4px] border-[#D4EAF7]">
                    <h3 class="font-['Lato'] text-xl font-bold text-[#0F172A] mb-4">Recently Unlocked</h3>
                    <div class="flex gap-4 justify-center flex-wrap">
                        {#each stats.recentlyUnlocked as recent}
                            <div class="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#E8F4F8] to-[#D4EAF7] rounded-full border-[4px] border-[#B5E3FF] shadow-lg shadow-[#B5E3FF]/30">
                                <span class="text-2xl">{recent.icon}</span>
                                <span class="font-['Lato'] text-base font-bold text-[#0F172A]">{recent.title}</span>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
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