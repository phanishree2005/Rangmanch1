"use client";

import { useState } from "react";
import {
  X,
  Megaphone,
  Image,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Download,
  RotateCcw,
  Video,
  FileSpreadsheet,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface TheatricalCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function TheatricalCampaignModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Theatrical Marketing Campaign",
}: TheatricalCampaignModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Print Key Art
  const [billboardFormat, setBillboardFormat] = useState("Highway Hoarding (40ft x 20ft - 300 DPI CMYK)");
  const [posterStyle, setPosterStyle] = useState("Character Reveal Action Trio (Black & Gold Premium)");
  const [isRenderingKeyArt, setIsRenderingKeyArt] = useState(false);
  const [keyArtRendered, setKeyArtRendered] = useState(true);

  // Step 2: Video Asset Transcode
  const [primaryAspect, setPrimaryAspect] = useState("16:9 Theatrical Trailer (4K ProRes 422HQ)");
  const [socialFormat, setSocialFormat] = useState("9:16 Vertical Reel (Instagram / YouTube Shorts)");
  const [isTranscoding, setIsTranscoding] = useState(false);
  const [transcodeComplete, setTranscodeComplete] = useState(true);

  // Step 3: Press Screener DRM
  const [criticName, setCriticName] = useState("Anupama Chopra (Film Companion)");
  const [drmExpiry, setDrmExpiry] = useState("48 Hours from First Playback");
  const [isGeneratingTokens, setIsGeneratingTokens] = useState(false);
  const [tokensGenerated, setTokensGenerated] = useState(true);

  // Step 4: EPK Turnaround
  const [isPackagingEpk, setIsPackagingEpk] = useState(false);
  const [packagingProgress, setPackagingProgress] = useState(100);
  const [epkSealed, setEpkSealed] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const markStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
  };

  const handleRenderKeyArt = () => {
    setIsRenderingKeyArt(true);
    setKeyArtRendered(false);
    setTimeout(() => {
      setIsRenderingKeyArt(false);
      setKeyArtRendered(true);
      markStepComplete(1);
    }, 1200);
  };

  const handleTranscode = () => {
    setIsTranscoding(true);
    setTranscodeComplete(false);
    setTimeout(() => {
      setIsTranscoding(false);
      setTranscodeComplete(true);
      markStepComplete(2);
    }, 1300);
  };

  const handleGenerateTokens = () => {
    setIsGeneratingTokens(true);
    setTokensGenerated(false);
    setTimeout(() => {
      setIsGeneratingTokens(false);
      setTokensGenerated(true);
      markStepComplete(3);
    }, 1200);
  };

  const handlePackageEpk = () => {
    setIsPackagingEpk(true);
    setPackagingProgress(0);
    setEpkSealed(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setPackagingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsPackagingEpk(false);
        setEpkSealed(true);
        markStepComplete(4);
      }
    }, 280);
  };

  const handleDownloadEpk = () => {
    const payload = JSON.stringify(
      {
        project: defaultProject,
        timestamp: new Date().toISOString(),
        publicityAgency: "Rangmanch Entertainment Brand & Digital Media Labs",
        theatricalKeyArt: {
          format: billboardFormat,
          dimensionsCMYK: "12,000 x 6,000 Pixels TIFF 300DPI",
          style: posterStyle,
          colorProfile: "FOGRA39 Commercial Print",
        },
        socialVideoDeliverables: {
          primaryMaster: primaryAspect,
          verticalCutdowns: socialFormat,
          subtitles: "Burned-in English & Hindi Devanagari",
        },
        pressScreenerSecurity: {
          leadReviewerAssigned: criticName,
          tokenValidity: drmExpiry,
          watermarkPayload: "DYNAMIC_DIAGONAL_CRITIC_NAME_IP_TIMESTAMP",
        },
        epkStatus: epkSealed ? "APPROVED_FOR_GLOBAL_PRESS" : "PROVISIONAL",
      },
      null,
      2
    );

    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Electronic_Press_Kit_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess("Electronic Press Kit (EPK.json) exported successfully!");
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleDownloadTokensCsv = () => {
    const csvContent = `Reviewer,Outlet,TokenId,Expiry,DRM_Watermark_Pattern,StreamStatus
Anupama Chopra,Film Companion,tk_ac_918204,48 Hours,AC_FILM_COMPANION_10.22.4.11,ACTIVE_UNWATCHED
Rajeev Masand,Media Consultant,tk_rm_182049,48 Hours,RAJEEV_MASAND_AUTHORIZED,ACTIVE_UNWATCHED
Baradwaj Rangan,Galatta Plus,tk_br_991823,48 Hours,BARADWAJ_RANGAN_PRESS,ACTIVE_UNWATCHED
Sucharita Tyagi,Independent Critic,tk_st_481023,48 Hours,SUCHARITA_TYAGI_REVIEW,ACTIVE_UNWATCHED
`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Influencer_Screener_Tokens_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess("Influencer Screener Tokens CSV exported successfully!");
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="modal-backdrop">
      <div
        className="modal-panel"
        style={{
          maxWidth: "840px",
          width: "100%",
          background: "linear-gradient(180deg, #1c0a13 0%, #0d0408 100%)",
          border: "1px solid rgba(244, 63, 94, 0.35)",
          borderRadius: "24px",
          boxShadow: "0 25px 80px rgba(0,0,0,0.95), 0 0 50px rgba(244, 63, 94, 0.12)",
          overflow: "hidden",
        }}
      >
        {/* Top Rose Trim */}
        <div
          style={{
            height: "3px",
            width: "100%",
            background:
              "linear-gradient(90deg, transparent, #f43f5e 25%, #fecdd3 50%, #f43f5e 75%, transparent)",
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
            backgroundColor: "#14060d",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, rgba(244,63,94,0.2) 0%, rgba(244,63,94,0.05) 100%)",
                border: "1px solid rgba(244,63,94,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f43f5e",
              }}
            >
              <Megaphone size={24} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  letterSpacing: "0.15em",
                  color: "#f43f5e",
                  textTransform: "uppercase",
                }}
              >
                Publicity &amp; Campaign Vault • Feature 77
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  marginTop: "2px",
                }}
              >
                Theatrical Marketing &amp; Influencer Vault
              </h2>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                Production: <span style={{ color: "#f43f5e", fontWeight: 600 }}>{defaultProject}</span> • Multi-Format Key Art, Social Teasers &amp; DRM Screeners
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
            backgroundColor: "#0d0408",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            gap: "12px",
          }}
        >
          {[
            { num: 1, label: "Print Key Art" },
            { num: 2, label: "Social Video Sync" },
            { num: 3, label: "DRM Screeners" },
            { num: 4, label: "EPK Press Kit" },
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
                      ? "#f43f5e"
                      : isCompleted
                      ? "rgba(244,63,94,0.2)"
                      : "rgba(255,255,255,0.05)",
                    color: isCurrent
                      ? "#3b0716"
                      : isCompleted
                      ? "#f43f5e"
                      : "rgba(255,255,255,0.4)",
                    border: isCurrent
                      ? "none"
                      : isCompleted
                      ? "1px solid rgba(244,63,94,0.4)"
                      : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {isCompleted && !isCurrent ? "✓" : s.num}
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: isCurrent ? "600" : "400",
                    color: isCurrent ? "#f43f5e" : isCompleted ? "#ffffff" : "rgba(255,255,255,0.5)",
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
          {/* Step 1: Print Key Art */}
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(244,63,94,0.06)",
                  border: "1px solid rgba(244,63,94,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Image size={22} color="#f43f5e" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#f43f5e" }}>
                    Step 1 Process: High-Resolution Key Art &amp; Outdoor Advertising Hoardings
                  </span>{" "}
                  Calibrate 300 DPI CMYK master posters for nationwide highway hoardings,
                  metro wraps, cinema lobby standees, and newspaper advertorials.
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Outdoor Billboard Specification
                  </label>
                  <select
                    value={billboardFormat}
                    onChange={(e) => setBillboardFormat(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#1e0c15",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="Highway Hoarding (40ft x 20ft - 300 DPI CMYK)">Highway Hoarding (40ft x 20ft - 300 DPI CMYK)</option>
                    <option value="Metro Train &amp; Station Wrap (Full Livery)">Metro Train &amp; Station Wrap (Full Vinyl Livery)</option>
                    <option value="Multiplex Standee &amp; Backlit Translight">Multiplex Standee &amp; 8ft Backlit Translight</option>
                    <option value="Bus Shelter &amp; Pillar Banners (10ft x 6ft)">Bus Shelter &amp; Pillar Banners (10ft x 6ft)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Key Art Design Direction
                  </label>
                  <select
                    value={posterStyle}
                    onChange={(e) => setPosterStyle(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#1e0c15",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="Character Reveal Action Trio (Black &amp; Gold Premium)">Character Reveal Action Trio (Black &amp; Gold Premium)</option>
                    <option value="Gritty Heartland Noir Dramatic Close-Up">Gritty Heartland Noir Dramatic Close-Up</option>
                    <option value="Ensemble Cast High-Octane Motion Poster">Ensemble Cast High-Octane Motion Poster</option>
                  </select>
                </div>
              </div>

              {/* Key Art Specs Card */}
              <div
                style={{
                  backgroundColor: "#160910",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    Print Resolution &amp; Pre-Press Proofing
                  </div>
                  <button
                    onClick={handleRenderKeyArt}
                    disabled={isRenderingKeyArt}
                    style={{
                      background: "rgba(244,63,94,0.15)",
                      border: "1px solid rgba(244,63,94,0.3)",
                      color: "#f43f5e",
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
                    <RotateCcw size={13} className={isRenderingKeyArt ? "animate-spin" : ""} />
                    {isRenderingKeyArt ? "Rendering 300 DPI CMYK..." : "⚡ Render Pre-Press Color Proof"}
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                  <div style={{ backgroundColor: "#220d18", padding: "12px", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Color Profile</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#ffffff", marginTop: "4px" }}>FOGRA39 CMYK</div>
                    <div style={{ fontSize: "11px", color: "#f43f5e", marginTop: "2px" }}>Zero Ink Bleed</div>
                  </div>
                  <div style={{ backgroundColor: "#220d18", padding: "12px", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Canvas Size</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#ffffff", marginTop: "4px" }}>12,000 × 6,000 px</div>
                    <div style={{ fontSize: "11px", color: "#10b981", marginTop: "2px" }}>Ultra-Sharp Vector Layers</div>
                  </div>
                  <div style={{ backgroundColor: "#220d18", padding: "12px", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Print Ready Status</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#10b981", marginTop: "4px" }}>PASSED AUDIT</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>Approved by Art Director</div>
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
                    <CheckCircle2 size={14} /> Typography, billing block &amp; CBFC stamp placed according to legal standards
                  </span>
                  <button
                    onClick={() => {
                      markStepComplete(1);
                      setActiveStep(2);
                    }}
                    style={{
                      background: "#f43f5e",
                      color: "#3b0716",
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
                    Confirm Key Art &amp; Cut Videos <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Social Video Sync */}
          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(244,63,94,0.06)",
                  border: "1px solid rgba(244,63,94,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Video size={22} color="#f43f5e" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#f43f5e" }}>
                    Step 2 Process: Multi-Aspect Ratio Teaser &amp; Social Video Cut-downs
                  </span>{" "}
                  Automatically reframe and optimize master cinema trailers for 16:9 YouTube / Broadcast
                  and 9:16 vertical reels for Instagram, TikTok, and YouTube Shorts.
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Primary Theatrical Cut
                  </label>
                  <select
                    value={primaryAspect}
                    onChange={(e) => setPrimaryAspect(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#1e0c15",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="16:9 Theatrical Trailer (4K ProRes 422HQ)">16:9 Theatrical Trailer (4K ProRes 422HQ - 2m 45s)</option>
                    <option value="16:9 Teaser Announcement (4K - 1m 15s)">16:9 Teaser Announcement (4K - 1m 15s)</option>
                    <option value="16:9 30-Second Commercial Spot (TV/OTT Ad)">16:9 30-Second Commercial Spot (TV/OTT Ad)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Mobile Vertical Social Master
                  </label>
                  <select
                    value={socialFormat}
                    onChange={(e) => setSocialFormat(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#1e0c15",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="9:16 Vertical Reel (Instagram / YouTube Shorts)">9:16 Vertical Reel (Smart Face Centering - 60s)</option>
                    <option value="1:1 Square Feed Asset (Instagram Post / Meta Ad)">1:1 Square Feed Asset (Instagram Post / Meta Ad)</option>
                    <option value="4:5 Portrait Optimized (X / Facebook Feed)">4:5 Portrait Optimized (X / Facebook Feed)</option>
                  </select>
                </div>
              </div>

              {/* Video transcode console */}
              <div
                style={{
                  backgroundColor: "#160910",
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
                    Automated Audio Loudness &amp; Subtitle Burn-In
                  </div>
                  <button
                    onClick={handleTranscode}
                    disabled={isTranscoding}
                    style={{
                      background: "rgba(244,63,94,0.15)",
                      border: "1px solid rgba(244,63,94,0.3)",
                      color: "#f43f5e",
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
                    <RotateCcw size={12} className={isTranscoding ? "animate-spin" : ""} />
                    {isTranscoding ? "Transcoding Assets..." : "🎬 Batch Render Cut-Downs"}
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                  <div style={{ backgroundColor: "#220d18", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Mobile Target Audio</div>
                    <div style={{ fontSize: "14px", fontWeight: "bold", color: "#ffffff" }}>-14.0 LUFS Normalized</div>
                  </div>
                  <div style={{ backgroundColor: "#220d18", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Devanagari Subtitles</div>
                    <div style={{ fontSize: "14px", fontWeight: "bold", color: "#10b981" }}>SYNCHRONIZED</div>
                  </div>
                  <div style={{ backgroundColor: "#220d18", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Color Profile</div>
                    <div style={{ fontSize: "14px", fontWeight: "bold", color: "#f43f5e" }}>Rec.709 sRGB Gamma 2.4</div>
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
                      background: "#f43f5e",
                      color: "#3b0716",
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
                    Lock Videos &amp; Arm DRM Screeners <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: DRM Screeners */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(244,63,94,0.06)",
                  border: "1px solid rgba(244,63,94,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Lock size={22} color="#f43f5e" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#f43f5e" }}>
                    Step 3 Process: Forensic Watermarking &amp; Critic Screener Token Vault
                  </span>{" "}
                  Distribute pre-release press preview links with non-destructive, dynamic diagonal watermarks
                  containing reviewer names, phone numbers, and timecode overlays to prevent piracy leaks.
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Recipient Press Critic / Influencer
                  </label>
                  <select
                    value={criticName}
                    onChange={(e) => setCriticName(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#1e0c15",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="Anupama Chopra (Film Companion)">Anupama Chopra (Film Companion)</option>
                    <option value="Baradwaj Rangan (Galatta Plus)">Baradwaj Rangan (Galatta Plus)</option>
                    <option value="Rajeev Masand (Media Consultant)">Rajeev Masand (Media Consultant)</option>
                    <option value="Sucharita Tyagi (Independent Critic)">Sucharita Tyagi (Independent Critic)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Screener Token Expiry Window
                  </label>
                  <select
                    value={drmExpiry}
                    onChange={(e) => setDrmExpiry(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#1e0c15",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="48 Hours from First Playback">48 Hours from First Playback (Strict Press Embargo)</option>
                    <option value="24 Hours (Single-Session Screening)">24 Hours (Single-Session VIP Screening)</option>
                    <option value="7 Days (National Film Awards Jury)">7 Days (National Film Awards Jury)</option>
                  </select>
                </div>
              </div>

              {/* Watermark security preview */}
              <div
                style={{
                  backgroundColor: "#160910",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    Dynamic Forensic Watermark Burn-in
                  </div>
                  <button
                    onClick={handleGenerateTokens}
                    disabled={isGeneratingTokens}
                    style={{
                      background: "rgba(244,63,94,0.15)",
                      border: "1px solid rgba(244,63,94,0.3)",
                      color: "#f43f5e",
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
                    <RotateCcw size={12} className={isGeneratingTokens ? "animate-spin" : ""} />
                    {isGeneratingTokens ? "Generating Tokens..." : "🔒 Issue Watermarked Token"}
                  </button>
                </div>

                <div
                  style={{
                    height: "80px",
                    backgroundColor: "#0d0408",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px dashed rgba(244,63,94,0.3)",
                    color: "rgba(244,63,94,0.7)",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                  }}
                >
                  PROPERTY OF RANGMANCH • FOR REVIEW BY {criticName.toUpperCase()} ONLY • IP 10.42.18.21
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
                      background: "#f43f5e",
                      color: "#3b0716",
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
                    Confirm Screeners &amp; Build EPK <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: EPK Press Kit */}
          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(244,63,94,0.06)",
                  border: "1px solid rgba(244,63,94,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <CheckCircle2 size={22} color="#f43f5e" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#f43f5e" }}>
                    Step 4 Process: Electronic Press Kit (EPK) Compilation &amp; Turnaround Export
                  </span>{" "}
                  All synopsis dossiers, high-res film stills, cast bios, and video promo links are bundled.
                  Export the production EPK for entertainment press and national media outlets.
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

              {/* Packaging runner */}
              <div
                style={{
                  backgroundColor: "#160910",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#ffffff" }}>
                    Production EPK Media Bundle Checklist
                  </span>
                  <button
                    onClick={handlePackageEpk}
                    disabled={isPackagingEpk}
                    style={{
                      background: "rgba(244,63,94,0.15)",
                      border: "1px solid rgba(244,63,94,0.3)",
                      color: "#f43f5e",
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
                    <RotateCcw size={12} className={isPackagingEpk ? "animate-spin" : ""} />
                    {isPackagingEpk ? `Assembling EPK (${packagingProgress}%)...` : "🚀 Validate EPK Media Bundle"}
                  </button>
                </div>

                {isPackagingEpk && (
                  <div style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#f43f5e", marginBottom: "4px" }}>
                      <span>Archiving high-resolution stills &amp; director statements...</span>
                      <span>{packagingProgress}%</span>
                    </div>
                    <div style={{ width: "100%", height: "6px", backgroundColor: "#220d18", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${packagingProgress}%`, height: "100%", backgroundColor: "#f43f5e", transition: "width 0.25s ease" }} />
                    </div>
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#1e0c15", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>Director &amp; Star Interviews</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Transcribed Soundbites Included</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#1e0c15", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>300 DPI Production Unit Stills</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>24 Master JPEG/TIFF Files</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#1e0c15", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>Social Media Hashtag Guide</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Trending Campaign Tags Verified</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#1e0c15", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>Full Billing Credit Roll</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Legal Approval Confirmed</div>
                    </div>
                  </div>
                </div>

                {epkSealed && (
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
                        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#10b981" }}>EPK MEDIA BUNDLE SEALED &amp; APPROVED</div>
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>All digital and print marketing assets verified and ready for national press dispatch.</div>
                      </div>
                    </div>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "999px",
                        backgroundColor: "#10b981",
                        color: "#022c22",
                        fontSize: "11px",
                        fontWeight: "bold",
                      }}
                    >
                      EPK READY
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                <button
                  onClick={handleDownloadEpk}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
                    color: "#ffffff",
                    fontWeight: "600",
                    fontSize: "13px",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(244,63,94,0.3)",
                  }}
                >
                  <Download size={16} />
                  Export Electronic Press Kit (.JSON)
                </button>

                <button
                  onClick={handleDownloadTokensCsv}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    backgroundColor: "#1e0c15",
                    border: "1px solid rgba(244,63,94,0.4)",
                    color: "#f43f5e",
                    fontWeight: "600",
                    fontSize: "13px",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                >
                  <FileSpreadsheet size={16} />
                  Export Screener Tokens (CSV)
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
            backgroundColor: "#0d0408",
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
                  background: "#f43f5e",
                  border: "none",
                  color: "#3b0716",
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
                Close &amp; Deploy Campaign
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

