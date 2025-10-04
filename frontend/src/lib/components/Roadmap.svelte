<script lang="ts">
    export let roadmapData: Array<{
        id: number;
        title: string;
        description: string;
        status: 'completed' | 'current' | 'locked';
        position: { x: number; y: number };
        connections?: number[];
        level?: number;
    }> = [
        { 
            id: 1, 
            title: "Basics", 
            description: "Start your learning journey", 
            status: 'completed', 
            position: { x: 50, y: 5 },
            level: 1
        },
        { 
            id: 2, 
            title: "Fundamentals", 
            description: "Build core knowledge", 
            status: 'completed', 
            position: { x: 35, y: 15 },
            level: 2
        },
        { 
            id: 3, 
            title: "Skills", 
            description: "Develop practical abilities", 
            status: 'current', 
            position: { x: 65, y: 25 },
            level: 3
        },
        { 
            id: 4, 
            title: "Practice", 
            description: "Apply what you've learned", 
            status: 'locked', 
            position: { x: 40, y: 35 },
            level: 4
        },
        { 
            id: 5, 
            title: "Intermediate", 
            description: "Advanced techniques", 
            status: 'locked', 
            position: { x: 60, y: 45 },
            level: 5
        },
        { 
            id: 6, 
            title: "Advanced", 
            description: "Master complex concepts", 
            status: 'locked', 
            position: { x: 45, y: 55 },
            level: 6
        },
        { 
            id: 7, 
            title: "Mastery", 
            description: "Achieve expertise", 
            status: 'locked', 
            position: { x: 55, y: 65 },
            level: 7
        },
        { 
            id: 8, 
            title: "Expert", 
            description: "Complete mastery", 
            status: 'locked', 
            position: { x: 50, y: 75 },
            level: 8
        },
        { 
            id: 9, 
            title: "Champion", 
            description: "Ultimate achievement", 
            status: 'locked', 
            position: { x: 45, y: 85 },
            level: 9
        },
        { 
            id: 10, 
            title: "Legend", 
            description: "Reach legendary status", 
            status: 'locked', 
            position: { x: 50, y: 95 },
            level: 10
        }
    ];

    function handleStepClick(step: typeof roadmapData[0]) {
        if (step.status === 'locked') return;
        console.log(`Clicked on step: ${step.title}`);
        // Add your navigation logic here
    }
</script>

