"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  MapPin,
  ArrowRight,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Film,
  Mic,
  Music,
  Award,
  Sparkles,
} from "lucide-react";

// ─── Self-contained performer data ───────────────────────────
const PERFORMERS = [
  {
    id: "t-1",
    name: "Shivam Jadhav",
    photo: "/photos/real_03.jpg",
    gender: "Male",
    ageMin: 22,
    ageMax: 29,
    city: "Mumbai",
    state: "Maharashtra",
    languages: ["Hindi", "English", "Marathi"],
    skills: ["Screen Acting", "Method Acting", "Action / Stunts"],
    availability: "available",
    verified: true,
    bio: "Passionate screen performer and lead actor with compelling screen presence and versatility across drama, thriller, and contemporary OTT cinema.",
    credits: "Lead Performer • Feature & OTT Ready • CINTAA Verified",
    accent: "#d4af61",
  },
  {
    id: "t-2",
    name: "Ananya Sharma",
    photo: "/photos/real_01.png",
    gender: "Female",
    ageMin: 22,
    ageMax: 28,
    city: "Mumbai",
    state: "Maharashtra",
    languages: ["Hindi", "English", "Marathi"],
    skills: ["Classical Dance", "Method Acting", "Bharatanatyam"],
    availability: "available",
    verified: true,
    bio: "FTII-trained actress with 4 feature films and 2 OTT leads. Trained in Bharatanatyam (8 years) and Hindustani classical vocals. National School of Drama workshop alumnus.",
    credits: "4 Films • 2 OTT Leads • FTII Trained",
    accent: "#818cf8",
  },
  {
    id: "t-3",
    name: "Rohan Kapoor",
    photo: "/images/performers/actor_rohan.jpg",
    gender: "Male",
    ageMin: 24,
    ageMax: 32,
    city: "Delhi",
    state: "Delhi NCR",
    languages: ["Hindi", "English", "Punjabi", "Urdu"],
    skills: ["Stage Monologue", "Theatre Acting", "Live Anchoring"],
    availability: "available",
    verified: true,
    bio: "Intense stage and screen performer with 8+ years of live theatre, monologue delivery, and auditorium stagecraft. Renowned for commanding vocal projection.",
    credits: "Auditorium Soloist • Live Stage • CINTAA Certified",
    accent: "#ef4444",
  },
  {
    id: "t-4",
    name: "Meera Nair",
    photo: "/photos/real_02.png",
    gender: "Female",
    ageMin: 24,
    ageMax: 32,
    city: "Kochi",
    state: "Kerala",
    languages: ["Malayalam", "Tamil", "Hindi", "English"],
    skills: ["Kathakali", "Mohiniyattam", "Contemporary Dance"],
    availability: "available",
    verified: true,
    bio: "Award-winning Kerala-based performer bridging classical Kathakali-Mohiniyattam with contemporary cinema. Kerala State Film Award nominee. Fluent in 4 languages.",
    credits: "State Award Nom. • 6 Films • Dance Virtuoso",
    accent: "#34d399",
  },
  {
    id: "t-5",
    name: "Kabir Nair",
    photo: "/images/performers/actor_kabir.jpg",
    gender: "Male",
    ageMin: 23,
    ageMax: 30,
    city: "Bengaluru",
    state: "Karnataka",
    languages: ["Kannada", "Hindi", "English"],
    skills: ["Cinematic Screen Acting", "Outdoor Stunts", "Method Drama"],
    availability: "available",
    verified: true,
    bio: "Versatile lead talent with experience in regional cinema, indie shorts, and outdoor adventure projects. Naturalistic screen style.",
    credits: "3 Indie Features • Kannada & Hindi • Trained",
    accent: "#38bdf8",
  },
  {
    id: "t-6",
    name: "Arjun Mehta",
    photo: "/images/performers/actor_arjun.jpg",
    gender: "Male",
    ageMin: 21,
    ageMax: 27,
    city: "Mumbai",
    state: "Maharashtra",
    languages: ["Hindi", "English", "Gujarati"],
    skills: ["Commercial Acting", "Youth Drama", "Animal Handling"],
    availability: "available",
    verified: true,
    bio: "Youth commercial specialist known for warm, genuine expressions and effortless screen charm. Appeared in 10+ digital and TV campaigns.",
    credits: "10+ TVC Campaigns • Youth OTT • Commercial",
    accent: "#fbbf24",
  },
  {
    id: "t-7",
    name: "Priya Krishnamurthy",
    photo: "/images/performers/actress_priya.jpg",
    gender: "Female",
    ageMin: 22,
    ageMax: 28,
    city: "Hyderabad",
    state: "Telangana",
    languages: ["Telugu", "Tamil", "Hindi", "English"],
    skills: ["Public Speaking", "Corporate Drama", "Live Hosting"],
    availability: "available",
    verified: true,
    bio: "Poised presenter and stage artist fluent across 4 languages. Experienced in live stage productions, film festival emceeing, and web series roles.",
    credits: "Festival Emcee • Web Series • Bilingual",
    accent: "#f472b6",
  },
  {
    id: "t-8",
    name: "Vikram Deshmukh",
    photo: "/images/performers/actor_vikram.jpg",
    gender: "Male",
    ageMin: 25,
    ageMax: 34,
    city: "Pune",
    state: "Maharashtra",
    languages: ["Marathi", "Hindi", "English"],
    skills: ["Character Drama", "Action Stunts", "Mountain Trekking"],
    availability: "busy",
    verified: true,
    bio: "Adventurous performer specializing in intense, rugged character roles and physical action cinema. Currently shooting a mountain thriller for OTT.",
    credits: "OTT Action Lead • 5 Feature Credits • CINTAA",
    accent: "#fb923c",
  },
  {
    id: "t-9",
    name: "Aditya Verma",
    photo: "/images/performers/actor_aditya.jpg",
    gender: "Male",
    ageMin: 24,
    ageMax: 31,
    city: "Mumbai",
    state: "Maharashtra",
    languages: ["Hindi", "English"],
    skills: ["Urban Drama", "Fashion Lookbook", "Lifestyle Ads"],
    availability: "available",
    verified: true,
    bio: "Modern screen presence with strong editorial lookbook portfolio. Featured in fashion campaigns, music videos, and urban drama streaming pilots.",
    credits: "Fashion Week Face • Music Video Lead • OTT",
    accent: "#a78bfa",
  },
  {
    id: "t-10",
    name: "Devansh Roy",
    photo: "/images/performers/actor_devansh.jpg",
    gender: "Male",
    ageMin: 22,
    ageMax: 29,
    city: "Kolkata",
    state: "West Bengal",
    languages: ["Bengali", "Hindi", "English"],
    skills: ["Parallel Cinema", "Indie Drama", "Subtle Expression"],
    availability: "available",
    verified: true,
    bio: "Kolkata theatre and parallel cinema artist known for quiet emotional intensity and naturalistic dialogue delivery in Bengali and Hindi cinema.",
    credits: "National Short Film Winner • Theatre Guild",
    accent: "#4ade80",
  },
  {
    id: "t-11",
    name: "Kunal Joshi",
    photo: "/images/performers/actor_kunal.jpg",
    gender: "Male",
    ageMin: 26,
    ageMax: 35,
    city: "Dehradun",
    state: "Uttarakhand",
    languages: ["Hindi", "Garhwali", "English"],
    skills: ["Method Acting", "Atmospheric Drama", "Physical Theatre"],
    availability: "available",
    verified: true,
    bio: "Atmospheric actor with commanding stillness. Specialized in psychological suspense and dramatic roles set in North Indian locales.",
    credits: "Indie Breakout • Feature Supporting • NSD Workshop",
    accent: "#94a3b8",
  },
  {
    id: "t-12",
    name: "Aryan Sengupta",
    photo: "/images/performers/actor_aryan.jpg",
    gender: "Male",
    ageMin: 23,
    ageMax: 30,
    city: "Pune",
    state: "Maharashtra",
    languages: ["Hindi", "Marathi", "English"],
    skills: ["Romantic Comedy", "Outdoor Commercials", "Improv"],
    availability: "available",
    verified: true,
    bio: "Energetic and grounded actor with natural flair for slice-of-life comedy and relatable screen presence. Great rapport with animals on camera.",
    credits: "8 Brand TVCs • Slice-of-Life Lead",
    accent: "#e879f9",
  },
];

