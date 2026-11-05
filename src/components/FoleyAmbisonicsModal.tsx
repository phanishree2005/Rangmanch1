"use client";

import { useState } from "react";
import {
  X,
  Volume2,
  Activity,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  ShieldCheck,
  Sliders,
  Radio,
  Layers,
} from "lucide-react";

interface FoleyAmbisonicsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function FoleyAmbisonicsModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Theatrical Sound Design & Foley",
}: FoleyAmbisonicsModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Ambisonic Field Recording Setup
  const [ambisonicFormat, setAmbisonicFormat] = useState("2nd Order Ambisonics B-Format (9 Channels 360-Spherical)");
  const [fieldRecorderModel, setFieldRecorderModel] = useState("Sound Devices Scorpio 32-Track 192kHz with Sennheiser AMBEO VR Mic");
  const [acousticEnvironment, setAcousticEnvironment] = useState("Mumbai Heavy Monsoon Neon Alley + Metro Viaduct Echo");

  // Step 2: Foley Cue Prop Tracking
  const [footwearSurface, setFootwearSurface] = useState("Tactical Combat Boots on Wet Broken Asphalt");
  const [clothRustleMaterial, setClothRustleMaterial] = useState("Heavy Military Cordura & Kevlar Vest Friction");
  const [propImpactType, setPropImpactType] = useState("Glock 19 Slide Cocking + 9mm Brass Casing Shell Drops on Tile");

  // Step 3: Sound Design Asset Tagging
  const [soundminerTagging, setSoundminerTagging] = useState("Universal Category System (UCS) Compliant XML Ingest");
  const [totalFoleyCues, setTotalFoleyCues] = useState(240);
  const [foleyArtistLead, setFoleyArtistLead] = useState("Karan Arjun Foley Collective (Famous Studios Mahalaxmi)");

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const downloadFoleyCueSheet = () => {
    setIsExporting(true);
    const csvContent = `Cue #,Scene,Timecode In,Timecode Out,Prop / Footstep Material,Mic Placement,Ambisonic Spherical Angle,Foley Artist,Re-recording Channel,QC Status
FOL-01,SC_12_Alley,01:14:02:10,01:14:08:14,Combat Boots on Puddle Asphalt,Close Spot (Schoeps CMC6) + AMBEO,Azimuth 45 Elevation 0,Suresh Foley,FOL_STEPS_L_R,VERIFIED_CLEAN
FOL-02,SC_12_Alley,01:14:10:00,01:14:12:18,Kevlar Vest Draw & Holster Snap,Neumann KM184 Hypercardioid,Azimuth 12 Elevation -10,Suresh Foley,FOL_CLOTH_C,VERIFIED_CLEAN
FOL-03,SC_14_Rooftop,01:28:15:04,01:28:19:22,Glock Slide Rattle & Mag Eject,Sennheiser MKH 416 Boom,Azimuth 0 Elevation +15,Vikram Foley,FOL_WEAPON_L_R,VERIFIED_CLEAN
FOL-04,SC_18_Glass,01:42:11:00,01:42:16:08,Tempered Safety Glass Shatter,B-Format 3D Array 96kHz,Azimuth 270 Elevation +40,Karan Foley,FOL_IMPACT_SURR,VERIFIED_CLEAN
FOL-05,SC_22_Vault,02:05:00:12,02:05:07:00,Heavy Steel Safe Lever Dial Click,Contact Mic Barcus Berry + Ribbon,Azimuth 0 Elevation 0,Vikram Foley,FOL_DETAIL_C,VERIFIED_CLEAN`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `FOLEY_AMBISONIC_CUE_MAP_${defaultProject.replace(/\s+/g, "_")}.csv`);
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
              <Volume2 size={20} />
            </div>
            <div>
              <h2 className="font-cinema" style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                Foley &amp; High-Resolution Ambisonic Sound Effects Bank
              </h2>
              <p style={{ fontSize: "11px", color: "#8e8e9e", margin: "2px 0 0 0", fontFamily: "monospace" }}>
                Active Production: <span style={{ color: "#d4af61" }}>{defaultProject}</span> • 360° Spherical Soundscape Modeling
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
            { num: 1, title: "Ambisonics", icon: Radio },
            { num: 2, title: "Foley Props", icon: Layers },
            { num: 3, title: "UCS Tagging", icon: Sliders },
            { num: 4, title: "Cue Map", icon: Download },
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
                  High-order spherical acoustic captures allow Dolby Atmos re-recording mixers to rotate sound fields dynamically with camera tracking moves.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Ambisonic Recording Format
                </label>
                <input
                  type="text"
                  value={ambisonicFormat}
                  onChange={(e) => setAmbisonicFormat(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Field Recorder Hardware Rig
                </label>
                <input
                  type="text"
                  value={fieldRecorderModel}
                  onChange={(e) => setFieldRecorderModel(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Captured Acoustic Atmosphere
                </label>
                <input
                  type="text"
                  value={acousticEnvironment}
                  onChange={(e) => setAcousticEnvironment(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#bae6fd", margin: 0, lineHeight: 1.5 }}>
                  Foley stage pit surface textures and prop materials meticulously synchronized with the protagonist&apos;s physical action choreography.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Footwear &amp; Surface Interaction
                </label>
                <input
                  type="text"
                  value={footwearSurface}
                  onChange={(e) => setFootwearSurface(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Wardrobe Cloth Rustle Material
                </label>
                <input
                  type="text"
                  value={clothRustleMaterial}
                  onChange={(e) => setClothRustleMaterial(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Mechanical Action Props &amp; Shell Drops
                </label>
                <input
                  type="text"
                  value={propImpactType}
                  onChange={(e) => setPropImpactType(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#fde68a", margin: 0, lineHeight: 1.5 }}>
                  Every sound asset is cataloged with Universal Category System (UCS) taxonomies for seamless Pro Tools, Nuendo, and Soundminer searches.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Total Foley Spot Cues
                  </label>
                  <input
                    type="number"
                    value={totalFoleyCues}
                    onChange={(e) => setTotalFoleyCues(Number(e.target.value))}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Metadata Tagging Standard
                  </label>
                  <input
                    type="text"
                    value={soundminerTagging}
                    onChange={(e) => setSoundminerTagging(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Foley Artist Syndicate &amp; Studio
                </label>
                <input
                  type="text"
                  value={foleyArtistLead}
                  onChange={(e) => setFoleyArtistLead(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <CheckCircle2 size={18} color="#34d399" />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#34d399" }}>Foley &amp; Ambisonics Pack Complete</span>
                </div>
                <p style={{ fontSize: "12px", color: "#a7f3d0", margin: 0, lineHeight: 1.5 }}>
                  240 custom Foley cues recorded, QC verified against clipping, and mapped to picture lock reel markers.
                </p>
              </div>

              <div style={{ padding: "18px", borderRadius: "14px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Ambisonic Sphere:</span>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>2nd Order B-Format 96kHz</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Spot Cues Checked:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>240 / 240 TRACKS PASS</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Re-Recording Sync:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>SMPTE SUB-FRAME LOCKED</span>
                </div>
              </div>

              <button
                onClick={downloadFoleyCueSheet}
                className="btn-cinema-gold"
                style={{ width: "100%", height: "46px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <Download size={16} />
                <span>DOWNLOAD FOLEY MARKER MAP (.CSV)</span>
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

