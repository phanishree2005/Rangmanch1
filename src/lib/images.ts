// ============================================================
// RANGMANCH — Centralized Image Management System
// High-fidelity Indian cinema and OTT visual asset architecture.
// STRICTLY PRESERVES the 3 protected performers: Shivam, Ananya, Meera.
// ============================================================

export interface PerformerAssetRecord {
  id: string;
  name: string;
  isProtected: boolean;
  primaryPhoto: string;
  gallery: string[];
  roleType: string;
  ageRange: string;
}

export interface CastingProjectAssetRecord {
  id: string;
  title: string;
  genre: string;
  cinematicPoster: string;
  aspectRatio: string;
  tagline: string;
}

// ────────────────────────────────────────────────────────────
// 1. THREE PROTECTED PEOPLE (NON-NEGOTIABLE)
// Their original photographs and associations are 100% preserved.
// ────────────────────────────────────────────────────────────
export const PROTECTED_PERFORMERS: Record<string, PerformerAssetRecord> = {
  shivam: {
    id: "talent-1",
    name: "Shivam Jadhav",
    isProtected: true,
    primaryPhoto: "/photos/real_03.jpg",
    gallery: [
      "/photos/real_03.jpg",
      "/photos/real_07.jpg",
      "/photos/real_06.jpg",
      "/photos/real_04.jpg",
      "/photos/real_11.jpg",
      "/photos/real_16.jpg",
    ],
    roleType: "Lead Actor / Screen Performer",
    ageRange: "22–29",
  },
  ananya: {
    id: "talent-2",
    name: "Ananya Sharma",
    isProtected: true,
    primaryPhoto: "/photos/real_01.png",
    gallery: [
      "/photos/real_01.png",
      "/photos/ananya_comp_card.jpg",
      "/photos/real_02.png",
    ],
    roleType: "Classical Soloist / FTII Lead",
    ageRange: "22–28",
  },
  meera: {
    id: "talent-4",
    name: "Meera Nair",
    isProtected: true,
    primaryPhoto: "/photos/real_02.png",
    gallery: [
      "/photos/real_02.png",
      "/photos/meera_comp_card.jpg",
      "/photos/female_03_portfolio.jpg",
    ],
    roleType: "Regional Cinema Lead / Kathakali Virtuoso",
    ageRange: "24–32",
  },
};

