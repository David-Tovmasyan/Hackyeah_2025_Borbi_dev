<script lang="ts">
    import { currentUser } from '$lib/stores/user';

    type UserQuest = {
        id: string; // UUID
        questId: string;
        userId: string;
        completed: boolean;
        date: Date;
    };

    type Quest = {
        id: string;
        title: string;
        description: string;
        emoji: string;
        difficulty: 'easy' | 'medium' | 'hard';
        category: 'activity' | 'diet' | 'sleep' | 'mindfulness';
    };

    type DayGoals = {
        sleep: UserQuest;
        diet: UserQuest;
        activity: UserQuest;
    };

    type RoadmapStep = {
        id: number;
        dayGoals: DayGoals;
        status: 'completed' | 'current' | 'locked';
        position: { x: number; y: number };
        dayNumber: number;
        isToday?: boolean;
        completionPercentage: number; // 0-100% based on completed goals
    };

    // Mock Quests data by category (UTF-8 emojis)
    const sleepQuests: Quest[] = [
        { id: 'sleep1', title: '8 godzin snu', description: 'Śpij co najmniej 8 godzin', emoji: '💤', difficulty: 'medium', category: 'sleep' },
        { id: 'sleep2', title: 'Bez ekranów przed snem', description: '1h bez ekranów przed snem', emoji: '📵', difficulty: 'medium', category: 'sleep' },
        { id: 'sleep3', title: 'Regularna pora snu', description: 'Idź spać o tej samej porze', emoji: '🕘', difficulty: 'easy', category: 'sleep' },
        { id: 'sleep4', title: 'Spokojne budzenie', description: 'Wstań bez użycia alarmu', emoji: '🌅', difficulty: 'hard', category: 'sleep' },
        { id: 'sleep5', title: 'Relaksacja przed snem', description: '15 min medytacji przed snem', emoji: '🧘‍♀️', difficulty: 'medium', category: 'sleep' }
    ];

    const dietQuests: Quest[] = [
        { id: 'diet1', title: 'Zdrowe śniadanie', description: 'Zjedz pożywne śniadanie', emoji: '🥗', difficulty: 'easy', category: 'diet' },
        { id: 'diet2', title: '2L wody', description: 'Wypij 2 litry wody', emoji: '💧', difficulty: 'easy', category: 'diet' },
        { id: 'diet3', title: 'Bez fast food', description: 'Unikaj fast foodów', emoji: '🥪', difficulty: 'medium', category: 'diet' },
        { id: 'diet4', title: '5 porcji warzyw', description: 'Zjedz 5 porcji owoców/warzyw', emoji: '🍎', difficulty: 'medium', category: 'diet' },
        { id: 'diet5', title: 'Bez cukru', description: 'Dzień bez słodyczy', emoji: '🚫🍭', difficulty: 'hard', category: 'diet' }
    ];

    const activityQuests: Quest[] = [
        { id: 'activity1', title: '10,000 kroków', description: 'Zrób 10,000 kroków', emoji: '🚶', difficulty: 'medium', category: 'activity' },
        { id: 'activity2', title: '30min ćwiczeń', description: 'Ćwicz przez 30 minut', emoji: '🏃', difficulty: 'medium', category: 'activity' },
        { id: 'activity3', title: 'Aktywność outdoor', description: 'Spędź 1h na zewnątrz', emoji: '🌳', difficulty: 'easy', category: 'activity' },
        { id: 'activity4', title: 'Siłownia', description: 'Trening siłowy', emoji: '💪', difficulty: 'hard', category: 'activity' },
        { id: 'activity5', title: 'Rozciąganie', description: '15min stretching', emoji: '🤸‍♀️', difficulty: 'easy', category: 'activity' }
    ];

    // Helper function to create quest for a day and category
    function createDayQuest(day: number, category: 'sleep' | 'diet' | 'activity', userStreak: number): UserQuest {
        const questsByCategory = {
            sleep: sleepQuests,
            diet: dietQuests,
            activity: activityQuests
        };
        
        const categoryQuests = questsByCategory[category];
        const questIndex = (day - 1) % categoryQuests.length;
        const quest = categoryQuests[questIndex];
        
        return {
            id: `day${day}-${category}`,
            questId: quest.id,
            userId: $currentUser?.id || 'unknown',
            completed: day <= userStreak, // Completed if within user's streak
            date: new Date()
        };
    }

    const allQuests = [...sleepQuests, ...dietQuests, ...activityQuests];

    // Generate roadmap data based on user streak
    function generateRoadmapData(userStreak: number): RoadmapStep[] {
        // Generate enough steps - show completed streak + next 5 steps
        const totalSteps = Math.max(userStreak + 5, 10);
        
        // Generate positions in zigzag pattern
        const positions: { x: number; y: number }[] = [];
        for (let i = 0; i < totalSteps; i++) {
            const yStep = (90 / (totalSteps - 1));
            const yPos = 5 + (i * yStep);
            
            let xPos: number;
            if (i % 4 === 0) xPos = 50; // Center
            else if (i % 4 === 1) xPos = 25; // Left
            else if (i % 4 === 2) xPos = 50; // Center
            else xPos = 75; // Right
            
            positions.push({ x: xPos, y: yPos });
        }

        const steps: RoadmapStep[] = [];
        
        // Generate steps based on user's streak
        for (let day = 1; day <= totalSteps; day++) {
            // Create quests for this day
            const sleepQuest = createDayQuest(day, 'sleep', userStreak);
            const dietQuest = createDayQuest(day, 'diet', userStreak);
            const activityQuest = createDayQuest(day, 'activity', userStreak);

            const completedGoals = [sleepQuest, dietQuest, activityQuest].filter(q => q.completed).length;
            const completionPercentage = (completedGoals / 3) * 100;

            let status: 'completed' | 'current' | 'locked';
            let isToday = false;
            
            if (day <= userStreak) {
                // Within streak - completed
                status = 'completed';
            } else if (day === userStreak + 1) {
                // Next day after streak - current
                status = 'current';
                isToday = true;
            } else {
                // Future days - locked
                status = 'locked';
            }

            steps.push({
                id: day,
                dayGoals: {
                    sleep: sleepQuest,
                    diet: dietQuest,
                    activity: activityQuest
                },
                status,
                position: positions[day - 1],
                dayNumber: day,
                isToday,
                completionPercentage
            });
        }

        return steps;
    }

    // Reactive roadmap data based on user streak
    $: userStreak = $currentUser?.streak || 0;
    $: roadmapData = generateRoadmapData(userStreak);
    $: currentStreak = userStreak;
    
    export let dailyGoalCompleted: boolean = false;

    const pathStart = { x: 50, y: 3 };

    function buildPath(uptoIndex: number) {
        if (!roadmapData.length) {
            return `M ${pathStart.x} ${pathStart.y}`;
        }

        const clampedIndex = Math.max(0, Math.min(uptoIndex, roadmapData.length - 1));
        const steps = roadmapData.slice(0, clampedIndex + 1);

        let path = `M ${pathStart.x} ${pathStart.y}`;

        if (steps.length > 0) {
            const first = steps[0].position;
            path += ` L ${first.x} ${first.y}`;
        }

        for (let i = 1; i < steps.length; i++) {
            const prev = steps[i - 1].position;
            const curr = steps[i].position;
            // Create triangular curved path - smooth curves between center-left-center-right pattern
            const midX = (prev.x + curr.x) / 2;
            const midY = (prev.y + curr.y) / 2;
            
            // Add curve control point for smooth triangular transitions
            let controlX = midX;
            if (prev.x === 50 && curr.x !== 50) {
                // From center to side - curve outward
                controlX = midX + (curr.x > 50 ? 8 : -8);
            } else if (prev.x !== 50 && curr.x === 50) {
                // From side to center - curve inward
                controlX = midX + (prev.x > 50 ? 8 : -8);
            }
            
            path += ` Q ${controlX} ${midY}, ${curr.x} ${curr.y}`;
        }

        return path;
    }

    let fullPathD = '';
    let completedPathD = '';
    let hasCompleted = false;

    $: fullPathD = buildPath(roadmapData.length - 1);

    $: {
        const lastCompletedIndex = roadmapData.reduce((acc, step, index) => (
            step.status === 'completed' ? index : acc
        ), -1);

        if (lastCompletedIndex >= 0) {
            completedPathD = buildPath(lastCompletedIndex);
            hasCompleted = true;
        } else {
            completedPathD = '';
            hasCompleted = false;
        }
    }

    function handleStepClick(step: RoadmapStep) {
        if (!step.isToday || step.status !== 'current') return;
        
        // Check if all daily goals are completed
        const allCompleted = Object.values(step.dayGoals).every(quest => quest.completed);
        
        if (allCompleted && $currentUser) {
            // Update user streak in store
            const newStreak = userStreak + 1;
            currentUser.update(user => user ? { ...user, streak: newStreak } : user);
            
            dailyGoalCompleted = true;
            console.log(`Day ${step.dayNumber} completed! All goals achieved. New streak: ${newStreak}`);
        } else {
            console.log(`Day ${step.dayNumber} not yet complete. Complete all goals: Sleep ✓ Diet ✓ Activity ✓`);
        }
    }

    // Function to toggle individual goal completion (for current day only)
    function toggleGoal(step: RoadmapStep, category: 'sleep' | 'diet' | 'activity') {
        if (!step.isToday) return;
        
        // Only allow toggling if it's the current day (streak + 1)
        if (step.dayNumber === userStreak + 1) {
            step.dayGoals[category].completed = !step.dayGoals[category].completed;
            
            // Recalculate completion percentage
            const completedGoals = Object.values(step.dayGoals).filter(quest => quest.completed).length;
            step.completionPercentage = (completedGoals / 3) * 100;
            
            // Force reactivity
            roadmapData = [...roadmapData];
        }
    }
