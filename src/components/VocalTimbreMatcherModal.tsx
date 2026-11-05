"use client";

import { useState } from "react";
import {
  X,
  Mic,
  Sparkles,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  ShieldCheck,
  Music2,
  Languages,
  Sliders,
  UserCheck,
} from "lucide-react";

interface VocalTimbreMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function VocalTimbreMatcherModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Pan-India Vocal Adaptation",
}: VocalTimbreMatcherModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Source Song & Dialect Adaptation
  const [sourceTrack, setSourceTrack] = useState("Dhuaan aur Roshni (Original Hindi - Arijit Singh)");
  const [targetLanguages, setTargetLanguages] = useState(["Tamil", "Telugu", "Kannada", "Malayalam"]);
  const [metricSyllableMatching, setMetricSyllableMatching] = useState("Strict Poetic Meter (14 Matras per line matched)");

  // Step 2: Vocal Timbre & Pitch Analysis
  const [vocalRange, setVocalRange] = useState("C3 to G4 (Baritenor Dynamic Chest Voice)");
  const [vibratoSpeed, setVibratoSpeed] = useState("5.8 Hz with Smooth Decrescendo");
  const [formantResonance, setFormantResonance] = useState("High Pharyngeal Warmth (Acoustic Match 96.4%)");

  // Step 3: Dub Vocalist Shortlisting
  const [selectedTamilSinger, setSelectedTamilSinger] = useState("Sid Sriram (Carnatic-Infused Soul)");
  const [selectedTeluguSinger, setSelectedTeluguSinger] = useState("Armaan Malik (Smooth Contemporary Romantic)");
  const [singerContractCleared, setSingerContractCleared] = useState(true);

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const downloadLyricAdaptationPack = () => {
    setIsExporting(true);
    const csvContent = `Language,Song Title,Vocal Lead,Vocal Range,Timbre Similarity %,Meter Accuracy %,Lyricist,Dubbing Studio,Availability Window
Tamil,Pugaiyum Oliyum,Sid Sriram,C3 - G4,97.2%,99.1%,Madhan Karky,AR Studios Chennai,08-Nov to 12-Nov (Confirmed)
Telugu,Poga Mariyu Velugu,Armaan Malik,C3 - G4,96.4%,98.8%,Ramajogayya Sastry,Prasad Labs Hyderabad,10-Nov to 14-Nov (Confirmed)
Kannada,Hogeyu Belaku,Sanjith Hegde,C3 - G4,95.8%,99.3%,Jayanth Kaikini,Renukamba Studio Bengaluru,11-Nov to 15-Nov (Confirmed)
Malayalam,Pukayum Velichavum,Haricharan,C3 - G4,98.1%,99.5%,Rafeeq Ahamed,Chitranjali Studio Kochi,12-Nov to 16-Nov (Confirmed)`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `VOCAL_TIMBRE_ADAPTATION_${defaultProject.replace(/\s+/g, "_")}.csv`);
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
              <Mic size={20} />
            </div>
            <div>
              <h2 className="font-cinema" style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                AI Lyric Adaptation &amp; Multilingual Singer Voice Matcher
              </h2>
              <p style={{ fontSize: "11px", color: "#8e8e9e", margin: "2px 0 0 0", fontFamily: "monospace" }}>
                Active Adaptation: <span style={{ color: "#d4af61" }}>{defaultProject}</span> • AI Formant &amp; Metric Syllable Sync
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
            { num: 1, title: "Lyric Meter", icon: Languages },
            { num: 2, title: "Timbre AI", icon: Sparkles },
            { num: 3, title: "Vocalists", icon: UserCheck },
            { num: 4, title: "Dub Pack", icon: Download },
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
                  Preserve emotional cadence across Pan-India regional dubs by calculating syllable stress and melodic rhyme accents.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Source Hindi Master Vocal
                </label>
                <input
                  type="text"
                  value={sourceTrack}
                  onChange={(e) => setSourceTrack(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Metric Syllable Synchronization Rule
                </label>
                <input
                  type="text"
                  value={metricSyllableMatching}
                  onChange={(e) => setMetricSyllableMatching(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: "11px", color: "#606070", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
                  Target Regional Dub Markets
                </span>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {["Tamil (Kollywood)", "Telugu (Tollywood)", "Kannada (Sandalwood)", "Malayalam (Mollywood)"].map((lang) => (
                    <span key={lang} style={{ padding: "6px 12px", borderRadius: "8px", backgroundColor: "rgba(212, 175, 97, 0.12)", border: "1px solid rgba(212, 175, 97, 0.3)", color: "#f7e7c4", fontSize: "11px" }}>
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#bae6fd", margin: 0, lineHeight: 1.5 }}>
                  Neural spectral analysis maps the original vocalist&apos;s chest resonance, breath envelope, and upper harmonic overtone profile.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Original Vocal Pitch &amp; Range
                </label>
                <input
                  type="text"
                  value={vocalRange}
                  onChange={(e) => setVocalRange(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Vibrato Envelope Speed
                  </label>
                  <input
                    type="text"
                    value={vibratoSpeed}
                    onChange={(e) => setVibratoSpeed(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Formant Resonance Target
                  </label>
                  <input
                    type="text"
                    value={formantResonance}
                    onChange={(e) => setFormantResonance(e.target.value)}
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
                  Shortlist top playback vocalists whose organic timbre vector matches the source performance with &gt; 95% neural fidelity.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Tamil Primary Vocalist
                  </label>
                  <input
                    type="text"
                    value={selectedTamilSinger}
                    onChange={(e) => setSelectedTamilSinger(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Telugu Primary Vocalist
                  </label>
                  <input
                    type="text"
                    value={selectedTeluguSinger}
                    onChange={(e) => setSelectedTeluguSinger(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", color: "#ffffff", fontSize: "13px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={singerContractCleared}
                    onChange={(e) => setSingerContractCleared(e.target.checked)}
                    style={{ accentColor: "#d4af61", cursor: "pointer" }}
                  />
                  <span>Automate CINTAA &amp; South Indian Cine Singers Association standard performer agreements</span>
                </label>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <CheckCircle2 size={18} color="#34d399" />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#34d399" }}>Pan-India Vocal Pack Compiled</span>
                </div>
                <p style={{ fontSize: "12px", color: "#a7f3d0", margin: 0, lineHeight: 1.5 }}>
                  Phonetic lyrics, guide stems, and singer booking holds packaged for four regional recording hubs.
                </p>
              </div>

              <div style={{ padding: "18px", borderRadius: "14px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Languages Adapted:</span>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>Tamil, Telugu, Kannada, Malayalam</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Acoustic Timbre Match:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>97.4% AVERAGE SIMILARITY</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Dubbing Studio Booking:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>CONFIRMED (CHENNAI &amp; HYDERABAD)</span>
                </div>
              </div>

              <button
                onClick={downloadLyricAdaptationPack}
                className="btn-cinema-gold"
                style={{ width: "100%", height: "46px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <Download size={16} />
                <span>DOWNLOAD MULTILINGUAL VOCAL DUB PACK (.CSV)</span>
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

