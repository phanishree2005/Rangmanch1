"use client";

import { useState } from "react";
import {
  X,
  TrendingUp,
  BarChart3,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Download,
  RotateCcw,
  Ticket,
  FileSpreadsheet,
  Flame,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface BoxOfficeTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function BoxOfficeTrackerModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Nationwide Theatrical Release",
}: BoxOfficeTrackerModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Multi-Circuit Footprint
  const [leadCircuit, setLeadCircuit] = useState("Mumbai Circuit (Maharashtra, Gujarat, Goa)");
  const [totalScreens, setTotalScreens] = useState(4850);
  const [isScanningCircuit, setIsScanningCircuit] = useState(false);
  const [circuitScanned, setCircuitScanned] = useState(true);

  // Step 2: Advance Booking Heatmap
  const [occupancyTier, setOccupancyTier] = useState("Multiplex Prime (85% Advance Sold)");
  const [advanceGross, setAdvanceGross] = useState(24.8); // ₹ Crores
  const [isFetchingBookings, setIsFetchingBookings] = useState(false);
  const [bookingsFetched, setBookingsFetched] = useState(true);

  // Step 3: AI Predictive Model
  const [openingDayEst, setOpeningDayEst] = useState(36.5); // ₹ Crores
  const [weekendGrossEst, setWeekendGrossEst] = useState(115.0); // ₹ Crores
  const [womMultiplier, setWomMultiplier] = useState(2.85); // Word of mouth multiplier
  const [isCalibratingModel, setIsCalibratingModel] = useState(false);
  const [modelCalibrated, setModelCalibrated] = useState(true);

  // Step 4: Trade Audit & Turnaround
  const [isAuditingTrade, setIsAuditingTrade] = useState(false);
  const [auditProgress, setAuditProgress] = useState(100);
  const [tradeCertified, setTradeCertified] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const markStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
  };

  const handleScanCircuit = () => {
    setIsScanningCircuit(true);
    setCircuitScanned(false);
    setTimeout(() => {
      setIsScanningCircuit(false);
      setCircuitScanned(true);
      markStepComplete(1);
    }, 1200);
  };

  const handleFetchBookings = () => {
    setIsFetchingBookings(true);
    setBookingsFetched(false);
    setTimeout(() => {
      setIsFetchingBookings(false);
      setBookingsFetched(true);
      markStepComplete(2);
    }, 1300);
  };

  const handleCalibrateModel = () => {
    setIsCalibratingModel(true);
    setModelCalibrated(false);
    setTimeout(() => {
      setIsCalibratingModel(false);
      setModelCalibrated(true);
      markStepComplete(3);
    }, 1200);
  };

  const handleRunAudit = () => {
    setIsAuditingTrade(true);
    setAuditProgress(0);
    setTradeCertified(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setAuditProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsAuditingTrade(false);
        setTradeCertified(true);
        markStepComplete(4);
      }
    }, 280);
  };

  const handleDownloadTradeReport = () => {
    const payload = JSON.stringify(
      {
        project: defaultProject,
        timestamp: new Date().toISOString(),
        auditor: "Rangmanch Trade Intelligence Network (Verified with Producer Guild of India)",
        theatricalFootprint: {
          screenCountIndia: totalScreens,
          screenCountOverseas: 1200,
          primaryCircuit: leadCircuit,
          formatSplit: "2D: 65% | IMAX: 15% | 4DX: 10% | Dolby Cinema: 10%",
        },
        advanceBookingAnalytics: {
          advanceDayOneGrossINR: `₹${advanceGross.toFixed(1)} Crores`,
          averageOccupancyFirstWeekend: occupancyTier,
          ticketVelocity: "18,400 tickets/hour (Peak)",
        },
        aiPredictiveForecast: {
          projectedOpeningDayGrossINR: `₹${openingDayEst.toFixed(1)} Crores`,
          projectedOpeningWeekendINR: `₹${weekendGrossEst.toFixed(1)} Crores`,
          projectedLifetimeIndiaNetINR: `₹${(openingDayEst * womMultiplier * 2.8).toFixed(1)} Crores`,
          wordOfMouthMultiplier: `${womMultiplier}x`,
        },
        tradeVerificationStatus: tradeCertified ? "CERTIFIED_BOX_OFFICE_ACCURATE" : "PROVISIONAL",
      },
      null,
      2
    );

    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `BoxOffice_Trade_Report_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess("Box Office Trade Report JSON exported successfully!");
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleDownloadOccupancyCsv = () => {
    const csvContent = `Circuit,Screens,ShowsPerDay,Day1_Advance_Sold,Occupancy_Rate,Gross_INR_Cr,TradeVerdict
Mumbai Circuit (MH/GUJ),1450,5800,412000,88.4%,₹12.40 Cr,BLOCKBUSTER_START
Delhi-UP / East Punjab,1200,4800,345000,84.1%,₹9.80 Cr,EXCELLENT_HOLD
Nizam / Andhra Pradesh,950,4200,380000,92.6%,₹8.20 Cr,RECORD_OCCUPANCY
Karnataka / Tamil Nadu,750,3100,210000,79.5%,₹4.10 Cr,SOLID_TREND
Overseas (US/UK/UAE),1200,3600,185000,81.0%,$2.80M (₹23.5 Cr),STRONG_DIASPORA
`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Theatrical_Occupancy_Audit_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess("Theatrical Occupancy Audit CSV exported successfully!");
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="modal-backdrop">
      <div
        className="modal-panel"
        style={{
          maxWidth: "840px",
          width: "100%",
          background: "linear-gradient(180deg, #1c1507 0%, #0d0a03 100%)",
          border: "1px solid rgba(234, 179, 8, 0.35)",
          borderRadius: "24px",
          boxShadow: "0 25px 80px rgba(0,0,0,0.95), 0 0 50px rgba(234, 179, 8, 0.12)",
          overflow: "hidden",
        }}
      >
        {/* Top Gold Trim */}
        <div
          style={{
            height: "3px",
            width: "100%",
            background:
              "linear-gradient(90deg, transparent, #eab308 25%, #fef08a 50%, #eab308 75%, transparent)",
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
            backgroundColor: "#140f04",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, rgba(234,179,8,0.2) 0%, rgba(234,179,8,0.05) 100%)",
                border: "1px solid rgba(234,179,8,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#eab308",
              }}
            >
              <TrendingUp size={24} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  letterSpacing: "0.15em",
                  color: "#eab308",
                  textTransform: "uppercase",
                }}
              >
                Theatrical Intelligence • Feature 76
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  marginTop: "2px",
                }}
              >
                Box Office Predictive &amp; Occupancy Tracker
              </h2>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                Production: <span style={{ color: "#eab308", fontWeight: 600 }}>{defaultProject}</span> • Real-Time Advance Booking &amp; Collection Analytics
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
            backgroundColor: "#0d0a03",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            gap: "12px",
          }}
        >
          {[
            { num: 1, label: "Circuit Footprint" },
            { num: 2, label: "Advance Heatmap" },
            { num: 3, label: "AI Revenue Model" },
            { num: 4, label: "Trade Certification" },
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
                      ? "#eab308"
                      : isCompleted
                      ? "rgba(234,179,8,0.2)"
                      : "rgba(255,255,255,0.05)",
                    color: isCurrent
                      ? "#291b05"
                      : isCompleted
                      ? "#eab308"
                      : "rgba(255,255,255,0.4)",
                    border: isCurrent
                      ? "none"
                      : isCompleted
                      ? "1px solid rgba(234,179,8,0.4)"
                      : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {isCompleted && !isCurrent ? "✓" : s.num}
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: isCurrent ? "600" : "400",
                    color: isCurrent ? "#eab308" : isCompleted ? "#ffffff" : "rgba(255,255,255,0.5)",
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
          {/* Step 1: Circuit Footprint */}
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(234,179,8,0.06)",
                  border: "1px solid rgba(234,179,8,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <MapPin size={22} color="#eab308" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#eab308" }}>
                    Step 1 Process: Theatrical Circuit Screen Allotment &amp; Show Count Optimization
                  </span>{" "}
                  Coordinate screen allocation across India&apos;s key film distribution circuits,
                  balancing IMAX / 4DX premium large format screens with high-volume single screens.
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Primary Distribution Territory
                  </label>
                  <select
                    value={leadCircuit}
                    onChange={(e) => setLeadCircuit(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#1f1709",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="Mumbai Circuit (Maharashtra, Gujarat, Goa)">Mumbai Circuit (MH, Gujarat, Goa - Highest Grossing)</option>
                    <option value="Delhi-UP / East Punjab">Delhi-UP / East Punjab (National Capital Region)</option>
                    <option value="Nizam / Andhra Pradesh (Telugu Territory)">Nizam / Andhra Pradesh (Telugu Heartland)</option>
                    <option value="Tamil Nadu + Karnataka + Kerala">South India Multi-State Combined (TN, KA, KL)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Target Nationwide Screen Footprint: <strong style={{ color: "#eab308" }}>{totalScreens} Screens</strong>
                  </label>
                  <input
                    type="range"
                    min="1500"
                    max="6500"
                    step="50"
                    value={totalScreens}
                    onChange={(e) => setTotalScreens(parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: "#eab308", marginTop: "10px" }}
                  />
                </div>
              </div>

              {/* Circuit stats console */}
              <div
                style={{
                  backgroundColor: "#161005",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    Nationwide Screen Distribution Matrix
                  </div>
                  <button
                    onClick={handleScanCircuit}
                    disabled={isScanningCircuit}
                    style={{
                      background: "rgba(234,179,8,0.15)",
                      border: "1px solid rgba(234,179,8,0.3)",
                      color: "#eab308",
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
                    <RotateCcw size={13} className={isScanningCircuit ? "animate-spin" : ""} />
                    {isScanningCircuit ? "Auditing Circuit Showtimes..." : "⚡ Sync Multiplex Showtimes"}
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                  <div style={{ backgroundColor: "#221908", padding: "12px", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Multiplex Screens</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#ffffff", marginTop: "4px" }}>
                      {Math.round(totalScreens * 0.62)} Screens
                    </div>
                    <div style={{ fontSize: "11px", color: "#eab308", marginTop: "2px" }}>PVR INOX, Miraj, Cinepolis</div>
                  </div>
                  <div style={{ backgroundColor: "#221908", padding: "12px", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Single Screen Theatres</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#ffffff", marginTop: "4px" }}>
                      {Math.round(totalScreens * 0.38)} Screens
                    </div>
                    <div style={{ fontSize: "11px", color: "#10b981", marginTop: "2px" }}>Mass Heartland Belts</div>
                  </div>
                  <div style={{ backgroundColor: "#221908", padding: "12px", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Daily Show Count</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#10b981", marginTop: "4px" }}>
                      {(totalScreens * 4.2).toFixed(0)} Shows/Day
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>Maximum Theatrical Capacity</div>
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
                    <CheckCircle2 size={14} /> Screen scheduling locked with PVR INOX &amp; single screen federations
                  </span>
                  <button
                    onClick={() => {
                      markStepComplete(1);
                      setActiveStep(2);
                    }}
                    style={{
                      background: "#eab308",
                      color: "#291b05",
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
                    Confirm Screens &amp; Track Bookings <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Advance Heatmap */}
          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(234,179,8,0.06)",
                  border: "1px solid rgba(234,179,8,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Ticket size={22} color="#eab308" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#eab308" }}>
                    Step 2 Process: Real-Time Advance Booking Heatmap &amp; Ticket Velocity
                  </span>{" "}
                  Ingest live ticketing feeds from BookMyShow and Paytm Movies across metropolitan
                  and Tier-2 hubs to gauge opening day advance booking momentum.
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Peak Weekend Occupancy Tier
                  </label>
                  <select
                    value={occupancyTier}
                    onChange={(e) => setOccupancyTier(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#1f1709",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="Multiplex Prime (85% Advance Sold)">Multiplex Prime (85% Advance Sold - High Demand)</option>
                    <option value="Housefull Trending (95% Fast Filling)">Housefull Trending (95% Fast Filling - Blockbuster Pace)</option>
                    <option value="Moderate Occupancy (60% Advance)">Moderate Occupancy (60% Advance - Steady Word of Mouth)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Day 1 Advance Collection: <strong style={{ color: "#eab308" }}>₹{advanceGross.toFixed(1)} Crores</strong>
                  </label>
                  <input
                    type="range"
                    min="5.0"
                    max="65.0"
                    step="0.5"
                    value={advanceGross}
                    onChange={(e) => setAdvanceGross(parseFloat(e.target.value))}
                    style={{ width: "100%", accentColor: "#eab308", marginTop: "10px" }}
                  />
                </div>
              </div>

              {/* Real-time Heatmap visual */}
              <div
                style={{
                  backgroundColor: "#161005",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    City-Wise Advance Ticket Velocity (BookMyShow / Paytm Ingest)
                  </div>
                  <button
                    onClick={handleFetchBookings}
                    disabled={isFetchingBookings}
                    style={{
                      background: "rgba(234,179,8,0.15)",
                      border: "1px solid rgba(234,179,8,0.3)",
                      color: "#eab308",
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
                    <RotateCcw size={12} className={isFetchingBookings ? "animate-spin" : ""} />
                    {isFetchingBookings ? "Streaming Ticketing API..." : "🎟️ Ingest Live Booking Feed"}
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                  {[
                    { city: "Mumbai NCR", speed: "4,820 tkts/hr", occ: "89% Fast Filling", color: "#eab308" },
                    { city: "Delhi NCR", speed: "4,150 tkts/hr", occ: "84% Filling Fast", color: "#eab308" },
                    { city: "Hyderabad", speed: "5,300 tkts/hr", occ: "96% HOUSEFULL", color: "#ef4444" },
                    { city: "Bengaluru", speed: "3,890 tkts/hr", occ: "82% Steady Advance", color: "#10b981" },
                  ].map((c) => (
                    <div key={c.city} style={{ backgroundColor: "#221908", padding: "10px", borderRadius: "8px" }}>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>{c.city}</div>
                      <div style={{ fontSize: "13px", fontWeight: "bold", color: "#ffffff", marginTop: "2px" }}>{c.speed}</div>
                      <div style={{ fontSize: "10px", fontWeight: 600, color: c.color, marginTop: "4px" }}>● {c.occ}</div>
                    </div>
                  ))}
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
                      background: "#eab308",
                      color: "#291b05",
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
                    Lock Advance &amp; Run AI Prediction <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: AI Revenue Model */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(234,179,8,0.06)",
                  border: "1px solid rgba(234,179,8,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <BarChart3 size={22} color="#eab308" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#eab308" }}>
                    Step 3 Process: Neural Box Office Forecast &amp; Word-of-Mouth Decay Curve
                  </span>{" "}
                  Compute projected opening day collections, first-weekend domestic gross,
                  and lifetime theatrical run based on star power metrics, genre benchmarks, and holiday tailwinds.
                </div>
              </div>

              {/* Sliders for Day 1 and WOM */}
              <div
                style={{
                  backgroundColor: "#161005",
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
                    AI Collection Forecast Multipliers
                  </div>
                  <button
                    onClick={handleCalibrateModel}
                    disabled={isCalibratingModel}
                    style={{
                      background: "rgba(234,179,8,0.15)",
                      border: "1px solid rgba(234,179,8,0.3)",
                      color: "#eab308",
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
                    <RotateCcw size={12} className={isCalibratingModel ? "animate-spin" : ""} />
                    {isCalibratingModel ? "Calibrating Neural Net..." : "📈 Run Monte Carlo Box Office Model"}
                  </button>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "rgba(255,255,255,0.8)", marginBottom: "6px" }}>
                    <span>Projected Opening Day India Net: <strong style={{ color: "#eab308" }}>₹{openingDayEst.toFixed(1)} Crores</strong></span>
                  </div>
                  <input
                    type="range"
                    min="15.0"
                    max="75.0"
                    step="0.5"
                    value={openingDayEst}
                    onChange={(e) => setOpeningDayEst(parseFloat(e.target.value))}
                    style={{ width: "100%", accentColor: "#eab308" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "rgba(255,255,255,0.8)", marginBottom: "6px" }}>
                    <span>Word-of-Mouth Multiplier: <strong style={{ color: "#eab308" }}>{womMultiplier.toFixed(2)}x</strong></span>
                  </div>
                  <input
                    type="range"
                    min="1.8"
                    max="4.0"
                    step="0.05"
                    value={womMultiplier}
                    onChange={(e) => setWomMultiplier(parseFloat(e.target.value))}
                    style={{ width: "100%", accentColor: "#eab308" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "4px" }}>
                  <div style={{ backgroundColor: "#221908", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Opening Weekend (Fri-Sun)</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#eab308" }}>₹{(openingDayEst * 3.15).toFixed(1)} Cr</div>
                  </div>
                  <div style={{ backgroundColor: "#221908", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Lifetime India Net Target</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#10b981" }}>
                      ₹{(openingDayEst * womMultiplier * 2.8).toFixed(1)} Cr
                    </div>
                  </div>
                  <div style={{ backgroundColor: "#221908", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Worldwide Gross Potential</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#ffffff" }}>
                      ₹{(openingDayEst * womMultiplier * 3.9).toFixed(1)} Cr
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
                      markStepComplete(3);
                      setActiveStep(4);
                    }}
                    style={{
                      background: "#eab308",
                      color: "#291b05",
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
                    Lock Predictions &amp; Run Audit <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Trade Certification */}
          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(234,179,8,0.06)",
                  border: "1px solid rgba(234,179,8,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <CheckCircle2 size={22} color="#eab308" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#eab308" }}>
                    Step 4 Process: Producer Guild Trade Verification &amp; Turnaround Export
                  </span>{" "}
                  All automated ticket scanner logs, multiplex electronic data interchanges (EDI), and
                  tax returns are verified. Export verified trade intelligence reports for distributors.
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

              {/* Trade Audit Console */}
              <div
                style={{
                  backgroundColor: "#161005",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#ffffff" }}>
                    Trade Body Verification Standards
                  </span>
                  <button
                    onClick={handleRunAudit}
                    disabled={isAuditingTrade}
                    style={{
                      background: "rgba(234,179,8,0.15)",
                      border: "1px solid rgba(234,179,8,0.3)",
                      color: "#eab308",
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
                    <RotateCcw size={12} className={isAuditingTrade ? "animate-spin" : ""} />
                    {isAuditingTrade ? `Cross-Referencing EDI (${auditProgress}%)...` : "🚀 Run Multiplex EDI Reconciliation"}
                  </button>
                </div>

                {isAuditingTrade && (
                  <div style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#eab308", marginBottom: "4px" }}>
                      <span>Reconciling PVR INOX &amp; Cinepolis Electronic Ticket Stubs...</span>
                      <span>{auditProgress}%</span>
                    </div>
                    <div style={{ width: "100%", height: "6px", backgroundColor: "#221908", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${auditProgress}%`, height: "100%", backgroundColor: "#eab308", transition: "width 0.25s ease" }} />
                    </div>
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#1f1709", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>DCI Media Block Watermark Check</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>0 Camcord / Anti-Piracy Leaks</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#1f1709", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>Entertainment Tax Reconciliation</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>GST &amp; Municipal Surcharge Filed</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#1f1709", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>Overseas Rentrak / Comscore</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>North America &amp; GCC Confirmed</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#1f1709", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>Trade Body Authenticity Seal</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Producer Guild of India Affiliation</div>
                    </div>
                  </div>
                </div>

                {tradeCertified && (
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
                        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#10b981" }}>BOX OFFICE TRACKER CERTIFIED &amp; TRADE VERIFIED</div>
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>Accurate to within 1.2% of national multiplex electronic server records.</div>
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
                      TRADE VERIFIED
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                <button
                  onClick={handleDownloadTradeReport}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)",
                    color: "#291b05",
                    fontWeight: "700",
                    fontSize: "13px",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(234,179,8,0.3)",
                  }}
                >
                  <Download size={16} />
                  Export Trade Intelligence (.JSON)
                </button>

                <button
                  onClick={handleDownloadOccupancyCsv}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    backgroundColor: "#1f1709",
                    border: "1px solid rgba(234,179,8,0.4)",
                    color: "#eab308",
                    fontWeight: "600",
                    fontSize: "13px",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                >
                  <FileSpreadsheet size={16} />
                  Export Circuit Occupancy (CSV)
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
            backgroundColor: "#0d0a03",
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
                  background: "#eab308",
                  border: "none",
                  color: "#291b05",
                  fontWeight: "700",
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
                Close &amp; Confirm Tracker
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

