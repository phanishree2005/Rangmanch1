"use client";

import { useState } from "react";
import {
  X,
  UserCheck,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  ShieldCheck,
  Globe,
  FileText,
  Calendar,
} from "lucide-react";

interface ForeignCrewVisaModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function ForeignCrewVisaModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Foreign Key Crew & International Cast",
}: ForeignCrewVisaModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Foreign Talent Roster
  const [foreignHODTitle, setForeignHODTitle] = useState("Director of Photography (BSC / AFC Member)");
  const [foreignNationalCountry, setForeignNationalCountry] = useState("United Kingdom (London - British Citizen)");
  const [totalForeignPassports, setTotalForeignPassports] = useState(14);

  // Step 2: Visa Category & Work Authorization
  const [visaCategory, setVisaCategory] = useState("Indian Film Visa (F-Category) with Ministry of I&B Shooting Permit");
  const [mibPermissionLetterNo, setMibPermissionLetterNo] = useState("MIB-FILM-PERMIT-2026-0941");
  const [guildNocStatus, setGuildNocStatus] = useState("WICA (Western India Cinematographers Association) NOC Endorsed");

  // Step 3: Biometrics & FRRO Registration
  const [biometricsScheduled, setBiometricsScheduled] = useState("VFS Global London - Completed (Tier-1 Express)");
  const [frroRegistrationStatus, setFrroRegistrationStatus] = useState("e-FRRO Foreigners Regional Registration Verified");
  const [insuranceHealthMandate, setInsuranceHealthMandate] = useState(true);

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const downloadVisaStatusLedger = () => {
    setIsExporting(true);
    const csvContent = `Passport #,Full Legal Name,Department,Role,Citizenship,Visa Category,MIB Clearance Letter,FRRO Registration,Validity End Date,Consular Status
GB-9810240,Alexander Wright,Camera,Director of Photography (BSC),British,Film (F-1),MIB-0941,FRRO-MUM-4491,30-Jun-2027,ISSUED_EXPEDITE
FR-4401928,Camille Dupont,Stunts,Wire Rigger Specialist,French,Film (F-1),MIB-0941,FRRO-MUM-4492,30-Jun-2027,ISSUED_EXPEDITE
US-1029841,Marcus Vance,Visual FX,Virtual Production Unreal Tech,American,Film (F-1),MIB-0941,FRRO-MUM-4493,30-Jun-2027,ISSUED_EXPEDITE
DE-8820194,Hans Zimmerman,Sound,Dolby Atmos Mix Consultant,German,Film (F-1),MIB-0941,FRRO-MUM-4494,30-Jun-2027,ISSUED_EXPEDITE
AU-5501920,Liam Hemsworth Double,Stunts,Precision Motorcycle Double,Australian,Film (F-1),MIB-0941,FRRO-MUM-4495,30-Jun-2027,ISSUED_EXPEDITE`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `FOREIGN_CREW_VISA_DOSSIER_${defaultProject.replace(/\s+/g, "_")}.csv`);
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
              <UserCheck size={20} />
            </div>
            <div>
              <h2 className="font-cinema" style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                Foreign Cast &amp; Crew Visa / Work Permit Fast-Track Hub
              </h2>
              <p style={{ fontSize: "11px", color: "#8e8e9e", margin: "2px 0 0 0", fontFamily: "monospace" }}>
                Active Motion Picture: <span style={{ color: "#d4af61" }}>{defaultProject}</span> • MIB &amp; FRRO Expedited Consular Desk
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
            { num: 1, title: "Crew Dossier", icon: UserCheck },
            { num: 2, title: "MIB & Guild NOC", icon: ShieldCheck },
            { num: 3, title: "FRRO Clearance", icon: Globe },
            { num: 4, title: "Visa Ledger", icon: Download },
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
                  Centralized dossier for foreign Directors of Photography, wire coordinators, and international cast members.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Key Foreign Head of Department (HOD)
                </label>
                <input
                  type="text"
                  value={foreignHODTitle}
                  onChange={(e) => setForeignHODTitle(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Citizenship &amp; Consular Jurisdiction
                  </label>
                  <input
                    type="text"
                    value={foreignNationalCountry}
                    onChange={(e) => setForeignNationalCountry(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Total Foreign Passports in Crew
                  </label>
                  <input
                    type="number"
                    value={totalForeignPassports}
                    onChange={(e) => setTotalForeignPassports(Number(e.target.value))}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#bae6fd", margin: 0, lineHeight: 1.5 }}>
                  Ministry of Information &amp; Broadcasting (MIB) script clearance certificate and Indian film industry trade union (WICA/AICWA) No Objection Letters.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Work Visa Category
                </label>
                <input
                  type="text"
                  value={visaCategory}
                  onChange={(e) => setVisaCategory(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  MIB National Film Permit #
                </label>
                <input
                  type="text"
                  value={mibPermissionLetterNo}
                  onChange={(e) => setMibPermissionLetterNo(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Local Guild No-Objection Certificate (NOC)
                </label>
                <input
                  type="text"
                  value={guildNocStatus}
                  onChange={(e) => setGuildNocStatus(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#fde68a", margin: 0, lineHeight: 1.5 }}>
                  Consular appointment status, VFS biometric verification, and online e-FRRO residency registration for international technicians.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Biometric Fast-Track Appointment
                </label>
                <input
                  type="text"
                  value={biometricsScheduled}
                  onChange={(e) => setBiometricsScheduled(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  e-FRRO In-Country Legal Registration
                </label>
                <input
                  type="text"
                  value={frroRegistrationStatus}
                  onChange={(e) => setFrroRegistrationStatus(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", color: "#ffffff", fontSize: "13px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={insuranceHealthMandate}
                    onChange={(e) => setInsuranceHealthMandate(e.target.checked)}
                    style={{ accentColor: "#d4af61", cursor: "pointer" }}
                  />
                  <span>Comprehensive international medical emergency evacuation policy active for all foreign personnel</span>
                </label>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <CheckCircle2 size={18} color="#34d399" />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#34d399" }}>Consular Visa Package Approved</span>
                </div>
                <p style={{ fontSize: "12px", color: "#a7f3d0", margin: 0, lineHeight: 1.5 }}>
                  All 14 foreign key crew members cleared with multi-entry Film Visas, MIB shoot authorization, and FRRO clearance.
                </p>
              </div>

              <div style={{ padding: "18px", borderRadius: "14px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Key Foreign HOD:</span>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>{foreignHODTitle}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Total Visas Granted:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>14 / 14 PASSPORTS ISSUED</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>MIB Shoot Clearance:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>VERIFIED VALID NATIONWIDE</span>
                </div>
              </div>

              <button
                onClick={downloadVisaStatusLedger}
                className="btn-cinema-gold"
                style={{ width: "100%", height: "46px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <Download size={16} />
                <span>DOWNLOAD FOREIGN CREW VISA LEDGER (.CSV)</span>
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

