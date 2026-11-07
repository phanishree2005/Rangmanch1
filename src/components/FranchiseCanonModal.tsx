"use client";

import { useState } from "react";
import {
  X,
  Globe2,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  GitBranch,
  BookOpen,
  Users2,
  AlertOctagon,
  Sparkles,
  Layers,
  FileText,
  Share2,
} from "lucide-react";

interface FranchiseCanonModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function FranchiseCanonModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Cinematic Universe Canon Bible",
}: FranchiseCanonModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Universe Architecture & Timeline
  const [universeName, setUniverseName] = useState("The Black Horizon Cinematic Universe");
  const [timelineEra, setTimelineEra] = useState("Linear Core Trilogy (1998 Prequel ➔ 2026 Core Film ➔ 2032 Sequel)");
  const [continuityType, setContinuityType] = useState("Strict Canonical (Every casualty & scar persists across spin-offs)");
  const [mediaExpansionChannels, setMediaExpansionChannels] = useState([
    "Theatrical Feature Trilogy (DCI 4K)",
    "6-Episode Prestige Spin-off Series (OTT)",
    "Hardcover Graphic Novel Prequel (Dark Horse)",
    "Unreal Engine 5 AAA Narrative Action Game",
  ]);

  // Step 2: Character Lore & Biological Continuity Matrix
  const [characterLead, setCharacterLead] = useState("Agent Kabir Rathore (Codename: Vajra)");
  const [characterAgeTimeline, setCharacterAgeTimeline] = useState("1998: Age 24 (Rookie Officer) | 2026: Age 52 (Reformed Specialist) | 2032: Age 58 (Director General)");
  const [physicalInjuryContinuity, setPhysicalInjuryContinuity] = useState("Sustains shrapnel scar across left zygomatic arch in Climax 1; carries permanent limp in right meniscus");
  const [characterFactionState, setCharacterFactionState] = useState("Ex-RAW Rogue Operative allied with Shadow Syndicate");

  // Step 3: Continuity Paradox & Anachronism AI Sentinel
  const [paradoxAlertActive, setParadoxAlertActive] = useState(false);
  const [technologyRule, setTechnologyRule] = useState("Pre-2000 Era: Strictly analog tape recorders, pagers, rotary phones, CRT monitors; zero biometric smartphones");
  const [geographicalCanon, setGeographicalCanon] = useState("Fictional buffer zone 'Zanskar Sector 9' located 45km North of Dras line; verified map coordinates");

  // Step 4: Transmedia Deal Memo Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const handleDownloadBible = () => {
    setIsExporting(true);
    const bibleData = {
      project: defaultProject,
      universeName,
      architecture: {
        timelineEra,
        continuityType,
        mediaExpansionChannels,
      },
      characters: [
        {
          name: characterLead,
          ageProgression: characterAgeTimeline,
          traumaAndInjuryContinuity: physicalInjuryContinuity,
          factionLoyalties: characterFactionState,
        },
      ],
      worldbuildingRules: {
        technologyConstraint: technologyRule,
        geographyCanon: geographicalCanon,
        anachronismChecks: "Zero Paradox Tolerated (AI Lore Sentinel Verified)",
      },
      transmediaLicensingRights: {
        theatricalRights: "Reserved for Studio Tentpole Worldwide Release",
        ottPrestigeSeries: "Exclusive 6-Episode Narrative Window",
        gamingLicense: "Unreal Engine 5 Interactive Adaptation",
        merchandisingAndComics: "Graphic Novel Syndicate Publishing",
      },
      exportTimestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(bibleData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Franchise_Canon_Bible_${universeName.replace(/\s+/g, "_")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTimeout(() => setIsExporting(false), 900);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.88)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1050px",
          maxHeight: "92vh",
          backgroundColor: "#0d0c0a",
          border: "1px solid rgba(212, 175, 55, 0.4)",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 65px rgba(0, 0, 0, 0.95), 0 0 45px rgba(212, 175, 55, 0.15)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 30px",
            borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(180deg, rgba(212, 175, 55, 0.1) 0%, rgba(13, 12, 10, 0.6) 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "rgba(212, 175, 55, 0.15)",
                border: "1px solid rgba(212, 175, 55, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#d4af37",
              }}
            >
              <Globe2 size={26} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2
                  className="font-cinema"
                  style={{
                    color: "#f5f5f0",
                    fontSize: "22px",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    margin: 0,
                  }}
                >
                  Transmedia Franchise Canon & Multiverse Bible Engine
                </h2>
                <span
                  style={{
                    fontSize: "11px",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(212, 175, 55, 0.2)",
                    color: "#d4af37",
                    border: "1px solid rgba(212, 175, 55, 0.4)",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                  }}
                >
                  FEATURE 97
                </span>
              </div>
              <p
                style={{
                  color: "#9e9e90",
                  fontSize: "13px",
                  margin: "4px 0 0 0",
                }}
              >
                Cinematic Universe Continuity • Character Injury/Age Trackers • Transmedia Cross-Platform Lore Sentinel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              color: "#a0a095",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Step Navigation Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          {[
            { step: 1, title: "1. Universe Architecture", desc: "Timeline & Mediums", icon: GitBranch },
            { step: 2, title: "2. Character Continuity", desc: "Age & Physical Trauma", icon: Users2 },
            { step: 3, title: "3. Lore Paradox Sentinel", desc: "Worldbuilding Rules", icon: BookOpen },
            { step: 4, title: "4. Transmedia Bible", desc: "IP Licensing Manifest", icon: Share2 },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeStep === item.step;
            const isCompleted = completedSteps.includes(item.step);
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                style={{
                  padding: "14px 18px",
                  background: isActive
                    ? "rgba(212, 175, 55, 0.12)"
                    : "transparent",
                  border: "none",
                  borderBottom: isActive
                    ? "2px solid #d4af37"
                    : "2px solid transparent",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isActive
                      ? "#d4af37"
                      : isCompleted
                      ? "rgba(212, 175, 55, 0.3)"
                      : "rgba(255, 255, 255, 0.05)",
                    color: isActive ? "#0d0c0a" : isCompleted ? "#d4af37" : "#777",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {isCompleted && !isActive ? <Check size={16} /> : <Icon size={15} />}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: isActive ? "#f5f5f0" : "#a0a095",
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ fontSize: "11px", color: "#666" }}>
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div
          style={{
            padding: "26px 32px",
            overflowY: "auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* STEP 1 */}
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: "12px",
                  background: "rgba(212, 175, 55, 0.06)",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: "12px", color: "#d4af37", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Franchise Anchor Title
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginTop: "2px" }}>
                    {defaultProject}
                  </div>
                </div>
                <div
                  style={{
                    padding: "6px 14px",
                    borderRadius: "20px",
                    backgroundColor: "rgba(212, 175, 55, 0.15)",
                    border: "1px solid rgba(212, 175, 55, 0.4)",
                    color: "#d4af37",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  Multiverse Registry Active
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Cinematic Universe Official Designation
                  </label>
                  <input
                    type="text"
                    value={universeName}
                    onChange={(e) => setUniverseName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "#161513",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      color: "#eee",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Continuity Rigor & Enforcement Standard
                  </label>
                  <select
                    value={continuityType}
                    onChange={(e) => setContinuityType(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "#161513",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      color: "#eee",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="Strict Canonical (Every casualty & scar persists across spin-offs)">Strict Canonical (Every casualty & scar persists across spin-offs)</option>
                    <option value="Elastic Anthology Canon (Shared lore, independent character arcs)">Elastic Anthology Canon (Shared lore, independent character arcs)</option>
                    <option value="Multiversal Branching (Divergent timeline nexus points)">Multiversal Branching (Divergent timeline nexus points)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                  Universe Chronological Progression & Epochs
                </label>
                <input
                  type="text"
                  value={timelineEra}
                  onChange={(e) => setTimelineEra(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: "#161513",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    color: "#eee",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "10px", fontWeight: 600 }}>
                  Active Transmedia Spin-Off Verticals
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {mediaExpansionChannels.map((channel, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "12px 16px",
                        borderRadius: "10px",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(212, 175, 55, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "13px",
                        color: "#eee",
                      }}
                    >
                      <CheckCircle2 size={16} color="#d4af37" />
                      {channel}
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => {
                    handleStepComplete(1);
                    setActiveStep(2);
                  }}
                  className="btn-cinema-gold"
                  style={{
                    padding: "12px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  TRACK CHARACTER LORE <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Character Anchor
                  </label>
                  <input
                    type="text"
                    value={characterLead}
                    onChange={(e) => setCharacterLead(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "#161513",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      color: "#eee",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Allegiance & Faction Continuity
                  </label>
                  <input
                    type="text"
                    value={characterFactionState}
                    onChange={(e) => setCharacterFactionState(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "#161513",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      color: "#eee",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                  Biological Age Progression Across Releases
                </label>
                <textarea
                  value={characterAgeTimeline}
                  onChange={(e) => setCharacterAgeTimeline(e.target.value)}
                  rows={2}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: "#161513",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    color: "#eee",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                  Permanent Physical Trauma, Scars & Prosthetic Continuity
                </label>
                <textarea
                  value={physicalInjuryContinuity}
                  onChange={(e) => setPhysicalInjuryContinuity(e.target.value)}
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: "#161513",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    color: "#eee",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
                <div style={{ fontSize: "11px", color: "#81c784", marginTop: "4px" }}>
                  ✓ Injected into VFX & Prosthetics Wardrobe Sheets for sequel and game character meshes.
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => setActiveStep(1)}
                  style={{
                    padding: "12px 20px",
                    background: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "10px",
                    color: "#bbb",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  BACK TO ARCHITECTURE
                </button>
                <button
                  onClick={() => {
                    handleStepComplete(2);
                    setActiveStep(3);
                  }}
                  className="btn-cinema-gold"
                  style={{
                    padding: "12px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  AUDIT LORE PARADOXES <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  padding: "18px 22px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(0, 0, 0, 0.5) 100%)",
                  border: "1px solid rgba(212, 175, 55, 0.25)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <BookOpen size={20} color="#d4af37" />
                  <h4 style={{ margin: 0, color: "#fff", fontSize: "15px" }}>
                    Automated Continuity Sentinel & Anachronism Gatekeeper
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "12px", color: "#a0a095" }}>
                  Flags anachronistic technology, geographical impossibilities, or deceased character cameos across upcoming scripts.
                </p>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                  Historical & Technological Reality Constraint
                </label>
                <textarea
                  value={technologyRule}
                  onChange={(e) => setTechnologyRule(e.target.value)}
                  rows={2}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: "#161513",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    color: "#eee",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                  Canonical Geography & Territory Rules
                </label>
                <textarea
                  value={geographicalCanon}
                  onChange={(e) => setGeographicalCanon(e.target.value)}
                  rows={2}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: "#161513",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    color: "#eee",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>

              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: "12px",
                  background: "rgba(46, 125, 50, 0.12)",
                  border: "1px solid rgba(76, 175, 80, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <CheckCircle2 size={24} color="#81c784" />
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#81c784" }}>
                      Zero Continuity Clashes Detected
                    </div>
                    <div style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>
                      Cross-referenced against 3 screenplays, 1 comic arc & 1 game design doc.
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#d4af37",
                    fontWeight: 600,
                  }}
                >
                  SCAN FREQUENCY: REAL-TIME
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => setActiveStep(2)}
                  style={{
                    padding: "12px 20px",
                    background: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "10px",
                    color: "#bbb",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  BACK TO LORE
                </button>
                <button
                  onClick={() => {
                    handleStepComplete(3);
                    setActiveStep(4);
                  }}
                  className="btn-cinema-gold"
                  style={{
                    padding: "12px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  EXPORT TRANSMEDIA BIBLE <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(13, 12, 10, 0.8) 100%)",
                  border: "1px solid rgba(212, 175, 55, 0.35)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <Share2 size={22} color="#d4af37" />
                  <h4 style={{ margin: 0, color: "#fff", fontSize: "16px" }}>
                    Universal Lore Bible & Studio IP Licensing Pack
                  </h4>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginTop: "14px" }}>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>Active Media Assets</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#d4af37", marginTop: "2px" }}>Film • Series • Comic • Game</div>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>Canon Verifier</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#81c784", marginTop: "2px" }}>100% Coherent</div>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>Licensing Value Pool</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginTop: "2px" }}>₹120 Cr Global Rights</div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "14px",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(212, 175, 55, 0.15)",
                }}
              >
                <button
                  onClick={() => setActiveStep(3)}
                  style={{
                    padding: "12px 20px",
                    background: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "10px",
                    color: "#bbb",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  BACK TO SENTINEL
                </button>
                <button
                  onClick={handleDownloadBible}
                  disabled={isExporting}
                  className="btn-cinema-gold"
                  style={{
                    padding: "12px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Download size={16} />
                  {isExporting ? "GENERATING CANON BIBLE..." : "DOWNLOAD FRANCHISE CANON BIBLE (JSON)"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

