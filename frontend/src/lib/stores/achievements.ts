import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { currentUser } from './user';

export type Achievement = {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedDate?: string;
    progress: number;
    target: number;
    category: 'streak' | 'activity' | 'consistency' | 'special';
    // Pastel colors per neuroatypical design guide
    color: string;
};

// Definicja wszystkich dostępnych osiągnięć
const achievementDefinitions: Omit<Achievement, 'unlocked' | 'unlockedDate' | 'progress'>[] = [
    // Streak achievements - codzienne serie
    {
        id: "first-step",
        title: "First Step",
        description: "Complete your first day",
        icon: "👣",
        target: 1,
        category: 'streak',
        color: 'from-[#B5E3FF] to-[#A7D8F0]' // Pastel blue
    },
    {
        id: "three-day-streak",
        title: "Getting Started",
        description: "Complete 3 days in a row",
        icon: "🌟",
        target: 3,
        category: 'streak',
        color: 'from-[#D4EAF7] to-[#B5E3FF]' // Jasny błękit
    },
    {
        id: "week-warrior",
        title: "Week Warrior",
        description: "Complete 7 days in a row",
        icon: "⚔️",
        target: 7,
        category: 'streak',
        color: 'from-[#7EC8E3] to-[#5DADE2]' // Blue gradient from guide
    },
    {
        id: "two-week-champion",
        title: "Two Week Champion",
        description: "Complete 14 days in a row",
        icon: "🏅",
        target: 14,
        category: 'streak',
        color: 'from-[#B8DCE5] to-[#A7D8F0]' // Calm blue
    },
    {
        id: "consistency-king",
        title: "Consistency King",
        description: "Complete 30 days in a row",
        icon: "👑",
        target: 30,
        category: 'streak',
        color: 'from-[#D1E7ED] to-[#B8DCE5]' // Pastel gradient
    },
    {
        id: "unstoppable",
        title: "Unstoppable",
        description: "Complete 50 days in a row",
        icon: "🔥",
        target: 50,
        category: 'streak',
        color: 'from-[#B5E3FF] to-[#7EC8E3]' // Light accent
    },
    {
        id: "legend",
        title: "Legend",
        description: "Complete 100 days in a row",
        icon: "🌟",
        target: 100,
        category: 'streak',
        color: 'from-[#7EC8E3] to-[#5DADE2]' // Gradient główny
    },
    
    // Level achievements - progresja XP
    {
        id: "beginner",
        title: "Beginner",
        description: "Reach level 1",
        icon: "🌱",
        target: 1,
        category: 'activity',
        color: 'from-[#E8F4F8] to-[#D4EAF7]' // Very light
    },
    {
        id: "novice",
        title: "Novice",
        description: "Reach level 5",
        icon: "⭐",
        target: 5,
        category: 'activity',
        color: 'from-[#D4EAF7] to-[#B5E3FF]' // Łagodny błękit
    },
    {
        id: "apprentice",
        title: "Apprentice",
        description: "Reach level 10",
        icon: "🎯",
        target: 10,
        category: 'activity',
        color: 'from-[#B5E3FF] to-[#A7D8F0]' // Light blue
    },
    {
        id: "skilled",
        title: "Skilled",
        description: "Reach level 15",
        icon: "💪",
        target: 15,
        category: 'activity',
        color: 'from-[#A7D8F0] to-[#7EC8E3]' // Średni niebieski
    },
    {
        id: "expert",
        title: "Expert",
        description: "Reach level 20",
        icon: "🏆",
        target: 20,
        category: 'activity',
        color: 'from-[#7EC8E3] to-[#5DADE2]' // Gradient blue
    },
    {
        id: "master",
        title: "Master",
        description: "Reach level 30",
        icon: "👑",
        target: 30,
        category: 'activity',
        color: 'from-[#5DADE2] to-[#4A9DD2]' // Stronger blue
    },
    {
        id: "grandmaster",
        title: "Grandmaster",
        description: "Reach level 50",
        icon: "💎",
        target: 50,
        category: 'activity',
        color: 'from-[#B8DCE5] to-[#7EC8E3]' // Luxury gradient
    },
    
    // Total days achievements
    {
        id: "ten-days-total",
        title: "Perfect Ten",
        description: "Complete 10 total days",
        icon: "🔟",
        target: 10,
        category: 'consistency',
        color: 'from-[#E8F4F8] to-[#D4EAF7]' // Very light
    },
    {
        id: "quarter-century",
        title: "Quarter Century",
        description: "Complete 25 total days",
        icon: "✨",
        target: 25,
        category: 'consistency',
        color: 'from-[#D4EAF7] to-[#B8DCE5]' // Łagodny błękit
    },
    {
        id: "half-century",
        title: "Half Century",
        description: "Complete 50 total days",
        icon: "⭐",
        target: 50,
        category: 'consistency',
        color: 'from-[#B5E3FF] to-[#7EC8E3]' // Light accent
    },
    {
        id: "century-club",
        title: "Century Club",
        description: "Complete 100 total days",
        icon: "💯",
        target: 100,
        category: 'consistency',
        color: 'from-[#7EC8E3] to-[#5DADE2]' // Gradient główny
    },
    
    // Special achievements
    {
        id: "comeback-kid",
        title: "Comeback Kid",
        description: "Restart after missing a day",
        icon: "💪",
        target: 1,
        category: 'special',
        color: 'from-[#B8DCE5] to-[#A7D8F0]' // Pastel blue
    },
    {
        id: "perfect-week",
        title: "Perfect Week",
        description: "Complete all goals 7 days straight",
        icon: "🌈",
        target: 7,
        category: 'special',
        color: 'from-[#D1E7ED] to-[#B5E3FF]' // Spokojny gradient
    },
    {
        id: "early-riser",
        title: "Early Riser",
        description: "Complete 5 days before noon",
        icon: "🌅",
        target: 5,
        category: 'activity',
        color: 'from-[#E8F4F8] to-[#B5E3FF]' // Morning
    }
];

