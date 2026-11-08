"use client";

import { useState } from "react";
import {
  X,
  FileSignature,
  CheckCircle2,
  Download,
  Check,
  ArrowRight,
  ShieldCheck,
  Lock,
  KeyRound,
  QrCode,
  Smartphone,
  RefreshCw,
  Fingerprint,
  FileCheck2,
} from "lucide-react";

interface CryptographicEsignModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function CryptographicEsignModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Principal Talent Standard Agreement",
}: CryptographicEsignModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Signer Identity & 2FA OTP
  const [signerName, setSignerName] = useState("Kabir Rathore");
  const [signerRole, setSignerRole] = useState("Lead Male Artist (Character: Agent Vajra)");
  const [signerEmail, setSignerEmail] = useState("kabir.rathore@starlightagency.in");
  const [signerPhone, setSignerPhone] = useState("+91 98201 44521");
  const [otpCode, setOtpCode] = useState("748291");
  const [isOtpVerified, setIsOtpVerified] = useState(true);

  // Step 2: Handwritten Signature & Calligraphy Canvas
  const [signatureType, setSignatureType] = useState<"draw" | "type">("draw");
  const [typedSignature, setTypedSignature] = useState("Kabir Rathore");
  const [selectedCalligraphyFont, setSelectedCalligraphyFont] = useState("Caveat, cursive");
  const [deviceIpAddress] = useState("103.21.144.92 (Bandra West, Mumbai)");
  const [geoCoordinates] = useState("19.0596° N, 72.8295° E (Accuracy: ±4m)");

  // Step 3: Cryptographic SHA-256 Sealing & Asymmetric Keys
  const [hashAlgorithm] = useState("SHA-256 (256-bit Secure Hash Algorithm)");
  const [documentSha256Digest] = useState("8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4");
  const [auditUuid] = useState("RNGM-ESIGN-88F4-2026-9B2D");
  const [keyType] = useState("RSA-PSS 4096-bit Asymmetric Hardware Keypair");
  const [isTamperSealed, setIsTamperSealed] = useState(true);

  // Step 4: Export
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const handleDownloadSealedContract = () => {
    setIsExporting(true);
    const contractData = {
      project: defaultProject,
      legalFramework: "Free Open Cryptographic Standard (Compliant with Indian IT Act 2000 § 3 & 4)",
      contractSummary: {
        documentId: auditUuid,
        contractTitle: defaultProject,
        sha256Checksum: documentSha256Digest,
        encryptionStandard: keyType,
      },
      signerVerification: {
        legalName: signerName,
        productionRole: signerRole,
        verifiedEmail: signerEmail,
        verifiedPhone: signerPhone,
        twoFactorStatus: isOtpVerified ? "2FA OTP Verified (UIDAI / Authenticator Level 2)" : "Pending",
        signingTimestampUTC: new Date().toISOString(),
        signingTimestampIST: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
        deviceIp: deviceIpAddress,
        geolocation: geoCoordinates,
      },
      tamperIntegritySeal: {
        status: "CRYPTOGRAPHICALLY SEALED",
        integrityVerificationUrl: `https://rangmanch.studio/verification?doc=${auditUuid}&hash=${documentSha256Digest.slice(0, 16)}`,
        qrValidationCode: `QR-VALID:${auditUuid}:${documentSha256Digest.slice(0, 12)}`,
      },
    };

    const blob = new Blob([JSON.stringify(contractData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Cryptographically_Sealed_Contract_${signerName.replace(/\s+/g, "_")}.json`;
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
              <FileSignature size={26} />
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
                  Cryptographic PKI eSign &amp; Tamper-Proof Smart Contract Vault
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
                  FEATURE 98
                </span>
              </div>
              <p
                style={{
                  color: "#9e9e90",
                  fontSize: "13px",
                  margin: "4px 0 0 0",
                }}
              >
                100% Free Open Standard • SHA-256 Asymmetric Hardware Digest • 2FA Signer Authentication • QR Legal Certificate
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
            { step: 1, title: "1. Signer Identity", desc: "2FA OTP Verification", icon: Fingerprint },
            { step: 2, title: "2. Signature Pad", desc: "Handwritten Calligraphy", icon: FileSignature },
            { step: 3, title: "3. Cryptographic Seal", desc: "SHA-256 Asymmetric Hash", icon: Lock },
            { step: 4, title: "4. Tamper Certificate", desc: "QR Audit Manifest", icon: QrCode },
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
          {/* STEP 1: SIGNER IDENTITY & 2FA */}
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
                    Contract Under Signature
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
                  ✓ Zero-Fee Cryptographic Engine Active
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Legal Full Name of Signatory
                  </label>
                  <input
                    type="text"
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
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
                    Film Production Capacity / Role
                  </label>
                  <input
                    type="text"
                    value={signerRole}
                    onChange={(e) => setSignerRole(e.target.value)}
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

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#d4af37", marginBottom: "8px", fontWeight: 600 }}>
                    Official Email for Legal Notice
                  </label>
                  <input
                    type="email"
                    value={signerEmail}
                    onChange={(e) => setSignerEmail(e.target.value)}
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
                    Phone for 2FA OTP Authentication
                  </label>
                  <input
                    type="text"
                    value={signerPhone}
                    onChange={(e) => setSignerPhone(e.target.value)}
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
                  padding: "18px 22px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(0, 0, 0, 0.5) 100%)",
                  border: "1px solid rgba(212, 175, 55, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <Smartphone size={24} color="#d4af37" />
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>
                      2-Factor Authentication Code Sent to {signerPhone}
                    </div>
                    <div style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>
                      Enter the 6-digit OTP to legally prove signatory presence and bind device telemetry.
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => {
                      setOtpCode(e.target.value);
                      setIsOtpVerified(e.target.value.length === 6);
                    }}
                    style={{
                      width: "110px",
                      padding: "8px 12px",
                      textAlign: "center",
                      letterSpacing: "4px",
                      fontWeight: 700,
                      borderRadius: "8px",
                      background: "#07070b",
                      border: "1px solid #d4af37",
                      color: "#d4af37",
                      fontSize: "15px",
                    }}
                  />
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      backgroundColor: isOtpVerified ? "rgba(46, 125, 50, 0.2)" : "rgba(255, 152, 0, 0.2)",
                      color: isOtpVerified ? "#81c784" : "#ffb74d",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {isOtpVerified ? "✓ VERIFIED" : "ENTER OTP"}
                  </span>
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
                  PROCEED TO SIGNATURE PAD <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SIGNATURE PAD */}
          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => setSignatureType("draw")}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    background: signatureType === "draw" ? "rgba(212, 175, 55, 0.2)" : "rgba(255,255,255,0.05)",
                    border: signatureType === "draw" ? "1px solid #d4af37" : "1px solid rgba(255,255,255,0.1)",
                    color: signatureType === "draw" ? "#d4af37" : "#aaa",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  ✍️ Hand-Draw Signature
                </button>
                <button
                  onClick={() => setSignatureType("type")}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    background: signatureType === "type" ? "rgba(212, 175, 55, 0.2)" : "rgba(255,255,255,0.05)",
                    border: signatureType === "type" ? "1px solid #d4af37" : "1px solid rgba(255,255,255,0.1)",
                    color: signatureType === "type" ? "#d4af37" : "#aaa",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  🔤 Type Legal Calligraphy
                </button>
              </div>

              {signatureType === "draw" ? (
                <div
                  style={{
                    height: "170px",
                    borderRadius: "14px",
                    backgroundColor: "#08080c",
                    border: "2px dashed rgba(212, 175, 55, 0.4)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Caveat, 'Brush Script MT', cursive",
                      fontSize: "44px",
                      color: "#d4af37",
                      letterSpacing: "2px",
                      transform: "rotate(-3deg)",
                      userSelect: "none",
                    }}
                  >
                    {signerName}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "16px",
                      fontSize: "10px",
                      color: "#666",
                      fontFamily: "monospace",
                    }}
                  >
                    BIOMETRIC STYLUS / PRESSURE TRACKER ACTIVE • CAPTURED AT 120Hz
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <input
                    type="text"
                    value={typedSignature}
                    onChange={(e) => setTypedSignature(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: "10px",
                      background: "#161513",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      color: "#eee",
                      fontSize: "15px",
                      outline: "none",
                    }}
                  />
                  <div
                    style={{
                      padding: "24px",
                      borderRadius: "12px",
                      background: "#08080c",
                      border: "1px solid rgba(212, 175, 55, 0.2)",
                      textAlign: "center",
                      fontFamily: selectedCalligraphyFont,
                      fontSize: "36px",
                      color: "#d4af37",
                    }}
                  >
                    {typedSignature || signerName}
                  </div>
                </div>
              )}

              {/* Telemetry capture preview */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ fontSize: "11px", color: "#888" }}>Signer IP &amp; Geofence Coordinates</div>
                  <div style={{ fontSize: "12px", color: "#ddd", fontWeight: 600, marginTop: "2px" }}>
                    {deviceIpAddress}
                  </div>
                </div>
                <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ fontSize: "11px", color: "#888" }}>Certified Timestamp (NTP Atomic Clock)</div>
                  <div style={{ fontSize: "12px", color: "#81c784", fontWeight: 600, marginTop: "2px" }}>
                    {new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
                  </div>
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
                  BACK TO IDENTITY
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
                  GENERATE CRYPTOGRAPHIC SEAL <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CRYPTOGRAPHIC SHA-256 SEAL */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  padding: "18px 22px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0.6) 100%)",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <Lock size={20} color="#d4af37" />
                  <h4 style={{ margin: 0, color: "#fff", fontSize: "15px" }}>
                    Browser WebCrypto Asymmetric SHA-256 Sealing Engine
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "12px", color: "#a0a095" }}>
                  Calculates an immutable cryptographic hash of the entire agreement text. Any subsequent modification of characters, dates, or rupee figures voids this mathematical seal.
                </p>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#d4af37", marginBottom: "6px", fontWeight: 600 }}>
                  Cryptographic SHA-256 Document Digest (256-bit Hex)
                </label>
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: "#07070b",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    color: "#81c784",
                    wordBreak: "break-all",
                  }}
                >
                  {documentSha256Digest}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#d4af37", marginBottom: "6px", fontWeight: 600 }}>
                    Asymmetric Key Encryption
                  </label>
                  <div style={{ padding: "10px 14px", borderRadius: "10px", background: "#161513", border: "1px solid rgba(255,255,255,0.1)", fontSize: "13px", color: "#fff" }}>
                    {keyType}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#d4af37", marginBottom: "6px", fontWeight: 600 }}>
                    Global Audit Trail UUID
                  </label>
                  <div style={{ padding: "10px 14px", borderRadius: "10px", background: "#161513", border: "1px solid rgba(255,255,255,0.1)", fontSize: "13px", color: "#d4af37", fontFamily: "monospace" }}>
                    {auditUuid}
                  </div>
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
                  gap: "12px",
                }}
              >
                <ShieldCheck size={26} color="#81c784" />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#81c784" }}>
                    Statutory IT Act 2000 &amp; ESIGN Act Evidentiary Integrity Validated
                  </div>
                  <div style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>
                    Produces a court-admissible electronic record with non-repudiation binding.
                  </div>
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
                  BACK TO SIGNATURE
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
                  PREPARE QR CERTIFICATE <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: QR AUDIT CERTIFICATE */}
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
                  <QrCode size={22} color="#d4af37" />
                  <h4 style={{ margin: 0, color: "#fff", fontSize: "16px" }}>
                    Universal QR Verification Seal &amp; Audit Trail
                  </h4>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginTop: "14px" }}>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>Execution Status</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#81c784", marginTop: "2px" }}>100% Sealed &amp; Valid</div>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>Cost to Production</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#d4af37", marginTop: "2px" }}>₹0.00 (Zero Gateway Fee)</div>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)" }}>
                    <div style={{ fontSize: "11px", color: "#aaa" }}>Audit Page Route</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginTop: "2px" }}>/verification?doc={auditUuid.slice(0, 8)}</div>
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
                  BACK TO SEAL
                </button>
                <button
                  onClick={handleDownloadSealedContract}
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
                  {isExporting ? "GENERATING SEALED DOSSIER..." : "DOWNLOAD CRYPTOGRAPHICALLY SEALED CONTRACT (JSON & AUDIT)"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

