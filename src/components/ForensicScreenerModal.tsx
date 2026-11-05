"use client";

import { useState } from "react";
import {
  X,
  ShieldAlert,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  Eye,
  Lock,
  Tv,
  Film,
  AlertTriangle,
  Play,
} from "lucide-react";

interface ForensicScreenerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function ForensicScreenerModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Work-in-Progress Festival Screener",
}: ForensicScreenerModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Recipient & Screener Profile
  const [screenerRecipient, setScreenerRecipient] = useState("Festival Jury Head - Cannes Marché VIP Buyer");
  const [recipientEmail, setRecipientEmail] = useState("christian.jeune@cannes-marche.fr");
  const [watermarkVisibility, setWatermarkVisibility] = useState("Dual Layer: High-Contrast Visual Overlay + Invisible Forensic Steganography");
  const [screenerAccessDurationHours, setScreenerAccessDurationHours] = useState(48);

  // Step 2: Forensic DNA & Anti-Screen Capture
  const [pixelDnaFingerprint, setPixelDnaFingerprint] = useState("SHA-512 Micro-Luma Modulation (Undetectable to Human Eye)");
  const [antiScreenCaptureGuard, setAntiScreenCaptureGuard] = useState(true);
  const [screenRecordingBlanking, setScreenRecordingBlanking] = useState(true);
  const [hdcpComplianceLevel, setHdcpComplianceLevel] = useState("HDCP 2.3 Strict Hardware DRM Enforcement");

  // Step 3: Leak Tracing & Forensic Probe
  const [simulatedLeakDetected, setSimulatedLeakDetected] = useState(false);
  const [leakOriginTimestamp, setLeakOriginTimestamp] = useState("Reel 02 - 01:14:22:08 (IP: 194.204.112.44 Nice, France)");
  const [geoFencedPlaybackRange, setGeoFencedPlaybackRange] = useState("Geofenced: Palais des Festivals, Cannes, France (Radius: 5 km)");

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const downloadScreenerSecurityManifest = () => {
    setIsExporting(true);
    const csvContent = `Token ID,Recipient Name,Affiliation,Recipient Email,Screener Reel,Access Expiry (UTC),Watermark Type,Forensic Pixel DNA,Geofence Coordinate,DRM License Key,Status
TOK-CANNES-981,Christian Jeune,Cannes Jury Selection,christian.jeune@cannes-marche.fr,Full Workprint 4K HDR,48 Hours,Dual Visual + Invisible,DNA-MOD-8819204,43.5528° N 7.0174° E (Cannes),CINE-DRM-RSA4096-01,ACTIVE_STREAMING
TOK-NEON-982,Elissa Federoff,NEON Acquisitions,elissa@neonrated.com,Full Workprint 4K HDR,24 Hours,Dual Visual + Invisible,DNA-MOD-8819205,40.7128° N 74.0060° W (NYC),CINE-DRM-RSA4096-02,ACTIVE_STREAMING
TOK-A24-983,Noah Sacco,A24 Film Distribution,noah@a24films.com,Full Workprint 4K HDR,36 Hours,Dual Visual + Invisible,DNA-MOD-8819206,34.0522° N 118.2437° W (LA),CINE-DRM-RSA4096-03,ACTIVE_STREAMING
TOK-BERLIN-984,Carlo Chatrian,Berlinale Director,carlo.c@berlinale.de,Full Workprint 4K HDR,48 Hours,Dual Visual + Invisible,DNA-MOD-8819207,52.5200° N 13.4050° E (Berlin),CINE-DRM-RSA4096-04,ACTIVE_STREAMING`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `FORENSIC_SCREENER_SECURITY_LOG_${defaultProject.replace(/\s+/g, "_")}.csv`);
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
              <ShieldAlert size={20} />
            </div>
            <div>
              <h2 className="font-cinema" style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                Anti-Piracy Forensic Screener &amp; DRM Tokenizer
              </h2>
              <p style={{ fontSize: "11px", color: "#8e8e9e", margin: "2px 0 0 0", fontFamily: "monospace" }}>
                Active Motion Picture: <span style={{ color: "#d4af61" }}>{defaultProject}</span> • Zero-Trust Forensic Steganography
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          {[
            { num: 1, title: "Screener Auth", icon: Lock },
            { num: 2, title: "Pixel DNA", icon: Eye },
            { num: 3, title: "Leak Probe", icon: AlertTriangle },
            { num: 4, title: "Token Vault", icon: Download },
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
                  Issue time-bombed, encrypted screening access tokens to A-list film festival programmers, studio executives, and sales buyers.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Designated Screener Recipient
                </label>
                <input
                  type="text"
                  value={screenerRecipient}
                  onChange={(e) => setScreenerRecipient(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Verified Recipient Email
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Expiring Access Window (Hours)
                  </label>
                  <input
                    type="number"
                    value={screenerAccessDurationHours}
                    onChange={(e) => setScreenerAccessDurationHours(Number(e.target.value))}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Watermark Security Mode
                </label>
                <input
                  type="text"
                  value={watermarkVisibility}
                  onChange={(e) => setWatermarkVisibility(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#bae6fd", margin: 0, lineHeight: 1.5 }}>
                  Imperceptible forensic pixel DNA is modulated directly into the luma channel across every video frame. Even camcorders or smartphone recordings will permanently capture the leak fingerprint.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Forensic Steganography Algorithm
                </label>
                <input
                  type="text"
                  value={pixelDnaFingerprint}
                  onChange={(e) => setPixelDnaFingerprint(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Hardware HDCP Handshake Enforcement
                </label>
                <input
                  type="text"
                  value={hdcpComplianceLevel}
                  onChange={(e) => setHdcpComplianceLevel(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "16px", borderRadius: "12px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", color: "#ffffff", fontSize: "13px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={antiScreenCaptureGuard}
                    onChange={(e) => setAntiScreenCaptureGuard(e.target.checked)}
                    style={{ accentColor: "#d4af61", cursor: "pointer" }}
                  />
                  <span>Activate OS-level screen capture blanking (macOS Quartz / Windows DWM black-out)</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", color: "#ffffff", fontSize: "13px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={screenRecordingBlanking}
                    onChange={(e) => setScreenRecordingBlanking(e.target.checked)}
                    style={{ accentColor: "#d4af61", cursor: "pointer" }}
                  />
                  <span>Dynamic moving semi-transparent IP watermark bouncing across 9 screen quadrants</span>
                </label>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#fde68a", margin: 0, lineHeight: 1.5 }}>
                  Forensic probe simulator: extract pixel DNA from leaked clips or mobile cam captures to instantly identify the exact person, machine IP, and timestamp responsible.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Geofenced Playback Boundary
                </label>
                <input
                  type="text"
                  value={geoFencedPlaybackRange}
                  onChange={(e) => setGeoFencedPlaybackRange(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ padding: "16px", borderRadius: "14px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>Forensic Leak Detection Probe</span>
                  <button
                    onClick={() => setSimulatedLeakDetected(!simulatedLeakDetected)}
                    style={{
                      fontSize: "11px",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      backgroundColor: simulatedLeakDetected ? "rgba(239,68,68,0.2)" : "rgba(212,175,97,0.2)",
                      border: simulatedLeakDetected ? "1px solid #ef4444" : "1px solid #d4af61",
                      color: simulatedLeakDetected ? "#fca5a5" : "#f7e7c4",
                      cursor: "pointer",
                    }}
                  >
                    {simulatedLeakDetected ? "RESET PROBE" : "RUN SIMULATED LEAK TRACE"}
                  </button>
                </div>
                {simulatedLeakDetected ? (
                  <div style={{ padding: "12px", borderRadius: "8px", backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <AlertTriangle size={16} color="#ef4444" />
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#fca5a5" }}>POSITIVE LEAK MATCH DETECTED</span>
                    </div>
                    <p style={{ fontSize: "11px", color: "#fca5a5", margin: 0, fontFamily: "monospace" }}>
                      Source identified: {leakOriginTimestamp} • Token Revoked Automatically
                    </p>
                  </div>
                ) : (
                  <p style={{ fontSize: "12px", color: "#8e8e9e", margin: 0 }}>
                    No unauthorized stream captures detected. 4 active tokens monitored across Cannes, NYC, and Berlin.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <CheckCircle2 size={18} color="#34d399" />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#34d399" }}>Forensic Screener Token Generated</span>
                </div>
                <p style={{ fontSize: "12px", color: "#a7f3d0", margin: 0, lineHeight: 1.5 }}>
                  Encrypted 4K screener link active for 48 hours. Zero-trust pixel steganography verified and geofenced to Cannes VIP hub.
                </p>
              </div>

              <div style={{ padding: "18px", borderRadius: "14px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Assigned VIP:</span>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>{screenerRecipient.split("-")[0]}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>DRM License Protection:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>RSA-4096 / HDCP 2.3 HARDWARE LOCKED</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Forensic Steganography:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>PIXEL DNA EMBEDDED</span>
                </div>
              </div>

              <button
                onClick={downloadScreenerSecurityManifest}
                className="btn-cinema-gold"
                style={{ width: "100%", height: "46px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <Download size={16} />
                <span>DOWNLOAD FORENSIC SCREENER TOKEN LOG (.CSV)</span>
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