// Store for user achievements
function createAchievementsStore() {
    const { subscribe, set, update } = writable<Achievement[]>([]);
    
    return {
        subscribe,
        
        // Initialize achievements
        initialize: () => {
            if (!browser) return;
            
            console.log('🎮 Initializing achievements store...');
            
            const stored = localStorage.getItem('achievements');
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    console.log(`📦 Loaded ${parsed.length} achievements from localStorage`);
                    set(parsed);
                    isInitialized = true;
                } catch (error) {
                    console.error('Error parsing achievements:', error);
                    // Initialize with definitions
                    const initial = achievementDefinitions.map(def => ({
                        ...def,
                        unlocked: false,
                        progress: 0
                    }));
                    console.log(`✨ Created ${initial.length} fresh achievements`);
                    set(initial);
                    localStorage.setItem('achievements', JSON.stringify(initial));
                    isInitialized = true;
                }
            } else {
                // First initialization
                const initial = achievementDefinitions.map(def => ({
                    ...def,
                    unlocked: false,
                    progress: 0
                }));
                console.log(`✨ First time initialization: ${initial.length} achievements`);
                set(initial);
                localStorage.setItem('achievements', JSON.stringify(initial));
                isInitialized = true;
            }
        },
        
        // Unlock achievement
        unlock: (achievementId: string) => {
            update(achievements => {
                const updated = achievements.map(achievement => {
                    if (achievement.id === achievementId && !achievement.unlocked) {
                        return {
                            ...achievement,
                            unlocked: true,
                            unlockedDate: new Date().toISOString().split('T')[0],
                            progress: achievement.target
                        };
                    }
                    return achievement;
                });
                
                if (browser) {
                    localStorage.setItem('achievements', JSON.stringify(updated));
                }
                
                return updated;
            });
        },
        
        // Update progress
        updateProgress: (achievementId: string, progress: number) => {
            update(achievements => {
                const updated = achievements.map(achievement => {
                    if (achievement.id === achievementId) {
                        const newProgress = Math.min(progress, achievement.target);
                        const shouldUnlock = newProgress >= achievement.target && !achievement.unlocked;
                        
                        return {
                            ...achievement,
                            progress: newProgress,
                            unlocked: shouldUnlock || achievement.unlocked,
                            unlockedDate: shouldUnlock ? new Date().toISOString().split('T')[0] : achievement.unlockedDate
                        };
                    }
                    return achievement;
                });
                
                if (browser) {
                    localStorage.setItem('achievements', JSON.stringify(updated));
                }
                
                return updated;
            });
        },
        
        // Check and unlock achievements based on user data
        checkAchievements: (userStreak: number, totalDaysCompleted: number, hasRestarted: boolean, userLevel?: number) => {
            console.log('🎯 Checking achievements with:', { userStreak, totalDaysCompleted, hasRestarted, userLevel });
            
            update(achievements => {
                let unlockedCount = 0;
                const updated = achievements.map(achievement => {
                    let shouldUpdate = false;
                    let newProgress = achievement.progress;
                    
                    // Check streak achievements
                    if (achievement.category === 'streak') {
                        newProgress = userStreak;
                        shouldUpdate = true;
                    }
                    
                    // Check consistency achievements (total days)
                    if (achievement.category === 'consistency') {
                        newProgress = totalDaysCompleted;
                        shouldUpdate = true;
                    }
                    
                    // Check level achievements (activity)
                    if (achievement.category === 'activity' && userLevel !== undefined &&
                        ['beginner', 'novice', 'apprentice', 'skilled', 'expert', 'master', 'grandmaster'].includes(achievement.id)) {
                        newProgress = userLevel;
                        shouldUpdate = true;
                    }
                    
                    // Special achievements
                    if (achievement.id === 'comeback-kid' && hasRestarted && !achievement.unlocked) {
                        newProgress = 1;
                        shouldUpdate = true;
                    }
                    
                    if (shouldUpdate) {
                        const finalProgress = Math.min(newProgress, achievement.target);
                        const shouldUnlock = finalProgress >= achievement.target && !achievement.unlocked;
                        
                        if (shouldUnlock) {
                            console.log(`🏆 Unlocking achievement: ${achievement.title} (${finalProgress}/${achievement.target})`);
                            unlockedCount++;
                        }
                        
                        return {
                            ...achievement,
                            progress: finalProgress,
                            unlocked: shouldUnlock || achievement.unlocked,
                            unlockedDate: shouldUnlock ? new Date().toISOString().split('T')[0] : achievement.unlockedDate
                        };
                    }
                    
                    return achievement;
                });
                
                console.log(`✅ Unlocked ${unlockedCount} new achievements`);
                
                if (browser) {
                    localStorage.setItem('achievements', JSON.stringify(updated));
                }
                
                return updated;
            });
        },
        
        // Reset all achievements (for testing)
        reset: () => {
            const initial = achievementDefinitions.map(def => ({
                ...def,
                unlocked: false,
                progress: 0
            }));
            set(initial);
            if (browser) {
                localStorage.setItem('achievements', JSON.stringify(initial));
            }
        }
    };
}

