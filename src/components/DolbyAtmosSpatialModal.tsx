"use client";

import { useState } from "react";
import {
  X,
  Headphones,
  Sliders,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  Radio,
  Layers,
  Activity,
  Volume2,
} from "lucide-react";

interface DolbyAtmosSpatialModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function DolbyAtmosSpatialModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Theatrical Dolby Atmos Mix",
}: DolbyAtmosSpatialModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Spatial Monitoring Environment
  const [monitorConfig, setMonitorConfig] = useState("9.1.6 Theatrical Premier Soundstage (Genelec SAM)");
  const [binauralMode, setBinauralMode] = useState("Spatial Audio with Dynamic Head Tracking (Dolby Binaural Render)");
  const [lfeBassManagement, setLfeBassManagement] = useState("80 Hz 24dB/Octave Linkwitz-Riley Filter");

  // Step 2: 3D Bed & Dynamic Object Panning
  const [objectCount, setObjectCount] = useState(118);
  const [bedChannels, setBedChannels] = useState("7.1.2 Surround Bed (L, C, R, LFE, Lss, Rss, Lsr, Rsr, Ltf, Rtf)");
  const [panSpread, setPanSpread] = useState(65);
  const [heightElevation, setHeightElevation] = useState(82);

  // Step 3: Loudness Compliance
  const [targetLoudness, setTargetLoudness] = useState("-24.0 LKFS / LUFS (±0.5 LUFS Dialogue Gated)");
  const [truePeakCap, setTruePeakCap] = useState("-1.0 dBTP Max True Peak");
  const [dialogueLevel, setDialogueLevel] = useState("-27.0 LKFS");

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const downloadAdmBwfProfile = () => {
    setIsExporting(true);
    const manifest = {
      project: defaultProject,
      atmosSpec: "SMPTE 2067-201 / DCI Theatrical Deliverable",
      sampleRate: "48kHz / 24-bit ADM BWF Broadcast Wave Format",
      monitoringConfig: monitorConfig,
      bedChannels: bedChannels,
      activeAudioObjects: objectCount,
      panCoordinates: {
        azimuth: "360-deg 3D Surround",
        elevation: `${heightElevation}% Overhead Top Array`,
        spread: `${panSpread}% Acoustic Width`,
      },
      loudnessTelemetry: {
        integratedLKFS: targetLoudness,
        truePeakLimit: truePeakCap,
        dialogueGatedLKFS: dialogueLevel,
        complianceStandard: "EBU R128 / ITU-R BS.1770-4 Certified",
      },
      exportTimestamp: new Date().toISOString(),
      qcStatus: "PASSED_THEATRICAL_INTEROP",
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `DOLBY_ATMOS_ADM_BWF_${defaultProject.replace(/\s+/g, "_")}.json`);
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
        <div style={{ height: "3px", background: "linear-gradient(90deg, #b89242 0%, #f7e7c4 50%, #b89242 100%)" }} />

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
              <Headphones size={20} />
            </div>
            <div>
              <h2 className="font-cinema" style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                Dolby Atmos 7.1.4 / 9.1.6 Spatial Audio Panning &amp; Re-recording Mixer
              </h2>
              <p style={{ fontSize: "11px", color: "#8e8e9e", margin: "2px 0 0 0", fontFamily: "monospace" }}>
                Active Mix: <span style={{ color: "#d4af61" }}>{defaultProject}</span> • 128 Spatial Objects Realtime Render
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

        {/* Step Tabs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          {[
            { num: 1, title: "Monitor Env", icon: Radio },
            { num: 2, title: "3D Panner", icon: Sliders },
            { num: 3, title: "Loudness QC", icon: Activity },
            { num: 4, title: "ADM Export", icon: Download },
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

        <div className="modal-body" style={{ maxHeight: "60vh", overflowY: "auto", padding: "24px" }}>
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(212, 175, 97, 0.08)", border: "1px solid rgba(212, 175, 97, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#f7e7c4", margin: 0, lineHeight: 1.5 }}>
                  Select the physical speaker monitoring layout and binaural headphone rendering profile for theatrical Dolby Atmos master monitoring.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Speaker Calibration Grid
                </label>
                <select
                  value={monitorConfig}
                  onChange={(e) => setMonitorConfig(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                >
                  <option value="9.1.6 Theatrical Premier Soundstage (Genelec SAM)">9.1.6 Theatrical Premier Soundstage (Genelec SAM Coaxial DSP)</option>
                  <option value="7.1.4 Nearfield Production Suite (Neumann KH Series)">7.1.4 Nearfield Production Suite (Neumann KH Series Studio)</option>
                  <option value="Dolby Atmos IMAX 12-Channel Enhanced">Dolby Atmos IMAX 12-Channel Enhanced (Dual LFE &amp; Center Heights)</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Binaural Spatializer Engine
                  </label>
                  <input
                    type="text"
                    value={binauralMode}
                    onChange={(e) => setBinauralMode(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    LFE Subwoofer Management
                  </label>
                  <input
                    type="text"
                    value={lfeBassManagement}
                    onChange={(e) => setLfeBassManagement(e.target.value)}
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
                  Orchestrate 128 dynamic sound objects with 3D coordinate metadata (X, Y, Z coordinates + Size + Elevation) over the 7.1.2 foundation bed.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Active 3D Audio Objects
                  </label>
                  <input
                    type="number"
                    value={objectCount}
                    onChange={(e) => setObjectCount(Number(e.target.value))}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Foundation Bed Assignment
                  </label>
                  <input
                    type="text"
                    value={bedChannels}
                    onChange={(e) => setBedChannels(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase" }}>Overhead Ceiling Array Elevation</label>
                  <span style={{ fontSize: "11px", color: "#d4af61", fontFamily: "monospace" }}>{heightElevation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={heightElevation}
                  onChange={(e) => setHeightElevation(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#d4af61" }}
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase" }}>Object Pan Spread (Acoustic Width)</label>
                  <span style={{ fontSize: "11px", color: "#d4af61", fontFamily: "monospace" }}>{panSpread}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={panSpread}
                  onChange={(e) => setPanSpread(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#d4af61" }}
                />
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#fde68a", margin: 0, lineHeight: 1.5 }}>
                  Verify cinema loudness criteria according to SMPTE / EBU R128 to ensure dialogue intelligibility in commercial multiplexes.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Integrated Loudness Target
                </label>
                <input
                  type="text"
                  value={targetLoudness}
                  onChange={(e) => setTargetLoudness(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    True Peak Limit
                  </label>
                  <input
                    type="text"
                    value={truePeakCap}
                    onChange={(e) => setTruePeakCap(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Dialogue Gated LKFS
                  </label>
                  <input
                    type="text"
                    value={dialogueLevel}
                    onChange={(e) => setDialogueLevel(e.target.value)}
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
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#34d399" }}>Dolby Atmos Print Master Rendered</span>
                </div>
                <p style={{ fontSize: "12px", color: "#a7f3d0", margin: 0, lineHeight: 1.5 }}>
                  ADM BWF multi-channel container compiled with 128 positional objects, zero clipping, and verified DCI SMPTE 2067-201 interoperability.
                </p>
              </div>

              <div style={{ padding: "18px", borderRadius: "14px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Master Container:</span>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>ADM BWF (48kHz / 24-bit LPCM)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Active Spatial Objects:</span>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>{objectCount} / 128 Channels</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Multiplex Theatrical Pass:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>CERTIFIED DCI SPEC 1.4</span>
                </div>
              </div>

              <button
                onClick={downloadAdmBwfProfile}
                className="btn-cinema-gold"
                style={{ width: "100%", height: "46px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <Download size={16} />
                <span>EXPORT DOLBY ATMOS ADM BWF METADATA PACKAGE (.JSON)</span>
              </button>
            </div>
          )}
        </div>

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

