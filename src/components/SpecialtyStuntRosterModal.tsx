"use client";

import { useState } from "react";
import {
  X,
  Flame,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Activity,
  Award,
  Users,
} from "lucide-react";

interface SpecialtyStuntRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function SpecialtyStuntRosterModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Rooftop Chase & Car Vault Sequence",
}: SpecialtyStuntRosterModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Action Discipline
  const [stuntDiscipline, setStuntDiscipline] = useState("precision-driving");
  const [stuntArtistsNeeded, setStuntArtistsNeeded] = useState(6);
  const [hazardLevel, setHazardLevel] = useState("Level 4: High Impact (Vehicle Inversion & Fire)");
  const [riggingType, setRiggingType] = useState("Kevlar Deceleration Air-Ram & Pipe Ramp");

  // Step 2: Guild Vetting & Medical Clearance
  const [selectedStuntLead, setSelectedStuntLead] = useState("tiger-shroff-double");
  const [msaaMembershipNo, setMsaaMembershipNo] = useState("MSAA-STUNT-2026-4019");
  const [medicalFitnessCleared, setMedicalFitnessCleared] = useState(true);
  const [harnessInspectionDate, setHarnessInspectionDate] = useState("01-Nov-2026 (Pass)");

  // Step 3: Hazard Insurance & Paramedics
  const [insuranceCover, setInsuranceCover] = useState("₹1,00,00,000 (₹1 Crore Underwritten by New India Assurance)");
  const [paramedicUnit, setParamedicUnit] = useState("Apollo Level-1 Trauma Ambulance On-Set Standby");
  const [fireMarshalPresent, setFireMarshalPresent] = useState(true);

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const downloadStuntClearanceCSV = () => {
    setIsExporting(true);
    const csvContent = `Stunt ID,Performer Name,MSAA License,Discipline,Hazard Grade,Insurance Policy #,Medical Certificate,Harness ID,Daily Stunt Fee,Action Coordinator Sign-Off
ST-901,Vicky Solanki,MSAA-4019,Precision Vehicle Inversion & Drift,Grade 4,NIA-STUNT-9948201,FIT_SPINE_CLEARED,PETZL-KEV-401,₹45000,Sham Kaushal Approved
ST-902,Sukhwinder 'Rocky' Gill,MSAA-4020,High Fall (35 Feet onto Airbag),Grade 4,NIA-STUNT-9948202,FIT_CONCUSSION_CLEARED,AIRBAG-SAFE-02,₹38000,Sham Kaushal Approved
ST-903,Pooja Sharma,MSAA-4021,Martial Arts Wire-Combat & Decel,Grade 3,NIA-STUNT-9948203,FIT_ORTHO_CLEARED,KONG-WIRE-12,₹35000,Sham Kaushal Approved
ST-904,Devendra Negi,MSAA-4022,Precision Bike Skid & Roll,Grade 3,NIA-STUNT-9948204,FIT_FULL_CLEARED,KNOX-ARMOR-08,₹30000,Sham Kaushal Approved
ST-905,Imran Qureshi,MSAA-4023,Full Body Fire Burn (12 Sec Cap),Grade 5,NIA-STUNT-9948205,FIT_PULMONARY_CLEARED,ZEL-GEL-BURN-01,₹60000,Sham Kaushal Approved
ST-906,Karanvir Bohra,MSAA-4024,Staircase Ratchet Fall,Grade 3,NIA-STUNT-9948206,FIT_SPINE_CLEARED,PETZL-KEV-404,₹32000,Sham Kaushal Approved`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `STUNT_SAFETY_CLEARANCE_${defaultProject.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsExporting(false), 800);
  };

  const steps = [
    { num: 1, title: "Action Rig Breakdown", sub: "Discipline & Hazard Grade" },
    { num: 2, title: "MSAA Guild Vetting", sub: "License & Medical Fit" },
    { num: 3, title: "Insurance & Medevac", sub: "₹1 Crore Policy & Trauma" },
    { num: 4, title: "Safety Sign-Off", sub: "Coordinator Log & CSV" },
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
          backgroundColor: "#120806",
          border: "1px solid rgba(239,68,68,0.35)",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 60px -15px rgba(0,0,0,0.9), 0 0 40px rgba(239,68,68,0.15)",
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
            background: "linear-gradient(180deg, rgba(239,68,68,0.08) 0%, rgba(0,0,0,0) 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f87171",
              }}
            >
              <Flame size={24} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2
                  className="font-cinema"
                  style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", margin: 0 }}
                >
                  Specialty Stunt &amp; Precision Performer Roster
                </h2>
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "monospace",
                    padding: "2px 8px",
                    borderRadius: "999px",
                    backgroundColor: "rgba(239,68,68,0.2)",
                    color: "#fca5a5",
                    border: "1px solid rgba(239,68,68,0.4)",
                  }}
                >
                  MSAA GUILD INSURED
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: "3px 0 0 0" }}>
                Project: <strong style={{ color: "#d4af61" }}>{defaultProject}</strong> • Movie Stunt Artists Association Verified Roster &amp; ₹1 Crore Hazard Insurance
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
            backgroundColor: "#0b0403",
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
                    ? "rgba(239,68,68,0.1)"
                    : "transparent",
                  border: "none",
                  borderBottom: isCurrent ? "2px solid #ef4444" : "2px solid transparent",
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
                      ? "#ef4444"
                      : isCurrent
                      ? "rgba(239,68,68,0.3)"
                      : "rgba(255,255,255,0.1)",
                    color: isDone ? "#ffffff" : isCurrent ? "#fca5a5" : "#9ca3af",
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
          {/* STEP 1: ACTION RIG BREAKDOWN */}
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Rigging Setup */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#f87171", margin: "0 0 14px 0" }}>
                    Specialty Action Sequence Requirements
                  </h3>

                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>
                      Stunt Discipline Category
                    </label>
                    <select
                      value={stuntDiscipline}
                      onChange={(e) => setStuntDiscipline(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#1a0b08",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "8px",
                        color: "#ffffff",
                        fontSize: "12px",
                      }}
                    >
                      <option value="precision-driving">Precision Car Chase, High-Speed J-Turn &amp; Pipe Ramp Inversion</option>
                      <option value="high-fall">35ft High Fall onto Deceleration Airbag &amp; Cardboard Box Rig</option>
                      <option value="wire-combat">Wire-Work Aerial Martial Arts Combat (Kevlar Harness)</option>
                      <option value="fire-burn">Full Body Controlled Pyro Fire-Burn (12 Sec Nomex Suit)</option>
                    </select>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>
                        Stunt Performers Needed
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={stuntArtistsNeeded}
                        onChange={(e) => setStuntArtistsNeeded(Number(e.target.value))}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          backgroundColor: "#1a0b08",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "12px",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>
                        Rigging Mechanism
                      </label>
                      <input
                        type="text"
                        value={riggingType}
                        onChange={(e) => setRiggingType(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          backgroundColor: "#1a0b08",
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
                      padding: "12px",
                      backgroundColor: "rgba(239,68,68,0.06)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      borderRadius: "8px",
                    }}
                  >
                    <div style={{ fontSize: "11px", color: "#fca5a5", fontWeight: 700, marginBottom: "4px" }}>
                      RISK SEVERITY CLASSIFICATION
                    </div>
                    <div style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>
                      {hazardLevel}
                    </div>
                  </div>
                </div>

                {/* Stunt Coordinator Specifications */}
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
                      Action Direction &amp; Safety Protocol
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#1a0b08", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Action Director / Coordinator</span>
                        <span style={{ color: "#ffffff", fontWeight: 700 }}>Sham Kaushal &amp; Team</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#1a0b08", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Precision Vehicles Prepped</span>
                        <span style={{ color: "#f87171", fontWeight: 600 }}>2x Modded SUVs (Roll Caged)</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#1a0b08", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Slow-Motion Phantom Camera</span>
                        <span style={{ color: "#38bdf8", fontWeight: 600 }}>1000 FPS Rigged at Impact Point</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#1a0b08", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Rehearsal Clearance</span>
                        <span style={{ color: "#10b981", fontWeight: 600 }}>3 Dry Runs Completed Clean</span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      borderRadius: "8px",
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <CheckCircle2 size={16} color="#ef4444" />
                    <span style={{ fontSize: "11px", color: "#fca5a5" }}>
                      All stunt crew registered with Movie Stunt Artists Association (MSAA).
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: MSAA GUILD VETTING */}
          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Performer Vetting */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#f87171", margin: "0 0 14px 0" }}>
                    Lead Stunt Performer &amp; Guild Certification
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "14px" }}>
                    <div style={{ padding: "10px", backgroundColor: "#1a0b08", borderRadius: "8px", fontSize: "11px" }}>
                      <div style={{ color: "#9ca3af", marginBottom: "2px" }}>Principal Stunt Double</div>
                      <div style={{ color: "#ffffff", fontWeight: 700 }}>Vicky Solanki (Stunt Double for Lead Actor)</div>
                      <div style={{ color: "#f87171", fontSize: "10px", marginTop: "2px" }}>License: {msaaMembershipNo} • 14 Years Experience</div>
                    </div>

                    <div style={{ padding: "10px", backgroundColor: "#1a0b08", borderRadius: "8px", fontSize: "11px" }}>
                      <div style={{ color: "#9ca3af", marginBottom: "2px" }}>Medical Orthopedic &amp; Spine Scan</div>
                      <div style={{ color: "#10b981", fontWeight: 700 }}>FIT TO EXECUTE HIGH IMPACT FALLS</div>
                      <div style={{ color: "#9ca3af", fontSize: "10px", marginTop: "2px" }}>Cleared by Lilavati Sports Medicine Centre (Valid for 6 Months)</div>
                    </div>

                    <div style={{ padding: "10px", backgroundColor: "#1a0b08", borderRadius: "8px", fontSize: "11px" }}>
                      <div style={{ color: "#9ca3af", marginBottom: "2px" }}>Rigging Harness Certification</div>
                      <div style={{ color: "#ffffff", fontWeight: 700 }}>Petzl Volt Kevlar Full Body Harness</div>
                      <div style={{ color: "#38bdf8", fontSize: "10px", marginTop: "2px" }}>Inspected: {harnessInspectionDate} • Tensile Strength 22 kN</div>
                    </div>
                  </div>
                </div>

                {/* Stunt Team Roster */}
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
                      Assigned Specialty Stunt Crew (6 Pax)
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "11px" }}>
                      {[
                        { name: "Vicky Solanki", role: "Car Inversion Driver", tag: "GRADE 4", fee: "₹45,000" },
                        { name: "Sukhwinder Gill", role: "35ft High Fall Specialist", tag: "GRADE 4", fee: "₹38,000" },
                        { name: "Pooja Sharma", role: "Wire Combat Lead", tag: "GRADE 3", fee: "₹35,000" },
                        { name: "Devendra Negi", role: "Precision Bike Slide", tag: "GRADE 3", fee: "₹30,000" },
                        { name: "Imran Qureshi", role: "Pyro Technician / Burn", tag: "GRADE 5", fee: "₹60,000" },
                      ].map((s) => (
                        <div
                          key={s.name}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "6px 8px",
                            backgroundColor: "#1a0b08",
                            borderRadius: "6px",
                            border: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          <div>
                            <span style={{ color: "#ffffff", fontWeight: 600 }}>{s.name}</span>
                            <span style={{ color: "#6b7280", marginLeft: "6px", fontSize: "10px" }}>({s.role})</span>
                          </div>
                          <span style={{ color: "#f87171", fontFamily: "monospace", fontSize: "10px", fontWeight: 700 }}>
                            {s.tag}
                          </span>
                        </div>
                      ))}
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
                      All members verified on MSAA centralized digital registry.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: INSURANCE & MEDEVAC */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Insurance Policy */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#f87171", margin: "0 0 14px 0" }}>
                    ₹1 Crore On-Set Hazard Insurance Underwriting
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "14px" }}>
                    <div style={{ padding: "12px", backgroundColor: "#1a0b08", borderRadius: "8px", fontSize: "11px" }}>
                      <div style={{ color: "#9ca3af", marginBottom: "2px" }}>Policy Coverage Limit</div>
                      <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "14px" }}>{insuranceCover}</div>
                      <div style={{ color: "#10b981", fontSize: "10px", marginTop: "2px" }}>Zero-Deductible Immediate Cashless Hospitalization Coverage</div>
                    </div>

                    <div style={{ padding: "12px", backgroundColor: "#1a0b08", borderRadius: "8px", fontSize: "11px" }}>
                      <div style={{ color: "#9ca3af", marginBottom: "2px" }}>Standby Medical Support</div>
                      <div style={{ color: "#ffffff", fontWeight: 700 }}>{paramedicUnit}</div>
                      <div style={{ color: "#38bdf8", fontSize: "10px", marginTop: "2px" }}>Ventilator, Defibrillator, Cervical Collars &amp; Burn Kits Onboard</div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px",
                        backgroundColor: "rgba(239,68,68,0.06)",
                        border: "1px solid rgba(239,68,68,0.2)",
                        borderRadius: "8px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Zap size={16} color="#ef4444" />
                        <span style={{ fontSize: "11px", color: "#e5e7eb" }}>
                          Municipal Fire Marshal &amp; Water Tender Engine On-Set
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={fireMarshalPresent}
                        onChange={(e) => setFireMarshalPresent(e.target.checked)}
                        style={{ accentColor: "#ef4444" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Hospital Evacuation Route */}
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
                      Medevac Rapid Response Protocol
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#1a0b08", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Designated Trauma Center</span>
                        <span style={{ color: "#ffffff", fontWeight: 600 }}>Kokilaben Dhirubhai Ambani Hospital</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#1a0b08", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Green Corridor Transit Time</span>
                        <span style={{ color: "#10b981", fontWeight: 700 }}>8 Minutes (Pre-Alerted ER)</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#1a0b08", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>On-Set Medical Doctor</span>
                        <span style={{ color: "#2dd4bf", fontWeight: 600 }}>Dr. Sameer Deshpande, MBBS (ER)</span>
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
                    <ShieldCheck size={16} color="#10b981" />
                    <span style={{ fontSize: "11px", color: "#6ee7b7" }}>
                      Emergency medical evacuation plan approved and active on set.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SAFETY SIGN-OFF & EXPORT */}
          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Official Safety Certificate */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#f87171", margin: "0 0 14px 0" }}>
                    Action Rigging &amp; Safety Clearance Seal
                  </h3>

                  <div
                    style={{
                      background: "linear-gradient(135deg, #240c08 0%, #110503 100%)",
                      border: "1px solid rgba(239,68,68,0.35)",
                      borderRadius: "12px",
                      padding: "18px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ fontSize: "10px", color: "#d4af61", fontFamily: "monospace", letterSpacing: "0.15em", fontWeight: 700 }}>
                        OFFICIAL STUNT SAFETY CLEARANCE
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
                        ACTION CLEARED
                      </span>
                    </div>

                    <div style={{ fontSize: "17px", fontWeight: 800, color: "#ffffff", marginBottom: "4px" }}>
                      {defaultProject}
                    </div>
                    <div style={{ fontSize: "11px", color: "#f87171", fontWeight: 600, marginBottom: "12px" }}>
                      Discipline: Precision Vehicle Inversion • Stunt Lead: Vicky Solanki
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "10px", color: "#9ca3af" }}>
                      <div>Insurance Underwriting: <strong style={{ color: "#ffffff" }}>₹1.00 Crore Active</strong></div>
                      <div>Action Coordinator: <strong style={{ color: "#ffffff" }}>Sham Kaushal Sign-off</strong></div>
                      <div>Trauma Ambulance: <strong style={{ color: "#10b981" }}>On-Set Stationed</strong></div>
                      <div>Fire Tender Engine: <strong style={{ color: "#6ee7b7" }}>Stationed (Engine #4)</strong></div>
                    </div>
                  </div>

                  <div style={{ marginTop: "14px" }}>
                    <button
                      onClick={downloadStuntClearanceCSV}
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
                      {isExporting ? "Compiling Clearance..." : "Download Stunt Safety Clearance (CSV)"}
                    </button>
                  </div>
                </div>

                {/* Studio Risk Management Archive */}
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
                      Studio Risk Management &amp; Legal Archive
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#1a0b08", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Producer Indemnity Release</span>
                        <span style={{ color: "#10b981", fontWeight: 600 }}>Executed &amp; Digitally Signed</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#1a0b08", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>MSAA Guild Dispatch Code</span>
                        <span style={{ color: "#f87171", fontFamily: "monospace", fontWeight: 700 }}>MSAA-DISPATCH-99182</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#1a0b08", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Call Sheet Stunt Annexure</span>
                        <span style={{ color: "#ffffff", fontWeight: 600 }}>Attached to Daily Call #14</span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      borderRadius: "8px",
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <CheckCircle2 size={16} color="#ef4444" />
                    <span style={{ fontSize: "11px", color: "#fca5a5" }}>
                      All stunt protocols verified and ready for Action Director call.
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
            backgroundColor: "#0b0403",
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
                Finalize Stunt Safety &amp; Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
