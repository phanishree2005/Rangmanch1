"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PitchbookModal from "@/components/PitchbookModal";
import CallbackDispatcherModal from "@/components/CallbackDispatcherModal";
import ArchivalTalentModal from "@/components/ArchivalTalentModal";
import RoleBreakdownModal from "@/components/RoleBreakdownModal";
import ProjectCodenameModal from "@/components/ProjectCodenameModal";
import ScriptSidesEncryptionModal from "@/components/ScriptSidesEncryptionModal";
import ShootingScheduleModal from "@/components/ShootingScheduleModal";
import RemunerationEscrowModal from "@/components/RemunerationEscrowModal";
import KanbanPipelineModal from "@/components/KanbanPipelineModal";
import DirectorRatingModal from "@/components/DirectorRatingModal";
import BatchFeedbackModal from "@/components/BatchFeedbackModal";
import EnsembleChemistryModal from "@/components/EnsembleChemistryModal";
import DiversityAnalyticsModal from "@/components/DiversityAnalyticsModal";
import VirtualCallbackRoomModal from "@/components/VirtualCallbackRoomModal";
import WaitingLobbyModal from "@/components/WaitingLobbyModal";
import LiveTeleprompterModal from "@/components/LiveTeleprompterModal";
import VenueGeofencingModal from "@/components/VenueGeofencingModal";
import EmergencySOSModal from "@/components/EmergencySOSModal";
import ProfileReadinessModal from "@/components/ProfileReadinessModal";
import RoleRecommendationModal from "@/components/RoleRecommendationModal";
import AvailabilityCalendarModal from "@/components/AvailabilityCalendarModal";
import WhatsAppAuditionBotModal from "@/components/WhatsAppAuditionBotModal";
import SpotlightArenaModal from "@/components/SpotlightArenaModal";
import VoiceoverDubbingModal from "@/components/VoiceoverDubbingModal";
import ContractGeneratorModal from "@/components/ContractGeneratorModal";
import CallSheetModal from "@/components/CallSheetModal";
import ExpenseReimbursementModal from "@/components/ExpenseReimbursementModal";
import MinorWorkPermitModal from "@/components/MinorWorkPermitModal";
import ResidualsCalculatorModal from "@/components/ResidualsCalculatorModal";
import VirtualLookTestModal from "@/components/VirtualLookTestModal";
import IntimacyProtocolModal from "@/components/IntimacyProtocolModal";
import DialectCoachModal from "@/components/DialectCoachModal";
import StuntSafetyModal from "@/components/StuntSafetyModal";
import StarPowerAnalyticsModal from "@/components/StarPowerAnalyticsModal";
import ScriptVersioningModal from "@/components/ScriptVersioningModal";
import DialogueTableReadModal from "@/components/DialogueTableReadModal";
import CharacterArcModal from "@/components/CharacterArcModal";
import ScriptBreakdownModal from "@/components/ScriptBreakdownModal";
import MusicCueSheetModal from "@/components/MusicCueSheetModal";
import VfxTrackingModal from "@/components/VfxTrackingModal";
import ColorGradeLutModal from "@/components/ColorGradeLutModal";
import AdrStudioModal from "@/components/AdrStudioModal";
import CensorComplianceModal from "@/components/CensorComplianceModal";
import ScreeningRoomModal from "@/components/ScreeningRoomModal";
import IcvfxStageModal from "@/components/IcvfxStageModal";
import DitLiveGradeModal from "@/components/DitLiveGradeModal";
import DcpPackagingModal from "@/components/DcpPackagingModal";
import OttLicensingModal from "@/components/OttLicensingModal";
import BoxOfficeTrackerModal from "@/components/BoxOfficeTrackerModal";
import TheatricalCampaignModal from "@/components/TheatricalCampaignModal";
import FilmFestivalManagerModal from "@/components/FilmFestivalManagerModal";
import {
  Search,
  MapPin,
  Clock,
  Shield,
  ArrowRight,
  Star,
  Film,
  Tv,
  Music,
  Megaphone,
  Trophy,
  ChevronDown,
  BadgeCheck,
  FileText,
  Calendar,
  Archive,
  Users,
  Lock,
  ShieldCheck,
  CreditCard,
  Kanban,
  Send,
  PieChart,
  Video,
  PhoneCall,
  Sliders,
  Sparkles,
  Radio,
  Building,
  ShieldAlert,
  TrendingUp,
  Smartphone,
  Mic,
  Flame,
  FileSignature,
  Receipt,
  Coins,
  BarChart3,
  FileCode2,
  Headphones,
  GitMerge,
  Split,
  Music2,
  Crosshair,
  Palette,
  Mic2,
  Stamp,
  Tv2,
  Layers,
  SlidersHorizontal,
} from "lucide-react";

// ─── Self-contained casting data ─────────────────────────────
const CASTINGS = [
  {
    id: "cc-1",
    title: "Antim Prahar",
    subtitle: "Epic Historical Feature Film",
    type: "feature_film",
    typeLabel: "Feature Film",
    studio: "Starlight Casting Co.",
    director: "Imtiaz Ali",
    location: "Mumbai, Maharashtra",
    language: "Hindi",
    budget: "₹85 Lakh – ₹1.2 Cr",
    deadline: "Nov 14, 2024",
    daysLeft: 21,
    escrow: true,
    verified: true,
    image: "/images/casting-calls/project_antim_prahar.jpg",
    synopsis:
      "A sweeping period drama set in 1857, following a troupe of performers who secretly aid the independence movement through their art.",
    roles: [
      { name: "Neha Sinha — Female Lead", age: "22–28", gender: "Female" },
      { name: "Vikram Rao — Antagonist", age: "35–45", gender: "Male" },
      { name: "Pratibha — Supporting", age: "18–24", gender: "Female" },
    ],
    tags: ["Period Drama", "Action", "Hindustani Classical", "CINTAA"],
    color: "#d4af61",
  },
  {
    id: "cc-2",
    title: "Hollow Nights — Season 2",
    subtitle: "OTT Psychological Thriller Web Series",
    type: "web_series",
    typeLabel: "OTT Series",
    studio: "Spectrum Productions",
    director: "Zoya Akhtar",
    location: "Delhi NCR",
    language: "Hindi / English",
    budget: "₹18–25 Lakh / Episode",
    deadline: "Nov 08, 2024",
    daysLeft: 15,
    escrow: true,
    verified: true,
    image: "/images/casting-calls/project_hollow_nights.jpg",
    synopsis:
      "A forensic psychologist is pulled into a labyrinthine murder conspiracy within Delhi's underground art scene. 8-episode streaming series for Prime Video.",
    roles: [
      { name: "Rohan — Cyber Forensics Lead", age: "28–36", gender: "Male" },
      { name: "Ayesha — Journalist", age: "24–32", gender: "Female" },
    ],
    tags: ["Psychological Thriller", "OTT", "Prime Video", "English Fluency"],
    color: "#818cf8",
  },
  {
    id: "cc-3",
    title: "Tata Motors – 'Ahead'",
    subtitle: "National TV Commercial (60 sec + Digital Cut)",
    type: "commercial",
    typeLabel: "Commercial",
    studio: "NovaCast India × Ogilvy",
    director: "Shakun Batra",
    location: "Mumbai + Lonavala Shoot",
    language: "Hindi",
    budget: "₹3.5–6 Lakh (Usage: 1 Year)",
    deadline: "Oct 30, 2024",
    daysLeft: 6,
    escrow: true,
    verified: true,
    image: "/images/casting-calls/project_tata_motors.jpg",
    synopsis:
      "A modern narrative about an evolving Indian family embracing tomorrow's mobility. Seeking genuine chemistry between lead couple — no prior ad experience required.",
    roles: [
      { name: "Modern Father", age: "30–40", gender: "Male" },
      { name: "Working Mother", age: "28–38", gender: "Female" },
    ],
    tags: ["Corporate TVC", "Lifestyle", "Escrow Protected", "National Broadcast"],
    color: "#34d399",
  },
  {
    id: "cc-4",
    title: "Khwaab Ki Zanjeer",
    subtitle: "Marathi & Hindi Stage Musical Production",
    type: "theatre",
    typeLabel: "Theatre",
    studio: "Resonance Theatre Group",
    director: "Atul Kumar",
    location: "NCPA Mumbai / Prithvi Theatre",
    language: "Hindi / Marathi",
    budget: "₹45,000–₹80,000 / Month",
    deadline: "Nov 22, 2024",
    daysLeft: 29,
    escrow: false,
    verified: true,
    image: "/images/casting-calls/project_manto.jpg",
    synopsis:
      "An original musical exploring themes of partition, love, and displacement across three generations. Requires trained vocalists and movement artists.",
    roles: [
      { name: "Razia — Protagonist (Singer)", age: "20–30", gender: "Female" },
      { name: "Hakim — Patriarch", age: "45–60", gender: "Male" },
      { name: "Ensemble (5 Roles)", age: "18–35", gender: "Any" },
    ],
    tags: ["Musical Theatre", "Classical Singing", "Hindustani Vocals", "NCPA"],
    color: "#f472b6",
  },
  {
    id: "cc-5",
    title: "Neel — Telugu Feature",
    subtitle: "Telugu Pan-India Action Drama",
    type: "feature_film",
    typeLabel: "Feature Film",
    studio: "Mythri Movie Makers",
    director: "Trivikram Srinivas",
    location: "Hyderabad / International Shoot",
    language: "Telugu / Tamil / Hindi",
    budget: "₹1.5–3 Cr (Lead Role)",
    deadline: "Dec 05, 2024",
    daysLeft: 42,
    escrow: true,
    verified: true,
    image: "/photos/real_08.jpg",
    synopsis:
      "High-octane action drama starring a street-level police officer uncovering a political conspiracy. Seeking a commanding female lead with action training.",
    roles: [
      { name: "IPS Officer Kavya", age: "25–33", gender: "Female" },
      { name: "Villain Sidekick", age: "28–40", gender: "Male" },
    ],
    tags: ["Pan-India", "Action", "Telugu", "Stunt Training Required"],
    color: "#fb923c",
  },
  {
    id: "cc-6",
    title: "Meera — Biographical Drama",
    subtitle: "National Award Submission Feature Film",
    type: "feature_film",
    typeLabel: "Feature Film",
    studio: "NFDC × Cinestaan Film Company",
    director: "Shonali Bose",
    location: "Rajasthan / Vrindavan",
    language: "Hindi / Braj Bhasha",
    budget: "₹50–90 Lakh (Lead)",
    deadline: "Nov 28, 2024",
    daysLeft: 35,
    escrow: true,
    verified: true,
    image: "/photos/real_02.png",
    synopsis:
      "A sweeping biographical retelling of the life of poet-saint Mirabai told through a contemporary lens. Requires trained Bharatanatyam and Kuchipudi dancers.",
    roles: [
      { name: "Meera (Young)", age: "18–24", gender: "Female" },
      { name: "Meera (Adult)", age: "28–38", gender: "Female" },
    ],
    tags: ["NFDC", "Classical Dance", "National Award", "Art House"],
    color: "#c084fc",
  },
];

const TYPES = [
  { id: "all", label: "All Formats", icon: Film },
  { id: "feature_film", label: "Feature Films", icon: Film },
  { id: "web_series", label: "OTT Series", icon: Tv },
  { id: "theatre", label: "Theatre", icon: Music },
  { id: "commercial", label: "Commercials", icon: Megaphone },
];