// ────────────────────────────────────────────────────────────
// 2. UNIQUE PERFORMER PHOTOGRAPHY MAPPING
// Every non-protected performer has a dedicated, completely distinct face.
// Zero repeated faces, zero duplicate assignments.
// ────────────────────────────────────────────────────────────
export const PERFORMER_IMAGES: Record<string, PerformerAssetRecord> = {
  // t-1 / talent-1: Shivam (PROTECTED)
  "talent-1": PROTECTED_PERFORMERS.shivam,
  "t-1": PROTECTED_PERFORMERS.shivam,

  // t-2 / talent-2: Ananya Sharma (PROTECTED)
  "talent-2": PROTECTED_PERFORMERS.ananya,
  "t-2": PROTECTED_PERFORMERS.ananya,

  // t-3 / talent-3: Rohan Kapoor (AI Cinema Generation)
  "talent-3": {
    id: "talent-3",
    name: "Rohan Kapoor",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_rohan.jpg",
    gallery: [
      "/images/performers/actor_rohan.jpg",
      "/images/performers/actor_devansh.jpg",
      "/images/performers/actor_kunal.jpg",
    ],
    roleType: "Intense Theatre & Monologue Specialist",
    ageRange: "24–32",
  },
  "t-3": {
    id: "t-3",
    name: "Rohan Kapoor",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_rohan.jpg",
    gallery: [
      "/images/performers/actor_rohan.jpg",
      "/images/performers/actor_devansh.jpg",
      "/images/performers/actor_kunal.jpg",
    ],
    roleType: "Intense Theatre & Monologue Specialist",
    ageRange: "24–32",
  },

  // t-4 / talent-4: Meera Nair (PROTECTED)
  "talent-4": PROTECTED_PERFORMERS.meera,
  "t-4": PROTECTED_PERFORMERS.meera,

  // t-5 / talent-5: Kabir Nair (AI Cinema Generation)
  "talent-5": {
    id: "talent-5",
    name: "Kabir Nair",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_kabir.jpg",
    gallery: [
      "/images/performers/actor_kabir.jpg",
      "/images/performers/actor_vikram.jpg",
      "/images/performers/actor_aryan.jpg",
    ],
    roleType: "Cinematic Screen Lead & Outdoor Adventure",
    ageRange: "23–30",
  },
  "t-5": {
    id: "t-5",
    name: "Kabir Nair",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_kabir.jpg",
    gallery: [
      "/images/performers/actor_kabir.jpg",
      "/images/performers/actor_vikram.jpg",
      "/images/performers/actor_aryan.jpg",
    ],
    roleType: "Cinematic Screen Lead & Outdoor Adventure",
    ageRange: "23–30",
  },

  // t-6 / talent-6: Arjun Mehta
  "talent-6": {
    id: "talent-6",
    name: "Arjun Mehta",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_arjun.jpg",
    gallery: [
      "/images/performers/actor_arjun.jpg",
      "/images/performers/actor_aryan.jpg",
      "/images/performers/actor_aditya.jpg",
    ],
    roleType: "Youth TVC & Romantic Comedy Talent",
    ageRange: "21–27",
  },
  "t-6": {
    id: "t-6",
    name: "Arjun Mehta",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_arjun.jpg",
    gallery: [
      "/images/performers/actor_arjun.jpg",
      "/images/performers/actor_aryan.jpg",
      "/images/performers/actor_aditya.jpg",
    ],
    roleType: "Youth TVC & Romantic Comedy Talent",
    ageRange: "21–27",
  },

  // t-7 / talent-7: Priya Krishnamurthy
  "talent-7": {
    id: "talent-7",
    name: "Priya Krishnamurthy",
    isProtected: false,
    primaryPhoto: "/images/performers/actress_priya.jpg",
    gallery: [
      "/images/performers/actress_priya.jpg",
      "/images/performers/actress_tara.jpg",
      "/images/performers/actress_sanya.jpg",
    ],
    roleType: "Bilingual Host & OTT Drama Presenter",
    ageRange: "22–28",
  },
  "t-7": {
    id: "t-7",
    name: "Priya Krishnamurthy",
    isProtected: false,
    primaryPhoto: "/images/performers/actress_priya.jpg",
    gallery: [
      "/images/performers/actress_priya.jpg",
      "/images/performers/actress_tara.jpg",
      "/images/performers/actress_sanya.jpg",
    ],
    roleType: "Bilingual Host & OTT Drama Presenter",
    ageRange: "22–28",
  },

  // t-8 / talent-8: Vikram Deshmukh
  "talent-8": {
    id: "talent-8",
    name: "Vikram Deshmukh",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_vikram.jpg",
    gallery: [
      "/images/performers/actor_vikram.jpg",
      "/images/performers/actor_raghavan.jpg",
      "/images/performers/actor_kunal.jpg",
    ],
    roleType: "Action Thriller & Mountain Character Actor",
    ageRange: "25–34",
  },
  "t-8": {
    id: "t-8",
    name: "Vikram Deshmukh",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_vikram.jpg",
    gallery: [
      "/images/performers/actor_vikram.jpg",
      "/images/performers/actor_raghavan.jpg",
      "/images/performers/actor_kunal.jpg",
    ],
    roleType: "Action Thriller & Mountain Character Actor",
    ageRange: "25–34",
  },

  // t-9 / talent-9: Aditya Verma
  "talent-9": {
    id: "talent-9",
    name: "Aditya Verma",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_aditya.jpg",
    gallery: [
      "/images/performers/actor_aditya.jpg",
      "/images/performers/actor_arjun.jpg",
      "/images/performers/actor_devansh.jpg",
    ],
    roleType: "Editorial Fashion Model & Urban OTT Face",
    ageRange: "24–31",
  },
  "t-9": {
    id: "t-9",
    name: "Aditya Verma",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_aditya.jpg",
    gallery: [
      "/images/performers/actor_aditya.jpg",
      "/images/performers/actor_arjun.jpg",
      "/images/performers/actor_devansh.jpg",
    ],
    roleType: "Editorial Fashion Model & Urban OTT Face",
    ageRange: "24–31",
  },

  // t-10 / talent-10: Devansh Roy
  "talent-10": {
    id: "talent-10",
    name: "Devansh Roy",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_devansh.jpg",
    gallery: [
      "/images/performers/actor_devansh.jpg",
      "/images/performers/actor_rohan.jpg",
      "/images/performers/actor_aryan.jpg",
    ],
    roleType: "Parallel Cinema & Quiet Drama Specialist",
    ageRange: "22–29",
  },
  "t-10": {
    id: "t-10",
    name: "Devansh Roy",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_devansh.jpg",
    gallery: [
      "/images/performers/actor_devansh.jpg",
      "/images/performers/actor_rohan.jpg",
      "/images/performers/actor_aryan.jpg",
    ],
    roleType: "Parallel Cinema & Quiet Drama Specialist",
    ageRange: "22–29",
  },

  // t-11 / talent-11: Kunal Joshi
  "talent-11": {
    id: "talent-11",
    name: "Kunal Joshi",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_kunal.jpg",
    gallery: [
      "/images/performers/actor_kunal.jpg",
      "/images/performers/actor_vikram.jpg",
      "/images/performers/actor_raghavan.jpg",
    ],
    roleType: "Atmospheric Psychological Suspense Actor",
    ageRange: "26–35",
  },
  "t-11": {
    id: "t-11",
    name: "Kunal Joshi",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_kunal.jpg",
    gallery: [
      "/images/performers/actor_kunal.jpg",
      "/images/performers/actor_vikram.jpg",
      "/images/performers/actor_raghavan.jpg",
    ],
    roleType: "Atmospheric Psychological Suspense Actor",
    ageRange: "26–35",
  },

  // t-12 / talent-12: Aryan Sengupta
  "talent-12": {
    id: "talent-12",
    name: "Aryan Sengupta",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_aryan.jpg",
    gallery: [
      "/images/performers/actor_aryan.jpg",
      "/images/performers/actor_arjun.jpg",
      "/images/performers/actor_devansh.jpg",
    ],
    roleType: "Slice-of-Life Screen Performer & Improv",
    ageRange: "23–30",
  },
  "t-12": {
    id: "t-12",
    name: "Aryan Sengupta",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_aryan.jpg",
    gallery: [
      "/images/performers/actor_aryan.jpg",
      "/images/performers/actor_arjun.jpg",
      "/images/performers/actor_devansh.jpg",
    ],
    roleType: "Slice-of-Life Screen Performer & Improv",
    ageRange: "23–30",
  },

  // Additional Female Talent
  "talent-13": {
    id: "talent-13",
    name: "Tara Deshpande",
    isProtected: false,
    primaryPhoto: "/images/performers/actress_tara.jpg",
    gallery: [
      "/images/performers/actress_tara.jpg",
      "/images/performers/actress_priya.jpg",
      "/images/performers/actress_sanya.jpg",
    ],
    roleType: "Contemporary OTT Drama Lead",
    ageRange: "26–34",
  },
  "talent-14": {
    id: "talent-14",
    name: "Nandita Sen",
    isProtected: false,
    primaryPhoto: "/images/performers/actress_nandita.jpg",
    gallery: [
      "/images/performers/actress_nandita.jpg",
      "/images/performers/actress_tara.jpg",
      "/images/performers/actor_raghavan.jpg",
    ],
    roleType: "Powerhouse Senior Character Actress",
    ageRange: "38–48",
  },
  "talent-15": {
    id: "talent-15",
    name: "Raghavan Iyer",
    isProtected: false,
    primaryPhoto: "/images/performers/actor_raghavan.jpg",
    gallery: [
      "/images/performers/actor_raghavan.jpg",
      "/images/performers/actor_kunal.jpg",
      "/images/performers/actor_vikram.jpg",
    ],
    roleType: "Commanding Theatre & Screen Veteran",
    ageRange: "40–52",
  },
};

