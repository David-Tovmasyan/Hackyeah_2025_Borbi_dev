import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface User {
    id: string;
    username: string;
    hp: number;
    xp: number;
    spentPrestige: number;
    level?: number;
    streak?: number;
    dailyProgress?: {
        steps: number;
        stepsGoal: number;
        water: number;
        waterGoal: number;
        meals: number;
        mealsGoal: number;
    };
}

// Mock user data for testing
const mockUser: User = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    username: 'user',
    hp: 92,
    xp: 1150,
    spentPrestige: 3,
    level: 6, // xp/200 = level (1150/200 = 5.75 ≈ 6)
    streak: 15, // Days in a row - realistic streak
    dailyProgress: {
        steps: 8234,
        stepsGoal: 10000,
        water: 6,
        waterGoal: 8,
        meals: 2,
        mealsGoal: 3
    }
};

// Store for current user
export const currentUser = writable<User | null>(null);

// Initialize user from localStorage and API
export async function initializeUser() {
    if (!browser) return false;
    
    const storedUsername = localStorage.getItem('username');
    
    if (!storedUsername) {
        console.log('ℹ️ No logged in user');
        // Fallback to mock user in DEV mode
        if (import.meta.env.DEV) {
            currentUser.set(mockUser);
            return true;
        }
        return false;
    }
    
    try {
        // Try to re-login user from API
        console.log('🔄 Attempting to re-login user:', storedUsername);
        const success = await loginUserWithAPI(storedUsername);
        
        if (!success) {
            console.log('❌ Could not re-login user, clearing data');
            logoutUser();
            // Fallback to mock user in DEV mode
            if (import.meta.env.DEV) {
                currentUser.set(mockUser);
                return true;
            }
            return false;
        }
        
        console.log('✅ User successfully initialized');
        return true;
    } catch (error) {
        console.error('❌ Error during user initialization:', error);
        logoutUser();
        // Fallback to mock user in DEV mode on error
        if (import.meta.env.DEV) {
            currentUser.set(mockUser);
            return true;
        }
        return false;
    }
}

// Function to update user data
export function updateUser(userData: Partial<User>) {
    currentUser.update(user => {
        if (!user) return user;
        const updatedUser = { ...user, ...userData };
        console.log('🧪 Updating mock user data:', updatedUser);
        return updatedUser;
    });
}

// Function to set new user (after onboarding)
export function setUser(newUser: User) {
    console.log('🧪 Setting new user:', newUser);
    currentUser.set(newUser);
    if (browser) {
        localStorage.setItem('userId', newUser.id);
        localStorage.setItem('username', newUser.username);
    }
}

// Function to login user with API
export async function loginUserWithAPI(username: string) {
    if (!browser) return false;

    try {
        // Import dynamically to avoid SSR issues
        const { loginUser } = await import('$lib/api');
        
        console.log('🔑 Attempting to login user:', username);
        
        try {
            const response = await loginUser(username);
            
            if (response && response.user && response.progress) {
                const loggedUser: User = {
                    id: response.user.id,
                    username: response.user.username,
                    hp: response.user.hp,
                    xp: response.user.xp,
                    spentPrestige: response.user.spentPrestige,
                    level: Math.floor(response.user.xp / 200) + 1,
                    streak: response.progress.streak,
                    dailyProgress: {
                        steps: response.progress.steps,
                        stepsGoal: response.progress.stepsGoal,
                        water: response.progress.water,
                        waterGoal: response.progress.waterGoal,
                        meals: response.progress.meals,
                        mealsGoal: response.progress.mealsGoal
                    }
                };
                
                currentUser.set(loggedUser);
                localStorage.setItem('userId', loggedUser.id);
                localStorage.setItem('username', loggedUser.username);
                
                console.log('✅ User logged in:', loggedUser);
                return true;
            } else {
                console.log('❌ Invalid API response');
                return false;
            }
        } catch (apiError) {
            console.log('❌ API error during login:', apiError);
            return false;
        }
        
    } catch (error) {
        console.error('❌ Login error (general):', error);
        return false;
    }
}

// Funkcja wylogowania
export function logoutUser() {
    if (!browser) return;
    
    console.log('🚪 Logging out user');
    currentUser.set(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
}

// Check if user is logged in
export function isUserLoggedIn(): boolean {
    if (!browser) return false;
    
    try {
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');
        return !!(userId && username);
    } catch (error) {
        console.error('Error accessing localStorage:', error);
        return false;
    }
}