export default function CastingCallsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [onlyEscrow, setOnlyEscrow] = useState(false);
  const [language, setLanguage] = useState("All Languages");

  // Module 3 Features State (Features #28, #29, #30)
  const [isPitchbookOpen, setIsPitchbookOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [selectedPitchProject, setSelectedPitchProject] = useState("Antim Prahar");

  // Module 4 Features State (Features #31, #32, #33, #34, #35)
  const [isRoleBreakdownOpen, setIsRoleBreakdownOpen] = useState(false);
  const [isCodenameOpen, setIsCodenameOpen] = useState(false);
  const [isScriptEncryptionOpen, setIsScriptEncryptionOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isEscrowCalcOpen, setIsEscrowCalcOpen] = useState(false);

  // Module 5 Features State (Features #36, #37, #38, #39, #40)
  const [isKanbanOpen, setIsKanbanOpen] = useState(false);
  const [isDirectorRatingOpen, setIsDirectorRatingOpen] = useState(false);
  const [isBatchFeedbackOpen, setIsBatchFeedbackOpen] = useState(false);
  const [isEnsembleOpen, setIsEnsembleOpen] = useState(false);
  const [isDiversityOpen, setIsDiversityOpen] = useState(false);

  // Module 6 Features State (Features #41, #42, #43, #44, #45)
  const [isCallbackRoomOpen, setIsCallbackRoomOpen] = useState(false);
  const [isWaitingLobbyOpen, setIsWaitingLobbyOpen] = useState(false);
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState(false);
  const [isVenueGeofenceOpen, setIsVenueGeofenceOpen] = useState(false);
  const [isEmergencySosOpen, setIsEmergencySosOpen] = useState(false);

  // Module 7 Features State (Features #46, #47, #48, #49, #50, #51)
  const [isReadinessOpen, setIsReadinessOpen] = useState(false);
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const [isWhatsAppBotOpen, setIsWhatsAppBotOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [isVoiceoverOpen, setIsVoiceoverOpen] = useState(false);

  // Module 8 Features State (Features #52, #53, #54, #55, #56)
  const [isContractGeneratorOpen, setIsContractGeneratorOpen] = useState(false);
  const [isCallSheetOpen, setIsCallSheetOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isMinorPermitOpen, setIsMinorPermitOpen] = useState(false);
  const [isResidualsOpen, setIsResidualsOpen] = useState(false);

  // Module 9 Features State (Features #57, #58, #59, #60, #61)
  const [isVirtualLookTestOpen, setIsVirtualLookTestOpen] = useState(false);
  const [isIntimacyProtocolOpen, setIsIntimacyProtocolOpen] = useState(false);
  const [isDialectCoachOpen, setIsDialectCoachOpen] = useState(false);
  const [isStuntSafetyOpen, setIsStuntSafetyOpen] = useState(false);
  const [isStarPowerOpen, setIsStarPowerOpen] = useState(false);

  // Module 10 Features State (Features #62, #63, #64, #65, #66)
  const [isScriptVersioningOpen, setIsScriptVersioningOpen] = useState(false);
  const [isTableReadOpen, setIsTableReadOpen] = useState(false);
  const [isCharacterArcOpen, setIsCharacterArcOpen] = useState(false);
  const [isScriptBreakdownOpen, setIsScriptBreakdownOpen] = useState(false);
  const [isMusicCueOpen, setIsMusicCueOpen] = useState(false);

  // Module 11 Features State (Features #67, #68, #69, #70, #71)
  const [isVfxTrackingOpen, setIsVfxTrackingOpen] = useState(false);
  const [isColorGradeLutOpen, setIsColorGradeLutOpen] = useState(false);
  const [isAdrStudioOpen, setIsAdrStudioOpen] = useState(false);
  const [isCensorComplianceOpen, setIsCensorComplianceOpen] = useState(false);
  const [isScreeningRoomOpen, setIsScreeningRoomOpen] = useState(false);

  // Module 12 Features State (Features #72, #73)
  const [isIcvfxStageOpen, setIsIcvfxStageOpen] = useState(false);
  const [isDitLiveGradeOpen, setIsDitLiveGradeOpen] = useState(false);

  // Module 13 Features State (Features #74, #75, #76, #77, #78)
  const [isDcpPackagingOpen, setIsDcpPackagingOpen] = useState(false);
  const [isOttLicensingOpen, setIsOttLicensingOpen] = useState(false);
  const [isBoxOfficeTrackerOpen, setIsBoxOfficeTrackerOpen] = useState(false);
  const [isTheatricalCampaignOpen, setIsTheatricalCampaignOpen] = useState(false);
  const [isFilmFestivalManagerOpen, setIsFilmFestivalManagerOpen] = useState(false);

  const filtered = useMemo(() => {
    return CASTINGS.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.synopsis.toLowerCase().includes(q) ||
        c.studio.toLowerCase().includes(q) ||
        c.roles.some((r) => r.name.toLowerCase().includes(q));
      const matchType = type === "all" || c.type === type;
      const matchEscrow = !onlyEscrow || c.escrow;
      const matchLang =
        language === "All Languages" || c.language.includes(language);
      return matchSearch && matchType && matchEscrow && matchLang;
    });
  }, [search, type, onlyEscrow, language]);

  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#040406",
          color: "#f8f8f6",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        {/* ── HERO HEADER ── */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "48px 32px 40px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontSize: "10px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              color: "#d4af61",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            ✦ NATIONAL CASTING DIRECTORY • VERIFIED PRODUCTIONS ONLY
          </p>

          {/* Title row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "32px",
              flexWrap: "wrap",
              marginBottom: "32px",
            }}
          >
            <div>
              <h1
                className="font-cinema"
                style={{
                  fontSize: "clamp(32px, 5vw, 58px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.05,
                  margin: "0 0 12px 0",
                }}
              >
                Current Castings &amp;<br />
                <span style={{ color: "#d4af61" }}>Open Productions</span>
              </h1>
              <p
                style={{
                  fontSize: "14px",
                  color: "#9a9aa8",
                  maxWidth: "560px",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Direct audition submissions for accredited Indian feature films, OTT originals, theatre, and commercials. All engagements under{" "}
                <span style={{ color: "#d4af61" }}>CINTAA fair-play standards</span> and escrow-protected compensation.
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "32px", flexShrink: 0 }}>
              {[
                { value: "42", label: "Active Sides" },
                { value: "₹1.8 Cr", label: "Escrow Secured", gold: true },
                { value: "18", label: "Studios Live" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div
                    className="font-cinema"
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: s.gold ? "#d4af61" : "#ffffff",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#606070",
                      marginTop: "4px",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CASTING DIRECTOR SUITE • MODULE 3 (FEATURES 28, 29, 30) ── */}
          <section style={{ marginBottom: "36px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "18px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      letterSpacing: "0.22em",
                      color: "#d4af61",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    ✦ MODULE 3 • CASTING DIRECTOR COMMAND CENTER
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      backgroundColor: "rgba(16, 185, 129, 0.15)",
                      color: "#34d399",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      padding: "1px 8px",
                      borderRadius: "999px",
                      fontFamily: "monospace",
                    }}
                  >
                    LIVE PRODUCTION SUITE
                  </span>
                </div>
                <h2
                  className="font-cinema"
                  style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff", margin: 0 }}
                >
                  Executive Pitchbooks, Callback Dispatcher &amp; Studio Archive
                </h2>
              </div>
            </div>

            {/* 3 Dedicated Module Cards (Not merged!) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {/* CARD 1: FEATURE 28 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(212, 175, 97, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#d4af61";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212, 175, 97, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background:
                            "linear-gradient(135deg, rgba(212,175,97,0.2) 0%, rgba(212,175,97,0.05) 100%)",
                          border: "1px solid rgba(212,175,97,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#d4af61",
                          flexShrink: 0,
                        }}
                      >
                        <FileText size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Shortlist PDF Pitchbook
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(212,175,97,0.15)",
                        color: "#f4e2b8",
                        border: "1px solid rgba(212,175,97,0.3)",
                      }}
                    >
                      EXECUTIVE SUITE
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Auto-generate pitch presentations for Producers &amp; Network Executives (Netflix, Prime, NFDC, Zee) with candidate scorecards, remuneration estimates, and confidential watermarking.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    4 Candidates Shortlisted
                  </span>
                  <button
                    onClick={() => {
                      setSelectedPitchProject("Antim Prahar");
                      setIsPitchbookOpen(true);
                    }}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    OPEN PITCHBOOK →
                  </button>
                </div>
              </div>

              {/* CARD 2: FEATURE 29 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(52, 211, 153, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#34d399";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(52, 211, 153, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "rgba(52,211,153,0.12)",
                          border: "1px solid rgba(52,211,153,0.35)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#34d399",
                          flexShrink: 0,
                        }}
                      >
                        <Calendar size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Audition Callback Dispatcher
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(52,211,153,0.15)",
                        color: "#34d399",
                        border: "1px solid rgba(52,211,153,0.3)",
                      }}
                    >
                      AUTO-SCHEDULER
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Batch-invite actors to Round-2 callbacks at Famous Studios Mumbai or virtual HD rooms. Includes auto-slotted intervals, attached encrypted sides, and .ics calendar sync.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    4 Slots Available • 20m
                  </span>
                  <button
                    onClick={() => {
                      setSelectedPitchProject("Antim Prahar");
                      setIsCallbackOpen(true);
                    }}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    DISPATCH CALLBACKS →
                  </button>
                </div>
              </div>

              {/* CARD 3: FEATURE 30 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(167, 139, 250, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#a78bfa";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(167, 139, 250, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "rgba(167,139,250,0.12)",
                          border: "1px solid rgba(167,139,250,0.35)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#a78bfa",
                          flexShrink: 0,
                        }}
                      >
                        <Archive size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Archival Talent Database
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(167,139,250,0.15)",
                        color: "#c4b5fd",
                        border: "1px solid rgba(167,139,250,0.3)",
                      }}
                    >
                      STUDIO VAULT
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Search the studio&apos;s private internal archive across past productions (Kaarvan, Dhoop Ki Deewar), filter by director ratings (4.0+), review critique, and fast-track invites.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    4 Verified Records • 4.5+ ★
                  </span>
                  <button
                    onClick={() => setIsArchiveOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    EXPLORE ARCHIVE →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── CASTING CALL & PRODUCTION PUBLISHER • MODULE 4 (FEATURES 31, 32, 33, 34, 35) ── */}
          <section style={{ marginBottom: "36px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "18px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      letterSpacing: "0.22em",
                      color: "#60a5fa",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    ✦ MODULE 4 • CASTING CALL &amp; PRODUCTION PUBLISHER
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      backgroundColor: "rgba(96, 165, 250, 0.15)",
                      color: "#93c5fd",
                      border: "1px solid rgba(96, 165, 250, 0.3)",
                      padding: "1px 8px",
                      borderRadius: "999px",
                      fontFamily: "monospace",
                    }}
                  >
                    STUDIO PUBLISHING SUITE
                  </span>
                </div>
                <h2
                  className="font-cinema"
                  style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff", margin: 0 }}
                >
                  Production Breakdowns, Codenames, Sides Encryption &amp; Escrow
                </h2>
              </div>
            </div>

            {/* 5 Dedicated Standalone Feature Cards (Completely Unmerged & Well-Structured) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {/* CARD 1: FEATURE 31 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(96, 165, 250, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#60a5fa";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(96, 165, 250, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background:
                            "linear-gradient(135deg, rgba(96,165,250,0.2) 0%, rgba(96,165,250,0.05) 100%)",
                          border: "1px solid rgba(96,165,250,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#60a5fa",
                          flexShrink: 0,
                        }}
                      >
                        <Users size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Multi-Role Role Breakdown
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(96,165,250,0.15)",
                        color: "#93c5fd",
                        border: "1px solid rgba(96,165,250,0.3)",
                      }}
                    >
                      ROLE BUILDER
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Structure Leads, Supporting, Antagonists, Day Players, and Background Extras in a single listing with age brackets, dialect demands, and billing tiers.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    5 Roles Configured
                  </span>
                  <button
                    onClick={() => setIsRoleBreakdownOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    OPEN ROLE BUILDER →
                  </button>
                </div>
              </div>

              {/* CARD 2: FEATURE 32 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(245, 158, 11, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#f59e0b";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "rgba(245,158,11,0.12)",
                          border: "1px solid rgba(245,158,11,0.35)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#f59e0b",
                          flexShrink: 0,
                        }}
                      >
                        <Lock size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Confidential Project Codenames
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(245,158,11,0.15)",
                        color: "#fde68a",
                        border: "1px solid rgba(245,158,11,0.3)",
                      }}
                    >
                      PROJECT ALIAS
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Post high-profile casting calls under project alias titles (e.g., Project Falcon) with masked director identities and IT Act Section 72A NDA gating.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    Alias: Project Falcon-1857
                  </span>
                  <button
                    onClick={() => setIsCodenameOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    ARM CODENAME SHIELD →
                  </button>
                </div>
              </div>

              {/* CARD 3: FEATURE 33 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(236, 72, 153, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ec4899";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(236, 72, 153, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "rgba(236,72,153,0.12)",
                          border: "1px solid rgba(236,72,153,0.35)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ec4899",
                          flexShrink: 0,
                        }}
                      >
                        <ShieldCheck size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Script Sides Encryption &amp; Watermark
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(236,72,153,0.15)",
                        color: "#fbcfe8",
                        border: "1px solid rgba(236,72,153,0.3)",
                      }}
                    >
                      AES-256 VAULT
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Distribute tamper-proof script sides with Aadhaar forensic watermarks, two-factor mobile OTP gates, and 48-hour self-destructing links.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    6 Pages • 2.8 MB • Encrypted
                  </span>
                  <button
                    onClick={() => setIsScriptEncryptionOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    ENCRYPT SIDES →
                  </button>
                </div>
              </div>

              {/* CARD 4: FEATURE 34 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(16, 185, 129, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#10b981";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "rgba(16,185,129,0.12)",
                          border: "1px solid rgba(16,185,129,0.35)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#10b981",
                          flexShrink: 0,
                        }}
                      >
                        <MapPin size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Location &amp; Shooting Schedule
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(16,185,129,0.15)",
                        color: "#a7f3d0",
                        border: "1px solid rgba(16,185,129,0.3)",
                      }}
                    >
                      3-LEG SCHEDULE
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Transparent 42-day shooting schedule breakdown across Mumbai, Rajasthan, and London with business flights, 5-star lodging, and night-shift allowances.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    42 Days • 3 Locations
                  </span>
                  <button
                    onClick={() => setIsScheduleOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    VIEW SCHEDULE →
                  </button>
                </div>
              </div>

              {/* CARD 5: FEATURE 35 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(212, 175, 97, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#d4af61";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212, 175, 97, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background:
                            "linear-gradient(135deg, rgba(212,175,97,0.2) 0%, rgba(212,175,97,0.05) 100%)",
                          border: "1px solid rgba(212,175,97,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#d4af61",
                          flexShrink: 0,
                        }}
                      >
                        <CreditCard size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Remuneration &amp; Escrow Scale
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(212,175,97,0.15)",
                        color: "#fde68a",
                        border: "1px solid rgba(212,175,97,0.3)",
                      }}
                    >
                      ESCROW SCALE
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Calculate professional fees against CINTAA guild minimum benchmarks with automatic Section 194J TDS deductions and RBI-backed bank escrow locking.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    188% Above Guild Min
                  </span>
                  <button
                    onClick={() => setIsEscrowCalcOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    CALCULATE ESCROW →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════════════════════════════
              MODULE 5: CASTING PIPELINE & APPLICANT INTELLIGENCE (Features 36–40)
              5 Dedicated Standalone Feature Cards (Completely Unmerged & Well-Structured)
          ══════════════════════════════════════════════════════════════════════════════════════════ */}
          <section
            style={{
              marginBottom: "36px",
              padding: "24px",
              borderRadius: "22px",
              background: "linear-gradient(180deg, rgba(56, 189, 248, 0.05) 0%, rgba(13, 13, 22, 0.9) 100%)",
              border: "1px solid rgba(56, 189, 248, 0.22)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Module 5 Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                paddingBottom: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      letterSpacing: "0.22em",
                      color: "#38bdf8",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    ✦ MODULE 5 • CASTING PIPELINE &amp; APPLICANT INTELLIGENCE
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      backgroundColor: "rgba(56, 189, 248, 0.15)",
                      color: "#7dd3fc",
                      border: "1px solid rgba(56, 189, 248, 0.3)",
                      padding: "1px 8px",
                      borderRadius: "999px",
                      fontFamily: "monospace",
                    }}
                  >
                    DIRECTOR SUITE
                  </span>
                </div>
                <h2
                  className="font-cinema"
                  style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff", margin: 0 }}
                >
                  Applicant Kanban, Director Scoring, Feedback Dispatch &amp; Chemistry
                </h2>
              </div>
            </div>

            {/* 5 Dedicated Standalone Feature Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {/* CARD 1: FEATURE 36 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(56, 189, 248, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#38bdf8";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(56,189,248,0.05) 100%)",
                          border: "1px solid rgba(56,189,248,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#38bdf8",
                          flexShrink: 0,
                        }}
                      >
                        <Kanban size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          5-Stage Kanban Pipeline
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(56,189,248,0.15)",
                        color: "#7dd3fc",
                        border: "1px solid rgba(56,189,248,0.3)",
                      }}
                    >
                      PIPELINE BOARD
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Visualize and advance audition tapes through 5 industry-standard stages: Submitted, Under Review, Shortlisted, Callback, and Selected with audit logs.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    5 Active Stages
                  </span>
                  <button
                    onClick={() => setIsKanbanOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    OPEN KANBAN PIPELINE →
                  </button>
                </div>
              </div>

              {/* CARD 2: FEATURE 37 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(245, 158, 11, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#f59e0b";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.05) 100%)",
                          border: "1px solid rgba(245,158,11,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#f59e0b",
                          flexShrink: 0,
                        }}
                      >
                        <Star size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Director Rating &amp; Notes
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(245,158,11,0.15)",
                        color: "#fde68a",
                        border: "1px solid rgba(245,158,11,0.3)",
                      }}
                    >
                      DIRECTOR CRITIQUE
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Multi-vector evaluation across Screen Presence, Diction, Emotional Range, Script Adherence, and Chemistry with timestamped playback markers.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    ★ 5.0 Rating Matrix
                  </span>
                  <button
                    onClick={() => setIsDirectorRatingOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    RATE AUDITIONS →
                  </button>
                </div>
              </div>

              {/* CARD 3: FEATURE 38 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(16, 185, 129, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#10b981";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 100%)",
                          border: "1px solid rgba(16,185,129,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#10b981",
                          flexShrink: 0,
                        }}
                      >
                        <Send size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Batch Feedback Dispatcher
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(16,185,129,0.15)",
                        color: "#a7f3d0",
                        border: "1px solid rgba(16,185,129,0.3)",
                      }}
                    >
                      NO-GHOSTING DISPATCH
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Automate personalized constructive feedback over WhatsApp and Email for non-selected talent under the Fair-Play Zero Ghosting Charter.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    Multi-Channel Broadcast
                  </span>
                  <button
                    onClick={() => setIsBatchFeedbackOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    DISPATCH FEEDBACK →
                  </button>
                </div>
              </div>

              {/* CARD 4: FEATURE 39 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(168, 85, 247, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#a855f7";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0.05) 100%)",
                          border: "1px solid rgba(168,85,247,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#a855f7",
                          flexShrink: 0,
                        }}
                      >
                        <Users size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          AI Ensemble Chemistry
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(168,85,247,0.15)",
                        color: "#e9d5ff",
                        border: "1px solid rgba(168,85,247,0.3)",
                      }}
                    >
                      CO-STAR SYNERGY
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Side-by-side computer vision pairing test analyzing height differential (+7&quot;), vocal frequency balance (Baritone vs Alto), and 94.8% chemistry index.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    94.8% Synergy Match
                  </span>
                  <button
                    onClick={() => setIsEnsembleOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    PAIR LEAD TALENT →
                  </button>
                </div>
              </div>

              {/* CARD 5: FEATURE 40 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(236, 72, 153, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ec4899";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(236, 72, 153, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(236,72,153,0.05) 100%)",
                          border: "1px solid rgba(236,72,153,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ec4899",
                          flexShrink: 0,
                        }}
                      >
                        <PieChart size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Casting Diversity Analytics
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(236,72,153,0.15)",
                        color: "#fbcfe8",
                        border: "1px solid rgba(236,72,153,0.3)",
                      }}
                    >
                      DEMOGRAPHICS AUDIT
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Real-time representation telemetry across Pan-India zones (North, South, East, West), theatre vs screen alumni ratios, and gender equity benchmarks.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    642 Auditions Telemetry
                  </span>
                  <button
                    onClick={() => setIsDiversityOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    VIEW DIVERSITY INDEX →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════════════════════════════
              MODULE 6: VIRTUAL CALLBACK SUITE & ANTI-CASTING COUCH ESCROW SHIELD (Features 41–45)
              5 Dedicated Standalone Feature Cards (Completely Unmerged & Well-Structured)
          ══════════════════════════════════════════════════════════════════════════════════════════ */}
          <section
            style={{
              marginBottom: "36px",
              padding: "24px",
              borderRadius: "22px",
              background: "linear-gradient(180deg, rgba(6, 182, 212, 0.05) 0%, rgba(13, 13, 22, 0.9) 100%)",
              border: "1px solid rgba(6, 182, 212, 0.22)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Module 6 Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                paddingBottom: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      letterSpacing: "0.22em",
                      color: "#06b6d4",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    ✦ MODULE 6 • VIRTUAL CALLBACK SUITE &amp; ESCROW SAFETY SHIELD
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      backgroundColor: "rgba(6, 182, 212, 0.15)",
                      color: "#a5f3fc",
                      border: "1px solid rgba(6, 182, 212, 0.3)",
                      padding: "1px 8px",
                      borderRadius: "999px",
                      fontFamily: "monospace",
                    }}
                  >
                    PRODUCTION INTEGRITY
                  </span>
                </div>
                <h2
                  className="font-cinema"
                  style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff", margin: 0 }}
                >
                  Live WebRTC Callback, Green Room, Teleprompter &amp; Safety Geofence
                </h2>
              </div>
            </div>

            {/* 5 Dedicated Standalone Feature Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {/* CARD 6: FEATURE 41 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(6, 182, 212, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#06b6d4";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0.05) 100%)",
                          border: "1px solid rgba(6,182,212,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#06b6d4",
                          flexShrink: 0,
                        }}
                      >
                        <Video size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Virtual WebRTC Audition Room
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(6,182,212,0.15)",
                        color: "#a5f3fc",
                        border: "1px solid rgba(6,182,212,0.3)",
                      }}
                    >
                      WEBRTC 1080P
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Broadcast-grade interactive video audition room with low-latency 18ms WebRTC peer connection, in-call director prompts, and ProRes audio stem capture.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    1080p @ 60 FPS Master
                  </span>
                  <button
                    onClick={() => setIsCallbackRoomOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    ENTER LIVE ROOM →
                  </button>
                </div>
              </div>

              {/* CARD 7: FEATURE 42 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(234, 179, 8, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#eab308";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(234, 179, 8, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(234,179,8,0.2) 0%, rgba(234,179,8,0.05) 100%)",
                          border: "1px solid rgba(234,179,8,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#eab308",
                          flexShrink: 0,
                        }}
                      >
                        <Clock size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Automated Waiting Lobby
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(234,179,8,0.15)",
                        color: "#fef08a",
                        border: "1px solid rgba(234,179,8,0.3)",
                      }}
                    >
                      DIGITAL GREEN ROOM
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Performer queue order tracker (#3 in line), live countdown wait clock (~8 mins), pre-stage camera lighting check, and director audio buzzer admit chime.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    Live Queue #3
                  </span>
                  <button
                    onClick={() => setIsWaitingLobbyOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    OPEN GREEN ROOM →
                  </button>
                </div>
              </div>

              {/* CARD 8: FEATURE 43 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(99, 102, 241, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.05) 100%)",
                          border: "1px solid rgba(99,102,241,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#6366f1",
                          flexShrink: 0,
                        }}
                      >
                        <FileText size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Studio Live Teleprompter
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(99,102,241,0.15)",
                        color: "#c7d2fe",
                        border: "1px solid rgba(99,102,241,0.3)",
                      }}
                    >
                      STUDIO PROMPTER
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Synchronized scrolling prompter with 120–320 WPM speed slider, font scaling, reverse mirror mode for glass beam-splitters, and director remote pause.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    160 WPM • Mirror Rig
                  </span>
                  <button
                    onClick={() => setIsTeleprompterOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    LAUNCH TELEPROMPTER →
                  </button>
                </div>
              </div>

              {/* CARD 9: FEATURE 44 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(239, 68, 68, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ef4444";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(239,68,68,0.05) 100%)",
                          border: "1px solid rgba(239,68,68,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ef4444",
                          flexShrink: 0,
                        }}
                      >
                        <ShieldAlert size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Venue Geofencing Shield
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(239,68,68,0.15)",
                        color: "#fca5a5",
                        border: "1px solid rgba(239,68,68,0.3)",
                      }}
                    >
                      SAFE VENUE PROTOCOL
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Strict anti-casting-couch enforcement: Auditions strictly geofenced to certified commercial studio premises with BMC licenses; private venues auto-blocked.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    150m Studio Perimeter
                  </span>
                  <button
                    onClick={() => setIsVenueGeofenceOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    VERIFY VENUE GEOFENCE →
                  </button>
                </div>
              </div>

              {/* CARD 10: FEATURE 45 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(244, 63, 94, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#f43f5e";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(244, 63, 94, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(244,63,94,0.2) 0%, rgba(244,63,94,0.05) 100%)",
                          border: "1px solid rgba(244,63,94,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#f43f5e",
                          flexShrink: 0,
                        }}
                      >
                        <PhoneCall size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          CINTAA 24/7 SOS &amp; Escrow
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(244,63,94,0.15)",
                        color: "#fecdd3",
                        border: "1px solid rgba(244,63,94,0.3)",
                      }}
                    >
                      EMERGENCY LIFELINE
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    1-Tap emergency legal dispatch to CINTAA Helpline &amp; Police (1090) with automated 100% production escrow fund freeze (₹1.20 Cr locked) upon safety complaint.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    ₹1.20 Cr Escrow Shield
                  </span>
                  <button
                    onClick={() => setIsEmergencySosOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    OPEN SOS SHIELD →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════════════════════════════
              MODULE 7: TALENT ECOSYSTEM, DISCOVERY & DUBBING SUITE (Features 46–51)
              6 Dedicated Standalone Feature Cards (Completely Unmerged & Well-Structured)
          ══════════════════════════════════════════════════════════════════════════════════════════ */}
          <section
            style={{
              marginBottom: "36px",
              padding: "24px",
              borderRadius: "22px",
              background: "linear-gradient(180deg, rgba(212, 175, 97, 0.05) 0%, rgba(13, 13, 22, 0.9) 100%)",
              border: "1px solid rgba(212, 175, 97, 0.22)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Module 7 Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                paddingBottom: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      letterSpacing: "0.22em",
                      color: "#d4af61",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    ✦ MODULE 7 • TALENT ECOSYSTEM, DISCOVERY &amp; DUBBING SUITE
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      backgroundColor: "rgba(212, 175, 97, 0.15)",
                      color: "#f4e2b8",
                      border: "1px solid rgba(212, 175, 97, 0.3)",
                      padding: "1px 8px",
                      borderRadius: "999px",
                      fontFamily: "monospace",
                    }}
                  >
                    ECOSYSTEM &amp; TALENT VAULT
                  </span>
                </div>
                <h2
                  className="font-cinema"
                  style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff", margin: 0 }}
                >
                  Profile Readiness, AI Role Match, Calendar Holds, WhatsApp Bot &amp; Dubbing
                </h2>
              </div>
            </div>

            {/* 6 Dedicated Standalone Feature Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {/* CARD 1: FEATURE 46 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(212, 175, 97, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#d4af61";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212, 175, 97, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(212,175,97,0.2) 0%, rgba(212,175,97,0.05) 100%)",
                          border: "1px solid rgba(212,175,97,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#d4af61",
                          flexShrink: 0,
                        }}
                      >
                        <TrendingUp size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Profile Readiness Gauge
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(212,175,97,0.15)",
                        color: "#f4e2b8",
                        border: "1px solid rgba(212,175,97,0.3)",
                      }}
                    >
                      READINESS SCORE
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Algorithmic profile audit scoring headshot aspect ratio, 48kHz vocal reel, and CINTAA verification to unlock 4.2x casting director search boost.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    85% Production Score
                  </span>
                  <button
                    onClick={() => setIsReadinessOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    ANALYZE READINESS →
                  </button>
                </div>
              </div>

              {/* CARD 2: FEATURE 47 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(139, 92, 246, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#8b5cf6";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(139,92,246,0.05) 100%)",
                          border: "1px solid rgba(139,92,246,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#8b5cf6",
                          flexShrink: 0,
                        }}
                      >
                        <Sparkles size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          AI Role Recommendation Feed
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(139,92,246,0.15)",
                        color: "#c4b5fd",
                        border: "1px solid rgba(139,92,246,0.3)",
                      }}
                    >
                      SMART MATCH
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Personalized casting radar matching regional dialect fluency, playable age brackets, and stage training against verified active production listings.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    97% Compatibility Match
                  </span>
                  <button
                    onClick={() => setIsRecommendationOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    VIEW AI MATCHES →
                  </button>
                </div>
              </div>

              {/* CARD 3: FEATURE 48 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(16, 185, 129, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#10b981";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 100%)",
                          border: "1px solid rgba(16,185,129,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#10b981",
                          flexShrink: 0,
                        }}
                      >
                        <Calendar size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Availability &amp; 1st Option Holds
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(16,185,129,0.15)",
                        color: "#a7f3d0",
                        border: "1px solid rgba(16,185,129,0.3)",
                      }}
                    >
                      CALENDAR HOLD
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Real-time synchronized shoot calendar managing producer 1st-option challenge windows (48h), travel legs, and dispute-free date reservations.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    14 Shoot Days Confirmed
                  </span>
                  <button
                    onClick={() => setIsAvailabilityOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    MANAGE SCHEDULE →
                  </button>
                </div>
              </div>

              {/* CARD 4: FEATURE 49 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(34, 197, 94, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#22c55e";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(34, 197, 94, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(34,197,94,0.05) 100%)",
                          border: "1px solid rgba(34,197,94,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#22c55e",
                          flexShrink: 0,
                        }}
                      >
                        <Smartphone size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          WhatsApp Audition Bot
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(34,197,94,0.15)",
                        color: "#86efac",
                        border: "1px solid rgba(34,197,94,0.3)",
                      }}
                    >
                      RURAL GATEWAY
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Zero-barrier audition ingestion for Tier 2/3 performers: receive watermarked script sides PDF and submit self-tapes directly over WhatsApp.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    WhatsApp Gateway Active
                  </span>
                  <button
                    onClick={() => setIsWhatsAppBotOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    OPEN AUDITION BOT →
                  </button>
                </div>
              </div>

              {/* CARD 5: FEATURE 50 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(234, 179, 8, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#eab308";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(234, 179, 8, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(234,179,8,0.2) 0%, rgba(234,179,8,0.05) 100%)",
                          border: "1px solid rgba(234,179,8,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#eab308",
                          flexShrink: 0,
                        }}
                      >
                        <Trophy size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Rangmanch Spotlight Arena
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(234,179,8,0.15)",
                        color: "#fef08a",
                        border: "1px solid rgba(234,179,8,0.3)",
                      }}
                    >
                      TALENT HUNT
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    National monologue showdown with verified casting director jury critiques, public audience voting applause index, and winner masterclass passes.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    Week 42 Live Showdown
                  </span>
                  <button
                    onClick={() => setIsSpotlightOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    ENTER SPOTLIGHT →
                  </button>
                </div>
              </div>

              {/* CARD 6: FEATURE 51 */}
              <div
                style={{
                  backgroundColor: "#0d0d16",
                  border: "1px solid rgba(14, 165, 233, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#0ea5e9";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(14,165,233,0.2) 0%, rgba(14,165,233,0.05) 100%)",
                          border: "1px solid rgba(14,165,233,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#0ea5e9",
                          flexShrink: 0,
                        }}
                      >
                        <Mic size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Voiceover &amp; Dubbing Studio
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(14,165,233,0.15)",
                        color: "#7dd3fc",
                        border: "1px solid rgba(14,165,233,0.3)",
                      }}
                    >
                      VOICE VAULT
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    22 Scheduled regional languages directory, Baritone/Alto vocal timbre analysis, 48kHz audio waveform inspection, and per-word rate card generator.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    22 Regional Languages
                  </span>
                  <button
                    onClick={() => setIsVoiceoverOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    AUDITION DUBBING →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════════════
              MODULE 8: GUILD LEGAL, DIGITAL CONTRACTS & ESCROW TELEMETRY (Features 52-56)
              5 Dedicated Standalone Feature Cards (Completely Unmerged & Well-Structured)
          ════════════════════════════════════════════════════════════════════════ */}
          <section
            style={{
              marginBottom: "36px",
              padding: "24px",
              borderRadius: "22px",
              background: "linear-gradient(180deg, rgba(212, 175, 97, 0.05) 0%, rgba(13, 13, 22, 0.9) 100%)",
              border: "1px solid rgba(212, 175, 97, 0.22)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Module 8 Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                paddingBottom: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      letterSpacing: "0.2em",
                      color: "#d4af61",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    ★ MODULE 8 • GUILD LEGAL, DIGITAL CONTRACTS &amp; ESCROW TELEMETRY
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      backgroundColor: "rgba(212, 175, 97, 0.15)",
                      color: "#f4e2b8",
                      border: "1px solid rgba(212, 175, 97, 0.3)",
                      padding: "1px 8px",
                      borderRadius: "999px",
                      fontFamily: "monospace",
                    }}
                  >
                    CINTAA &amp; WICA COMPLIANCE
                  </span>
                </div>
                <h2
                  className="font-cinema"
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "0.02em",
                    margin: 0,
                  }}
                >
                  Actor Legal Protection &amp; On-Set Operations Hub
                </h2>
                <p style={{ fontSize: "12px", color: "#8a8a9a", margin: "4px 0 0 0" }}>
                  Standard CINTAA model contracts, digital call-sheets, daily per diem OCR payouts, minor permits, and secondary OTT streaming residuals.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#d4af61",
                  backgroundColor: "rgba(212, 175, 97, 0.08)",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "1px solid rgba(212, 175, 97, 0.2)",
                }}
              >
                ● 5 UNMERGED STANDALONE MODULES ACTIVE
              </div>
            </div>

            {/* 5 Dedicated Standalone Cards for Module 8 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {/* CARD 1: FEATURE 52 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(212, 175, 97, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#d4af61";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212, 175, 97, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(212,175,97,0.2) 0%, rgba(212,175,97,0.05) 100%)",
                          border: "1px solid rgba(212,175,97,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#d4af61",
                          flexShrink: 0,
                        }}
                      >
                        <FileSignature size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Digital Actor Contract &amp; Stamp
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(212,175,97,0.15)",
                        color: "#f4e2b8",
                        border: "1px solid rgba(212,175,97,0.3)",
                      }}
                    >
                      CINTAA STAMP
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Standard Cine &amp; TV Artists Association (CINTAA) performer agreements with Aadhaar OTP eSign, overtime clauses, rest turnaround, and 100% escrow lock.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    NeSL Legal Stamp
                  </span>
                  <button
                    onClick={() => setIsContractGeneratorOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    GENERATE CONTRACT →
                  </button>
                </div>
              </div>

              {/* CARD 2: FEATURE 53 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(52, 211, 153, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#34d399";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(52, 211, 153, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(52,211,153,0.2) 0%, rgba(52,211,153,0.05) 100%)",
                          border: "1px solid rgba(52,211,153,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#34d399",
                          flexShrink: 0,
                        }}
                      >
                        <Clock size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Daily Call-Sheet Telemetry
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(52,211,153,0.15)",
                        color: "#a7f3d0",
                        border: "1px solid rgba(52,211,153,0.3)",
                      }}
                    >
                      CALL-TIME PUSH
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Real-time digital daily call-sheets, actor pickup schedules, vanity van allocations, hospital emergency routes, and WhatsApp read-receipt telemetry.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    Day 14 of 42
                  </span>
                  <button
                    onClick={() => setIsCallSheetOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    VIEW CALL-SHEET →
                  </button>
                </div>
              </div>

              {/* CARD 3: FEATURE 54 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(245, 158, 11, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#f59e0b";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.05) 100%)",
                          border: "1px solid rgba(245,158,11,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#f59e0b",
                          flexShrink: 0,
                        }}
                      >
                        <Receipt size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Per Diem &amp; Conveyance OCR
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(245,158,11,0.15)",
                        color: "#fde68a",
                        border: "1px solid rgba(245,158,11,0.3)",
                      }}
                    >
                      INSTANT UPI
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Automated fuel, Uber/Ola cab, and daily food allowance OCR scanning with GST auto-validation and same-day UPI escrow disbursement.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    GST Tax Verified
                  </span>
                  <button
                    onClick={() => setIsExpenseOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    CLAIM REIMBURSEMENT →
                  </button>
                </div>
              </div>

              {/* CARD 4: FEATURE 55 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(56, 189, 248, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#38bdf8";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(56,189,248,0.05) 100%)",
                          border: "1px solid rgba(56,189,248,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#38bdf8",
                          flexShrink: 0,
                        }}
                      >
                        <ShieldCheck size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Minor Work Permit &amp; Tutor
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(56,189,248,0.15)",
                        color: "#bae6fd",
                        border: "1px solid rgba(56,189,248,0.3)",
                      }}
                    >
                      5-HR CAP
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Statutory Child Labour Act compliance: 5-hour shift caps, on-set private tutor hours, child psychologist sign-off, and 50% juvenile trust escrow.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    Guardian NOC Verified
                  </span>
                  <button
                    onClick={() => setIsMinorPermitOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    MANAGE PERMIT →
                  </button>
                </div>
              </div>

              {/* CARD 5: FEATURE 56 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(167, 139, 250, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#a78bfa";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(167, 139, 250, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(167,139,250,0.2) 0%, rgba(167,139,250,0.05) 100%)",
                          border: "1px solid rgba(167,139,250,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#a78bfa",
                          flexShrink: 0,
                        }}
                      >
                        <Coins size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Secondary Royalties &amp; Residuals
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(167,139,250,0.15)",
                        color: "#ddd6fe",
                        border: "1px solid rgba(167,139,250,0.3)",
                      }}
                    >
                      OTT RESIDUALS
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Transparent SVOD stream metrics, satellite broadcast syndication splits, TDS Form 16A deductions, and quarterly actor royalty disbursements.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    18.4M Stream Hours
                  </span>
                  <button
                    onClick={() => setIsResidualsOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    CALCULATE RESIDUALS →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════════════
              MODULE 9: AI PRODUCTION STUDIO, LOOK-TEST & PERFORMANCE INTELLIGENCE (Features 57-61)
              5 Dedicated Standalone Feature Cards (Completely Unmerged & Well-Structured)
          ════════════════════════════════════════════════════════════════════════ */}
          <section
            style={{
              marginBottom: "36px",
              padding: "24px",
              borderRadius: "22px",
              background: "linear-gradient(180deg, rgba(212, 175, 97, 0.05) 0%, rgba(13, 13, 22, 0.9) 100%)",
              border: "1px solid rgba(212, 175, 97, 0.22)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Module 9 Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                paddingBottom: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      letterSpacing: "0.2em",
                      color: "#d4af61",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    ★ MODULE 9 • AI PRODUCTION STUDIO, LOOK-TEST &amp; PERFORMANCE INTELLIGENCE
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      backgroundColor: "rgba(212, 175, 97, 0.15)",
                      color: "#f4e2b8",
                      border: "1px solid rgba(212, 175, 97, 0.3)",
                      padding: "1px 8px",
                      borderRadius: "999px",
                      fontFamily: "monospace",
                    }}
                  >
                    NEURAL PRE-VIZ &amp; SAFE-SET
                  </span>
                </div>
                <h2
                  className="font-cinema"
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "0.02em",
                    margin: 0,
                  }}
                >
                  AI Wardrobe Pre-Viz &amp; Performance Safety Studio
                </h2>
                <p style={{ fontSize: "12px", color: "#8a8a9a", margin: "4px 0 0 0" }}>
                  Virtual era look-tests, closed-set intimacy coordinator governance, real-time regional dialect coaching, stunt hazard clearing, and box office bankability intelligence.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#d4af61",
                  backgroundColor: "rgba(212, 175, 97, 0.08)",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "1px solid rgba(212, 175, 97, 0.2)",
                }}
              >
                ● 5 UNMERGED STANDALONE MODULES ACTIVE
              </div>
            </div>

            {/* 5 Dedicated Standalone Cards for Module 9 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {/* CARD 1: FEATURE 57 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(244, 63, 94, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#f43f5e";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(244, 63, 94, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(244,63,94,0.2) 0%, rgba(244,63,94,0.05) 100%)",
                          border: "1px solid rgba(244,63,94,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#f43f5e",
                          flexShrink: 0,
                        }}
                      >
                        <Sparkles size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          AI Virtual Look-Test &amp; Wardrobe
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(244,63,94,0.15)",
                        color: "#fecdd3",
                        border: "1px solid rgba(244,63,94,0.3)",
                      }}
                    >
                      ERA PRE-VIZ
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Generative costume simulation mapping actor facial meshes to 1970s retro, Mughal period royalty, tactical police armor, and cinematographer lighting rigs.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    4K Cloth Simulation
                  </span>
                  <button
                    onClick={() => setIsVirtualLookTestOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    SIMULATE LOOK →
                  </button>
                </div>
              </div>

              {/* CARD 2: FEATURE 58 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(251, 113, 133, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#fb7185";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(251, 113, 133, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(251,113,133,0.2) 0%, rgba(251,113,133,0.05) 100%)",
                          border: "1px solid rgba(251,113,133,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fb7185",
                          flexShrink: 0,
                        }}
                      >
                        <Lock size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Intimacy Coordinator Protocols
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(251,113,133,0.15)",
                        color: "#fecdd3",
                        border: "1px solid rgba(251,113,133,0.3)",
                      }}
                    >
                      SAFE-SET PASS
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Closed-set governance charter, dual actor touch-point boundary agreements, modesty barriers, certified safe-word pause triggers, and whitelisted crew logs.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    CINTAA Safe-Space
                  </span>
                  <button
                    onClick={() => setIsIntimacyProtocolOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    VIEW PROTOCOLS →
                  </button>
                </div>
              </div>

              {/* CARD 3: FEATURE 59 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(45, 212, 191, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#2dd4bf";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(45, 212, 191, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(45,212,191,0.2) 0%, rgba(45,212,191,0.05) 100%)",
                          border: "1px solid rgba(45,212,191,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#2dd4bf",
                          flexShrink: 0,
                        }}
                      >
                        <Mic size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          AI Dialogue Dialect Coach
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(45,212,191,0.15)",
                        color: "#99f6e4",
                        border: "1px solid rgba(45,212,191,0.3)",
                      }}
                    >
                      PHONETICS AI
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Real-time regional phonetics, vocal pitch matching, and accent authenticity scoring for Bhojpuri, Haryanvi, Hyderabadi Urdu, and Kathiawadi dialects.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    94% Native Cadence
                  </span>
                  <button
                    onClick={() => setIsDialectCoachOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    COACH DIALECT →
                  </button>
                </div>
              </div>

              {/* CARD 4: FEATURE 60 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(251, 146, 60, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#fb923c";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(251, 146, 60, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(251,146,60,0.2) 0%, rgba(251,146,60,0.05) 100%)",
                          border: "1px solid rgba(251,146,60,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fb923c",
                          flexShrink: 0,
                        }}
                      >
                        <Flame size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Stunt &amp; Action Hazard Risk
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(251,146,60,0.15)",
                        color: "#fed7aa",
                        border: "1px solid rgba(251,146,60,0.3)",
                      }}
                    >
                      TIER 2 WIREWORK
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Action director hazard matrices, wirework load-testing certification, stunt double guild verification, and on-set advanced trauma paramedic standby.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    ₹1 Cr Guild Insurance
                  </span>
                  <button
                    onClick={() => setIsStuntSafetyOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    CLEAR STUNT →
                  </button>
                </div>
              </div>

              {/* CARD 5: FEATURE 61 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(232, 121, 249, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#e879f9";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(232, 121, 249, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(232,121,249,0.2) 0%, rgba(232,121,249,0.05) 100%)",
                          border: "1px solid rgba(232,121,249,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#e879f9",
                          flexShrink: 0,
                        }}
                      >
                        <TrendingUp size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Box Office &amp; Star-Power Intel
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(232,121,249,0.15)",
                        color: "#f5d0fe",
                        border: "1px solid rgba(232,121,249,0.3)",
                      }}
                    >
                      BANKABILITY 88.4
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Pan-India opening day pre-sales projections, Tier 1 vs Tier 2/3 demographic retention heatmaps, and genre synergy pitch decks for film investors.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    ₹16 Cr Day 1 Model
                  </span>
                  <button
                    onClick={() => setIsStarPowerOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    ANALYZE BANKABILITY →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════════════
              MODULE 10: SCRIPT & WRITING ROOM COLLABORATION SUITE (Features 62-66)
              5 Dedicated Standalone Feature Cards (Completely Unmerged & Well-Structured)
          ════════════════════════════════════════════════════════════════════════ */}
          <section
            style={{
              marginBottom: "36px",
              padding: "24px",
              borderRadius: "22px",
              background: "linear-gradient(180deg, rgba(212, 175, 97, 0.05) 0%, rgba(13, 13, 22, 0.9) 100%)",
              border: "1px solid rgba(212, 175, 97, 0.22)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Module 10 Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                paddingBottom: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      letterSpacing: "0.2em",
                      color: "#d4af61",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    ★ MODULE 10 • SCRIPT &amp; WRITING ROOM COLLABORATION SUITE
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      backgroundColor: "rgba(212, 175, 97, 0.15)",
                      color: "#f4e2b8",
                      border: "1px solid rgba(212, 175, 97, 0.3)",
                      padding: "1px 8px",
                      borderRadius: "999px",
                      fontFamily: "monospace",
                    }}
                  >
                    SCREENPLAY INTELLIGENCE
                  </span>
                </div>
                <h2
                  className="font-cinema"
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "0.02em",
                    margin: 0,
                  }}
                >
                  Writers Room &amp; Script Revision Operations
                </h2>
                <p style={{ fontSize: "12px", color: "#8a8a9a", margin: "4px 0 0 0" }}>
                  Colored revision page management, AI multi-voice table reads, character tension maps, 8ths-of-a-page breakdown stripboards, and IPRS music cue sheets.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#d4af61",
                  backgroundColor: "rgba(212, 175, 97, 0.08)",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "1px solid rgba(212, 175, 97, 0.2)",
                }}
              >
                ● 5 UNMERGED STANDALONE MODULES ACTIVE
              </div>
            </div>

            {/* 5 Dedicated Standalone Cards for Module 10 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {/* CARD 1: FEATURE 62 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(212, 175, 97, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#d4af61";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212, 175, 97, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(212,175,97,0.2) 0%, rgba(212,175,97,0.05) 100%)",
                          border: "1px solid rgba(212,175,97,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#d4af61",
                          flexShrink: 0,
                        }}
                      >
                        <FileCode2 size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Script Revision &amp; Diff Ledger
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(212,175,97,0.15)",
                        color: "#f4e2b8",
                        border: "1px solid rgba(212,175,97,0.3)",
                      }}
                    >
                      COLORED PAGES
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Hollywood standard colored revision tracking (White, Blue, Pink, Yellow), real-time dialogue diff engine, and cast sides teleprompter push.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    Pink Draft (Locked)
                  </span>
                  <button
                    onClick={() => setIsScriptVersioningOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    VIEW REVISIONS →
                  </button>
                </div>
              </div>

              {/* CARD 2: FEATURE 63 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(6, 182, 212, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#06b6d4";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0.05) 100%)",
                          border: "1px solid rgba(6,182,212,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#06b6d4",
                          flexShrink: 0,
                        }}
                      >
                        <Headphones size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          AI Dialogue Table-Read Bay
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(6,182,212,0.15)",
                        color: "#a5f3fc",
                        border: "1px solid rgba(6,182,212,0.3)",
                      }}
                    >
                      NEURAL AUDIO
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Automated script cast synthesis assigning distinct neural voice timbres to every character, with live waveform playback and pacing sliders.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    4 Voices Ingested
                  </span>
                  <button
                    onClick={() => setIsTableReadOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    LISTEN TABLE-READ →
                  </button>
                </div>
              </div>

              {/* CARD 3: FEATURE 64 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(139, 92, 246, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#8b5cf6";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(139,92,246,0.05) 100%)",
                          border: "1px solid rgba(139,92,246,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#8b5cf6",
                          flexShrink: 0,
                        }}
                      >
                        <GitMerge size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Character Relationship Arc Web
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(139,92,246,0.15)",
                        color: "#c4b5fd",
                        border: "1px solid rgba(139,92,246,0.3)",
                      }}
                    >
                      TENSION WEB
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Interactive character graph mapping emotional tension, loyalty shifts, betrayal indices, and screen-time matrix across the 3-act screenplay.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    3-Act Arc Traced
                  </span>
                  <button
                    onClick={() => setIsCharacterArcOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    MAP CHARACTER ARC →
                  </button>
                </div>
              </div>

              {/* CARD 4: FEATURE 65 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(16, 185, 129, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#10b981";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 100%)",
                          border: "1px solid rgba(16,185,129,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#10b981",
                          flexShrink: 0,
                        }}
                      >
                        <Split size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Script Breakdown &amp; Stripboard
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(16,185,129,0.15)",
                        color: "#a7f3d0",
                        border: "1px solid rgba(16,185,129,0.3)",
                      }}
                    >
                      8THS OF A PAGE
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Automated Movie Magic scene element parsing: speaking cast, background extras, props, wardrobe, and departmental cost estimates.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    3 6/8 Pages Parsed
                  </span>
                  <button
                    onClick={() => setIsScriptBreakdownOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    OPEN STRIPBOARD →
                  </button>
                </div>
              </div>

              {/* CARD 5: FEATURE 66 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(236, 72, 153, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ec4899";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(236, 72, 153, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(236,72,153,0.05) 100%)",
                          border: "1px solid rgba(236,72,153,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ec4899",
                          flexShrink: 0,
                        }}
                      >
                        <Music2 size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Music &amp; Score Cue Sheets
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(236,72,153,0.15)",
                        color: "#fbcfe8",
                        border: "1px solid rgba(236,72,153,0.3)",
                      }}
                    >
                      IPRS CLEARANCE
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Frame-accurate timecode cue sheets for background scores, song sync licenses, lyricist royalty splits, and CBFC censor music manifests.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    38 Cues Logged
                  </span>
                  <button
                    onClick={() => setIsMusicCueOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    SYNC CUE SHEET →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════════════
              MODULE 11: POST-PRODUCTION, VFX & SCREENING ROOM SUITE (Features 67-71)
              5 Dedicated Standalone Feature Cards (Completely Unmerged & Well-Structured)
          ════════════════════════════════════════════════════════════════════════ */}
          <section
            style={{
              marginBottom: "36px",
              padding: "24px",
              borderRadius: "22px",
              background: "linear-gradient(180deg, rgba(212, 175, 97, 0.05) 0%, rgba(13, 13, 22, 0.9) 100%)",
              border: "1px solid rgba(212, 175, 97, 0.22)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Module 11 Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                paddingBottom: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      letterSpacing: "0.2em",
                      color: "#d4af61",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    ★ MODULE 11 • POST-PRODUCTION, VFX &amp; SCREENING ROOM SUITE
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      backgroundColor: "rgba(212, 175, 97, 0.15)",
                      color: "#f4e2b8",
                      border: "1px solid rgba(212, 175, 97, 0.3)",
                      padding: "1px 8px",
                      borderRadius: "999px",
                      fontFamily: "monospace",
                    }}
                  >
                    DCI &amp; FORENSIC SCREENING
                  </span>
                </div>
                <h2
                  className="font-cinema"
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "0.02em",
                    margin: 0,
                  }}
                >
                  Post-Production, Color Science &amp; Executive Screening
                </h2>
                <p style={{ fontSize: "12px", color: "#8a8a9a", margin: "4px 0 0 0" }}>
                  VFX on-set camera telemetry, 3D ACES LUT pipelines, ADR lip-sync dubbing bays, statutory CBFC censor cut tracking, and forensic DRM screening rooms.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#d4af61",
                  backgroundColor: "rgba(212, 175, 97, 0.08)",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "1px solid rgba(212, 175, 97, 0.2)",
                }}
              >
                ● 5 UNMERGED STANDALONE MODULES ACTIVE
              </div>
            </div>

            {/* 5 Dedicated Standalone Cards for Module 11 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {/* CARD 1: FEATURE 67 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(132, 204, 22, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#84cc16";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(132, 204, 22, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(132,204,22,0.2) 0%, rgba(132,204,22,0.05) 100%)",
                          border: "1px solid rgba(132,204,22,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#84cc16",
                          flexShrink: 0,
                        }}
                      >
                        <Crosshair size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          VFX Marker &amp; Matchmove
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(132,204,22,0.15)",
                        color: "#d9f99d",
                        border: "1px solid rgba(132,204,22,0.3)",
                      }}
                    >
                      3D TRACKING
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    On-set camera matchmove telemetry, lens distortion maps, 360° HDRI chrome ball probes, and facial marker tracking datasets.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    Cooke /i Anamorphic
                  </span>
                  <button
                    onClick={() => setIsVfxTrackingOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    LOG VFX DATA →
                  </button>
                </div>
              </div>

              {/* CARD 2: FEATURE 68 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(249, 115, 22, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#f97316";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0.05) 100%)",
                          border: "1px solid rgba(249,115,22,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#f97316",
                          flexShrink: 0,
                        }}
                      >
                        <Palette size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Color Grade LUT &amp; ACEScc
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(249,115,22,0.15)",
                        color: "#fed7aa",
                        border: "1px solid rgba(249,115,22,0.3)",
                      }}
                    >
                      DCI-P3 GAMUT
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Academy Color Encoding (ACES) pipeline, 65-point 3D film print emulation LUTs (Kodak 2383, Fuji Eterna), and Color Decision List (CDL) exports.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    ACEScc Log Transform
                  </span>
                  <button
                    onClick={() => setIsColorGradeLutOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    CALIBRATE LUT →
                  </button>
                </div>
              </div>

              {/* CARD 3: FEATURE 69 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(59, 130, 246, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#3b82f6";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0.05) 100%)",
                          border: "1px solid rgba(59,130,246,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#3b82f6",
                          flexShrink: 0,
                        }}
                      >
                        <Mic2 size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Foley &amp; ADR Dubbing Bay
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(59,130,246,0.15)",
                        color: "#bfdbfe",
                        border: "1px solid rgba(59,130,246,0.3)",
                      }}
                    >
                      LIP-SYNC ADR
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Automated Dialogue Replacement studio with 3-pip audio countdown guide, elastic audio waveform match, and Pro Tools AAF session bundling.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    98.6% Sync Score
                  </span>
                  <button
                    onClick={() => setIsAdrStudioOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    RECORD ADR TAKE →
                  </button>
                </div>
              </div>

              {/* CARD 4: FEATURE 70 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(239, 68, 68, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ef4444";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(239,68,68,0.05) 100%)",
                          border: "1px solid rgba(239,68,68,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ef4444",
                          flexShrink: 0,
                        }}
                      >
                        <Stamp size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          CBFC Censor Certification Hub
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(239,68,68,0.15)",
                        color: "#fca5a5",
                        border: "1px solid rgba(239,68,68,0.3)",
                      }}
                    >
                      UA 16+ RATED
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Central Board of Film Certification (CBFC) compliance: anti-smoking slate generators, audio mute tracking, and statutory Form VIII dossiers.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    Form VIII Certified
                  </span>
                  <button
                    onClick={() => setIsCensorComplianceOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    AUDIT CENSOR CUTS →
                  </button>
                </div>
              </div>

              {/* CARD 5: FEATURE 71 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(99, 102, 241, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.05) 100%)",
                          border: "1px solid rgba(99,102,241,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#6366f1",
                          flexShrink: 0,
                        }}
                      >
                        <Tv2 size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Executive Screening Room &amp; DRM
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(99,102,241,0.15)",
                        color: "#c7d2fe",
                        border: "1px solid rgba(99,102,241,0.3)",
                      }}
                    >
                      FORENSIC DRM
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Secure studio executive preview screener with dynamic viewer name/IP forensic watermarking, anti-screen capture DRM, and viewing audit logs.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    HDCP 2.2 Shielded
                  </span>
                  <button
                    onClick={() => setIsScreeningRoomOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    ENTER SCREENING →
                  </button>
                </div>
              </div>
            </div>
          </section>

                    {/* ══════════════════════════════════════════════════════════════════
              MODULE 12: VIRTUAL PRODUCTION, ICVFX & ON-SET DIT ENGINEERING (Features 72-73)
              2 Dedicated Standalone Feature Cards (Completely Unmerged & Well-Structured)
          ══════════════════════════════════════════════════════════════════ */}
          <section
            style={{
              marginBottom: "36px",
              padding: "24px",
              borderRadius: "22px",
              background: "linear-gradient(180deg, rgba(6, 182, 212, 0.05) 0%, rgba(13, 13, 22, 0.9) 100%)",
              border: "1px solid rgba(6, 182, 212, 0.22)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Module 12 Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "20px",
                paddingBottom: "16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontFamily: "monospace",
                      letterSpacing: "0.15em",
                      color: "#06b6d4",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    ★ MODULE 12 • VIRTUAL PRODUCTION & DIT SUITE
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      backgroundColor: "rgba(6, 182, 212, 0.15)",
                      color: "#a5f3fc",
                      border: "1px solid rgba(6, 182, 212, 0.3)",
                      padding: "1px 8px",
                      borderRadius: "999px",
                      fontFamily: "monospace",
                    }}
                  >
                    ICVFX & ON-SET ENGINEERING
                  </span>
                </div>
                <h2
                  className="font-cinema"
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  Virtual Production, In-Camera VFX & On-Set DIT Engineering
                </h2>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#8e8e9e",
                    margin: "4px 0 0 0",
                  }}
                >
                  High-density LED volumes with Unreal Engine nDisplay cluster genlock sync, optical camera frustum tracking, Pomfort Livegrade CDL calibration, and Silverstack checksum offload.
                </p>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#06b6d4",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(6, 182, 212, 0.08)",
                  border: "1px solid rgba(6, 182, 212, 0.25)",
                }}
              >
                ★ 2 UNMERGED STANDALONE MODULES ACTIVE
              </div>
            </div>

            {/* 2 Dedicated Standalone Cards for Module 12 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {/* CARD 1: FEATURE 72 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(6, 182, 212, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#06b6d4";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0.05) 100%)",
                          border: "1px solid rgba(6,182,212,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#06b6d4",
                          flexShrink: 0,
                        }}
                      >
                        <Layers size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          LED Wall ICVFX & Unreal Stage Sync
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(6,182,212,0.15)",
                        color: "#a5f3fc",
                        border: "1px solid rgba(6,182,212,0.3)",
                      }}
                    >
                      NDISPLAY GENLOCK
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    High-density LED volume in-camera visual effects with Unreal Engine 5 nDisplay cluster orchestration, optical camera tracking, and real-time frustum parallax sync.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    PTP 24.00fps Locked
                  </span>
                  <button
                    onClick={() => setIsIcvfxStageOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    CALIBRATE STAGE ➔
                  </button>
                </div>
              </div>

              {/* CARD 2: FEATURE 73 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(245, 158, 11, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#f59e0b";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.05) 100%)",
                          border: "1px solid rgba(245,158,11,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#f59e0b",
                          flexShrink: 0,
                        }}
                      >
                        <SlidersHorizontal size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          DIT Live Color Grading &amp; Video Assist Hub
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(245,158,11,0.15)",
                        color: "#fde68a",
                        border: "1px solid rgba(245,158,11,0.3)",
                      }}
                    >
                      LIVEGRADE &amp; QTAKE
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    On-set DIT cart station with multi-cam wireless video ingest, Pomfort Livegrade ASC CDL calibration, QTAKE instant video assist, and Silverstack checksum offload verification.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    xxHash64 Verified
                  </span>
                  <button
                    onClick={() => setIsDitLiveGradeOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    LAUNCH DIT CART ➔
                  </button>
                </div>
              </div>
            </div>
          </section>

          
          {/* ══════════════════════════════════════════════════════════════
              MODULE 13: THEATRICAL DISTRIBUTION, BOX OFFICE & OTT SYNDICATION SUITE (Features 74-78)
              5 Dedicated Standalone Feature Cards (Completely Unmerged & Well-Structured)
          ══════════════════════════════════════════════════════════════ */}
          <section
            style={{
              marginBottom: "36px",
              borderRadius: "24px",
              backgroundColor: "rgba(10, 10, 16, 0.75)",
              border: "1px solid rgba(212, 175, 97, 0.25)",
              padding: "28px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Module 13 Header */}
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#d4af61",
                      fontFamily: "monospace",
                    }}
                  >
                    ★ MODULE 13 • DISTRIBUTION, BOX OFFICE &amp; OTT SUITE
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(16, 185, 129, 0.15)",
                      color: "#6ee7b7",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      fontWeight: 600,
                    }}
                  >
                    FEATURES 74-78 ACTIVE
                  </span>
                </div>
              </div>
              <h2
                className="font-cinema"
                style={{
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: "8px 0 4px 0",
                  letterSpacing: "0.02em",
                }}
              >
                Theatrical Distribution, Box Office &amp; Global Syndication
              </h2>
              <p style={{ fontSize: "13px", color: "#8a8a9a", margin: 0, maxWidth: "780px" }}>
                Enterprise cinema packaging suite covering DCI DCP master creation with KDM encryption, multi-territory OTT licensing waterfalls, real-time multiplex occupancy analytics, publicity vaults, and international festival submissions.
              </p>
            </div>

            {/* 5 Dedicated Standalone Cards for Module 13 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {/* CARD 1: FEATURE 74 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(16, 185, 129, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#10b981";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 100%)",
                          border: "1px solid rgba(16,185,129,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#10b981",
                          flexShrink: 0,
                        }}
                      >
                        <Film size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          DCI Cinema Package &amp; KDM Encryption
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(16,185,129,0.15)",
                        color: "#6ee7b7",
                        border: "1px solid rgba(16,185,129,0.3)",
                      }}
                    >
                      SMPTE DCI 429
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    SMPTE 429 compliant DCI packaging with JPEG 2000 picture tracks, 24-bit 96kHz 5.1/7.1 LPCM and Dolby Atmos routing, and RSA-2048 theatrical KDM projection keys.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    PVR INOX / IMAX Ready
                  </span>
                  <button
                    onClick={() => setIsDcpPackagingOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    BUILD DCI PACKAGE ➔
                  </button>
                </div>
              </div>

              {/* CARD 2: FEATURE 75 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(168, 85, 247, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#a855f7";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0.05) 100%)",
                          border: "1px solid rgba(168,85,247,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#a855f7",
                          flexShrink: 0,
                        }}
                      >
                        <Tv size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Multi-Territory OTT Licensing &amp; Escrow
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(168,85,247,0.15)",
                        color: "#e9d5ff",
                        border: "1px solid rgba(168,85,247,0.3)",
                      }}
                    >
                      MINIMUM GUARANTEE
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Territory rights management across Netflix, Prime Video, Hotstar, and Zee5 with non-refundable Minimum Guarantee (MG) modeling and smart banking escrow waterfall disbursement.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    8-Week Theatrical Holdback
                  </span>
                  <button
                    onClick={() => setIsOttLicensingOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    MODEL OTT ESCROW ➔
                  </button>
                </div>
              </div>

              {/* CARD 3: FEATURE 76 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(234, 179, 8, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#eab308";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(234, 179, 8, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(234,179,8,0.2) 0%, rgba(234,179,8,0.05) 100%)",
                          border: "1px solid rgba(234,179,8,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#eab308",
                          flexShrink: 0,
                        }}
                      >
                        <TrendingUp size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Box Office Predictive &amp; Occupancy
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(234,179,8,0.15)",
                        color: "#fef08a",
                        border: "1px solid rgba(234,179,8,0.3)",
                      }}
                    >
                      TRADE VERIFIED
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Real-time theatrical occupancy analytics and advance ticket booking velocity tracking across Mumbai, Delhi-UP, and Nizam circuits with neural net box office projections.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    Live EDI Ingest Active
                  </span>
                  <button
                    onClick={() => setIsBoxOfficeTrackerOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    TRACK BOX OFFICE ➔
                  </button>
                </div>
              </div>

              {/* CARD 4: FEATURE 77 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(244, 63, 94, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#f43f5e";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(244, 63, 94, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(244,63,94,0.2) 0%, rgba(244,63,94,0.05) 100%)",
                          border: "1px solid rgba(244,63,94,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#f43f5e",
                          flexShrink: 0,
                        }}
                      >
                        <Megaphone size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Theatrical Marketing &amp; Influencer Vault
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(244,63,94,0.15)",
                        color: "#fecdd3",
                        border: "1px solid rgba(244,63,94,0.3)",
                      }}
                    >
                      DRM WATERMARKED
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    Multi-format outdoor print key art, 16:9 trailer &amp; 9:16 vertical reel reframing, and anti-piracy forensic watermarked screener token generation for entertainment critics.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    48h Press Embargo
                  </span>
                  <button
                    onClick={() => setIsTheatricalCampaignOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    DEPLOY CAMPAIGN ➔
                  </button>
                </div>
              </div>

              {/* CARD 5: FEATURE 78 */}
              <div
                style={{
                  borderRadius: "18px",
                  backgroundColor: "rgba(18, 18, 28, 0.85)",
                  border: "1px solid rgba(99, 102, 241, 0.28)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.05) 100%)",
                          border: "1px solid rgba(99,102,241,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#6366f1",
                          flexShrink: 0,
                        }}
                      >
                        <Trophy size={22} />
                      </div>
                      <div>
                        <h3
                          className="font-cinema"
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "2px 0 0 0",
                          }}
                        >
                          Film Festival &amp; Awards Manager
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(99,102,241,0.15)",
                        color: "#c7d2fe",
                        border: "1px solid rgba(99,102,241,0.3)",
                      }}
                    >
                      FIAPF A-LIST JURY
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9a9aa8",
                      lineHeight: 1.6,
                      margin: "0 0 18px 0",
                    }}
                  >
                    A-List festival submissions manager (Cannes, Venice, Toronto, Busan, IFFI Goa) with SMPTE 428-7 multilingual timed-text subtitle mastering and secure jury screener tokens.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
                    World Premiere Eligible
                  </span>
                  <button
                    onClick={() => setIsFilmFestivalManagerOpen(true)}
                    className="btn-cinema-gold"
                    style={{
                      height: "36px",
                      padding: "0 18px",
                      fontSize: "11px",
                      borderRadius: "999px",
                    }}
                  >
                    ENTER FESTIVAL ➔
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Search Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "0 16px",
              height: "52px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.14)",
              backgroundColor: "#08080e",
              marginBottom: "28px",
              transition: "border-color 0.2s",
            }}
          >
            <Search size={16} color="#606070" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search roles, production studios, dialects, genres..."
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "#ffffff",
                fontSize: "14px",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#606070",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Filter Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {/* Type chips */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "100px",
                    border:
                      type === t.id
                        ? "1px solid #d4af61"
                        : "1px solid rgba(255,255,255,0.1)",
                    backgroundColor:
                      type === t.id
                        ? "rgba(212,175,97,0.12)"
                        : "transparent",
                    color: type === t.id ? "#d4af61" : "#8a8a9a",
                    fontSize: "11px",
                    fontFamily: "monospace",
                    fontWeight: type === t.id ? 700 : 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <t.icon size={12} />
                  {t.label}
                </button>
              ))}
            </div>

            {/* Right controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  background: "#08080e",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  color: "#c0c0d0",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {["All Languages", "Hindi", "Telugu", "Tamil", "Marathi", "Bengali", "English"].map((l) => (
                  <option key={l} value={l} style={{ background: "#0a0a10" }}>
                    {l}
                  </option>
                ))}
              </select>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: onlyEscrow ? "#34d399" : "#8a8a9a",
                  cursor: "pointer",
                  userSelect: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                <input
                  type="checkbox"
                  checked={onlyEscrow}
                  onChange={(e) => setOnlyEscrow(e.target.checked)}
                  style={{ accentColor: "#34d399", cursor: "pointer" }}
                />
                <Shield size={12} />
                Escrow Only
              </label>
            </div>
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "40px 32px",
          }}
        >
          {/* Result count row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "32px",
              paddingBottom: "16px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              fontSize: "11px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#606070",
            }}
          >
            <span>
              Showing{" "}
              <span style={{ color: "#d4af61", fontWeight: 700 }}>
                {filtered.length}
              </span>{" "}
              verified production sides
            </span>
            <span>Direct self-tape submissions enabled</span>
          </div>

          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(212,175,97,0.1)",
                  border: "1px solid rgba(212,175,97,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#d4af61",
                }}
              >
                <Search size={24} />
              </div>
              <p className="font-cinema" style={{ fontSize: "22px", color: "#c0c0d0" }}>
                No castings match your filters
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setType("all");
                  setOnlyEscrow(false);
                  setLanguage("All Languages");
                }}
                className="btn-cinema-gold"
                style={{ height: "40px", padding: "0 24px", fontSize: "11px" }}
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                gap: "24px",
              }}
            >
              {filtered.map((call) => (
                <CastingCard key={call.id} call={call} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Feature #28: Shortlist PDF Pitchbook Modal */}
      <PitchbookModal
        isOpen={isPitchbookOpen}
        onClose={() => setIsPitchbookOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #29: Audition Callback Dispatcher Modal */}
      <CallbackDispatcherModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #30: Studio Archival Talent Database Modal */}
      <ArchivalTalentModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
      />

      {/* Feature #31: Multi-Role Role Breakdown Modal */}
      <RoleBreakdownModal
        isOpen={isRoleBreakdownOpen}
        onClose={() => setIsRoleBreakdownOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #32: Confidential Project Codenames Modal */}
      <ProjectCodenameModal
        isOpen={isCodenameOpen}
        onClose={() => setIsCodenameOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #33: Script Sides Encryption Modal */}
      <ScriptSidesEncryptionModal
        isOpen={isScriptEncryptionOpen}
        onClose={() => setIsScriptEncryptionOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #34: Shooting Schedule Logistics Modal */}
      <ShootingScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #35: Remuneration & Escrow Scale Modal */}
      <RemunerationEscrowModal
        isOpen={isEscrowCalcOpen}
        onClose={() => setIsEscrowCalcOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #36: 5-Stage Kanban Applicant Pipeline Modal */}
      <KanbanPipelineModal
        isOpen={isKanbanOpen}
        onClose={() => setIsKanbanOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #37: Casting Director Rating & Notes Modal */}
      <DirectorRatingModal
        isOpen={isDirectorRatingOpen}
        onClose={() => setIsDirectorRatingOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #38: Batch Shortlist & Constructive Feedback Modal */}
      <BatchFeedbackModal
        isOpen={isBatchFeedbackOpen}
        onClose={() => setIsBatchFeedbackOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #39: AI Ensemble Synergy & Chemistry Matcher Modal */}
      <EnsembleChemistryModal
        isOpen={isEnsembleOpen}
        onClose={() => setIsEnsembleOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #40: Casting Diversity & Regional Ratio Analytics Modal */}
      <DiversityAnalyticsModal
        isOpen={isDiversityOpen}
        onClose={() => setIsDiversityOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #41: Virtual Live Callback WebRTC Audition Room Modal */}
      <VirtualCallbackRoomModal
        isOpen={isCallbackRoomOpen}
        onClose={() => setIsCallbackRoomOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #42: Automated Waiting Lobby & Live Queue Timer Modal */}
      <WaitingLobbyModal
        isOpen={isWaitingLobbyOpen}
        onClose={() => setIsWaitingLobbyOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #43: In-Audition Live Teleprompter Modal */}
      <LiveTeleprompterModal
        isOpen={isTeleprompterOpen}
        onClose={() => setIsTeleprompterOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #44: Commercial Venue Geofencing Shield Modal */}
      <VenueGeofencingModal
        isOpen={isVenueGeofenceOpen}
        onClose={() => setIsVenueGeofenceOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #45: CINTAA 24/7 Emergency SOS & Escrow Freeze Modal */}
      <EmergencySOSModal
        isOpen={isEmergencySosOpen}
        onClose={() => setIsEmergencySosOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #46: Talent Profile Readiness Gauge Modal */}
      <ProfileReadinessModal
        isOpen={isReadinessOpen}
        onClose={() => setIsReadinessOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #47: AI Role Recommendation Feed Modal */}
      <RoleRecommendationModal
        isOpen={isRecommendationOpen}
        onClose={() => setIsRecommendationOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #48: Actor Live Availability Calendar Modal */}
      <AvailabilityCalendarModal
        isOpen={isAvailabilityOpen}
        onClose={() => setIsAvailabilityOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #49: Omnichannel WhatsApp Audition Bot Modal */}
      <WhatsAppAuditionBotModal
        isOpen={isWhatsAppBotOpen}
        onClose={() => setIsWhatsAppBotOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #50: Rangmanch Spotlight Arena Modal */}
      <SpotlightArenaModal
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #51: Voiceover & Dubbing Studio Modal */}
      <VoiceoverDubbingModal
        isOpen={isVoiceoverOpen}
        onClose={() => setIsVoiceoverOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #52: Standard Digital Actor Contract & CINTAA Stamp Modal */}
      <ContractGeneratorModal
        isOpen={isContractGeneratorOpen}
        onClose={() => setIsContractGeneratorOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #53: Daily Call-Sheet & Call-Time Telemetry Modal */}
      <CallSheetModal
        isOpen={isCallSheetOpen}
        onClose={() => setIsCallSheetOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #54: Per Diem & Conveyance Expense Reimbursement Modal */}
      <ExpenseReimbursementModal
        isOpen={isExpenseOpen}
        onClose={() => setIsExpenseOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #55: Minor Performer Legal Guardian & Education Compliance Modal */}
      <MinorWorkPermitModal
        isOpen={isMinorPermitOpen}
        onClose={() => setIsMinorPermitOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #56: Secondary Royalties & OTT Residuals Calculator Modal */}
      <ResidualsCalculatorModal
        isOpen={isResidualsOpen}
        onClose={() => setIsResidualsOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #57: AI Virtual Look-Test & Period Costume Simulator Modal */}
      <VirtualLookTestModal
        isOpen={isVirtualLookTestOpen}
        onClose={() => setIsVirtualLookTestOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #58: Intimacy Coordinator & Sensitive Scene Protocols Modal */}
      <IntimacyProtocolModal
        isOpen={isIntimacyProtocolOpen}
        onClose={() => setIsIntimacyProtocolOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #59: AI Dialogue Dialect & Accent Coaching Studio Modal */}
      <DialectCoachModal
        isOpen={isDialectCoachOpen}
        onClose={() => setIsDialectCoachOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #60: Stunt & Action Scene Hazard Risk Assessment Modal */}
      <StuntSafetyModal
        isOpen={isStuntSafetyOpen}
        onClose={() => setIsStuntSafetyOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #61: Box Office & OTT Star-Power Intelligence Modal */}
      <StarPowerAnalyticsModal
        isOpen={isStarPowerOpen}
        onClose={() => setIsStarPowerOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #62: Dynamic Script Versioning & Revision Ledger Modal */}
      <ScriptVersioningModal
        isOpen={isScriptVersioningOpen}
        onClose={() => setIsScriptVersioningOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #63: AI Dialogue Table-Read & Multi-Voice Synthesizer Modal */}
      <DialogueTableReadModal
        isOpen={isTableReadOpen}
        onClose={() => setIsTableReadOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #64: Character Relationship Web & Emotional Arc Visualizer Modal */}
      <CharacterArcModal
        isOpen={isCharacterArcOpen}
        onClose={() => setIsCharacterArcOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #65: Production Script Breakdown & Stripboard Modal */}
      <ScriptBreakdownModal
        isOpen={isScriptBreakdownOpen}
        onClose={() => setIsScriptBreakdownOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #66: Music & Score Cue Sheet Synchronization Modal */}
      <MusicCueSheetModal
        isOpen={isMusicCueOpen}
        onClose={() => setIsMusicCueOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #67: VFX Marker Tracking & Green-Screen Pipeline Modal */}
      <VfxTrackingModal
        isOpen={isVfxTrackingOpen}
        onClose={() => setIsVfxTrackingOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #68: Color Grading LUT & ACEScc Pipeline Modal */}
      <ColorGradeLutModal
        isOpen={isColorGradeLutOpen}
        onClose={() => setIsColorGradeLutOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #69: Foley & ADR Dialogue Replacement Studio Modal */}
      <AdrStudioModal
        isOpen={isAdrStudioOpen}
        onClose={() => setIsAdrStudioOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #70: CBFC Censor Certification & Cut Tracker Modal */}
      <CensorComplianceModal
        isOpen={isCensorComplianceOpen}
        onClose={() => setIsCensorComplianceOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #71: Secure Executive Screening Room & DRM Modal */}
      <ScreeningRoomModal
        isOpen={isScreeningRoomOpen}
        onClose={() => setIsScreeningRoomOpen(false)}
        defaultProject={selectedPitchProject}
      />
      {/* Feature #72: LED Wall ICVFX & Unreal Stage Sync Modal */}
      <IcvfxStageModal
        isOpen={isIcvfxStageOpen}
        onClose={() => setIsIcvfxStageOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #73: DIT Live Color Grading & Video Assist Hub Modal */}
      <DitLiveGradeModal
        isOpen={isDitLiveGradeOpen}
        onClose={() => setIsDitLiveGradeOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #74: DCI Cinema Package & Theatrical KDM Encryption Modal */}
      <DcpPackagingModal
        isOpen={isDcpPackagingOpen}
        onClose={() => setIsDcpPackagingOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #75: Multi-Territory OTT Licensing & Escrow Waterfall Modal */}
      <OttLicensingModal
        isOpen={isOttLicensingOpen}
        onClose={() => setIsOttLicensingOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #76: Box Office Predictive & Occupancy Tracker Modal */}
      <BoxOfficeTrackerModal
        isOpen={isBoxOfficeTrackerOpen}
        onClose={() => setIsBoxOfficeTrackerOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #77: Theatrical Marketing & Influencer Screener Vault Modal */}
      <TheatricalCampaignModal
        isOpen={isTheatricalCampaignOpen}
        onClose={() => setIsTheatricalCampaignOpen(false)}
        defaultProject={selectedPitchProject}
      />

      {/* Feature #78: International Film Festival & Awards Manager Modal */}
      <FilmFestivalManagerModal
        isOpen={isFilmFestivalManagerOpen}
        onClose={() => setIsFilmFestivalManagerOpen(false)}
        defaultProject={selectedPitchProject}
      />



    </>
  );
}

function CastingCard({ call }: { call: typeof CASTINGS[0] }) {
  return (
    <div
      style={{
        borderRadius: "20px",
        backgroundColor: "#07070b",
        border: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = `${call.color}55`;
        e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.6), 0 0 0 1px ${call.color}22`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", backgroundColor: "#030305" }}>
        <img
          src={call.image}
          alt={call.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.75) contrast(1.1)",
            transition: "transform 0.5s ease, filter 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.06)";
            e.currentTarget.style.filter = "brightness(0.85) contrast(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.filter = "brightness(0.75) contrast(1.1)";
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(7,7,11,0.9) 0%, transparent 55%)",
          }}
        />

        {/* Top badges */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            right: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              backgroundColor: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              fontSize: "9px",
              fontFamily: "monospace",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: call.color,
              border: `1px solid ${call.color}55`,
            }}
          >
            {call.typeLabel}
          </span>

          {call.escrow && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px 10px",
                borderRadius: "6px",
                backgroundColor: "rgba(52,211,153,0.15)",
                backdropFilter: "blur(8px)",
                fontSize: "9px",
                fontFamily: "monospace",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#34d399",
                border: "1px solid rgba(52,211,153,0.3)",
              }}
            >
              <Shield size={9} />
              ESCROW
            </span>
          )}
        </div>

        {/* Deadline badge — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "10px",
            fontFamily: "monospace",
            color: call.daysLeft <= 7 ? "#f87171" : "#e0e0f0",
            fontWeight: 600,
          }}
        >
          <Clock size={11} />
          {call.daysLeft <= 7
            ? `⚠ ${call.daysLeft} days left`
            : `${call.daysLeft} days • ${call.deadline}`}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: "14px" }}>
        {/* Studio + location */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "10px",
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#606070",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {call.verified && <BadgeCheck size={11} color="#d4af61" />}
            {call.studio}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <MapPin size={9} />
            {call.location.split(",")[0]}
          </span>
        </div>

        {/* Title */}
        <div>
          <h2
            className="font-cinema"
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#ffffff",
              margin: "0 0 4px 0",
              lineHeight: 1.2,
            }}
          >
            {call.title}
          </h2>
          <p style={{ fontSize: "11px", color: call.color, margin: 0, fontWeight: 600 }}>
            {call.subtitle}
          </p>
        </div>

        {/* Synopsis */}
        <p
          style={{
            fontSize: "12px",
            color: "#9a9aa8",
            lineHeight: 1.65,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {call.synopsis}
        </p>

        {/* Roles */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p
            style={{
              fontSize: "9px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#606070",
              margin: 0,
            }}
          >
            Open Roles
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {call.roles.map((r) => (
              <span
                key={r.name}
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "11px",
                  color: "#c0c0d0",
                  fontFamily: "monospace",
                }}
              >
                {r.name}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {call.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "3px 8px",
                borderRadius: "4px",
                backgroundColor: `${call.color}12`,
                border: `1px solid ${call.color}30`,
                fontSize: "9px",
                fontFamily: "monospace",
                fontWeight: 600,
                color: call.color,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "14px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "9px",
                fontFamily: "monospace",
                textTransform: "uppercase",
                color: "#606070",
                letterSpacing: "0.1em",
              }}
            >
              Budget / Fee
            </div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#d4af61",
                fontFamily: "monospace",
              }}
            >
              {call.budget}
            </div>
          </div>

          <Link
            href={`/casting-calls/${call.id}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 20px",
              borderRadius: "10px",
              backgroundColor: call.color,
              color: "#040406",
              fontSize: "11px",
              fontFamily: "monospace",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            VIEW SIDES <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