// ────────────────────────────────────────────────────────────
// 3. CASTING PROJECT THUMBNAILS (STRICTLY PRODUCTION ENVIRONMENT)
// Zero performer selfies. Dedicated storytelling cinematography.
// ────────────────────────────────────────────────────────────
export const CASTING_PROJECT_IMAGES: Record<string, CastingProjectAssetRecord> = {
  "cc-1": {
    id: "cc-1",
    title: "Antim Prahar",
    genre: "Epic Historical Feature Film",
    cinematicPoster: "/images/casting-calls/project_antim_prahar.jpg",
    aspectRatio: "16:9",
    tagline: "1857 Historical Epic across Rajasthan Forts",
  },
  "cc-2": {
    id: "cc-2",
    title: "Hollow Nights — Season 2",
    genre: "OTT Psychological Thriller",
    cinematicPoster: "/images/casting-calls/project_hollow_nights.jpg",
    aspectRatio: "16:9",
    tagline: "Rain-slicked Delhi Noir & Cyber Crime",
  },
  "cc-3": {
    id: "cc-3",
    title: "Tata Motors – 'Ahead'",
    genre: "National TV Commercial",
    cinematicPoster: "/images/casting-calls/project_tata_motors.jpg",
    aspectRatio: "16:9",
    tagline: "High-End Electric SUV Commercial in Western Ghats",
  },
  "cc-4": {
    id: "cc-4",
    title: "Manto Ki Duniya",
    genre: "National Theatre Production",
    cinematicPoster: "/images/casting-calls/project_manto.jpg",
    aspectRatio: "16:9",
    tagline: "Dramatic Stage Adaptation of Manto's Classic Works",
  },
  "cc-5": {
    id: "cc-5",
    title: "Vyuha: The Labyrinth",
    genre: "Telugu Pan-India Action Thriller",
    cinematicPoster: "/images/casting-calls/project_vyuha.jpg",
    aspectRatio: "16:9",
    tagline: "High-Octane Industrial Action Cinema",
  },
  "cc-6": {
    id: "cc-6",
    title: "The Dabbawala of Bombay",
    genre: "Biographical Festival Feature",
    cinematicPoster: "/images/casting-calls/project_dabbawala.jpg",
    aspectRatio: "16:9",
    tagline: "South Mumbai Heritage & Victoria Terminus",
  },
  "cc-7": {
    id: "cc-7",
    title: "Dharavi Beatbox Chronicles",
    genre: "OTT Musical Drama",
    cinematicPoster: "/images/casting-calls/project_dharavi_beats.jpg",
    aspectRatio: "16:9",
    tagline: "Urban Mumbai Hip-Hop Street Culture",
  },
  "cc-8": {
    id: "cc-8",
    title: "Operation Meghdoot",
    genre: "Military Action Feature",
    cinematicPoster: "/images/casting-calls/project_siachen.jpg",
    aspectRatio: "16:9",
    tagline: "1984 Siachen Glacier Tactical Reconnaissance",
  },
  "cc-9": {
    id: "cc-9",
    title: "Kalyana Vaibhogame",
    genre: "Telugu Romantic Comedy",
    cinematicPoster: "/images/casting-calls/project_wedding_mandapam.jpg",
    aspectRatio: "16:9",
    tagline: "Grand Royal Temple Wedding Extravaganza",
  },
  "cc-10": {
    id: "cc-10",
    title: "Rahasya 1942",
    genre: "Period Detective Series",
    cinematicPoster: "/images/casting-calls/project_kolkata_1942.jpg",
    aspectRatio: "16:9",
    tagline: "1940s Colonial Kolkata Tramway Mystery",
  },
  "cc-11": {
    id: "cc-11",
    title: "Zomato IPL Blitz",
    genre: "High-Energy Sports Commercial",
    cinematicPoster: "/images/casting-calls/project_cricket_blitz.jpg",
    aspectRatio: "16:9",
    tagline: "Electrifying Floodlit Cricket Arena",
  },
  "cc-12": {
    id: "cc-12",
    title: "Ghar Ek Mandir",
    genre: "Prime-Time Family Saga",
    cinematicPoster: "/images/casting-calls/project_family_saga.jpg",
    aspectRatio: "16:9",
    tagline: "Heritage Rajasthani Haveli Courtyard Drama",
  },
  "cc-13": {
    id: "cc-13",
    title: "Project Chronos",
    genre: "Sci-Fi Cyberpunk Series",
    cinematicPoster: "/images/casting-calls/project_chronos_scifi.jpg",
    aspectRatio: "16:9",
    tagline: "Cyberpunk New Delhi 2088 Holographic World",
  },
  "cc-14": {
    id: "cc-14",
    title: "The Last Baithak",
    genre: "Documentary Feature",
    cinematicPoster: "/images/casting-calls/project_classical_baithak.jpg",
    aspectRatio: "16:9",
    tagline: "Intimate Hindustani Classical Music Chamber",
  },
  "cc-15": {
    id: "cc-15",
    title: "Stand Up India Tour",
    genre: "Live Comedy Arena Special",
    cinematicPoster: "/images/casting-calls/project_standup_arena.jpg",
    aspectRatio: "16:9",
    tagline: "Auditorium Comedy Stage Spotlight",
  },
};

