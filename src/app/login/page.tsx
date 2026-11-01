"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuthStore, DEMO_ACCOUNTS, getDashboardRoute } from "@/lib/auth";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Award,
  LockKeyhole,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    clearError();

    if (!email.trim() || !password) {
      setFormError("Please provide both your registered email address and password.");
      return;
    }

    const success = await login(email, password);
    if (success) {
      const user = useAuthStore.getState().user;
      if (user) {
        router.push(getDashboardRoute(user.role));
      } else {
        router.push("/");
      }
    }
  };

  const handleSelectDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setFormError("");
    clearError();
  };

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
                <span>ARTIST &amp; STUDIO ACCESS PORTAL</span>
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
                Your Next Production <br />
                <span className="text-gradient-gold">Begins Right Here</span>
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
                Sign in to review audition invitations, manage confidential DRM character sides,
                track CINTAA escrow milestones, and update your comp card.
              </p>

              {/* Endorsement Card */}
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(12,12,18,0.75)",
                  border: "1px solid rgba(212,175,97,0.25)",
                  backdropFilter: "blur(12px)",
                  maxWidth: "460px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    fontStyle: "italic",
                    color: "#e0e0ea",
                    lineHeight: 1.6,
                    margin: "0 0 12px 0",
                  }}
                >
                  &ldquo;Rangmanch is the first platform in Indian cinema that guarantees verified identities,
                  protects audition scripts with watermarking, and locks cast compensation in statutory escrow.&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#d4af61",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "11px",
                      fontFamily: "monospace",
                      color: "#d4af61",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontWeight: 700,
                    }}
                  >
                    Casting Guild of India Advisory Board
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Live Metrics */}
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
                  100%
                </div>
                <div style={{ fontSize: "10px", color: "#8a8a9a", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Escrow Guaranteed
                </div>
              </div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "#d4af61", fontFamily: "monospace" }}>
                  SHA-256
                </div>
                <div style={{ fontSize: "10px", color: "#8a8a9a", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  DRM Protected Sides
                </div>
              </div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "#34d399", fontFamily: "monospace" }}>
                  0%
                </div>
                <div style={{ fontSize: "10px", color: "#8a8a9a", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Audition Fees
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Login Form Card */}
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

            {/* Header */}
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
                <span>✦ ARTIST &amp; STUDIO ACCESS</span>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
                <span style={{ color: "#34d399" }}>SECURE PORTAL</span>
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
                Sign In
              </h1>
              <p style={{ margin: 0, fontSize: "13px", color: "#8e8e98", lineHeight: 1.5 }}>
                Enter your credentials to access your audition portfolio and submissions.
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
                      Password
                    </label>
                    <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#606070" }}>
                      DEMO: <strong style={{ color: "#d4af61" }}>demo1234</strong>
                    </span>
                  </div>
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

                {/* Submit Button */}
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
                    marginTop: "8px",
                  }}
                >
                  {isLoading ? "AUTHENTICATING..." : "SIGN IN"}
                  <ArrowRight size={14} />
                </button>
              </form>

              {/* Quick Demo Access Pills */}
              <div
                style={{
                  marginTop: "24px",
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "#8a8a9a",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  ✦ 1-CLICK DEMO REVIEWER LOGINS
                </span>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {DEMO_ACCOUNTS.slice(0, 2).map((acc) => (
                    <button
                      key={acc.email}
                      type="button"
                      onClick={() => handleSelectDemo(acc.email, acc.password)}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "10px",
                        backgroundColor: "#07070b",
                        border: "1px solid rgba(255,255,255,0.1)",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(212,175,97,0.5)";
                        e.currentTarget.style.backgroundColor = "rgba(212,175,97,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                        e.currentTarget.style.backgroundColor = "#07070b";
                      }}
                    >
                      <div style={{ fontSize: "12px", fontWeight: 700, color: "#ffffff" }}>
                        {acc.user.name}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          fontFamily: "monospace",
                          color: "#d4af61",
                          textTransform: "capitalize",
                        }}
                      >
                        {acc.user.role.replace("_", " ")}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Switch to Signup */}
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
                <span>Do not have an account? </span>
                <Link
                  href="/signup"
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
                  Register Here →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
