"use client";

import { useState } from "react";
import {
  X,
  SlidersHorizontal,
  Video,
  HardDrive,
  CheckCircle2,
  Download,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Wifi,
  Film,
  FileSpreadsheet,
  ShieldCheck,
  Activity,
  ArrowRight,
  Eye,
} from "lucide-react";

interface DitLiveGradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function DitLiveGradeModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Unit 1 Principal Photography",
}: DitLiveGradeModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Wireless Ingest & Timecode Jamming
  const [activeCamera, setActiveCamera] = useState("Cam A (ARRI Alexa 35)");
  const [wirelessLink, setWirelessLink] = useState("Teradek Bolt 4K MAX (Zero Delay)");
  const [isJammingTc, setIsJammingTc] = useState(false);
  const [tcLocked, setTcLocked] = useState(true);
  const [timecodeStr, setTimecodeStr] = useState("10:42:18:21");

  // Step 2: Live CDL & Exposure Scopes
  const [falseColorMode, setFalseColorMode] = useState("EL ZONE (Stop-Based IRE)");
  const [liveCdlSlope, setLiveCdlSlope] = useState(1.08);
  const [liveCdlOffset, setLiveCdlOffset] = useState(-0.02);
  const [liveCdlSat, setLiveCdlSat] = useState(1.12);
  const [isApplyingLut, setIsApplyingLut] = useState(false);
  const [cdlApplied, setCdlApplied] = useState(true);

  // Step 3: QTAKE HD Assist & Playback
  const [selectedTake, setSelectedTake] = useState("Take 03 [DIRECTOR PRINT]");
  const [isPlayingTake, setIsPlayingTake] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState("1.0x Real-time");
  const [splitWipe, setSplitWipe] = useState(50);

  // Step 4: Bit-for-Bit Checksum & Turnaround
  const [checksumMethod, setChecksumMethod] = useState("xxHash64 + MD5 Dual-Verify");
  const [isOffloading, setIsOffloading] = useState(false);
  const [offloadProgress, setOffloadProgress] = useState(100);
  const [offloadVerified, setOffloadVerified] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const markStepComplete = (stepNum: number) => {
    if (!completedSteps.includes(stepNum)) {
      setCompletedSteps((prev) => [...prev, stepNum]);
    }
  };

  const handleJamTimecode = () => {
    setIsJammingTc(true);
    setTcLocked(false);
    setTimeout(() => {
      setIsJammingTc(false);
      setTcLocked(true);
      setTimecodeStr(
        `10:42:${String(Math.floor(Math.random() * 40) + 10).padStart(2, "0")}:${String(
          Math.floor(Math.random() * 24)
        ).padStart(2, "0")}`
      );
      markStepComplete(1);
    }, 1200);
  };

  const handleApplyCdl = () => {
    setIsApplyingLut(true);
    setCdlApplied(false);
    setTimeout(() => {
      setIsApplyingLut(false);
      setCdlApplied(true);
      markStepComplete(2);
    }, 1000);
  };

  const handleRunOffload = () => {
    setIsOffloading(true);
    setOffloadProgress(0);
    setOffloadVerified(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 25;
      setOffloadProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setIsOffloading(false);
        setOffloadVerified(true);
        markStepComplete(4);
      }
    }, 280);
  };

  const handleDownloadCdl = () => {
    const cdlXml = `<?xml version="1.0" encoding="UTF-8"?>
<ColorDecisionList xmlns="urn:ASC:CDL:v1.01">
  <ColorDecision>
    <ColorCorrection id="DIT_${activeCamera.replace(/[^a-zA-Z0-9]/g, "_")}">
      <SOPNode>
        <Slope>${liveCdlSlope.toFixed(3)} ${liveCdlSlope.toFixed(3)} ${liveCdlSlope.toFixed(3)}</Slope>
        <Offset>${liveCdlOffset.toFixed(3)} ${liveCdlOffset.toFixed(3)} ${liveCdlOffset.toFixed(3)}</Offset>
        <Power>1.000 1.000 1.000</Power>
      </SOPNode>
      <SatNode>
        <Saturation>${liveCdlSat.toFixed(3)}</Saturation>
      </SatNode>
    </ColorCorrection>
  </ColorDecision>
</ColorDecisionList>`;

    const blob = new Blob([cdlXml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ASC_CDL_${activeCamera.replace(/[^a-zA-Z0-9]/g, "_")}_${Date.now()}.cdl`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess("ASC CDL XML exported successfully for Dailies Colorist!");
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleDownloadOffloadManifest = () => {
    const csvContent = `Reel,Clip,Camera,Codec,Resolution,Duration,Bytes,xxHash64,MD5,OffloadStatus
A001,A001_C001_1030_001,ARRI Alexa 35,ARRIRAW 4.6K OpenGate,4608x3164,00:03:24:12,18874368000,a9f834b2c129e011,4c12bbd8e256f199b0021c,VERIFIED_MATCH
A001,A001_C002_1030_001,ARRI Alexa 35,ARRIRAW 4.6K OpenGate,4608x3164,00:01:45:00,9748480000,d821eef9012a44bb,e71299901adbb40023a887,VERIFIED_MATCH
B001,B001_C001_1030_001,Sony Venice 2,X-OCN XT Full Frame,8192x4320,00:03:24:12,24192000000,f711200389eef322,19aa7841bcdd76008123ef,VERIFIED_MATCH
B001,B001_C002_1030_001,Sony Venice 2,X-OCN XT Full Frame,8192x4320,00:02:12:08,15724800000,b8192aa00f2389cd,89ddaa102934ffeedd1123,VERIFIED_MATCH
`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Silverstack_DIT_Offload_Report_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess("Silverstack Offload Manifest CSV exported successfully!");
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="modal-backdrop">
      <div
        className="modal-panel"
        style={{
          maxWidth: "840px",
          width: "100%",
          background: "linear-gradient(180deg, #1c150c 0%, #0d0a07 100%)",
          border: "1px solid rgba(245, 158, 11, 0.35)",
          borderRadius: "24px",
          boxShadow: "0 25px 80px rgba(0,0,0,0.95), 0 0 50px rgba(245, 158, 11, 0.12)",
          overflow: "hidden",
        }}
      >
        {/* Top Amber Trim */}
        <div
          style={{
            height: "3px",
            width: "100%",
            background:
              "linear-gradient(90deg, transparent, #f59e0b 25%, #fde68a 50%, #f59e0b 75%, transparent)",
          }}
        />

        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 32px 20px 32px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "#140e07",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.05) 100%)",
                border: "1px solid rgba(245,158,11,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f59e0b",
              }}
            >
              <SlidersHorizontal size={24} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  letterSpacing: "0.15em",
                  color: "#f59e0b",
                  textTransform: "uppercase",
                }}
              >
                On-Set DIT &amp; Video Assist • Feature 73 • Process Complete
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  marginTop: "2px",
                }}
              >
                DIT Live Color Grading &amp; Wireless Video Assist Hub
              </h2>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                Production: <span style={{ color: "#f59e0b", fontWeight: 600 }}>{defaultProject}</span> • Pomfort Livegrade + QTAKE HD + Silverstack Lab
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Stepper Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            padding: "16px 32px",
            backgroundColor: "#0d0a07",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            gap: "12px",
          }}
        >
          {[
            { num: 1, label: "Wireless Ingest" },
            { num: 2, label: "Live CDL & Scope" },
            { num: 3, label: "QTAKE Assist" },
            { num: 4, label: "Checksum & Offload" },
          ].map((s) => {
            const isCompleted = completedSteps.includes(s.num);
            const isCurrent = activeStep === s.num;
            return (
              <button
                key={s.num}
                onClick={() => setActiveStep(s.num)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
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
                    fontSize: "12px",
                    fontWeight: "bold",
                    background: isCurrent
                      ? "#f59e0b"
                      : isCompleted
                      ? "rgba(245,158,11,0.2)"
                      : "rgba(255,255,255,0.05)",
                    color: isCurrent
                      ? "#291b05"
                      : isCompleted
                      ? "#f59e0b"
                      : "rgba(255,255,255,0.4)",
                    border: isCurrent
                      ? "none"
                      : isCompleted
                      ? "1px solid rgba(245,158,11,0.4)"
                      : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {isCompleted && !isCurrent ? "✓" : s.num}
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: isCurrent ? "600" : "400",
                    color: isCurrent ? "#f59e0b" : isCompleted ? "#ffffff" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div style={{ padding: "28px 32px", maxHeight: "60vh", overflowY: "auto" }}>
          {/* Step 1: Wireless Ingest */}
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Wifi size={22} color="#f59e0b" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#f59e0b" }}>
                    Step 1 Process: Multi-Cam Wireless Ingest &amp; Timecode Sync
                  </span>{" "}
                  Receive 10-bit 4:2:2 zero-delay video streams from camera transmitters directly into
                  the DIT master station cart with embedded audio and Ambient Master Lockit timecode.
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.7)",
                      marginBottom: "6px",
                      display: "block",
                    }}
                  >
                    Select Active Video Feed
                  </label>
                  <select
                    value={activeCamera}
                    onChange={(e) => setActiveCamera(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#1f170e",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="Cam A (ARRI Alexa 35)">Cam A (ARRI Alexa 35 - 4.6K OpenGate)</option>
                    <option value="Cam B (Sony Venice 2)">Cam B (Sony Venice 2 - 8.6K Full Frame)</option>
                    <option value="Cam C (RED V-Raptor XL)">Cam C (RED V-Raptor XL - 8K VV Crash Cam)</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.7)",
                      marginBottom: "6px",
                      display: "block",
                    }}
                  >
                    Wireless Transmitter Link Protocol
                  </label>
                  <select
                    value={wirelessLink}
                    onChange={(e) => setWirelessLink(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#1f170e",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="Teradek Bolt 4K MAX (Zero Delay)">Teradek Bolt 4K MAX (Zero Delay 5GHz / 6GHz)</option>
                    <option value="DJI Transmission High-Bright System">DJI Transmission High-Bright System (O3 Pro)</option>
                    <option value="Hollyland Pyro H 4K Ultra Link">Hollyland Pyro H 4K Ultra Broadcast Link</option>
                  </select>
                </div>
              </div>

              {/* Ingest signal health grid with Timecode Jam action */}
              <div
                style={{
                  backgroundColor: "#18120b",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    Live RF Wireless Signal &amp; SMPTE Timecode Lock
                  </div>
                  <button
                    onClick={handleJamTimecode}
                    disabled={isJammingTc}
                    style={{
                      background: "rgba(245,158,11,0.15)",
                      border: "1px solid rgba(245,158,11,0.3)",
                      color: "#f59e0b",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontWeight: 600,
                    }}
                  >
                    <RotateCcw size={13} className={isJammingTc ? "animate-spin" : ""} />
                    {isJammingTc ? "Jamming Master ACN Clock..." : "⏱️ Jam SMPTE Timecode (Lockit)"}
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#1f170e",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "10px",
                      padding: "12px",
                    }}
                  >
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>RF Signal RSSI</div>
                    <div style={{ fontSize: "16px", fontWeight: "bold", color: "#10b981", marginTop: "4px" }}>
                      -42 dBm (100% Solid)
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>Range: 450m LOS</div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#1f170e",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "10px",
                      padding: "12px",
                    }}
                  >
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Timecode Lock</div>
                    <div style={{ fontSize: "16px", fontWeight: "bold", color: "#f59e0b", marginTop: "4px" }}>
                      {timecodeStr}
                    </div>
                    <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>Ambient ACN Jammed</div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#1f170e",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "10px",
                      padding: "12px",
                    }}
                  >
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>SDI Signal Payload</div>
                    <div style={{ fontSize: "16px", fontWeight: "bold", color: "#ffffff", marginTop: "4px" }}>
                      12G-SDI 4:2:2 10-bit
                    </div>
                    <div style={{ fontSize: "11px", color: "#38bdf8", marginTop: "4px" }}>LogC4 / S-Gamut3.Cine</div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "10px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#10b981", display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle2 size={14} /> Zero packet loss • Sound Devices 32-bit float audio sync confirmed
                  </span>
                  <button
                    onClick={() => {
                      markStepComplete(1);
                      setActiveStep(2);
                    }}
                    style={{
                      background: "#f59e0b",
                      color: "#291b05",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Lock Video Feed &amp; Proceed to CDL <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Live CDL & Scope */}
          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <SlidersHorizontal size={22} color="#f59e0b" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#f59e0b" }}>
                    Step 2 Process: Pomfort Livegrade Studio ASC CDL Calibration
                  </span>{" "}
                  Adjust Slope, Offset, and Saturation in real time. Lut-boxes feed live calibrated looks
                  to the Director&apos;s and Cinematographer&apos;s OLED monitors without altering raw sensor negatives.
                </div>
              </div>

              {/* CDL Sliders */}
              <div
                style={{
                  backgroundColor: "#161009",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    ASC CDL Calibration Sliders (FSI BoxIO LUT Box Live Broadcast)
                  </div>
                  <button
                    onClick={handleApplyCdl}
                    disabled={isApplyingLut}
                    style={{
                      background: "rgba(245,158,11,0.15)",
                      border: "1px solid rgba(245,158,11,0.3)",
                      color: "#f59e0b",
                      padding: "4px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontWeight: 600,
                    }}
                  >
                    <RotateCcw size={12} className={isApplyingLut ? "animate-spin" : ""} />
                    {isApplyingLut ? "Broadcasting to OLEDs..." : "🎨 Broadcast Look to DP Monitor"}
                  </button>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "rgba(255,255,255,0.8)", marginBottom: "6px" }}>
                    <span>Slope (Highlights &amp; White Balance): <strong style={{ color: "#f59e0b" }}>{liveCdlSlope.toFixed(2)}</strong></span>
                    <button
                      onClick={() => setLiveCdlSlope(1.0)}
                      style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", background: "transparent", border: "none", cursor: "pointer" }}
                    >
                      Reset (1.00)
                    </button>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.3"
                    step="0.01"
                    value={liveCdlSlope}
                    onChange={(e) => setLiveCdlSlope(parseFloat(e.target.value))}
                    style={{ width: "100%", accentColor: "#f59e0b" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "rgba(255,255,255,0.8)", marginBottom: "6px" }}>
                    <span>Offset (Shadows &amp; Toe Lift): <strong style={{ color: "#f59e0b" }}>{liveCdlOffset.toFixed(2)}</strong></span>
                    <button
                      onClick={() => setLiveCdlOffset(0.0)}
                      style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", background: "transparent", border: "none", cursor: "pointer" }}
                    >
                      Reset (0.00)
                    </button>
                  </div>
                  <input
                    type="range"
                    min="-0.1"
                    max="0.1"
                    step="0.01"
                    value={liveCdlOffset}
                    onChange={(e) => setLiveCdlOffset(parseFloat(e.target.value))}
                    style={{ width: "100%", accentColor: "#f59e0b" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "rgba(255,255,255,0.8)", marginBottom: "6px" }}>
                    <span>Saturation (Color Vibrancy): <strong style={{ color: "#f59e0b" }}>{liveCdlSat.toFixed(2)}</strong></span>
                    <button
                      onClick={() => setLiveCdlSat(1.0)}
                      style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", background: "transparent", border: "none", cursor: "pointer" }}
                    >
                      Reset (1.00)
                    </button>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.01"
                    value={liveCdlSat}
                    onChange={(e) => setLiveCdlSat(parseFloat(e.target.value))}
                    style={{ width: "100%", accentColor: "#f59e0b" }}
                  />
                </div>
              </div>

              {/* Exposure system */}
              <div
                style={{
                  backgroundColor: "#161009",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.7)",
                      marginBottom: "6px",
                      display: "block",
                    }}
                  >
                    Exposure Monitoring Mode
                  </label>
                  <select
                    value={falseColorMode}
                    onChange={(e) => setFalseColorMode(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#1f170e",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="EL ZONE (Stop-Based IRE)">EL ZONE (Stop-Based Exposure by Ed Lachman ASC)</option>
                    <option value="ARRI LogC4 False Color">ARRI Standard LogC4 False Color (18% Grey Green)</option>
                    <option value="RGB Parade + Waveform">RGB Parade + 10-bit Vectorscope</option>
                    <option value="Zebra 70% Skin Tone">Zebra Striping (70% South Asian Skin Tone Highlight)</option>
                  </select>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingTop: "6px",
                  }}
                >
                  <button
                    onClick={() => {
                      markStepComplete(2);
                      setActiveStep(3);
                    }}
                    style={{
                      background: "#f59e0b",
                      color: "#291b05",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Confirm Grade &amp; Proceed to QTAKE <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: QTAKE Assist */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Video size={22} color="#f59e0b" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#f59e0b" }}>
                    Step 3 Process: QTAKE HD Video Assist &amp; Instant Review
                  </span>{" "}
                  Trigger automatic take recording, dual-camera synchronized split-screen review,
                  speed ramp playback (e.g. 150fps slow-motion check), and real-time chroma keying.
                </div>
              </div>

              {/* Video Assist Playback Console */}
              <div
                style={{
                  backgroundColor: "#140e07",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    QTAKE Live Playback Monitor ({selectedTake})
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      backgroundColor: "rgba(245,158,11,0.15)",
                      color: "#f59e0b",
                      border: "1px solid rgba(245,158,11,0.3)",
                    }}
                  >
                    ● AUTO-RECORD ARMED
                  </span>
                </div>

                <div
                  style={{
                    height: "140px",
                    backgroundColor: "#080503",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    border: "1px dashed rgba(245,158,11,0.3)",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <button
                      onClick={() => setIsPlayingTake(!isPlayingTake)}
                      style={{
                        background: "rgba(245,158,11,0.2)",
                        border: "1px solid rgba(245,158,11,0.5)",
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#f59e0b",
                        margin: "0 auto 8px auto",
                        cursor: "pointer",
                      }}
                    >
                      {isPlayingTake ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: "3px" }} />}
                    </button>
                    <div style={{ fontSize: "13px", color: "#ffffff", fontWeight: "600" }}>
                      Scene 42A - {selectedTake}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                      {isPlayingTake ? "▶ Playing in Sync: 00:01:24:18 / 00:03:12:00" : "❚❚ Paused on In-Point (Wipe Split Active)"}
                    </div>
                  </div>
                </div>

                {/* Take Selection and Playback speed */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "14px" }}>
                  <div>
                    <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "4px", display: "block" }}>
                      Select Active Take for Video Village
                    </label>
                    <select
                      value={selectedTake}
                      onChange={(e) => setSelectedTake(e.target.value)}
                      style={{
                        width: "100%",
                        backgroundColor: "#1f170e",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        color: "#ffffff",
                        fontSize: "12px",
                        outline: "none",
                      }}
                    >
                      <option value="Take 01">Scene 42A - Take 01 (Soft Focus)</option>
                      <option value="Take 02">Scene 42A - Take 02 (Mic Boom in Shot)</option>
                      <option value="Take 03 [DIRECTOR PRINT]">Scene 42A - Take 03 [DIRECTOR PRINT ★]</option>
                      <option value="Take 04">Scene 42A - Take 04 (Alternate Eyeline)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "4px", display: "block" }}>
                      Playback Speed Ramp
                    </label>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {["0.5x Slo-Mo", "1.0x Real-time", "2.0x Fast"].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setPlaybackSpeed(spd)}
                          style={{
                            flex: 1,
                            padding: "8px 4px",
                            borderRadius: "8px",
                            backgroundColor: playbackSpeed === spd ? "#f59e0b" : "#1f170e",
                            color: playbackSpeed === spd ? "#291b05" : "#ffffff",
                            fontSize: "11px",
                            fontWeight: 600,
                            border: "1px solid rgba(255,255,255,0.1)",
                            cursor: "pointer",
                          }}
                        >
                          {spd}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "12px" }}>
                  <div style={{ backgroundColor: "#1d140a", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Playback Speed</div>
                    <div style={{ fontSize: "14px", fontWeight: "bold", color: "#f59e0b" }}>{playbackSpeed}</div>
                  </div>
                  <div style={{ backgroundColor: "#1d140a", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Wipe / Mix Mode</div>
                    <div style={{ fontSize: "14px", fontWeight: "bold", color: "#ffffff" }}>50% Crossfade</div>
                  </div>
                  <div style={{ backgroundColor: "#1d140a", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>iPad Stream Cast</div>
                    <div style={{ fontSize: "14px", fontWeight: "bold", color: "#10b981" }}>6 Clients (QTAKE Cloud)</div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "12px",
                    paddingTop: "10px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <button
                    onClick={() => {
                      markStepComplete(3);
                      setActiveStep(4);
                    }}
                    style={{
                      background: "#f59e0b",
                      color: "#291b05",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Confirm Assist &amp; Proceed to Offload <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Checksum & Offload */}
          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <HardDrive size={22} color="#f59e0b" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#f59e0b" }}>
                    Step 4 Process: Silverstack Lab Bit-for-Bit Checksum Offload &amp; Delivery
                  </span>{" "}
                  Offload camera RAW cards simultaneously to RAID-5 Master, Clone A (Editorial), and
                  LTO-9 Tape with dual cryptographic checksum verification to prevent any corrupted frames.
                </div>
              </div>

              {downloadSuccess && (
                <div
                  style={{
                    backgroundColor: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.4)",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    color: "#10b981",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>{downloadSuccess}</span>
                </div>
              )}

              {/* Verification selection */}
              <div>
                <label
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.7)",
                    marginBottom: "6px",
                    display: "block",
                  }}
                >
                  Cryptographic Checksum Verification Algorithm
                </label>
                <select
                  value={checksumMethod}
                  onChange={(e) => setChecksumMethod(e.target.value)}
                  style={{
                    width: "100%",
                    backgroundColor: "#1f170e",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    color: "#ffffff",
                    fontSize: "13px",
                    outline: "none",
                  }}
                >
                  <option value="xxHash64 + MD5 Dual-Verify">xxHash64 + MD5 Dual-Verify (High Speed Cinema Standard)</option>
                  <option value="SHA-256 Military Grade">SHA-256 Cryptographic Standard (High Integrity)</option>
                  <option value="ASC MHL (Media Hash List)">ASC MHL (Media Hash List XML Manifest)</option>
                </select>
              </div>

              {/* Offload status table with Execute Offload button */}
              <div
                style={{
                  backgroundColor: "#140e07",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>
                    Day 18 Offload Progress: 1.42 TB / 1.42 TB (Dual-Verify Status)
                  </div>
                  <button
                    onClick={handleRunOffload}
                    disabled={isOffloading}
                    style={{
                      background: "rgba(245,158,11,0.15)",
                      border: "1px solid rgba(245,158,11,0.3)",
                      color: "#f59e0b",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontWeight: 600,
                    }}
                  >
                    <RotateCcw size={12} className={isOffloading ? "animate-spin" : ""} />
                    {isOffloading ? `Verifying Bits (${offloadProgress}%)...` : "💾 Execute Checksum Offload"}
                  </button>
                </div>

                {isOffloading && (
                  <div style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#f59e0b", marginBottom: "4px" }}>
                      <span>Calculating xxHash64 bit-for-bit hashes...</span>
                      <span>{offloadProgress}%</span>
                    </div>
                    <div style={{ width: "100%", height: "6px", backgroundColor: "#1e293b", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${offloadProgress}%`, height: "100%", backgroundColor: "#f59e0b", transition: "width 0.25s ease" }} />
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", backgroundColor: "#1f170e", borderRadius: "8px", fontSize: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <CheckCircle2 size={14} color="#10b981" />
                      <span style={{ color: "#ffffff" }}>Master RAID-5 NVMe (OWC Jellyfish)</span>
                    </div>
                    <span style={{ color: "#10b981", fontWeight: "600" }}>MATCH 100% (xxHash64)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", backgroundColor: "#1f170e", borderRadius: "8px", fontSize: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <CheckCircle2 size={14} color="#10b981" />
                      <span style={{ color: "#ffffff" }}>Editorial Clone Shuttle SSD (SanDisk Pro-Blade)</span>
                    </div>
                    <span style={{ color: "#10b981", fontWeight: "600" }}>MATCH 100% (MD5)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", backgroundColor: "#1f170e", borderRadius: "8px", fontSize: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <CheckCircle2 size={14} color="#10b981" />
                      <span style={{ color: "#ffffff" }}>LTO-9 Magnetic Archive Tape (Quantum)</span>
                    </div>
                    <span style={{ color: "#10b981", fontWeight: "600" }}>WRITTEN &amp; SEALED</span>
                  </div>
                </div>

                {offloadVerified && (
                  <div
                    style={{
                      marginTop: "16px",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <ShieldCheck size={20} color="#10b981" />
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#10b981" }}>DIT SESSION VERIFIED &amp; SECURE OFFLOAD COMPLETE</div>
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>1.42 TB camera RAW data bit-verified across 3 independent media destinations.</div>
                      </div>
                    </div>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "999px",
                        backgroundColor: "#10b981",
                        color: "#041e24",
                        fontSize: "11px",
                        fontWeight: "bold",
                      }}
                    >
                      SECURE MATCH
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                <button
                  onClick={handleDownloadCdl}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                    color: "#ffffff",
                    fontWeight: "600",
                    fontSize: "13px",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(245,158,11,0.3)",
                  }}
                >
                  <Download size={16} />
                  Export ASC CDL XML
                </button>

                <button
                  onClick={handleDownloadOffloadManifest}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    backgroundColor: "#1f170e",
                    border: "1px solid rgba(245,158,11,0.4)",
                    color: "#f59e0b",
                    fontWeight: "600",
                    fontSize: "13px",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                >
                  <FileSpreadsheet size={16} />
                  Export Offload Manifest (CSV)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 32px 24px 32px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "#0d0a07",
          }}
        >
          <button
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            style={{
              padding: "8px 18px",
              borderRadius: "10px",
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: activeStep === 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
              fontSize: "13px",
              cursor: activeStep === 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>

          <div style={{ display: "flex", gap: "10px" }}>
            {activeStep < 4 ? (
              <button
                onClick={() => {
                  markStepComplete(activeStep);
                  setActiveStep((prev) => Math.min(4, prev + 1));
                }}
                style={{
                  padding: "8px 22px",
                  borderRadius: "10px",
                  background: "#f59e0b",
                  border: "none",
                  color: "#291b05",
                  fontWeight: "600",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Next Step →
              </button>
            ) : (
              <button
                onClick={onClose}
                style={{
                  padding: "8px 22px",
                  borderRadius: "10px",
                  background: "#10b981",
                  border: "none",
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Close &amp; Complete Session
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
