"use client";

import { useState } from "react";
import {
  X,
  Trophy,
  Award,
  Globe2,
  ShieldCheck,
  CheckCircle2,
  Download,
  RotateCcw,
  Languages,
  FileSpreadsheet,
  Film,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface FilmFestivalManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function FilmFestivalManagerModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Festival Cut",
}: FilmFestivalManagerModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Festival Selection
  const [targetFestival, setTargetFestival] = useState("Festival de Cannes (Un Certain Regard)");
  const [premiereStatus, setPremiereStatus] = useState("World Premiere (Eligible - Never Screened Publicly)");
  const [isAuditingRules, setIsAuditingRules] = useState(false);
  const [rulesAudited, setRulesAudited] = useState(true);

  // Step 2: Subtitles & Languages
  const [primarySubtitle, setPrimarySubtitle] = useState("English (SMPTE 428-7 DCI Timed-Text XML)");
  const [secondaryLang, setSecondaryLang] = useState("French (Sous-titres Français DCI Conformed)");
  const [isValidatingSubs, setIsValidatingSubs] = useState(false);
  const [subsValidated, setSubsValidated] = useState(true);

  // Step 3: Jury Screener Vault
  const [juryCategory, setJuryCategory] = useState("Official Selection Feature Competition Jury");
  const [geoRestriction, setGeoRestriction] = useState("Strict European Union / Cannes Geo-IP Fencing");
  const [isArmingJury, setIsArmingJury] = useState(false);
  const [juryArmed, setJuryArmed] = useState(true);

  // Step 4: Dossier Turnaround
  const [isFinalizingDossier, setIsFinalizingDossier] = useState(false);
  const [dossierProgress, setDossierProgress] = useState(100);
  const [dossierSealed, setDossierSealed] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const markStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
  };

  const handleAuditRules = () => {
    setIsAuditingRules(true);
    setRulesAudited(false);
    setTimeout(() => {
      setIsAuditingRules(false);
      setRulesAudited(true);
      markStepComplete(1);
    }, 1200);
  };

  const handleValidateSubs = () => {
    setIsValidatingSubs(true);
    setSubsValidated(false);
    setTimeout(() => {
      setIsValidatingSubs(false);
      setSubsValidated(true);
      markStepComplete(2);
    }, 1300);
  };

  const handleArmJury = () => {
    setIsArmingJury(true);
    setJuryArmed(false);
    setTimeout(() => {
      setIsArmingJury(false);
      setJuryArmed(true);
      markStepComplete(3);
    }, 1200);
  };

  const handleFinalizeDossier = () => {
    setIsFinalizingDossier(true);
    setDossierProgress(0);
    setDossierSealed(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setDossierProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsFinalizingDossier(false);
        setDossierSealed(true);
        markStepComplete(4);
      }
    }, 280);
  };

  const handleDownloadDossier = () => {
    const payload = JSON.stringify(
      {
        project: defaultProject,
        timestamp: new Date().toISOString(),
        festivalEntity: targetFestival,
        premiereStatusEligibility: premiereStatus,
        technicalDeliverableMaster: {
          dcpFormat: "DCI Scope 2K/4K 24.00fps Interop/SMPTE",
          audioTrack: "5.1 Theatrical LPCM + Dolby Atmos",
          subtitles: [primarySubtitle, secondaryLang],
        },
        juryAccessSecurity: {
          category: juryCategory,
          geoRestriction: geoRestriction,
          watermark: "OFFICIAL_SELECTION_JURY_SEALED",
        },
        submissionStatus: dossierSealed ? "SUBMITTED_AND_LOCKED" : "PROVISIONAL",
      },
      null,
      2
    );

    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Festival_Submission_Dossier_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess("Festival Submission Dossier (.JSON) exported successfully!");
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleDownloadManifestXml = () => {
    const manifestXml = `<?xml version="1.0" encoding="UTF-8"?>
<FestivalScreenerManifest festival="${targetFestival.replace(/[^a-zA-Z0-9]/g, "_")}">
  <ProjectTitle>${defaultProject}</ProjectTitle>
  <RuntimeMinutes>142</RuntimeMinutes>
  <AspectScope>2.39:1</AspectScope>
  <OriginalLanguage>Hindi</OriginalLanguage>
  <SubtitleMaster>${primarySubtitle}</SubtitleMaster>
  <SecondarySubtitle>${secondaryLang}</SecondarySubtitle>
  <JuryTokenVaultId>urn:uuid:7712ba09-c120-4011-88ab-20261101fest</JuryTokenVaultId>
  <AccreditedStatus>COMPLIANT_WITH_FIAPF_A_LIST_REGULATIONS</AccreditedStatus>
</FestivalScreenerManifest>`;

    const blob = new Blob([manifestXml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Jury_Screener_Manifest_${Date.now()}.xml`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess("Jury Screener Manifest (.XML) exported successfully!");
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="modal-backdrop">
      <div
        className="modal-panel"
        style={{
          maxWidth: "840px",
          width: "100%",
          background: "linear-gradient(180deg, #0e1224 0%, #060812 100%)",
          border: "1px solid rgba(99, 102, 241, 0.35)",
          borderRadius: "24px",
          boxShadow: "0 25px 80px rgba(0,0,0,0.95), 0 0 50px rgba(99, 102, 241, 0.12)",
          overflow: "hidden",
        }}
      >
        {/* Top Indigo Trim */}
        <div
          style={{
            height: "3px",
            width: "100%",
            background:
              "linear-gradient(90deg, transparent, #6366f1 25%, #c7d2fe 50%, #6366f1 75%, transparent)",
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
            backgroundColor: "#0a0e1c",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.05) 100%)",
                border: "1px solid rgba(99,102,241,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6366f1",
              }}
            >
              <Trophy size={24} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  letterSpacing: "0.15em",
                  color: "#6366f1",
                  textTransform: "uppercase",
                }}
              >
                Award Circuit &amp; Festivals • Feature 78
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  marginTop: "2px",
                }}
              >
                International Film Festival &amp; Awards Manager
              </h2>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                Production: <span style={{ color: "#6366f1", fontWeight: 600 }}>{defaultProject}</span> • FIAPF A-List Submissions &amp; Jury Screener Protocol
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
            backgroundColor: "#070a14",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            gap: "12px",
          }}
        >
          {[
            { num: 1, label: "Festival Circuit" },
            { num: 2, label: "Subtitle Tracks" },
            { num: 3, label: "Jury Screener" },
            { num: 4, label: "Submit Dossier" },
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
                      ? "#6366f1"
                      : isCompleted
                      ? "rgba(99,102,241,0.2)"
                      : "rgba(255,255,255,0.05)",
                    color: isCurrent
                      ? "#ffffff"
                      : isCompleted
                      ? "#6366f1"
                      : "rgba(255,255,255,0.4)",
                    border: isCurrent
                      ? "none"
                      : isCompleted
                      ? "1px solid rgba(99,102,241,0.4)"
                      : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {isCompleted && !isCurrent ? "✓" : s.num}
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: isCurrent ? "600" : "400",
                    color: isCurrent ? "#6366f1" : isCompleted ? "#ffffff" : "rgba(255,255,255,0.5)",
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
          {/* Step 1: Festival Circuit */}
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(99,102,241,0.06)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Globe2 size={22} color="#6366f1" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#6366f1" }}>
                    Step 1 Process: FIAPF A-List Festival Selection &amp; Premiere Status Compliance
                  </span>{" "}
                  Verify festival eligibility rules for Cannes, Venice, Toronto, Busan, IFFI Goa, and
                  National Film Awards ensuring strict world or international premiere status.
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Target Film Festival
                  </label>
                  <select
                    value={targetFestival}
                    onChange={(e) => setTargetFestival(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#131830",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="Festival de Cannes (Un Certain Regard)">Festival de Cannes (Un Certain Regard - France)</option>
                    <option value="Venice International Film Festival (Orizzonti)">Venice International Film Festival (Orizzonti - Italy)</option>
                    <option value="Toronto International Film Festival (TIFF Gala)">Toronto International Film Festival (TIFF Gala - Canada)</option>
                    <option value="Busan International Film Festival (A Window on Asian Cinema)">Busan International Film Festival (BIFF - South Korea)</option>
                    <option value="International Film Festival of India (IFFI Goa)">IFFI Goa (Golden Peacock International Competition)</option>
                    <option value="National Film Awards (Government of India)">National Film Awards (Directorate of Film Festivals)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Required Premiere Status
                  </label>
                  <select
                    value={premiereStatus}
                    onChange={(e) => setPremiereStatus(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#131830",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="World Premiere (Eligible - Never Screened Publicly)">World Premiere (Eligible - Never Screened Publicly)</option>
                    <option value="International Premiere (Outside Country of Origin)">International Premiere (Outside Country of Origin)</option>
                    <option value="Asian Premiere (Busan / IFFI)">Asian Premiere (Busan / IFFI Category)</option>
                  </select>
                </div>
              </div>

              {/* Eligibility card */}
              <div
                style={{
                  backgroundColor: "#0f152d",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    Festival Rulebook &amp; Deadline Compliance Audit
                  </div>
                  <button
                    onClick={handleAuditRules}
                    disabled={isAuditingRules}
                    style={{
                      background: "rgba(99,102,241,0.15)",
                      border: "1px solid rgba(99,102,241,0.3)",
                      color: "#6366f1",
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
                    <RotateCcw size={13} className={isAuditingRules ? "animate-spin" : ""} />
                    {isAuditingRules ? "Auditing Regulations..." : "⚡ Run Festival Eligibility Check"}
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                  <div style={{ backgroundColor: "#171e3d", padding: "12px", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Submission Deadline</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#6366f1", marginTop: "4px" }}>24 Days Remaining</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>Late Feature Category</div>
                  </div>
                  <div style={{ backgroundColor: "#171e3d", padding: "12px", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Premiere Integrity</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#10b981", marginTop: "4px" }}>WORLD PREMIERE OK</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>No OTT or TV Exposure</div>
                  </div>
                  <div style={{ backgroundColor: "#171e3d", padding: "12px", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>FIAPF Accreditation</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#10b981", marginTop: "4px" }}>COMPLIANT</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>Competitive Feature Slot</div>
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
                    <CheckCircle2 size={14} /> Production clearance approved for official festival competition
                  </span>
                  <button
                    onClick={() => {
                      markStepComplete(1);
                      setActiveStep(2);
                    }}
                    style={{
                      background: "#6366f1",
                      color: "#ffffff",
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
                    Confirm Festival &amp; Sync Subs <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Subtitle Tracks */}
          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(99,102,241,0.06)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Languages size={22} color="#6366f1" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#6366f1" }}>
                    Step 2 Process: SMPTE 428-7 DCI Subtitles &amp; Multilingual Master Conforming
                  </span>{" "}
                  Generate frame-accurate, color-calibrated XML timed-text subtitles in English and
                  French, verified for projection on festival theatre Christie and Barco servers.
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Primary Subtitle Track
                  </label>
                  <select
                    value={primarySubtitle}
                    onChange={(e) => setPrimarySubtitle(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#131830",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="English (SMPTE 428-7 DCI Timed-Text XML)">English (SMPTE 428-7 DCI Timed-Text XML)</option>
                    <option value="English SDH (Hard of Hearing &amp; Sound Descriptors)">English SDH (Hard of Hearing &amp; Sound Descriptors)</option>
                    <option value="Dual Subtitles (English + Hindi Side-by-Side)">Dual Subtitles (English + Hindi Side-by-Side)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Secondary European Language
                  </label>
                  <select
                    value={secondaryLang}
                    onChange={(e) => setSecondaryLang(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#131830",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="French (Sous-titres Français DCI Conformed)">French (Sous-titres Français - Required for Cannes)</option>
                    <option value="Italian (Sottotitoli Italiani - Venice Master)">Italian (Sottotitoli Italiani - Venice Master)</option>
                    <option value="German (Deutsche Untertitel - Berlinale)">German (Deutsche Untertitel - Berlinale Master)</option>
                    <option value="Spanish (Subtítulos en Español - San Sebastián)">Spanish (Subtítulos en Español - San Sebastián)</option>
                  </select>
                </div>
              </div>

              {/* Subtitle verification card */}
              <div
                style={{
                  backgroundColor: "#0f152d",
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
                    Subtitle Reading Speed &amp; Char-per-Second (CPS) Check
                  </div>
                  <button
                    onClick={handleValidateSubs}
                    disabled={isValidatingSubs}
                    style={{
                      background: "rgba(99,102,241,0.15)",
                      border: "1px solid rgba(99,102,241,0.3)",
                      color: "#6366f1",
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
                    <RotateCcw size={12} className={isValidatingSubs ? "animate-spin" : ""} />
                    {isValidatingSubs ? "Validating Timecode..." : "🗣️ Run CPS &amp; Font Verification"}
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                  <div style={{ backgroundColor: "#171e3d", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Reading Speed</div>
                    <div style={{ fontSize: "14px", fontWeight: "bold", color: "#10b981" }}>15.8 CPS (Optimal)</div>
                  </div>
                  <div style={{ backgroundColor: "#171e3d", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Font Embedded</div>
                    <div style={{ fontSize: "14px", fontWeight: "bold", color: "#ffffff" }}>Arial TrueType (TTF)</div>
                  </div>
                  <div style={{ backgroundColor: "#171e3d", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>DCI Position Safe</div>
                    <div style={{ fontSize: "14px", fontWeight: "bold", color: "#6366f1" }}>Bottom 10% Margin</div>
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
                      background: "#6366f1",
                      color: "#ffffff",
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
                    Lock Subtitles &amp; Arm Jury Screener <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Jury Screener */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(99,102,241,0.06)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Award size={22} color="#6366f1" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#6366f1" }}>
                    Step 3 Process: Selection Committee &amp; Jury Screener Security Vault
                  </span>{" "}
                  Generate encrypted festival jury streaming tokens with Geo-IP locking and dynamic
                  forensic watermarks specifically designated for selection committee programmers.
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Festival Jury Division
                  </label>
                  <select
                    value={juryCategory}
                    onChange={(e) => setJuryCategory(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#131830",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="Official Selection Feature Competition Jury">Official Selection Feature Competition Jury</option>
                    <option value="Un Certain Regard Selection Committee">Un Certain Regard Selection Committee</option>
                    <option value="Camera d'Or (Best Debut Feature) Jury">Camera d&apos;Or (Best Debut Feature) Jury</option>
                    <option value="FIPRESCI International Critics Jury">FIPRESCI International Critics Jury</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Geo-IP Perimeter Fencing
                  </label>
                  <select
                    value={geoRestriction}
                    onChange={(e) => setGeoRestriction(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#131830",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="Strict European Union / Cannes Geo-IP Fencing">Strict European Union / Cannes Geo-IP Fencing</option>
                    <option value="Worldwide Whitelisted Jury IP Addresses">Worldwide Whitelisted Jury IP Addresses</option>
                    <option value="Festival Palais Headquarters On-Premises Only">Festival Palais Headquarters On-Premises Only</option>
                  </select>
                </div>
              </div>

              {/* Jury Screener Card */}
              <div
                style={{
                  backgroundColor: "#0f152d",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    Jury Watermarked Preview Link Generator
                  </div>
                  <button
                    onClick={handleArmJury}
                    disabled={isArmingJury}
                    style={{
                      background: "rgba(99,102,241,0.15)",
                      border: "1px solid rgba(99,102,241,0.3)",
                      color: "#6366f1",
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
                    <RotateCcw size={12} className={isArmingJury ? "animate-spin" : ""} />
                    {isArmingJury ? "Generating Jury Token..." : "🔒 Arm 72-Hour Jury Screener"}
                  </button>
                </div>

                <div
                  style={{
                    height: "80px",
                    backgroundColor: "#060812",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px dashed rgba(99,102,241,0.3)",
                    color: "rgba(99,102,241,0.8)",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                  }}
                >
                  OFFICIAL JURY SCREENER • {targetFestival.toUpperCase()} • ENCRYPTED STREAM TOKEN #JURY-2026-FR
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
                      background: "#6366f1",
                      color: "#ffffff",
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
                    Lock Jury Access &amp; Finalize Dossier <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Submit Dossier */}
          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(99,102,241,0.06)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <CheckCircle2 size={22} color="#6366f1" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#6366f1" }}>
                    Step 4 Process: Official Entry Dossier &amp; Festival Submission Package Turnaround
                  </span>{" "}
                  All technical director notes, biography, high-resolution production stills, and
                  DCP subtitle manifests are packaged for official competition registration.
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

              {/* Dossier Runner */}
              <div
                style={{
                  backgroundColor: "#0f152d",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#ffffff" }}>
                    Official Competition Entry Checklist
                  </span>
                  <button
                    onClick={handleFinalizeDossier}
                    disabled={isFinalizingDossier}
                    style={{
                      background: "rgba(99,102,241,0.15)",
                      border: "1px solid rgba(99,102,241,0.3)",
                      color: "#6366f1",
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
                    <RotateCcw size={12} className={isFinalizingDossier ? "animate-spin" : ""} />
                    {isFinalizingDossier ? `Sealing Submission (${dossierProgress}%)...` : "🚀 Finalize Festival Dossier"}
                  </button>
                </div>

                {isFinalizingDossier && (
                  <div style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#6366f1", marginBottom: "4px" }}>
                      <span>Assembling Cannes/Venice entry forms &amp; subtitle hashes...</span>
                      <span>{dossierProgress}%</span>
                    </div>
                    <div style={{ width: "100%", height: "6px", backgroundColor: "#171e3d", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${dossierProgress}%`, height: "100%", backgroundColor: "#6366f1", transition: "width 0.25s ease" }} />
                    </div>
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#131830", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>Director&apos;s Vision Statement</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>English &amp; French Translated</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#131830", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>Production Cast &amp; Crew EPK</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Complete Bio Dossier Attached</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#131830", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>Jury Screener Token</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>72h Watermarked Preview Active</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#131830", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>FIAPF World Premiere Proof</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Zero Commercial Exploitation Verified</div>
                    </div>
                  </div>
                </div>

                {dossierSealed && (
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
                        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#10b981" }}>FESTIVAL SUBMISSION DOSSIER SEALED &amp; REGISTERED</div>
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>Accredited entry package ready for selection committee evaluation.</div>
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
                      A-LIST READY
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                <button
                  onClick={handleDownloadDossier}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                    color: "#ffffff",
                    fontWeight: "600",
                    fontSize: "13px",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
                  }}
                >
                  <Download size={16} />
                  Export Entry Dossier (.JSON)
                </button>

                <button
                  onClick={handleDownloadManifestXml}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    backgroundColor: "#131830",
                    border: "1px solid rgba(99,102,241,0.4)",
                    color: "#6366f1",
                    fontWeight: "600",
                    fontSize: "13px",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                >
                  <FileSpreadsheet size={16} />
                  Export Screener Manifest (.XML)
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
            backgroundColor: "#070a14",
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
                  background: "#6366f1",
                  border: "none",
                  color: "#ffffff",
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
                Close &amp; Submit Entry
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