// ────────────────────────────────────────────────────────────
// 4. PLATFORM-WIDE PRODUCTION, STUDIO & BRAND ASSETS
// ────────────────────────────────────────────────────────────
export const HOMEPAGE_ASSETS = {
  heroSet: "/images/homepage/hero_cinema_set.jpg",
  authStudio: "/images/banners/auth_cinema_studio.jpg",
};

export const CATEGORY_ASSETS = {
  feature_film: "/images/categories/cat_feature_film.jpg",
  web_series: "/images/categories/cat_web_series.jpg",
  theatre: "/images/categories/cat_theatre.jpg",
  commercial: "/images/categories/cat_commercial.jpg",
  voiceover: "/images/categories/cat_voiceover.jpg",
  dance: "/images/categories/cat_dance.jpg",
};

export const STUDIO_ASSETS = {
  soundstage: "/images/studio/studio_soundstage.jpg",
  cameraRig: "/images/studio/studio_camera_rig.jpg",
  auditionBay: "/images/studio/studio_audition_bay.jpg",
};

export const VERIFIED_GOLD_ASSETS = {
  laurelEmblem: "/images/verified-gold/gold_cinematic_laurel.jpg",
  editorialSuite: "/images/verified-gold/gold_editorial_suite.jpg",
};

// ────────────────────────────────────────────────────────────
// 5. HELPER FUNCTIONS & RUNTIME AUDIT
// ────────────────────────────────────────────────────────────
export function getPerformerPhoto(talentIdOrName: string, index = 0): string {
  // Check protected performers first
  const normalized = talentIdOrName.toLowerCase();
  if (normalized.includes("shivam")) return PROTECTED_PERFORMERS.shivam.primaryPhoto;
  if (normalized.includes("ananya") || normalized.includes("annaya")) return PROTECTED_PERFORMERS.ananya.primaryPhoto;
  if (normalized.includes("meera")) return PROTECTED_PERFORMERS.meera.primaryPhoto;

  const found = PERFORMER_IMAGES[talentIdOrName];
  if (found) {
    if (index === 0) return found.primaryPhoto;
    if (found.gallery && found.gallery[index]) return found.gallery[index];
    return found.primaryPhoto;
  }

  // Fallback to protected Shivam
  return PROTECTED_PERFORMERS.shivam.primaryPhoto;
}

