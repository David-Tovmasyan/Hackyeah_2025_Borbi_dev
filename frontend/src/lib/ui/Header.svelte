<script lang="ts">
    import { goto } from '$app/navigation';
    
    // Mock data - w przyszłości z store/API
    let currentStreak = 7;
    let dailyGoalsCompleted = 2;
    let totalDailyGoals = 3;
    let todayProgress = (dailyGoalsCompleted / totalDailyGoals) * 100;
    let unlockedAchievements = 8;
    let totalAchievements = 12;
    
    // Streak animation state
    let isStreakAnimating = false;
    
    function handleStreakClick() {
        isStreakAnimating = true;
        setTimeout(() => isStreakAnimating = false, 1500);
    }
    
    function goToAchievements() {
        goto('/app/achievements');
    }
</script>

<div>
    <!-- GAMIFIKOWANY HEADER - Ładny i kompaktowy design -->
    <header class="
        h-20 w-full
        flex items-center justify-center relative
        bg-gradient-to-r from-[#D4EAF7] via-[#E8F4F8] to-[#B5E3FF] text-slate-900
        border-b-[6px] border-[#A7D8F0] shadow-xl shadow-[#A7D8F0]/30
        px-8 py-4 gap-8
      ">
        
        <!-- STREAK COUNTER - Kompaktowy -->
        <div 
            class="flex items-center gap-3 px-5 py-3 rounded-2xl 
                   bg-white/95 border-[4px] border-orange-300
                   shadow-lg shadow-orange-300/30 cursor-pointer
                   hover:scale-105 hover:shadow-xl hover:shadow-orange-300/40 
                   transition-all duration-200
                   focus:outline-none focus:ring-[4px] focus:ring-orange-400"
            class:animate-pulse={isStreakAnimating}
            onclick={handleStreakClick}
            tabindex="0"
            role="button"
            aria-label="Aktualna passa: {currentStreak} dni"
        >
            <div class="w-8 h-8 text-orange-500 transition-transform duration-300" 
                 class:animate-bounce={isStreakAnimating}>
                <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full drop-shadow-sm">
                    <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
            </div>
            <div class="flex flex-col">
                <span class="font-['Lato'] text-2xl font-bold text-slate-900 leading-none">
                    {currentStreak}
                </span>
                <span class="font-['Lato'] text-xs font-semibold text-slate-600 leading-tight">
                    dni z rzędu
                </span>
            </div>
        </div>
        
        <!-- DAILY PROGRESS - Centralny, bardziej elegancki -->
        <div class="flex-1 max-w-2xl px-8 py-2\\ rounded-2xl 
                    bg-white/95 border-[4px] border-[#7EC8E3]
                    shadow-lg shadow-[#7EC8E3]/30 hover:shadow-xl hover:shadow-[#7EC8E3]/40
                    transition-all duration-200">
            <div class="flex items-center justify-between mb-2">
                <h3 class="font-['Lato'] text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span class="text-xl">📅</span>
                    Postęp dzisiaj
                </h3>
                <span class="font-['Lato'] text-lg font-bold text-slate-700 bg-[#E8F4F8] px-3 py-1 rounded-full border-[2px] border-[#A7D8F0]">
                    {dailyGoalsCompleted}/{totalDailyGoals}
                </span>
            </div>
            
            <!-- Progress Bar - Elegantszy -->
            <div class="w-full h-4 bg-[#E8F4F8] rounded-full border-[3px] border-[#A7D8F0] overflow-hidden mb-2">
                <div 
                    class="h-full rounded-full transition-all duration-700 ease-out
                           bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] 
                           shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]"
                    style="width: {todayProgress}%"
                ></div>
            </div>
            
            <!-- Goals status - Ładniejsze -->
            <div class="flex justify-center gap-2">
                {#each Array(totalDailyGoals) as _, i}
                    <div class="relative group">
                        <div class="w-3 h-3 rounded-full border-[2px] transition-all duration-300
                                   {i < dailyGoalsCompleted ? 'bg-green-400 border-green-500 shadow-sm' : 'bg-[#E8F4F8] border-[#A7D8F0]'}
                                   group-hover:scale-125"
                        ></div>
                        {#if i < dailyGoalsCompleted}
                            <div class="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping"></div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
        
        <!-- ACHIEVEMENTS BADGE - Kompaktowy z nawigacją -->
        <div class="flex items-center gap-3 px-5 py-3 rounded-2xl 
                    bg-white/95 border-[4px] border-yellow-300
                    shadow-lg shadow-yellow-300/30 cursor-pointer
                    hover:scale-105 hover:shadow-xl hover:shadow-yellow-300/40
                    transition-all duration-200
                    focus:outline-none focus:ring-[4px] focus:ring-yellow-400"
             onclick={goToAchievements}
             tabindex="0"
             role="button"
             aria-label="Przejdź do osiągnięć - odblokowane: {unlockedAchievements} z {totalAchievements}">
            <div class="w-8 h-8 text-yellow-600">
                <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full drop-shadow-sm">
                    <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="flex flex-col">
                <span class="font-['Lato'] text-xl font-bold text-slate-900 leading-none">
                    {unlockedAchievements}/{totalAchievements}
                </span>
                <span class="font-['Lato'] text-xs font-semibold text-slate-600 leading-tight">
                    osiągnięcia
                </span>
            </div>
        </div>

    </header>
</div>
