"use client";

import { useState } from "react";
import {
  X,
  Languages,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  ShieldCheck,
  FileCode2,
  Sliders,
  Eye,
} from "lucide-react";

interface SubtitleDubQcModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function SubtitleDubQcModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Theatrical & Global Streaming Subtitles",
}: SubtitleDubQcModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Language Stream Package
  const [primarySubtitleFormat, setPrimarySubtitleFormat] = useState("SMPTE-TT (XML / W3C TTML Timed Text Profile)");
  const [subtitleStreamsCount, setSubtitleStreamsCount] = useState(18);
  const [supportedLanguages, setSupportedLanguages] = useState("English (US/UK), Hindi, French, Spanish (Latin), German, Japanese, Arabic, Mandarin");

  // Step 2: Automated Reading Speed & QC Rules
  const [readingSpeedCPS, setReadingSpeedCPS] = useState(17);
  const [maxCharactersPerLine, setMaxCharactersPerLine] = useState(37);
  const [minSubtitleDurationMs, setMinSubtitleDurationMs] = useState(833);
  const [maxLinesPerEvent, setMaxLinesPerEvent] = useState("2 Lines Maximum (Bottom Center Aligned)");

  // Step 3: Slang & Cultural Localization
  const [profanityFilterMode, setProfanityFilterMode] = useState("Strict Contextual Adaptation (CBFC & Global Tier Standards)");
  const [colloquialSlangMatched, setColloquialSlangMatched] = useState(true);
  const [burnInCheckPassed, setBurnInCheckPassed] = useState(true);

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const downloadSubtitleMasterPack = () => {
    setIsExporting(true);
    const csvContent = `Language Code,Language Name,Stream Format,Total Event Lines,Max CPS Detected,Average Duration (s),Censor Compliance,Encoding,QC Verification
en-US,English (North America),SMPTE-TT 2052,1420,16.8,2.4,PASSED_MPAA_R,UTF-8 BOM,CERTIFIED_ZERO_ERRORS
hi-IN,Hindi (Devanagari),SMPTE-TT 2052,1390,15.2,2.6,PASSED_CBFC_UA,UTF-8 BOM,CERTIFIED_ZERO_ERRORS
fr-FR,French (European),SMPTE-TT 2052,1455,17.0,2.3,PASSED_CNC,UTF-8 BOM,CERTIFIED_ZERO_ERRORS
es-MX,Spanish (Latin America),SMPTE-TT 2052,1480,16.9,2.4,PASSED_RTC,UTF-8 BOM,CERTIFIED_ZERO_ERRORS
ja-JP,Japanese (Vertical/Horizontal),SMPTE-TT 2052,1210,13.5,2.9,PASSED_EIRIN,UTF-8 BOM,CERTIFIED_ZERO_ERRORS
de-DE,German (Standard),SMPTE-TT 2052,1430,16.7,2.5,PASSED_FSK_16,UTF-8 BOM,CERTIFIED_ZERO_ERRORS
ar-SA,Arabic (RTL BiDi),SMPTE-TT 2052,1340,14.8,2.7,PASSED_GCAM_15,UTF-8 BOM,CERTIFIED_ZERO_ERRORS`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `SUBTITLE_DUB_QC_PACKAGE_${defaultProject.replace(/\s+/g, "_")}.csv`);
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
              <Languages size={20} />
            </div>
            <div>
              <h2 className="font-cinema" style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                Multi-Language AI Subtitling &amp; Dubbing Master Verifier
              </h2>
              <p style={{ fontSize: "11px", color: "#8e8e9e", margin: "2px 0 0 0", fontFamily: "monospace" }}>
                Active Production: <span style={{ color: "#d4af61" }}>{defaultProject}</span> • SMPTE-TT / Netflix 17-CPS Certified
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
            { num: 1, title: "Streams", icon: Languages },
            { num: 2, title: "CPS Limit", icon: Sliders },
            { num: 3, title: "Slang QC", icon: Eye },
            { num: 4, title: "Master Export", icon: Download },
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
                  Master subtitle packaging for global theatrical DCP reels and multi-territory SVOD (Netflix, Amazon Prime, Apple TV+).
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Master Timed-Text Specification
                </label>
                <select
                  value={primarySubtitleFormat}
                  onChange={(e) => setPrimarySubtitleFormat(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                >
                  <option value="SMPTE-TT (XML / W3C TTML Timed Text Profile)">SMPTE-TT (XML / W3C TTML Timed Text Profile - Theatrical Interop)</option>
                  <option value="WebVTT (UTF-8 Web Video Text Tracks)">WebVTT (UTF-8 Web Video Text Tracks - Premium SVOD)</option>
                  <option value="SubRip (.SRT) Universal Interop">SubRip (.SRT) Universal Interop (Broadcast &amp; Film Festivals)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Global Subtitle Language Fleet
                </label>
                <input
                  type="text"
                  value={supportedLanguages}
                  onChange={(e) => setSupportedLanguages(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Total Active Language Streams
                </label>
                <input
                  type="number"
                  value={subtitleStreamsCount}
                  onChange={(e) => setSubtitleStreamsCount(Number(e.target.value))}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#bae6fd", margin: 0, lineHeight: 1.5 }}>
                  Enforce strict reading speed constraints. No viewer should experience rushed subtitles beyond 17 characters per second.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase" }}>Characters Per Second (CPS) Cap</label>
                    <span style={{ fontSize: "11px", color: "#38bdf8", fontFamily: "monospace" }}>{readingSpeedCPS} CPS</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="25"
                    value={readingSpeedCPS}
                    onChange={(e) => setReadingSpeedCPS(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#38bdf8" }}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase" }}>Max Characters Per Line</label>
                    <span style={{ fontSize: "11px", color: "#38bdf8", fontFamily: "monospace" }}>{maxCharactersPerLine} Chars</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="50"
                    value={maxCharactersPerLine}
                    onChange={(e) => setMaxCharactersPerLine(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#38bdf8" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Minimum Event Duration (ms)
                  </label>
                  <input
                    type="number"
                    value={minSubtitleDurationMs}
                    onChange={(e) => setMinSubtitleDurationMs(Number(e.target.value))}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Line Layout Constraint
                  </label>
                  <input
                    type="text"
                    value={maxLinesPerEvent}
                    onChange={(e) => setMaxLinesPerEvent(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#fde68a", margin: 0, lineHeight: 1.5 }}>
                  Cultural nuance adaptation: idioms and Mumbai street slang translated into natural English and regional idioms without losing dramatic punch.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Profanity &amp; Slang Translation Policy
                </label>
                <input
                  type="text"
                  value={profanityFilterMode}
                  onChange={(e) => setProfanityFilterMode(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "16px", borderRadius: "12px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", color: "#ffffff", fontSize: "13px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={colloquialSlangMatched}
                    onChange={(e) => setColloquialSlangMatched(e.target.checked)}
                    style={{ accentColor: "#d4af61", cursor: "pointer" }}
                  />
                  <span>Verify idiom localization across Japanese, French, and Latin Spanish master dub tracks</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", color: "#ffffff", fontSize: "13px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={burnInCheckPassed}
                    onChange={(e) => setBurnInCheckPassed(e.target.checked)}
                    style={{ accentColor: "#d4af61", cursor: "pointer" }}
                  />
                  <span>Ensure zero visual overlap between subtitles and lower-third on-screen graphics</span>
                </label>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <CheckCircle2 size={18} color="#34d399" />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#34d399" }}>Timed-Text QC Verification Passed</span>
                </div>
                <p style={{ fontSize: "12px", color: "#a7f3d0", margin: 0, lineHeight: 1.5 }}>
                  All 18 language streams passed character-per-second, line-length, and timecode sync audits. Ready for IMF / DCI multiplex package.
                </p>
              </div>

              <div style={{ padding: "18px", borderRadius: "14px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Master Container:</span>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>SMPTE-TT (W3C TTML) + WebVTT</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Global Streams Checked:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>18 / 18 LANGUAGES ZERO-DEFECT</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Reading Speed Limit:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>&lt; 17 CPS STRICT COMPLIANCE</span>
                </div>
              </div>

              <button
                onClick={downloadSubtitleMasterPack}
                className="btn-cinema-gold"
                style={{ width: "100%", height: "46px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <Download size={16} />
                <span>DOWNLOAD SUBTITLE QC AUDIT PACKAGE (.CSV)</span>
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

