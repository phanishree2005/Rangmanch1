"use client";

import { useState } from "react";
import {
  X,
  Camera,
  CheckCircle2,
  Download,
  Check,
  Sparkles,
  Sliders,
  Eye,
  Layers,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

interface WardrobeContinuityModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function WardrobeContinuityModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Unit 1 Principal Photography",
}: WardrobeContinuityModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Character Timeline
  const [selectedCharacter, setSelectedCharacter] = useState("kabir");
  const [sceneCode, setSceneCode] = useState("Scene 42B (Rain Alley Showdown)");
  const [shootDay, setShootDay] = useState("Day 14 (Pickups)");

  // Step 2: AI Delta Matcher
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(true);
  const [deltaTolerance, setDeltaTolerance] = useState(98.4);

  // Step 3: Distress & Prop Markers
  const [distressMarkers, setDistressMarkers] = useState([
    { id: "d1", label: "Left Lapel Gunpowder Singe & Bullet Tear (35mm)", verified: true },
    { id: "d2", label: "Right Cheekbone Contusion with Stage Blood #04", verified: true },
    { id: "d3", label: "Vintage Omega Watch on Right Wrist (Hole #3)", verified: true },
    { id: "d4", label: "Left Knuckle Crepe Bandage (2x Staining)", verified: true },
  ]);

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const runAiVisionScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setDeltaTolerance(99.1);
    }, 1200);
  };

  const downloadContinuityBinder = () => {
    setIsExporting(true);
    const data = {
      project: defaultProject,
      character: selectedCharacter === "kabir" ? "Kabir Singhania (Lead)" : "Rohan Malhotra (Officer)",
      scene: sceneCode,
      day: shootDay,
      overallContinuityScore: `${deltaTolerance}%`,
      status: "CONTINUITY_LOCKED_SCRIPT_SUPERVISOR_APPROVED",
      wardrobeCode: "OUTFIT-03-BLOOD-RAIN-HEAVY",
      distressMarkers,
      hairStubbleMetric: "1.85mm (Tolerance +/- 0.1mm)",
      makeupTone: "MAC Studio Fix NC42 + Stage Blood Coagulant #03",
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `CONTINUITY_LOG_${selectedCharacter.toUpperCase()}_${sceneCode.replace(/[^a-zA-Z0-9]/g, "_")}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsExporting(false), 800);
  };

  const steps = [
    { num: 1, title: "Costume Index", sub: "Character & Scene Code" },
    { num: 2, title: "AI Vision Matcher", sub: "Day-1 vs Day-N Baseline" },
    { num: 3, title: "Distress & Props", sub: "Blood & Wardrobe Tears" },
    { num: 4, title: "Supervisor Lock", sub: "Digital Binder Export" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          maxHeight: "92vh",
          backgroundColor: "#090812",
          border: "1px solid rgba(168,85,247,0.35)",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 60px -15px rgba(0,0,0,0.9), 0 0 40px rgba(168,85,247,0.15)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 28px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(180deg, rgba(168,85,247,0.08) 0%, rgba(0,0,0,0) 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "rgba(168,85,247,0.15)",
                border: "1px solid rgba(168,85,247,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#c084fc",
              }}
            >
              <Camera size={24} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2
                  className="font-cinema"
                  style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", margin: 0 }}
                >
                  Wardrobe Continuity &amp; Visual Matcher
                </h2>
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "monospace",
                    padding: "2px 8px",
                    borderRadius: "999px",
                    backgroundColor: "rgba(168,85,247,0.2)",
                    color: "#e9d5ff",
                    border: "1px solid rgba(168,85,247,0.4)",
                  }}
                >
                  DELTA SCANNER ACTIVE
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: "3px 0 0 0" }}>
                Project: <strong style={{ color: "#d4af61" }}>{defaultProject}</strong> • Multi-Day Shoot Continuity &amp; AI Distress Delta Verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "8px",
              color: "#9ca3af",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* 4-Step Progress Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            backgroundColor: "#06050b",
          }}
        >
          {steps.map((s) => {
            const isCurrent = activeStep === s.num;
            const isDone = completedSteps.includes(s.num);
            return (
              <button
                key={s.num}
                onClick={() => setActiveStep(s.num)}
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: isCurrent
                    ? "rgba(168,85,247,0.1)"
                    : "transparent",
                  border: "none",
                  borderBottom: isCurrent ? "2px solid #a855f7" : "2px solid transparent",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 700,
                    backgroundColor: isDone
                      ? "#a855f7"
                      : isCurrent
                      ? "rgba(168,85,247,0.3)"
                      : "rgba(255,255,255,0.1)",
                    color: isDone ? "#ffffff" : isCurrent ? "#e9d5ff" : "#9ca3af",
                  }}
                >
                  {isDone && !isCurrent ? <Check size={13} /> : s.num}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: isCurrent ? "#ffffff" : "#9ca3af",
                    }}
                  >
                    {s.title}
                  </div>
                  <div style={{ fontSize: "10px", color: "#6b7280" }}>{s.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {/* STEP 1: COSTUME INDEX */}
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#c084fc", margin: "0 0 14px 0" }}>
                    Character Continuity Index
                  </h3>

                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>
                      Select Character Roster
                    </label>
                    <select
                      value={selectedCharacter}
                      onChange={(e) => setSelectedCharacter(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#0f0e1a",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "8px",
                        color: "#ffffff",
                        fontSize: "12px",
                      }}
                    >
                      <option value="kabir">Kabir Singhania (Lead Protagonist) — Outfit #03: Tactical Trench &amp; Distressed Linen</option>
                      <option value="rohan">Rohan Malhotra (ACP Special Cell) — Outfit #01: Black Utility Vest &amp; Holster</option>
                      <option value="ananya">Ananya Varma (Forensic Lead) — Outfit #04: Burgundy Blazer &amp; Silk Shirt</option>
                    </select>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>
                        Scene Timeline Code
                      </label>
                      <input
                        type="text"
                        value={sceneCode}
                        onChange={(e) => setSceneCode(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          backgroundColor: "#0f0e1a",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "12px",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>
                        Shoot Schedule Day
                      </label>
                      <input
                        type="text"
                        value={shootDay}
                        onChange={(e) => setShootDay(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          backgroundColor: "#0f0e1a",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "12px",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "12px",
                      backgroundColor: "rgba(168,85,247,0.06)",
                      border: "1px solid rgba(168,85,247,0.2)",
                      borderRadius: "8px",
                    }}
                  >
                    <div style={{ fontSize: "11px", color: "#e9d5ff", fontWeight: 700, marginBottom: "4px" }}>
                      LINKED SCRIPT SUPERVISOR NOTES
                    </div>
                    <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
                      Scene 42B is a direct cut from Scene 42A shot 11 days prior at Mehboob Studio. Hair length and face laceration must match precisely across cuts.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#d4af61", margin: "0 0 14px 0" }}>
                      Wardrobe Master Specifications
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#0f0e1a", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Wardrobe Serial</span>
                        <span style={{ color: "#ffffff", fontFamily: "monospace", fontWeight: 700 }}>OUTFIT-03-A (Duplicate B in standby)</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#0f0e1a", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Trench Coat Fabric</span>
                        <span style={{ color: "#ffffff", fontWeight: 600 }}>Waterproof Weathered Cotton (Charcoal)</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#0f0e1a", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Rain Wetness Level</span>
                        <span style={{ color: "#38bdf8", fontWeight: 600 }}>75% Saturation (Sprayed before roll)</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#0f0e1a", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Costume Supervisor</span>
                        <span style={{ color: "#d4af61", fontWeight: 600 }}>Pooja Sheth (Wardrobe Head)</span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "rgba(16,185,129,0.08)",
                      border: "1px solid rgba(16,185,129,0.25)",
                      borderRadius: "8px",
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <CheckCircle2 size={16} color="#10b981" />
                    <span style={{ fontSize: "11px", color: "#6ee7b7" }}>
                      Costume duplicate set B pre-conditioned and ready in actor vanity van.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: AI VISION MATCHER */}
          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Visual Comparator */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#c084fc", margin: "0 0 14px 0" }}>
                    Day-1 Baseline vs Day-14 Current Shot Matcher
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    {/* Day 1 */}
                    <div
                      style={{
                        backgroundColor: "#0f0e1a",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px",
                        padding: "12px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "10px", color: "#d4af61", fontWeight: 700, marginBottom: "6px" }}>
                        DAY 1 (BASELINE REFERENCE)
                      </div>
                      <div
                        style={{
                          height: "140px",
                          backgroundColor: "#161524",
                          borderRadius: "8px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#9ca3af",
                          fontSize: "11px",
                          border: "1px dashed rgba(255,255,255,0.15)",
                        }}
                      >
                        <Camera size={28} color="#a855f7" />
                        <span style={{ marginTop: "6px", color: "#ffffff", fontWeight: 600 }}>Master Take 03</span>
                        <span style={{ fontSize: "9px", color: "#6b7280" }}>10-Oct-2026 • 18:22 IST</span>
                      </div>
                    </div>

                    {/* Day 14 */}
                    <div
                      style={{
                        backgroundColor: "#0f0e1a",
                        border: "1px solid rgba(168,85,247,0.3)",
                        borderRadius: "10px",
                        padding: "12px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "10px", color: "#c084fc", fontWeight: 700, marginBottom: "6px" }}>
                        DAY 14 (PICKUP TEST)
                      </div>
                      <div
                        style={{
                          height: "140px",
                          backgroundColor: "#161524",
                          borderRadius: "8px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#9ca3af",
                          fontSize: "11px",
                          border: "1px dashed rgba(168,85,247,0.4)",
                        }}
                      >
                        <Eye size={28} color="#38bdf8" />
                        <span style={{ marginTop: "6px", color: "#ffffff", fontWeight: 600 }}>Live Feed Pickup</span>
                        <span style={{ fontSize: "9px", color: "#6ee7b7" }}>Match: {deltaTolerance}%</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={runAiVisionScan}
                    disabled={isScanning}
                    className="btn-cinema-gold"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {isScanning ? (
                      <>Analyzing Facial Stubble &amp; Fabric Fold Vectors...</>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        Run AI Computer Vision Delta Analysis
                      </>
                    )}
                  </button>
                </div>

                {/* AI Detection Breakdown */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#d4af61", margin: "0 0 14px 0" }}>
                      AI Vision Delta Analysis Metrics
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                          <span style={{ color: "#e5e7eb" }}>Facial Stubble Length (1.8mm target)</span>
                          <span style={{ color: "#10b981", fontWeight: 700 }}>99.2% • 1.85mm verified</span>
                        </div>
                        <div style={{ width: "100%", height: "6px", backgroundColor: "#1e1e2d", borderRadius: "999px" }}>
                          <div style={{ width: "99.2%", height: "100%", backgroundColor: "#10b981", borderRadius: "999px" }} />
                        </div>
                      </div>

                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                          <span style={{ color: "#e5e7eb" }}>Blood Splatter Geometry (Left Lapel)</span>
                          <span style={{ color: "#10b981", fontWeight: 700 }}>98.8% • Vector Aligned</span>
                        </div>
                        <div style={{ width: "100%", height: "6px", backgroundColor: "#1e1e2d", borderRadius: "999px" }}>
                          <div style={{ width: "98.8%", height: "100%", backgroundColor: "#10b981", borderRadius: "999px" }} />
                        </div>
                      </div>

                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                          <span style={{ color: "#e5e7eb" }}>Collar Fold &amp; Wet Saturation</span>
                          <span style={{ color: "#38bdf8", fontWeight: 700 }}>97.5% • Within Tolerance</span>
                        </div>
                        <div style={{ width: "100%", height: "6px", backgroundColor: "#1e1e2d", borderRadius: "999px" }}>
                          <div style={{ width: "97.5%", height: "100%", backgroundColor: "#38bdf8", borderRadius: "999px" }} />
                        </div>
                      </div>

                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                          <span style={{ color: "#e5e7eb" }}>Watch Dial Wrist Orientation</span>
                          <span style={{ color: "#c084fc", fontWeight: 700 }}>100% • Locked (Hole #3)</span>
                        </div>
                        <div style={{ width: "100%", height: "6px", backgroundColor: "#1e1e2d", borderRadius: "999px" }}>
                          <div style={{ width: "100%", height: "100%", backgroundColor: "#c084fc", borderRadius: "999px" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "12px",
                      backgroundColor: "rgba(168,85,247,0.08)",
                      border: "1px solid rgba(168,85,247,0.25)",
                      borderRadius: "10px",
                      marginTop: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <ShieldCheck size={20} color="#c084fc" />
                    <div>
                      <div style={{ fontSize: "11px", color: "#e9d5ff", fontWeight: 700 }}>
                        CONTINUITY CONFIDENCE SCORE: {deltaTolerance}%
                      </div>
                      <div style={{ fontSize: "10px", color: "#9ca3af" }}>
                        Zero perceptual discontinuity detected across sequential edits.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DISTRESS & PROPS */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Distress Checklist */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#c084fc", margin: "0 0 14px 0" }}>
                    On-Set Distress &amp; Prop Verification Markers
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {distressMarkers.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setDistressMarkers(
                            distressMarkers.map((x) =>
                              x.id === m.id ? { ...x, verified: !x.verified } : x
                            )
                          );
                        }}
                        style={{
                          padding: "12px 14px",
                          borderRadius: "10px",
                          backgroundColor: m.verified ? "rgba(168,85,247,0.12)" : "#0f0e1a",
                          border: m.verified ? "1px solid #a855f7" : "1px solid rgba(255,255,255,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <CheckCircle2 size={16} color={m.verified ? "#c084fc" : "#6b7280"} />
                          <span style={{ fontSize: "12px", color: m.verified ? "#ffffff" : "#9ca3af" }}>
                            {m.label}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "10px",
                            fontFamily: "monospace",
                            color: m.verified ? "#e9d5ff" : "#6b7280",
                            fontWeight: 700,
                          }}
                        >
                          {m.verified ? "VERIFIED" : "STANDBY"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Supervisor Sign-Off */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#d4af61", margin: "0 0 14px 0" }}>
                      Script Supervisor Digital Sign-Off
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#0f0e1a", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Script Supervisor</span>
                        <span style={{ color: "#ffffff", fontWeight: 600 }}>Nandita Sen (Guild Certified)</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#0f0e1a", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Make-Up &amp; Prosthetics Head</span>
                        <span style={{ color: "#ffffff", fontWeight: 600 }}>Vikram Gaikwad Studio</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#0f0e1a", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Roll Timestamp</span>
                        <span style={{ color: "#38bdf8", fontFamily: "monospace" }}>18:45:10 IST LOCKED</span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "12px",
                      backgroundColor: "rgba(16,185,129,0.08)",
                      border: "1px solid rgba(16,185,129,0.25)",
                      borderRadius: "10px",
                    }}
                  >
                    <div style={{ fontSize: "11px", color: "#6ee7b7", fontWeight: 700, marginBottom: "2px" }}>
                      READY FOR PRINCIPAL ROLL
                    </div>
                    <div style={{ fontSize: "10px", color: "#9ca3af" }}>
                      All continuity markers matched with Scene 42A. First Assistant Director may call camera roll.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SUPERVISOR LOCK & EXPORT */}
          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Official Certificate Card */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#c084fc", margin: "0 0 14px 0" }}>
                    Continuity Logbook Certification
                  </h3>

                  <div
                    style={{
                      background: "linear-gradient(135deg, #130f24 0%, #0a0815 100%)",
                      border: "1px solid rgba(168,85,247,0.35)",
                      borderRadius: "12px",
                      padding: "18px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ fontSize: "10px", color: "#d4af61", fontFamily: "monospace", letterSpacing: "0.15em", fontWeight: 700 }}>
                        OFFICIAL SCRIPT CONTINUITY LOG
                      </div>
                      <span
                        style={{
                          fontSize: "9px",
                          backgroundColor: "#10b981",
                          color: "#022c22",
                          fontWeight: 800,
                          padding: "2px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        APPROVED
                      </span>
                    </div>

                    <div style={{ fontSize: "17px", fontWeight: 800, color: "#ffffff", marginBottom: "4px" }}>
                      {defaultProject}
                    </div>
                    <div style={{ fontSize: "11px", color: "#c084fc", fontWeight: 600, marginBottom: "12px" }}>
                      Character: Kabir Singhania • {sceneCode}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "10px", color: "#9ca3af" }}>
                      <div>Continuity Tolerance: <strong style={{ color: "#ffffff" }}>{deltaTolerance}%</strong></div>
                      <div>Hair/Stubble Metric: <strong style={{ color: "#ffffff" }}>1.85mm Verified</strong></div>
                      <div>Wardrobe Distress Code: <strong style={{ color: "#ffffff" }}>OUTFIT-03-BLOOD</strong></div>
                      <div>Supervision Sign: <strong style={{ color: "#6ee7b7" }}>Nandita Sen, SWA</strong></div>
                    </div>
                  </div>

                  <div style={{ marginTop: "14px" }}>
                    <button
                      onClick={downloadContinuityBinder}
                      disabled={isExporting}
                      className="btn-cinema-gold"
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        fontSize: "12px",
                      }}
                    >
                      <Download size={14} />
                      {isExporting ? "Compiling Continuity Log..." : "Download Digital Continuity Binder (JSON)"}
                    </button>
                  </div>
                </div>

                {/* Edit Suite Sync */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#d4af61", margin: "0 0 14px 0" }}>
                      Post-Production Editorial Pipeline Sync
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#0f0e1a", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Avid / Premiere Metadata Push</span>
                        <span style={{ color: "#10b981", fontWeight: 600 }}>Active (ALE Marker Sync)</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#0f0e1a", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Color Grading CDL Ingest</span>
                        <span style={{ color: "#38bdf8", fontWeight: 600 }}>LUT Match (S-Log3 / Arri LogC)</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#0f0e1a", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>VFX Paint-Out Requirements</span>
                        <span style={{ color: "#e5e7eb", fontWeight: 600 }}>0 (Zero cleanup needed)</span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "rgba(168,85,247,0.08)",
                      border: "1px solid rgba(168,85,247,0.25)",
                      borderRadius: "8px",
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <CheckCircle2 size={16} color="#c084fc" />
                    <span style={{ fontSize: "11px", color: "#e9d5ff" }}>
                      Continuity photos embedded in editorial dailies package for director review.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: "16px 28px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#06050b",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "#6b7280" }}>
              Step {activeStep} of 4 • {steps[activeStep - 1].title}
            </span>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {activeStep > 1 && (
              <button
                onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#e5e7eb",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                ← Back
              </button>
            )}
            {activeStep < 4 ? (
              <button
                onClick={() => {
                  handleStepComplete(activeStep);
                  setActiveStep((prev) => Math.min(4, prev + 1));
                }}
                className="btn-cinema-gold"
                style={{
                  padding: "8px 20px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                Proceed to Step {activeStep + 1} →
              </button>
            ) : (
              <button
                onClick={onClose}
                className="btn-cinema-gold"
                style={{
                  padding: "8px 22px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                Lock Continuity &amp; Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
