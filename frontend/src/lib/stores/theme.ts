import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Load theme from localStorage or default to dark
const stored = browser ? localStorage.getItem('theme') : null;
export const isDarkMode = writable<boolean>(stored ? stored === 'dark' : true);

// Subscribe to changes and update localStorage + html class
isDarkMode.subscribe(value => {
    if (browser) {
        localStorage.setItem('theme', value ? 'dark' : 'light');
        if (value) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    }
});

export function toggleTheme() {
    isDarkMode.update(v => !v);
}
