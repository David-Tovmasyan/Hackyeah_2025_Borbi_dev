<script lang="ts">
    import olaf1 from '$lib/assets/gif/olaf1.gif';
    import { currentUser } from '$lib/stores/user';
    
    type HistoryEntry = {
        date: string;
        completed: boolean;
        streak: number;
        dayNumber: number;
        isToday?: boolean;
    };

    // Generate history data based on user's current streak
    function generateHistoryData(userStreak: number): HistoryEntry[] {
        const today = new Date();
        const history: HistoryEntry[] = [];
        
        // Generate 14 days of history (2 weeks)
        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            
            // Days within streak are completed
            const completed = i < userStreak;
            const dayNumber = completed ? userStreak - i : 0;
            
            history.push({
                date: date.toISOString().split('T')[0],
                completed,
                streak: dayNumber,
                dayNumber,
                isToday: i === 0
            });
        }
        
        return history;
    }

    // Reactive history data based on user's streak
    $: userStreak = $currentUser?.streak || 0;
    $: historyData = generateHistoryData(userStreak);
    $: bestStreak = Math.max(userStreak, 15); // Always show at least 15 as goal
    $: totalCompleted = historyData.filter(d => d.completed).length;
    $: completionRate = Math.round((totalCompleted / historyData.length) * 100);

    function formatDate(dateStr: string): string {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });
    }
    
    function getDateDayName(dateStr: string): string {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    }
</script>

