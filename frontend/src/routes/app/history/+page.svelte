<script lang="ts">
    type HistoryEntry = {
        date: string;
        completed: boolean;
        streak: number;
        dayNumber: number;
    };

    const historyData: HistoryEntry[] = [
        { date: "2025-10-04", completed: true, streak: 3, dayNumber: 3 },
        { date: "2025-10-03", completed: true, streak: 2, dayNumber: 2 },
        { date: "2025-10-02", completed: true, streak: 1, dayNumber: 1 },
        { date: "2025-10-01", completed: false, streak: 0, dayNumber: 0 },
        { date: "2025-09-30", completed: false, streak: 0, dayNumber: 0 },
        { date: "2025-09-29", completed: true, streak: 5, dayNumber: 5 },
        { date: "2025-09-28", completed: true, streak: 4, dayNumber: 4 },
    ];

    function formatDate(dateStr: string): string {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });
    }
</script>

<div class="w-full max-w-4xl mx-auto p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
        <h1 class="font-['Lato'] text-3xl font-bold text-stone-50">
            Your Progress History
        </h1>
        <div class="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
            <span class="font-['Lato'] text-sm text-blue-300">
                Total Days: {historyData.filter(d => d.completed).length}
            </span>
        </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Current Streak -->
        <div class="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6 space-y-2">
            <div class="flex items-center gap-2">
                <svg class="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
                <h3 class="font-['Lato'] text-sm font-semibold text-stone-300">Current Streak</h3>
            </div>
            <p class="font-['Lato'] text-4xl font-bold text-orange-400">
                {historyData[0].streak}
            </p>
            <p class="text-xs text-stone-400">days in a row</p>
        </div>

        <!-- Best Streak -->
        <div class="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 space-y-2">
            <div class="flex items-center gap-2">
                <svg class="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 class="font-['Lato'] text-sm font-semibold text-stone-300">Best Streak</h3>
            </div>
            <p class="font-['Lato'] text-4xl font-bold text-green-400">
                {Math.max(...historyData.map(d => d.streak))}
            </p>
            <p class="text-xs text-stone-400">personal record</p>
        </div>

        <!-- Total Completed -->
        <div class="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 space-y-2">
            <div class="flex items-center gap-2">
                <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="font-['Lato'] text-sm font-semibold text-stone-300">Completed</h3>
            </div>
            <p class="font-['Lato'] text-4xl font-bold text-blue-400">
                {historyData.filter(d => d.completed).length}
            </p>
            <p class="text-xs text-stone-400">total days</p>
        </div>
    </div>

    <!-- History Timeline -->
    <div class="bg-gradient-to-b from-stone-900/50 to-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6">
        <h2 class="font-['Lato'] text-xl font-bold text-stone-50 mb-4">Recent Activity</h2>
        
        <div class="space-y-3">
            {#each historyData as entry}
                <div class="group flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-stone-700/30">
                    <!-- Status Icon -->
                    <div class="flex-shrink-0">
                        {#if entry.completed}
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                                <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        {:else}
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-stone-700 to-stone-800 flex items-center justify-center border border-stone-600">
                                <svg class="w-6 h-6 text-stone-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        {/if}
                    </div>

                    <!-- Date Info -->
                    <div class="flex-1">
                        <p class="font-['Lato'] text-base font-semibold text-stone-100">
                            {formatDate(entry.date)}
                        </p>
                        <p class="text-sm text-stone-400">
                            {#if entry.completed}
                                Day {entry.dayNumber} completed • Streak: {entry.streak}
                            {:else}
                                Missed day
                            {/if}
                        </p>
                    </div>

                    <!-- Streak Badge -->
                    {#if entry.completed && entry.streak > 0}
                        <div class="flex-shrink-0 px-3 py-1.5 bg-orange-500/20 rounded-full border border-orange-500/30">
                            <span class="font-['Lato'] text-xs font-bold text-orange-400">
                                🔥 {entry.streak}
                            </span>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>

    <!-- Weekly Overview -->
    <div class="bg-gradient-to-b from-stone-900/50 to-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6">
        <h2 class="font-['Lato'] text-xl font-bold text-stone-50 mb-4">This Week</h2>
        
        <div class="grid grid-cols-7 gap-2">
            {#each historyData.slice(0, 7).reverse() as entry}
                <div class="flex flex-col items-center gap-2">
                    <span class="text-xs text-stone-400 font-medium">
                        {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <div 
                        class={`w-12 h-12 rounded-lg transition-all duration-200 flex items-center justify-center ${
                            entry.completed 
                                ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20' 
                                : 'bg-stone-800 border border-stone-700'
                        }`}
                    >
                        {#if entry.completed}
                            <span class="text-xl">✓</span>
                        {:else}
                            <span class="text-xl text-stone-600">−</span>
                        {/if}
                    </div>
                    <span class="text-[0.65rem] text-stone-500">
                        {new Date(entry.date).getDate()}
                    </span>
                </div>
            {/each}
        </div>
    </div>
</div>
