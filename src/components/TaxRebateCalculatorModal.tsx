"use client";

import { useState } from "react";
import {
  X,
  Coins,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  TrendingUp,
  Landmark,
  Building,
} from "lucide-react";

interface TaxRebateCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function TaxRebateCalculatorModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - International Co-Production Rebates",
}: TaxRebateCalculatorModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Territory & Scheme
  const [rebateTerritory, setRebateTerritory] = useState("United Kingdom - BFI Creative Sector Tax Relief (25.5% Cash Rebate)");
  const [totalLocalSpendCrores, setTotalLocalSpendCrores] = useState(12.5);
  const [qualifyingExpenditureRatio, setQualifyingExpenditureRatio] = useState(80);

  // Step 2: Cultural Test Points
  const [culturalPoints, setCulturalPoints] = useState(28);
  const [leadCastOrigin, setLeadCastOrigin] = useState("Dual UK/Indian Resident Character Arc (Section A Passed)");
  const [localCrewHiringRatio, setLocalCrewHiringRatio] = useState("58% UK BECTU Registered Technical Crew");

  // Step 3: Cash Rebate & Audit Forecast
  const [estimatedRebateCrores, setEstimatedRebateCrores] = useState(2.55);
  const [auditorFirm, setAuditorFirm] = useState("Saffery Champness / KPMG Cinema Advisory UK");
  const [rebateCashFlowDate, setRebateCashFlowDate] = useState("Q2 2027 Post-Wrap Final Certificate");

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const calculateRebate = (spend: number, ratio: number, territory: string) => {
    let pct = 0.255;
    if (territory.includes("Abu Dhabi")) pct = 0.30;
    if (territory.includes("Georgia")) pct = 0.30;
    if (territory.includes("New Zealand")) pct = 0.40;
    if (territory.includes("Indian State")) pct = 0.20;
    const qpe = spend * (ratio / 100);
    const reb = Number((qpe * pct).toFixed(2));
    setEstimatedRebateCrores(reb);
  };

  const downloadRebateAuditCSV = () => {
    setIsExporting(true);
    const csvContent = `Line Item,Local Spend (₹ Cr),QPE Eligible (₹ Cr),Rebate %,Projected Cash Rebate (₹ Cr),Auditor Compliance Sign-Off
Stage Hire & Soundstage Studio,3.80,3.80,25.5%,0.969,KPMG UK Certified
Camera & Lighting Local Rental,2.20,2.20,25.5%,0.561,KPMG UK Certified
Local Technical Crew & Labor,4.10,3.90,25.5%,0.994,KPMG UK Certified
Local Accommodation & Catering,1.40,1.10,25.5%,0.280,KPMG UK Certified
Post-Production VFX Stems,1.00,1.00,25.5%,0.255,KPMG UK Certified
TOTAL QUALIFYING EXPENDITURE,12.50,12.00,25.5%,3.060,BFI CERTIFICATE APPROVED`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `TAX_REBATE_AUDIT_DOSSIER_${defaultProject.replace(/\s+/g, "_")}.csv`);
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
              <Landmark size={20} />
            </div>
            <div>
              <h2 className="font-cinema" style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                International Film Commission Tax Rebate &amp; Incentive Calculator
              </h2>
              <p style={{ fontSize: "11px", color: "#8e8e9e", margin: "2px 0 0 0", fontFamily: "monospace" }}>
                Active Production: <span style={{ color: "#d4af61" }}>{defaultProject}</span> • BFI / Abu Dhabi / Georgia Rebate Engine
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
            { num: 1, title: "Territory QPE", icon: Landmark },
            { num: 2, title: "Cultural Test", icon: ShieldCheck },
            { num: 3, title: "Cash Rebate", icon: Coins },
            { num: 4, title: "Audit Pack", icon: Download },
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
                  Select global film commission cash rebate scheme and calculate Qualifying Production Expenditure (QPE) thresholds.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Global Film Commission Territory &amp; Cash Rebate
                </label>
                <select
                  value={rebateTerritory}
                  onChange={(e) => {
                    setRebateTerritory(e.target.value);
                    calculateRebate(totalLocalSpendCrores, qualifyingExpenditureRatio, e.target.value);
                  }}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                >
                  <option value="United Kingdom - BFI Creative Sector Tax Relief (25.5% Cash Rebate)">United Kingdom - BFI Creative Sector Tax Relief (25.5% Net Cash Rebate)</option>
                  <option value="Abu Dhabi Film Commission UAE (30.0% Cash Rebate on QPE)">Abu Dhabi Film Commission UAE (30.0% Cash Rebate on QPE)</option>
                  <option value="Georgia Film Commission USA (30.0% Transferable Tax Credit)">Georgia Film Commission USA (30.0% Transferable Tax Credit)</option>
                  <option value="New Zealand Screen Production Grant (40.0% Rebate)">New Zealand Screen Production Grant (40.0% International Grant)</option>
                  <option value="NFDC India Film Tourism Incentive (30.0% + ₹30 Cr Cap)">NFDC India Film Tourism Incentive (30.0% Reimbursement + ₹30 Cr Cap)</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Total Local In-Country Spend (₹ Crores)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={totalLocalSpendCrores}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setTotalLocalSpendCrores(val);
                      calculateRebate(val, qualifyingExpenditureRatio, rebateTerritory);
                    }}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Qualifying Expenditure (QPE %)
                  </label>
                  <input
                    type="number"
                    value={qualifyingExpenditureRatio}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setQualifyingExpenditureRatio(val);
                      calculateRebate(totalLocalSpendCrores, val, rebateTerritory);
                    }}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "#08080c", border: "1px solid rgba(212, 175, 97, 0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#ffffff" }}>Projected Net Cash Rebate Receivable:</span>
                  <span style={{ fontSize: "18px", color: "#d4af61", fontWeight: 700, fontFamily: "monospace" }}>
                    ₹{estimatedRebateCrores} Crores
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#bae6fd", margin: 0, lineHeight: 1.5 }}>
                  Statutory points scoring (BFI Cultural Test / UAE Cultural Pass). Requires minimum 18 out of 35 points for certification.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Cultural Points Scored
                  </label>
                  <input
                    type="number"
                    value={culturalPoints}
                    onChange={(e) => setCulturalPoints(Number(e.target.value))}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Local Crew Hiring Ratio
                  </label>
                  <input
                    type="text"
                    value={localCrewHiringRatio}
                    onChange={(e) => setLocalCrewHiringRatio(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Lead Cast &amp; Cultural Heritage Narrative
                </label>
                <input
                  type="text"
                  value={leadCastOrigin}
                  onChange={(e) => setLeadCastOrigin(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#fde68a", margin: 0, lineHeight: 1.5 }}>
                  Independent production accounting audit and escrow bridging loan collateralization.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Certified Production Accounting Auditor
                </label>
                <input
                  type="text"
                  value={auditorFirm}
                  onChange={(e) => setAuditorFirm(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Expected Cash Disbursement Date
                </label>
                <input
                  type="text"
                  value={rebateCashFlowDate}
                  onChange={(e) => setRebateCashFlowDate(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <CheckCircle2 size={18} color="#34d399" />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#34d399" }}>Tax Credit Audit Dossier Certified</span>
                </div>
                <p style={{ fontSize: "12px", color: "#a7f3d0", margin: 0, lineHeight: 1.5 }}>
                  Cultural test points validated (28/35). QPE spend schedule verified by production accountant for tax certificate issuance.
                </p>
              </div>

              <div style={{ padding: "18px", borderRadius: "14px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Selected Territory:</span>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>{rebateTerritory.split("-")[0]}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Net Cash Inflow:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 700 }}>₹{estimatedRebateCrores} Cr Cash Rebate</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Statutory Cultural Pass:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>PASSED WITH HONORS</span>
                </div>
              </div>

              <button
                onClick={downloadRebateAuditCSV}
                className="btn-cinema-gold"
                style={{ width: "100%", height: "46px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <Download size={16} />
                <span>DOWNLOAD TAX REBATE AUDIT DOSSIER (.CSV)</span>
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

