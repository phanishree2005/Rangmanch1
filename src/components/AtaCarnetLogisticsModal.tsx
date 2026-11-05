"use client";

import { useState } from "react";
import {
  X,
  Camera,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  ShieldCheck,
  Building,
  Layers,
} from "lucide-react";

interface AtaCarnetLogisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function AtaCarnetLogisticsModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - London & Abu Dhabi On-Location Shoot",
}: AtaCarnetLogisticsModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Equipment Manifest & Valuation
  const [cameraPackage, setCameraPackage] = useState("ARRI Alexa 35 (2x Bodies) + Cooke Anamorphic/i Full Frame Plus Set (6 Lenses)");
  const [totalGearValuationCrores, setTotalGearValuationCrores] = useState("₹4.85 Crores (Declared CIF Customs Value)");
  const [serialItemCount, setSerialItemCount] = useState(64);

  // Step 2: ATA Carnet Passport & Bond
  const [carnetNumber, setCarnetNumber] = useState("IN-FICCI-CARNET-2026-88019");
  const [issuingChamber, setIssuingChamber] = useState("FICCI Federation of Indian Chambers of Commerce & Industry");
  const [transitCountries, setTransitCountries] = useState("India ➔ United Kingdom (Heathrow) ➔ UAE (Abu Dhabi AUH) ➔ India");
  const [customsBondAmount, setCustomsBondAmount] = useState("₹1.94 Crores (40% Bank Guarantee / Insurance Surety Bond)");

  // Step 3: Dangerous Goods & Lithium Batteries
  const [batteryFlightClearance, setBatteryFlightClearance] = useState("Core SWX Hypercore 98Wh (32x Flight Approved Carry-On)");
  const [iataDangerousGoodsCert, setIataDangerousGoodsCert] = useState("UN3481 Section II Lithium-Ion Passenger Cabin Certified");
  const [pelicanCaseCount, setPelicanCaseCount] = useState(18);

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const downloadCarnetManifestCSV = () => {
    setIsExporting(true);
    const csvContent = `Case #,Item Description,Manufacturer,Model,Serial Number,Country of Origin,Declared Value (₹),Weight (kg),IATA Li-Ion Class,Customs Status
CASE-01,Cinema Camera Body A,ARRI,Alexa 35 4K Super 35,ALX35-88102,Germany,6500000,3.2,NON_DG,CARNET_BONDED
CASE-02,Cinema Camera Body B,ARRI,Alexa 35 4K Super 35,ALX35-88109,Germany,6500000,3.2,NON_DG,CARNET_BONDED
CASE-03,Prime Lens 32mm T2.3,Cooke,Anamorphic/i Full Frame,CK-ANA-32-10,United Kingdom,2800000,2.1,NON_DG,CARNET_BONDED
CASE-04,Prime Lens 50mm T2.3,Cooke,Anamorphic/i Full Frame,CK-ANA-50-14,United Kingdom,2800000,2.3,NON_DG,CARNET_BONDED
CASE-05,Prime Lens 85mm T2.3,Cooke,Anamorphic/i Full Frame,CK-ANA-85-09,United Kingdom,2900000,2.5,NON_DG,CARNET_BONDED
CASE-06,Wireless Video 4K Tx/Rx,Teradek,Bolt 4K MAX 12G-SDI,TB-4K-9901,USA,1200000,1.4,NON_DG,CARNET_BONDED
CASE-07,Gimbal Stabilizer,DJI,Ronin 2 3-Axis Heavy Lift,R2-CIN-4402,China,850000,6.5,NON_DG,CARNET_BONDED
CASE-08,Flight Battery Brick 8x,Core SWX,Hypercore NEO 98Wh,BATT-NEO-01_08,USA,320000,4.2,IATA_UN3481_PASS,CARNET_BONDED`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ATA_CARNET_CUSTOMS_MANIFEST_${defaultProject.replace(/\s+/g, "_")}.csv`);
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
              <Camera size={20} />
            </div>
            <div>
              <h2 className="font-cinema" style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                ATA Carnet &amp; International Gear Logistics Customs Clearance
              </h2>
              <p style={{ fontSize: "11px", color: "#8e8e9e", margin: "2px 0 0 0", fontFamily: "monospace" }}>
                Active Production: <span style={{ color: "#d4af61" }}>{defaultProject}</span> • FICCI Bonded Transit Guarantee
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
            { num: 1, title: "Equipment", icon: Camera },
            { num: 2, title: "Carnet Bond", icon: ShieldCheck },
            { num: 3, title: "IATA Air Cargo", icon: Layers },
            { num: 4, title: "Manifest", icon: Download },
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
                  Catalog high-value cinema camera bodies, anamorphic lenses, and wireless monitors with verified serial numbers for duty-free temporary export.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Primary Camera &amp; Optical Package
                </label>
                <input
                  type="text"
                  value={cameraPackage}
                  onChange={(e) => setCameraPackage(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Total Declared CIF Value
                  </label>
                  <input
                    type="text"
                    value={totalGearValuationCrores}
                    onChange={(e) => setTotalGearValuationCrores(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Itemized Serial Count
                  </label>
                  <input
                    type="number"
                    value={serialItemCount}
                    onChange={(e) => setSerialItemCount(Number(e.target.value))}
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
                  FICCI Carnet issuance allows duty-free entry into 87 member nations without paying local import VAT or cash deposit bonds at airport customs.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  FICCI ATA Carnet Document #
                </label>
                <input
                  type="text"
                  value={carnetNumber}
                  onChange={(e) => setCarnetNumber(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Multi-Destination Transit Itinerary
                </label>
                <input
                  type="text"
                  value={transitCountries}
                  onChange={(e) => setTransitCountries(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Bank Guarantee / Customs Surety Bond
                </label>
                <input
                  type="text"
                  value={customsBondAmount}
                  onChange={(e) => setCustomsBondAmount(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                <p style={{ fontSize: "12px", color: "#fde68a", margin: 0, lineHeight: 1.5 }}>
                  Airline dangerous goods compliance for high-draw camera batteries. All packs under 100Wh cleared for carry-on passenger cabin transport.
                </p>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Lithium-Ion Battery Fleet Specification
                </label>
                <input
                  type="text"
                  value={batteryFlightClearance}
                  onChange={(e) => setBatteryFlightClearance(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    IATA Cargo Classification
                  </label>
                  <input
                    type="text"
                    value={iataDangerousGoodsCert}
                    onChange={(e) => setIataDangerousGoodsCert(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", backgroundColor: "#0b0b12", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#9a9aa8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Total Pelican Flight Cases
                  </label>
                  <input
                    type="number"
                    value={pelicanCaseCount}
                    onChange={(e) => setPelicanCaseCount(Number(e.target.value))}
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
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#34d399" }}>Customs Manifest &amp; Carnet Bonded</span>
                </div>
                <p style={{ fontSize: "12px", color: "#a7f3d0", margin: 0, lineHeight: 1.5 }}>
                  64 items across 18 flight cases certified with customs barcodes and valid across UK, UAE, and Indian entry/exit border terminals.
                </p>
              </div>

              <div style={{ padding: "18px", borderRadius: "14px", backgroundColor: "#08080c", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Carnet ID:</span>
                  <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>{carnetNumber}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>Total Declared CIF:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>₹4.85 Cr DUTY-FREE PASS</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#8e8e9e" }}>IATA Battery Cap:</span>
                  <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600 }}>PASSENGER CABIN CLEARED</span>
                </div>
              </div>

              <button
                onClick={downloadCarnetManifestCSV}
                className="btn-cinema-gold"
                style={{ width: "100%", height: "46px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <Download size={16} />
                <span>DOWNLOAD ATA CARNET SERIAL NUMBER MANIFEST (.CSV)</span>
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