</script>

<!-- ROADMAP dla neuroatypowych - pastele, spokojne kolory -->
<div class="w-full h-full relative bg-gradient-to-b from-[#E8F4F8] via-[#D1E7ED] to-[#B8DCE5] rounded-3xl px-4 pb-6 overflow-y-auto overflow-x-hidden shadow-[0_10px_40px_rgba(167,216,240,0.4)] border-[6px] border-[#A7D8F0] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-[#7EC8E3]/50 [&::-webkit-scrollbar-thumb]:rounded-lg hover:[&::-webkit-scrollbar-thumb]:bg-[#7EC8E3]/70 md:px-6 md:pb-8 md:rounded-3xl">
    <div class="relative w-full min-h-[1200px] pt-[clamp(4rem,8vw,5rem)] pb-8 md:min-h-[1000px] md:pt-[4rem] md:pb-6">
        <div class="absolute top-[clamp(0.75rem,2vw,1.75rem)] right-[clamp(0.75rem,3vw,2rem)] flex items-center gap-3 px-5 py-3.5 rounded-[18px] bg-white/95 border-[4px] border-[#A7D8F0] shadow-[0_12px_30px_rgba(167,216,240,0.4)] backdrop-blur-sm z-[6] md:top-4 md:right-4 md:px-4 md:py-3 md:gap-2.5">
            <div class="w-10 h-10 text-orange-500 transition-all duration-300 md:w-9 md:h-9" class:fire-flicker={dailyGoalCompleted} style="filter: drop-shadow(0 2px 8px rgba(249, 115, 22, 0.4));">
                <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
                    <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
            </div>
            <span class="font-['Lato'] text-[2rem] font-bold text-slate-900 leading-none md:text-[1.75rem]" style="text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">{currentStreak}</span>
        </div>

        <!-- Main curved path line -->
        <svg class="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none" viewBox="0 0 100 105" preserveAspectRatio="none">
            <!-- Dynamically generated curved path -->
            <path
                d={fullPathD}
                class="stroke-[#A7D8F0] stroke-[3] transition-all duration-500 md:stroke-[2.5]"
                fill="none"
                stroke-linecap="round"
            />
            
            <!-- Completed portion of path -->
            {#if hasCompleted}
                <path
                    d={completedPathD}
                    class="stroke-[#5DADE2] stroke-[4] path-grow md:stroke-[3.5]"
                    fill="none"
                    stroke-linecap="round"
                    style="filter: drop-shadow(0 0 8px rgba(93, 173, 226, 0.4));"
                />
            {/if}
        </svg>

        <!-- Step nodes -->
        {#each roadmapData as step (step.id)}
            <div 
                class="group absolute -translate-x-1/2 -translate-y-1/2 z-[5] cursor-pointer transition-all duration-300 hover:z-10"
                class:cursor-not-allowed={step.status === 'locked'}
                class:cursor-pointer={step.isToday}
                style="left: {step.position.x}%; top: {step.position.y}%;"
                on:click={() => handleStepClick(step)}
                on:keydown={(e) => e.key === 'Enter' && handleStepClick(step)}
                tabindex="0"
                role="button"
                aria-label="Dzień {step.dayNumber}: {step.completionPercentage}% ukończone"
            >
                <div 
                    class="w-[clamp(3.5rem,8vw,4.5rem)] h-[clamp(3.5rem,8vw,4.5rem)] rounded-full flex items-center justify-center relative transition-all duration-[250ms] border-b-4 border-transparent box-border"
                    class:step-completed={step.status === 'completed'}
                    class:step-current={step.status === 'current'}
                    class:step-locked={step.status === 'locked'}
                    class:step-today-hover={step.isToday}
                >
                    <div class="flex items-center justify-center w-full h-full text-white">
                        <!-- Zawsze pokaż numer kroku -->
                        <div class="flex flex-col items-center justify-center">
                            <span class="font-['Lato'] text-[clamp(0.8rem,2.5vw,1rem)] font-bold text-white" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);">{step.dayNumber}</span>
                            {#if step.status === 'current' && step.completionPercentage > 0 && step.completionPercentage < 100}
                                <div class="w-6 h-0.5 bg-white/30 rounded-full mt-0.5 overflow-hidden">
                                    <div class="h-full bg-white rounded-full transition-all duration-300" style="width: {step.completionPercentage}%"></div>
                                </div>
                            {:else if step.status === 'completed'}
                                <!-- Mała ikona checkmark pod numerem dla ukończonych -->
                                <div class="mt-0.5">
                                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" style="filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));">
                                        <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
                
                <div class="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 bg-white/98 backdrop-blur-md rounded-xl px-4 py-3 min-w-[clamp(250px,35vw,320px)] max-w-[clamp(280px,40vw,350px)] text-left shadow-[0_10px_25px_rgba(167,216,240,0.6)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2 border-2 border-[#A7D8F0] z-30 group-hover:translate-y-1">
                    <h3 class="font-['Lato'] text-lg font-bold text-slate-900 mb-2 text-center">Day {step.dayNumber}</h3>
                    
                    <!-- Daily goals progress -->
                    <div class="space-y-1 mb-2">
                        {#each Object.entries(step.dayGoals) as [categoryKey, userQuest]}
                            {@const category = categoryKey as 'sleep' | 'diet' | 'activity'}
                            {@const quest = allQuests.find(q => q.id === userQuest.questId)}
                            {#if quest}
                                <div class="flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg bg-[#F0F9FF] border border-[#B5E3FF]">
                                    <div class="flex items-center gap-2 flex-1">
                                        <span class="text-lg">{quest.emoji}</span>
                                        <div class="flex-1">
                                            <span class="font-bold text-slate-800 text-sm block">{quest.title}</span>
                                            <span class="text-xs text-slate-600">{quest.description}</span>
                                        </div>
                                    </div>
                                    <div class="ml-auto">
                                        {#if userQuest.completed}
                                            <div class="w-6 h-6 bg-[#86efac] border-2 border-[#4ade80] rounded-full flex items-center justify-center">
                                                <span class="text-white font-bold text-sm">✓</span>
                                            </div>
                                        {:else if step.isToday}
                                            <button 
                                                class="w-6 h-6 border-2 border-[#A7D8F0] rounded-md hover:border-[#7EC8E3] hover:bg-[#F0F9FF] transition-all duration-200 flex items-center justify-center"
                                                aria-label="Oznacz {quest.title} jako wykonane"
                                                on:click|stopPropagation={() => toggleGoal(step, category)}
                                            >
                                                <span class="text-[#7EC8E3] text-sm">+</span>
                                            </button>
                                        {:else}
                                            <div class="w-6 h-6 border-2 border-[#D4EAF7] rounded-full flex items-center justify-center">
                                                <span class="text-[#A7D8F0] text-sm">◯</span>
                                            </div>
                                        {/if}
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    </div>
                    
                    <!-- Progress indicator -->
                    <div class="flex items-center gap-2 mt-2 pt-2 border-t border-[#B5E3FF]">
                        <div class="flex-1 h-2 bg-[#E8F4F8] rounded-full overflow-hidden border border-[#A7D8F0]">
                            <div 
                                class="h-full rounded-full transition-all duration-500 shadow-inner"
                                class:bg-[#86efac]={step.completionPercentage === 100}
                                class:bg-gradient-to-r={step.completionPercentage > 0 && step.completionPercentage < 100}
                                class:from-[#7EC8E3]={step.completionPercentage > 0 && step.completionPercentage < 100}
                                class:to-[#5DADE2]={step.completionPercentage > 0 && step.completionPercentage < 100}
                                class:bg-[#D4EAF7]={step.completionPercentage === 0}
                                style="width: {step.completionPercentage}%"
                            ></div>
                        </div>
                        <span class="text-sm font-bold text-slate-700 min-w-[2rem] text-center">
                            {Math.round(step.completionPercentage)}%
                        </span>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    @keyframes fireFlicker {
        0%, 100% {
            filter: drop-shadow(0 2px 8px rgba(249, 115, 22, 0.4));
            transform: scale(1);
        }
        50% {
            filter: drop-shadow(0 2px 12px rgba(249, 115, 22, 0.6));
            transform: scale(1.08);
        }
    }

    .fire-flicker {
        animation: fireFlicker 1.5s ease-in-out infinite;
    }

    @keyframes pathGrow {
        from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
        }
        to {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
        }
    }

    .path-grow {
        animation: pathGrow 1.5s ease-out forwards;
    }

    @keyframes popIn {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes gentlePulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }

    .step-completed {
        background: linear-gradient(135deg, #86efac 0%, #4ade80 100%);
        border-bottom-color: #22c55e;
        box-shadow: 
            0 6px 0 #22c55e,
            0 8px 20px rgba(134, 239, 172, 0.4),
            inset 0 -2px 0 rgba(0, 0, 0, 0.1),
            inset 0 2px 4px rgba(255, 255, 255, 0.3);
        animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .step-completed:hover {
        transform: translateY(3px) scale(1.05);
        box-shadow: 
            0 3px 0 #22c55e,
            0 5px 15px rgba(134, 239, 172, 0.5),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1),
            inset 0 1px 3px rgba(255, 255, 255, 0.3);
    }

    .step-current {
        background: linear-gradient(135deg, #7EC8E3 0%, #5DADE2 100%);
        border-bottom-color: #4A9DD2;
        box-shadow: 
            0 6px 0 #4A9DD2,
            0 8px 25px rgba(126, 200, 227, 0.4),
            0 0 20px rgba(126, 200, 227, 0.3),
            inset 0 -2px 0 rgba(0, 0, 0, 0.1),
            inset 0 2px 4px rgba(255, 255, 255, 0.3);
        animation: gentlePulse 2.5s ease-in-out infinite;
    }

    .step-current:hover {
        transform: translateY(3px) scale(1.05);
        box-shadow: 
            0 3px 0 #4A9DD2,
            0 5px 20px rgba(126, 200, 227, 0.6),
            0 0 15px rgba(126, 200, 227, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1),
            inset 0 1px 3px rgba(255, 255, 255, 0.3);
    }

    .step-locked {
        background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
        border-bottom-color: #94a3b8;
        box-shadow: 
            0 5px 0 #94a3b8,
            0 6px 15px rgba(203, 213, 225, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1),
            inset 0 1px 2px rgba(255, 255, 255, 0.5);
        opacity: 0.8;
    }

    .step-locked :global(span) {
        color: #64748b !important;
        text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5) !important;
    }

    .step-locked:hover {
        transform: translateY(1px);
        opacity: 0.6;
        box-shadow: 
            0 4px 0 #94a3b8,
            0 5px 12px rgba(203, 213, 225, 0.4),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1),
            inset 0 1px 2px rgba(255, 255, 255, 0.5);
    }

    .step-today-hover:hover {
        transform: scale(1.1);
        box-shadow: 
            0 6px 0 #4A9DD2,
            0 8px 25px rgba(126, 200, 227, 0.6),
            0 0 20px rgba(126, 200, 227, 0.4),
            inset 0 -2px 0 rgba(0, 0, 0, 0.1),
            inset 0 2px 4px rgba(255, 255, 255, 0.3);
    }
</style>
