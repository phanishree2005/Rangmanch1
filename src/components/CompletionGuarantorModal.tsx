"use client";

import { useState } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  DollarSign,
  AlertTriangle,
  Building,
  TrendingUp,
  FileText,
  Lock,
} from "lucide-react";

interface CompletionGuarantorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function CompletionGuarantorModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Theatrical Completion Guarantee & Bond",
}: CompletionGuarantorModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Underwriting & Bond Fee
  const [guarantorEntity, setGuarantorEntity] = useState("Film Finances Inc. (FFI Worldwide) / New India Assurance Syndicate");
  const [insuredProductionBudget, setInsuredProductionBudget] = useState(45.0); // ₹45 Crores
  const [bondFeePercentage, setBondFeePercentage] = useState(2.5); // 2.5% standard bond fee
  const [strikePriceEscrow, setStrikePriceEscrow] = useState("₹45.00 Cr Absolute Budget Ceiling (Financier Backstopped)");

  // Step 2: Contingency Reserve & Variance
  const [contingencyPercentage, setContingencyPercentage] = useState(10); // 10% statutory reserve
  const [costToCompleteVariance, setCostToCompleteVariance] = useState("+0.8% (Within Safe 5% Tolerance Buffer)");
  const [dualSignoffMandate, setDualSignoffMandate] = useState(true);

  // Step 3: Production Takeover Triggers
  const [takeoverOverrunTrigger, setTakeoverOverrunTrigger] = useState("15% Unfunded Budget Overrun or 8 Days Schedule Delay");
  const [standbyCompletionDirector, setStandbyCompletionDirector] = useState("Guild-Nominated Completion Supervisor (AICWA / IFTDA Cleared)");
  const [keyCastIncapacitationCover, setKeyCastIncapacitationCover] = useState(true);

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const calculatedBondFee = Number(((insuredProductionBudget * bondFeePercentage) / 100).toFixed(3));
  const calculatedContingency = Number(((insuredProductionBudget * contingencyPercentage) / 100).toFixed(2));

  const downloadCompletionBondDossier = () => {
    setIsExporting(true);
    const csvContent = `Bond Policy ID,Project Title,Guarantor Underwriter,Insured Budget (₹ Cr),Bond Fee %,Fee Payable (₹ Cr),Contingency Reserve (₹ Cr),Takeover Trigger,Financier Bank Escrow,Certification Status
BOND-FFI-2026-9041,${defaultProject},Film Finances Inc / New India Assurance,${insuredProductionBudget},${bondFeePercentage}%,${calculatedBondFee},${calculatedContingency},${takeoverOverrunTrigger},ICICI Entertainment Bank LC,CERTIFIED_BONDED_ACTIVE
RESERVE-ALLOC-01,Principal Photography Stage,FFI Monitored,28.50,2.5%,0.712,2.85,Day 42 Schedule Check,ICICI Escrow Vault,STAGE_CLEARED_PASS
RESERVE-ALLOC-02,Virtual Production & ICVFX,FFI Monitored,8.50,2.5%,0.212,0.85,UE5 Frustum Lock,ICICI Escrow Vault,STAGE_CLEARED_PASS
RESERVE-ALLOC-03,Post-Production & Dolby Atmos,FFI Monitored,8.00,2.5%,0.200,0.80,DCI SMPTE Master Lock,ICICI Escrow Vault,STAGE_CLEARED_PASS`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `COMPLETION_GUARANTOR_BOND_${defaultProject.replace(/\s+/g, "_")}.csv`);
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
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="font-cinema" style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                Film Completion Guarantor &amp; Bond Escrow Monitor
              </h2>
              <p style={{ fontSize: "11px", color: "#8e8e9e", margin: "2px 0 0 0", fontFamily: "monospace" }}>
                Active Production: <span style={{ color: "#d4af61" }}>{defaultProject}</span> • FFI &amp; New India Underwritten
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
            { num: 1, title: "Bond Terms", icon: ShieldCheck },
            { num: 2, title: "Contingency", icon: DollarSign },
            { num: 3, title: "Takeover Rule", icon: AlertTriangle },
            { num: 4, title: "Certificate", icon: Download },
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
                  The completion bond legally guarantees to banks and distributors that the film will be delivered on time, within budget, or the guarantor will step in or reimburse the financiers in full.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Completion Guarantor Underwriter Syndicate
                </label>
                <select
                  value={guarantorEntity}
                  onChange={(e) => setGuarantorEntity(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                >
                  <option value="Film Finances Inc. (FFI Worldwide) / New India Assurance Syndicate">Film Finances Inc. (FFI Worldwide) / New India Assurance Syndicate</option>
                  <option value="European Film Bonds (EFB Copenhagen) / Lloyd's of London">European Film Bonds (EFB Copenhagen) / Lloyd&apos;s of London</option>
                  <option value="Media Guarantors UK / Munich Re Specialized Risk">Media Guarantors UK / Munich Re Specialized Risk</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Total Insured Budget (₹ Crores)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={insuredProductionBudget}
                    onChange={(e) => setInsuredProductionBudget(Number(e.target.value))}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase" }}>Bond Underwriting Fee (%)</label>
                    <span style={{ fontSize: "11px", color: "#d4af61", fontFamily: "monospace" }}>{bondFeePercentage}% (₹{calculatedBondFee} Cr)</span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="4.0"
                    step="0.1"
                    value={bondFeePercentage}
                    onChange={(e) => setBondFeePercentage(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#d4af61" }}
                  />
                </div>
              </div>

              <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "#08080c", border: "1px solid rgba(212, 175, 97, 0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#ffffff" }}>Guaranteed Strike Price:</span>
                  <span style={{ fontSize: "16px", color: "#d4af61", fontWeight: 700, fontFamily: "monospace" }}>
                    {strikePriceEscrow}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#bae6fd", margin: 0, lineHeight: 1.5 }}>
                  Statutory 10% contingency reserve locked in escrow. Releases require simultaneous sign-off from Producer and Guarantor Field Auditor.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase" }}>Contingency Buffer (%)</label>
                    <span style={{ fontSize: "11px", color: "#38bdf8", fontFamily: "monospace" }}>{contingencyPercentage}% (₹{calculatedContingency} Cr)</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="15"
                    value={contingencyPercentage}
                    onChange={(e) => setContingencyPercentage(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#38bdf8" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Cost-To-Complete Variance
                  </label>
                  <input
                    type="text"
                    value={costToCompleteVariance}
                    onChange={(e) => setCostToCompleteVariance(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", color: "#ffffff", fontSize: "13px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={dualSignoffMandate}
                    onChange={(e) => setDualSignoffMandate(e.target.checked)}
                    style={{ accentColor: "#d4af61", cursor: "pointer" }}
                  />
                  <span>Enforce dual-signoff escrow release: Producer + FFI Production Monitor required</span>
                </label>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#fde68a", margin: 0, lineHeight: 1.5 }}>
                  Takeover trigger thresholds: specify exact conditions under which the guarantor possesses legal authority to replace the director or take physical custody of camera negative/DCP drives.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Automatic Takeover Threshold Trigger
                </label>
                <input
                  type="text"
                  value={takeoverOverrunTrigger}
                  onChange={(e) => setTakeoverOverrunTrigger(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Nominated Standby Completion Supervisor
                </label>
                <input
                  type="text"
                  value={standbyCompletionDirector}
                  onChange={(e) => setStandbyCompletionDirector(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", color: "#ffffff", fontSize: "13px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={keyCastIncapacitationCover}
                    onChange={(e) => setKeyCastIncapacitationCover(e.target.checked)}
                    style={{ accentColor: "#d4af61", cursor: "pointer" }}
                  />
                  <span>Include ₹15 Cr Cast Essential Element &amp; Incapacitation Insurance Rider</span>
                </label>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <CheckCircle2 size={18} color="#34d399" />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#34d399" }}>Completion Bond Legally Enforceable</span>
                </div>
                <p style={{ fontSize: "12px", color: "#a7f3d0", margin: 0, lineHeight: 1.5 }}>
                  The project is formally bonded for ₹45.00 Crores. Financiers, banks, and OTT licensing partners hold absolute completion backing.
                </p>
              </div>

              <div style={{ padding: "18px", borderRadius: "14px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Bond Insured Amount:</span>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>₹{insuredProductionBudget}.00 Crores</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Guarantor Syndicate:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>FFI &amp; NEW INDIA ASSURANCE</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Contingency Escrow:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>₹{calculatedContingency} Cr DUAL-SIG SECURED</span>
                </div>
              </div>

              <button
                onClick={downloadCompletionBondDossier}
                className="btn-cinema-gold"
                style={{ width: "100%", height: "46px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <Download size={16} />
                <span>DOWNLOAD COMPLETION GUARANTOR BOND DOSSIER (.CSV)</span>
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

