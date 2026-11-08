"use client";

import { useState } from "react";
import {
  X,
  Coins,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  Landmark,
  TrendingUp,
  Globe2,
  PieChart,
  Scale,
  ShieldCheck,
  Receipt,
  Layers,
} from "lucide-react";

interface GlobalTerritoryWaterfallModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function GlobalTerritoryWaterfallModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Worldwide Rights & Waterfall Recoupment",
}: GlobalTerritoryWaterfallModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Territory Minimum Guarantee (MG) Hub
  const [worldwideGrossEstimate, setWorldwideGrossEstimate] = useState(18.5); // In millions USD
  const [territoryDeals, setTerritoryDeals] = useState([
    { territory: "North America (US & Canada)", buyer: "Neon / A24 / Sony Pictures Classics", mgAmount: "$4.50M", rights: "Theatrical + Day-and-Date PVOD" },
    { territory: "UK & Western Europe", buyer: "StudioCanal / Altitude Film", mgAmount: "$2.80M", rights: "All Theatrical & Free-TV Rights" },
    { territory: "MENA & Gulf (UAE, KSA, Qatar)", buyer: "VOX Cinemas / Front Row Filmed Ent.", mgAmount: "$2.20M", rights: "Theatrical Distribution & Arab Dub" },
    { territory: "East Asia (Japan, South Korea)", buyer: "Twin Co. / CJ ENM", mgAmount: "$1.90M", rights: "DCI Theatrical Release" },
    { territory: "India Domestic Theatrical & OTT", buyer: "YRF Distribution & Global Streamer", mgAmount: "$6.80M", rights: "Exclusive Pan-India Languages" },
  ]);

  // Step 2: Waterfall Recoupment Hierarchy
  const [camaManager, setCamaManager] = useState("Freeway Entertainment / Fintage House CAMA Escrow");
  const [bankDebtTier, setBankDebtTier] = useState("₹22.5 Cr Senior Secured Production Loan (8.5% p.a. First Priority)");
  const [salesCommissionPercent, setSalesCommissionPercent] = useState(12.5);
  const [equityCorrecoupmentRate, setEquityCorrecoupmentRate] = useState(120);
  const [producerBackendPoolPercent, setProducerBackendPoolPercent] = useState(50);

  // Step 3: Foreign Tax & Currency Hedging
  const [currencyHedgeMode, setCurrencyHedgeMode] = useState("Forward Spot-Lock Contract (1 USD = ₹84.40 INR / 1 EUR = ₹91.20 INR)");
  const [withholdingTaxRelief, setWithholdingTaxRelief] = useState("DTAA Article 12 (Royalty Withholding Capped at 10% vs 20% Standard)");

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const handleDownloadWaterfallDossier = () => {
    setIsExporting(true);
    const waterfallData = {
      project: defaultProject,
      camaFiduciary: camaManager,
      totalPresalesBooked: "$18.20M USD (₹153.6 Cr INR Equivalent)",
      waterfallStructure: {
        tier1_fiduciaryFees: "1.0% CAMA Management Fee + 2.0% FFI Completion Bond Guarantee",
        tier2_seniorBankDebt: bankDebtTier,
        tier3_salesAgentCommission: `${salesCommissionPercent}% International Sales Commission + Capped P&A Expenses ($650,000)`,
        tier4_equityFinanciers: `${equityCorrecoupmentRate}% Correcoupment Pari Passu Return of Capital`,
        tier5_backendNetProfits: `${producerBackendPoolPercent}% Producer / Director / Star Talent Net Profit Pool`,
      },
      territorySchedule: territoryDeals,
      currencyRiskHedge: {
        fxStrategy: currencyHedgeMode,
        taxReliefTreaty: withholdingTaxRelief,
      },
      auditTimestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(waterfallData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Global_Waterfall_Schedule_${defaultProject.replace(/\s+/g, "_")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTimeout(() => setIsExporting(false), 900);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.88)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1050px",
          maxHeight: "92vh",
          backgroundColor: "#0d0c0a",
          border: "1px solid rgba(212, 175, 55, 0.4)",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 65px rgba(0, 0, 0, 0.95), 0 0 45px rgba(212, 175, 55, 0.15)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 30px",
            borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(180deg, rgba(212, 175, 55, 0.1) 0%, rgba(13, 12, 10, 0.6) 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "rgba(212, 175, 55, 0.15)",
                border: "1px solid rgba(212, 175, 55, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#d4af37",
              }}
            >
              <Coins size={26} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2
                  className="font-cinema"
                  style={{
                    color: "#f5f5f0",
                    fontSize: "22px",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    margin: 0,
                  }}
                >
                  Global Film Territory Sales &amp; Revenue Waterfall Ledger
                </h2>
                <span
                  style={{
                    fontSize: "11px",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(212, 175, 55, 0.2)",
                    color: "#d4af37",
                    border: "1px solid rgba(212, 175, 55, 0.4)",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                  }}
                >
                  FEATURE 100
                </span>
              </div>
              <p
                style={{
                  color: "#9e9e90",
                  fontSize: "13px",
                  margin: "4px 0 0 0",
                }}
              >
                CAMA Fiduciary Escrow • Multi-Territory Minimum Guarantees • Recoupment Waterfall Tiers • DTAA Tax Shield
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              color: "#a0a095",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Step Navigation Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          {[
            { step: 1, title: "1. Territory MGs", desc: "Pre-Sales Deals", icon: Globe2 },
            { step: 2, title: "2. Waterfall Tiers", desc: "Senior Debt & Equity", icon: Scale },
            { step: 3, title: "3. Tax & FX Hedge", desc: "DTAA Treaty Relief", icon: Landmark },
            { step: 4, title: "4. CAMA Schedule", desc: "Settlement Ledger", icon: Receipt },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeStep === item.step;
            const isCompleted = completedSteps.includes(item.step);
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                style={{
                  padding: "14px 18px",
                  background: isActive
                    ? "rgba(212, 175, 55, 0.12)"
                    : "transparent",
                  border: "none",
                  borderBottom: isActive
                    ? "2px solid #d4af37"
                    : "2px solid transparent",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isActive
                      ? "#d4af37"
                      : isCompleted
                      ? "rgba(212, 175, 55, 0.3)"
                      : "rgba(255, 255, 255, 0.05)",
                    color: isActive ? "#0d0c0a" : isCompleted ? "#d4af37" : "#777",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {isCompleted && !isActive ? <Check size={16} /> : <Icon size={15} />}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: isActive ? "#f5f5f0" : "#a0a095",
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ fontSize: "11px", color: "#666" }}>
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div
          style={{
            padding: "26px 32px",
            overflowY: "auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* STEP 1 */}
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: "12px",
                  background: "rgba(212, 175, 55, 0.06)",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: "12px", color: "#d4af37", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Active Sales Title
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginTop: "2px" }}>
                    {defaultProject}
                  </div>
                </div>
                <div
                  style={{
                    padding: "6px 14px",
                    borderRadius: "20px",
                    backgroundColor: "rgba(46, 125, 50, 0.15)",
                    border: "1px solid rgba(76, 175, 80, 0.4)",
                    color: "#81c784",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  $18.20M Pre-Sales Minimum Guarantees Locked
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "10px", fontWeight: 600 }}>
                  Contracted Territory Minimum Guarantees (MGs)
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {territoryDeals.map((deal, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "14px 18px",
                        borderRadius: "10px",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(212, 175, 55, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>
                          {deal.territory}
                        </div>
                        <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>
                          Buyer: {deal.buyer} • Scope: {deal.rights}
                        </div>
                      </div>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "#81c784", fontFamily: "monospace" }}>
                        {deal.mgAmount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => {
                    handleStepComplete(1);
                    setActiveStep(2);
                  }}
                  className="btn-cinema-gold"
                  style={{
                    padding: "12px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  CONFIGURE RECOUPMENT WATERFALL <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  padding: "18px 22px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(0, 0, 0, 0.5) 100%)",
                  border: "1px solid rgba(212, 175, 55, 0.25)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <Scale size={20} color="#d4af37" />
                  <h4 style={{ margin: 0, color: "#fff", fontSize: "15px" }}>
                    Fiduciary CAMA Priority Recoupment Waterfall
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "12px", color: "#a0a095" }}>
                  Automates distribution of gross proceeds from the central escrow account in strict accordance with film financing contracts.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    CAMA Fiduciary Escrow Agent
                  </label>
                  <input
                    type="text"
                    value={camaManager}
                    onChange={(e) => setCamaManager(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "#161513",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      color: "#eee",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Senior Secured Bank Debt Facility
                  </label>
                  <input
                    type="text"
                    value={bankDebtTier}
                    onChange={(e) => setBankDebtTier(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "#161513",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      color: "#eee",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "12px", color: "#d4af37", fontWeight: 600 }}>
                      Sales Agent Commission
                    </label>
                    <span style={{ fontSize: "12px", color: "#fff", fontWeight: 700 }}>
                      {salesCommissionPercent}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    value={salesCommissionPercent}
                    onChange={(e) => setSalesCommissionPercent(parseFloat(e.target.value))}
                    style={{ width: "100%", accentColor: "#d4af37", marginTop: "8px" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "12px", color: "#d4af37", fontWeight: 600 }}>
                      Equity Correcoupment
                    </label>
                    <span style={{ fontSize: "12px", color: "#fff", fontWeight: 700 }}>
                      {equityCorrecoupmentRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="150"
                    value={equityCorrecoupmentRate}
                    onChange={(e) => setEquityCorrecoupmentRate(parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: "#d4af37", marginTop: "8px" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "12px", color: "#d4af37", fontWeight: 600 }}>
                      Backend Net Profit Pool
                    </label>
                    <span style={{ fontSize: "12px", color: "#fff", fontWeight: 700 }}>
                      {producerBackendPoolPercent}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="70"
                    value={producerBackendPoolPercent}
                    onChange={(e) => setProducerBackendPoolPercent(parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: "#d4af37", marginTop: "8px" }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => setActiveStep(1)}
                  style={{
                    padding: "12px 20px",
                    background: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "10px",
                    color: "#bbb",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  BACK TO TERRITORIES
                </button>
                <button
                  onClick={() => {
                    handleStepComplete(2);
                    setActiveStep(3);
                  }}
                  className="btn-cinema-gold"
                  style={{
                    padding: "12px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  CALCULATE TAX &amp; FX HEDGE <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Currency Hedging &amp; FX Forward Rate
                  </label>
                  <input
                    type="text"
                    value={currencyHedgeMode}
                    onChange={(e) => setCurrencyHedgeMode(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "#161513",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      color: "#eee",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Double Taxation Avoidance Agreement (DTAA) Shield
                  </label>
                  <input
                    type="text"
                    value={withholdingTaxRelief}
                    onChange={(e) => setWithholdingTaxRelief(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "#161513",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      color: "#eee",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: "12px",
                  background: "rgba(46, 125, 50, 0.12)",
                  border: "1px solid rgba(76, 175, 80, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#81c784" }}>
                    Tax Shield Active: Estimated ₹3.2 Cr Foreign Withholding Saved
                  </div>
                  <div style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>
                    Direct withholding tax credits applied across France, US, UAE and Indian IT returns.
                  </div>
                </div>
                <span style={{ fontSize: "11px", color: "#d4af37", fontFamily: "monospace", fontWeight: 700 }}>
                  DTAA CERTIFIED
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => setActiveStep(2)}
                  style={{
                    padding: "12px 20px",
                    background: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "10px",
                    color: "#bbb",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  BACK TO WATERFALL
                </button>
                <button
                  onClick={() => {
                    handleStepComplete(3);
                    setActiveStep(4);
                  }}
                  className="btn-cinema-gold"
                  style={{
                    padding: "12px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  PREPARE SETTLEMENT DOSSIER <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(13, 12, 10, 0.8) 100%)",
                  border: "1px solid rgba(212, 175, 55, 0.35)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <Receipt size={22} color="#d4af37" />
                  <h4 style={{ margin: 0, color: "#fff", fontSize: "16px" }}>
                    Final CAMA Distribution Schedule &amp; Recoupment Ledger
                  </h4>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginTop: "14px" }}>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>Bank Debt Payoff</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#81c784", marginTop: "2px" }}>100% Recouped (Day 1)</div>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>Investor Capital IRR</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#d4af37", marginTop: "2px" }}>24.2% Net Return</div>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>Producer Net Pool</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginTop: "2px" }}>₹38.4 Cr Distributable</div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "14px",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(212, 175, 55, 0.15)",
                }}
              >
                <button
                  onClick={() => setActiveStep(3)}
                  style={{
                    padding: "12px 20px",
                    background: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "10px",
                    color: "#bbb",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  BACK TO TAX &amp; FX
                </button>
                <button
                  onClick={handleDownloadWaterfallDossier}
                  disabled={isExporting}
                  className="btn-cinema-gold"
                  style={{
                    padding: "12px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Download size={16} />
                  {isExporting ? "GENERATING WATERFALL DOSSIER..." : "DOWNLOAD CAMA WATERFALL RECOUPMENT SCHEDULE"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

