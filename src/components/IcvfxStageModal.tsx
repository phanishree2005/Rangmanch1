"use client";

import { useState } from "react";
import {
  X,
  Layers,
  Camera,
  Cpu,
  MonitorCheck,
  CheckCircle2,
  Download,
  AlertCircle,
  Play,
  RotateCcw,
  Sliders,
  Wifi,
  Radio,
  Zap,
  ShieldCheck,
  Activity,
  ArrowRight,
  Check,
} from "lucide-react";

interface IcvfxStageModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function IcvfxStageModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Cyber City Set",
}: IcvfxStageModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Volume & nDisplay
  const [wallPitch, setWallPitch] = useState("ROE Visual Black Pearl 2.8mm");
  const [genlockSync, setGenlockSync] = useState("24.00 fps Tri-Level Locked");
  const [isSimulatingPing, setIsSimulatingPing] = useState(false);
  const [pingSuccess, setPingSuccess] = useState(true);

  // Step 2: Optical Tracking
  const [trackingSystem, setTrackingSystem] = useState("Mo-Sys StarTracker Gen 3");
  const [frustumLatency, setFrustumLatency] = useState("1.8 frames (Opti-Sync)");
  const [focalLength, setFocalLength] = useState(35);
  const [focusDistance, setFocusDistance] = useState(4.8);
  const [isCalibratingTracking, setIsCalibratingTracking] = useState(false);
  const [trackingCalibrated, setTrackingCalibrated] = useState(true);

  // Step 3: Lighting & ACEScg
  const [colorSpace, setColorSpace] = useState("ACEScg (AP1 Primaries)");
  const [dmxLinkActive, setDmxLinkActive] = useState(true);
  const [redPhosphorTrim, setRedPhosphorTrim] = useState(99.2);
  const [greenPhosphorTrim, setGreenPhosphorTrim] = useState(98.9);
  const [bluePhosphorTrim, setBluePhosphorTrim] = useState(99.6);
  const [isBalancingColor, setIsBalancingColor] = useState(false);
  const [colorBalanced, setColorBalanced] = useState(true);

  // Step 4: Diagnostics & Turnaround
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const [diagnosticProgress, setDiagnosticProgress] = useState(100);
  const [stageCertified, setStageCertified] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const markStepComplete = (stepNum: number) => {
    if (!completedSteps.includes(stepNum)) {
      setCompletedSteps((prev) => [...prev, stepNum]);
    }
  };

  const handleRunPing = () => {
    setIsSimulatingPing(true);
    setPingSuccess(false);
    setTimeout(() => {
      setIsSimulatingPing(false);
      setPingSuccess(true);
      markStepComplete(1);
    }, 1200);
  };

  const handleCalibrateTracking = () => {
    setIsCalibratingTracking(true);
    setTrackingCalibrated(false);
    setTimeout(() => {
      setIsCalibratingTracking(false);
      setTrackingCalibrated(true);
      markStepComplete(2);
    }, 1400);
  };

  const handleBalanceColor = () => {
    setIsBalancingColor(true);
    setColorBalanced(false);
    setTimeout(() => {
      setIsBalancingColor(false);
      setColorBalanced(true);
      markStepComplete(3);
    }, 1300);
  };

  const handleRunDiagnostics = () => {
    setIsDiagnosticRunning(true);
    setDiagnosticProgress(0);
    setStageCertified(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setDiagnosticProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setIsDiagnosticRunning(false);
        setStageCertified(true);
        markStepComplete(4);
      }
    }, 280);
  };

  const handleDownloadProfile = () => {
    const payload = JSON.stringify(
      {
        project: defaultProject,
        timestamp: new Date().toISOString(),
        status: stageCertified ? "CERTIFIED_READY_FOR_SHOOT" : "PROVISIONAL",
        ledVolume: {
          pitch: wallPitch,
          genlock: genlockSync,
          resolution: "16384 x 4096 (16K Total Wall)",
          unrealEngineNodeCount: 8,
          nDisplayPreset: "Ultra_Low_Latency_ICVFX_v5.4",
          nodeLatencyAverage: "0.22ms",
        },
        cameraTracking: {
          system: trackingSystem,
          latency: frustumLatency,
          focalLength: `${focalLength}mm`,
          focusDistance: `${focusDistance} ft`,
          opticalCenterShift: { x: "+0.04mm", y: "-0.02mm" },
          lensDistortionFocalMap: "Cooke_Anamorphic_35mm_T2.3",
          confidenceScore: "99.8%",
        },
        lighting: {
          acesProfile: colorSpace,
          dmxSyncEnabled: dmxLinkActive,
          dynamicSkyboxHDRILuma: "12,400 Nits",
          spectralUniformity: {
            red: `${redPhosphorTrim}%`,
            green: `${greenPhosphorTrim}%`,
            blue: `${bluePhosphorTrim}%`,
          },
        },
      },
      null,
      2
    );

    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ICVFX_Stage_Sync_Profile_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess("ICVFX Stage Profile JSON exported successfully!");
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleDownloadCalibration = () => {
    const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
<ICVFXLensCalibration project="${defaultProject}" timestamp="${new Date().toISOString()}">
  <LensProfile name="Cooke /i Anamorphic Special Flare ${focalLength}mm">
    <FocalLength>${focalLength}.24mm</FocalLength>
    <FocusDistance>${focusDistance}ft</FocusDistance>
    <EntrancePupilOffset>142.6mm</EntrancePupilOffset>
    <RadialDistortion K1="-0.0124" K2="0.0041" K3="-0.0003"/>
    <FrustumMarginPercentage>15.0%</FrustumMarginPercentage>
    <GenlockState>LOCKED_PHASE_0</GenlockState>
    <TrackingConfidence>99.82%</TrackingConfidence>
  </LensProfile>
</ICVFXLensCalibration>`;

    const blob = new Blob([xmlData], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Unreal_Lens_Calibration_${Date.now()}.xml`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess("Unreal Lens Calibration XML exported successfully!");
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const nodes = [
    { id: "Node-01 (Master Frustum)", gpu: "RTX 6000 Ada", ping: "0.18ms", fps: 24.0, status: "LOCKED" },
    { id: "Node-02 (Wall Left)", gpu: "RTX 6000 Ada", ping: "0.21ms", fps: 24.0, status: "LOCKED" },
    { id: "Node-03 (Wall Center)", gpu: "RTX 6000 Ada", ping: "0.19ms", fps: 24.0, status: "LOCKED" },
    { id: "Node-04 (Wall Right)", gpu: "RTX 6000 Ada", ping: "0.22ms", fps: 24.0, status: "LOCKED" },
    { id: "Node-05 (Ceiling Light)", gpu: "RTX 6000 Ada", ping: "0.24ms", fps: 24.0, status: "LOCKED" },
    { id: "Node-06 (Wild Wall A)", gpu: "RTX 6000 Ada", ping: "0.20ms", fps: 24.0, status: "LOCKED" },
    { id: "Node-07 (Wild Wall B)", gpu: "RTX 6000 Ada", ping: "0.22ms", fps: 24.0, status: "LOCKED" },
    { id: "Node-08 (DMX Baker)", gpu: "RTX 6000 Ada", ping: "0.25ms", fps: 24.0, status: "LOCKED" },
  ];

  return (
    <div className="modal-backdrop">
      <div
        className="modal-panel"
        style={{
          maxWidth: "840px",
          width: "100%",
          background: "linear-gradient(180deg, #0d151c 0%, #080c10 100%)",
          border: "1px solid rgba(6, 182, 212, 0.35)",
          borderRadius: "24px",
          boxShadow: "0 25px 80px rgba(0,0,0,0.95), 0 0 50px rgba(6, 182, 212, 0.12)",
          overflow: "hidden",
        }}
      >
        {/* Top Cyan Trim */}
        <div
          style={{
            height: "3px",
            width: "100%",
            background:
              "linear-gradient(90deg, transparent, #06b6d4 25%, #a5f3fc 50%, #06b6d4 75%, transparent)",
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
            backgroundColor: "#091016",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0.05) 100%)",
                border: "1px solid rgba(6,182,212,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#06b6d4",
              }}
            >
              <Layers size={24} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  letterSpacing: "0.15em",
                  color: "#06b6d4",
                  textTransform: "uppercase",
                }}
              >
                Virtual Production Suite • Feature 72 • Process Complete
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  marginTop: "2px",
                }}
              >
                LED Wall ICVFX &amp; Unreal Stage Sync
              </h2>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                Production: <span style={{ color: "#06b6d4", fontWeight: 600 }}>{defaultProject}</span> • Unreal Engine 5.4 nDisplay Cluster Calibration
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
            backgroundColor: "#070b0e",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            gap: "12px",
          }}
        >
          {[
            { num: 1, label: "Volume & nDisplay" },
            { num: 2, label: "Optical Tracking" },
            { num: 3, label: "Lighting & ACEScg" },
            { num: 4, label: "Diagnostics & Deploy" },
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
                      ? "#06b6d4"
                      : isCompleted
                      ? "rgba(6,182,212,0.2)"
                      : "rgba(255,255,255,0.05)",
                    color: isCurrent
                      ? "#041e24"
                      : isCompleted
                      ? "#06b6d4"
                      : "rgba(255,255,255,0.4)",
                    border: isCurrent
                      ? "none"
                      : isCompleted
                      ? "1px solid rgba(6,182,212,0.4)"
                      : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {isCompleted && !isCurrent ? "✓" : s.num}
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: isCurrent ? "600" : "400",
                    color: isCurrent ? "#06b6d4" : isCompleted ? "#ffffff" : "rgba(255,255,255,0.5)",
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
          {/* Step 1: Volume & nDisplay */}
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(6,182,212,0.06)",
                  border: "1px solid rgba(6,182,212,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <MonitorCheck size={22} color="#06b6d4" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#06b6d4" }}>
                    Step 1 Process: nDisplay Cluster &amp; Volume Architecture Calibration
                  </span>{" "}
                  Calibrate multi-node Unreal Engine 5.4 render servers driving the curved LED volume,
                  ceiling reflection panels, and motorized wild walls with frame-accurate genlock.
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
                    LED Panel Hardware Specification
                  </label>
                  <select
                    value={wallPitch}
                    onChange={(e) => setWallPitch(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#111b22",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="ROE Visual Black Pearl 2.8mm">ROE Visual Black Pearl 2.8mm (Cinema Standard)</option>
                    <option value="Absen Aries 1.5mm Ultra-Fine Pitch">Absen Aries 1.5mm Ultra-Fine Pitch</option>
                    <option value="AOTO Mini-LED 2.3mm HDR10+">AOTO Mini-LED 2.3mm HDR10+</option>
                    <option value="Infiled AR 3.9mm Modular Ceiling">Infiled AR 3.9mm Modular Ceiling</option>
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
                    Camera Genlock / PTP Sync Reference
                  </label>
                  <select
                    value={genlockSync}
                    onChange={(e) => setGenlockSync(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#111b22",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="24.00 fps Tri-Level Locked">24.00 fps Tri-Level Locked (ARRI Alexa 35 / RED V-Raptor)</option>
                    <option value="25.00 fps PAL Broadcast Genlock">25.00 fps PAL Broadcast Genlock (Sony Venice 2)</option>
                    <option value="23.976 fps SMPTE PTP Sync">23.976 fps SMPTE PTP Sync (Network Master Clock)</option>
                    <option value="48.00 fps HFR High-Speed Sync">48.00 fps HFR High-Speed Action Sync</option>
                  </select>
                </div>
              </div>

              {/* Volume Metrics Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#0d1720",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "14px",
                  }}
                >
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Total Canvas Resolution</div>
                  <div style={{ fontSize: "16px", fontWeight: "bold", color: "#ffffff", marginTop: "4px" }}>
                    16,384 × 4,096
                  </div>
                  <div style={{ fontSize: "11px", color: "#06b6d4", marginTop: "4px" }}>67.1M Total Active Pixels</div>
                </div>

                <div
                  style={{
                    backgroundColor: "#0d1720",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "14px",
                  }}
                >
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>nDisplay Node Cluster</div>
                  <div style={{ fontSize: "16px", fontWeight: "bold", color: "#ffffff", marginTop: "4px" }}>
                    8x Dual RTX 6000 Ada
                  </div>
                  <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>100 GbE Mellanox Fabric</div>
                </div>

                <div
                  style={{
                    backgroundColor: "#0d1720",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "14px",
                  }}
                >
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Peak Volume Brightness</div>
                  <div style={{ fontSize: "16px", fontWeight: "bold", color: "#ffffff", marginTop: "4px" }}>
                    1,800 Nits (Calibrated)
                  </div>
                  <div style={{ fontSize: "11px", color: "#f59e0b", marginTop: "4px" }}>Brompton Tessera SX40</div>
                </div>
              </div>

              {/* Node Cluster Health Grid with Execute Process Button */}
              <div
                style={{
                  backgroundColor: "#0d1720",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    Live nDisplay Node Health &amp; Sync Matrix
                  </div>
                  <button
                    onClick={handleRunPing}
                    disabled={isSimulatingPing}
                    style={{
                      background: "rgba(6,182,212,0.15)",
                      border: "1px solid rgba(6,182,212,0.3)",
                      color: "#06b6d4",
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
                    <RotateCcw size={13} className={isSimulatingPing ? "animate-spin" : ""} />
                    {isSimulatingPing ? "Executing Ping & Lock..." : "⚡ Run Cluster Genlock Sync Check"}
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                  {nodes.map((n) => (
                    <div
                      key={n.id}
                      style={{
                        backgroundColor: "#111b22",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div style={{ fontSize: "11px", color: "#ffffff", fontWeight: 600 }}>{n.id.split(" ")[0]}</div>
                      <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>{n.id.split(" ").slice(1).join(" ")}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "10px" }}>
                        <span style={{ color: "#06b6d4" }}>{n.ping}</span>
                        <span style={{ color: "#10b981", fontWeight: 600 }}>● {n.status}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "10px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#10b981", display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle2 size={14} /> Zero dropped frames detected • Genlock jitter &lt; 0.01ms
                  </span>
                  <button
                    onClick={() => {
                      markStepComplete(1);
                      setActiveStep(2);
                    }}
                    style={{
                      background: "#06b6d4",
                      color: "#041e24",
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
                    Confirm &amp; Proceed to Tracking <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Optical Tracking */}
          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(6,182,212,0.06)",
                  border: "1px solid rgba(6,182,212,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Camera size={22} color="#06b6d4" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#06b6d4" }}>
                    Step 2 Process: 6-DOF Camera Frustum &amp; Lens Optical Calibration
                  </span>{" "}
                  Synchronize optical positional tracking with Unreal Engine&apos;s inner camera frustum
                  so the perspective background shifts in real-time parallax with zero perceptible drift.
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
                    Camera Tracking System Protocol
                  </label>
                  <select
                    value={trackingSystem}
                    onChange={(e) => setTrackingSystem(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#111b22",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="Mo-Sys StarTracker Gen 3">Mo-Sys StarTracker Gen 3 (Optical Ceiling Retro-Dots)</option>
                    <option value="Stype RedSpy Optical Sensor">Stype RedSpy Optical Infrared Tracker</option>
                    <option value="Vicon Shogun Markerless Rig">Vicon Shogun Multi-Camera Optical Array</option>
                    <option value="FreeD Protocol over UDP">FreeD Standard Telemetry Protocol over UDP</option>
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
                    Frustum Latency Compensation
                  </label>
                  <select
                    value={frustumLatency}
                    onChange={(e) => setFrustumLatency(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#111b22",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="1.8 frames (Opti-Sync)">1.8 frames (Opti-Sync Ultra-Low Predictive)</option>
                    <option value="2.0 frames (Standard Genlock)">2.0 frames (Standard Hardware Genlock)</option>
                    <option value="2.4 frames (Multi-Pass)">2.4 frames (Heavy Nanite Scene Multi-Pass)</option>
                  </select>
                </div>
              </div>

              {/* Interactive Lens Sliders */}
              <div
                style={{
                  backgroundColor: "#0b1319",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    Live Lens Encoder &amp; Optical Frustum Trim
                  </div>
                  <button
                    onClick={handleCalibrateTracking}
                    disabled={isCalibratingTracking}
                    style={{
                      background: "rgba(6,182,212,0.15)",
                      border: "1px solid rgba(6,182,212,0.3)",
                      color: "#06b6d4",
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
                    <RotateCcw size={12} className={isCalibratingTracking ? "animate-spin" : ""} />
                    {isCalibratingTracking ? "Aligning Optical Center..." : "🎯 Re-Zero Optical Tracking"}
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px" }}>
                      <span>Cooke /i Prime Focal Length: <strong style={{ color: "#06b6d4" }}>{focalLength} mm</strong></span>
                    </div>
                    <input
                      type="range"
                      min="18"
                      max="100"
                      step="1"
                      value={focalLength}
                      onChange={(e) => setFocalLength(parseInt(e.target.value))}
                      style={{ width: "100%", accentColor: "#06b6d4" }}
                    />
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px" }}>
                      <span>Camera Focus Distance: <strong style={{ color: "#06b6d4" }}>{focusDistance} ft</strong></span>
                    </div>
                    <input
                      type="range"
                      min="1.0"
                      max="25.0"
                      step="0.1"
                      value={focusDistance}
                      onChange={(e) => setFocusDistance(parseFloat(e.target.value))}
                      style={{ width: "100%", accentColor: "#06b6d4" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginTop: "4px" }}>
                  <div style={{ backgroundColor: "#111c24", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Tracking System</div>
                    <div style={{ fontSize: "13px", fontWeight: "bold", color: "#06b6d4" }}>6-DOF StarTracker</div>
                  </div>
                  <div style={{ backgroundColor: "#111c24", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Confidence Score</div>
                    <div style={{ fontSize: "13px", fontWeight: "bold", color: "#10b981" }}>99.82% Locked</div>
                  </div>
                  <div style={{ backgroundColor: "#111c24", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Inner Frustum Jitter</div>
                    <div style={{ fontSize: "13px", fontWeight: "bold", color: "#ffffff" }}>0.02 mm (Zero Drift)</div>
                  </div>
                  <div style={{ backgroundColor: "#111c24", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Frustum Overscan</div>
                    <div style={{ fontSize: "13px", fontWeight: "bold", color: "#10b981" }}>+15% Edge Margin</div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "6px",
                  }}
                >
                  <button
                    onClick={() => {
                      markStepComplete(2);
                      setActiveStep(3);
                    }}
                    style={{
                      background: "#06b6d4",
                      color: "#041e24",
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
                    Lock Tracking &amp; Proceed to ACEScg <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Lighting & ACEScg */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(6,182,212,0.06)",
                  border: "1px solid rgba(6,182,212,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Cpu size={22} color="#06b6d4" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#06b6d4" }}>
                    Step 3 Process: Color Science &amp; DMX Stage Lighting Convergence
                  </span>{" "}
                  Calibrate LED emission gamut using ACEScg pipelines so on-actor light bounce matches
                  the virtual sun, sky, and neon fixtures with zero chromatic distortion.
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
                    Virtual World Color Management
                  </label>
                  <select
                    value={colorSpace}
                    onChange={(e) => setColorSpace(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#111b22",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="ACEScg (AP1 Primaries)">ACEScg (AP1 Linear Primaries - Film Standard)</option>
                    <option value="ACEScc Log Grading">ACEScc (Quasi-Log Color Grading Primaries)</option>
                    <option value="Rec.2020 PQ HDR">Rec.2020 PQ 1000-Nit HDR Master</option>
                    <option value="DCI-P3 Theatrical">DCI-P3 Theatrical Cinema Projector</option>
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
                    DMX Art-Net Ambient Light Sync
                  </label>
                  <div
                    onClick={() => setDmxLinkActive(!dmxLinkActive)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#111b22",
                      border: `1px solid ${dmxLinkActive ? "rgba(6,182,212,0.4)" : "rgba(255,255,255,0.15)"}`,
                      borderRadius: "10px",
                      padding: "10px 14px",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Radio size={16} color={dmxLinkActive ? "#06b6d4" : "#94a3b8"} />
                      <span style={{ fontSize: "13px", color: dmxLinkActive ? "#ffffff" : "#94a3b8" }}>
                        {dmxLinkActive ? "DMX Art-Net Fixtures Engaged" : "Manual Gaffer Control (Decoupled)"}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: dmxLinkActive ? "#06b6d4" : "#64748b",
                      }}
                    >
                      {dmxLinkActive ? "ACTIVE" : "OFF"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Spectrum Balancer */}
              <div
                style={{
                  backgroundColor: "#0d1720",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>
                    Real-time LED Spectral Calibration Curves (Brompton Dynamic Calibration)
                  </div>
                  <button
                    onClick={handleBalanceColor}
                    disabled={isBalancingColor}
                    style={{
                      background: "rgba(6,182,212,0.15)",
                      border: "1px solid rgba(6,182,212,0.3)",
                      color: "#06b6d4",
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
                    <RotateCcw size={12} className={isBalancingColor ? "animate-spin" : ""} />
                    {isBalancingColor ? "Calibrating Spectroradiometer..." : "☀️ Run Spectro Calibration"}
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "rgba(255,255,255,0.7)", marginBottom: "4px" }}>
                      <span>Red Phosphor Wavelength (635nm)</span>
                      <span style={{ color: "#f87171", fontWeight: 600 }}>{redPhosphorTrim}% Uniformity</span>
                    </div>
                    <input
                      type="range"
                      min="90"
                      max="100"
                      step="0.1"
                      value={redPhosphorTrim}
                      onChange={(e) => setRedPhosphorTrim(parseFloat(e.target.value))}
                      style={{ width: "100%", accentColor: "#ef4444" }}
                    />
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "rgba(255,255,255,0.7)", marginBottom: "4px" }}>
                      <span>Green Emitter Wavelength (525nm)</span>
                      <span style={{ color: "#4ade80", fontWeight: 600 }}>{greenPhosphorTrim}% Uniformity</span>
                    </div>
                    <input
                      type="range"
                      min="90"
                      max="100"
                      step="0.1"
                      value={greenPhosphorTrim}
                      onChange={(e) => setGreenPhosphorTrim(parseFloat(e.target.value))}
                      style={{ width: "100%", accentColor: "#10b981" }}
                    />
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "rgba(255,255,255,0.7)", marginBottom: "4px" }}>
                      <span>Blue Emitter Wavelength (465nm)</span>
                      <span style={{ color: "#60a5fa", fontWeight: 600 }}>{bluePhosphorTrim}% Uniformity</span>
                    </div>
                    <input
                      type="range"
                      min="90"
                      max="100"
                      step="0.1"
                      value={bluePhosphorTrim}
                      onChange={(e) => setBluePhosphorTrim(parseFloat(e.target.value))}
                      style={{ width: "100%", accentColor: "#3b82f6" }}
                    />
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
                      background: "#06b6d4",
                      color: "#041e24",
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
                    Lock Color &amp; Proceed to Diagnostics <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Diagnostics & Turnaround */}
          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(6,182,212,0.06)",
                  border: "1px solid rgba(6,182,212,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <CheckCircle2 size={22} color="#06b6d4" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#06b6d4" }}>
                    Step 4 Process: Live Diagnostics, Stage Certification &amp; Turnaround Export
                  </span>{" "}
                  All 8 nDisplay nodes, optical tracking telemetry, and Brompton LED controllers are
                  in synchronized phase lock. Export stage deployment bundles for immediate shoot commencement.
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

              {/* Automated Diagnostic Pass Runner */}
              <div
                style={{
                  backgroundColor: "#0d1720",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#ffffff" }}>
                    Production Stage Readiness Matrix
                  </span>
                  <button
                    onClick={handleRunDiagnostics}
                    disabled={isDiagnosticRunning}
                    style={{
                      background: "rgba(6,182,212,0.15)",
                      border: "1px solid rgba(6,182,212,0.3)",
                      color: "#06b6d4",
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
                    <RotateCcw size={12} className={isDiagnosticRunning ? "animate-spin" : ""} />
                    {isDiagnosticRunning ? `Running Diagnostics (${diagnosticProgress}%)...` : "🚀 Run Full Stage Diagnostic Suite"}
                  </button>
                </div>

                {isDiagnosticRunning && (
                  <div style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#06b6d4", marginBottom: "4px" }}>
                      <span>Stress-Testing Frame Buffers &amp; Art-Net Packet Ingest...</span>
                      <span>{diagnosticProgress}%</span>
                    </div>
                    <div style={{ width: "100%", height: "6px", backgroundColor: "#1e293b", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${diagnosticProgress}%`, height: "100%", backgroundColor: "#06b6d4", transition: "width 0.25s ease" }} />
                    </div>
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#111b22", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>Genlock Phase Offset</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>0.00ms (PTP Locked to ARRI Alexa 35)</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#111b22", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>Unreal Frustum Latency</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>{frustumLatency} • Jitter 0.02mm</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#111b22", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>Tracking Confidence</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>99.8% Sub-Millimeter Optical Lock</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#111b22", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>DMX Lighting Sync</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>
                        {dmxLinkActive ? "Connected (Universes 1-16 Synced)" : "Manual Standby"}
                      </div>
                    </div>
                  </div>
                </div>

                {stageCertified && (
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
                        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#10b981" }}>STAGE CERTIFIED &amp; READY FOR CAMERA ROLL</div>
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>All 4 Virtual Production processes validated with zero critical alerts.</div>
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
                      100% OPERATIONAL
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                <button
                  onClick={handleDownloadProfile}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                    color: "#ffffff",
                    fontWeight: "600",
                    fontSize: "13px",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(6,182,212,0.3)",
                  }}
                >
                  <Download size={16} />
                  Export ICVFX Stage Profile (.JSON)
                </button>

                <button
                  onClick={handleDownloadCalibration}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    backgroundColor: "#111b22",
                    border: "1px solid rgba(6,182,212,0.4)",
                    color: "#06b6d4",
                    fontWeight: "600",
                    fontSize: "13px",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                >
                  <Download size={16} />
                  Export Lens Calibration (.XML)
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
            backgroundColor: "#070b0e",
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
                  background: "#06b6d4",
                  border: "none",
                  color: "#041e24",
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
                Close &amp; Ready Stage
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
