# 🎨 Design Guide dla Osób Neuroatypowych

## Kolory Używane w Aplikacji

### Główna Paleta (Light Mode)
- **Tło**: `#E8F4F8` → `#D1E7ED` (gradient pastelowy niebieski)
- **Komponenty**: `#D4EAF7` (jasny błękitny)
- **Akcenty**: `#B5E3FF` (niebiesko-błękitny)
- **Bordery**: `#A7D8F0` (miękki niebieski)
- **Przyciski**: `#7EC8E3` → `#5DADE2` (gradient blue)
- **Tekst**: `#0F172A` (slate-900, wysoki kontrast)
- **Podtekst**: `#334155` (slate-700)

### Czemu Te Kolory?
✅ **Pastele** - łagodne dla oczu, redukują zmęczenie wzrokowe
✅ **Niebieskie tony** - kojarzone ze spokojem, redukcja lęku
✅ **Wysoki kontrast** - WCAG AAA (tekst na jasnym tle)
✅ **Brak jaskrawych kolorów** - nie przytłaczają zmysłów

## Zasady Projektowania

### 1. Odstępy (Spacing)
- **Duże odstępy**: `mb-6`, `mt-8`, `space-y-6`
- **Czas na przetworzenie**: każdy element ma swoją przestrzeń
- **Nie tłoczone**: jeden fokus na raz

### 2. Bordery i Granice
- **Grubość**: `border-[6px]` (bardzo wyraźne)
- **Zaokrąglenia**: `rounded-3xl`, `rounded-full` (spokojne kształty)
- **Focus rings**: `ring-[6px]` (bardzo widoczne)

### 3. Przyciski i Interakcje
- **Duże**: minimum `py-4`, `px-6`
- **Wyraźne**: grube bordery, wysokie kontrasty
- **Przewidywalne animacje**: `duration-200`, `ease-out`
- **Hover states**: `scale-105` (delikatne)

### 4. Typografia
- **Font**: Lato (czytelny, przyjazny)
- **Rozmiary**: `text-lg` minimum, `text-2xl` dla nagłówków
- **Waga**: `font-bold` dla ważnych elementów
- **Leading**: `leading-relaxed` (więcej miejsca między liniami)

### 5. Emoji i Ikony
- **Większe ikony**: `w-8 h-8` minimum
- **Emoji**: pomagają w szybkiej identyfikacji
- **Stroke**: `stroke-width: 2.5` (grubsze linie)

### 6. Formularze
- **Tylko niezbędne pola**: 2-3 maksymalnie
- **Podpowiedzi**: pod każdym polem
- **Placeholder**: jasne oczekiwania
- **Aria labels**: pełna dostępność

## Komponenty

### Landing Page
- Chmurka mowy: `rounded-full` na górze GIF-a
- Olaf: 44×44 (ekran 2), nie przytłacza
- 2 pola formularza: kroki + minuty
- Przycisk: wyraźny gradient

### Header
- Wysokość: `h-20` (duża)
- Border: `border-b-[6px]`
- Toggle: duży (`p-4`, ikony 7×7)

### Sidebar
- Szerokość: `w-[300px]`
- Przyciski: `py-4`, `text-lg`
- Border aktywny: `border-[4px]`
- Gap: `gap-3` (wyraźne oddzielenie)

### Mobile Navigation
- Przyciski: `w-12 h-12`
- Border górny: `border-t-[6px]`
- Ikony: `w-7 h-7`

## Do Zapamiętania

🎯 **Minimalizm**: Mniej = Więcej
📏 **Przestrzeń**: Czas na przetworzenie
🎨 **Pastele**: Łagodne dla oczu
🔲 **Grube linie**: Wyraźne granice
♿ **Dostępność**: WCAG AAA
🧠 **Prostota**: Jeden fokus na raz