<div class="roadmap-container">
    <!-- Progress indicator at top -->
    <div class="progress-bar">
        <div class="progress-fill" style="width: 30%"></div>
    </div>
    
    <div class="roadmap-canvas">
        <!-- Main curved path line -->
        <svg class="path-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <!-- Beautiful curved path through all 10 steps -->
            <path
                d="M 50 5 Q 40 10, 35 15 Q 30 20, 65 25 Q 70 30, 40 35 Q 35 40, 60 45 Q 65 50, 45 55 Q 40 60, 55 65 Q 60 70, 50 75 Q 45 80, 45 85 Q 45 90, 50 95"
                class="main-path"
                fill="none"
            />
            
            <!-- Completed portion of path (up to current step) -->
            <path
                d="M 50 5 Q 40 10, 35 15 Q 30 20, 65 25"
                class="main-path completed-path"
                fill="none"
            />
        </svg>

        <!-- Step nodes -->
        {#each roadmapData as step (step.id)}
            <div 
                class="step-node" 
                class:completed={step.status === 'completed'}
                class:current={step.status === 'current'}
                class:locked={step.status === 'locked'}
                style="left: {step.position.x}%; top: {step.position.y}%;"
                on:click={() => handleStepClick(step)}
                on:keydown={(e) => e.key === 'Enter' && handleStepClick(step)}
                tabindex="0"
                role="button"
                aria-label="Step {step.id}: {step.title}"
            >
                <div class="step-circle">
                    <div class="step-inner">
                        {#if step.status === 'completed'}
                            <svg class="check-icon" viewBox="0 0 24 24" fill="none">
                                <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        {:else if step.status === 'locked'}
                            <svg class="lock-icon" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        {:else}
                            <span class="step-number">{step.id}</span>
                        {/if}
                    </div>
                </div>
                
                <div class="step-tooltip">
                    <h3 class="tooltip-title">{step.title}</h3>
                    <p class="tooltip-description">{step.description}</p>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .roadmap-container {
        width: 100%;
        height: 100%;
        position: relative;
        background: linear-gradient(180deg, #0f0e0d 0%, #1c1917 50%, #0f0e0d 100%);
        border-radius: 24px;
        padding: 1.5rem 0.5rem;
        overflow-y: auto;
        overflow-x: hidden;
        box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.6),
            inset 0 1px 1px rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(68, 64, 60, 0.3);
    }

    .roadmap-container::-webkit-scrollbar {
        width: 6px;
    }

    .roadmap-container::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
    }

    .roadmap-container::-webkit-scrollbar-thumb {
        background: rgba(168, 162, 158, 0.3);
        border-radius: 10px;
    }

    .roadmap-container::-webkit-scrollbar-thumb:hover {
        background: rgba(168, 162, 158, 0.5);
    }

    .progress-bar {
        position: sticky;
        top: 0;
        width: 100%;
        height: 4px;
        background: rgba(68, 64, 60, 0.3);
        z-index: 100;
        border-radius: 0 0 4px 4px;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #22c55e 0%, #3b82f6 100%);
        border-radius: 0 0 4px 4px;
        transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
    }

    .roadmap-canvas {
        position: relative;
        width: 100%;
        min-height: 1400px;
        padding: 2rem 0;
    }

    .path-svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
    }

    .main-path {
        stroke: rgba(87, 83, 78, 0.3);
        stroke-width: 3;
        stroke-linecap: round;
        transition: all 0.5s ease;
    }

    .completed-path {
        stroke: #22c55e;
        stroke-width: 4;
        filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.3));
        animation: pathGrow 1.5s ease-out forwards;
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



    .step-node {
        position: absolute;
        transform: translate(-50%, -50%);
        z-index: 5;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .step-node.locked {
        cursor: not-allowed;
    }

    .step-circle {
        width: clamp(3.5rem, 9vw, 4.5rem);
        height: clamp(3.5rem, 9vw, 4.5rem);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        border-bottom: 4px solid transparent;
        box-sizing: border-box;
    }

    .step-node.completed .step-circle {
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        border-bottom-color: #15803d;
        box-shadow: 
            0 6px 0 #15803d,
            0 8px 20px rgba(34, 197, 94, 0.2),
            inset 0 -2px 0 rgba(0, 0, 0, 0.15),
            inset 0 2px 4px rgba(255, 255, 255, 0.2);
        animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
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

    .step-node.current .step-circle {
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

    @keyframes gentlePulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }

    .step-node.locked .step-circle {
        background: linear-gradient(135deg, #44403c 0%, #292524 100%);
        border-bottom-color: #1c1917;
        box-shadow: 
            0 5px 0 #1c1917,
            0 6px 15px rgba(0, 0, 0, 0.4),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2),
            inset 0 1px 2px rgba(255, 255, 255, 0.08);
        opacity: 0.7;
    }

    .step-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: white;
    }

    .step-number {
        font-family: 'Comic Relief', system-ui, sans-serif;
        font-size: 1.5rem;
        font-weight: bold;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    .check-icon, .lock-icon {
        width: 1.5rem;
        height: 1.5rem;
        filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));
    }

    .step-tooltip {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-5px);
        background: rgba(28, 25, 23, 0.98);
        backdrop-filter: blur(10px);
        border-radius: 10px;
        padding: 0.65rem 1rem;
        min-width: clamp(160px, 38vw, 200px);
        max-width: clamp(200px, 48vw, 260px);
        text-align: center;
        box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.5),
            0 0 1px rgba(255, 255, 255, 0.1);
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        margin-top: 0.5rem;
        border: 1px solid rgba(68, 64, 60, 0.4);
        z-index: 20;
    }

    .step-node:hover .step-tooltip {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(5px);
    }

    .step-number {
        font-family: 'Comic Relief', system-ui, sans-serif;
        font-size: clamp(1.2rem, 4vw, 1.6rem);
        font-weight: bold;
        color: white;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .step-node.locked .step-number {
        color: #57534e;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }

    .tooltip-title {
        font-family: 'Comic Relief', system-ui, sans-serif;
        font-size: clamp(0.9rem, 2.5vw, 1.1rem);
        font-weight: bold;
        color: #f5f5f4;
        margin: 0 0 0.5rem 0;
    }

    .tooltip-description {
        font-size: clamp(0.8rem, 2vw, 0.9rem);
        color: #d6d3d1;
        margin: 0;
        line-height: 1.5;
    }

    /* 3D Hover Effects */
    .step-node:hover {
        z-index: 10;
    }

    .step-node.completed:hover .step-circle {
        transform: translateY(3px) scale(1.05);
        box-shadow: 
            0 3px 0 #15803d,
            0 5px 15px rgba(34, 197, 94, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.15),
            inset 0 1px 3px rgba(255, 255, 255, 0.2);
    }

    .step-node.current:hover .step-circle {
        transform: translateY(3px) scale(1.05);
        box-shadow: 
            0 3px 0 #1e40af,
            0 5px 20px rgba(59, 130, 246, 0.5),
            0 0 15px rgba(59, 130, 246, 0.2),
            inset 0 -1px 0 rgba(0, 0, 0, 0.15),
            inset 0 1px 3px rgba(255, 255, 255, 0.2);
    }

    .step-node.locked:hover .step-circle {
        transform: translateY(1px);
        opacity: 0.5;
        box-shadow: 
            0 4px 0 #1c1917,
            0 5px 12px rgba(0, 0, 0, 0.4),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2),
            inset 0 1px 2px rgba(255, 255, 255, 0.08);
    }



    @keyframes flow {
        0% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: 10; }
    }

    /* Enhanced Mobile responsiveness */
    @media (max-width: 768px) {
        .roadmap-container {
            padding: 1rem 0.25rem;
            border-radius: 16px;
        }

        .roadmap-canvas {
            min-height: 1200px;
            padding: 1.5rem 0;
        }

        .step-node:hover {
            z-index: 10;
        }

        .step-tooltip {
            padding: 0.5rem 0.85rem;
        }
    }

    @media (max-width: 480px) {
        .roadmap-container {
            padding: 0.75rem 0.25rem;
            border-radius: 14px;
        }

        .roadmap-canvas {
            min-height: 1000px;
            padding: 1rem 0;
        }

        .main-path {
            stroke-width: 2.5;
        }

        .completed-path {
            stroke-width: 3.5;
        }

        .step-tooltip {
            padding: 0.5rem 0.75rem;
            margin-top: 0.4rem;
            border-radius: 8px;
            min-width: 140px;
            max-width: 180px;
        }
    }


</style>