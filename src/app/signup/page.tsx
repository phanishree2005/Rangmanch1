"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuthStore, getDashboardRoute } from "@/lib/auth";
import type { UserRole } from "@/lib/types";
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Film,
  Sparkles,
  CheckCircle2,
  LockKeyhole,
  Award,
} from "lucide-react";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get("role") as UserRole) || "talent";

  const { signup, isLoading, error, clearError } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    clearError();

    if (!name.trim()) {
      setFormError("Please enter your legal or professional stage name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }
    if (!agreed) {
      setFormError("You must agree to the CINTAA Fair-Play and DPDP Act privacy guidelines.");
      return;
    }

    const success = await signup({ name, email, password, role });
    if (success) {
      router.push(getDashboardRoute(role));
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1240px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: "40px",
        alignItems: "stretch",
      }}
    >
      {/* LEFT: Cinematic Showcase Pane */}
      <div
        style={{
          position: "relative",
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid rgba(212, 175, 97, 0.25)",
          minHeight: "560px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "44px",
          background: "#08080c",
          boxShadow: "0 25px 70px rgba(0,0,0,0.8)",
        }}
      >
        {/* Background Image with Deep Vignette */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/banners/auth_cinema_studio.jpg"
            alt="Rangmanch Cinema Studio"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(4,4,6,0.82) 0%, rgba(8,8,12,0.65) 45%, #08080c 95%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: "inset 0 0 100px rgba(0,0,0,0.9)",
            }}
          />
        </div>

        {/* Top Branding & Laurel */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "9999px",
              backgroundColor: "rgba(10,10,16,0.85)",
              border: "1px solid rgba(212,175,97,0.4)",
              color: "#d4af61",
              fontSize: "11px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontWeight: 700,
              backdropFilter: "blur(8px)",
              marginBottom: "24px",
            }}
          >
            <Sparkles size={13} color="#d4af61" />
            <span>INDIA&apos;S PREMIERE CASTING NETWORK</span>
          </div>

          <h2
            className="font-cinema"
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.18,
              letterSpacing: "-0.01em",
              marginBottom: "16px",
            }}
          >
            Where Real Talent <br />
            <span className="text-gradient-gold">Meets Legendary Cinema</span>
          </h2>

          <p
            style={{
              color: "#c0c0d0",
              fontSize: "14px",
              lineHeight: 1.6,
              maxWidth: "460px",
              marginBottom: "28px",
            }}
          >
            Direct, accredited access to Bollywood, South Indian &amp; Regional OTT productions.
            Zero middleman fees, 100% CINTAA-escrow protected.
          </p>

          {/* Key Value Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "460px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px 16px",
                borderRadius: "14px",
                backgroundColor: "rgba(12,12,18,0.75)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(212,175,97,0.15)",
                  border: "1px solid rgba(212,175,97,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={18} color="#d4af61" />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>
                  100% Verified Profiles
                </div>
                <div style={{ fontSize: "11px", color: "#8a8a9a" }}>
                  Aadhaar, Passport &amp; CINTAA Guild credentials cross-verified with DigiLocker.
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px 16px",
                borderRadius: "14px",
                backgroundColor: "rgba(12,12,18,0.75)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(52,211,153,0.15)",
                  border: "1px solid rgba(52,211,153,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Award size={18} color="#34d399" />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>
                  CINTAA Escrow Protection
                </div>
                <div style={{ fontSize: "11px", color: "#8a8a9a" }}>
                  Statutory pay guarantees, 0% commission charges, and direct showrunner invitations.
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px 16px",
                borderRadius: "14px",
                backgroundColor: "rgba(12,12,18,0.75)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(212,175,97,0.15)",
                  border: "1px solid rgba(212,175,97,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <LockKeyhole size={18} color="#d4af61" />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>
                  Watermarked DRM Sides
                </div>
                <div style={{ fontSize: "11px", color: "#8a8a9a" }}>
                  Confidential character audition scripts protected under Indian Copyright Law.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats & Trust Bar */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: "36px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", fontFamily: "monospace" }}>
              4,850+
            </div>
            <div style={{ fontSize: "10px", color: "#8a8a9a", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Verified Artists
            </div>
          </div>
          <div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#d4af61", fontFamily: "monospace" }}>
              140+
            </div>
            <div style={{ fontSize: "10px", color: "#8a8a9a", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Active Auditions
            </div>
          </div>
          <div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#34d399", fontFamily: "monospace" }}>
              ₹14.8 Cr
            </div>
            <div style={{ fontSize: "10px", color: "#8a8a9a", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Escrow Secured
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: High-End Form Card */}
      <div
        style={{
          width: "100%",
          background: "linear-gradient(180deg, #101018 0%, #08080c 100%)",
          border: "1px solid rgba(212, 175, 97, 0.35)",
          borderRadius: "24px",
          boxShadow: "0 25px 80px rgba(0,0,0,0.95), 0 0 50px rgba(212,175,97,0.1)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Gold Trim */}
        <div
          style={{
            height: "3px",
            width: "100%",
            background:
              "linear-gradient(90deg, transparent, #d4af61 25%, #f4e2b8 50%, #d4af61 75%, transparent)",
          }}
        />

        {/* Header Container */}
        <div
          style={{
            padding: "36px 36px 24px 36px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "#0d0d14",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 14px",
              borderRadius: "20px",
              backgroundColor: "rgba(212,175,97,0.12)",
              border: "1px solid rgba(212,175,97,0.3)",
              color: "#d4af61",
              fontSize: "10px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            <span>✦ JOIN THE NETWORK</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
            <span style={{ color: "#34d399" }}>VERIFIED ACCESS</span>
          </div>

          <h1
            className="font-cinema"
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#ffffff",
              margin: "0 0 8px 0",
              letterSpacing: "-0.01em",
            }}
          >
            Create Account
          </h1>
          <p style={{ margin: 0, fontSize: "13px", color: "#8e8e98", lineHeight: 1.5 }}>
            Join verified actors, classical dancers, vocalists, and casting directors across India.
          </p>
        </div>

        {/* Form Body */}
        <div style={{ padding: "32px 36px", flex: 1, display: "flex", flexDirection: "column" }}>
          {(formError || error) && (
            <div
              style={{
                marginBottom: "20px",
                padding: "14px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(244,63,94,0.3)",
                backgroundColor: "rgba(244,63,94,0.08)",
                fontSize: "12px",
                color: "#fda4af",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <AlertCircle size={16} className="shrink-0 text-rose-400" />
              <span>{formError || error}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}
          >
            {/* Role Selector */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label
                  style={{
                    fontSize: "11px",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "#8a8a9a",
                    fontWeight: 600,
                  }}
                >
                  Registering As
                </label>
                <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#d4af61" }}>
                  {role === "talent" ? "PERFORMER ROSTER" : "DIRECTOR DESK"}
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => setRole("talent")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "14px",
                    borderRadius: "14px",
                    border:
                      role === "talent"
                        ? "1px solid #d4af61"
                        : "1px solid rgba(255,255,255,0.09)",
                    background:
                      role === "talent"
                        ? "linear-gradient(145deg, rgba(212,175,97,0.18) 0%, rgba(212,175,97,0.04) 100%)"
                        : "#08080d",
                    boxShadow:
                      role === "talent" ? "0 0 20px rgba(212,175,97,0.2)" : "none",
                    color: role === "talent" ? "#ffffff" : "#8e8e98",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    fontWeight: role === "talent" ? 700 : 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Sparkles size={14} color={role === "talent" ? "#d4af61" : "#606070"} />
                  <span>Actor / Performer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("casting_director")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "14px",
                    borderRadius: "14px",
                    border:
                      role === "casting_director"
                        ? "1px solid #d4af61"
                        : "1px solid rgba(255,255,255,0.09)",
                    background:
                      role === "casting_director"
                        ? "linear-gradient(145deg, rgba(212,175,97,0.18) 0%, rgba(212,175,97,0.04) 100%)"
                        : "#08080d",
                    boxShadow:
                      role === "casting_director" ? "0 0 20px rgba(212,175,97,0.2)" : "none",
                    color: role === "casting_director" ? "#ffffff" : "#8e8e98",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    fontWeight: role === "casting_director" ? 700 : 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Film size={14} color={role === "casting_director" ? "#d4af61" : "#606070"} />
                  <span>Casting Director</span>
                </button>
              </div>
            </div>

            {/* Full Legal / Stage Name */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#8a8a9a",
                  fontWeight: 600,
                }}
              >
                Full Legal / Stage Name
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#050508",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "12px",
                  padding: "4px 14px",
                  transition: "border-color 0.2s ease",
                }}
              >
                <User size={16} color="#d4af61" style={{ marginRight: "10px", flexShrink: 0 }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  style={{
                    width: "100%",
                    padding: "10px 0",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#ffffff",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            {/* Email Address */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#8a8a9a",
                  fontWeight: 600,
                }}
              >
                Email Address
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#050508",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "12px",
                  padding: "4px 14px",
                  transition: "border-color 0.2s ease",
                }}
              >
                <Mail size={16} color="#d4af61" style={{ marginRight: "10px", flexShrink: 0 }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  style={{
                    width: "100%",
                    padding: "10px 0",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#ffffff",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#8a8a9a",
                  fontWeight: 600,
                }}
              >
                Password (Min 6 Characters)
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#050508",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "12px",
                  padding: "4px 14px",
                  transition: "border-color 0.2s ease",
                }}
              >
                <Lock size={16} color="#d4af61" style={{ marginRight: "10px", flexShrink: 0 }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: "100%",
                    padding: "10px 0",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#ffffff",
                    fontSize: "14px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#8a8a9a",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                cursor: "pointer",
                padding: "12px 14px",
                borderRadius: "12px",
                backgroundColor: "rgba(212,175,97,0.04)",
                border: "1px solid rgba(212,175,97,0.18)",
                fontSize: "12px",
                color: "#a0a0b0",
                lineHeight: 1.5,
              }}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{
                  accentColor: "#d4af61",
                  width: "16px",
                  height: "16px",
                  marginTop: "2px",
                  flexShrink: 0,
                }}
              />
              <span>
                I agree to the{" "}
                <strong style={{ color: "#ffffff" }}>CINTAA Fair-Play Standards</strong> and{" "}
                <strong style={{ color: "#d4af61" }}>DPDP Act 2023</strong> privacy protocols.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-cinema-gold"
              style={{
                width: "100%",
                height: "50px",
                borderRadius: "12px",
                fontSize: "13px",
                letterSpacing: "0.1em",
                marginTop: "4px",
              }}
            >
              {isLoading ? "CREATING PROFILE..." : "CREATE ACCOUNT"}
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Switch to Sign In */}
          <div
            style={{
              marginTop: "24px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              textAlign: "center",
              fontSize: "12px",
              color: "#8a8a9a",
            }}
          >
            <span>Already registered? </span>
            <Link
              href="/login"
              style={{
                color: "#d4af61",
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginLeft: "6px",
              }}
            >
              Sign In →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "88vh",
          backgroundColor: "#040406",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
        }}
      >
        <Suspense
          fallback={
            <div style={{ fontSize: "12px", fontFamily: "monospace", color: "#606070" }}>
              LOADING...
            </div>
          }
        >
          <SignupForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
