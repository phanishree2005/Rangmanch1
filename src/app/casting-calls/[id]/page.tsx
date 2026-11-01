"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import WatermarkedSides from "@/components/WatermarkedSides";
import AuditionStudioModal from "@/components/AuditionStudioModal";
import PitchbookModal from "@/components/PitchbookModal";
import CallbackDispatcherModal from "@/components/CallbackDispatcherModal";
import ArchivalTalentModal from "@/components/ArchivalTalentModal";
import {
  ChevronLeft,
  Video,
  Lock,
  MapPin,
  Clock,
  Shield,
  ShieldCheck,
  BadgeCheck,
  Film,
  Users,
  Star,
  Calendar,
  IndianRupee,
  Mic,
  ArrowRight,
  Play,
  FileText,
  Archive,
} from "lucide-react";

// ─── Self-contained casting data (matches /casting-calls page) ──────────────
const CASTINGS = [
  {
    id: "cc-1",
    title: "Antim Prahar",
    subtitle: "Epic Historical Feature Film",
    type: "Feature Film",
    studio: "Starlight Casting Co.",
    studioDesc: "A premier casting agency with over two decades of experience across Bollywood, regional cinema, and OTT platforms.",
    director: "Imtiaz Ali",
    location: "Mumbai, Maharashtra",
    language: "Hindi",
    budget: "₹85 Lakh – ₹1.2 Cr",
    deadline: "Nov 14, 2024",
    daysLeft: 21,
    escrow: true,
    verified: true,
    image: "/images/casting-calls/project_antim_prahar.jpg",
    color: "#d4af61",
    synopsis:
      "A sweeping period drama set in 1857, following a troupe of performers who secretly aid the independence movement through their art. Shot across Rajasthan, Lucknow, and Varanasi on a 12-week schedule. Presented in association with NFDC.",
    directorNote:
      "We are seeking actors who can carry internal silence. The scenes require restraint — this film lives in the pauses between words, not in the projection of emotion.",
    requirements: ["Fluent Hindi / Awadhi", "CINTAA / FTII trained preferred", "Period costume comfort", "Physically fit for action sequences"],
    roles: [
      {
        id: "r1",
        name: "Neha Sinha — Female Lead",
        type: "Lead",
        compensation: "₹85 Lakh – ₹1.2 Cr",
        ageMin: 22,
        ageMax: 28,
        gender: "Female",
        languages: ["Hindi", "Awadhi"],
        experience: "Experienced",
        description:
          "A classical dancer turned freedom fighter who leads her troupe as a cover for intelligence work. Must convey both grace and steely resolve. Training in Bharatanatyam or Kathak is a strong advantage.",
        directorNote: "She is the emotional centre of the film. We need someone who can hold a scene without dialogue — pure physical and facial expression.",
      },
      {
        id: "r2",
        name: "Vikram Rao — Antagonist",
        type: "Lead",
        compensation: "₹55–70 Lakh",
        ageMin: 35,
        ageMax: 45,
        gender: "Male",
        languages: ["Hindi", "Urdu"],
        experience: "Experienced",
        description:
          "A British-loyalist zamindar torn between his upbringing and his conscience. Complex, morally ambiguous. Requires comfort with both physical intimidation and nuanced vulnerability.",
        directorNote: "Do not play the villain. Play a man who believes he is saving something. That is far more chilling.",
      },
      {
        id: "r3",
        name: "Pratibha — Supporting",
        type: "Supporting",
        compensation: "₹12–20 Lakh",
        ageMin: 18,
        ageMax: 24,
        gender: "Female",
        languages: ["Hindi"],
        experience: "Fresher / Trained",
        description:
          "Neha's younger sister and troupe dancer. The heart of the ensemble. Should have strong dance training and natural comic timing for earlier lighter scenes.",
        directorNote: "Fresh energy. We want someone discovering the weight of history for the first time.",
      },
    ],
  },
  {
    id: "cc-2",
    title: "Hollow Nights — Season 2",
    subtitle: "OTT Psychological Thriller Web Series",
    type: "OTT Series",
    studio: "Spectrum Productions",
    studioDesc: "Award-winning production house specialising in critically acclaimed web series and feature films for Prime Video and Netflix.",
    director: "Zoya Akhtar",
    location: "Delhi NCR",
    language: "Hindi / English",
    budget: "₹18–25 Lakh / Episode",
    deadline: "Nov 08, 2024",
    daysLeft: 15,
    escrow: true,
    verified: true,
    image: "/images/casting-calls/project_hollow_nights.jpg",
    color: "#818cf8",
    synopsis:
      "A forensic psychologist is pulled into a labyrinthine murder conspiracy within Delhi's underground art scene. 8-episode streaming series for Prime Video Original, shooting begins January 2025.",
    directorNote:
      "This season we want to strip back the thriller mechanics and focus on character disintegration. We want actors willing to go to uncomfortable places.",
    requirements: ["Fluent English essential", "Psychological realism", "Available Jan–Apr 2025", "Previous OTT/film work preferred"],
    roles: [
      {
        id: "r1",
        name: "Rohan — Cyber Forensics Lead",
        type: "Lead",
        compensation: "₹18–25 Lakh / Ep",
        ageMin: 28,
        ageMax: 36,
        gender: "Male",
        languages: ["Hindi", "English"],
        experience: "Experienced",
        description:
          "A brilliant but emotionally closed forensic analyst drawn into a case that mirrors his own buried trauma. Should exude analytical coldness masking deep empathy.",
        directorNote: "Think restraint. Every emotion should feel like it costs him something.",
      },
      {
        id: "r2",
        name: "Ayesha — Investigative Journalist",
        type: "Lead",
        compensation: "₹14–20 Lakh / Ep",
        ageMin: 24,
        ageMax: 32,
        gender: "Female",
        languages: ["Hindi", "English"],
        experience: "Experienced",
        description:
          "A fiercely independent journalist who partners—and clashes—with Rohan. Sharp, relentless, with a reckless edge.",
        directorNote: "She drives the plot. She cannot be passive. We need someone with real fire.",
      },
    ],
  },
  {
    id: "cc-3",
    title: "Tata Motors – 'Ahead'",
    subtitle: "National TV Commercial (60 sec + Digital Cut)",
    type: "Commercial",
    studio: "NovaCast India × Ogilvy",
    studioDesc: "Boutique casting agency producing national brand campaigns for India's leading corporate houses.",
    director: "Shakun Batra",
    location: "Mumbai + Lonavala",
    language: "Hindi",
    budget: "₹3.5–6 Lakh (Usage: 1 Year)",
    deadline: "Oct 30, 2024",
    daysLeft: 6,
    escrow: true,
    verified: true,
    image: "/images/casting-calls/project_tata_motors.jpg",
    color: "#34d399",
    synopsis:
      "A modern narrative about an evolving Indian family embracing tomorrow's mobility. Shoot is 2 days — 1 in studio, 1 outdoor at Lonavala. National broadcast + digital rights for 1 year.",
    directorNote:
      "We want chemistry, not performance. The family should feel like they've been together for years. Warm, aspirational, genuinely modern.",
    requirements: ["Natural on-camera presence", "No prior ad experience required", "Hindi fluency", "Driver's licence advantageous"],
    roles: [
      {
        id: "r1",
        name: "Modern Father",
        type: "Lead",
        compensation: "₹3.5–6 Lakh",
        ageMin: 30,
        ageMax: 40,
        gender: "Male",
        languages: ["Hindi"],
        experience: "Any",
        description: "An aspirational urban father — warm, present, forward-looking. Should feel genuinely like a real person, not an actor.",
        directorNote: "Avoid performing warmth. We'll find it in the moments between action and cut.",
      },
      {
        id: "r2",
        name: "Working Mother",
        type: "Lead",
        compensation: "₹3.5–6 Lakh",
        ageMin: 28,
        ageMax: 38,
        gender: "Female",
        languages: ["Hindi"],
        experience: "Any",
        description: "A confident, independent working woman who is also a devoted mother — modern without being a stereotype.",
        directorNote: "She is equal in every frame. She is not secondary. That is the whole point of the campaign.",
      },
    ],
  },
  {
    id: "cc-4",
    title: "Khwaab Ki Zanjeer",
    subtitle: "Marathi & Hindi Stage Musical Production",
    type: "Theatre",
    studio: "Resonance Theatre Group",
    studioDesc: "One of Mumbai's most respected theatre groups with 30+ critically acclaimed productions across NCPA and Prithvi Theatre.",
    director: "Atul Kumar",
    location: "NCPA Mumbai / Prithvi Theatre",
    language: "Hindi / Marathi",
    budget: "₹45,000–₹80,000 / Month",
    deadline: "Nov 22, 2024",
    daysLeft: 29,
    escrow: false,
    verified: true,
    image: "/images/casting-calls/project_manto.jpg",
    color: "#f472b6",
    synopsis:
      "An original musical exploring themes of partition, love, and displacement across three generations. Rehearsals begin December 2024 for a March 2025 premiere at NCPA Experimental Theatre, Mumbai.",
    directorNote:
      "This is theatre that breathes. We need artists with the discipline of classical training and the courage to completely surrender to the moment.",
    requirements: ["Trained classical vocalist", "Movement / contemporary dance", "Rehearsal availability Dec–Feb", "Hindi + basic Marathi"],
    roles: [
      {
        id: "r1",
        name: "Razia — Protagonist",
        type: "Lead",
        compensation: "₹65–80K / Month",
        ageMin: 20,
        ageMax: 30,
        gender: "Female",
        languages: ["Hindi", "Marathi"],
        experience: "Trained Vocalist",
        description: "A young woman who navigates two worlds — pre-partition Lahore and contemporary Mumbai — through song. Requires a trained Hindustani soprano.",
        directorNote: "She is partition itself — caught between memory and present. The role is sung more than it is spoken.",
      },
      {
        id: "r2",
        name: "Hakim — Patriarch",
        type: "Lead",
        compensation: "₹45–60K / Month",
        ageMin: 45,
        ageMax: 60,
        gender: "Male",
        languages: ["Hindi", "Urdu"],
        experience: "Theatre Background",
        description: "A ghazal-singing patriarch whose loss of homeland defines the emotional arc of the play. Must have stage presence and baritone vocal quality.",
        directorNote: "He carries the grief of a generation. It must never feel performed.",
      },
    ],
  },
  {
    id: "cc-5",
    title: "Neel",
    subtitle: "Telugu Pan-India Action Drama Feature Film",
    type: "Feature Film",
    studio: "Mythri Movie Makers",
    studioDesc: "One of India's leading production banners, responsible for multiple blockbuster pan-India releases across Telugu, Tamil, and Hindi markets.",
    director: "Trivikram Srinivas",
    location: "Hyderabad / International Shoot",
    language: "Telugu / Tamil / Hindi",
    budget: "₹1.5–3 Cr (Lead Role)",
    deadline: "Dec 05, 2024",
    daysLeft: 42,
    escrow: true,
    verified: true,
    image: "/photos/real_08.jpg",
    color: "#fb923c",
    synopsis:
      "High-octane action drama starring a street-level police officer uncovering a political conspiracy. Pan-India release in 5 languages. International schedule includes London and Dubai sequences.",
    directorNote:
      "Physical preparation is non-negotiable. We are looking for actors who have already trained — we don't have time to build fitness on set.",
    requirements: ["Action / stunt training", "Telugu / Hindi fluency", "Available 6 months from Jan 2025", "International passport required"],
    roles: [
      {
        id: "r1",
        name: "IPS Officer Kavya",
        type: "Lead",
        compensation: "₹1.5–3 Cr",
        ageMin: 25,
        ageMax: 33,
        gender: "Female",
        languages: ["Telugu", "Hindi"],
        experience: "Film / Stunt Trained",
        description: "A fiercely intelligent IPS officer with a dark past, navigating corruption at the highest levels. Must demonstrate convincing action chops.",
        directorNote: "She is the film. Every scene is from her POV. Her physical and psychological authority must be unquestionable.",
      },
      {
        id: "r2",
        name: "Villain's Strategist",
        type: "Supporting Lead",
        compensation: "₹40–60 Lakh",
        ageMin: 28,
        ageMax: 40,
        gender: "Male",
        languages: ["Telugu", "Hindi", "English"],
        experience: "Experienced",
        description: "The cerebral mastermind behind the political conspiracy — never physically threatening, always intellectually terrifying.",
        directorNote: "Make the audience more afraid of him sitting quietly than of any gun.",
      },
    ],
  },
  {
    id: "cc-6",
    title: "Meera",
    subtitle: "Biographical Drama — National Award Submission",
    type: "Feature Film",
    studio: "NFDC × Cinestaan Film Company",
    studioDesc: "NFDC (National Film Development Corporation of India) — government body supporting India's finest art cinema since 1975.",
    director: "Shonali Bose",
    location: "Rajasthan / Vrindavan",
    language: "Hindi / Braj Bhasha",
    budget: "₹50–90 Lakh (Lead)",
    deadline: "Nov 28, 2024",
    daysLeft: 35,
    escrow: true,
    verified: true,
    image: "/photos/real_02.png",
    color: "#c084fc",
    synopsis:
      "A sweeping biographical retelling of the life of poet-saint Mirabai told through a contemporary lens, juxtaposing her medieval journey with a modern woman discovering her poetry. NFDC National Award submission 2025.",
    directorNote:
      "Meera is not a saint story — it is a story about a woman who refuses to let the world define her. We need that same refusal in the actor.",
    requirements: ["Classical Indian dance (Bharatanatyam/Kuchipudi)", "Hindi / Braj Bhasha", "Devotional music training", "Deep preparation commitment"],
    roles: [
      {
        id: "r1",
        name: "Meera (Young — 16 to 28)",
        type: "Lead",
        compensation: "₹50–70 Lakh",
        ageMin: 18,
        ageMax: 24,
        gender: "Female",
        languages: ["Hindi", "Braj Bhasha"],
        experience: "Dance Trained",
        description: "The young Meera — defiant, luminous, passionate. Must be a trained dancer (Bharatanatyam required). Singing ability is a strong advantage.",
        directorNote: "Her joy must be as big as her grief. We cannot have one without the other.",
      },
      {
        id: "r2",
        name: "Meera (Mature — 28 to 48)",
        type: "Lead",
        compensation: "₹60–90 Lakh",
        ageMin: 28,
        ageMax: 38,
        gender: "Female",
        languages: ["Hindi", "Braj Bhasha"],
        experience: "Experienced",
        description: "The mature Meera — a woman who has survived everything and still creates. Requires extraordinary internal stillness and warmth.",
        directorNote: "By this point she has transcended bitterness. She simply loves. Find that.",
      },
    ],
  },
];