export const achievements = createAchievementsStore();

// Derived stores dla statystyk
export const achievementStats = derived(achievements, ($achievements) => {
    const unlocked = $achievements.filter(a => a.unlocked);
    const total = $achievements.length;
    const percentage = total > 0 ? Math.round((unlocked.length / total) * 100) : 0;
    
    return {
        unlocked: unlocked.length,
        total,
        percentage,
        recentlyUnlocked: unlocked
            .sort((a, b) => {
                if (!a.unlockedDate || !b.unlockedDate) return 0;
                return new Date(b.unlockedDate).getTime() - new Date(a.unlockedDate).getTime();
            })
            .slice(0, 3)
    };
});

// Auto-check achievements when user data changes
let isInitialized = false;

if (browser) {
    currentUser.subscribe($user => {
        if ($user) {
            console.log('👤 User changed in achievements store:', { 
                username: $user.username, 
                streak: $user.streak, 
                level: $user.level,
                isInitialized 
            });
            
            // Initialize on first user load if not already initialized
            if (!isInitialized) {
                console.log('🔧 Auto-initializing achievements...');
                achievements.initialize();
                isInitialized = true;
            }
            
            // Calculate total completed days (can expand later)
            const totalCompleted = $user.streak || 0; // Temporary: use streak
            const hasRestarted = $user.streak === 1; // Simple logic
            
            achievements.checkAchievements($user.streak || 0, totalCompleted, hasRestarted, $user.level || 0);
        }
    });
}
