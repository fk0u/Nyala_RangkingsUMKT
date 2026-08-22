"use client";

/**
 * Nyala Real Gamification Engine (Zero-Placeholder, Real Data Calculation)
 * Synchronizes Streak & XP directly with user activities and local persistence.
 */

export interface GamificationState {
  streakDays: number;
  totalXp: number;
  level: number;
  levelTitle: string;
  checklistCount: number;
  checklistTotal: number;
}

export function getTodayDateString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function calculateRealStreak(): number {
  if (typeof window === "undefined") return 1;

  try {
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();
    const saved = localStorage.getItem("nyala_streak_record_v1");

    if (!saved) {
      // First day initialization
      const initial = { lastActiveDate: today, streak: 1 };
      localStorage.setItem("nyala_streak_record_v1", JSON.stringify(initial));
      return 1;
    }

    const parsed = JSON.parse(saved);
    const lastDate = parsed.lastActiveDate;
    let currentStreak = parsed.streak || 1;

    if (lastDate === today) {
      // Already logged in today
      return currentStreak;
    } else if (lastDate === yesterday) {
      // Consecutive day login!
      currentStreak += 1;
      localStorage.setItem(
        "nyala_streak_record_v1",
        JSON.stringify({ lastActiveDate: today, streak: currentStreak })
      );
      return currentStreak;
    } else {
      // Streak broken, reset to 1
      localStorage.setItem(
        "nyala_streak_record_v1",
        JSON.stringify({ lastActiveDate: today, streak: 1 })
      );
      return 1;
    }
  } catch (e) {
    console.error("Error calculating streak:", e);
    return 1;
  }
}

export function calculateRealXp(): { totalXp: number; level: number; levelTitle: string; checklistCount: number; checklistTotal: number } {
  if (typeof window === "undefined") {
    return { totalXp: 50, level: 1, levelTitle: "MABA Pejuang", checklistCount: 0, checklistTotal: 11 };
  }

  let xp = 50; // Starting Welcome Bonus for MABA
  let checklistCompleted = 0;
  const checklistTotal = 11;

  try {
    // 1. Calculate from actual checked items in nyala_checklist
    const savedChecklist = localStorage.getItem("nyala_checklist");
    if (savedChecklist) {
      const parsed = JSON.parse(savedChecklist);
      checklistCompleted = Object.values(parsed).filter(Boolean).length;
      xp += checklistCompleted * 15; // +15 XP per checked item
    }

    // 2. Calculate from health logs
    const savedHealth = localStorage.getItem("nyala_health_logs");
    if (savedHealth) {
      const parsed = JSON.parse(savedHealth);
      if (Array.isArray(parsed)) {
        xp += Math.min(parsed.length * 20, 60); // +20 XP per health check (max 3 logs tracked)
      }
    }

    // 3. Calculate from interactive companion chat count
    const savedChat = localStorage.getItem("nyala_ai_interactions");
    if (savedChat) {
      const parsed = parseInt(savedChat, 10) || 0;
      xp += Math.min(parsed * 10, 40); // +10 XP per AI chat session
    }

    // 4. Calculate Level Title
    let level = 1;
    let levelTitle = "Level 1 • MABA Pejuang";
    if (xp >= 250) {
      level = 3;
      levelTitle = "Level 3 • Mahasiswa Teladan";
    } else if (xp >= 140) {
      level = 2;
      levelTitle = "Level 2 • Inovator Muda";
    }

    return {
      totalXp: xp,
      level,
      levelTitle,
      checklistCount: checklistCompleted,
      checklistTotal,
    };
  } catch (e) {
    console.error("Error calculating XP:", e);
    return { totalXp: 50, level: 1, levelTitle: "Level 1 • MABA Pejuang", checklistCount: 0, checklistTotal: 11 };
  }
}

export function dispatchGamificationUpdate(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("nyala-gamification-update"));
  }
}
