"use client";

import { useState } from "react";
import {
  X,
  Globe2,
  DollarSign,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  ShieldCheck,
  Building,
  TrendingUp,
  FileText,
} from "lucide-react";

interface FilmMarketSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function FilmMarketSalesModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Global Theatrical & Territory Sales",
}: FilmMarketSalesModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Film Market Selection
  const [targetMarket, setTargetMarket] = useState("Marché du Film - Festival de Cannes (Riviera Stand)");
  const [salesAgentAgency, setSalesAgentAgency] = useState("Wild Bunch International / FilmNation Syndicate");
  const [salesCommissionPercent, setSalesCommissionPercent] = useState(12.5);

  // Step 2: Territory Rights Matrix
  const [northAmericaStatus, setNorthAmericaStatus] = useState("Sold to Neon / A24 ($1.8M Minimum Guarantee)");
  const [ukEuropeStatus, setUkEuropeStatus] = useState("Sold to StudioCanal / Curzon (£850K Minimum Guarantee)");
  const [eastAsiaStatus, setEastAsiaStatus] = useState("Negotiation: Gaga Corporation (Japan) & CJ ENM (Korea)");
  const [menaGulfStatus, setMenaGulfStatus] = useState("Sold to VOX Cinemas / Gulf Film ($600K MG)");

  // Step 3: Minimum Guarantee & Delivery Escrow
  const [totalMGSalesCrores, setTotalMGSalesCrores] = useState("₹28.40 Crores Total Global Pre-Sales");
  const [escrowDepositBank, setEscrowDepositBank] = useState("City National Bank / ICICI Global Escrow Entertainment Division");
  const [deliveryMilestoneHoldback, setDeliveryMilestoneHoldback] = useState("20% Holdback Upon 4K HDR DCI Interop Delivery Sign-Off");

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const downloadSalesTermSheet = () => {
    setIsExporting(true);
    const csvContent = `Territory,Buyer / Distributor,Rights Licensed,Term (Years),Minimum Guarantee ($),Commission (%),Net Producer Escrow ($),Delivery Window,Legal Status
North America,NEON Rated,All Theatrical + SVOD,15 Years,1800000,12.5%,1575000,Q3 2027,LONG_FORM_CONTRACT_SIGNED
United Kingdom,StudioCanal,Theatrical + Home Ent,12 Years,1100000,12.5%,962500,Q3 2027,LONG_FORM_CONTRACT_SIGNED
France & Benelux,Pathé Distribution,Theatrical + Pay TV,10 Years,750000,12.5%,656250,Q4 2027,DEAL_MEMO_SIGNED
Middle East / MENA,VOX Cinemas,All Theatrical Rights,10 Years,600000,12.5%,525000,Q3 2027,LONG_FORM_CONTRACT_SIGNED
Japan & Korea,Gaga Corp / CJ ENM,Theatrical + VOD,10 Years,950000,12.5%,831250,Q4 2027,BINDING_TERM_SHEET
Germany / DACH,Constantin Film,Theatrical + Free TV,12 Years,680000,12.5%,595000,Q4 2027,DEAL_MEMO_SIGNED
TOTAL PRE-SALES,GLOBAL SYNDICATE,ALL TERRITORIES,VARIOUS,5880000,12.5%,5145000,2027,ESCROW_FUNDED_80%`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `GLOBAL_TERRITORY_SALES_TERMSHEET_${defaultProject.replace(/\s+/g, "_")}.csv`);
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
              <Globe2 size={20} />
            </div>
            <div>
              <h2 className="font-cinema" style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                Global Sales Agent &amp; Film Market Territory Rights Vault
              </h2>
              <p style={{ fontSize: "11px", color: "#8e8e9e", margin: "2px 0 0 0", fontFamily: "monospace" }}>
                Active Production: <span style={{ color: "#d4af61" }}>{defaultProject}</span> • Cannes Marché &amp; EFM Pre-Sales Matrix
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
            { num: 1, title: "Market Agency", icon: Building },
            { num: 2, title: "Territory Grid", icon: Globe2 },
            { num: 3, title: "MG Waterfall", icon: DollarSign },
            { num: 4, title: "Deal Memo", icon: Download },
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
                  Represent your project across premier global film markets: Marché du Film (Cannes), EFM (Berlin), TIFF (Toronto), and AFM (Los Angeles).
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Primary Film Market
                </label>
                <select
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                >
                  <option value="Marché du Film - Festival de Cannes (Riviera Stand)">Marché du Film - Festival de Cannes (May Premiere &amp; Pre-Sales)</option>
                  <option value="European Film Market (EFM) - Berlinale (Gropius Bau)">European Film Market (EFM) - Berlinale (February Market)</option>
                  <option value="Toronto International Film Festival (TIFF Industry)">Toronto International Film Festival (TIFF Industry Screening)</option>
                  <option value="American Film Market (AFM) - Santa Monica">American Film Market (AFM) - Santa Monica (November AFM)</option>
                  <option value="Hong Kong FILMART - Asia-Pacific Syndicate">Hong Kong FILMART - Asia-Pacific Syndicate (March Asian Licensing)</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Global Sales Agent / Agency
                  </label>
                  <input
                    type="text"
                    value={salesAgentAgency}
                    onChange={(e) => setSalesAgentAgency(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase" }}>Sales Commission</label>
                    <span style={{ fontSize: "11px", color: "#d4af61", fontFamily: "monospace" }}>{salesCommissionPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="0.5"
                    value={salesCommissionPercent}
                    onChange={(e) => setSalesCommissionPercent(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#d4af61" }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#bae6fd", margin: 0, lineHeight: 1.5 }}>
                  Territory availability matrix. Track territory rights sold, pending bids, and minimum guarantee offers from global theatrical distributors.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  North America (US &amp; Canada)
                </label>
                <input
                  type="text"
                  value={northAmericaStatus}
                  onChange={(e) => setNorthAmericaStatus(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  United Kingdom &amp; Western Europe
                </label>
                <input
                  type="text"
                  value={ukEuropeStatus}
                  onChange={(e) => setUkEuropeStatus(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    East Asia (Japan / Korea)
                  </label>
                  <input
                    type="text"
                    value={eastAsiaStatus}
                    onChange={(e) => setEastAsiaStatus(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Middle East (MENA / GCC)
                  </label>
                  <input
                    type="text"
                    value={menaGulfStatus}
                    onChange={(e) => setMenaGulfStatus(e.target.value)}
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
                  Minimum Guarantee (MG) escrow disbursements. Advance payments released on key delivery milestones (Script, Rough Cut, 4K Master DCI).
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Total Pre-Sales Minimum Guarantee (MG)
                </label>
                <input
                  type="text"
                  value={totalMGSalesCrores}
                  onChange={(e) => setTotalMGSalesCrores(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Escrow Banking Syndicate
                  </label>
                  <input
                    type="text"
                    value={escrowDepositBank}
                    onChange={(e) => setEscrowDepositBank(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Final Delivery Holdback
                  </label>
                  <input
                    type="text"
                    value={deliveryMilestoneHoldback}
                    onChange={(e) => setDeliveryMilestoneHoldback(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <CheckCircle2 size={18} color="#34d399" />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#34d399" }}>Global Rights Portfolio Secured</span>
                </div>
                <p style={{ fontSize: "12px", color: "#a7f3d0", margin: 0, lineHeight: 1.5 }}>
                  $5.88M in pre-sales executed across 6 core international territories. Escrow agreements legally binding and delivery schedule locked.
                </p>
              </div>

              <div style={{ padding: "18px", borderRadius: "14px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Total Minimum Guarantee:</span>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>$5,880,000 USD (₹28.40 Cr)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Active Territories:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>6 KEY REGIONS CONTRACTED</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Pre-Sales Escrow Deposit:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>80% CASH ADVANCE SECURED</span>
                </div>
              </div>

              <button
                onClick={downloadSalesTermSheet}
                className="btn-cinema-gold"
                style={{ width: "100%", height: "46px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <Download size={16} />
                <span>DOWNLOAD GLOBAL TERRITORY SALES DEAL MEMO (.CSV)</span>
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