const GENDERS = [
  { id: "all", label: "All Performers" },
  { id: "Female", label: "Female" },
  { id: "Male", label: "Male" },
];

export default function TalentDirectoryPage() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");
  const [language, setLanguage] = useState("All Languages");

  const filtered = useMemo(() => {
    return PERFORMERS.filter((p) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.bio.toLowerCase().includes(q) ||
        p.skills.some((s) => s.toLowerCase().includes(q)) ||
        p.languages.some((l) => l.toLowerCase().includes(q));
      const matchGender = gender === "all" || p.gender === gender;
      const matchLang =
        language === "All Languages" || p.languages.includes(language);
      return matchSearch && matchGender && matchLang;
    });
  }, [search, gender, language]);

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
        {/* ── HEADER ── */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "48px 32px 40px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Eyebrow badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px",
              borderRadius: "100px",
              backgroundColor: "rgba(212,175,97,0.1)",
              border: "1px solid rgba(212,175,97,0.25)",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#d4af61",
                fontWeight: 700,
              }}
            >
              ✦ Screen & Stage Repertoire
            </span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
            <span
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#34d399",
                fontWeight: 700,
              }}
            >
              All Profiles Verified
            </span>
          </div>

          {/* Title row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "32px",
              flexWrap: "wrap",
              marginBottom: "36px",
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
                The Performer<br />
                <span style={{ color: "#d4af61" }}>Directory</span>
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
                Discover verified Indian actors, classical dancers, vocalists, and theatre artists. Each profile features{" "}
                <span style={{ color: "#d4af61" }}>CINTAA-verified credentials</span>, showreel materials, and direct audition submission.
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "16px", flexShrink: 0 }}>
              {[
                { value: "50,000+", label: "Verified Artists", gold: false },
                { value: "18 States", label: "Pan-India Guilds", gold: true },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    padding: "14px 22px",
                    borderRadius: "14px",
                    backgroundColor: "#08080e",
                    border: s.gold
                      ? "1px solid rgba(212,175,97,0.25)"
                      : "1px solid rgba(255,255,255,0.08)",
                    textAlign: "center",
                  }}
                >
                  <div
                    className="font-cinema"
                    style={{
                      fontSize: "24px",
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

          {/* Performer Upload & Media Vault CTA Banner */}
          <div
            style={{
              padding: "22px 28px",
              borderRadius: "16px",
              background:
                "linear-gradient(135deg, rgba(212,175,97,0.14) 0%, rgba(20,20,30,0.85) 60%, rgba(8,8,14,0.95) 100%)",
              border: "1px solid rgba(212,175,97,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "32px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(212,175,97,0.16)",
                  border: "1px solid rgba(212,175,97,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#d4af61",
                  flexShrink: 0,
                }}
              >
                <Sparkles size={24} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#ffffff",
                    }}
                  >
                    Are You an Actor, Dancer, or Performer?
                  </h3>
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      padding: "2px 8px",
                      borderRadius: "100px",
                      backgroundColor: "rgba(52,211,153,0.15)",
                      border: "1px solid rgba(52,211,153,0.3)",
                      color: "#34d399",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    Direct Upload
                  </span>
                </div>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#a0a0b0" }}>
                  Upload your headshots, 4K monologue showreels, and vocal samples to get your verified comp card listed for directors.
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/talent"
              className="btn-cinema-gold"
              style={{
                height: "44px",
                padding: "0 24px",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
              }}
            >
              <span>UPLOAD REELS &amp; PHOTOS</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Search Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "4px 16px",
              height: "54px",
              borderRadius: "14px",
              border: "1px solid rgba(212,175,97,0.3)",
              backgroundColor: "#08080e",
              boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
              marginBottom: "28px",
            }}
          >
            <Search size={18} color="#d4af61" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by artist name, city, dialect, or skill (e.g. Bharatanatyam, improv)..."
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
                  padding: "6px 12px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "none",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#c0c0d0",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {/* Gender pills */}
            <div style={{ display: "flex", gap: "8px" }}>
              {GENDERS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGender(g.id)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "100px",
                    border:
                      gender === g.id
                        ? "1px solid #d4af61"
                        : "1px solid rgba(255,255,255,0.1)",
                    backgroundColor:
                      gender === g.id
                        ? "rgba(212,175,97,0.15)"
                        : "transparent",
                    color: gender === g.id ? "#f4e2b8" : "#8a8a9a",
                    fontWeight: gender === g.id ? 700 : 500,
                    fontSize: "11px",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {g.label}
                </button>
              ))}
            </div>

            {/* Language select */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  fontSize: "10px",
                  fontFamily: "monospace",
                  color: "#606070",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                <SlidersHorizontal size={12} /> Language:
              </span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  background: "#08080e",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "10px",
                  padding: "8px 14px",
                  color: "#c0c0d0",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  outline: "none",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                {[
                  "All Languages",
                  "Hindi",
                  "English",
                  "Tamil",
                  "Telugu",
                  "Malayalam",
                  "Marathi",
                  "Kannada",
                  "Punjabi",
                  "Urdu",
                  "Gujarati",
                ].map((l) => (
                  <option key={l} value={l} style={{ background: "#0a0a10" }}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* ── GRID ── */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "40px 32px",
          }}
        >
          {/* Count bar */}
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
              of 6 verified profiles
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#9a9aa8" }}>
              <ShieldCheck size={14} color="#34d399" />
              CINTAA & DigiLocker MeitY Validated
            </span>
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
                No performers match your search
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setGender("all");
                  setLanguage("All Languages");
                }}
                className="btn-cinema-gold"
                style={{ height: "42px", padding: "0 24px", fontSize: "11px" }}
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "28px",
              }}
            >
              {filtered.map((talent) => (
                <PerformerCard key={talent.id} talent={talent} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

function PerformerCard({ talent }: { talent: (typeof PERFORMERS)[0] }) {
  const isAvailable = talent.availability === "available";

  return (
    <Link
      href={`/talent/${talent.id}`}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#07070b",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${talent.accent}55`;
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 30px 60px rgba(0,0,0,0.9), 0 0 30px ${talent.accent}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.6)";
      }}
    >
      {/* Portrait Image — 3:4 */}
      <div
        style={{
          position: "relative",
          aspectRatio: "3/4",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#030305",
        }}
      >
        <img
          src={talent.photo}
          alt={talent.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            filter: "brightness(0.98)",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.filter = "brightness(1.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.filter = "brightness(0.98)";
          }}
        />

        {/* Gradient vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 35%, rgba(7,7,11,0.95) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Top-left: Verified badge */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            borderRadius: "8px",
            backgroundColor: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(212,175,97,0.35)",
            fontSize: "9px",
            fontFamily: "monospace",
            fontWeight: 700,
            color: "#f4e2b8",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          <ShieldCheck size={11} color="#d4af61" />
          CINTAA Verified
        </div>

        {/* Top-right: Availability */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            borderRadius: "8px",
            backgroundColor: isAvailable
              ? "rgba(52,211,153,0.15)"
              : "rgba(251,146,60,0.15)",
            backdropFilter: "blur(8px)",
            border: isAvailable
              ? "1px solid rgba(52,211,153,0.35)"
              : "1px solid rgba(251,146,60,0.35)",
            fontSize: "9px",
            fontFamily: "monospace",
            fontWeight: 700,
            color: isAvailable ? "#34d399" : "#fb923c",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: isAvailable ? "#34d399" : "#fb923c",
            }}
          />
          {isAvailable ? "Available" : "Busy"}
        </div>

        {/* Bottom overlay: Name + gender/age */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "18px",
            right: "18px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: talent.accent,
              fontWeight: 700,
              marginBottom: "4px",
            }}
          >
            {talent.gender} • {talent.ageMin}–{talent.ageMax} yrs
          </div>
          <h2
            className="font-cinema"
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#ffffff",
              margin: "0 0 6px 0",
              lineHeight: 1.15,
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            }}
          >
            {talent.name}
          </h2>
          <p
            style={{
              fontSize: "11px",
              fontFamily: "monospace",
              color: "#c0c0d0",
              margin: 0,
              letterSpacing: "0.04em",
            }}
          >
            {talent.credits}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: "18px 20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flex: 1,
        }}
      >
        {/* Location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "11px",
            fontFamily: "monospace",
          }}
        >
          <span
            style={{
              color: "#9a9aa8",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <MapPin size={12} color="#d4af61" />
            {talent.city}, {talent.state}
          </span>
          <span style={{ color: "#34d399", fontWeight: 600, fontSize: "10px", textTransform: "uppercase" }}>
            Rep Trained
          </span>
        </div>

        {/* Bio excerpt */}
        <p
          style={{
            fontSize: "12px",
            color: "#8a8a9a",
            margin: 0,
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {talent.bio}
        </p>

        {/* Skills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {talent.skills.map((s) => (
            <span
              key={s}
              style={{
                padding: "3px 10px",
                borderRadius: "6px",
                backgroundColor: `${talent.accent}10`,
                border: `1px solid ${talent.accent}30`,
                fontSize: "9px",
                fontFamily: "monospace",
                fontWeight: 600,
                color: talent.accent,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Language badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {talent.languages.map((l) => (
            <span
              key={l}
              style={{
                padding: "3px 8px",
                borderRadius: "5px",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: "10px",
                fontFamily: "monospace",
                color: "#c0c0d0",
              }}
            >
              {l}
            </span>
          ))}
        </div>

        {/* Footer CTA */}
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
          <span
            style={{
              fontSize: "11px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: talent.accent,
              fontWeight: 700,
            }}
          >
            View Full Comp Card
          </span>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: `${talent.accent}15`,
              border: `1px solid ${talent.accent}35`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: talent.accent,
            }}
          >
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}