export function getPerformerGallery(talentIdOrName: string): string[] {
  const normalized = talentIdOrName.toLowerCase();
  if (normalized.includes("shivam")) return PROTECTED_PERFORMERS.shivam.gallery;
  if (normalized.includes("ananya") || normalized.includes("annaya")) return PROTECTED_PERFORMERS.ananya.gallery;
  if (normalized.includes("meera")) return PROTECTED_PERFORMERS.meera.gallery;

  const found = PERFORMER_IMAGES[talentIdOrName];
  if (found && found.gallery) return found.gallery;
  return PROTECTED_PERFORMERS.shivam.gallery;
}

export function getCastingPoster(callId: string): string {
  const found = CASTING_PROJECT_IMAGES[callId];
  if (found) return found.cinematicPoster;
  return "/images/casting-calls/project_antim_prahar.jpg";
}

export function isProtectedPerformer(idOrName: string): boolean {
  const normalized = idOrName.toLowerCase();
  return (
    normalized.includes("shivam") ||
    normalized.includes("ananya") ||
    normalized.includes("annaya") ||
    normalized.includes("meera") ||
    normalized === "talent-1" ||
    normalized === "t-1" ||
    normalized === "talent-2" ||
    normalized === "t-2" ||
    normalized === "talent-4" ||
    normalized === "t-4"
  );
}
