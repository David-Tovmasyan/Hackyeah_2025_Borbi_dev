import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/*
  🎨 NEUROATYPICAL DESIGN GUIDE - Theme Store
  
  ✅ Tylko jasne kolory - bez trybu ciemnego
  ✅ Pastele i niebieskie tony - spokojne dla zmysłów  
  ✅ Wysokie kontrasty - WCAG AAA
  
  Aplikacja używa wyłącznie jasnej, przyjaznej palety kolorów
  zgodnie z wytycznymi dla osób neuroatypowych.
*/

// Aplikacja używa tylko jasnego trybu - Design Guide requirement
export const isDarkMode = writable<boolean>(false);

// Theme jest zawsze jasny - dla komfortu osób neuroatypowych
isDarkMode.subscribe(() => {
    if (browser) {
        // Zawsze ustawiamy jasny tryb
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    }
});

// Toggle zachowany dla kompatybilności, ale zawsze pozostaje jasny
export function toggleTheme() {
    console.log('🎨 Aplikacja używa tylko jasnych kolorów zgodnie z NEUROATYPICAL_DESIGN_GUIDE');
    // Nie zmieniamy trybu - zawsze jasny
}
