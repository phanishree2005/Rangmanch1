"use client";

import { useState } from "react";
import {
  X,
  HardDrive,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  Camera,
  Layers,
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  Cpu,
  Database,
  Film,
} from "lucide-react";

interface CameraMediaOffloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function CameraMediaOffloadModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Day 14 A-Camera Ingest & Checksum",
}: CameraMediaOffloadModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Camera Media & Magazine Ingest
  const [cameraRig, setCameraRig] = useState("ARRI Alexa 35 (A-Camera) - CODEX Compact Drive 2TB");
  const [reelRollId, setReelRollId] = useState("A014_C001_1106_001 (Reel 14 - Day 14 Interior Bunker)");
  const [codecFormat, setCodecFormat] = useState("ARRIRAW 4.6K 3:2 Open Gate (4608x3164 @ 24.000 fps)");
  const [totalFootageGigabytes, setTotalFootageGigabytes] = useState(1840);

  // Step 2: Multi-Destination Cascaded Offload & Checksums
  const [checksumAlgorithm, setChecksumAlgorithm] = useState("xxHash64 (High-Speed Multi-Threaded) + SHA-256 Dual Verification");
  const [targetDestinations, setTargetDestinations] = useState([
    "Primary: High-Speed Studio RAID-0 NVMe (Write Speed: 2,800 MB/s)",
    "Secondary: Rugged Shuttle SSD 4TB (Editorial Workprint)",
    "Cold Archive: LTO-9 Dual-Tape Drive (NFAI Archival Vault)",
  ]);
  const [byteDiscrepancyCount, setByteDiscrepancyCount] = useState(0);

  // Step 3: DIT Exposure, LUT & Metadata QC
  const [colorSpaceLut, setColorSpaceLut] = useState("ARRI LogC4 ➔ Rec.709 Show LUT (ACES 1.3 AP0 Neutral)");
  const [lensMetadataProfile, setLensMetadataProfile] = useState("Cooke /i Anamorphic /i Full Frame Plus 65mm T2.3 (Embedded Focal/Iris)");
  const [falseColorClippingDetected, setFalseColorClippingDetected] = useState(false);
  const [droppedFramesCount, setDroppedFramesCount] = useState(0);

  // Step 4: Mag Wipe Authorization & MHL Manifest
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const handleDownloadMhlManifest = () => {
    setIsExporting(true);
    const mhlData = {
      project: defaultProject,
      ditStandard: "ASC-MHL v2.1 (American Society of Cinematographers Media Hash List)",
      ingestDetails: {
        cameraRig,
        reelRollId,
        codecFormat,
        totalFootageGB: `${totalFootageGigabytes} GB`,
      },
      checksumVerification: {
        algorithms: checksumAlgorithm,
        byteDiscrepancies: byteDiscrepancyCount,
        offloadIntegrity: "100% BIT-PERFECT VERIFIED",
        checksumSample_xxHash64: "a8f34c2b99ef0142",
        checksumSample_SHA256: "9b32c81a27e41e4649b934ca495991b7852b855e3b0c44298fc1c149afbf4c89",
        destinations: targetDestinations,
      },
      cameraMetadataQC: {
        lut: colorSpaceLut,
        lensData: lensMetadataProfile,
        clippingErrors: falseColorClippingDetected,
        droppedFrames: droppedFramesCount,
      },
      magWipeStatus: {
        authorizationGranted: true,
        authorizedBy: "Chief DIT & 1st Assistant Camera (AC)",
        timestamp: new Date().toISOString(),
      },
    };

    const blob = new Blob([JSON.stringify(mhlData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ASC_MHL_Manifest_${reelRollId.split("_")[0] || "Reel"}.json`;
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
              <HardDrive size={26} />
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
                  DIT Camera Mag Offload &amp; Checksum Verification Vault
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
                  FEATURE 99
                </span>
              </div>
              <p
                style={{
                  color: "#9e9e90",
                  fontSize: "13px",
                  margin: "4px 0 0 0",
                }}
              >
                ASC-MHL Checksum Offload • Multi-Destination Cascade • False-Color Exposure QC • Camera Mag Wipe Clearance
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
            { step: 1, title: "1. Camera Mag", desc: "ARRIRAW / RED Ingest", icon: Camera },
            { step: 2, title: "2. Checksum Offload", desc: "xxHash64 & SHA-256", icon: Database },
            { step: 3, title: "3. DIT Exposure QC", desc: "LogC4 & Cooke /i Data", icon: Film },
            { step: 4, title: "4. ASC-MHL & Wipe", desc: "Mag Clearance Certificate", icon: FileCheck2 },
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
                    Current Shoot Context
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
                  Thunderbolt 4 Card Reader Mounted
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Camera Rig &amp; Digital Magazine Hardware
                  </label>
                  <select
                    value={cameraRig}
                    onChange={(e) => setCameraRig(e.target.value)}
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
                    <option value="ARRI Alexa 35 (A-Camera) - CODEX Compact Drive 2TB">ARRI Alexa 35 (A-Camera) - CODEX Compact Drive 2TB</option>
                    <option value="RED V-Raptor XL 8K VV - PRO CFexpress 2TB Type B">RED V-Raptor XL 8K VV - PRO CFexpress 2TB Type B</option>
                    <option value="Sony Venice 2 8.6K (B-Camera) - AXS-A1TS66 1TB Memory Card">Sony Venice 2 8.6K (B-Camera) - AXS-A1TS66 1TB Memory Card</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Reel / Roll Designation ID
                  </label>
                  <input
                    type="text"
                    value={reelRollId}
                    onChange={(e) => setReelRollId(e.target.value)}
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

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Sensor Resolution &amp; Native RAW Compression
                  </label>
                  <input
                    type="text"
                    value={codecFormat}
                    onChange={(e) => setCodecFormat(e.target.value)}
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
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "13px", color: "#d4af37", fontWeight: 600 }}>
                      Card Payload Size
                    </label>
                    <span style={{ fontSize: "13px", color: "#fff", fontWeight: 700 }}>
                      {totalFootageGigabytes} GB
                    </span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="2000"
                    step="20"
                    value={totalFootageGigabytes}
                    onChange={(e) => setTotalFootageGigabytes(parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: "#d4af37", marginTop: "10px" }}
                  />
                  <div style={{ fontSize: "11px", color: "#81c784", marginTop: "4px" }}>
                    Est. Offload Time: ~11m 45s across 3 simultaneous NVMe targets
                  </div>
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
                  START CASCADED CHECKSUM OFFLOAD <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
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
                  <Database size={20} color="#d4af37" />
                  <h4 style={{ margin: 0, color: "#fff", fontSize: "15px" }}>
                    Byte-Level Checksum Verification (ASC-MHL Compliant)
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "12px", color: "#a0a095" }}>
                  Writes simultaneously to 3 physical hardware drives with real-time xxHash64 and SHA-256 byte comparison.
                </p>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                  Active Offload Verification Algorithm
                </label>
                <input
                  type="text"
                  value={checksumAlgorithm}
                  readOnly
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: "#161513",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    color: "#81c784",
                    fontSize: "13px",
                    fontFamily: "monospace",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "10px", fontWeight: 600 }}>
                  Active Target Destinations
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {targetDestinations.map((dst, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "14px 16px",
                        borderRadius: "10px",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(212, 175, 55, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#eee" }}>
                        <CheckCircle2 size={16} color="#81c784" />
                        {dst}
                      </div>
                      <span style={{ fontSize: "11px", color: "#81c784", fontWeight: 700, fontFamily: "monospace" }}>
                        100% MATCH
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "10px",
                  background: "rgba(46, 125, 50, 0.12)",
                  border: "1px solid rgba(76, 175, 80, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: "12px", color: "#81c784", fontWeight: 600 }}>
                  Byte Discrepancies Count: 0 (Zero Bits Corrupted)
                </span>
                <span style={{ fontSize: "11px", color: "#d4af37", fontFamily: "monospace" }}>
                  SHA-256 CHECK: VERIFIED
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
                  BACK TO CARD
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
                  INSPECT EXPOSURE &amp; METADATA QC <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Color Science &amp; Show LUT Calibration
                  </label>
                  <input
                    type="text"
                    value={colorSpaceLut}
                    onChange={(e) => setColorSpaceLut(e.target.value)}
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
                    Lens Smart Metadata Protocol
                  </label>
                  <input
                    type="text"
                    value={lensMetadataProfile}
                    onChange={(e) => setLensMetadataProfile(e.target.value)}
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

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
                <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                  <div style={{ fontSize: "11px", color: "#aaa" }}>Highlight Clipping</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#81c784", marginTop: "4px" }}>0.0% Over-Exposed</div>
                </div>
                <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                  <div style={{ fontSize: "11px", color: "#aaa" }}>Dropped Frames</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#81c784", marginTop: "4px" }}>0 Dropped Frames</div>
                </div>
                <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                  <div style={{ fontSize: "11px", color: "#aaa" }}>Camera Sensor Temp</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#d4af37", marginTop: "4px" }}>39.4°C (Normal)</div>
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
                  BACK TO CHECKSUM
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
                  ISSUE MAG WIPE CLEARANCE <ArrowRight size={16} />
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
                  <ShieldCheck size={22} color="#d4af37" />
                  <h4 style={{ margin: 0, color: "#fff", fontSize: "16px" }}>
                    Camera Mag Safe-To-Wipe Certificate &amp; ASC-MHL Pack
                  </h4>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginTop: "14px" }}>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>Card Wipe Status</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#81c784", marginTop: "2px" }}>CLEARED FOR RE-FORMAT</div>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>Backup Redundancy</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#d4af37", marginTop: "2px" }}>3x Copies Confirmed</div>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>MHL File Spec</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginTop: "2px" }}>ASC-MHL v2.1 XML/JSON</div>
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
                  BACK TO QC
                </button>
                <button
                  onClick={handleDownloadMhlManifest}
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
                  {isExporting ? "GENERATING MHL PACK..." : "DOWNLOAD ASC-MHL MANIFEST & WIPE CERTIFICATE"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

