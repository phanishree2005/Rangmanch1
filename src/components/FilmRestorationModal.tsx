"use client";

import { useState } from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  Film,
  Archive,
  Layers,
  Wand2,
  Sliders,
  ShieldCheck,
  HardDrive,
  RefreshCw,
} from "lucide-react";

interface FilmRestorationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function FilmRestorationModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - 35mm Heritage Master Preservation",
}: FilmRestorationModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Photochemical Source Scan Ingest & Condition Assessment
  const [filmGauge, setFilmGauge] = useState("35mm 4-Perf Eastman Color Negative (1984)");
  const [scannerResolution, setScannerResolution] = useState("4K 16-bit Uncompressed DPX (4096x3112, 1.33:1 Full Aperture)");
  const [physicalDecayLevel, setPhysicalDecayLevel] = useState("Mild Vinegar Syndrome (A-D Strip: 1.2 pH) + Splice Tape Brittleness");
  const [baseShrinkagePercent, setBaseShrinkagePercent] = useState(0.42);

  // Step 2: Neural Dirt, Tramline & Mold Removal
  const [neuralInpaintingModel, setNeuralInpaintingModel] = useState("Motion-Vector Guided Spatio-Temporal Inpainter (5-Frame Window)");
  const [scratchRemovalIntensity, setScratchRemovalIntensity] = useState(88);
  const [moldMyceliumRemediation, setMoldMyceliumRemediation] = useState(true);
  const [subPixelPinRegistration, setSubPixelPinRegistration] = useState(true);

  // Step 3: Photochemical Grain & Color Re-Hydration
  const [emulsionProfile, setEmulsionProfile] = useState("Kodak Vision3 5219 (500T) Photochemical Grain Structure");
  const [colorSpaceMaster, setColorSpaceMaster] = useState("ACES 1.3 (ACES2065-1 / AP0 Linear) ➔ DCI-P3 Mastering");
  const [dyeFadingRecovery, setDyeFadingRecovery] = useState(94);
  const [opticalAudioDenoise, setOpticalAudioDenoise] = useState("SMPTE Optical Sound De-click & Spectral De-hiss (96kHz / 24-bit)");

  // Step 4: Archival Export & FIAF Vault Packaging
  const [archivalFormat, setArchivalFormat] = useState("LTO-9 Tape Dual-Redundant Archive + BagIt Package + DCDM 4K");
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const handleDownloadManifest = () => {
    setIsExporting(true);
    const data = {
      project: defaultProject,
      preservationInstitute: "National Film Archive & Heritage Restoration Cell (Prasad Labs / Reliance MediaWorks Consortium)",
      specification: {
        filmGauge,
        scannerResolution,
        physicalDecayLevel,
        baseShrinkagePercent: `${baseShrinkagePercent}%`,
        neuralInpaintingModel,
        scratchRemovalIntensity: `${scratchRemovalIntensity}%`,
        moldRemediated: moldMyceliumRemediation,
        subPixelPinRegistration,
        emulsionProfile,
        colorSpaceMaster,
        dyeFadingRecovery: `${dyeFadingRecovery}%`,
        opticalAudioDenoise,
        archivalFormat,
      },
      auditChecksum: {
        reel01_sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        reel02_sha256: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
        fiafStandardsCompliance: "FIAF Preservation Commission Technical Guidelines 2024",
      },
      generatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Restoration_Manifest_${defaultProject.replace(/\s+/g, "_")}.json`;
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
              <Sparkles size={26} />
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
                  4K/8K Archival Film Restoration & Stock Preserver
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
                  FEATURE 96
                </span>
              </div>
              <p
                style={{
                  color: "#9e9e90",
                  fontSize: "13px",
                  margin: "4px 0 0 0",
                }}
              >
                Photochemical DPX Ingest • Neural Scratch Inpainting • Cyan/Magenta Dye Recovery • FIAF LTO-9 Cold Storage
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
            { step: 1, title: "1. Scan & Gauge", desc: "Photochemical Ingest", icon: Film },
            { step: 2, title: "2. Neural Healing", desc: "Dust & Scratch Repair", icon: Wand2 },
            { step: 3, title: "3. Emulsion & Grade", desc: "Grain & Color Recovery", icon: Sliders },
            { step: 4, title: "4. FIAF LTO-9 Master", desc: "Preservation Handover", icon: Archive },
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
                    Selected Archive Project
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
                  ARRISCAN XT Continuous Optical Scanner Connected
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Film Gauge & Original Nitrate/Acetate Emulsion
                  </label>
                  <select
                    value={filmGauge}
                    onChange={(e) => setFilmGauge(e.target.value)}
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
                    <option value="35mm 4-Perf Eastman Color Negative (1984)">35mm 4-Perf Eastman Color Negative (1984 - 5247 Stock)</option>
                    <option value="35mm 3-Perf Kodak Vision 200T Interpositive (1998)">35mm 3-Perf Kodak Vision 200T Interpositive (1998)</option>
                    <option value="70mm 5-Perf Super Panavision 70 Nitrate Master">70mm 5-Perf Super Panavision 70 Nitrate Master (1962)</option>
                    <option value="16mm Camera Reversal Ektachrome 7240">16mm Camera Reversal Ektachrome 7240 (Direct Positive)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Sensor Resolution & Uncompressed Color Bit-Depth
                  </label>
                  <select
                    value={scannerResolution}
                    onChange={(e) => setScannerResolution(e.target.value)}
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
                    <option value="4K 16-bit Uncompressed DPX (4096x3112, 1.33:1 Full Aperture)">4K 16-bit Uncompressed DPX (4096x3112, 1.33:1 Full Aperture - 12.8 MB/frame)</option>
                    <option value="8K 12-bit Log Raw Overscan with Optical Track (8192x6224)">8K 12-bit Log Raw Overscan with Optical Track (8192x6224 - 51.2 MB/frame)</option>
                    <option value="6K Super 35mm Overscan with Perforation Edge Code">6K Super 35mm Overscan with Perforation Edge Code (6144x4668)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Physical Vault Condition & Decay Assessment
                  </label>
                  <input
                    type="text"
                    value={physicalDecayLevel}
                    onChange={(e) => setPhysicalDecayLevel(e.target.value)}
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
                      Base Shrinkage Coefficient
                    </label>
                    <span style={{ fontSize: "13px", color: "#fff", fontWeight: 700 }}>
                      {baseShrinkagePercent}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.5"
                    step="0.01"
                    value={baseShrinkagePercent}
                    onChange={(e) => setBaseShrinkagePercent(parseFloat(e.target.value))}
                    style={{ width: "100%", accentColor: "#d4af37", marginTop: "10px" }}
                  />
                  <div style={{ fontSize: "11px", color: baseShrinkagePercent > 0.8 ? "#ff9800" : "#81c784", marginTop: "4px" }}>
                    {baseShrinkagePercent > 0.8 ? "⚠️ Critical: Requires Sprocket-less Capstan Optical Drive" : "✓ Safe: Standard Pin-Registered Feed within FIAF tolerance"}
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
                  PROCEED TO NEURAL HEALING <ArrowRight size={16} />
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
                  <Wand2 size={20} color="#d4af37" />
                  <h4 style={{ margin: 0, color: "#fff", fontSize: "15px" }}>
                    Temporal Deep Learning Inpainting & Surface Cleansing
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "12px", color: "#a0a095" }}>
                  Reconstructs damaged emulsion layers across chronological frames without softening fine detail or organic silver halide grain structure.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Inpainting Neural Model
                  </label>
                  <select
                    value={neuralInpaintingModel}
                    onChange={(e) => setNeuralInpaintingModel(e.target.value)}
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
                    <option value="Motion-Vector Guided Spatio-Temporal Inpainter (5-Frame Window)">Motion-Vector Guided Spatio-Temporal Inpainter (5-Frame Window)</option>
                    <option value="Bilateral Optical Flow Dirt & Tramline Suppressor (3-Frame)">Bilateral Optical Flow Dirt & Tramline Suppressor (3-Frame)</option>
                    <option value="High-Frequency Edge-Preserving Latent Diffusion Restorer">High-Frequency Edge-Preserving Latent Diffusion Restorer</option>
                  </select>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "13px", color: "#d4af37", fontWeight: 600 }}>
                      Scratch & Dust Removal Strength
                    </label>
                    <span style={{ fontSize: "13px", color: "#fff", fontWeight: 700 }}>
                      {scratchRemovalIntensity}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={scratchRemovalIntensity}
                    onChange={(e) => setScratchRemovalIntensity(parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: "#d4af37", marginTop: "10px" }}
                  />
                  <div style={{ fontSize: "11px", color: "#aaa", marginTop: "4px" }}>
                    Preserves original film pores while purging vertical projector scratch tracks.
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "13px", color: "#fff", fontWeight: 600 }}>
                      Fungal / Mold Mycelium Neutralization
                    </div>
                    <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>
                      Isolates and removes crystalline mold blooms on gelatin base
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={moldMyceliumRemediation}
                    onChange={(e) => setMoldMyceliumRemediation(e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#d4af37" }}
                  />
                </div>

                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "13px", color: "#fff", fontWeight: 600 }}>
                      Sub-Pixel Pin Registration & Gate Weave Fix
                    </div>
                    <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>
                      Eliminates vertical jitter and side-to-side mechanical gate drift
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={subPixelPinRegistration}
                    onChange={(e) => setSubPixelPinRegistration(e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#d4af37" }}
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
                  BACK TO SCAN
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
                  CONFIGURE EMULSION & COLOR <ArrowRight size={16} />
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
                    Authentic Emulsion Grain Profiler
                  </label>
                  <select
                    value={emulsionProfile}
                    onChange={(e) => setEmulsionProfile(e.target.value)}
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
                    <option value="Kodak Vision3 5219 (500T) Photochemical Grain Structure">Kodak Vision3 5219 (500T) Photochemical Grain Structure</option>
                    <option value="Eastman Double-X 5222 B&W Halide Emulsion">Eastman Double-X 5222 B&W Halide Emulsion</option>
                    <option value="Fujicolor ETERNA 250D Soft Contrast Grain Profile">Fujicolor ETERNA 250D Soft Contrast Grain Profile</option>
                    <option value="Agfa XT 320 Warm Midtone Saturated Grain">Agfa XT 320 Warm Midtone Saturated Grain</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Archival Color Space & Gamut Target
                  </label>
                  <select
                    value={colorSpaceMaster}
                    onChange={(e) => setColorSpaceMaster(e.target.value)}
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
                    <option value="ACES 1.3 (ACES2065-1 / AP0 Linear) ➔ DCI-P3 Mastering">ACES 1.3 (ACES2065-1 / AP0 Linear) ➔ DCI-P3 Mastering</option>
                    <option value="Rec.2020 12-bit Dolby Vision HDR Master (PQ / ST.2084)">Rec.2020 12-bit Dolby Vision HDR Master (PQ / ST.2084)</option>
                    <option value="Rec.709 10-bit Broadcast Archival SDR">Rec.709 10-bit Broadcast Archival SDR</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "13px", color: "#d4af37", fontWeight: 600 }}>
                      Cyan / Magenta Dye Re-Hydration
                    </label>
                    <span style={{ fontSize: "13px", color: "#fff", fontWeight: 700 }}>
                      {dyeFadingRecovery}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={dyeFadingRecovery}
                    onChange={(e) => setDyeFadingRecovery(parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: "#d4af37", marginTop: "10px" }}
                  />
                  <div style={{ fontSize: "11px", color: "#81c784", marginTop: "4px" }}>
                    Recovers lost blue/cyan shadow tones and neutralizes magenta cast.
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Optical Sound Track Audio Restoration
                  </label>
                  <select
                    value={opticalAudioDenoise}
                    onChange={(e) => setOpticalAudioDenoise(e.target.value)}
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
                    <option value="SMPTE Optical Sound De-click & Spectral De-hiss (96kHz / 24-bit)">SMPTE Optical Sound De-click & Spectral De-hiss (96kHz / 24-bit)</option>
                    <option value="Magnetic 6-Track 70mm Todd-AO Flutter & Wow Suppressor">Magnetic 6-Track 70mm Todd-AO Flutter & Wow Suppressor</option>
                    <option value="Optical Variable-Area Mono Noise Gate & De-hum 50Hz">Optical Variable-Area Mono Noise Gate & De-hum 50Hz</option>
                  </select>
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
                  BACK TO HEALING
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
                  PREPARE FIAF LTO-9 MASTER <ArrowRight size={16} />
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
                  <HardDrive size={22} color="#d4af37" />
                  <h4 style={{ margin: 0, color: "#fff", fontSize: "16px" }}>
                    LTO-9 Dual-Tape Cold Storage & NFAI BagIt Container
                  </h4>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginTop: "14px" }}>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>Preservation Standard</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#d4af37", marginTop: "2px" }}>FIAF / ISO 18911 Compliant</div>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>Digital Master Weight</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#81c784", marginTop: "2px" }}>4.82 TB (142,000 DPX frames)</div>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>Tape Media Type</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginTop: "2px" }}>Barium Ferrite LTO-9 (18TB Native)</div>
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                  Master Export Deliverables Package
                </label>
                <select
                  value={archivalFormat}
                  onChange={(e) => setArchivalFormat(e.target.value)}
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
                  <option value="LTO-9 Tape Dual-Redundant Archive + BagIt Package + DCDM 4K">LTO-9 Tape Dual-Redundant Archive + BagIt Package + DCDM 4K (Full Archival Vault)</option>
                  <option value="ProRes 4444 XQ 12-bit Restoration Mezzanine + IMF StEM Master">ProRes 4444 XQ 12-bit Restoration Mezzanine + IMF StEM Master (Streamer Delivery)</option>
                  <option value="SMPTE Interop 4K Theatrical DCP (JPEG 2000 DCI Encrypted)">SMPTE Interop 4K Theatrical DCP (JPEG 2000 DCI Encrypted)</option>
                </select>
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
                  BACK TO COLOR
                </button>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={handleDownloadManifest}
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
                    {isExporting ? "GENERATING MANIFEST..." : "DOWNLOAD RESTORATION CERTIFICATE & MANIFEST"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

