"use client"
import { motion } from "motion/react"
import TopBarDetails from "./TopBarDetails";
import VehicleDetails from "./vehicleDetails";
import ViewVehicleCard from "./viewVehicleCard";
import { Input } from "../ui/input";
import { useState } from "react";
import { Check, Upload } from "lucide-react";
import Link from "next/link";

const CAR_TYPES = ["Hatchback", "Sedan", "SUV", "Luxury", "Electric"] as const;
const FUELS = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"] as const;
const TRANSMISSIONS = ["Manual", "Automatic"] as const;

export default function ListYourVehicle(){

    const [form, setForm] = useState({
        make: "",
        model: "",
        year: "",
        type: "Sedan",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: "5",
        plate: "",
        city: "",
        address: "",
        price: "",
        description: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const update = (k: keyof typeof form, v: string) =>
        setForm((f) => ({ ...f, [k]: v }));

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    return <div className=" w-[80vw]  ">
        <TopBarDetails/>
        <div className="bg-yellow-400 mt-2 h-140 w-full flex gap-4">
            {/* left Vehicle info */}
            <div className="h-120 w-full bg-red-400">
                {/* 1st step*/}
                <div className=" flex gap-2">
                    <motion.span className="h-6 text-center text-sm text-green-700 bg-green-100 mt-1 rounded-full w-6 flex justify-center items-center "> 01 </motion.span>
                    <motion.div className="flex items-start h-12 flex-col">
                        
                        <motion.h1 className="text-2xl">Vehicle Details</motion.h1>
                        <motion.span> Tell us what car you're listing.</motion.span>
                    </motion.div>
                </div>
                {/* 1st form */}
                <div className="bg-gray-300 p-3 h-full w-full mt-5 rounded-lg">
                    <div className="bg-black h-full w-full">
                        <form onSubmit={onSubmit} className="space-y-10">
                <Section
                  index="01"
                  title="Vehicle details"
                  subtitle="Tell us what car you're listing."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Make" placeholder="Maruti Suzuki" value={form.make} onChange={(v) => update("make", v)} required />
                    <Field label="Model" placeholder="Swift" value={form.model} onChange={(v) => update("model", v)} required />
                    <Field label="Year" placeholder="2022" value={form.year} onChange={(v) => update("year", v)} required />
                    <SelectField label="Body type" value={form.type} onChange={(v) => update("type", v)} options={CAR_TYPES as unknown as string[]} />
                    <SelectField label="Fuel" value={form.fuel} onChange={(v) => update("fuel", v)} options={FUELS as unknown as string[]} />
                    <SelectField label="Transmission" value={form.transmission} onChange={(v) => update("transmission", v)} options={TRANSMISSIONS as unknown as string[]} />
                    <Field label="Seats" placeholder="5" value={form.seats} onChange={(v) => update("seats", v)} />
                    <Field label="Registration number" placeholder="DL 3C AB 1234" value={form.plate} onChange={(v) => update("plate", v)} required />
                  </div>
                </Section>

                <Section
                  index="02"
                  title="Photos"
                  subtitle="Add at least 4 clear photos. Owners with 6+ photos earn 32% more."
                >
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[0, 1, 2, 3].map((i) => (
                      <PhotoDrop key={i} primary={i === 0} />
                    ))}
                  </div>
                </Section>

                <Section
                  index="03"
                  title="Pickup location"
                  subtitle="Where renters will pick up the car."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="City" placeholder="Bengaluru" value={form.city} onChange={(v) => update("city", v)} required />
                    <Field label="Neighborhood / Area" placeholder="Indiranagar" value={form.address} onChange={(v) => update("address", v)} required />
                  </div>
                </Section>

                <Section
                  index="04"
                  title="Pricing"
                  subtitle="Set your daily rate. You can change this anytime."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[13px]" style={{ color: "var(--color-text-secondary)" }}>
                        Daily rate
                      </label>
                      <div className="flex items-stretch overflow-hidden rounded-[10px] border" style={{ borderColor: "var(--color-border-default)" }}>
                        <span
                          className="grid place-items-center px-4 text-[14px]"
                          style={{ backgroundColor: "var(--color-surface-stone)", color: "var(--color-text-secondary)" }}
                        >
                          ₹
                        </span>
                        <input
                          required
                          value={form.price}
                          onChange={(e) => update("price", e.target.value)}
                          placeholder="1800"
                          className="w-full bg-white px-4 py-3 text-[15px] outline-none placeholder:text-[color:var(--color-text-muted)]"
                        />
                        <span
                          className="grid place-items-center px-4 text-[13px]"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          / day
                        </span>
                      </div>
                    </div>
                    <div className="rounded-[10px] p-4" style={{ backgroundColor: "var(--color-surface-stone)" }}>
                      <div className="text-[12.5px]" style={{ color: "var(--color-text-secondary)" }}>
                        Suggested for your area
                      </div>
                      <div className="mt-1 text-[22px] tracking-tight">₹1,600 – ₹2,200</div>
                      <div className="mt-1 text-[12px]" style={{ color: "var(--color-text-secondary)" }}>
                        Based on similar cars in Indiranagar
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="mb-2 block text-[13px]" style={{ color: "var(--color-text-secondary)" }}>
                      Description
                    </label>
                    <textarea
                      rows={4}
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      placeholder="Well-maintained, single owner, monthly service. Great for weekend trips."
                      className="w-full rounded-[10px] border bg-white px-4 py-3 text-[15px] outline-none placeholder:text-[color:var(--color-text-muted)] focus:border-[color:#2D6A4F]"
                      style={{ borderColor: "var(--color-border-default)" }}
                    />
                  </div>
                </Section>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="rounded-[10px] px-6 py-3 text-[14px] text-white transition-all duration-150 hover:bg-primary-dark active:scale-[0.98]"
                    style={{ backgroundColor: "#2D6A4F" }}
                  >
                    Submit for review
                  </button>
                  <button
                    type="button"
                    className="rounded-[10px] border px-6 py-3 text-[14px] transition-colors hover:bg-surface-muted"
                    style={{ borderColor: "var(--color-border-default)", color: "var(--color-ink)" }}
                  >
                    Save as draft
                  </button>
                  <span className="text-[12.5px]" style={{ color: "var(--color-text-secondary)" }}>
                    Verification usually takes under 24 hours.
                  </span>
                </div>
              </form>
                    </div>
                </div>
            </div>
            {/* vehicle card */}
            <div className="h-100 w-3/5 bg-green-400">
                
            </div>
        </div>
    </div>
}



function Section({
  index,
  title,
  subtitle,
  children,
}: {
  index: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rm-reveal">
      <div className="mb-6 flex items-baseline gap-4">
        <span
          className="text-[12px] tracking-wider"
          style={{ color: "#2D6A4F" }}
        >
          {index}
        </span>
        <div>
          <h2 className="text-[22px] tracking-tight">{title}</h2>
          <p className="mt-1 text-[13.5px]" style={{ color: "var(--color-text-secondary)" }}>
            {subtitle}
          </p>
        </div>
      </div>
      <div
        className="rounded-[14px] bg-white p-6 md:p-7"
        style={{ border: "1px solid var(--color-border-default)" }}
      >
        {children}
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[13px]" style={{ color: "var(--color-text-secondary)" }}>
        {label}
      </label>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[10px] border bg-white px-4 py-3 text-[15px] outline-none placeholder:text-[color:var(--color-text-muted)] focus:border-[color:#2D6A4F]"
        style={{ borderColor: "var(--color-border-default)" }}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-[13px]" style={{ color: "var(--color-text-secondary)" }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-[10px] border bg-white px-4 py-3 text-[15px] outline-none focus:border-[color:#2D6A4F]"
        style={{ borderColor: "var(--color-border-default)" }}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function PhotoDrop({ primary }: { primary?: boolean }) {
  return (
    <label
      className="group flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] transition-colors hover:bg-surface-muted"
      style={{
        border: "1px dashed var(--color-border-soft)",
        backgroundColor: "var(--color-page)",
      }}
    >
      <span
        className="grid h-10 w-10 place-items-center rounded-full"
        style={{ backgroundColor: "#E8F5EE", color: "#2D6A4F" }}
      >
        <Upload className="h-4 w-4" />
      </span>
      <span className="text-[13px]" style={{ color: "var(--color-ink)" }}>
        {primary ? "Add cover photo" : "Add photo"}
      </span>
      <span className="text-[11.5px]" style={{ color: "var(--color-text-secondary)" }}>
        JPG or PNG · up to 8MB
      </span>
      <input type="file" accept="image/*" className="hidden" />
    </label>
  );
}

function Row({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5" style={{ color: "var(--color-ink-2)" }}>
      <span style={{ color: "var(--color-text-secondary)" }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div
      className="rm-fade-up mx-auto max-w-2xl rounded-[16px] bg-white p-10 text-center"
      style={{ border: "1px solid var(--color-border-default)" }}
    >
      <div
        className="mx-auto grid h-14 w-14 place-items-center rounded-full"
        style={{ backgroundColor: "#E8F5EE", color: "#2D6A4F" }}
      >
        <Check className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-[28px] tracking-tight">Listing submitted</h2>
      <p className="mx-auto mt-3 max-w-md text-[14.5px]" style={{ color: "var(--color-text-secondary)" }}>
        Our team will verify your vehicle within 24 hours. You'll get an email
        once it's live and bookable.
      </p>
      <div className="mt-7 flex justify-center gap-3">
        <Link
          href="/"
          className="rounded-[10px] px-5 py-2.5 text-[14px] text-white transition-colors hover:bg-primary-dark"
          style={{ backgroundColor: "#2D6A4F" }}
        >
          Back home
        </Link>
        <button
          onClick={onReset}
          className="rounded-[10px] border px-5 py-2.5 text-[14px] transition-colors hover:bg-surface-muted"
          style={{ borderColor: "var(--color-border-default)" }}
        >
          List another
        </button>
      </div>
    </div>
  );
}
