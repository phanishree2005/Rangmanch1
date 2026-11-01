"use client";

import { useState } from "react";
import {
  X,
  Film,
  HardDrive,
  Key,
  ShieldCheck,
  CheckCircle2,
  Download,
  RotateCcw,
  Volume2,
  Tv,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface DcpPackagingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function DcpPackagingModal({
  isOpen,
  onClose,
  defaultProject = "Antim Prahar - Theatrical Release Cut",
}: DcpPackagingModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Step 1: Video Conform
  const [dciContainer, setDciContainer] = useState("DCI Scope 2.39:1 (2048 x 858)");
  const [j2kBitrate, setJ2kBitrate] = useState("250 Mbps (DCI Maximum)");
  const [isVerifyingVideo, setIsVerifyingVideo] = useState(false);
  const [videoVerified, setVideoVerified] = useState(true);

  // Step 2: Audio Matrix
  const [audioFormat, setAudioFormat] = useState("Dolby Atmos Spatial (9.1 Bed + 128 Objects)");
  const [loudnessStandard, setLoudnessStandard] = useState("SMPTE 2095 (-24.0 LUFS Target)");
  const [isCalibratingAudio, setIsCalibratingAudio] = useState(false);
  const [audioCalibrated, setAudioCalibrated] = useState(true);

  // Step 3: KDM Encryption
  const [theatreCircuit, setTheatreCircuit] = useState("PVR INOX All India (1,700 Screens)");
  const [serverModel, setServerModel] = useState("Dolby Doremi IMS3000 / Christie IMB-S2");
  const [isGeneratingKdm, setIsGeneratingKdm] = useState(false);
  const [kdmGenerated, setKdmGenerated] = useState(true);

  // Step 4: Verification & Turnaround
  const [isValidating, setIsValidating] = useState(false);
  const [validationProgress, setValidationProgress] = useState(100);
  const [dcpSealed, setDcpSealed] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const markStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
  };

  const handleVerifyVideo = () => {
    setIsVerifyingVideo(true);
    setVideoVerified(false);
    setTimeout(() => {
      setIsVerifyingVideo(false);
      setVideoVerified(true);
      markStepComplete(1);
    }, 1200);
  };

  const handleCalibrateAudio = () => {
    setIsCalibratingAudio(true);
    setAudioCalibrated(false);
    setTimeout(() => {
      setIsCalibratingAudio(false);
      setAudioCalibrated(true);
      markStepComplete(2);
    }, 1300);
  };

  const handleGenerateKdm = () => {
    setIsGeneratingKdm(true);
    setKdmGenerated(false);
    setTimeout(() => {
      setIsGeneratingKdm(false);
      setKdmGenerated(true);
      markStepComplete(3);
    }, 1400);
  };

  const handleRunValidation = () => {
    setIsValidating(true);
    setValidationProgress(0);
    setDcpSealed(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setValidationProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsValidating(false);
        setDcpSealed(true);
        markStepComplete(4);
      }
    }, 300);
  };

  const handleDownloadCpl = () => {
    const cplXml = `<?xml version="1.0" encoding="UTF-8"?>
<CompositionPlaylist xmlns="http://www.smpte-ra.org/schemas/429-7/2006/CPL">
  <Id>urn:uuid:8b341f22-901e-45fa-bc29-e0921bbd1290</Id>
  <AnnotationText>${defaultProject} - Theatrical DCI Master</AnnotationText>
  <IssueDate>${new Date().toISOString()}</IssueDate>
  <Issuer>RANGMANCH DCI MASTERING LAB</Issuer>
  <Creator>Rangmanch DCP Engine v4.2</Creator>
  <ContentTitleText>${defaultProject.replace(/[^a-zA-Z0-9]/g, "_")}_FTR_S_HINDI_51_2K_20261101_OV</ContentTitleText>
  <ContentKind>feature</ContentKind>
  <ContentVersion>
    <Id>urn:uuid:7c891102-1200-4b2a-810a-dd891122ef90</Id>
    <LabelText>OV Version 1.0 Original Master</LabelText>
  </ContentVersion>
  <RatingList>
    <Rating>
      <Agency>http://cbfcindia.gov.in</Agency>
      <Label>UA 16+</Label>
    </Rating>
  </RatingList>
  <ReelList>
    <Reel>
      <Id>urn:uuid:e91024bb-33aa-4712-99ca-20261101aa01</Id>
      <AssetList>
        <MainPicture>
          <FrameRate>24 1</FrameRate>
          <ScreenAspectRatio>2.39</ScreenAspectRatio>
        </MainPicture>
      </AssetList>
    </Reel>
  </ReelList>
</CompositionPlaylist>`;

    const blob = new Blob([cplXml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CPL_${defaultProject.replace(/[^a-zA-Z0-9]/g, "_")}_DCI.xml`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess("DCI Composition Playlist (CPL.xml) exported successfully!");
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleDownloadKdm = () => {
    const kdmXml = `<?xml version="1.0" encoding="UTF-8"?>
<KDM xmlns="http://www.smpte-ra.org/schemas/430-1/2006/KDM">
  <AuthenticatedPublic>
    <MessageId>urn:uuid:12aa8910-b992-4411-9a7c-20261101kdm1</MessageId>
    <AnnotationText>Theatrical KDM for ${theatreCircuit}</AnnotationText>
    <IssueDate>${new Date().toISOString()}</IssueDate>
    <Signer>CN=Rangmanch Theatrical Key Authority,OU=Mastering</Signer>
    <Recipient>
      <X509SubjectName>CN=${serverModel.replace(/[^a-zA-Z0-9]/g, "_")},OU=TheatricalServers</X509SubjectName>
    </Recipient>
    <CompositionPlaylistId>urn:uuid:8b341f22-901e-45fa-bc29-e0921bbd1290</CompositionPlaylistId>
    <ContentKeysActivated>2026-11-01T00:00:00+05:30</ContentKeysActivated>
    <ContentKeysExpires>2027-02-01T23:59:59+05:30</ContentKeysExpires>
  </AuthenticatedPublic>
</KDM>`;

    const blob = new Blob([kdmXml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `KDM_${theatreCircuit.replace(/[^a-zA-Z0-9]/g, "_")}.xml`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess("RSA-2048 Theatrical KDM Key XML exported successfully!");
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="modal-backdrop">
      <div
        className="modal-panel"
        style={{
          maxWidth: "840px",
          width: "100%",
          background: "linear-gradient(180deg, #091a14 0%, #050d0a 100%)",
          border: "1px solid rgba(16, 185, 129, 0.35)",
          borderRadius: "24px",
          boxShadow: "0 25px 80px rgba(0,0,0,0.95), 0 0 50px rgba(16, 185, 129, 0.12)",
          overflow: "hidden",
        }}
      >
        {/* Top Emerald Trim */}
        <div
          style={{
            height: "3px",
            width: "100%",
            background:
              "linear-gradient(90deg, transparent, #10b981 25%, #6ee7b7 50%, #10b981 75%, transparent)",
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
            backgroundColor: "#06130e",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 100%)",
                border: "1px solid rgba(16,185,129,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#10b981",
              }}
            >
              <Film size={24} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  letterSpacing: "0.15em",
                  color: "#10b981",
                  textTransform: "uppercase",
                }}
              >
                Theatrical Distribution Suite • Feature 74
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  marginTop: "2px",
                }}
              >
                DCI Cinema Package (DCP) &amp; KDM Encryption
              </h2>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                Production: <span style={{ color: "#10b981", fontWeight: 600 }}>{defaultProject}</span> • SMPTE 429 DCI Compliant Master
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
            backgroundColor: "#050e0a",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            gap: "12px",
          }}
        >
          {[
            { num: 1, label: "DCI Video Conform" },
            { num: 2, label: "Atmos Audio Routing" },
            { num: 3, label: "KDM Key Generation" },
            { num: 4, label: "Verify & Seal DCP" },
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
                      ? "#10b981"
                      : isCompleted
                      ? "rgba(16,185,129,0.2)"
                      : "rgba(255,255,255,0.05)",
                    color: isCurrent
                      ? "#022c22"
                      : isCompleted
                      ? "#10b981"
                      : "rgba(255,255,255,0.4)",
                    border: isCurrent
                      ? "none"
                      : isCompleted
                      ? "1px solid rgba(16,185,129,0.4)"
                      : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {isCompleted && !isCurrent ? "✓" : s.num}
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: isCurrent ? "600" : "400",
                    color: isCurrent ? "#10b981" : isCompleted ? "#ffffff" : "rgba(255,255,255,0.5)",
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
          {/* Step 1: DCI Video Conform */}
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(16,185,129,0.06)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Film size={22} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#10b981" }}>
                    Step 1 Process: DCI Theatrical Video Container &amp; JPEG 2000 Mastering
                  </span>{" "}
                  Conform color space from ACEScg to DCI-P3 / DCI-XYZ, encode 12-bit JPEG 2000 frame sequences,
                  and calculate SMPTE 429-7 MXF hash hashes for multiplex servers.
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Theatrical Aspect Ratio Container
                  </label>
                  <select
                    value={dciContainer}
                    onChange={(e) => setDciContainer(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#0d221a",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="DCI Scope 2.39:1 (2048 x 858)">DCI Scope 2.39:1 (2048 x 858 - Action/Epic)</option>
                    <option value="DCI Flat 1.85:1 (1998 x 1080)">DCI Flat 1.85:1 (1998 x 1080 - Drama/Comedy)</option>
                    <option value="DCI Full Container (2048 x 1080)">DCI Full Container 1.90:1 (2048 x 1080 IMAX Digital)</option>
                    <option value="DCI 4K Scope (4096 x 1716)">DCI 4K Scope (4096 x 1716 Ultra-High Definition)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    JPEG 2000 Peak Bitrate Profile
                  </label>
                  <select
                    value={j2kBitrate}
                    onChange={(e) => setJ2kBitrate(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#0d221a",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="250 Mbps (DCI Maximum)">250 Mbps (SMPTE DCI Cinema Cap - Highest Fidelity)</option>
                    <option value="200 Mbps (Standard Theatrical)">200 Mbps (Standard Multiplex Theatrical Profile)</option>
                    <option value="500 Mbps (HFR 4K Extended)">500 Mbps (Extended High Frame Rate 48/60fps Profile)</option>
                  </select>
                </div>
              </div>

              {/* Video metrics and conform trigger */}
              <div
                style={{
                  backgroundColor: "#0a1f17",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    DCI XYZ Color Transform &amp; MXF Picture Track Telemetry
                  </div>
                  <button
                    onClick={handleVerifyVideo}
                    disabled={isVerifyingVideo}
                    style={{
                      background: "rgba(16,185,129,0.15)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      color: "#10b981",
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
                    <RotateCcw size={13} className={isVerifyingVideo ? "animate-spin" : ""} />
                    {isVerifyingVideo ? "Encoding J2K Frames..." : "⚡ Run DCI Picture Track Verification"}
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                  <div style={{ backgroundColor: "#071711", padding: "12px", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Color Space Matrix</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#ffffff", marginTop: "4px" }}>DCI-XYZ 12-bit</div>
                    <div style={{ fontSize: "11px", color: "#10b981", marginTop: "2px" }}>Gamma 2.6 Theatrical</div>
                  </div>
                  <div style={{ backgroundColor: "#071711", padding: "12px", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Framerate Lock</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#ffffff", marginTop: "4px" }}>24.000 fps</div>
                    <div style={{ fontSize: "11px", color: "#10b981", marginTop: "2px" }}>True Theatrical Cadence</div>
                  </div>
                  <div style={{ backgroundColor: "#071711", padding: "12px", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>MXF File Integrity</div>
                    <div style={{ fontSize: "15px", fontWeight: "bold", color: "#10b981", marginTop: "4px" }}>SHA-1 VERIFIED</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>0 Bitstream Errors</div>
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
                    <CheckCircle2 size={14} /> JPEG 2000 bitstream fully compliant with SMPTE 429-2 standard
                  </span>
                  <button
                    onClick={() => {
                      markStepComplete(1);
                      setActiveStep(2);
                    }}
                    style={{
                      background: "#10b981",
                      color: "#022c22",
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
                    Confirm Picture &amp; Route Audio <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Atmos Audio Routing */}
          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(16,185,129,0.06)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Volume2 size={22} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#10b981" }}>
                    Step 2 Process: 24-Bit 96kHz Uncompressed Audio &amp; Dolby Atmos Channel Matrix
                  </span>{" "}
                  Map discrete 5.1/7.1 channels and Dolby Atmos audio objects according to ITU-R BS.775
                  with calibrated theatrical volume levels (-24.0 LUFS dialogue normalization).
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Audio Channel Master Topology
                  </label>
                  <select
                    value={audioFormat}
                    onChange={(e) => setAudioFormat(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#0d221a",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="Dolby Atmos Spatial (9.1 Bed + 128 Objects)">Dolby Atmos Spatial (9.1 Bed + 128 Objects)</option>
                    <option value="7.1 Theatrical Surround LPCM">7.1 Theatrical Surround 24-bit 48kHz LPCM</option>
                    <option value="5.1 Theatrical Surround LPCM">5.1 Standard Theatrical 24-bit 48kHz LPCM</option>
                    <option value="IMAX 12.0 Channel Uncompressed">IMAX 12.0 Immersive Theatrical Audio</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Theatrical Loudness Normalization
                  </label>
                  <select
                    value={loudnessStandard}
                    onChange={(e) => setLoudnessStandard(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#0d221a",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="SMPTE 2095 (-24.0 LUFS Target)">SMPTE 2095 (-24.0 LUFS Target Cinema Standard)</option>
                    <option value="EBU R128 (-23.0 LUFS)">EBU R128 (-23.0 LUFS European Theatrical)</option>
                    <option value="Dynamic Theatrical Peak (-18.0 LUFS)">Action/Sci-Fi Dynamic Theatrical Peak (-18.0 LUFS)</option>
                  </select>
                </div>
              </div>

              {/* Audio Channels Grid */}
              <div
                style={{
                  backgroundColor: "#0a1f17",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    Discrete Channel Assignment (SMPTE 429-2 Table 1)
                  </div>
                  <button
                    onClick={handleCalibrateAudio}
                    disabled={isCalibratingAudio}
                    style={{
                      background: "rgba(16,185,129,0.15)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      color: "#10b981",
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
                    <RotateCcw size={12} className={isCalibratingAudio ? "animate-spin" : ""} />
                    {isCalibratingAudio ? "Calibrating SPL Levels..." : "🔊 Calibrate 85 dBC Sound Pressure"}
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
                  {[
                    { ch: "CH 1", name: "Left Front", spl: "85.0 dBC" },
                    { ch: "CH 2", name: "Right Front", spl: "85.0 dBC" },
                    { ch: "CH 3", name: "Center (Dialogue)", spl: "85.0 dBC" },
                    { ch: "CH 4", name: "LFE Subwoofer", spl: "95.0 dBC" },
                    { ch: "CH 5", name: "Left Surround", spl: "82.0 dBC" },
                    { ch: "CH 6", name: "Right Surround", spl: "82.0 dBC" },
                  ].map((c) => (
                    <div key={c.ch} style={{ backgroundColor: "#06150f", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#10b981" }}>{c.ch}</div>
                      <div style={{ fontSize: "10px", color: "#ffffff", marginTop: "2px" }}>{c.name}</div>
                      <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>{c.spl}</div>
                    </div>
                  ))}
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
                      markStepComplete(2);
                      setActiveStep(3);
                    }}
                    style={{
                      background: "#10b981",
                      color: "#022c22",
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
                    Lock Audio &amp; Proceed to KDM <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: KDM Key Generation */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(16,185,129,0.06)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <Key size={22} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#10b981" }}>
                    Step 3 Process: RSA-2048 Theatrical Key Delivery Message (KDM) Encryption
                  </span>{" "}
                  Encrypt AES-128 content keys with the target cinema server certificate public key.
                  KDMs unlock playback exclusively inside the authorized projection auditorium within specified date/time windows.
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    Multiplex Circuit Target
                  </label>
                  <select
                    value={theatreCircuit}
                    onChange={(e) => setTheatreCircuit(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#0d221a",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="PVR INOX All India (1,700 Screens)">PVR INOX All India (1,700 Screens - Tier 1 Multiplex)</option>
                    <option value="Cinepolis India (420 Screens)">Cinepolis India (420 Screens)</option>
                    <option value="Miraj Cinemas (180 Screens)">Miraj Cinemas (180 Screens)</option>
                    <option value="Single Screen Circuit (UFO / Qube Cinema)">Single Screen Circuit (UFO Moviez / Qube Cinema Network)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "6px", display: "block" }}>
                    DCI Media Block Hardware
                  </label>
                  <select
                    value={serverModel}
                    onChange={(e) => setServerModel(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#0d221a",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  >
                    <option value="Dolby Doremi IMS3000 / Christie IMB-S2">Dolby Doremi IMS3000 / Christie IMB-S2</option>
                    <option value="Barco Alchemy ICMP Integrated Cinema Processor">Barco Alchemy ICMP Integrated Cinema Processor</option>
                    <option value="GDC Technology SR-1000 Standalone IMB">GDC Technology SR-1000 Standalone IMB</option>
                  </select>
                </div>
              </div>

              {/* KDM Security Controls */}
              <div
                style={{
                  backgroundColor: "#0a1f17",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#ffffff" }}>
                    Cryptographic Playback Window &amp; Forensic Watermarking
                  </div>
                  <button
                    onClick={handleGenerateKdm}
                    disabled={isGeneratingKdm}
                    style={{
                      background: "rgba(16,185,129,0.15)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      color: "#10b981",
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
                    <RotateCcw size={12} className={isGeneratingKdm ? "animate-spin" : ""} />
                    {isGeneratingKdm ? "Signing KDM Keys..." : "🔐 Sign & Ingest Server Cert"}
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                  <div style={{ backgroundColor: "#06150f", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Key Algorithm</div>
                    <div style={{ fontSize: "13px", fontWeight: "bold", color: "#10b981" }}>RSA-2048 / SHA-256</div>
                  </div>
                  <div style={{ backgroundColor: "#06150f", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Playback Window</div>
                    <div style={{ fontSize: "13px", fontWeight: "bold", color: "#ffffff" }}>90 Days (Theatrical Run)</div>
                  </div>
                  <div style={{ backgroundColor: "#06150f", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Forensic Watermarking</div>
                    <div style={{ fontSize: "13px", fontWeight: "bold", color: "#10b981" }}>NexGuard Optical Active</div>
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
                      background: "#10b981",
                      color: "#022c22",
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
                    Lock KDM &amp; Proceed to Verification <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Verify & Seal DCP */}
          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "rgba(16,185,129,0.06)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <CheckCircle2 size={22} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5" }}>
                  <span style={{ fontWeight: "600", color: "#10b981" }}>
                    Step 4 Process: Final Bit-for-Bit Validation, SMPTE CPL XML &amp; Turnaround Export
                  </span>{" "}
                  The Digital Cinema Package is verified against SMPTE 429 standards. Export DCI Composition
                  Playlists (CPL) and encrypted KDM keys for immediate ingest into cinema projector servers.
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

              {/* Automated Validation Runner */}
              <div
                style={{
                  backgroundColor: "#0a1f17",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#ffffff" }}>
                    DCI Theatrical Compliance Checklist
                  </span>
                  <button
                    onClick={handleRunValidation}
                    disabled={isValidating}
                    style={{
                      background: "rgba(16,185,129,0.15)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      color: "#10b981",
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
                    <RotateCcw size={12} className={isValidating ? "animate-spin" : ""} />
                    {isValidating ? `Validating MXF Hashes (${validationProgress}%)...` : "🚀 Run Full DCI Validation Suite"}
                  </button>
                </div>

                {isValidating && (
                  <div style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#10b981", marginBottom: "4px" }}>
                      <span>Checking AssetMap, PKL, CPL, and MXF checksums...</span>
                      <span>{validationProgress}%</span>
                    </div>
                    <div style={{ width: "100%", height: "6px", backgroundColor: "#06150f", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${validationProgress}%`, height: "100%", backgroundColor: "#10b981", transition: "width 0.25s ease" }} />
                    </div>
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#0d221a", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>SMPTE CPL &amp; PKL Manifest</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>UUID Signed &amp; XML Validated</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#0d221a", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>Audio/Video Sync Offset</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>0.00ms (Frame-Locked Lip Sync)</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#0d221a", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>CBFC Certificate Burn-in</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>UA 16+ Head-Leader Verified</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#0d221a", padding: "10px 14px", borderRadius: "10px" }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff" }}>KDM Delivery Status</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>1,700 PVR INOX Screens Authorized</div>
                    </div>
                  </div>
                </div>

                {dcpSealed && (
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
                        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#10b981" }}>DCI CINEMA PACKAGE SEALED &amp; THEATRE READY</div>
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>Bit-for-bit validated against SMPTE 429/430. Ready for hard drive &amp; satellite ingestion.</div>
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
                      DCI CERTIFIED
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                <button
                  onClick={handleDownloadCpl}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "#ffffff",
                    fontWeight: "600",
                    fontSize: "13px",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(16,185,129,0.3)",
                  }}
                >
                  <Download size={16} />
                  Export DCI Playlist (CPL.xml)
                </button>

                <button
                  onClick={handleDownloadKdm}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    backgroundColor: "#0d221a",
                    border: "1px solid rgba(16,185,129,0.4)",
                    color: "#10b981",
                    fontWeight: "600",
                    fontSize: "13px",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                >
                  <Key size={16} />
                  Export Theatrical KDM Key (.XML)
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
            backgroundColor: "#050e0a",
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
                  background: "#10b981",
                  border: "none",
                  color: "#022c22",
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
                  color: "#022c22",
                  fontWeight: "600",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Close &amp; Finalize Master
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

