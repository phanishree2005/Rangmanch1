"use client";

import { useState } from "react";
import {
  X,
  FileText,
  Coins,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  ShieldCheck,
  Disc,
  DollarSign,
  TrendingUp,
} from "lucide-react";

interface SoundtrackLicensingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function SoundtrackLicensingModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Original Motion Picture Soundtrack",
}: SoundtrackLicensingModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Music Catalog & Sync Clearance
  const [musicCatalogType, setMusicCatalogType] = useState("Original Score + 5 Featured Vocal Tracks");
  const [syncLicenseScope, setSyncLicenseScope] = useState("Worldwide Theatrical, OTT/SVOD, Airlines, Satellite & Social Media Sync");
  const [iprsRegistrationNo, setIprsRegistrationNo] = useState("IPRS-CINEMA-2026-9810");

  // Step 2: Publisher & Royalty Waterfall Split
  const [composerSplit, setComposerSplit] = useState(50);
  const [lyricistSplit, setLyricistSplit] = useState(50);
  const [labelMasterRoyalty, setLabelMasterRoyalty] = useState("T-Series / Sony Music India Master Co-Share (18% Net Receipts)");
  const [publishingEscrowGuaranteed, setPublishingEscrowGuaranteed] = useState("₹1,75,00,000 (Locked in ICICI Cinema Escrow)");

  // Step 3: Global Territory & OTT Windows
  const [theatricalHoldbackMonths, setTheatricalHoldbackMonths] = useState(8);
  const [reelsShortformClearance, setReelsShortformClearance] = useState(true);
  const [neighbouringRightsPPL, setNeighbouringRightsPPL] = useState(true);

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const downloadCueSheetCSV = () => {
    setIsExporting(true);
    const csvContent = `Track #,Song Title,Duration,Use Type,Composer,Lyricist,Publishing Society,Master Rights Owner,Composer Share %,Lyricist Share %,ISRC Code,IPRS Sync Clearance
01,Antim Prahar Theme,03:42,Background Instrumental,Salim Merchant,Instrumental,IPRS / PRS UK,Rangmanch Music Vault,100%,0%,IN-RGM-26-0001,CLEARED_ESCROW
02,Dhuaan aur Roshni,04:15,Visual Vocal Featured,Arijit Singh / Pritam,Amitabh Bhattacharya,IPRS India,Sony Music Entertainment,50%,50%,IN-SME-26-4412,CLEARED_ESCROW
03,Shadows of Deccan,03:10,Source Music Radio,Amit Trivedi,Swanand Kirkire,IPRS India,T-Series Super Cassettes,50%,50%,IN-TS-26-8891,CLEARED_ESCROW
04,Rooftop Requiem,02:50,Climactic Fight Score,A.R. Rahman,Instrumental,IPRS / ASCAP,Rangmanch Music Vault,100%,0%,IN-RGM-26-0002,CLEARED_ESCROW
05,Bandra Midnight Blue,03:30,End Credits Vocal,Shreya Ghoshal / Vishal,Irshad Kamil,IPRS India,Zee Music Company,50%,50%,IN-ZMC-26-1102,CLEARED_ESCROW`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `CISAC_IPRS_CUE_SHEET_${defaultProject.replace(/\s+/g, "_")}.csv`);
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
              <FileText size={20} />
            </div>
            <div>
              <h2 className="font-cinema" style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                Film Soundtrack Licensing, IPRS Royalties &amp; Cue-Sheet Publishing
              </h2>
              <p style={{ fontSize: "11px", color: "#8e8e9e", margin: "2px 0 0 0", fontFamily: "monospace" }}>
                Active Motion Picture: <span style={{ color: "#d4af61" }}>{defaultProject}</span> • CISAC Certified Royalty Waterfall
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
            { num: 1, title: "Sync Scope", icon: Disc },
            { num: 2, title: "Royalty Splits", icon: Coins },
            { num: 3, title: "OTT Windows", icon: TrendingUp },
            { num: 4, title: "CISAC Cue Sheet", icon: Download },
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
                  Define musical works catalog, master recording clearances, and statutory copyright society registrations with IPRS &amp; PPL India.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Soundtrack Catalog Structure
                </label>
                <input
                  type="text"
                  value={musicCatalogType}
                  onChange={(e) => setMusicCatalogType(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Synchronization Rights Territory &amp; Media Scope
                </label>
                <input
                  type="text"
                  value={syncLicenseScope}
                  onChange={(e) => setSyncLicenseScope(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  IPRS / CISAC Master Registration ID
                </label>
                <input
                  type="text"
                  value={iprsRegistrationNo}
                  onChange={(e) => setIprsRegistrationNo(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#bae6fd", margin: 0, lineHeight: 1.5 }}>
                  Statutory 2012 Copyright Amendment compliant 50:50 author split between composer and lyricist with automated smart banking escrow payout.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase" }}>Music Composer Share</label>
                    <span style={{ fontSize: "11px", color: "#38bdf8", fontFamily: "monospace" }}>{composerSplit}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={composerSplit}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setComposerSplit(val);
                      setLyricistSplit(100 - val);
                    }}
                    style={{ width: "100%", accentColor: "#38bdf8" }}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase" }}>Lyricist Author Share</label>
                    <span style={{ fontSize: "11px", color: "#38bdf8", fontFamily: "monospace" }}>{lyricistSplit}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={lyricistSplit}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setLyricistSplit(val);
                      setComposerSplit(100 - val);
                    }}
                    style={{ width: "100%", accentColor: "#38bdf8" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Record Label Master Rights Syndicate
                </label>
                <input
                  type="text"
                  value={labelMasterRoyalty}
                  onChange={(e) => setLabelMasterRoyalty(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Advance Minimum Guarantee Escrow
                </label>
                <input
                  type="text"
                  value={publishingEscrowGuaranteed}
                  onChange={(e) => setPublishingEscrowGuaranteed(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#fde68a", margin: 0, lineHeight: 1.5 }}>
                  Theatrical exclusivity holdback window and social viral licensing (Instagram Reels, YouTube Shorts, TikTok sound sync).
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Theatrical Exclusivity Holdback (Weeks)
                </label>
                <input
                  type="number"
                  value={theatricalHoldbackMonths}
                  onChange={(e) => setTheatricalHoldbackMonths(Number(e.target.value))}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "16px", borderRadius: "12px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", color: "#ffffff", fontSize: "13px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={reelsShortformClearance}
                    onChange={(e) => setReelsShortformClearance(e.target.checked)}
                    style={{ accentColor: "#d4af61", cursor: "pointer" }}
                  />
                  <span>Clear worldwide micro-sync rights for viral marketing audio clips (Reels/Shorts)</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", color: "#ffffff", fontSize: "13px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={neighbouringRightsPPL}
                    onChange={(e) => setNeighbouringRightsPPL(e.target.checked)}
                    style={{ accentColor: "#d4af61", cursor: "pointer" }}
                  />
                  <span>Enroll in PPL India Neighbouring Rights for public commercial broadcasting collection</span>
                </label>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <CheckCircle2 size={18} color="#34d399" />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#34d399" }}>CISAC Standard Cue-Sheet Ready</span>
                </div>
                <p style={{ fontSize: "12px", color: "#a7f3d0", margin: 0, lineHeight: 1.5 }}>
                  Statutory cue sheet formatted for instant ingestion by global performance rights organizations (IPRS, ASCAP, BMI, PRS).
                </p>
              </div>

              <div style={{ padding: "18px", borderRadius: "14px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Total Track Count:</span>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>5 Cues (Total Time: 17m 27s)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Royalty Escrow Status:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>₹1.75 Cr SECURED IN ESCROW</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Legal Compliance:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>2012 COPYRIGHT ACT VERIFIED</span>
                </div>
              </div>

              <button
                onClick={downloadCueSheetCSV}
                className="btn-cinema-gold"
                style={{ width: "100%", height: "46px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <Download size={16} />
                <span>DOWNLOAD CISAC / IPRS CUE SHEET (.CSV)</span>
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

