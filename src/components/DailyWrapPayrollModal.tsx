"use client";

import { useState } from "react";
import {
  X,
  CreditCard,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Receipt,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";

interface DailyWrapPayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function DailyWrapPayrollModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Day 14 Principal Wrap",
}: DailyWrapPayrollModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Attendance & Overtime
  const [totalArtists, setTotalArtists] = useState(140);
  const [callTime, setCallTime] = useState("06:00 AM");
  const [wrapTime, setWrapTime] = useState("09:30 PM");
  const [otHours, setOtHours] = useState(3.5);
  const [nightPenalty, setNightPenalty] = useState(true);

  // Step 2: CINTAA Rates & Calculation
  const [baseRateGradeB, setBaseRateGradeB] = useState(2500); // 100 artists
  const [baseRateGradeA, setBaseRateGradeA] = useState(4500); // 20 artists
  const [baseRateDancers, setBaseRateDancers] = useState(6000); // 20 artists
  const [mealAllowanceRate, setMealAllowanceRate] = useState(500);
  const [conveyanceRate, setConveyanceRate] = useState(350);

  // Computed Totals
  const baseWages = 100 * baseRateGradeB + 20 * baseRateGradeA + 20 * baseRateDancers; // ₹4,60,000
  const hourlyRateAvg = baseWages / 140 / 12; // average hourly
  const overtimeTotal = Math.round(140 * otHours * (hourlyRateAvg * 1.5)); // ~₹1,47,000
  const allowancesTotal = 140 * (mealAllowanceRate + conveyanceRate); // ₹1,19,000
  const grandTotal = baseWages + overtimeTotal + allowancesTotal;

  // Step 3: Batch UPI Settlement
  const [isDisbursing, setIsDisbursing] = useState(false);
  const [disbursementDone, setDisbursementDone] = useState(true);
  const [txCount, setTxCount] = useState(140);

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const executeBatchDisbursement = () => {
    setIsDisbursing(true);
    setTimeout(() => {
      setIsDisbursing(false);
      setDisbursementDone(true);
      setTxCount(140);
    }, 1400);
  };

  const downloadSettlementCSV = () => {
    setIsExporting(true);
    const csvContent = `Transaction ID,Artist Name,UPI ID,Guild Reg No,Role,Base Wage,OT Hours,OT Pay,Meal & Conveyance,Total Paid,Bank Reference,Status
TXN-UP-8901,Ramanuj Verma,ramanuj@okaxis,CINTAA-JA-4820,Featured Extra,₹4500,3.5,₹1968,₹850,₹7318,HDFC-UPI-99481234,SUCCESS
TXN-UP-8902,Kavita Sonawane,kavita@okhdfcbank,CINTAA-JA-4821,Dancer,₹6000,3.5,₹2625,₹850,₹9475,HDFC-UPI-99481235,SUCCESS
TXN-UP-8903,Gurpreet Singh,gurpreet@paytm,CINTAA-JA-4822,Royal Guard Extra,₹2500,3.5,₹1093,₹850,₹4443,HDFC-UPI-99481236,SUCCESS
TXN-UP-8904,Arun Kulkarni,arun@icici,CINTAA-JA-4823,Atmosphere Extra,₹2500,3.5,₹1093,₹850,₹4443,HDFC-UPI-99481237,SUCCESS
TXN-UP-8905,Fatima Sheikh,fatima@ybl,CINTAA-JA-4824,Atmosphere Extra,₹2500,3.5,₹1093,₹850,₹4443,HDFC-UPI-99481238,SUCCESS
TXN-UP-8906,Vikram Rathore,vikram@sbi,CINTAA-JA-4825,Featured Extra,₹4500,3.5,₹1968,₹850,₹7318,HDFC-UPI-99481239,SUCCESS
TXN-UP-8907,Meenakshi Sundaram,meenakshi@okaxis,CINTAA-JA-4826,Atmosphere Extra,₹2500,3.5,₹1093,₹850,₹4443,HDFC-UPI-99481240,SUCCESS
TXN-UP-8908,Devendra Rawat,rawat@paytm,CINTAA-JA-4827,Dancer,₹6000,3.5,₹2625,₹850,₹9475,HDFC-UPI-99481241,SUCCESS
TXN-UP-8909,Sneha Deshmukh,sneha@icici,CINTAA-JA-4828,Atmosphere Extra,₹2500,3.5,₹1093,₹850,₹4443,HDFC-UPI-99481242,SUCCESS
TXN-UP-8910,Mohanlal Patel,mohanlal@okhdfcbank,CINTAA-JA-4829,Atmosphere Extra,₹2500,3.5,₹1093,₹850,₹4443,HDFC-UPI-99481243,SUCCESS`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `WRAP_PAYROLL_LEDGER_${defaultProject.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsExporting(false), 800);
  };

  const steps = [
    { num: 1, title: "Shift & Overtime Audit", sub: "Call vs Wrap Times" },
    { num: 2, title: "CINTAA Rate Matrix", sub: "Guild Scale & Allowances" },
    { num: 3, title: "Batch UPI Settlement", sub: "Live Escrow Disbursement" },
    { num: 4, title: "Tax Ledger & Export", sub: "Compliance Sheet & CSV" },
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
          backgroundColor: "#0d0a06",
          border: "1px solid rgba(245,158,11,0.35)",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 60px -15px rgba(0,0,0,0.9), 0 0 40px rgba(245,158,11,0.15)",
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
            background: "linear-gradient(180deg, rgba(245,158,11,0.08) 0%, rgba(0,0,0,0) 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "rgba(245,158,11,0.15)",
                border: "1px solid rgba(245,158,11,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fbbf24",
              }}
            >
              <CreditCard size={24} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2
                  className="font-cinema"
                  style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", margin: 0 }}
                >
                  Daily Wrap Payroll &amp; Instant Settlement
                </h2>
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "monospace",
                    padding: "2px 8px",
                    borderRadius: "999px",
                    backgroundColor: "rgba(245,158,11,0.2)",
                    color: "#fef08a",
                    border: "1px solid rgba(245,158,11,0.4)",
                  }}
                >
                  ESCROW VAULT ACTIVE
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: "3px 0 0 0" }}>
                Project: <strong style={{ color: "#d4af61" }}>{defaultProject}</strong> • CINTAA Minimum Wage Compliance &amp; 1-Click Batch UPI Wraparound
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
            backgroundColor: "#080603",
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
                    ? "rgba(245,158,11,0.1)"
                    : "transparent",
                  border: "none",
                  borderBottom: isCurrent ? "2px solid #f59e0b" : "2px solid transparent",
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
                      ? "#f59e0b"
                      : isCurrent
                      ? "rgba(245,158,11,0.3)"
                      : "rgba(255,255,255,0.1)",
                    color: isDone ? "#000000" : isCurrent ? "#fde68a" : "#9ca3af",
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
          {/* STEP 1: SHIFT & OVERTIME AUDIT */}
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Shift Parameters */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fbbf24", margin: "0 0 14px 0" }}>
                    Shift Duration &amp; Overtime Telemetry
                  </h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>
                        Call Time (Check-In)
                      </label>
                      <input
                        type="text"
                        value={callTime}
                        onChange={(e) => setCallTime(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          backgroundColor: "#140f07",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "12px",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "6px" }}>
                        Wrap Time (Director Called Wrap)
                      </label>
                      <input
                        type="text"
                        value={wrapTime}
                        onChange={(e) => setWrapTime(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          backgroundColor: "#140f07",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "12px",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <label style={{ fontSize: "11px", color: "#9ca3af" }}>
                        Overtime Hours Beyond 12h Standard Shift
                      </label>
                      <span style={{ fontSize: "12px", color: "#f59e0b", fontWeight: 700 }}>
                        {otHours} Hours OT (1.5x Multiplier)
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={6}
                      step={0.5}
                      value={otHours}
                      onChange={(e) => setOtHours(Number(e.target.value))}
                      style={{ width: "100%", accentColor: "#f59e0b" }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#6b7280", marginTop: "4px" }}>
                      <span>0h (Standard 12h)</span>
                      <span>3h (Late Evening)</span>
                      <span>6h (Midnight Action)</span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px",
                      backgroundColor: "rgba(245,158,11,0.06)",
                      border: "1px solid rgba(245,158,11,0.2)",
                      borderRadius: "8px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Clock size={16} color="#f59e0b" />
                      <span style={{ fontSize: "11px", color: "#e5e7eb" }}>
                        Midnight Wrap Penalty Tier (Post 09:00 PM Snack + Cab Surcharge)
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={nightPenalty}
                      onChange={(e) => setNightPenalty(e.target.checked)}
                      style={{ accentColor: "#f59e0b" }}
                    />
                  </div>
                </div>

                {/* Artist Roster Distribution */}
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
                      On-Set Headcount Breakdown
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#140f07", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Grade B (Atmosphere Extras)</span>
                        <span style={{ color: "#ffffff", fontWeight: 700 }}>100 Performers</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#140f07", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Grade A (Featured / Bit Roles)</span>
                        <span style={{ color: "#38bdf8", fontWeight: 700 }}>20 Performers</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#140f07", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Guild Registered Dancers</span>
                        <span style={{ color: "#ec4899", fontWeight: 700 }}>20 Performers</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#140f07", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Total Artists on Set</span>
                        <span style={{ color: "#10b981", fontWeight: 800 }}>140 Verified Present</span>
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
                      TOTAL SHIFT DURATION
                    </div>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: "#ffffff" }}>
                      15.5 Hours <span style={{ fontSize: "11px", color: "#f59e0b", fontWeight: 600 }}>({otHours}h Overtime Eligible)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CINTAA RATE MATRIX */}
          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Rate Structure */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fbbf24", margin: "0 0 14px 0" }}>
                    CINTAA Approved Minimum Wage Rates (Per 12h Shift)
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#140f07", borderRadius: "8px" }}>
                      <div>
                        <div style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>Grade B (Atmosphere Extra)</div>
                        <div style={{ fontSize: "10px", color: "#6b7280" }}>Standard crowd &amp; background work</div>
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 800, color: "#fbbf24" }}>₹{baseRateGradeB.toLocaleString()}</div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#140f07", borderRadius: "8px" }}>
                      <div>
                        <div style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>Grade A (Featured / Dialogue Bit)</div>
                        <div style={{ fontSize: "10px", color: "#6b7280" }}>Custom wardrobe fitting &amp; speaking cues</div>
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 800, color: "#38bdf8" }}>₹{baseRateGradeA.toLocaleString()}</div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#140f07", borderRadius: "8px" }}>
                      <div>
                        <div style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>Guild Registered Dancers</div>
                        <div style={{ fontSize: "10px", color: "#6b7280" }}>Choreography rehearsal + shoot day</div>
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 800, color: "#ec4899" }}>₹{baseRateDancers.toLocaleString()}</div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#140f07", borderRadius: "8px" }}>
                      <div>
                        <div style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>Mandatory Allowances</div>
                        <div style={{ fontSize: "10px", color: "#6b7280" }}>Food (₹500) + Night Travel Tier (₹350)</div>
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 800, color: "#10b981" }}>₹850 / head</div>
                    </div>
                  </div>
                </div>

                {/* Live Waterfall Tally */}
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
                      Calculated Payout Waterfall
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#140f07", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Base Day Scale (140 Pax)</span>
                        <span style={{ color: "#ffffff", fontWeight: 700 }}>₹{baseWages.toLocaleString("en-IN")}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#140f07", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Overtime Pay (3.5h @ 1.5x)</span>
                        <span style={{ color: "#f59e0b", fontWeight: 700 }}>₹{overtimeTotal.toLocaleString("en-IN")}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#140f07", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Food &amp; Conveyance</span>
                        <span style={{ color: "#10b981", fontWeight: 700 }}>₹{allowancesTotal.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "14px",
                      backgroundColor: "rgba(245,158,11,0.12)",
                      border: "1px solid rgba(245,158,11,0.35)",
                      borderRadius: "10px",
                      marginTop: "16px",
                    }}
                  >
                    <div style={{ fontSize: "11px", color: "#fef08a", fontWeight: 700, marginBottom: "4px" }}>
                      TOTAL WRAP PAYOUT TO BE DISBURSED
                    </div>
                    <div style={{ fontSize: "22px", fontWeight: 900, color: "#ffffff" }}>
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: BATCH UPI SETTLEMENT */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Disbursement Trigger */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fbbf24", margin: "0 0 14px 0" }}>
                    Direct-to-Bank UPI Batch Engine
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
                    <div style={{ padding: "12px", backgroundColor: "#140f07", borderRadius: "8px", fontSize: "11px" }}>
                      <div style={{ color: "#9ca3af", marginBottom: "4px" }}>Connected Production Escrow Account</div>
                      <div style={{ color: "#ffffff", fontWeight: 700 }}>HDFC Cinema Escrow • A/C #994820194821</div>
                      <div style={{ color: "#10b981", marginTop: "2px" }}>Available Liquidity: ₹42,50,000.00</div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <div style={{ padding: "10px", backgroundColor: "#140f07", borderRadius: "8px", textAlign: "center" }}>
                        <div style={{ fontSize: "10px", color: "#9ca3af" }}>Batch Recipients</div>
                        <div style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff" }}>140 Artists</div>
                      </div>
                      <div style={{ padding: "10px", backgroundColor: "#140f07", borderRadius: "8px", textAlign: "center" }}>
                        <div style={{ fontSize: "10px", color: "#6ee7b7" }}>Success Rate</div>
                        <div style={{ fontSize: "16px", fontWeight: 800, color: "#10b981" }}>100.0%</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={executeBatchDisbursement}
                    disabled={isDisbursing}
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
                    {isDisbursing ? (
                      <>Executing Instant UPI Protocol...</>
                    ) : (
                      <>
                        <CreditCard size={16} />
                        Execute Instant 1-Click Batch UPI Settlement (₹{grandTotal.toLocaleString("en-IN")})
                      </>
                    )}
                  </button>
                </div>

                {/* Real-Time Transaction Stream */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#10b981", margin: 0 }}>
                      Live UPI Banking Telemetry
                    </h3>
                    <span style={{ fontSize: "9px", fontFamily: "monospace", color: "#6ee7b7", backgroundColor: "rgba(16,185,129,0.15)", padding: "2px 6px", borderRadius: "4px" }}>
                      ALL SETTLED
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      maxHeight: "220px",
                      overflowY: "auto",
                      fontFamily: "monospace",
                      fontSize: "10px",
                    }}
                  >
                    {[
                      { name: "Ramanuj Verma", upi: "ramanuj@okaxis", amt: "₹7,318", hash: "HDFC99481234" },
                      { name: "Kavita Sonawane", upi: "kavita@okhdfcbank", amt: "₹9,475", hash: "HDFC99481235" },
                      { name: "Gurpreet Singh", upi: "gurpreet@paytm", amt: "₹4,443", hash: "HDFC99481236" },
                      { name: "Arun Kulkarni", upi: "arun@icici", amt: "₹4,443", hash: "HDFC99481237" },
                      { name: "Fatima Sheikh", upi: "fatima@ybl", amt: "₹4,443", hash: "HDFC99481238" },
                      { name: "Vikram Rathore", upi: "vikram@sbi", amt: "₹7,318", hash: "HDFC99481239" },
                    ].map((tx) => (
                      <div
                        key={tx.hash}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "6px 8px",
                          backgroundColor: "#140f07",
                          borderRadius: "6px",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <div>
                          <div style={{ color: "#ffffff", fontWeight: 600 }}>{tx.name}</div>
                          <div style={{ color: "#6b7280", fontSize: "9px" }}>{tx.upi}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ color: "#10b981", fontWeight: 700 }}>{tx.amt}</div>
                          <div style={{ color: "#d4af61", fontSize: "8px" }}>{tx.hash}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px", color: "#10b981", fontSize: "11px" }}>
                    <ShieldCheck size={14} />
                    Zero cash handling risk • Instant SMS payment confirmation delivered to each artist.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: TAX LEDGER & EXPORT */}
          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  gap: "20px",
                }}
              >
                {/* Guild Compliance Voucher */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "18px",
                  }}
                >
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fbbf24", margin: "0 0 14px 0" }}>
                    CINTAA Official Settlement Certificate
                  </h3>

                  <div
                    style={{
                      background: "linear-gradient(135deg, #181206 0%, #0d0a06 100%)",
                      border: "1px solid rgba(245,158,11,0.35)",
                      borderRadius: "12px",
                      padding: "18px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ fontSize: "10px", color: "#d4af61", fontFamily: "monospace", letterSpacing: "0.15em", fontWeight: 700 }}>
                        OFFICIAL WRAP DISBURSEMENT RECEIPT
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
                        SETTLED 100%
                      </span>
                    </div>

                    <div style={{ fontSize: "17px", fontWeight: 800, color: "#ffffff", marginBottom: "4px" }}>
                      {defaultProject}
                    </div>
                    <div style={{ fontSize: "11px", color: "#fbbf24", fontWeight: 600, marginBottom: "12px" }}>
                      Total Settled: ₹{grandTotal.toLocaleString("en-IN")} • 140 Junior Artists Paid
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "10px", color: "#9ca3af" }}>
                      <div>Overtime Cleared: <strong style={{ color: "#ffffff" }}>3.5 Hours (1.5x)</strong></div>
                      <div>Union Guild Audit: <strong style={{ color: "#10b981" }}>CINTAA Certified</strong></div>
                      <div>TDS 194C Ledger: <strong style={{ color: "#ffffff" }}>Auto Form-16 Ready</strong></div>
                      <div>Production Controller: <strong style={{ color: "#6ee7b7" }}>Sunil Kadam Approved</strong></div>
                    </div>
                  </div>

                  <div style={{ marginTop: "14px" }}>
                    <button
                      onClick={downloadSettlementCSV}
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
                      {isExporting ? "Exporting Bank Ledger..." : "Download Full Payroll Ledger (CSV)"}
                    </button>
                  </div>
                </div>

                {/* Statutory Audit Summary */}
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
                      Statutory Tax &amp; Union Audit Archive
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#140f07", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Form 16 / TDS Summary</span>
                        <span style={{ color: "#10b981", fontWeight: 600 }}>TDS Deducted &amp; Deposited</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#140f07", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>Cashless Compliance</span>
                        <span style={{ color: "#38bdf8", fontWeight: 600 }}>100% Digital Banking Trail</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", backgroundColor: "#140f07", borderRadius: "6px", fontSize: "11px" }}>
                        <span style={{ color: "#9ca3af" }}>CINTAA Dispute Lockout</span>
                        <span style={{ color: "#e5e7eb", fontWeight: 600 }}>Zero Grievances Registered</span>
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
                      Daily wrap ledger signed off and synced with studio central accounts.
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
            backgroundColor: "#080603",
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
                Finalize Wrap Payroll &amp; Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