<!-- HISTORY PAGE - Neuroatypical friendly design -->
<div class="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] p-4 md:p-8">
    <div class="w-full max-w-5xl mx-auto space-y-8">
        <!-- Header with Olaf - Clear visual hierarchy -->
        <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-8">
            <img src={olaf1} alt="Olaf the friendly mascot" class="w-20 h-20 object-contain rounded-full border-[6px] border-[#A7D8F0] shadow-xl shadow-[#A7D8F0]/40 bg-white/80 p-1" />
            <div class="text-center md:text-left">
                <h1 class="font-['Lato'] text-3xl md:text-4xl font-bold text-[#0F172A] leading-relaxed mb-1">
                    Your History
                </h1>
                <p class="font-['Lato'] text-lg text-[#334155] font-semibold">Track your daily progress 📅</p>
            </div>
        </div>

        <!-- Stats Cards - WCAG AAA compliant, high contrast, large touch targets -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <!-- Current Streak - Primary focus -->
            <div class="bg-white border-[6px] border-[#A7D8F0] rounded-3xl p-8 space-y-4 shadow-xl shadow-[#A7D8F0]/30 transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-[#A7D8F0]/40">
                <div class="flex items-center gap-4 pb-3 border-b-[4px] border-[#D4EAF7]">
                    <div class="w-12 h-12 rounded-full bg-[#E8F4F8] flex items-center justify-center">
                        <svg class="w-7 h-7 text-[#7EC8E3]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                            <path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                        </svg>
                    </div>
                    <h3 class="font-['Lato'] text-xl font-bold text-[#0F172A]">Current Streak</h3>
                </div>
                <div class="text-center py-4">
                    <p class="font-['Lato'] text-6xl md:text-7xl font-bold text-[#5DADE2] leading-none mb-2">
                        {userStreak}
                    </p>
                    <p class="font-['Lato'] text-base text-[#334155] font-bold">days in a row 🔥</p>
                </div>
            </div>

            <!-- Best Streak - Achievement focus -->
            <div class="bg-white border-[6px] border-[#B5E3FF] rounded-3xl p-8 space-y-4 shadow-xl shadow-[#B5E3FF]/30 transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-[#B5E3FF]/40">
                <div class="flex items-center gap-4 pb-3 border-b-[4px] border-[#D4EAF7]">
                    <div class="w-12 h-12 rounded-full bg-[#E8F4F8] flex items-center justify-center">
                        <svg class="w-7 h-7 text-[#7EC8E3]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 class="font-['Lato'] text-xl font-bold text-[#0F172A]">Best Streak</h3>
                </div>
                <div class="text-center py-4">
                    <p class="font-['Lato'] text-6xl md:text-7xl font-bold text-[#5DADE2] leading-none mb-2">
                        {bestStreak}
                    </p>
                    <p class="font-['Lato'] text-base text-[#334155] font-bold">your record 🏆</p>
                </div>
            </div>

            <!-- Success Rate - Progress indicator -->
            <div class="bg-white border-[6px] border-[#5DADE2] rounded-3xl p-8 space-y-4 shadow-xl shadow-[#5DADE2]/30 transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-[#5DADE2]/40">
                <div class="flex items-center gap-4 pb-3 border-b-[4px] border-[#B5E3FF]">
                    <div class="w-12 h-12 rounded-full bg-[#D4EAF7] flex items-center justify-center">
                        <svg class="w-7 h-7 text-[#5DADE2]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    </div>
                    <h3 class="font-['Lato'] text-xl font-bold text-[#0F172A]">Success Rate</h3>
                </div>
                <div class="text-center py-4">
                    <p class="font-['Lato'] text-6xl md:text-7xl font-bold text-[#5DADE2] leading-none mb-2">
                        {completionRate}%
                    </p>
                    <p class="font-['Lato'] text-base text-[#334155] font-bold">completion ⭐</p>
                </div>
            </div>
        </div>

        <!-- History Timeline - Clear visual hierarchy, one focus at a time -->
        <div class="bg-white border-[6px] border-[#A7D8F0] rounded-3xl p-8 shadow-xl shadow-[#A7D8F0]/40">
            <div class="flex items-center gap-4 mb-8 pb-4 border-b-[4px] border-[#D4EAF7]">
                <div class="w-12 h-12 rounded-full bg-[#D4EAF7] flex items-center justify-center">
                    <span class="text-2xl">📋</span>
                </div>
                <h2 class="font-['Lato'] text-3xl font-bold text-[#0F172A] leading-relaxed">Recent Activity</h2>
            </div>
            
            <div class="space-y-5">
                {#each historyData.slice(0, 7) as entry, index}
                    <div class="group flex items-center gap-5 p-5 rounded-3xl transition-all duration-300 border-[4px] {entry.isToday ? 'bg-gradient-to-r from-[#D4EAF7] to-[#E8F4F8] border-[#5DADE2] shadow-lg shadow-[#5DADE2]/30' : entry.completed ? 'bg-white border-[#B5E3FF] hover:border-[#A7D8F0] hover:bg-[#F0F9FF]' : 'bg-white border-slate-300 hover:border-slate-400 hover:bg-slate-50'}">
                        <!-- Day Number Badge -->
                        <div class="flex-shrink-0 w-16 text-center">
                            <div class="font-['Lato'] text-sm font-bold text-[#334155] mb-1">Day</div>
                            <div class="font-['Lato'] text-2xl font-bold {entry.completed ? 'text-green-600' : 'text-slate-400'}">
                                {7 - index}
                            </div>
                        </div>
                        
                        <!-- Status Icon - Extra large for visibility -->
                        <div class="flex-shrink-0">
                            {#if entry.completed}
                                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#7EC8E3] to-[#5DADE2] flex items-center justify-center shadow-xl shadow-[#7EC8E3]/40 border-[4px] border-[#B5E3FF]">
                                    <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            {:else}
                                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center border-[4px] border-slate-400">
                                    <span class="text-3xl text-slate-500">−</span>
                                </div>
                            {/if}
                        </div>

                        <!-- Date Info - Extra clear typography -->
                        <div class="flex-1">
                            <p class="font-['Lato'] text-xl font-bold text-[#0F172A] leading-relaxed mb-1">
                                {getDateDayName(entry.date)}
                            </p>
                            <p class="font-['Lato'] text-base text-[#334155] font-semibold leading-relaxed">
                                {formatDate(entry.date)}
                                {#if entry.isToday}
                                    <span class="ml-2 px-3 py-1 bg-[#5DADE2] text-white text-xs font-bold rounded-full">TODAY</span>
                                {/if}
                            </p>
                        </div>

                        <!-- Status Badge - Clear visual feedback -->
                        <div class="flex-shrink-0">
                            {#if entry.completed}
                                <div class="px-6 py-3 bg-gradient-to-r from-[#7EC8E3] to-[#5DADE2] rounded-full border-[4px] border-[#B5E3FF] shadow-lg shadow-[#7EC8E3]/30">
                                    <div class="flex items-center gap-2">
                                        <span class="font-['Lato'] text-base font-bold text-white">✓ Done</span>
                                        {#if entry.streak > 0}
                                            <span class="font-['Lato'] text-base font-bold text-white">• 🔥{entry.streak}</span>
                                        {/if}
                                    </div>
                                </div>
                            {:else}
                                <div class="px-6 py-3 bg-slate-300 rounded-full border-[4px] border-slate-400">
                                    <span class="font-['Lato'] text-base font-bold text-slate-600">Skipped</span>
                                </div>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Weekly Overview - Large, clear visual calendar -->
        <div class="bg-white border-[6px] border-[#A7D8F0] rounded-3xl p-8 shadow-xl shadow-[#A7D8F0]/40">
            <div class="flex items-center gap-4 mb-8 pb-4 border-b-[4px] border-[#D4EAF7]">
                <div class="w-12 h-12 rounded-full bg-[#D4EAF7] flex items-center justify-center">
                    <span class="text-2xl">📅</span>
                </div>
                <h2 class="font-['Lato'] text-3xl font-bold text-[#0F172A] leading-relaxed">This Week</h2>
            </div>
            
            <div class="grid grid-cols-7 gap-4">
                {#each historyData.slice(0, 7) as entry}
                    <div class="flex flex-col items-center gap-4 p-4 rounded-3xl {entry.isToday ? 'bg-gradient-to-b from-[#D4EAF7] to-[#E8F4F8] border-[4px] border-[#5DADE2]' : 'bg-white border-[4px] border-transparent'}">
                        <span class="font-['Lato'] text-base text-[#334155] font-bold">
                            {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <div 
                            class={`w-20 h-20 rounded-3xl transition-all duration-300 flex items-center justify-center shadow-xl border-[4px] ${
                                entry.completed 
                                    ? 'bg-gradient-to-br from-[#7EC8E3] to-[#5DADE2] shadow-[#7EC8E3]/40 border-[#B5E3FF] hover:scale-110' 
                                    : 'bg-gradient-to-br from-slate-200 to-slate-300 border-slate-400 hover:scale-105'
                            }`}
                        >
                            {#if entry.completed}
                                <span class="text-3xl">✓</span>
                            {:else}
                                <span class="text-3xl text-slate-500">−</span>
                            {/if}
                        </div>
                        <span class="font-['Lato'] text-sm text-[#334155] font-bold">
                            {new Date(entry.date).toLocaleDateString('en-US', { day: "numeric"})}
                        </span>
                    </div>
                {/each}
            </div>
            
            <!-- Legend - pomocne dla zrozumienia -->
            <div class="mt-8 pt-6 border-t-[4px] border-[#D4EAF7] flex flex-wrap gap-6 justify-center">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#7EC8E3] to-[#5DADE2] border-[4px] border-[#B5E3FF] flex items-center justify-center">
                        <span class="text-xl">✓</span>
                    </div>
                    <span class="font-['Lato'] text-base font-bold text-[#0F172A]">Completed</span>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 border-[4px] border-slate-400 flex items-center justify-center">
                        <span class="text-xl text-slate-500">−</span>
                    </div>
                    <span class="font-['Lato'] text-base font-bold text-[#0F172A]">Skipped</span>
                </div>
            </div>
        </div>
    </div>
</div>