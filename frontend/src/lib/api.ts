const API_URL = "http://localhost:3000";
const USE_MOCK = true; // Tymczasowo włączony tryb mock dla stabilności

export interface OnboardingData {
    name: string;
    currentSteps?: string;
    stepsGoal: number;
    eatingRegularity: string;
    meals: any[];
    sleepRegularity: string;
    waterGoal?: number;
    caloriesGoal?: number;
    medicalConcerns?: string[];
    motivation?: string;
    notifications?: {
        meals: boolean;
        water: boolean;
        activity: boolean;
        sleep: boolean;
    };
}

// Mock function for creating user
const createUserMock = async (userData: OnboardingData) => {
    console.log('Mock: Creating user with data:', userData);
    
    // Symulacja opóźnienia API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser = {
        success: true,
        user: {
            id: `mock-user-${Date.now()}`,
            username: userData.name,
            hp: 100,
            xp: 0,
            spentPrestige: 0
        }
    };
    
    console.log('Mock: User created successfully:', mockUser);
    return mockUser;
};

export const createUser = async (userData: OnboardingData) => {
    if (USE_MOCK) {
        return createUserMock(userData);
    }
    
    try {
        const response = await fetch(`${API_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// User login function
export const loginUser = async (username: string) => {
    if (USE_MOCK) {
        console.log('Mock: Logging in user:', username);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Mock dane dla testowania
        if (username.toLowerCase() === 'user' || username.toLowerCase() === 'borbi') {
            return {
                user: {
                    id: username === 'user' ? '123e4567-e89b-12d3-a456-426614174000' : '323e4567-e89b-12d3-a456-426614174420',
                    username: username,
                    hp: username === 'user' ? 100 : 80,
                    xp: username === 'user' ? 1150 : 2300,
                    spentPrestige: 0
                },
                progress: {
                    steps: username === 'user' ? 8500 : 12000,
                    stepsGoal: username === 'user' ? 10000 : 15000,
                    water: username === 'user' ? 6 : 8,
                    waterGoal: username === 'user' ? 8 : 10,
                    meals: username === 'user' ? 2 : 3,
                    mealsGoal: username === 'user' ? 3 : 4,
                    streak: username === 'user' ? 15 : 7,
                    lastActiveDate: new Date().toISOString().split('T')[0]
                }
            };
        } else {
            throw new Error('User not found');
        }
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Login failed: ${errorData.error}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Get users list function
export const getAllUsers = async () => {
    if (USE_MOCK) {
        return {
            users: [
                { id: '123e4567-e89b-12d3-a456-426614174000', username: 'user', hp: 100, xp: 1150, spentPrestige: 0 },
                { id: '323e4567-e89b-12d3-a456-426614174420', username: 'borbi', hp: 80, xp: 2300, spentPrestige: 0 }
            ]
        };
    }

    try {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Update user progress function
export const updateUserProgress = async (userId: string, progress: any) => {
    if (USE_MOCK) {
        console.log('Mock: Updating progress for user:', userId, progress);
        return { progress: progress };
    }

    try {
        const response = await fetch(`${API_URL}/user/${userId}/progress`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(progress)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating progress:', error);
        throw error;
    }
};
