"use client";

import { useState } from "react";
import {
  X,
  HeartHandshake,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  ShieldCheck,
  Clock,
  BookOpen,
  Volume2,
  AlertTriangle,
  UserCheck,
} from "lucide-react";

interface MinorWelfareModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function MinorWelfareModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Flashback Sequence (Child Kabir)",
}: MinorWelfareModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Registry & Education
  const [selectedChild, setSelectedChild] = useState("aarav");
  const [tutorHours, setTutorHours] = useState(2.5);
  const [laborPermitNo, setLaborPermitNo] = useState("MH-LAB-CHILD-2026-9041");
  const [schoolNocVerified, setSchoolNocVerified] = useState(true);

  // Step 2: Camera Shift Cap & Sound Limits
  const [cameraHoursLogged, setCameraHoursLogged] = useState(2.2);
  const [decibelLevel, setDecibelLevel] = useState(74); // dB
  const [restBreakInterval, setRestBreakInterval] = useState("15 mins per hour (Compliant)");

  // Step 3: Chaperone & Guardian Verification
  const [guardianName, setGuardianName] = useState("Sunita Sharma (Mother & Legal Guardian)");
  const [pocsoOfficer, setPocsoOfficer] = useState("Dr. Radhika Nair (Certified Welfare Officer)");
  const [greenRoomAllocated, setGreenRoomAllocated] = useState("Vanity Van #04 (Quiet Child Suite)");

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const downloadChildWelfareCertificate = () => {
    setIsExporting(true);
    const data = {
      project: defaultProject,
      permitNumber: laborPermitNo,
      childArtist: selectedChild === "aarav" ? "Aarav Sharma (Age 10)" : "Ananya Joshi (Age 13)",
      guardian: guardianName,
      welfareOfficer: pocsoOfficer,
      schoolNOC: "VERIFIED_ON_FILE",
      tutorStudyHours: `${tutorHours} Hours Logged`,
      cameraShiftDuration: `${cameraHoursLogged} Hours (Max Cap: 4.0 Hours)`,
      soundDecibelAverage: `${decibelLevel} dB (Safe Under 85 dB Threshold)`,
      greenRoomLocation: greenRoomAllocated,
      statutoryCompliance: "MAHARASHTRA_STATE_CHILD_LABOUR_POCSO_CERTIFIED",
      inspectionTimestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `CHILD_WELFARE_CLEARANCE_${laborPermitNo}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsExporting(false), 800);
  };

  const steps = [
    { num: 1, title: "Registry & Tutor", sub: "Education & Permits" },
    { num: 2, title: "4h Camera Cap", sub: "Shift & Decibel Monitor" },
    { num: 3, title: "Guardian Check-In", sub: "POCSO Welfare Officer" },
    { num: 4, title: "Statutory Clearance", sub: "Legal Certificate & JSON" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
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
          maxWidth: "960px",
          maxHeight: "92vh",
          backgroundColor: "#061214",
          border: "1px solid rgba(20,184,166,0.35)",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 60px -15px rgba(0,0,0,0.9), 0 0 40px rgba(20,184,166,0.15)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 28px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(180deg, rgba(20,184,166,0.08) 0%, rgba(0,0,0,0) 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "rgba(20,184,166,0.15)",
                border: "1px solid rgba(20,184,166,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2dd4bf",
              }}
            >
              <HeartHandshake size={24} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2
                  className="font-cinema"
                  style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", margin: 0 }}
                >
                  Minor Artist Chaperone &amp; Child Welfare Gateway
                </h2>
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "monospace",
                    padding: "2px 8px",
                    borderRadius: "999px",
                    backgroundColor: "rgba(20,184,166,0.2)",
                    color: "#99f6e4",
                    border: "1px solid rgba(20,184,166,0.4)",
                  }}
                >
                  POCSO &amp; GUILD COMPLIANT
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: "3px 0 0 0" }}>
                Project: <strong style={{ color: "#d4af61" }}>{defaultProject}</strong> • Strict 4-Hour On-Camera Cap, Mandatory Tutors &amp; Chaperone Protection
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "8px",
              color: "#9ca3af",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* 4-Step Progress Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            backgroundColor: "#030a0b",
          }}
        >
          {steps.map((s) => {
            const isCurrent = activeStep === s.num;
            const isDone = completedSteps.includes(s.num);
            return (
              <button
                key={s.num}
                onClick={() => setActiveStep(s.num)}
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: isCurrent
                    ? "rgba(20,184,166,0.1)"
                    : "transparent",
                  border: "none",
                  borderBottom: isCurrent ? "2px solid #14b8a6" : "2px solid transparent",
                  cursor: "pointer",
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
                    fontSize: "11px",
                    fontWeight: 700,
                    backgroundColor: isDone
                      ? "#14b8a6"
                      : isCurrent
                      ? "rgba(20,184,166,0.3)"
                      : "rgba(255,255,255,0.1)",
                    color: isDone ? "#042f2e" : isCurrent ? "#99f6e4" : "#9ca3af",
                  }}
                >
                  {isDone && !isCurrent ? <Check size={13} /> : s.num}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: isCurrent ? "#ffffff" : "#9ca3af",
                    }}
                  >
                    {s.title}
                  </div>
                  <div style={{ fontSize: "10px", color: "#6b7280" }}>{s.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {/* STEP 1: REGISTRY & TUTOR */}
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Child Artist Details */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#2dd4bf", margin: "0 0 14px 0" }}>
                    Child Performer &amp; Statutory Labor Permit
                  </h3>

                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>
                      Select Registered Minor Performer
                    </label>
                    <select
                      value={selectedChild}
                      onChange={(e) => setSelectedChild(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#091c1e",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "8px",
                        color: "#ffffff",
                        fontSize: "12px",
                      }}
                    >
                      <option value="aarav">Aarav Sharma (Age 10) — Role: Young Kabir (Principal Child Lead)</option>
                      <option value="ananya">Ananya Joshi (Age 13) — Role: Young Priya (Supporting)</option>
                    </select>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>
                        State Labor Permit #
                      </label>
                      <input
                        type="text"
                        value={laborPermitNo}
                        onChange={(e) => setLaborPermitNo(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          backgroundColor: "#091c1e",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "12px",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>
                        On-Set Study Hours Logged
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="2"
                        max="4"
                        value={tutorHours}
                        onChange={(e) => setTutorHours(Number(e.target.value))}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          backgroundColor: "#091c1e",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "12px",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px",
                      backgroundColor: "rgba(20,184,166,0.06)",
                      border: "1px solid rgba(20,184,166,0.2)",
                      borderRadius: "8px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <BookOpen size={16} color="#14b8a6" />
                      <span style={{ fontSize: "11px", color: "#e5e7eb" }}>
                        School Principal NOC &amp; Examination Attendance Cleared
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={schoolNocVerified}
                      onChange={(e) => setSchoolNocVerified(e.target.checked)}
                      style={{ accentColor: "#14b8a6" }}
                    />
                  </div>
                </div>

                {/* Educational Welfare Summary */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#d4af61", margin: "0 0 14px 0" }}>
                      Statutory Education Telemetry
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#091c1e", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Mandatory Education Quota</span>
                        <span style={{ color: "#ffffff", fontWeight: 600 }}>Min 2.0h / day (Required by Law)</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#091c1e", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Accredited Studio Tutor</span>
                        <span style={{ color: "#2dd4bf", fontWeight: 600 }}>Meera Joshi, B.Ed (On-Set)</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#091c1e", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Curriculum Sync</span>
                        <span style={{ color: "#ffffff", fontWeight: 600 }}>CBSE Grade 5 Math &amp; Science</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#091c1e", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Study Van Air Quality</span>
                        <span style={{ color: "#10b981", fontWeight: 700 }}>HEPA Filtered • 22°C Silent AC</span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "rgba(20,184,166,0.08)",
                      border: "1px solid rgba(20,184,166,0.25)",
                      borderRadius: "8px",
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <CheckCircle2 size={16} color="#14b8a6" />
                    <span style={{ fontSize: "11px", color: "#99f6e4" }}>
                      2.5 hours of certified academic study successfully completed today.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: 4H CAMERA SHIFT CAP */}
          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Camera Hours Monitor */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#2dd4bf", margin: "0 0 14px 0" }}>
                    Camera Time Tracker (Strict 4-Hour Limit)
                  </h3>

                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "11px", color: "#9ca3af" }}>On-Camera Rolling Time</span>
                      <span style={{ fontSize: "13px", color: "#14b8a6", fontWeight: 800 }}>
                        {cameraHoursLogged}h / 4.0h Maximum
                      </span>
                    </div>
                    <div style={{ width: "100%", height: "8px", backgroundColor: "#1e293b", borderRadius: "999px", overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${(cameraHoursLogged / 4.0) * 100}%`,
                          height: "100%",
                          backgroundColor: cameraHoursLogged > 3.5 ? "#f59e0b" : "#14b8a6",
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#6b7280", marginTop: "4px" }}>
                      <span>0h (Call Time)</span>
                      <span>2h (Midday Break)</span>
                      <span>4h (Hard Wrap Stop)</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#091c1e", borderRadius: "6px", fontSize: "11px" }}>
                      <span style={{ color: "#9ca3af" }}>Remaining Camera Allowance</span>
                      <span style={{ color: "#10b981", fontWeight: 700 }}>1 Hour 48 Minutes</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#091c1e", borderRadius: "6px", fontSize: "11px" }}>
                      <span style={{ color: "#9ca3af" }}>1st AD Shot Schedule Alert</span>
                      <span style={{ color: "#ffffff", fontWeight: 600 }}>Scene 18 Wrap by 04:30 PM</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#091c1e", borderRadius: "6px", fontSize: "11px" }}>
                      <span style={{ color: "#9ca3af" }}>Rest Break Interval</span>
                      <span style={{ color: "#2dd4bf", fontWeight: 600 }}>{restBreakInterval}</span>
                    </div>
                  </div>
                </div>

                {/* Soundstage Decibel & Psychological Protection */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                      <Volume2 size={18} color="#2dd4bf" />
                      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#d4af61", margin: 0 }}>
                        Soundstage Acoustic &amp; Stress Monitor
                      </h3>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                          <span style={{ color: "#e5e7eb" }}>Set Decibel Level (Max 85 dB Threshold)</span>
                          <span style={{ color: "#10b981", fontWeight: 700 }}>{decibelLevel} dB • Safe Normal Range</span>
                        </div>
                        <div style={{ width: "100%", height: "6px", backgroundColor: "#1e293b", borderRadius: "999px" }}>
                          <div style={{ width: "70%", height: "100%", backgroundColor: "#10b981", borderRadius: "999px" }} />
                        </div>
                      </div>

                      <div style={{ padding: "8px", backgroundColor: "#091c1e", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Simulated Pyrotechnics / Gunshots: </span>
                        <strong style={{ color: "#38bdf8" }}>Strictly Digital Foley in Post (Zero set blanks)</strong>
                      </div>

                      <div style={{ padding: "8px", backgroundColor: "#091c1e", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Child Psychologist on Set: </span>
                        <strong style={{ color: "#2dd4bf" }}>Present during dramatic crying scene</strong>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "rgba(16,185,129,0.08)",
                      border: "1px solid rgba(16,185,129,0.25)",
                      borderRadius: "8px",
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <CheckCircle2 size={16} color="#10b981" />
                    <span style={{ fontSize: "11px", color: "#6ee7b7" }}>
                      No distressing or violent cues enacted in front of the child artist.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: GUARDIAN CHECK-IN */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Chaperone & Legal Guardian Info */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#2dd4bf", margin: "0 0 14px 0" }}>
                    Legal Guardian &amp; Certified Chaperone Presence
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                    <div style={{ padding: "10px", backgroundColor: "#091c1e", borderRadius: "8px", fontSize: "11px" }}>
                      <div style={{ color: "#9ca3af", marginBottom: "2px" }}>Designated Legal Guardian</div>
                      <div style={{ color: "#ffffff", fontWeight: 700 }}>{guardianName}</div>
                      <div style={{ color: "#10b981", fontSize: "10px", marginTop: "2px" }}>Aadhaar KYC Verified • Present within eyeline of monitor</div>
                    </div>

                    <div style={{ padding: "10px", backgroundColor: "#091c1e", borderRadius: "8px", fontSize: "11px" }}>
                      <div style={{ color: "#9ca3af", marginBottom: "2px" }}>POCSO Compliance Welfare Officer</div>
                      <div style={{ color: "#ffffff", fontWeight: 700 }}>{pocsoOfficer}</div>
                      <div style={{ color: "#2dd4bf", fontSize: "10px", marginTop: "2px" }}>Licensed Clinical Psychologist &amp; Child Welfare Inspector</div>
                    </div>

                    <div style={{ padding: "10px", backgroundColor: "#091c1e", borderRadius: "8px", fontSize: "11px" }}>
                      <div style={{ color: "#9ca3af", marginBottom: "2px" }}>Dedicated Quiet Suite</div>
                      <div style={{ color: "#ffffff", fontWeight: 700 }}>{greenRoomAllocated}</div>
                      <div style={{ color: "#d4af61", fontSize: "10px", marginTop: "2px" }}>Private soundproof lounge with bed, desk, and guardian access</div>
                    </div>
                  </div>
                </div>

                {/* Protection Protocols Checklist */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#d4af61", margin: "0 0 14px 0" }}>
                      POCSO Compliance Protocol Check
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {[
                        "Guardian has direct line-of-sight to child at all times",
                        "Child not permitted on set during night shift after 07:00 PM",
                        "Private dressing & restroom reserved exclusively for minor",
                        "Emergency medical pediatric doctor on immediate call",
                        "All dialogue and story themes vetted for psychological safety",
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px",
                            backgroundColor: "#091c1e",
                            borderRadius: "6px",
                            fontSize: "11px",
                            color: "#e5e7eb",
                          }}
                        >
                          <CheckCircle2 size={14} color="#14b8a6" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "rgba(20,184,166,0.08)",
                      border: "1px solid rgba(20,184,166,0.25)",
                      borderRadius: "8px",
                      marginTop: "14px",
                    }}
                  >
                    <div style={{ fontSize: "11px", color: "#99f6e4", fontWeight: 700 }}>
                      ZERO RISK CERTIFIED
                    </div>
                    <div style={{ fontSize: "10px", color: "#9ca3af" }}>
                      All statutory child welfare norms verified and signed off by on-set inspector.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: STATUTORY CLEARANCE & EXPORT */}
          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Official Certificate Card */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#2dd4bf", margin: "0 0 14px 0" }}>
                    Child Artist Daily Compliance Clearance
                  </h3>

                  <div
                    style={{
                      background: "linear-gradient(135deg, #0a1f22 0%, #051012 100%)",
                      border: "1px solid rgba(20,184,166,0.35)",
                      borderRadius: "12px",
                      padding: "18px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ fontSize: "10px", color: "#d4af61", fontFamily: "monospace", letterSpacing: "0.15em", fontWeight: 700 }}>
                        OFFICIAL STATUTORY WELFARE SEAL
                      </div>
                      <span
                        style={{
                          fontSize: "9px",
                          backgroundColor: "#10b981",
                          color: "#022c22",
                          fontWeight: 800,
                          padding: "2px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        100% COMPLIANT
                      </span>
                    </div>

                    <div style={{ fontSize: "17px", fontWeight: 800, color: "#ffffff", marginBottom: "4px" }}>
                      {defaultProject}
                    </div>
                    <div style={{ fontSize: "11px", color: "#2dd4bf", fontWeight: 600, marginBottom: "12px" }}>
                      Performer: Aarav Sharma (Age 10) • Permit: {laborPermitNo}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "10px", color: "#9ca3af" }}>
                      <div>Camera Time: <strong style={{ color: "#ffffff" }}>{cameraHoursLogged}h / 4h Cap</strong></div>
                      <div>Tutor Study: <strong style={{ color: "#ffffff" }}>{tutorHours}h Logged</strong></div>
                      <div>Guardian Verified: <strong style={{ color: "#10b981" }}>Sunita Sharma</strong></div>
                      <div>Welfare Inspector: <strong style={{ color: "#99f6e4" }}>Dr. Radhika Nair</strong></div>
                    </div>
                  </div>

                  <div style={{ marginTop: "14px" }}>
                    <button
                      onClick={downloadChildWelfareCertificate}
                      disabled={isExporting}
                      className="btn-cinema-gold"
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        fontSize: "12px",
                      }}
                    >
                      <Download size={14} />
                      {isExporting ? "Compiling Certificate..." : "Download Child Welfare Clearance (JSON)"}
                    </button>
                  </div>
                </div>

                {/* State Labor Commission Submission */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#d4af61", margin: "0 0 14px 0" }}>
                      State Commission &amp; Guild Submission Archive
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#091c1e", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Labor Commission Portal Push</span>
                        <span style={{ color: "#10b981", fontWeight: 600 }}>Acknowledged (ACK-48102)</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#091c1e", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>CINTAA Minor Wing Sync</span>
                        <span style={{ color: "#38bdf8", fontWeight: 600 }}>Archived to Studio Guild Log</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#091c1e", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Producer Indemnity Shield</span>
                        <span style={{ color: "#e5e7eb", fontWeight: 600 }}>Active (100% Protected)</span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "rgba(20,184,166,0.08)",
                      border: "1px solid rgba(20,184,166,0.25)",
                      borderRadius: "8px",
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <CheckCircle2 size={16} color="#14b8a6" />
                    <span style={{ fontSize: "11px", color: "#99f6e4" }}>
                      Daily child welfare compliance certified and permanently archived for audit.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: "16px 28px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#030a0b",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "#6b7280" }}>
              Step {activeStep} of 4 • {steps[activeStep - 1].title}
            </span>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {activeStep > 1 && (
              <button
                onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
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
                ← Back
              </button>
            )}
            {activeStep < 4 ? (
              <button
                onClick={() => {
                  handleStepComplete(activeStep);
                  setActiveStep((prev) => Math.min(4, prev + 1));
                }}
                className="btn-cinema-gold"
                style={{
                  padding: "8px 20px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                Proceed to Step {activeStep + 1} →
              </button>
            ) : (
              <button
                onClick={onClose}
                className="btn-cinema-gold"
                style={{
                  padding: "8px 22px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                Finalize Child Clearance &amp; Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
