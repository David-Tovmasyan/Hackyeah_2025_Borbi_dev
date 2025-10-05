<script lang="ts">
    export let roadmapData: Array<{
        id: number;
        title: string;
        description: string;
        status: 'completed' | 'current' | 'locked';
        position: { x: number; y: number };
        level?: number;
        isToday?: boolean;
    }> = [
        { 
            id: 1, 
            title: "Day 1", 
            description: "Start your journey", 
            status: 'completed', 
            position: { x: 50, y: 8 },
            level: 1
        },
        { 
            id: 2, 
            title: "Day 2", 
            description: "Keep building momentum", 
            status: 'completed', 
            position: { x: 38, y: 18 },
            level: 2
        },
        { 
            id: 3, 
            title: "Day 3", 
            description: "You're on fire!", 
            status: 'current', 
            position: { x: 62, y: 28 },
            level: 3,
            isToday: true
        },
        { 
            id: 4, 
            title: "Day 4", 
            description: "Consistency is key", 
            status: 'locked', 
            position: { x: 36, y: 38 },
            level: 4
        },
        { 
            id: 5, 
            title: "Day 5", 
            description: "Halfway there!", 
            status: 'locked', 
            position: { x: 64, y: 48 },
            level: 5
        },
        { 
            id: 6, 
            title: "Day 6", 
            description: "Keep the streak alive", 
            status: 'locked', 
            position: { x: 34, y: 58 },
            level: 6
        },
        { 
            id: 7, 
            title: "Day 7", 
            description: "One week strong!", 
            status: 'locked', 
            position: { x: 66, y: 68 },
            level: 7
        },
        { 
            id: 8, 
            title: "Day 8", 
            description: "Building habits", 
            status: 'locked', 
            position: { x: 40, y: 78 },
            level: 8
        },
        { 
            id: 9, 
            title: "Day 9", 
            description: "Almost there!", 
            status: 'locked', 
            position: { x: 60, y: 88 },
            level: 9
        },
        { 
            id: 10, 
            title: "Day 10", 
            description: "Legend status!", 
            status: 'locked', 
            position: { x: 50, y: 96 },
            level: 10
        }
    ];

    export let currentStreak: number = 2;
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
            const controlX = (prev.x + curr.x) / 2 + (i % 2 === 0 ? 10 : -10);
            const controlY = prev.y + (curr.y - prev.y) / 2;
            path += ` Q ${controlX} ${controlY}, ${curr.x} ${curr.y}`;
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

    function handleStepClick(step: typeof roadmapData[0]) {
        if (!step.isToday || step.status !== 'current') return;
        
        // Mark today's task as completed
        step.status = 'completed';
        dailyGoalCompleted = true;
        currentStreak += 1;
        
        // Move to next day
        const nextStep = roadmapData[step.id];
        if (nextStep) {
            step.isToday = false;
            nextStep.status = 'current';
            nextStep.isToday = true;
        }
        
        roadmapData = roadmapData;
        console.log(`Day ${step.id} completed! Streak: ${currentStreak}`);
    }
</script>

