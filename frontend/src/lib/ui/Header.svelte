<script lang="ts">
    import Logo from "$lib/components/Logo.svelte";
    import { currentUser } from "$lib/stores/user";

    // Dane użytkownika z store
    $: user = $currentUser || {
        username: 'User',
        level: 1,
        xp: 0
    };
</script>

<!-- 
    PROSTY HEADER - zgodny z NEUROATYPICAL_DESIGN_GUIDE:
    ✓ Jasne, pastelowe kolory - uspokajające dla neuroatypowych
    ✓ Duże, czytelne elementy - łatwość nawigacji
    ✓ Przyjazne ikony emoji - pozytywne wsparcie
    ✓ Wyraźne granice i kontrast - WCAG AAA
-->
<header class="
    h-22 w-full
    flex items-center justify-center px-6
    bg-[#D4EAF7] text-slate-900
    border-b-[6px] border-[#A7D8F0] shadow-lg shadow-[#A7D8F0]/30
">
    <!-- Profil użytkownika wycentrowany -->
    <div class="bg-white/80 rounded-3xl px-6 py-3 border-[6px] border-[#B5E3FF] shadow-lg">
        <div class="flex items-center gap-3">
            <span class="text-2xl">👤</span>
            <div class="text-left">
                <div class="font-['Lato'] text-l font-bold text-slate-900">
                    borbi
                </div>
                <div class="font-['Lato'] text-sm font-semibold text-slate-700">
                    Level {user.level} • {user.xp} XP
                </div>
            </div>
        </div>
    </div>
</header>
