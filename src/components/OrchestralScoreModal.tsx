"use client";

import { useState } from "react";
import {
  X,
  Music,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  ShieldCheck,
  Disc,
  Mic2,
  Volume2,
  Sliders,
  Layers,
  FileText,
} from "lucide-react";

interface OrchestralScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function OrchestralScoreModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Climactic Symphonic Suite",
}: OrchestralScoreModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Soundstage Setup
  const [soundstageVenue, setSoundstageVenue] = useState("Yash Raj Studios - Scoring Stage 1 (Mumbai)");
  const [orchestraSize, setOrchestraSize] = useState("64-Piece Symphony (Strings 32, Brass 16, Woodwinds 8, Percussion 8)");
  const [conductorName, setConductorName] = useState("Salim-Sulaiman / Prague Philharmonic Syndicate");
  const [tuningStandard, setTuningStandard] = useState("A440Hz Concert Standard (Pro Tools HDX Ingest)");

  // Step 2: DAW Stem Ingest
  const [sampleRate, setSampleRate] = useState("96kHz / 24-bit LPCM Multi-Track");
  const [micSetup, setMicSetup] = useState("Decca Tree (Neumann M50) + Outrigger Ribbons (Coles 4038)");
  const [stemChannels, setStemChannels] = useState(48);
  const [monitoringDac, setMonitoringDac] = useState("Grace Design m908 Theatrical Monitor Controller");

  // Step 3: Timecode & Picture Lock Cue Sync
  const [smpteTimecode, setSmpteTimecode] = useState("24.00 fps Drop-Frame (Picture Lock Reel 04)");
  const [cueName, setCueName] = useState("4M12_The_Final_Rooftop_Stand");
  const [cueDuration, setCueDuration] = useState("03:42:18");
  const [clickTrackTempo, setClickTrackTempo] = useState("134 BPM (4/4 Metric Shift to 6/8)");

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const downloadSessionSheetCSV = () => {
    setIsExporting(true);
    const csvContent = `Cue Code,Cue Title,Reel,Start Timecode,End Timecode,BPM,Meter,Orchestration Section,Stem Track,DAW Channel,Status
1M01,Prologue Cyber Dawn,Reel 1,01:00:00:00,01:02:45:12,92,4/4,Full Strings & French Horns,STRINGS_HIGH_L_R,CH_01_02,RECORDED_MASTER
1M02,Neon Alley Shadows,Reel 1,01:04:12:00,01:06:30:18,110,3/4,Cello Solo & Woodwinds,SOLO_CELLO_MIC_A,CH_03,RECORDED_MASTER
2M05,Protocol Breach Chase,Reel 2,01:22:15:00,01:26:10:04,142,7/8,Heavy Brass & Taiko Drums,PERC_TAIKO_SUB,CH_04_05,RECORDED_MASTER
3M08,Betrayal in Rain,Reel 3,01:45:00:00,01:48:22:16,78,4/4,Violin Ensemble & Harp,STRINGS_MID_L_R,CH_06_07,RECORDED_MASTER
4M12,The Final Rooftop Stand,Reel 4,02:10:14:00,02:13:56:18,134,6/8,Full Symphony 64-Piece,FULL_TUTTI_ORCH,CH_08_16,LOCKED_APPROVED`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ORCHESTRAL_SCORING_SESSION_${defaultProject.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExporting(false);
  };

  return (
    <div className="modal-backdrop">
      <div
        className="modal-panel"
        style={{
          maxWidth: "840px",
          width: "100%",
          background: "linear-gradient(180deg, #100f16 0%, #09090d 100%)",
          border: "1px solid rgba(212, 175, 97, 0.35)",
          borderRadius: "24px",
          boxShadow: "0 25px 80px rgba(0,0,0,0.95), 0 0 50px rgba(212, 175, 97, 0.12)",
          overflow: "hidden",
        }}
      >
        {/* Top Gold Trim */}
        <div style={{ height: "3px", background: "linear-gradient(90deg, #b89242 0%, #f7e7c4 50%, #b89242 100%)" }} />

        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(212, 175, 97, 0.2) 0%, rgba(212, 175, 97, 0.05) 100%)",
                border: "1px solid rgba(212, 175, 97, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#d4af61",
              }}
            >
              <Music size={20} />
            </div>
            <div>
              <h2 className="font-cinema" style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                Orchestral Score &amp; Live Soundstage Session Recorder
              </h2>
              <p style={{ fontSize: "11px", color: "#8e8e9e", margin: "2px 0 0 0", fontFamily: "monospace" }}>
                Active Score: <span style={{ color: "#d4af61" }}>{defaultProject}</span> • Pro Tools HDX 64-Track Multi-Stem
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "10px",
              padding: "8px",
              color: "#9a9aa8",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Multi-Step Tabs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          {[
            { num: 1, title: "Soundstage", icon: Music },
            { num: 2, title: "DAW Stems", icon: Sliders },
            { num: 3, title: "Picture Lock", icon: Disc },
            { num: 4, title: "Deliverables", icon: Download },
          ].map((s) => {
            const isCurrent = activeStep === s.num;
            const isCompleted = completedSteps.includes(s.num);
            const Icon = s.icon;
            return (
              <button
                key={s.num}
                onClick={() => setActiveStep(s.num)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "14px 10px",
                  background: isCurrent ? "rgba(212, 175, 97, 0.12)" : "transparent",
                  border: "none",
                  borderBottom: isCurrent ? "2px solid #d4af61" : "2px solid transparent",
                  cursor: "pointer",
                  color: isCurrent ? "#f7e7c4" : isCompleted ? "#34d399" : "#606070",
                  fontSize: "12px",
                  fontWeight: isCurrent ? 700 : 500,
                  transition: "all 0.2s",
                }}
              >
                {isCompleted && !isCurrent ? <Check size={14} /> : <Icon size={14} />}
                <span>{s.num}. {s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ maxHeight: "60vh", overflowY: "auto", padding: "24px" }}>
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(212, 175, 97, 0.08)", border: "1px solid rgba(212, 175, 97, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#f7e7c4", margin: 0, lineHeight: 1.5 }}>
                  Configure scoring stage acoustics, orchestra seating layout, and conductor click calibration for synchronizing live instruments with video playback.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Acoustic Soundstage &amp; Venue
                </label>
                <select
                  value={soundstageVenue}
                  onChange={(e) => setSoundstageVenue(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                >
                  <option value="Yash Raj Studios - Scoring Stage 1 (Mumbai)">Yash Raj Studios - Scoring Stage 1 (Mumbai - 120 Musician Volume)</option>
                  <option value="Abbey Road Studios - Studio One (London)">Abbey Road Studios - Studio One (London - Historic Warmth)</option>
                  <option value="Budapest Scoring Soundstage - Hungarian Symphony">Budapest Scoring Soundstage - Hungarian Symphony (Remote Live Session)</option>
                  <option value="Prague Philharmonic - Dvorak Hall">Prague Philharmonic - Dvorak Hall (Acoustic Grand Hall)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Orchestral Ensemble Scale
                </label>
                <input
                  type="text"
                  value={orchestraSize}
                  onChange={(e) => setOrchestraSize(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Conductor &amp; Music Director
                  </label>
                  <input
                    type="text"
                    value={conductorName}
                    onChange={(e) => setConductorName(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Concert Pitch Standard
                  </label>
                  <input
                    type="text"
                    value={tuningStandard}
                    onChange={(e) => setTuningStandard(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#bae6fd", margin: 0, lineHeight: 1.5 }}>
                  High-definition 96kHz multi-track stem routing for string sections, French horn clusters, cinematic taiko percussion, and soloists.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Sample Rate &amp; Depth
                  </label>
                  <input
                    type="text"
                    value={sampleRate}
                    onChange={(e) => setSampleRate(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Total Stem Channels
                  </label>
                  <input
                    type="number"
                    value={stemChannels}
                    onChange={(e) => setStemChannels(Number(e.target.value))}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Acoustic Tree &amp; Ambient Mic Array
                </label>
                <input
                  type="text"
                  value={micSetup}
                  onChange={(e) => setMicSetup(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>Active Multi-Track Monitoring</span>
                  <span style={{ fontSize: "11px", color: "#34d399", fontFamily: "monospace" }}>48/48 CH LOCKED</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                  {["STRINGS_HI", "STRINGS_LOW", "BRASS_HORNS", "BRASS_TUBA", "WOODWINDS", "TAIKO_PERC", "SOLO_CELLO", "ROOM_DECCA"].map((t) => (
                    <div key={t} style={{ padding: "8px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", fontFamily: "monospace", color: "#9a9aa8", textAlign: "center" }}>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#fde68a", margin: 0, lineHeight: 1.5 }}>
                  Lock cue hit-points against director picture edit. SMPTE drop-frame sync prevents drift during heavy 5.1/Dolby Atmos re-recording.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Picture Lock Cue Title
                </label>
                <input
                  type="text"
                  value={cueName}
                  onChange={(e) => setCueName(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    SMPTE Reel Timecode
                  </label>
                  <input
                    type="text"
                    value={smpteTimecode}
                    onChange={(e) => setSmpteTimecode(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Conductor Click Track (Tempo / Meter)
                  </label>
                  <input
                    type="text"
                    value={clickTrackTempo}
                    onChange={(e) => setClickTrackTempo(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <CheckCircle2 size={18} color="#34d399" />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#34d399" }}>Orchestral Score Session Ready For Sign-Off</span>
                </div>
                <p style={{ fontSize: "12px", color: "#a7f3d0", margin: 0, lineHeight: 1.5 }}>
                  All 48 multi-track stems have passed signal-to-noise ratio verification and SMPTE sub-frame sync. Ready for re-recording mixer handoff.
                </p>
              </div>

              <div style={{ padding: "18px", borderRadius: "14px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Master Format:</span>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>96kHz 24-bit 48-Track Pro Tools HDX</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Scoring Stage:</span>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>{soundstageVenue.split("-")[0]}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Conductor Sign-Off:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>VERIFIED &amp; CUE LOCKED</span>
                </div>
              </div>

              <button
                onClick={downloadSessionSheetCSV}
                className="btn-cinema-gold"
                style={{ width: "100%", height: "46px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <Download size={16} />
                <span>DOWNLOAD SCORING CUE LOG &amp; STEM SHEET (.CSV)</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            onClick={() => {
              if (activeStep > 1) setActiveStep(activeStep - 1);
            }}
            disabled={activeStep === 1}
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: activeStep === 1 ? "#404050" : "#ffffff",
              cursor: activeStep === 1 ? "not-allowed" : "pointer",
              fontSize: "12px",
            }}
          >
            Previous Step
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "11px", color: "#606070", fontFamily: "monospace" }}>
              STEP {activeStep} OF 4
            </span>
            {activeStep < 4 ? (
              <button
                onClick={() => {
                  handleStepComplete(activeStep);
                  setActiveStep(activeStep + 1);
                }}
                className="btn-cinema-gold"
                style={{ height: "38px", padding: "0 20px", fontSize: "12px" }}
              >
                Continue <ArrowRight size={14} style={{ marginLeft: "4px" }} />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="btn-cinema-gold"
                style={{ height: "38px", padding: "0 22px", fontSize: "12px" }}
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

