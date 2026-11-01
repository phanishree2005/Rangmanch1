"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Search,
  MapPin,
  Shield,
  CheckCircle,
  Play,
  Sparkles,
  Film,
  Camera,
  Star,
  Tv,
  Award,
  Video,
  Flame,
  ChevronRight,
} from "lucide-react";
import { DEMO_CASTING_CALLS, DEMO_TALENT, DEMO_FAQ } from "@/lib/data";
import { formatSalary, daysUntil } from "@/lib/utils";

export default function HomePageClient() {
  const router = useRouter();
  const [selectedProjectType, setSelectedProjectType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCastingCalls = useMemo(() => {
    if (selectedProjectType === "all") return DEMO_CASTING_CALLS.slice(0, 6);
    return DEMO_CASTING_CALLS.filter(
      (c) => c.projectType === selectedProjectType
    ).slice(0, 6);
  }, [selectedProjectType]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/casting-calls?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/casting-calls");
    }
  };

  const projectCategories = [
    { id: "all", label: "All Productions", icon: Film },
    { id: "feature_film", label: "Feature Films", icon: Film },
    { id: "web_series", label: "OTT Series", icon: Tv },
    { id: "short_film", label: "Short Films", icon: Camera },
    { id: "tv_commercial", label: "Commercials", icon: Sparkles },
    { id: "theatre", label: "Theatre", icon: Flame },
  ];

  return (
    <div
      style={{
        backgroundColor: "#040406",
        color: "#f5f5f7",
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "80px 24px",
        }}
      >
        {/* Background Cinema Soundstage Still with Deep Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.16,
          }}
        >
          <Image
            src="/images/homepage/hero_cinema_set.jpg"
            alt="Rangmanch Cinema Production Soundstage"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at center, transparent 0%, #040406 80%), linear-gradient(180deg, rgba(4,4,6,0.6) 0%, #040406 100%)",
            }}
          />
        </div>

        {/* Background glows */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%) translateY(-30%)",
              width: "900px",
              height: "600px",
              background:
                "radial-gradient(ellipse, rgba(212,175,97,0.18) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "25%",
              left: "-10%",
              width: "400px",
              height: "400px",
              background: "rgba(229,9,20,0.12)",
              filter: "blur(100px)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              right: "-10%",
              width: "400px",
              height: "400px",
              background: "rgba(184,146,66,0.12)",
              filter: "blur(110px)",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Hero Content — centered */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "860px",
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0",
          }}
        >
          {/* Live Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "6px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(212,175,97,0.35)",
              backdropFilter: "blur(12px)",
              marginBottom: "28px",
            }}
          >
            <span style={{ position: "relative", display: "inline-flex", width: "8px", height: "8px" }}>
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  backgroundColor: "#e50914",
                  opacity: 0.75,
                  animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                }}
              />
              <span
                style={{
                  position: "relative",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#e50914",
                  display: "inline-block",
                }}
              />
            </span>
            <span
              style={{
                fontSize: "11px",
                fontFamily: "monospace",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#d4af61",
                fontWeight: 600,
              }}
            >
              Live Audition Guild • 140+ Active Roles
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-cinema"
            style={{
              fontSize: "clamp(40px, 8vw, 84px)",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            Where Talent <br />
            Takes{" "}
            <span className="text-gradient-gold" style={{ fontStyle: "italic" }}>
              The Stage
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              maxWidth: "600px",
              fontSize: "clamp(14px, 2vw, 18px)",
              fontWeight: 300,
              color: "#d1d1d8",
              lineHeight: 1.7,
              marginBottom: "36px",
            }}
          >
            India&apos;s verified cinema and OTT audition platform. Connect directly with
            Bollywood directors, premium web series, and theatrical productions —
            guaranteed escrow &amp; certified guild talent.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            style={{
              width: "100%",
              maxWidth: "620px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.14)",
              backdropFilter: "blur(24px)",
              marginBottom: "48px",
            }}
          >
            <Search
              size={18}
              color="#d4af61"
              style={{ marginLeft: "12px", flexShrink: 0 }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roles, projects (e.g. Antim Prahar, Lead Actor)..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#ffffff",
                fontSize: "14px",
              }}
            />
            <button type="submit" className="btn-cinema-gold" style={{ flexShrink: 0, height: "44px", padding: "0 24px" }}>
              Search Roles
            </button>
          </form>

          {/* Quick Primary Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "36px",
            }}
          >
            <Link
              href="/casting-calls"
              className="btn-cinema-ghost"
              style={{ height: "40px", padding: "0 20px", fontSize: "11px", letterSpacing: "0.08em" }}
            >
              <Film size={14} color="#d4af61" />
              <span>Explore Casting Calls</span>
            </Link>

            <Link
              href="/dashboard/talent"
              className="btn-cinema-gold"
              style={{
                height: "40px",
                padding: "0 20px",
                fontSize: "11px",
                letterSpacing: "0.08em",
                boxShadow: "0 0 20px rgba(212,175,97,0.35)",
              }}
            >
              <Sparkles size={14} />
              <span>Performer Studio: Upload Reels &amp; Photos</span>
            </Link>
          </div>

          {/* Stats Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "0",
              width: "100%",
              maxWidth: "680px",
              paddingTop: "32px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              textAlign: "center",
            }}
          >
            {[
              { val: "₹4.2 Cr+", label: "Escrow Secured", color: "#ffffff" },
              { val: "100%", label: "KYC Verified", color: "#d4af61" },
              { val: "45+", label: "Feature Films", color: "#ffffff" },
              { val: "0%", label: "Artist Fees", color: "#e50914" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="font-cinema"
                  style={{ fontSize: "28px", fontWeight: 900, color: s.color }}
                >
                  {s.val}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    fontFamily: "monospace",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#8e8e98",
                    marginTop: "4px",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — FEATURED PRODUCTIONS
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "96px 0",
        }}
      >
        <div className="cinema-container">
          {/* Section Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
              marginBottom: "40px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#e50914",
                    display: "inline-block",
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    color: "#d4af61",
                    fontWeight: 700,
                  }}
                >
                  NOW CASTING • NATIONWIDE AUDITIONS
                </span>
              </div>
              <h2
                className="font-cinema"
                style={{
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.01em",
                }}
              >
                Featured Productions
              </h2>
            </div>

            <Link
              href="/casting-calls"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#d4af61",
                textDecoration: "none",
              }}
            >
              Explore All 140+ Castings
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Filter Pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              overflowX: "auto",
              paddingBottom: "4px",
              scrollbarWidth: "none",
              marginBottom: "40px",
            }}
          >
            {projectCategories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedProjectType === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedProjectType(cat.id)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "9px 18px",
                    borderRadius: "9999px",
                    fontSize: "11px",
                    fontWeight: isSelected ? 700 : 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    border: isSelected
                      ? "none"
                      : "1px solid rgba(255,255,255,0.1)",
                    background: isSelected
                      ? "linear-gradient(135deg, #d4af61 0%, #b89242 100%)"
                      : "rgba(255,255,255,0.04)",
                    color: isSelected ? "#040406" : "#9a9aa8",
                    boxShadow: isSelected
                      ? "0 0 20px rgba(212,175,97,0.4)"
                      : "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Icon size={13} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Production Cards Grid */}
          <div className="grid-productions">
            {filteredCastingCalls.map((call) => (
              <Link
                key={call.id}
                href={`/casting-calls/${call.id}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "20px",
                  backgroundColor: "#08080c",
                  border: "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.3s ease",
                }}
                className="production-card"
              >
                {/* Poster Banner */}
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16/9",
                    width: "100%",
                    overflow: "hidden",
                    backgroundColor: "#111118",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={call.poster || call.organization?.logo || "/images/casting-calls/project_antim_prahar.jpg"}
                    alt={call.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, #08080c 0%, rgba(8,8,12,0.3) 50%, transparent 100%)",
                    }}
                  />
                  {/* Type badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "14px",
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: "9999px",
                        fontSize: "10px",
                        fontFamily: "monospace",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        backgroundColor: "rgba(0,0,0,0.8)",
                        color: "#d4af61",
                        border: "1px solid rgba(212,175,97,0.3)",
                        fontWeight: 600,
                      }}
                    >
                      {call.projectType.replace("_", " ")}
                    </span>
                  </div>
                  {/* Days left */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontFamily: "monospace",
                      backgroundColor: "rgba(0,0,0,0.85)",
                      color: "#d1d1d8",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {daysUntil(call.applicationDeadline)}d left
                  </div>
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: "24px 28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    flex: 1,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "10px",
                        fontFamily: "monospace",
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                        color: "#d4af61",
                        fontWeight: 700,
                        marginBottom: "6px",
                      }}
                    >
                      {call.organization?.name || "Independent Production"}
                    </div>
                    <h3
                      className="font-cinema"
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#ffffff",
                        lineHeight: 1.3,
                        marginBottom: "8px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {call.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#7a7a88",
                        fontWeight: 300,
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {call.description}
                    </p>
                  </div>

                  <div
                    style={{
                      paddingTop: "16px",
                      borderTop: "1px solid rgba(255,255,255,0.07)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "auto",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "10px",
                          fontFamily: "monospace",
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          color: "#5a5a68",
                          marginBottom: "3px",
                        }}
                      >
                        Compensation
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontFamily: "monospace",
                          fontWeight: 700,
                          color: "#ffffff",
                        }}
                      >
                        {call.roles[0]?.compensation || "Industry Standard"}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "#d4af61",
                      }}
                    >
                      Audition <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — PERFORMERS IN THE SPOTLIGHT
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "96px 0",
        }}
      >
        <div className="cinema-container">
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
              marginBottom: "40px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "10px",
                }}
              >
                <Sparkles size={13} color="#d4af61" />
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    color: "#d4af61",
                    fontWeight: 700,
                  }}
                >
                  VERIFIED TALENT GUILD
                </span>
              </div>
              <h2
                className="font-cinema"
                style={{
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.01em",
                }}
              >
                Performers in the Spotlight
              </h2>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <Link
                href="/dashboard/talent"
                className="btn-cinema-gold"
                style={{
                  height: "36px",
                  padding: "0 18px",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                }}
              >
                <Sparkles size={13} />
                <span>UPLOAD YOUR REEL</span>
              </Link>

              <Link
                href="/talent"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#d4af61",
                  textDecoration: "none",
                }}
              >
                View Full Talent Roster <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Talent Grid — 4 columns */}
          <div className="grid-talent">
            {DEMO_TALENT.slice(0, 4).map((talent) => (
              <Link
                key={talent.id}
                href={`/talent/${talent.id}`}
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  aspectRatio: "3/4",
                  backgroundColor: "#111118",
                  border: "1px solid rgba(255,255,255,0.08)",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                <Image
                  src={
                    talent.profilePhoto ||
                    (talent.portfolioPhotos && talent.portfolioPhotos[0]) ||
                    "/photos/real_03.jpg"
                  }
                  alt={talent.displayName}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, #040406 0%, transparent 55%)",
                  }}
                />

                {/* Verified badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    display: "flex",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "3px 8px",
                      borderRadius: "9999px",
                      fontSize: "9px",
                      fontFamily: "monospace",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      backgroundColor: "rgba(0,0,0,0.75)",
                      color: "#34d399",
                      border: "1px solid rgba(52,211,153,0.3)",
                      fontWeight: 700,
                    }}
                  >
                    <CheckCircle size={9} />
                    VERIFIED
                  </span>
                </div>

                {/* Play icon */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Play size={12} color="#ffffff" fill="#ffffff" />
                </div>

                {/* Info at bottom */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    right: "16px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "#d4af61",
                      fontWeight: 600,
                      marginBottom: "4px",
                    }}
                  >
                    {talent.rolePreferences[0] || "Actor / Performer"}
                  </p>
                  <h3
                    className="font-cinema"
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#ffffff",
                      lineHeight: 1.2,
                    }}
                  >
                    {talent.displayName}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "11px",
                      color: "#7a7a88",
                      fontFamily: "monospace",
                      marginTop: "6px",
                    }}
                  >
                    <MapPin size={11} color="#5a5a68" />
                    {talent.city} • Age {talent.ageMin}–{talent.ageMax}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — PLATFORM FEATURES BENTO
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "96px 0",
        }}
      >
        <div className="cinema-container">
          {/* Section header — centered */}
          <div
            style={{
              textAlign: "center",
              maxWidth: "680px",
              margin: "0 auto 64px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "#d4af61",
                fontWeight: 700,
                marginBottom: "12px",
              }}
            >
              BUILT FOR INDIAN ENTERTAINMENT
            </p>
            <h2
              className="font-cinema"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.01em",
                marginBottom: "16px",
              }}
            >
              A New Standard for Cinema Casting
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#7a7a88",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              Engineered to replace chaotic WhatsApp casting groups, commission
              cuts, and fake auditions with certified production security.
            </p>
          </div>

          {/* Feature Cards — 3 columns */}
          <div className="grid-three-col">
            {/* Card 1 */}
            <div
              style={{
                backgroundColor: "#0a0a10",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(212,175,97,0.1)",
                  border: "1px solid rgba(212,175,97,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#d4af61",
                }}
              >
                <Video size={22} />
              </div>
              <div>
                <h3
                  className="font-cinema"
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "10px",
                  }}
                >
                  In-Browser Audition Studio
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#7a7a88",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  Audition directly from your browser. Our AI Teleprompter
                  scrolls your script and reads opposing dialogue cues in
                  real-time, delivering broadcast-ready self-tapes.
                </p>
              </div>
              <div
                style={{
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#d4af61",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontWeight: 600,
                }}
              >
                ✦ Smart AI Script Reader
              </div>
            </div>

            {/* Card 2 */}
            <div
              style={{
                backgroundColor: "#0a0a10",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(229,9,20,0.1)",
                  border: "1px solid rgba(229,9,20,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#e50914",
                }}
              >
                <Shield size={22} />
              </div>
              <div>
                <h3
                  className="font-cinema"
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "10px",
                  }}
                >
                  DigiLocker KYC &amp; CINTAA Guild
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#7a7a88",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  Zero fake profiles, zero impersonation. Identity verified
                  through Government DigiLocker and cross-referenced with CINTAA
                  guild membership numbers.
                </p>
              </div>
              <div
                style={{
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#34d399",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontWeight: 600,
                }}
              >
                ✦ 100% Identity Certified
              </div>
            </div>

            {/* Card 3 */}
            <div
              style={{
                backgroundColor: "#0a0a10",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(245,158,11,0.1)",
                  border: "1px solid rgba(245,158,11,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f59e0b",
                }}
              >
                <Award size={22} />
              </div>
              <div>
                <h3
                  className="font-cinema"
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "10px",
                  }}
                >
                  Escrow Protected Compensation
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#7a7a88",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  Production budgets deposited into bank-grade escrow before
                  casting calls go live. Performers guaranteed timely payment
                  without unauthorized commission cuts.
                </p>
              </div>
              <div
                style={{
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#f59e0b",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontWeight: 600,
                }}
              >
                ✦ DPDP Act &amp; Escrow Backed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5 — CTA BILLBOARD
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: "0 0 96px 0" }}>
        <div className="cinema-container">
          <div
            style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              padding: "72px 56px",
              border: "1px solid rgba(212,175,97,0.4)",
              background:
                "linear-gradient(135deg, #0d0d14 0%, #08080c 60%, #040406 100%)",
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              alignItems: "flex-start",
            }}
          >
            {/* glow */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "400px",
                height: "400px",
                background:
                  "radial-gradient(ellipse at top right, rgba(212,175,97,0.2) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1, maxWidth: "480px" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  color: "#d4af61",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                YOUR NEXT BIG ROLE AWAITS
              </span>
              <h2
                className="font-cinema"
                style={{
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.1,
                  marginBottom: "16px",
                }}
              >
                Step Into The Spotlight
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "#d1d1d8",
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}
              >
                Create your verified cinematic profile, upload high-definition
                headshots and showreels, and audition for premier films today.
              </p>
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                alignItems: "center",
              }}
            >
              <Link href="/signup" className="btn-cinema-gold" style={{ padding: "0 32px" }}>
                Join as Performer <ArrowRight size={15} />
              </Link>
              <Link
                href="/signup?role=casting_director"
                className="btn-cinema-ghost"
                style={{ padding: "0 32px" }}
              >
                Post a Casting Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 6 — FAQ
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "96px 0",
        }}
      >
        <div className="cinema-container">
          <div
            style={{
              textAlign: "center",
              maxWidth: "600px",
              margin: "0 auto 48px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "#d4af61",
                fontWeight: 700,
                marginBottom: "10px",
              }}
            >
              FREQUENTLY ASKED QUESTIONS
            </p>
            <h2
              className="font-cinema"
              style={{
                fontSize: "clamp(24px, 3vw, 40px)",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Everything You Need To Know
            </h2>
          </div>

          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            {DEMO_FAQ.map((faq, i) => (
              <div
                key={faq.q}
                style={{
                  padding: "24px 0",
                  borderTop: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3
                  className="font-cinema"
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#ffffff",
                    marginBottom: "8px",
                  }}
                >
                  {faq.q}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#7a7a88",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
