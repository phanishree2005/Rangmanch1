"use client";

import { useState } from "react";
import {
  X,
  Users,
  CheckCircle2,
  Download,
  RotateCcw,
  Check,
  ArrowRight,
  Sparkles,
  MapPin,
  MessageSquare,
  QrCode,
  Sliders,
  Filter,
  Send,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

interface BulkCrowdCastingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function BulkCrowdCastingModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Royal Wedding & Street Riot Scenes",
}: BulkCrowdCastingModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Atmosphere & Breakdown
  const [scenePreset, setScenePreset] = useState("royal-wedding");
  const [artistCount, setArtistCount] = useState(250);
  const [locationStage, setLocationStage] = useState("ND Studios Karjat (Courtyard Stage 4)");
  const [callTime, setCallTime] = useState("05:30 AM");
  const [mealAllowance, setMealAllowance] = useState(true);

  // Step 2: Wardrobe & Look Allocation
  const [wardrobeCategory, setWardrobeCategory] = useState("royal-traditional");
  const [specialSkills, setSpecialSkills] = useState<string[]>([
    "Traditional Folk Dancers",
    "Royal Guard Drill Trained",
  ]);
  const [sizeDistribution, setSizeDistribution] = useState("balanced");

  // Step 3: Geofenced Roster & WhatsApp Dispatch
  const [geoRadius, setGeoRadius] = useState(15);
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchComplete, setDispatchComplete] = useState(true);
  const [confirmedCount, setConfirmedCount] = useState(242);

  // Step 4: Attendance & QR Pass
  const [selectedPassArtist, setSelectedPassArtist] = useState("Ramanuj Verma (JA-4820)");
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const downloadCallSheetCSV = () => {
    setIsExporting(true);
    const csvContent = `Roster ID,Artist Name,Age,Gender,Role Category,Costume Code,Shoe Size,Call Time,Stage Gate,WhatsApp Status,Daily Stipend
JA-4820,Ramanuj Verma,38,Male,Royal Courtyard Guest,SHERWANI-042,9,05:30 AM,Gate 4A (Courtyard),CONFIRMED,₹2800
JA-4821,Kavita Sonawane,29,Female,Baraat Folk Performer,GHAGRA-GOLD-18,7,05:30 AM,Gate 4B (Holding),CONFIRMED,₹3500
JA-4822,Gurpreet Singh,42,Male,Royal Guard Veteran,PAGDI-GUARD-09,10,05:30 AM,Gate 4A (Armory),CONFIRMED,₹3200
JA-4823,Arun Kulkarni,54,Male,High Noble Dignitary,KURTA-SILK-22,8,06:00 AM,Gate 4A (Courtyard),CONFIRMED,₹3000
JA-4824,Fatima Sheikh,24,Female,Courtyard Attendant,PAVADA-TEAL-05,6,05:30 AM,Gate 4B (Holding),CONFIRMED,₹2800
JA-4825,Vikram Rathore,33,Male,Royal Swordsman Extra,ARMOR-LEATHER-14,9,05:30 AM,Gate 4A (Stunt Unit),CONFIRMED,₹4000
JA-4826,Meenakshi Sundaram,48,Female,Senior Matron Relative,SAREE-KANCHI-08,7,06:00 AM,Gate 4A (Courtyard),CONFIRMED,₹3200
JA-4827,Devendra Rawat,27,Male,Baraat Dhol Drummer,DHOL-PUNJABI-03,9,05:30 AM,Gate 4C (Music Unit),CONFIRMED,₹3800
JA-4828,Sneha Deshmukh,22,Female,Flower Shower Performer,ANARKALI-PEACH-12,6,05:30 AM,Gate 4B (Holding),CONFIRMED,₹2800
JA-4829,Mohanlal Patel,61,Male,Elder Village Council,DHOTI-KHADI-02,8,06:00 AM,Gate 4A (Courtyard),CONFIRMED,₹3000`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `CROWD_ROSTER_${defaultProject.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsExporting(false), 800);
  };

  const steps = [
    { num: 1, title: "Scene Breakdown", sub: "Crowd Target & Call Time" },
    { num: 2, title: "Wardrobe & Look Lock", sub: "Costume & Skills Matrix" },
    { num: 3, title: "Geofenced Dispatch", sub: "Instant WhatsApp Roster" },
    { num: 4, title: "QR Call-Pass & Export", sub: "Gate Attendance & CSV" },
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
          backgroundColor: "#080a0f",
          border: "1px solid rgba(16,185,129,0.35)",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 60px -15px rgba(0,0,0,0.9), 0 0 40px rgba(16,185,129,0.15)",
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
            background: "linear-gradient(180deg, rgba(16,185,129,0.08) 0%, rgba(0,0,0,0) 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "rgba(16,185,129,0.15)",
                border: "1px solid rgba(16,185,129,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#10b981",
              }}
            >
              <Users size={24} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2
                  className="font-cinema"
                  style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", margin: 0 }}
                >
                  Bulk Crowd &amp; Atmosphere Casting Engine
                </h2>
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "monospace",
                    padding: "2px 8px",
                    borderRadius: "999px",
                    backgroundColor: "rgba(16,185,129,0.2)",
                    color: "#6ee7b7",
                    border: "1px solid rgba(16,185,129,0.4)",
                  }}
                >
                  LIVE ROSTER ACTIVE
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: "3px 0 0 0" }}>
                Project: <strong style={{ color: "#d4af61" }}>{defaultProject}</strong> • 500+ Performer Mass Dispatch &amp; On-Set QR Gate Control
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
            backgroundColor: "#050608",
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
                    ? "rgba(16,185,129,0.1)"
                    : "transparent",
                  border: "none",
                  borderBottom: isCurrent ? "2px solid #10b981" : "2px solid transparent",
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
                      ? "#10b981"
                      : isCurrent
                      ? "rgba(16,185,129,0.3)"
                      : "rgba(255,255,255,0.1)",
                    color: isDone ? "#022c22" : isCurrent ? "#6ee7b7" : "#9ca3af",
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
          {/* STEP 1: SCENE BREAKDOWN */}
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Left: Configuration */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#6ee7b7", margin: "0 0 14px 0" }}>
                    Scene Sequence &amp; Atmosphere Target
                  </h3>

                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>
                      Scene Preset Scenario
                    </label>
                    <select
                      value={scenePreset}
                      onChange={(e) => setScenePreset(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#0d1117",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "8px",
                        color: "#ffffff",
                        fontSize: "12px",
                      }}
                    >
                      <option value="royal-wedding">Royal Rajasthani Wedding (Baraat &amp; Courtyard) — 250 Artists</option>
                      <option value="night-market">Cyberpunk Mumbai Night Market &amp; Street Riot — 180 Artists</option>
                      <option value="period-strike">1970s Coal Mine Labor Strike (Period Drama) — 320 Artists</option>
                      <option value="courtroom">Supreme Court Verdict &amp; Media Scrum — 90 Artists</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <label style={{ fontSize: "11px", color: "#9ca3af" }}>
                        Target Atmosphere Artists
                      </label>
                      <span style={{ fontSize: "12px", color: "#10b981", fontWeight: 700 }}>
                        {artistCount} Artists
                      </span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={500}
                      step={10}
                      value={artistCount}
                      onChange={(e) => setArtistCount(Number(e.target.value))}
                      style={{ width: "100%", accentColor: "#10b981" }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#6b7280", marginTop: "4px" }}>
                      <span>50 (Chamber Scene)</span>
                      <span>250 (Full Sequence)</span>
                      <span>500 (Stadium/Warfare)</span>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>
                        Call Time at Holding Area
                      </label>
                      <input
                        type="text"
                        value={callTime}
                        onChange={(e) => setCallTime(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          backgroundColor: "#0d1117",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "12px",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>
                        Studio / Stage Gate
                      </label>
                      <input
                        type="text"
                        value={locationStage}
                        onChange={(e) => setLocationStage(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          backgroundColor: "#0d1117",
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
                      backgroundColor: "rgba(16,185,129,0.06)",
                      border: "1px solid rgba(16,185,129,0.2)",
                      borderRadius: "8px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <CheckCircle2 size={16} color="#10b981" />
                      <span style={{ fontSize: "11px", color: "#e5e7eb" }}>
                        Include On-Set Breakfast &amp; Midnight Wrap Snack Token
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={mealAllowance}
                      onChange={(e) => setMealAllowance(e.target.checked)}
                      style={{ accentColor: "#10b981" }}
                    />
                  </div>
                </div>

                {/* Right: Real-Time Demographic Distribution */}
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
                      Demographic Quota Telemetry
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                          <span style={{ color: "#e5e7eb" }}>Male Artists (Age 20-55)</span>
                          <span style={{ color: "#38bdf8", fontWeight: 700 }}>45% • {Math.round(artistCount * 0.45)} Pax</span>
                        </div>
                        <div style={{ width: "100%", height: "6px", backgroundColor: "#1e293b", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ width: "45%", height: "100%", backgroundColor: "#38bdf8" }} />
                        </div>
                      </div>

                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                          <span style={{ color: "#e5e7eb" }}>Female Artists (Age 18-50)</span>
                          <span style={{ color: "#ec4899", fontWeight: 700 }}>40% • {Math.round(artistCount * 0.4)} Pax</span>
                        </div>
                        <div style={{ width: "100%", height: "6px", backgroundColor: "#1e293b", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ width: "40%", height: "100%", backgroundColor: "#ec4899" }} />
                        </div>
                      </div>

                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                          <span style={{ color: "#e5e7eb" }}>Senior Elders / Dignitaries (55+)</span>
                          <span style={{ color: "#fbbf24", fontWeight: 700 }}>10% • {Math.round(artistCount * 0.1)} Pax</span>
                        </div>
                        <div style={{ width: "100%", height: "6px", backgroundColor: "#1e293b", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ width: "10%", height: "100%", backgroundColor: "#fbbf24" }} />
                        </div>
                      </div>

                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                          <span style={{ color: "#e5e7eb" }}>Child / Teen Extras (Strict Tutor Regs)</span>
                          <span style={{ color: "#a855f7", fontWeight: 700 }}>5% • {Math.round(artistCount * 0.05)} Pax</span>
                        </div>
                        <div style={{ width: "100%", height: "6px", backgroundColor: "#1e293b", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ width: "5%", height: "100%", backgroundColor: "#a855f7" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "12px",
                      backgroundColor: "rgba(212,175,97,0.08)",
                      border: "1px solid rgba(212,175,97,0.25)",
                      borderRadius: "10px",
                      marginTop: "16px",
                    }}
                  >
                    <div style={{ fontSize: "11px", color: "#d4af61", fontWeight: 700, marginBottom: "4px" }}>
                      ESTIMATED DAILY PRODUCTION BUDGET
                    </div>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: "#ffffff" }}>
                      ₹{(artistCount * 2850).toLocaleString("en-IN")} <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 400 }}>(Includes base wage + catering)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: WARDROBE & LOOK ALLOCATION */}
          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Costume Department Linkage */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#6ee7b7", margin: "0 0 14px 0" }}>
                    Wardrobe Master Breakdown
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {[
                      { code: "SHERWANI-ROYAL-A", label: "Gold Embroidered Sherwani & Turban", qty: 110, fit: "Male Adults", color: "#f59e0b" },
                      { code: "GHAGRA-CHOLI-B", label: "Crimson Silk Ghagra with Mirror Work", qty: 95, fit: "Female Adults", color: "#ec4899" },
                      { code: "GUARD-UNIFORM-C", label: "Palace Guard Ceremonial Tunic & Belt", qty: 30, fit: "Athletic Build", color: "#38bdf8" },
                      { code: "VINTAGE-DIGNITARY", label: "Raw Silk Kurta & Royal Shawl", qty: 15, fit: "Seniors", color: "#a855f7" },
                    ].map((item) => (
                      <div
                        key={item.code}
                        style={{
                          padding: "12px",
                          backgroundColor: "#0d1117",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "10px", fontFamily: "monospace", color: item.color, fontWeight: 700 }}>
                              {item.code}
                            </span>
                            <span style={{ fontSize: "9px", backgroundColor: "rgba(255,255,255,0.1)", padding: "1px 6px", borderRadius: "4px", color: "#9ca3af" }}>
                              {item.fit}
                            </span>
                          </div>
                          <div style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600, marginTop: "2px" }}>
                            {item.label}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontSize: "14px", fontWeight: 800, color: "#10b981" }}>{item.qty}</span>
                          <span style={{ fontSize: "10px", color: "#6b7280", display: "block" }}>Assigned</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sizing & Special Skills Filter */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#d4af61", margin: "0 0 14px 0" }}>
                    Special Performer Qualifications
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                    {[
                      "Traditional Folk Dancers (Ghoomar / Garba)",
                      "Royal Guard Drill Trained (Sword Handling)",
                      "Period Dialect & Etiquette Certified",
                      "Stunt Double / Low-Impact Fall Experienced",
                      "Bilingual Hindi & Rajasthani Dialect",
                    ].map((skill) => {
                      const isSelected = specialSkills.includes(skill);
                      return (
                        <div
                          key={skill}
                          onClick={() => {
                            if (isSelected) {
                              setSpecialSkills(specialSkills.filter((s) => s !== skill));
                            } else {
                              setSpecialSkills([...specialSkills, skill]);
                            }
                          }}
                          style={{
                            padding: "10px 14px",
                            borderRadius: "8px",
                            backgroundColor: isSelected ? "rgba(16,185,129,0.12)" : "#0d1117",
                            border: isSelected ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: "pointer",
                          }}
                        >
                          <span style={{ fontSize: "12px", color: isSelected ? "#6ee7b7" : "#d1d5db" }}>
                            {skill}
                          </span>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            style={{ accentColor: "#10b981" }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div
                    style={{
                      padding: "12px",
                      backgroundColor: "rgba(56,189,248,0.06)",
                      border: "1px solid rgba(56,189,248,0.2)",
                      borderRadius: "10px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#38bdf8", fontSize: "11px", fontWeight: 700 }}>
                      <Sparkles size={14} />
                      AI SIZING OPTIMIZATION
                    </div>
                    <p style={{ fontSize: "11px", color: "#9ca3af", margin: "4px 0 0 0" }}>
                      Wardrobe department sizing automatically matched to performer body metrics with 98.2% fitting accuracy, minimizing on-set holding delays.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: GEOFENCED DISPATCH */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Geo-Fencing Controls */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                    <MapPin size={18} color="#10b981" />
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#6ee7b7", margin: 0 }}>
                      Geofence Radius &amp; Broadcast Channel
                    </h3>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "11px", color: "#9ca3af" }}>Broadcast Proximity Radius</span>
                      <span style={{ fontSize: "12px", color: "#10b981", fontWeight: 700 }}>{geoRadius} km around Karjat</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={40}
                      value={geoRadius}
                      onChange={(e) => setGeoRadius(Number(e.target.value))}
                      style={{ width: "100%", accentColor: "#10b981" }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#6b7280", marginTop: "4px" }}>
                      <span>5 km (Local Village)</span>
                      <span>20 km (Navi Mumbai/Panvel)</span>
                      <span>40 km (Mumbai Metro)</span>
                    </div>
                  </div>

                  {/* Telemetry Stats */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "16px" }}>
                    <div style={{ backgroundColor: "#0d1117", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "#9ca3af" }}>Pings Sent</div>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff" }}>310</div>
                    </div>
                    <div style={{ backgroundColor: "#0d1117", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "#6ee7b7" }}>Confirmed</div>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: "#10b981" }}>{confirmedCount}</div>
                    </div>
                    <div style={{ backgroundColor: "#0d1117", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "#fbbf24" }}>Standby Pool</div>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: "#fbbf24" }}>68</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsDispatching(true);
                      setTimeout(() => {
                        setIsDispatching(false);
                        setDispatchComplete(true);
                        setConfirmedCount(250);
                      }, 1200);
                    }}
                    disabled={isDispatching}
                    className="btn-cinema-gold"
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    {isDispatching ? (
                      <>Transmitting Broadcast via WhatsApp Bot...</>
                    ) : (
                      <>
                        <Send size={15} />
                        Trigger Instant WhatsApp Roster Dispatch
                      </>
                    )}
                  </button>
                </div>

                {/* WhatsApp Message Preview */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <MessageSquare size={16} color="#25D366" />
                    <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#25D366", margin: 0 }}>
                      WhatsApp Bot Dispatch Preview
                    </h3>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#0b141a",
                      border: "1px solid rgba(37,211,102,0.3)",
                      borderRadius: "10px",
                      padding: "14px",
                      fontSize: "11px",
                      color: "#e9edef",
                      fontFamily: "monospace",
                      lineHeight: 1.6,
                    }}
                  >
                    <div style={{ color: "#25D366", fontWeight: 700, marginBottom: "6px" }}>
                      [RANGMANCH OFFICIAL CALL NOTICE]
                    </div>
                    <div>Hello Ramanuj Verma,</div>
                    <div style={{ margin: "6px 0" }}>
                      You are selected for <strong>{defaultProject}</strong> as <strong>Royal Courtyard Guest</strong>.
                    </div>
                    <div>📍 <strong>Location:</strong> {locationStage}</div>
                    <div>⏰ <strong>Call Time:</strong> {callTime} SHARP</div>
                    <div>👔 <strong>Costume:</strong> SHERWANI-042 (Provided on set)</div>
                    <div>💰 <strong>Daily Wrap Pay:</strong> ₹2,800 + Meals included</div>
                    <div style={{ marginTop: "10px", color: "#6ee7b7" }}>
                      Tap [1] to ACCEPT &amp; RECEIVE QR GATE PASS
                      <br />
                      Tap [2] to DECLINE &amp; RELEASE TO STANDBY
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", color: "#10b981", fontSize: "11px" }}>
                    <ShieldCheck size={14} />
                    Verified WhatsApp Business API Gateway with 99.8% inbox delivery.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: QR CALL-PASS & ROSTER EXPORT */}
          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Digital Gate Pass Preview */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#6ee7b7", margin: "0 0 14px 0" }}>
                    On-Set Digital QR Pass (Live Gate Verification)
                  </h3>

                  <div
                    style={{
                      background: "linear-gradient(135deg, #0b1320 0%, #050a12 100%)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      borderRadius: "12px",
                      padding: "16px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "#10b981",
                        color: "#022c22",
                        fontSize: "9px",
                        fontWeight: 800,
                        padding: "3px 12px",
                        borderBottomLeftRadius: "8px",
                        letterSpacing: "0.1em",
                      }}
                    >
                      GATE PASS VALID
                    </div>

                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      <div
                        style={{
                          width: "90px",
                          height: "90px",
                          backgroundColor: "#ffffff",
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                        }}
                      >
                        <QrCode size={70} color="#000000" />
                      </div>

                      <div>
                        <div style={{ fontSize: "11px", color: "#d4af61", fontWeight: 700, letterSpacing: "0.1em" }}>
                          PASS ID: RM-CROWD-2026-9042
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff", margin: "2px 0" }}>
                          Ramanuj Verma
                        </div>
                        <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                          Role: <strong style={{ color: "#38bdf8" }}>Royal Courtyard Guest</strong>
                        </div>
                        <div style={{ fontSize: "10px", color: "#6ee7b7", marginTop: "4px" }}>
                          Gate 4A • Wardrobe Unit #2 • Meal Token #242
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
                    <button
                      onClick={downloadCallSheetCSV}
                      disabled={isExporting}
                      className="btn-cinema-gold"
                      style={{
                        flex: 1,
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
                      {isExporting ? "Exporting Call Roster..." : "Download Full Roster (CSV)"}
                    </button>
                  </div>
                </div>

                {/* Assistant Director Summary & Attendance Sync */}
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
                      Assistant Director On-Set Sync
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#0d1117", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Holding Capacity Limit</span>
                        <span style={{ color: "#ffffff", fontWeight: 600 }}>300 Artists (Compliant)</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#0d1117", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Chaperone Assigned (Minors)</span>
                        <span style={{ color: "#10b981", fontWeight: 600 }}>2 Certified Welfare Officers</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#0d1117", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Biometric Check-In Status</span>
                        <span style={{ color: "#38bdf8", fontWeight: 600 }}>Ready at Gates 4A &amp; 4B</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#0d1117", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Catering Heads Tagged</span>
                        <span style={{ color: "#fbbf24", fontWeight: 600 }}>250 + 25 Buffer Packets</span>
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
                      Call sheet published and synchronized with 1st AD daily shooting board.
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
            backgroundColor: "#050608",
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
                Finalize Crowd Roster &amp; Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
