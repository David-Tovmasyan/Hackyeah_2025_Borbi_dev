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

// Mock dane użytkownika dla testowania
const mockUser: User = {
    id: 'mock-user-123',
    username: 'Testowy Użytkownik',
    hp: 85,
    xp: 1250,
    spentPrestige: 2,
    level: 6, // xp/200 = level
    streak: 12, // Dni z rzędu
    dailyProgress: {
        steps: 7500,
        stepsGoal: 10000,
        water: 6,
        waterGoal: 8,
        meals: 2,
        mealsGoal: 3
    }
};

// Store dla aktualnego użytkownika
export const currentUser = writable<User | null>(null);

// Funkcja inicjalizacji użytkownika z localStorage i API
export async function initializeUser() {
    if (!browser) return false;
    
    const storedUsername = localStorage.getItem('username');
    
    if (!storedUsername) {
        console.log('ℹ️ Brak zalogowanego użytkownika');
        return false;
    }
    
    try {
        // Spróbuj zalogować użytkownika ponownie z API
        console.log('🔄 Próba ponownego logowania użytkownika:', storedUsername);
        const success = await loginUserWithAPI(storedUsername);
        
        if (!success) {
            console.log('❌ Nie można było ponownie zalogować użytkownika, czyszczenie danych');
            logoutUser();
            return false;
        }
        
        console.log('✅ Użytkownik został pomyślnie zainicjalizowany');
        return true;
    } catch (error) {
        console.error('❌ Błąd podczas inicjalizacji użytkownika:', error);
        logoutUser();
        return false;
    }
}

// Funkcja aktualizacji danych użytkownika
export function updateUser(userData: Partial<User>) {
    currentUser.update(user => {
        if (!user) return user;
        const updatedUser = { ...user, ...userData };
        console.log('🧪 Aktualizacja mockowych danych użytkownika:', updatedUser);
        return updatedUser;
    });
}

// Funkcja ustawienia nowego użytkownika (po onboardingu)
export function setUser(newUser: User) {
    console.log('🧪 Ustawienie nowego użytkownika:', newUser);
    currentUser.set(newUser);
    if (browser) {
        localStorage.setItem('userId', newUser.id);
        localStorage.setItem('username', newUser.username);
    }
}

// Funkcja logowania użytkownika z API
export async function loginUserWithAPI(username: string) {
    if (!browser) return false;

    try {
        // Importujemy dynamicznie żeby uniknąć problemów SSR
        const { loginUser } = await import('$lib/api');
        
        console.log('🔑 Próba logowania użytkownika:', username);
        
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
                
                console.log('✅ Użytkownik zalogowany:', loggedUser);
                return true;
            } else {
                console.log('❌ Nieprawidłowa odpowiedź z API');
                return false;
            }
        } catch (apiError) {
            console.log('❌ Błąd API podczas logowania:', apiError);
            return false;
        }
        
    } catch (error) {
        console.error('❌ Błąd logowania (ogólny):', error);
        return false;
    }
}

// Funkcja wylogowania
export function logoutUser() {
    if (!browser) return;
    
    console.log('🚪 Wylogowywanie użytkownika');
    currentUser.set(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
}

// Funkcja sprawdzenia czy użytkownik jest zalogowany
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