# Achievements System Debug Guide

## Current Mock User Data
```typescript
{
    id: '123e4567-e89b-12d3-a456-426614174000',
    username: 'user',
    level: 6,
    streak: 15,
    xp: 1150
}
```

## Expected Unlocked Achievements (Based on Mock User)

### Streak Achievements (streak: 15)
✅ Should unlock:
- `first-step` (target: 1) - ✓ 15 >= 1
- `three-day-streak` (target: 3) - ✓ 15 >= 3
- `week-warrior` (target: 7) - ✓ 15 >= 7
- `two-week-champion` (target: 14) - ✓ 15 >= 14

❌ Should NOT unlock:
- `consistency-king` (target: 30) - 15 < 30
- `unstoppable` (target: 50) - 15 < 50
- `legend` (target: 100) - 15 < 100

### Level Achievements (level: 6)
✅ Should unlock:
- `beginner` (target: 1) - ✓ 6 >= 1
- `novice` (target: 5) - ✓ 6 >= 5

❌ Should NOT unlock:
- `apprentice` (target: 10) - 6 < 10
- `skilled` (target: 15) - 6 < 15
- `expert` (target: 20) - 6 < 20
- `master` (target: 30) - 6 < 30
- `grandmaster` (target: 50) - 6 < 50

### Consistency Achievements (total days: 15, using streak temporarily)
✅ Should unlock:
- `ten-days-total` (target: 10) - ✓ 15 >= 10

❌ Should NOT unlock:
- `quarter-century` (target: 25) - 15 < 25
- `half-century` (target: 50) - 15 < 50
- `century-club` (target: 100) - 15 < 100

### Special Achievements
❌ Should NOT unlock:
- `comeback-kid` - requires hasRestarted = true (currently false)
- `perfect-week` - requires special tracking
- `early-riser` - requires special tracking

## Total Expected: 7 Unlocked / 22 Total = 32%

## How It Works

### 1. Page Load Sequence
```
1. App layout mounts
2. initializeUser() is called
3. Mock user is set in currentUser store (in DEV mode)
4. achievements.ts auto-subscribe triggers:
   - Detects user change
   - Auto-initializes achievements (if not already)
   - Calls checkAchievements() with user data
5. Achievements page mounts
   - Shows current achievements state
   - Optional manual check if needed
```

### 2. Achievement Checking Logic
```typescript
checkAchievements(userStreak: 15, totalDaysCompleted: 15, hasRestarted: false, userLevel: 6)

For each achievement:
  - If category === 'streak': progress = userStreak (15)
  - If category === 'consistency': progress = totalDaysCompleted (15)
  - If category === 'activity' && is level achievement: progress = userLevel (6)
  - If progress >= target && !unlocked: UNLOCK IT
```

### 3. Debug Console Logs to Watch For
```
👤 User changed in achievements store: { username: 'user', streak: 15, level: 6, isInitialized: false }
🔧 Auto-initializing achievements...
🎮 Initializing achievements store...
✨ First time initialization: 22 achievements
🎯 Checking achievements with: { userStreak: 15, totalDaysCompleted: 15, hasRestarted: false, userLevel: 6 }
🏆 Unlocking achievement: First Step (15/1)
🏆 Unlocking achievement: Getting Started (15/3)
🏆 Unlocking achievement: Week Warrior (15/7)
🏆 Unlocking achievement: Two Week Champion (15/14)
🏆 Unlocking achievement: Beginner (6/1)
🏆 Unlocking achievement: Novice (6/5)
🏆 Unlocking achievement: Perfect Ten (15/10)
✅ Unlocked 7 new achievements
```

## Testing Steps

### Fresh Start Test
1. Open browser DevTools Console
2. Clear localStorage: `localStorage.clear()`
3. Refresh page
4. Watch console logs
5. Navigate to /app/achievements
6. Should see 7 unlocked achievements (32%)

### Reset Test
1. Go to /app/achievements
2. Click "🔄 Reset" button
3. Confirm the dialog
4. Watch console logs
5. Should see achievements reset and re-checked
6. Should unlock the same 7 achievements again

### Manual User Test
You can also test with the "borbi" user:
- Level: 11, Streak: 7
- Expected unlocks: 5 streak + 3 level + 1 consistency = 9 total (41%)

## Troubleshooting

### Issue: Achievements not unlocking
**Check:**
- Console logs - is `checkAchievements` being called?
- User data - is `$currentUser` properly set?
- localStorage - clear it and try again
- isInitialized flag - is it preventing double init?

### Issue: Only some achievements unlock
**Check:**
- Console logs - which achievements are being unlocked?
- Achievement definitions - are categories correct?
- Progress calculation - is it matching the right field?

### Issue: Achievements unlock then disappear
**Check:**
- localStorage persistence - is it saving?
- Multiple calls - is checkAchievements being called multiple times?
- Store updates - are they properly triggering reactivity?

## Files Modified

1. **achievements.ts** - Main store with auto-subscribe and debug logs
2. **achievements/+page.svelte** - Display page with reset button
3. **user.ts** - Mock user with level 6, streak 15

All console.log statements include emoji prefixes for easy filtering! 🎯
