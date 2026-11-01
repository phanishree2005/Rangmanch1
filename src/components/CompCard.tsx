"use client";

import { useState } from "react";
import Image from "next/image";
import { getPerformerGallery } from "@/lib/images";
import {
  Rotate3d,
  Ruler,
  Eye,
  Sparkles,
  Shield,
  Languages,
  Award,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";

interface CompCardProps {
  displayName: string;
  stageName?: string;
  headshots: string[];
  heightFeet: string;
  heightCm: number;
  screenAgeRange: string;
  eyeColor: string;
  hairColor: string;
  bodyType: string;
  dialects: Array<{ language: string; dialect: string; fluency: string }>;
  cintaaVerified?: boolean;
}

export default function CompCard({
  displayName,
  stageName,
  headshots = [
    "/photos/real_03.jpg",
    "/photos/real_07.jpg",
    "/photos/real_06.jpg",
    "/photos/real_04.jpg",
  ],
  heightFeet = "5'10\"",
  heightCm = 178,
  screenAgeRange = "22 – 28 Years",
  eyeColor = "Dark Brown",
  hairColor = "Black / Wavy",
  bodyType = "Athletic / Lean",
  dialects = [
    { language: "Hindi", dialect: "Native (Awadhi / Standard)", fluency: "Native" },
    { language: "English", dialect: "Neutral Indian / British RP", fluency: "Fluent" },
    { language: "Marathi", dialect: "Bambaiya / Pune Standard", fluency: "Fluent" },
  ],
  cintaaVerified = true,
}: CompCardProps) {
  const activeHeadshots: string[] = (headshots && headshots.length > 0) ? headshots : getPerformerGallery(displayName);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [is360Active, setIs360Active] = useState(false);
  const [angleSlider, setAngleSlider] = useState(0);

  const angleLabels = ["0° (Front)", "45° (Quarter)", "90° (Profile)", "180° (Back Turn)"];

  return (
    <div
      className="p-6 sm:p-8 rounded-3xl border space-y-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(20,20,25,0.95), rgba(32,32,40,0.9))",
        borderColor: "rgba(201, 168, 76, 0.25)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(201, 168, 76, 0.1)",
      }}
    >
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-gold text-[10px]">DIGITAL COMP CARD</span>
            {cintaaVerified && (
              <span className="badge badge-green flex items-center gap-1 text-[10px]">
                <Shield className="w-3 h-3" /> CINTAA Verified
              </span>
            )}
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ivory)]">
            {displayName}
          </h2>
          {stageName && (
            <p className="text-xs text-[var(--gold-400)] font-medium">Screen Name: {stageName}</p>
          )}
        </div>

        {/* 360° Turnaround Toggle */}
        <button
          onClick={() => setIs360Active(!is360Active)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            is360Active
              ? "bg-[var(--gold-500)] text-[var(--charcoal-900)] shadow-lg shadow-[var(--gold-500)]/20"
              : "bg-black/40 text-[var(--gold-300)] border border-[var(--gold-500)]/30 hover:bg-black/60"
          }`}
        >
          <Rotate3d className="w-4 h-4" />
          <span>{is360Active ? "Exit 360° Turnaround" : "Interactive 360° Profile"}</span>
        </button>
      </div>

      {/* Main Comp Card Visual & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 4-Angle Headshot Suite & 360 Slider (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border bg-black/60 group"
            style={{ borderColor: "rgba(201, 168, 76, 0.2)" }}
          >
            {/* Main Headshot Image */}
            <div className="relative w-full h-full">
              <Image
                src={activeHeadshots[activePhotoIndex] || "/photos/real_03.jpg"}
                alt={displayName}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Photo Angle Tag */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-[var(--gold-300)]">
              {is360Active ? angleLabels[angleSlider] : `Angle ${activePhotoIndex + 1} of ${activeHeadshots.length}`}
            </div>

            {/* Bottom Caption on Photo */}
            <div className="absolute bottom-4 left-4 right-4 z-10 text-xs text-gray-200">
              <div className="font-semibold text-white">Natural Light • Zero Retouch</div>
              <div className="text-[11px] text-[var(--text-muted)] font-mono">
                Screen Age: {screenAgeRange}
              </div>
            </div>
          </div>

          {/* 360° Interactive Angle Slider or Photo Thumbnails */}
          {is360Active ? (
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex justify-between text-xs text-[var(--gold-300)] font-mono">
                <span>Drag to rotate headshot:</span>
                <span className="font-bold">{angleLabels[angleSlider]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="3"
                value={angleSlider}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setAngleSlider(val);
                  setActivePhotoIndex(val % activeHeadshots.length);
                }}
                className="w-full accent-[var(--gold-500)] cursor-pointer"
              />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {activeHeadshots.map((shot: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border transition-all ${
                    activePhotoIndex === idx
                      ? "border-[var(--gold-500)] shadow-md shadow-[var(--gold-500)]/20 scale-95"
                      : "border-white/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={shot} alt="Angle thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Physical Specs, Measurements & Dialect Matrix (6 cols) */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          {/* Physical Specifications Table */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg text-[var(--ivory)] flex items-center gap-2">
              <Ruler className="w-4 h-4 text-[var(--gold-400)]" />
              <span>Physical Attributes &amp; Specifications</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[var(--text-muted)] text-[11px] block">Height</span>
                <span className="font-semibold text-[var(--ivory)] text-sm">
                  {heightFeet} ({heightCm} cm)
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[var(--text-muted)] text-[11px] block">Screen Age Bracket</span>
                <span className="font-semibold text-[var(--gold-300)] text-sm">
                  {screenAgeRange}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[var(--text-muted)] text-[11px] block">Eye Color</span>
                <span className="font-semibold text-[var(--ivory)] text-sm">{eyeColor}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[var(--text-muted)] text-[11px] block">Hair Texture &amp; Color</span>
                <span className="font-semibold text-[var(--ivory)] text-sm">{hairColor}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 col-span-2">
                <span className="text-[var(--text-muted)] text-[11px] block">Body Structure / Build</span>
                <span className="font-semibold text-[var(--ivory)] text-sm">{bodyType}</span>
              </div>
            </div>
          </div>

          {/* Regional Dialects Matrix */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg text-[var(--ivory)] flex items-center gap-2">
              <Languages className="w-4 h-4 text-[var(--purple-400)]" />
              <span>Regional Dialect &amp; Accent Fluency</span>
            </h3>

            <div className="space-y-2 text-xs">
              {dialects.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[var(--ivory)]">{item.language}</span>
                    <span className="text-[var(--text-muted)] text-[11px] ml-2">
                      ({item.dialect})
                    </span>
                  </div>
                  <span className="badge badge-purple text-[10px]">{item.fluency}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick PDF Comp Card Download Pill */}
          <div className="p-4 rounded-xl bg-[var(--gold-500)]/10 border border-[var(--gold-500)]/25 flex items-center justify-between text-xs text-[var(--gold-200)]">
            <span className="font-medium">Industry-standard 8.5&quot; x 11&quot; Casting Comp Card</span>
            <button
              onClick={() => alert("Downloading High-Res Casting Director Comp Card PDF...")}
              className="btn-primary text-xs py-1.5 px-3 font-semibold"
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