<!-- ROADMAP dla neuroatypowych - pastele, spokojne kolory -->
<div class="w-full h-full relative dark:bg-gradient-to-b dark:from-[#0f0e0d] dark:via-stone-900 dark:to-[#0f0e0d] light:bg-gradient-to-b light:from-[#D4EAF7] light:via-[#B5E3FF] light:to-[#E8F4F8] rounded-3xl px-2 pb-6 overflow-y-auto overflow-x-hidden shadow-[0_10px_40px_rgba(126,200,227,0.3)] border-[6px] dark:border-stone-700/30 light:border-[#A7D8F0] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:dark:bg-stone-400/30 [&::-webkit-scrollbar-thumb]:light:bg-[#7EC8E3]/40 [&::-webkit-scrollbar-thumb]:rounded-lg hover:[&::-webkit-scrollbar-thumb]:bg-[#7EC8E3]/60 md:px-1 md:pb-4 md:rounded-2xl">
    <div class="relative w-full min-h-[1400px] pt-[clamp(5.5rem,10vw,6.5rem)] pb-10 md:min-h-[1200px] md:pt-[4.75rem] md:pb-8">
        <div class="absolute top-[clamp(0.75rem,2vw,1.75rem)] right-[clamp(0.75rem,3vw,2rem)] flex items-center gap-3 px-5 py-3.5 rounded-[18px] dark:bg-[rgba(24,23,22,0.92)] light:bg-white/95 border-[4px] dark:border-stone-700/45 light:border-[#A7D8F0] shadow-[0_12px_30px_rgba(126,200,227,0.3)] backdrop-blur-sm z-[6] md:top-4 md:right-4 md:px-4 md:py-3 md:gap-2.5">
            <div class="w-10 h-10 text-orange-500 transition-all duration-300 md:w-9 md:h-9" class:fire-flicker={dailyGoalCompleted} style="filter: drop-shadow(0 2px 8px rgba(249, 115, 22, 0.4));">
                <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
                    <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
            </div>
            <span class="font-['Lato'] text-[2rem] font-bold dark:text-stone-50 light:text-slate-900 leading-none md:text-[1.75rem]" style="text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">{currentStreak}</span>
        </div>

        <!-- Main curved path line -->
        <svg class="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none" viewBox="0 0 100 105" preserveAspectRatio="none">
            <!-- Dynamically generated curved path -->
            <path
                d={fullPathD}
                class="dark:stroke-[rgba(87,83,78,0.3)] light:stroke-[#A7D8F0] stroke-[3] transition-all duration-500 md:stroke-[2.5]"
                fill="none"
                stroke-linecap="round"
            />
            
            <!-- Completed portion of path -->
            {#if hasCompleted}
                <path
                    d={completedPathD}
                    class="dark:stroke-green-500 light:stroke-[#5DADE2] stroke-[4] path-grow md:stroke-[3.5]"
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
                aria-label="{step.title}: {step.description}"
            >
                <div 
                    class="w-[clamp(3.5rem,9vw,4.5rem)] h-[clamp(3.5rem,9vw,4.5rem)] rounded-full flex items-center justify-center relative transition-all duration-[250ms] border-b-4 border-transparent box-border"
                    class:step-completed={step.status === 'completed'}
                    class:step-current={step.status === 'current'}
                    class:step-locked={step.status === 'locked'}
                    class:step-today-hover={step.isToday}
                >
                    <div class="flex items-center justify-center w-full h-full text-white">
                        {#if step.status === 'completed'}
                            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" style="filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));">
                                <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        {:else if step.status === 'locked'}
                            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" style="filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        {:else}
                            <span class="font-['Lato'] text-[clamp(1.2rem,4vw,1.6rem)] font-bold text-white" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);">{step.id}</span>
                        {/if}
                    </div>
                </div>
                
                <div class="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 dark:bg-[rgba(28,25,23,0.98)] light:bg-white/98 backdrop-blur-md rounded-lg px-4 py-2.5 min-w-[clamp(160px,38vw,200px)] max-w-[clamp(200px,48vw,260px)] text-center shadow-[0_10px_30px_rgba(126,200,227,0.4)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2 border-[3px] dark:border-stone-700/40 light:border-[#A7D8F0] z-20 group-hover:translate-y-1.5 md:px-3.5 md:py-2 md:min-w-[140px] md:max-w-[180px] md:rounded-lg md:mt-1.5">
                    <h3 class="font-['Lato'] text-[clamp(0.9rem,2.5vw,1.1rem)] font-bold dark:text-stone-100 light:text-slate-900 mb-2">{step.title}</h3>
                    <p class="text-[clamp(0.8rem,2vw,0.9rem)] dark:text-stone-300 light:text-slate-700 leading-relaxed">{step.description}</p>
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
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        border-bottom-color: #15803d;
        box-shadow: 
            0 6px 0 #15803d,
            0 8px 20px rgba(34, 197, 94, 0.2),
            inset 0 -2px 0 rgba(0, 0, 0, 0.15),
            inset 0 2px 4px rgba(255, 255, 255, 0.2);
        animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .step-completed:hover {
        transform: translateY(3px) scale(1.05);
        box-shadow: 
            0 3px 0 #15803d,
            0 5px 15px rgba(34, 197, 94, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.15),
            inset 0 1px 3px rgba(255, 255, 255, 0.2);
    }

    .step-current {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        border-bottom-color: #1e40af;
        box-shadow: 
            0 6px 0 #1e40af,
            0 8px 25px rgba(59, 130, 246, 0.4),
            0 0 20px rgba(59, 130, 246, 0.2),
            inset 0 -2px 0 rgba(0, 0, 0, 0.15),
            inset 0 2px 4px rgba(255, 255, 255, 0.2);
        animation: gentlePulse 2.5s ease-in-out infinite;
    }

    .step-current:hover {
        transform: translateY(3px) scale(1.05);
        box-shadow: 
            0 3px 0 #1e40af,
            0 5px 20px rgba(59, 130, 246, 0.5),
            0 0 15px rgba(59, 130, 246, 0.2),
            inset 0 -1px 0 rgba(0, 0, 0, 0.15),
            inset 0 1px 3px rgba(255, 255, 255, 0.2);
    }

    .step-locked {
        background: linear-gradient(135deg, #44403c 0%, #292524 100%);
        border-bottom-color: #1c1917;
        box-shadow: 
            0 5px 0 #1c1917,
            0 6px 15px rgba(0, 0, 0, 0.4),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2),
            inset 0 1px 2px rgba(255, 255, 255, 0.08);
        opacity: 0.7;
    }

    .step-locked :global(span) {
        color: #57534e !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
    }

    .step-locked:hover {
        transform: translateY(1px);
        opacity: 0.5;
        box-shadow: 
            0 4px 0 #1c1917,
            0 5px 12px rgba(0, 0, 0, 0.4),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2),
            inset 0 1px 2px rgba(255, 255, 255, 0.08);
    }

    .step-today-hover:hover {
        transform: scale(1.1);
        box-shadow: 
            0 6px 0 #1e40af,
            0 8px 25px rgba(59, 130, 246, 0.6),
            0 0 20px rgba(59, 130, 246, 0.3),
            inset 0 -2px 0 rgba(0, 0, 0, 0.15),
            inset 0 2px 4px rgba(255, 255, 255, 0.2);
    }
</style>
