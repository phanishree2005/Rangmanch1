"use client";

import { useState } from "react";
import {
  X,
  CheckCircle2,
  Shield,
  Film,
  Video,
  FileText,
  Upload,
  Check,
  Sparkles,
  ArrowRight,
  Clock,
  UserCheck,
} from "lucide-react";

interface AuditionApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  castingCall: {
    title: string;
    studio: string;
    director: string;
    location: string;
    language: string;
    budget: string;
    roles: Array<{ name: string; age: string; gender: string }>;
    escrow: boolean;
    color: string;
  } | null;
}

export default function AuditionApplyModal({
  isOpen,
  onClose,
  castingCall,
}: AuditionApplyModalProps) {
  const [selectedRole, setSelectedRole] = useState(
    castingCall?.roles?.[0]?.name || "Lead Performer"
  );
  const [performerName, setPerformerName] = useState("Shivam");
  const [compCardVerified, setCompCardVerified] = useState(true);
  const [reelUrl, setReelUrl] = useState("https://rangmanch.in/reels/shivam-dramatic-reel-2026");
  const [notes, setNotes] = useState("Trained theatre artist with strong regional dialect capability.");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState("AUD-RM-2026-8842");

  if (!isOpen || !castingCall) return null;

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setSubmissionId(`AUD-RM-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 1200);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          backgroundColor: "#08080d",
          border: "1px solid rgba(212,175,97,0.35)",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 60px -15px rgba(0,0,0,0.9), 0 0 40px rgba(212,175,97,0.12)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(180deg, rgba(212,175,97,0.08) 0%, rgba(0,0,0,0) 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                backgroundColor: "rgba(212,175,97,0.15)",
                border: "1px solid rgba(212,175,97,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#d4af61",
              }}
            >
              <Film size={20} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h2
                  className="font-cinema"
                  style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0 }}
                >
                  Direct Audition Submission
                </h2>
                <span
                  style={{
                    fontSize: "9px",
                    fontFamily: "monospace",
                    padding: "2px 8px",
                    borderRadius: "999px",
                    backgroundColor: "rgba(16,185,129,0.15)",
                    color: "#6ee7b7",
                    border: "1px solid rgba(16,185,129,0.3)",
                    fontWeight: 700,
                  }}
                >
                  ESCROW PROTECTED
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: "2px 0 0 0" }}>
                Project: <strong style={{ color: "#d4af61" }}>{castingCall.title}</strong> • {castingCall.studio}
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "6px",
              color: "#9ca3af",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "24px", overflowY: "auto", maxHeight: "75vh" }}>
          {!submitted ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Role Selection */}
              <div>
                <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Select Target Role
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {castingCall.roles.map((r) => {
                    const isSelected = selectedRole === r.name;
                    return (
                      <div
                        key={r.name}
                        onClick={() => setSelectedRole(r.name)}
                        style={{
                          padding: "12px 14px",
                          borderRadius: "10px",
                          backgroundColor: isSelected ? "rgba(212,175,97,0.12)" : "#0e0e14",
                          border: isSelected ? "1px solid #d4af61" : "1px solid rgba(255,255,255,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 700, color: isSelected ? "#ffffff" : "#d1d5db" }}>
                            {r.name}
                          </div>
                          <div style={{ fontSize: "11px", color: "#6b7280" }}>
                            Criteria: {r.gender} • Age {r.age} • Budget: {castingCall.budget}
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="targetRole"
                          checked={isSelected}
                          onChange={() => setSelectedRole(r.name)}
                          style={{ accentColor: "#d4af61" }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Performer Verified Profile */}
              <div
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(16,185,129,0.06)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(16,185,129,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#10b981",
                    }}
                  >
                    <UserCheck size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#ffffff", fontWeight: 700 }}>
                      Verified Rangmanch Portfolio Linked
                    </div>
                    <div style={{ fontSize: "10px", color: "#6ee7b7" }}>
                      High-Res Comp Card • 4K Monologue Tape • Audio Dialect Reel
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#10b981", fontWeight: 700 }}>
                  AUTO-ATTACHED
                </span>
              </div>

              {/* Video Reel Link */}
              <div>
                <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Primary Showreel / Self-Tape Link
                </label>
                <input
                  type="text"
                  value={reelUrl}
                  onChange={(e) => setReelUrl(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "#0e0e14",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "12px",
                  }}
                />
              </div>

              {/* Director Cover Note */}
              <div>
                <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Brief Note for Director ({castingCall.director})
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "#0e0e14",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "12px",
                    resize: "none",
                  }}
                />
              </div>

              {/* CINTAA Escrow Shield */}
              <div
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(212,175,97,0.06)",
                  border: "1px solid rgba(212,175,97,0.25)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Shield size={20} color="#d4af61" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: "10px", color: "#9ca3af", lineHeight: 1.5 }}>
                  <strong style={{ color: "#d4af61" }}>100% Exploitation-Free Guarantee:</strong> Audition videos are encrypted with DRM tokens and watermarked with your unique identity. Compensation is protected via studio escrow under CINTAA standards.
                </div>
              </div>
            </div>
          ) : (
            /* Submission Success State */
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(16,185,129,0.15)",
                  border: "2px solid #10b981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#10b981",
                  margin: "0 auto 16px auto",
                }}
              >
                <Check size={30} />
              </div>

              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#ffffff", margin: "0 0 6px 0" }}>
                Audition Successfully Dispatched!
              </h3>
              <p style={{ fontSize: "12px", color: "#9ca3af", maxWidth: "420px", margin: "0 auto 20px auto", lineHeight: 1.6 }}>
                Your portfolio, reel, and cover note have been securely delivered to <strong>{castingCall.director}</strong> and the casting department at <strong>{castingCall.studio}</strong>.
              </p>

              <div
                style={{
                  backgroundColor: "#0e0e14",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "16px",
                  textAlign: "left",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "11px" }}>
                  <span style={{ color: "#9ca3af" }}>Tracking ID:</span>
                  <span style={{ color: "#d4af61", fontFamily: "monospace", fontWeight: 700 }}>{submissionId}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "11px" }}>
                  <span style={{ color: "#9ca3af" }}>Applied Role:</span>
                  <span style={{ color: "#ffffff", fontWeight: 600 }}>{selectedRole}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "11px" }}>
                  <span style={{ color: "#9ca3af" }}>Turnaround SLA:</span>
                  <span style={{ color: "#10b981", fontWeight: 600 }}>Review in &lt; 48 Hours</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                  <span style={{ color: "#9ca3af" }}>Escrow Security:</span>
                  <span style={{ color: "#38bdf8", fontWeight: 600 }}>Verified by Rangmanch Trust Shield</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#050508",
          }}
        >
          {!submitted ? (
            <>
              <button
                onClick={handleResetAndClose}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#e5e7eb",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-cinema-gold"
                style={{
                  padding: "10px 24px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {isSubmitting ? (
                  <>Submitting to Director...</>
                ) : (
                  <>
                    Submit Audition for {selectedRole} ➔
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              onClick={handleResetAndClose}
              className="btn-cinema-gold"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              Done &amp; Return to Casting Directory
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

