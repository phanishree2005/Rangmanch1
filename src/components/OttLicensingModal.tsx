"use client";

import { useState } from "react";
import {
  X,
  Tv,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Download,
  RotateCcw,
  Calendar,
  FileSpreadsheet,
  Globe,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface OttLicensingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function OttLicensingModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Global Rights Package",
}: OttLicensingModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Territory & Platform
  const [ottPlatform, setOttPlatform] = useState("Netflix Global (SVOD Worldwide)");
  const [territoryScope, setTerritoryScope] = useState("Worldwide (190+ Countries)");
  const [isScanningRights, setIsScanningRights] = useState(false);
  const [rightsScanned, setRightsScanned] = useState(true);

  // Step 2: Minimum Guarantee & Waterfall
  const [mgAmount, setMgAmount] = useState(48.5); // ₹ Crores
  const [distributorComm, setDistributorComm] = useState(12.5); // %
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [waterfallCalculated, setWaterfallCalculated] = useState(true);

  // Step 3: Holdback Windows
  const [theatricalWindow, setTheatricalWindow] = useState("8 Weeks (Standard National Plex Holdback)");
  const [satelliteWindow, setSatelliteWindow] = useState("180 Days Post-Theatrical Premiere");
  const [isLockingWindow, setIsLockingWindow] = useState(false);
  const [windowLocked, setWindowLocked] = useState(true);

  // Step 4: Digital Escrow & Signoff
  const [isVerifyingEscrow, setIsVerifyingEscrow] = useState(false);
  const [escrowProgress, setEscrowProgress] = useState(100);
  const [escrowSealed, setEscrowSealed] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const markStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
  };

  const handleScanRights = () => {
    setIsScanningRights(true);
    setRightsScanned(false);
    setTimeout(() => {
      setIsScanningRights(false);
      setRightsScanned(true);
      markStepComplete(1);
    }, 1200);
  };

  const handleRecalculateWaterfall = () => {
    setIsRecalculating(true);
    setWaterfallCalculated(false);
    setTimeout(() => {
      setIsRecalculating(false);
      setWaterfallCalculated(true);
      markStepComplete(2);
    }, 1100);
  };

  const handleLockWindow = () => {
    setIsLockingWindow(true);
    setWindowLocked(false);
    setTimeout(() => {
      setIsLockingWindow(false);
      setWindowLocked(true);
      markStepComplete(3);
    }, 1200);
  };

  const handleVerifyEscrow = () => {
    setIsVerifyingEscrow(true);
    setEscrowProgress(0);
    setEscrowSealed(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 25;
      setEscrowProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setIsVerifyingEscrow(false);
        setEscrowSealed(true);
        markStepComplete(4);
      }
    }, 280);
  };

  const handleDownloadTermSheet = () => {
    const payload = JSON.stringify(
      {
        project: defaultProject,
        timestamp: new Date().toISOString(),
        licensingEntity: "Rangmanch Global Distribution Escrow Ltd.",
        platformLicensee: ottPlatform,
        territorialScope: territoryScope,
        commercials: {
          minimumGuaranteeINR: `₹${mgAmount.toFixed(1)} Crores`,
          distributorCommissionPercentage: `${distributorComm}%`,
          netProducerYieldINR: `₹${(mgAmount * (1 - distributorComm / 100)).toFixed(2)} Crores`,
          currency: "INR",
        },
        holdbackWindows: {
          theatricalExclusivity: theatricalWindow,
          satelliteTelevisionHoldback: satelliteWindow,
        },
        escrowStatus: escrowSealed ? "SMART_ESCROW_SEALED" : "DRAFT",
        legalJurisdiction: "High Court of Bombay / Indian Arbitration and Conciliation Act",
      },
      null,
      2
    );

    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `OTT_Licensing_TermSheet_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess("OTT Licensing Term Sheet JSON exported successfully!");
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleDownloadWaterfallCsv = () => {
    const producerShare = (mgAmount * (1 - distributorComm / 100)).toFixed(2);
    const commissionVal = (mgAmount * (distributorComm / 100)).toFixed(2);
    const csvContent = `Tier,Recipient,Percentage,Amount_INR_Cr,EscrowAccount,DisbursementCondition
Tier 1,Distributor Commission,${distributorComm}%,₹${commissionVal} Cr,HDFC Escrow 49102,Upon Delivery of CPL 4K Master
Tier 2,P&A Recoupment,8.0%,₹3.88 Cr,ICICI Escrow 19022,First Theatrical Weekend Gross
Tier 3,Producer Net Escrow,${(100 - distributorComm - 8).toFixed(1)}%,₹${producerShare} Cr,Axis Bank Studio 7712,48h Post Global OTT Launch
Tier 4,Overages & Profit Participation,50/50,Variable,Smart Contract Vault,Exceeding 2.5x MG Threshold
`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Waterfall_Escrow_Schedule_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess("Revenue Waterfall Escrow CSV exported successfully!");
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="modal-backdrop">
      <div
        className="modal-panel"
        style={{
          maxWidth: "840px",
          width: "100%",
          background: "linear-gradient(180deg, #180d22 0%, #0d0614 100%)",
          border: "1px solid rgba(168, 85, 247, 0.35)",
          borderRadius: "24px",
          boxShadow: "0 25px 80px rgba(0,0,0,0.95), 0 0 50px rgba(168, 85, 247, 0.12)",
          overflow: "hidden",
        }}
      >
        {/* Top Purple Trim */}
        <div
          style={{
            height: "3px",
            width: "100%",
            background:
              "linear-gradient(90deg, transparent, #a855f7 25%, #e9d5ff 50%, #a855f7 75%, transparent)",
          }}
        />

        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 32px 20px 32px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "#13091c",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0.05) 100%)",
                border: "1px solid rgba(168,85,247,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#a855f7",
              }}
            >
              <Tv size={24} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  letterSpacing: "0.15em",
                  color: "#a855f7",
                  textTransform: "uppercase",
                }}
              >
                Theatrical &amp; OTT Syndication • Feature 75
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  marginTop: "2px",
                }}
              >
                Multi-Territory OTT Licensing &amp; Escrow
              </h2>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                Production: <span style={{ color: "#a855f7", fontWeight: 600 }}>{defaultProject}</span> • Minimum Guarantee (MG) &amp; Waterfall Settlement
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Stepper Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            padding: "16px 32px",
            backgroundColor: "#0d0515",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            gap: "12px",
          }}
        >
          {[
            { num: 1, label: "Territory & Rights" },
            { num: 2, label: "MG & Waterfall" },
            { num: 3, label: "Holdback Windows" },
            { num: 4, label: "Smart Escrow Sign" },
          ].map((s) => {
            const isCompleted = completedSteps.includes(s.num);
            const isCurrent = activeStep === s.num;
            return (
              <button
                key={s.num}
                onClick={() => setActiveStep(s.num)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
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
                    fontSize: "12px",
                    fontWeight: "bold",
                    background: isCurrent
                      ? "#a855f7"
                      : isCompleted
                      ? "rgba(168,85,247,0.2)"
                      : "rgba(255,255,255,0.05)",
                    color: isCurrent
                      ? "#2e1065"
                      : isCompleted
                      ? "#a855f7"
                      : "rgba(255,255,255,0.4)",
                    border: isCurrent
                      ? "none"
                      : isCompleted
                      ? "1px solid rgba(168,85,247,0.4)"
                      : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {isCompleted && !isCurrent ? "✓" : s.num}
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: isCurrent ? "600" : "400",
                    color: isCurrent ? "#a855f7" : isCompleted ? "#ffffff" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div style={{ padding: "28px 32px", maxHeight: "60vh", overflowY: "auto" }}>
          {/* Step 1: Territory & Rights */}
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(168,85,247,0.06)",
                  border: "1px solid rgba(168,85,247,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Globe size={22} color="#a855f7" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#a855f7" }}>
                    Step 1 Process: Platform Selection &amp; Territorial Jurisdiction Mapping
                  </span>{" "}
                  Define digital SVOD/TVOD streaming rights windows for Tier-1 OTT streamers across
                  domestic Indian circuits, South Asia, diaspora territories, and global syndication.
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Lead OTT Streaming Platform
                  </label>
                  <select
                    value={ottPlatform}
                    onChange={(e) => setOttPlatform(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#1c1126",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="Netflix Global (SVOD Worldwide)">Netflix Global (SVOD Worldwide Exclusive)</option>
                    <option value="Amazon Prime Video India &amp; Diaspora">Amazon Prime Video (India &amp; Global SVOD)</option>
                    <option value="Disney+ Hotstar (India + South Asia)">Disney+ Hotstar (India + South Asia)</option>
                    <option value="Zee5 Global + SonyLIV Dual-Platform">Zee5 Global + SonyLIV Regional Syndication</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Territorial Licensing Scope
                  </label>
                  <select
                    value={territoryScope}
                    onChange={(e) => setTerritoryScope(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#1c1126",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="Worldwide (190+ Countries)">Worldwide (190+ Countries - Global Buyout)</option>
                    <option value="India Subcontinent Only (SAARC)">India Subcontinent Only (India, Nepal, Sri Lanka, BD)</option>
                    <option value="Overseas Diaspora (US, UK, UAE, AUS)">Overseas Diaspora (US, UK, UAE, Singapore, AUS)</option>
                  </select>
                </div>
              </div>

              {/* Rights Verification Console */}
              <div
                style={{
                  backgroundColor: "#150b1e",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    Rights Ownership Chain-of-Title Audit
                  </div>
                  <button
                    onClick={handleScanRights}
                    disabled={isScanningRights}
                    style={{
                      background: "rgba(168,85,247,0.15)",
                      border: "1px solid rgba(168,85,247,0.3)",
                      color: "#a855f7",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontWeight: 600,
                    }}
                  >
                    <RotateCcw size={13} className={isScanningRights ? "animate-spin" : ""} />
                    {isScanningRights ? "Scanning Copyright Registry..." : "⚡ Verify Chain of Title &amp; No-Conflict"}
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                  <div style={{ backgroundColor: "#1e0f2b", padding: "12px", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Digital SVOD Rights</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#10b981", marginTop: "4px" }}>CLEAR &amp; UNENCUMBERED</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>100% Producer Retained</div>
                  </div>
                  <div style={{ backgroundColor: "#1e0f2b", padding: "12px", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Linear Satellite Rights</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#a855f7", marginTop: "4px" }}>HELD BACK (180D)</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>Zee Cinema / Star Gold</div>
                  </div>
                  <div style={{ backgroundColor: "#1e0f2b", padding: "12px", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Music Soundtrack Sync</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#10b981", marginTop: "4px" }}>T-SERIES LICENSED</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>Global Master Clearance</div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "10px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#10b981", display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle2 size={14} /> Chain of title authenticated under Indian Copyright Act Section 19
                  </span>
                  <button
                    onClick={() => {
                      markStepComplete(1);
                      setActiveStep(2);
                    }}
                    style={{
                      background: "#a855f7",
                      color: "#2e1065",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Confirm Rights &amp; Configure Waterfall <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: MG & Waterfall */}
          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(168,85,247,0.06)",
                  border: "1px solid rgba(168,85,247,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Coins size={22} color="#a855f7" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#a855f7" }}>
                    Step 2 Process: Minimum Guarantee (MG) Valuation &amp; Revenue Waterfall Tranches
                  </span>{" "}
                  Model the non-refundable Minimum Guarantee payout, distributor commission splits,
                  and automated waterfall recoupment order for investors and producers.
                </div>
              </div>

              {/* Interactive Commercial Sliders */}
              <div
                style={{
                  backgroundColor: "#160b20",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    Commercial Valuation Parameters
                  </div>
                  <button
                    onClick={handleRecalculateWaterfall}
                    disabled={isRecalculating}
                    style={{
                      background: "rgba(168,85,247,0.15)",
                      border: "1px solid rgba(168,85,247,0.3)",
                      color: "#a855f7",
                      padding: "4px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontWeight: 600,
                    }}
                  >
                    <RotateCcw size={12} className={isRecalculating ? "animate-spin" : ""} />
                    {isRecalculating ? "Calculating Splits..." : "📊 Recalculate Net Yield"}
                  </button>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "rgba(255,255,255,0.8)", marginBottom: "6px" }}>
                    <span>OTT Minimum Guarantee (MG): <strong style={{ color: "#a855f7" }}>₹{mgAmount.toFixed(1)} Crores</strong></span>
                  </div>
                  <input
                    type="range"
                    min="10.0"
                    max="120.0"
                    step="0.5"
                    value={mgAmount}
                    onChange={(e) => setMgAmount(parseFloat(e.target.value))}
                    style={{ width: "100%", accentColor: "#a855f7" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "rgba(255,255,255,0.8)", marginBottom: "6px" }}>
                    <span>Distributor Commission Fee: <strong style={{ color: "#a855f7" }}>{distributorComm.toFixed(1)}%</strong></span>
                  </div>
                  <input
                    type="range"
                    min="5.0"
                    max="25.0"
                    step="0.5"
                    value={distributorComm}
                    onChange={(e) => setDistributorComm(parseFloat(e.target.value))}
                    style={{ width: "100%", accentColor: "#a855f7" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "4px" }}>
                  <div style={{ backgroundColor: "#1e0f2b", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Gross Platform Payout</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#a855f7" }}>₹{mgAmount.toFixed(1)} Cr</div>
                  </div>
                  <div style={{ backgroundColor: "#1e0f2b", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Distributor Share</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#ffffff" }}>
                      ₹{(mgAmount * (distributorComm / 100)).toFixed(2)} Cr
                    </div>
                  </div>
                  <div style={{ backgroundColor: "#1e0f2b", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Net Studio Yield</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#10b981" }}>
                      ₹{(mgAmount * (1 - distributorComm / 100)).toFixed(2)} Cr
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "6px",
                  }}
                >
                  <button
                    onClick={() => {
                      markStepComplete(2);
                      setActiveStep(3);
                    }}
                    style={{
                      background: "#a855f7",
                      color: "#2e1065",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Lock Financials &amp; Set Holdbacks <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Holdback Windows */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(168,85,247,0.06)",
                  border: "1px solid rgba(168,85,247,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Calendar size={22} color="#a855f7" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#a855f7" }}>
                    Step 3 Process: Theatrical Exclusivity &amp; Windowing Protocols
                  </span>{" "}
                  Multiplex chains (PVR INOX, Cinepolis) mandate strict 8-week holdbacks before any digital
                  streaming launch. Automate legal embargoes and promotional premiere countdowns.
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Theatrical Exclusivity Window
                  </label>
                  <select
                    value={theatricalWindow}
                    onChange={(e) => setTheatricalWindow(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#1c1126",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="8 Weeks (Standard National Plex Holdback)">8 Weeks (Standard Multiplex Agreement - 56 Days)</option>
                    <option value="6 Weeks (Fast-Track OTT Window)">6 Weeks (Fast-Track Mid-Budget OTT Window)</option>
                    <option value="4 Weeks (Direct-to-Digital Hybrid)">4 Weeks (Hybrid Theatrical + Digital Event)</option>
                    <option value="Direct-to-Digital (Day &amp; Date Buyout)">Direct-to-Digital (Day &amp; Date Global Premiere)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Satellite Television Embargo
                  </label>
                  <select
                    value={satelliteWindow}
                    onChange={(e) => setSatelliteWindow(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#1c1126",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="180 Days Post-Theatrical Premiere">180 Days (6 Months Post-Theatrical Premiere)</option>
                    <option value="120 Days Post-OTT Launch">120 Days Post-OTT Launch</option>
                    <option value="Concurrent OTT &amp; Satellite Window">Concurrent OTT &amp; Satellite World Television Premiere</option>
                  </select>
                </div>
              </div>

              {/* Timeline Schedule Card */}
              <div
                style={{
                  backgroundColor: "#150b1e",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    Release Roadmap &amp; Windowing Timetable
                  </div>
                  <button
                    onClick={handleLockWindow}
                    disabled={isLockingWindow}
                    style={{
                      background: "rgba(168,85,247,0.15)",
                      border: "1px solid rgba(168,85,247,0.3)",
                      color: "#a855f7",
                      padding: "4px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontWeight: 600,
                    }}
                  >
                    <RotateCcw size={12} className={isLockingWindow ? "animate-spin" : ""} />
                    {isLockingWindow ? "Locking Window..." : "🔒 Lock Windowing Embargo"}
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", backgroundColor: "#1e0f2b", borderRadius: "8px", fontSize: "12px" }}>
                    <span style={{ color: "#ffffff" }}>Day 01 — Nationwide Theatrical Release (PVR INOX / IMAX)</span>
                    <span style={{ color: "#10b981", fontWeight: 600 }}>THEATRICAL EXCLUSIVE</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", backgroundColor: "#1e0f2b", borderRadius: "8px", fontSize: "12px" }}>
                    <span style={{ color: "#ffffff" }}>Day 56 — OTT Streaming Launch (4K HDR / Dolby Vision)</span>
                    <span style={{ color: "#a855f7", fontWeight: 600 }}>SVOD WORLDWIDE</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", backgroundColor: "#1e0f2b", borderRadius: "8px", fontSize: "12px" }}>
                    <span style={{ color: "#ffffff" }}>Day 180 — World Television Premiere (Satellite Broadcast)</span>
                    <span style={{ color: "#f59e0b", fontWeight: 600 }}>LINEAR BROADCAST</span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "12px",
                    paddingTop: "10px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <button
                    onClick={() => {
                      markStepComplete(3);
                      setActiveStep(4);
                    }}
                    style={{
                      background: "#a855f7",
                      color: "#2e1065",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Confirm Windows &amp; Finalize Escrow <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Digital Escrow & Signoff */}
          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(168,85,247,0.06)",
                  border: "1px solid rgba(168,85,247,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <CheckCircle2 size={22} color="#a855f7" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#a855f7" }}>
                    Step 4 Process: Automated Smart Escrow Account &amp; Contract Package Turnaround
                  </span>{" "}
                  All syndication milestones, banking escrow routing numbers, and digital signatures
                  are verified. Export binding legal term sheets and disbursement waterfall schedules.
                </div>
              </div>

              {downloadSuccess && (
                <div
                  style={{
                    backgroundColor: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.4)",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    color: "#10b981",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>{downloadSuccess}</span>
                </div>
              )}

              {/* Escrow Runner */}
              <div
                style={{
                  backgroundColor: "#150b1e",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#ffffff" }}>
                    Escrow Banking Verification Matrix
                  </span>
                  <button
                    onClick={handleVerifyEscrow}
                    disabled={isVerifyingEscrow}
                    style={{
                      background: "rgba(168,85,247,0.15)",
                      border: "1px solid rgba(168,85,247,0.3)",
                      color: "#a855f7",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontWeight: 600,
                    }}
                  >
                    <RotateCcw size={12} className={isVerifyingEscrow ? "animate-spin" : ""} />
                    {isVerifyingEscrow ? `Signing Escrow Vault (${escrowProgress}%)...` : "🚀 Validate Bank Escrow Vault"}
                  </button>
                </div>

                {isVerifyingEscrow && (
                  <div style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#a855f7", marginBottom: "4px" }}>
                      <span>Validating RBI Escrow Compliance &amp; Letter of Credit...</span>
                      <span>{escrowProgress}%</span>
                    </div>
                    <div style={{ width: "100%", height: "6px", backgroundColor: "#1e0f2b", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${escrowProgress}%`, height: "100%", backgroundColor: "#a855f7", transition: "width 0.25s ease" }} />
                    </div>
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#1c1126", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>Letter of Credit (LC) Verified</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>J.P. Morgan / HDFC Institutional</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#1c1126", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>TDS &amp; GST Tranche Hold</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>18% GST Input Credit Auto-Routed</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#1c1126", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>Digital Signatures Authenticated</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>eSign Aadhaar / DocuSign Enterprise</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#1c1126", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>Overages Recoupment Engine</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Active Post 2.5x MG Threshold</div>
                    </div>
                  </div>
                </div>

                {escrowSealed && (
                  <div
                    style={{
                      marginTop: "16px",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <ShieldCheck size={20} color="#10b981" />
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#10b981" }}>SMART ESCROW SEEDED &amp; LEGALLY BINDING</div>
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>Non-refundable Minimum Guarantee secured in institutional escrow account.</div>
                      </div>
                    </div>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "999px",
                        backgroundColor: "#10b981",
                        color: "#022c22",
                        fontSize: "11px",
                        fontWeight: "bold",
                      }}
                    >
                      ESCROW ACTIVE
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                <button
                  onClick={handleDownloadTermSheet}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)",
                    color: "#ffffff",
                    fontWeight: "600",
                    fontSize: "13px",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(168,85,247,0.3)",
                  }}
                >
                  <Download size={16} />
                  Export OTT Term Sheet (.JSON)
                </button>

                <button
                  onClick={handleDownloadWaterfallCsv}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    backgroundColor: "#1c1126",
                    border: "1px solid rgba(168,85,247,0.4)",
                    color: "#a855f7",
                    fontWeight: "600",
                    fontSize: "13px",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                >
                  <FileSpreadsheet size={16} />
                  Export Waterfall Escrow (CSV)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 32px 24px 32px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "#0d0515",
          }}
        >
          <button
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            style={{
              padding: "8px 18px",
              borderRadius: "10px",
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: activeStep === 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
              fontSize: "13px",
              cursor: activeStep === 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>

          <div style={{ display: "flex", gap: "10px" }}>
            {activeStep < 4 ? (
              <button
                onClick={() => {
                  markStepComplete(activeStep);
                  setActiveStep((prev) => Math.min(4, prev + 1));
                }}
                style={{
                  padding: "8px 22px",
                  borderRadius: "10px",
                  background: "#a855f7",
                  border: "none",
                  color: "#2e1065",
                  fontWeight: "600",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Next Step →
              </button>
            ) : (
              <button
                onClick={onClose}
                style={{
                  padding: "8px 22px",
                  borderRadius: "10px",
                  background: "#10b981",
                  border: "none",
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Close &amp; Finalize Agreement
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

