"use client";

import { useState } from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  MessageSquare,
  Wand2,
  Flame,
  Volume2,
  Sliders,
  FileText,
  RefreshCw,
  Eye,
  Layers,
} from "lucide-react";

interface ScriptDialoguePunchUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function ScriptDialoguePunchUpModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Scene 42 Climax Dialogue Punch-Up",
}: ScriptDialoguePunchUpModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Scene & Character Objectives
  const [sceneHeading, setSceneHeading] = useState("SCENE 42 - INT. KASHMIR SAFEHOUSE - NIGHT");
  const [characterA, setCharacterA] = useState("KABIR RATHORE (Age 52, Rogue Specialist)");
  const [characterB, setCharacterB] = useState("COL. VIKRAM ROY (Age 61, Intelligence Director)");
  const [sceneDramaticTension, setSceneDramaticTension] = useState("Psychological Standoff: Accusation of treason masked as polite military protocol");

  // Step 2: Subtext & Exposition Heatmap
  const [originalDraftSnippet, setOriginalDraftSnippet] = useState(
    `KABIR: You lied to me about the Srinagar convoy. You sent my unit into an ambush because you wanted the treaty signed.\nROY: I did what was required for national interest, Kabir. You were never meant to survive that night.`
  );
  const [punchedUpSnippet, setPunchedUpSnippet] = useState(
    `KABIR: (calm, voice barely a whisper)\nThe tea is cold, Vikram.\nROY: (doesn't look up from file)\nThen don't drink it.\nKABIR:\nJust like the convoy orders? Left on the table... until someone bled?\nROY: (finally looks into his eyes)\nSome men are paid to build nations, Kabir. Others are paid to be buried under the foundation.`
  );
  const [subtextTensionScore, setSubtextTensionScore] = useState(94);
  const [expositionReductionScore, setExpositionReductionScore] = useState(88);

  // Step 3: Dialect & Cultural Idiom Nuance
  const [dialectFlavor, setDialectFlavor] = useState("Restrained Army Urdu-Hindi with bureaucratic cynicism");
  const [pacingCadence, setPacingCadence] = useState("Staccato short bursts with heavy pauses (beats)");
  const [subtextClichéFilter, setSubtextClichéFilter] = useState(true);

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const handleDownloadRevision = () => {
    setIsExporting(true);
    const punchUpData = {
      project: defaultProject,
      sceneMetadata: {
        sceneHeading,
        characters: [characterA, characterB],
        sceneDramaticObjective: sceneDramaticTension,
      },
      sentimentMetrics: {
        subtextTensionIndex: `${subtextTensionScore}/100 (Elite Dramatic Weight)`,
        expositionReduction: `${expositionReductionScore}% (Eliminated On-The-Nose Tropes)`,
        dialectNuance: dialectFlavor,
        rhythmicPacing: pacingCadence,
      },
      dialogueRevisions: {
        originalDraft: originalDraftSnippet,
        punchedUpDraft: punchedUpSnippet,
      },
      writerStamp: "Rangmanch AI Dramatic Subtext Engine v4.2 (Standard Final Draft FDX Compliant)",
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(punchUpData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Dialogue_PunchUp_${sceneHeading.replace(/[^a-zA-Z0-9]/g, "_")}.json`;
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
              <Wand2 size={26} />
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
                  AI Screenplay Dialogue Punch-Up &amp; Subtext Sentiment Studio
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
                  FEATURE 101
                </span>
              </div>
              <p
                style={{
                  color: "#9e9e90",
                  fontSize: "13px",
                  margin: "4px 0 0 0",
                }}
              >
                Subtext Heatmap • Exposition Stripper • Dialect Cadence Authenticator • Side-by-Side Screenplay Revision
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
            { step: 1, title: "1. Scene Objectives", desc: "Character Subtext", icon: MessageSquare },
            { step: 2, title: "2. Punch-Up Studio", desc: "Subtext vs Exposition", icon: Wand2 },
            { step: 3, title: "3. Dialect & Cadence", desc: "Pacing & Idioms", icon: Volume2 },
            { step: 4, title: "4. Script Revision", desc: "Screenplay Export", icon: FileText },
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
          {/* STEP 1: SCENE OBJECTIVES */}
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
                    Active Scene Project
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginTop: "2px" }}>
                    {defaultProject}
                  </div>
                </div>
                <div
                  style={{
                    padding: "6px 14px",
                    borderRadius: "20px",
                    backgroundColor: "rgba(46, 125, 50, 0.15)",
                    border: "1px solid rgba(76, 175, 80, 0.4)",
                    color: "#81c784",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  Subtext Sentiment Engine Active
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                  Screenplay Scene Slugline / Heading
                </label>
                <input
                  type="text"
                  value={sceneHeading}
                  onChange={(e) => setSceneHeading(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: "#161513",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    color: "#eee",
                    fontSize: "13px",
                    outline: "none",
                    fontFamily: "monospace",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Character A (Protagonist / Speaker)
                  </label>
                  <input
                    type="text"
                    value={characterA}
                    onChange={(e) => setCharacterA(e.target.value)}
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
                    Character B (Antagonist / Interlocutor)
                  </label>
                  <input
                    type="text"
                    value={characterB}
                    onChange={(e) => setCharacterB(e.target.value)}
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
                  Underlying Dramatic Objective &amp; Unspoken Subtext
                </label>
                <textarea
                  value={sceneDramaticTension}
                  onChange={(e) => setSceneDramaticTension(e.target.value)}
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
                  RUN SUBTEXT PUNCH-UP <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PUNCH-UP STUDIO */}
          {activeStep === 2 && (
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
                  <Flame size={20} color="#d4af37" />
                  <h4 style={{ margin: 0, color: "#fff", fontSize: "15px" }}>
                    Subtext Elevation &amp; On-The-Nose Exposition Stripping
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "12px", color: "#a0a095" }}>
                  Transforms literal plot explanations into electric subtext, pregnant pauses, and character-driven psychological tension.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <label style={{ fontSize: "13px", color: "#ffb74d", fontWeight: 600 }}>
                      Original Draft (Literal / Expository)
                    </label>
                    <span style={{ fontSize: "10px", color: "#888", fontFamily: "monospace" }}>NEEDS PUNCH-UP</span>
                  </div>
                  <textarea
                    value={originalDraftSnippet}
                    onChange={(e) => setOriginalDraftSnippet(e.target.value)}
                    rows={6}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "#12100d",
                      border: "1px solid rgba(255, 152, 0, 0.3)",
                      color: "#bbb",
                      fontSize: "12px",
                      fontFamily: "monospace",
                      lineHeight: 1.5,
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <label style={{ fontSize: "13px", color: "#81c784", fontWeight: 600 }}>
                      Punched-Up Master Draft (High Subtext)
                    </label>
                    <span style={{ fontSize: "10px", color: "#81c784", fontWeight: 700, fontFamily: "monospace" }}>SUBTEXT: 94/100</span>
                  </div>
                  <textarea
                    value={punchedUpSnippet}
                    onChange={(e) => setPunchedUpSnippet(e.target.value)}
                    rows={6}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "#080c09",
                      border: "1px solid rgba(76, 175, 80, 0.4)",
                      color: "#eee",
                      fontSize: "12px",
                      fontFamily: "monospace",
                      lineHeight: 1.5,
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div style={{ padding: "14px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,175,55,0.2)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "12px", color: "#d4af37", fontWeight: 600 }}>Subtext Tension Index</span>
                    <span style={{ fontSize: "12px", color: "#81c784", fontWeight: 700 }}>{subtextTensionScore}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={subtextTensionScore}
                    onChange={(e) => setSubtextTensionScore(parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: "#d4af37", marginTop: "8px" }}
                  />
                </div>

                <div style={{ padding: "14px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,175,55,0.2)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "12px", color: "#d4af37", fontWeight: 600 }}>Exposition Stripping Rate</span>
                    <span style={{ fontSize: "12px", color: "#81c784", fontWeight: 700 }}>{expositionReductionScore}% Clean</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={expositionReductionScore}
                    onChange={(e) => setExpositionReductionScore(parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: "#d4af37", marginTop: "8px" }}
                  />
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
                  BACK TO OBJECTIVES
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
                  DIALECT &amp; CADENCE TUNING <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DIALECT & CADENCE */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Regional Dialect &amp; Vocabulary Authenticity
                  </label>
                  <input
                    type="text"
                    value={dialectFlavor}
                    onChange={(e) => setDialectFlavor(e.target.value)}
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
                    Pacing &amp; Rhythmic Delivery Pattern
                  </label>
                  <input
                    type="text"
                    value={pacingCadence}
                    onChange={(e) => setPacingCadence(e.target.value)}
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
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#81c784" }}>
                    Cliché Auto-Filter Active
                  </div>
                  <div style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>
                    Screenplay purged of tired melodrama idioms and generic villain exposition.
                  </div>
                </div>
                <span style={{ fontSize: "11px", color: "#d4af37", fontFamily: "monospace", fontWeight: 700 }}>
                  NATURALISTIC RATIO: 98%
                </span>
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
                  BACK TO PUNCH-UP
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
                  REVIEW REVISION &amp; EXPORT <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SCRIPT REVISION EXPORT */}
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
                  <FileText size={22} color="#d4af37" />
                  <h4 style={{ margin: 0, color: "#fff", fontSize: "16px" }}>
                    Final Draft Screenplay Revision Ready for Table Read &amp; Shoot
                  </h4>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginTop: "14px" }}>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>Subtext Rating</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#81c784", marginTop: "2px" }}>94/100 (Oscar Caliber)</div>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>Exposition Cuts</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#d4af37", marginTop: "2px" }}>-42 Expository Words</div>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>FDX Integration</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginTop: "2px" }}>Direct Table Read Sync</div>
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
                  BACK TO CADENCE
                </button>
                <button
                  onClick={handleDownloadRevision}
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
                  {isExporting ? "PACKAGING SCRIPT REVISION..." : "DOWNLOAD PUNCHED-UP SCREENPLAY (FDX/JSON)"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