export default function CastingCallDetailPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#040406" }} />}>
      <CastingCallDetailContent />
    </Suspense>
  );
}

function CastingCallDetailContent() {
  const params = useParams();
  const id = params?.id as string;

  const call = CASTINGS.find((c) => c.id === id) || CASTINGS[0];
  const [selectedRoleIdx, setSelectedRoleIdx] = useState(0);
  const selectedRole = call.roles[selectedRoleIdx] || call.roles[0];

  const [isSidesOpen, setIsSidesOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Module 3 Features (Features #28, #29, #30)
  const [isPitchbookOpen, setIsPitchbookOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

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
        {/* ── TOP NAV BAR ── */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "20px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            marginBottom: "48px",
          }}
        >
          <Link
            href="/casting-calls"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#8a8a9a",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8a9a")}
          >
            <ChevronLeft size={14} />
            All Productions
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            {/* Director Actions for Features 28, 29, 30 */}
            <button
              onClick={() => setIsPitchbookOpen(true)}
              className="btn-cinema-gold"
              style={{
                height: "32px",
                padding: "0 12px",
                fontSize: "10px",
                borderRadius: "8px",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
            >
              <FileText size={12} /> PITCHBOOK (PDF)
            </button>
            <button
              onClick={() => setIsCallbackOpen(true)}
              style={{
                height: "32px",
                padding: "0 12px",
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 700,
                borderRadius: "8px",
                backgroundColor: "#161624",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#ffffff",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
            >
              <Calendar size={12} color="#d4af61" /> DISPATCH CALLBACKS
            </button>
            <button
              onClick={() => setIsArchiveOpen(true)}
              style={{
                height: "32px",
                padding: "0 12px",
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 700,
                borderRadius: "8px",
                backgroundColor: "#161624",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#ffffff",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
            >
              <Archive size={12} color="#d4af61" /> TALENT ARCHIVE
            </button>

            <span
              style={{
                padding: "4px 12px",
                borderRadius: "6px",
                backgroundColor: `${call.color}18`,
                border: `1px solid ${call.color}44`,
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 700,
                color: call.color,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {call.type}
            </span>
            {call.verified && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "10px",
                  fontFamily: "monospace",
                  color: "#34d399",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                <ShieldCheck size={13} />
                CINTAA FAIR-PLAY
              </span>
            )}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 32px",
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "48px",
            alignItems: "start",
          }}
          className="casting-detail-grid"
        >
          {/* ── LEFT COLUMN ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

            {/* Title Block */}
            <div>
              <p
                style={{
                  fontSize: "10px",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  color: call.color,
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                ✦ {call.studio} • REF: {call.id.toUpperCase()}
              </p>
              <h1
                className="font-cinema"
                style={{
                  fontSize: "clamp(32px, 4.5vw, 54px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.05,
                  margin: "0 0 8px 0",
                }}
              >
                {call.title}
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  color: call.color,
                  fontWeight: 600,
                  margin: "0 0 20px 0",
                }}
              >
                {call.subtitle}
              </p>

              {/* Meta pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {[
                  { icon: MapPin, text: call.location },
                  { icon: Film, text: `Dir. ${call.director}` },
                  { icon: Clock, text: `${call.daysLeft} days left • ${call.deadline}`, urgent: call.daysLeft <= 7 },
                  { icon: Shield, text: call.escrow ? "Escrow Secured" : "Guild Terms", green: call.escrow },
                ].map((m) => (
                  <span
                    key={m.text}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 14px",
                      borderRadius: "100px",
                      border: `1px solid ${m.urgent ? "rgba(248,113,113,0.35)" : m.green ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.1)"}`,
                      backgroundColor: m.urgent ? "rgba(248,113,113,0.08)" : m.green ? "rgba(52,211,153,0.08)" : "rgba(255,255,255,0.04)",
                      fontSize: "11px",
                      fontFamily: "monospace",
                      color: m.urgent ? "#f87171" : m.green ? "#34d399" : "#c0c0d0",
                    }}
                  >
                    <m.icon size={11} />
                    {m.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Synopsis */}
            <div
              style={{
                paddingTop: "32px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "#606070",
                  marginBottom: "14px",
                }}
              >
                Project Synopsis
              </p>
              <p
                className="font-cinema"
                style={{
                  fontSize: "20px",
                  fontWeight: 400,
                  color: "#d0d0e0",
                  lineHeight: 1.65,
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                "{call.synopsis}"
              </p>
            </div>

            {/* Director's Note */}
            <div
              style={{
                padding: "24px 28px",
                borderRadius: "16px",
                border: `1px solid ${call.color}30`,
                backgroundColor: `${call.color}08`,
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: call.color,
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                ✦ Director's Casting Note — {call.director}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  color: "#c0c0d0",
                  lineHeight: 1.7,
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                "{call.directorNote}"
              </p>
            </div>

            {/* Role Tabs */}
            <div
              style={{
                paddingTop: "32px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p
                  style={{
                    fontSize: "10px",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "#606070",
                    margin: 0,
                  }}
                >
                  Available Character Sides ({call.roles.length})
                </p>
              </div>

              {/* Role tab buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {call.roles.map((role, idx) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRoleIdx(idx)}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "10px",
                      border: selectedRoleIdx === idx ? `1px solid ${call.color}` : "1px solid rgba(255,255,255,0.1)",
                      backgroundColor: selectedRoleIdx === idx ? `${call.color}15` : "transparent",
                      color: selectedRoleIdx === idx ? "#ffffff" : "#8a8a9a",
                      fontSize: "12px",
                      fontFamily: "monospace",
                      fontWeight: selectedRoleIdx === idx ? 700 : 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {role.name}
                  </button>
                ))}
              </div>

              {/* Selected Role Card */}
              <div
                style={{
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: "#08080e",
                  overflow: "hidden",
                }}
              >
                {/* Card Header */}
                <div
                  style={{
                    padding: "24px 28px",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    background: `linear-gradient(135deg, ${call.color}10 0%, transparent 60%)`,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h2
                      className="font-cinema"
                      style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff", margin: "0 0 6px 0" }}
                    >
                      {selectedRole.name}
                    </h2>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <span
                        style={{
                          fontSize: "10px",
                          fontFamily: "monospace",
                          color: call.color,
                          textTransform: "uppercase",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                        }}
                      >
                        {selectedRole.type} Role
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>•</span>
                      <span
                        style={{
                          fontSize: "10px",
                          fontFamily: "monospace",
                          color: "#34d399",
                          textTransform: "uppercase",
                          fontWeight: 700,
                        }}
                      >
                        {selectedRole.compensation}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      fontSize: "12px",
                      fontFamily: "monospace",
                      color: "#9a9aa8",
                    }}
                  >
                    <div>Screen Age</div>
                    <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "14px" }}>
                      {selectedRole.ageMin}–{selectedRole.ageMax} yrs
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  <p style={{ fontSize: "14px", color: "#c0c0d0", lineHeight: 1.7, margin: 0 }}>
                    {selectedRole.description}
                  </p>

                  {/* Attributes Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "16px",
                      padding: "16px 20px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {[
                      { label: "Gender", value: selectedRole.gender },
                      { label: "Languages", value: selectedRole.languages.join(", ") },
                      { label: "Experience", value: selectedRole.experience },
                    ].map((a) => (
                      <div key={a.label}>
                        <span
                          style={{
                            fontSize: "9px",
                            fontFamily: "monospace",
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                            color: "#606070",
                            display: "block",
                            marginBottom: "4px",
                          }}
                        >
                          {a.label}
                        </span>
                        <span style={{ fontSize: "13px", color: "#ffffff", fontWeight: 600 }}>
                          {a.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Director's Role Note */}
                  <div
                    style={{
                      padding: "16px 20px",
                      borderRadius: "12px",
                      border: `1px solid ${call.color}25`,
                      backgroundColor: `${call.color}06`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "monospace",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        color: call.color,
                        fontWeight: 700,
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Director's Note for this Role:
                    </span>
                    <p style={{ fontSize: "13px", color: "#b0b0c0", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>
                      "{selectedRole.directorNote}"
                    </p>
                  </div>

                  {/* CTA Buttons in role card */}
                  <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                    <button
                      onClick={() => setIsStudioOpen(true)}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        height: "48px",
                        borderRadius: "12px",
                        backgroundColor: call.color,
                        border: "none",
                        color: "#040406",
                        fontSize: "12px",
                        fontFamily: "monospace",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        cursor: "pointer",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      <Video size={15} />
                      Record Audition
                    </button>
                    <button
                      onClick={() => setIsSidesOpen(true)}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        height: "48px",
                        borderRadius: "12px",
                        backgroundColor: "transparent",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#ffffff",
                        fontSize: "12px",
                        fontFamily: "monospace",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = call.color;
                        e.currentTarget.style.color = call.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                        e.currentTarget.style.color = "#ffffff";
                      }}
                    >
                      <Lock size={13} />
                      DRM Script Sides
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div
              style={{
                paddingTop: "32px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "#606070",
                  marginBottom: "14px",
                }}
              >
                General Requirements
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {call.requirements.map((req) => (
                  <div
                    key={req}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "13px",
                      color: "#c0c0d0",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: call.color,
                        flexShrink: 0,
                      }}
                    />
                    {req}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "sticky", top: "100px" }}>

            {/* Production Image */}
            <div
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                aspectRatio: "16/9",
                border: `1px solid ${call.color}30`,
                position: "relative",
              }}
            >
              <img
                src={call.image}
                alt={call.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.75) contrast(1.1)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(to top, ${call.color}40 0%, transparent 50%)`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "14px",
                  left: "14px",
                  right: "14px",
                }}
              >
                <div className="font-cinema" style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff" }}>
                  {call.title}
                </div>
                <div style={{ fontSize: "11px", color: call.color, fontWeight: 600 }}>
                  {call.subtitle}
                </div>
              </div>
            </div>

            {/* Action Box */}
            <div
              style={{
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "#08080e",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "#606070",
                  margin: 0,
                }}
              >
                Audition Actions
              </p>

              <button
                onClick={() => setIsStudioOpen(true)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  height: "52px",
                  borderRadius: "14px",
                  backgroundColor: call.color,
                  border: "none",
                  color: "#040406",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <Video size={16} />
                Record Audition (AI Studio)
              </button>

              <button
                onClick={() => setIsSidesOpen(true)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  height: "46px",
                  borderRadius: "14px",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = call.color;
                  e.currentTarget.style.color = call.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.color = "#ffffff";
                }}
              >
                <Lock size={13} />
                View DRM Script Sides
              </button>

              <p
                style={{
                  fontSize: "10px",
                  fontFamily: "monospace",
                  color: "#606070",
                  textAlign: "center",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Browser-based teleprompter reads opposing cues in real-time. No video software required.
              </p>
            </div>

            {/* Budget + Deadline */}
            <div
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "#08080e",
                overflow: "hidden",
              }}
            >
              {[
                { label: "Budget / Fee", value: call.budget, color: "#d4af61" },
                { label: "Application Deadline", value: call.deadline, color: "#ffffff" },
                { label: "Production Language", value: call.language, color: "#ffffff" },
                { label: "Shoot Location", value: call.location, color: "#ffffff" },
              ].map((row, i) => (
                <div
                  key={row.label}
                  style={{
                    padding: "14px 20px",
                    borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#606070",
                    }}
                  >
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontFamily: "monospace",
                      fontWeight: 700,
                      color: row.color,
                      textAlign: "right",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Studio Card */}
            <div
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "#08080e",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <BadgeCheck size={14} color="#d4af61" />
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#606070",
                  }}
                >
                  Production Entity
                </span>
              </div>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                {call.studio}
              </p>
              <p style={{ fontSize: "12px", color: "#9a9aa8", margin: 0, lineHeight: 1.55 }}>
                {call.studioDesc}
              </p>
            </div>

            {/* CINTAA badge */}
            {call.escrow && (
              <div
                style={{
                  borderRadius: "12px",
                  border: "1px solid rgba(52,211,153,0.2)",
                  backgroundColor: "rgba(52,211,153,0.05)",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Shield size={18} color="#34d399" />
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#34d399", fontFamily: "monospace" }}>
                    ESCROW PROTECTED
                  </div>
                  <div style={{ fontSize: "10px", color: "#9a9aa8", fontFamily: "monospace" }}>
                    Payment guaranteed via Rangmanch Escrow. CINTAA Fair-Play Charter.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <WatermarkedSides
        isOpen={isSidesOpen}
        onClose={() => setIsSidesOpen(false)}
        roleName={selectedRole.name}
        projectTitle={call.title}
      />
      <AuditionStudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        roleName={selectedRole.name}
        projectTitle={call.title}
      />

      {/* Feature #28: Shortlist PDF Pitchbook Modal */}
      <PitchbookModal
        isOpen={isPitchbookOpen}
        onClose={() => setIsPitchbookOpen(false)}
        defaultProject={call.title}
      />

      {/* Feature #29: Audition Callback Dispatcher Modal */}
      <CallbackDispatcherModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        defaultProject={call.title}
      />

      {/* Feature #30: Studio Archival Talent Database Modal */}
      <ArchivalTalentModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
      />
    </>
  );
}
