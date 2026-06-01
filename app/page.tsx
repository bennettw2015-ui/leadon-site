"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GalleryHorizontalEnd,
  Globe2,
  Inbox,
  LayoutDashboard,
  MessageSquareText,
  PenTool,
  Rocket,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="rounded-full border border-white/[0.10] bg-white/[0.04] px-4 py-2 text-sm text-white/45">
        Loading 3D scene...
      </div>
    </div>
  ),
});

const buildItems = [
  {
    id: "redesign",
    title: "Modern Redesigns",
    eyebrow: "First impression",
    icon: PenTool,
    short: "Cleaner first impression.",
    detail:
      "Most trades websites do not need more decoration. They need a cleaner first impression, stronger service pages, better mobile layout, and clearer reasons for a customer to trust the business. We rebuild outdated websites into premium, mobile-first sites that make the company look established, organized, and easy to contact.",
    bullets: [
      "Modern mobile-first design",
      "Cleaner service pages",
      "Stronger quote/contact CTAs",
      "More trustworthy first impression",
    ],
  },
  {
    id: "quote",
    title: "Custom Quote Tools",
    eyebrow: "Lead qualification",
    icon: LayoutDashboard,
    short: "Qualify jobs before the call.",
    detail:
      "A quote tool is not a final binding quote. It is a guided lead qualifier built around the company’s real pricing logic. Instead of getting vague messages like “how much for a fence?”, the customer answers the right questions upfront: service type, size, materials, timeline, location, budget, and add-ons. The business gets a cleaner lead and wastes less time with tire-kickers.",
    bullets: [
      "Built around real pricing logic",
      "Collects useful job details upfront",
      "Filters serious leads from tire-kickers",
      "Can show a rough range or send a request",
    ],
  },
  {
    id: "intake",
    title: "Smart Intake Forms",
    eyebrow: "Better details",
    icon: MessageSquareText,
    short: "Turn messy requests into clear details.",
    detail:
      "Generic contact forms are weak because every service needs different information. A pool opening, fence install, deck repair, landscaping job, or pressure washing request should not all use the same form. We build intake flows that ask the right questions for each service so the owner can understand the job before calling back.",
    bullets: [
      "Different forms for different services",
      "Captures budget, timeline, location, and job type",
      "Reduces back-and-forth messages",
      "Makes follow-up faster and more professional",
    ],
  },
  {
    id: "email",
    title: "Automated Lead Emails",
    eyebrow: "Inbox-ready",
    icon: Inbox,
    short: "Send organized leads instantly.",
    detail:
      "When someone submits a form, the business should not receive a messy pile of random fields. We format every submission into a clean lead email with customer info, service requested, project details, timeline, budget, selected options, missing information, and next-step notes. The owner can open one email and know exactly what they are dealing with.",
    bullets: [
      "Clean inbox-ready summaries",
      "Customer and project details organized",
      "Missing-info flags",
      "Faster response time for serious leads",
    ],
  },
  {
    id: "proof",
    title: "Project Galleries",
    eyebrow: "Proof that sells",
    icon: GalleryHorizontalEnd,
    short: "Show proof that sells.",
    detail:
      "Trades businesses sell trust. Customers want proof that the company can actually do the job well. We build polished project galleries, before-and-after sections, testimonial areas, review blocks, and work showcases that make the business look credible before the customer ever sends a message.",
    bullets: [
      "Before-and-after project sections",
      "Review and testimonial blocks",
      "Cleaner work showcase layouts",
      "More confidence before the first call",
    ],
  },
  {
    id: "seo",
    title: "Service Area Sections",
    eyebrow: "Local visibility",
    icon: Globe2,
    short: "Rank and convert locally.",
    detail:
      "Local customers should instantly know whether the business serves their area. We build clear service-area sections and local pages that explain where the company works, what services are available, and how customers can request a quote. It also gives the website a stronger foundation for local search over time.",
    bullets: [
      "Clear service-area messaging",
      "Location-focused website sections",
      "Better local search foundation",
      "Less confusion for customers",
    ],
  },
];

const workItems = [
  {
    id: "truefence",
    title: "TrueFence",
    status: "Premium trades demo",
    industry: "Fence company",
    image: "/images/truefence.png",
    description:
      "A dark premium fence company build with service cards, project proof, reviews, and a multi-step estimate system designed to make the business feel established and high-trust.",
    tags: ["Fence company", "Quote estimator", "Premium UI", "Project proof"],
  },
  {
    id: "opentilclosed",
    title: "Open ’Til Closed",
    status: "Pool service build",
    industry: "Pool & spa care",
    image: "/images/open-to-closed.png",
    description:
      "A pool and spa service website with a polished homepage, service sections, product/shop areas, and an instant estimate flow for openings, closings, maintenance, and add-ons.",
    tags: ["Pool service", "Estimate flow", "Shop section", "Service pages"],
  },
  {
    id: "racka",
    title: "Racka Roofing",
    status: "Roofing concept",
    industry: "Roofing & exteriors",
    image: "/images/rackaroof.png",
    description:
      "A bold red and black roofing/exterior services concept with a project-type estimator, service grid, process section, lead capture form, and clear calls-to-action.",
    tags: ["Roofing", "Lead form", "Service grid", "Bold brand"],
  },
  {
    id: "sublime",
    title: "Sublime Strength",
    status: "Brand website",
    industry: "Strength & coaching",
    image: "/images/sublime.png",
    description:
      "A clean fitness and coaching website with program cards, trust sections, testimonials, facility showcase, and direct booking paths for a premium local training brand.",
    tags: ["Fitness brand", "Programs", "Testimonials", "Booking CTA"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030303] text-white">
      <section className="relative min-h-screen overflow-hidden">
        <HeroBackground />
        <FullHeroSpline />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[20vh] bg-gradient-to-b from-transparent via-[#030303]/70 to-[#030303]" />

        <div className="pointer-events-none relative z-20 mx-auto min-h-screen max-w-7xl px-6 py-6 lg:px-8">
          <Navigation />

          <div className="flex min-h-[calc(100vh-96px)] items-center">
            <HeroCopy />
          </div>
        </div>
      </section>

      <WhatWeBuild />
      <SelectedWork />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#030303]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_42%,rgba(96,165,250,0.12),transparent_31%),radial-gradient(circle_at_86%_72%,rgba(129,140,248,0.055),transparent_35%),radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.035),transparent_28%)]" />

      <div className="absolute right-[-22%] top-[10%] h-[720px] w-[1100px] rotate-[-12deg] rounded-full bg-gradient-to-r from-transparent via-sky-400/[0.07] to-transparent blur-[135px]" />
      <div className="absolute right-[4%] top-[42%] h-[340px] w-[820px] rotate-[8deg] rounded-full bg-gradient-to-r from-transparent via-blue-500/[0.045] to-violet-400/[0.035] blur-[115px]" />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,0.995)_0%,rgba(3,3,3,0.95)_28%,rgba(3,3,3,0.58)_54%,rgba(3,3,3,0.16)_100%)]" />

      <div className="absolute inset-0 opacity-[0.032] [background-image:radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:4px_4px]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,3,3,0.25)_0%,transparent_22%,transparent_64%,rgba(3,3,3,0.94)_100%)]" />
    </div>
  );
}

function FullHeroSpline() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden">
      <div className="absolute inset-0 h-full w-full translate-x-[2%] translate-y-[0%] scale-[1.12]">
        <Spline
          scene="https://prod.spline.design/X5qh6PjXvK3izWfH/scene.splinecode"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <nav className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between border-b border-white/[0.08] pb-5">
      <a href="#" className="group flex items-center gap-3">
        <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/[0.10] bg-white/[0.045] transition duration-200 group-hover:border-sky-300/40 group-hover:bg-sky-400/[0.07] group-hover:shadow-[0_0_35px_rgba(125,211,252,0.16)]">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.10] via-transparent to-sky-300/[0.08] opacity-70" />
          <img
            src="/images/leadpilot-logo.png"
            alt="LeadOn logo"
            className="relative h-6 w-6 object-contain"
          />
        </div>

        <div className="text-lg font-semibold tracking-[-0.04em] text-white">
          Lead<span className="text-sky-300/80">On</span>
        </div>
      </a>

      <div className="hidden items-center gap-8 text-sm text-white/45 md:flex">
        {["Services", "Work", "Process", "Contact"].map((item) => (
          <a
            key={item}
            className="transition duration-150 hover:text-sky-200"
            href={`#${item.toLowerCase()}`}
          >
            {item}
          </a>
        ))}
      </div>

      <div className="hidden text-sm text-white/35 sm:block">
        Lead systems for trades
      </div>
    </nav>
  );
}

function HeroCopy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="pointer-events-none relative z-20 max-w-[600px]"
    >
      <div className="mb-8 inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/[0.11] bg-white/[0.045] px-4 py-2 text-sm text-white/68 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_60px_rgba(0,0,0,0.22)]">
        <Rocket className="h-3.5 w-3.5 -rotate-45 text-sky-200/80" />

        <span className="bg-gradient-to-r from-white/75 via-white/60 to-white/45 bg-clip-text text-transparent">
          Websites, quote tools & lead systems
        </span>

        <ArrowRight className="h-3.5 w-3.5 text-sky-200/45" />
      </div>

      <h1 className="text-[3.25rem] font-semibold leading-[0.95] tracking-[-0.065em] text-white sm:text-[4.15rem] lg:text-[4.55rem]">
        Websites that turn trades traffic into{" "}
        <span className="bg-gradient-to-r from-white via-sky-200 to-blue-300 bg-clip-text text-transparent">
          leads.
        </span>
      </h1>

      <p className="mt-7 max-w-[33rem] text-[1.03rem] leading-8 text-white/52">
        We build premium websites, quote tools, and intake systems that help
        contractors capture serious job requests before the first phone call.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <a
          href="#contact"
          className="pointer-events-auto group rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black shadow-[0_14px_45px_rgba(255,255,255,0.07)] transition-[background-color,box-shadow] duration-300 ease-out hover:bg-sky-50 hover:shadow-[0_16px_55px_rgba(125,211,252,0.16)]"
        >
          Book free review
          <ArrowRight className="ml-2 inline h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
        </a>

        <a
          href="#process"
          className="pointer-events-auto group rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-3.5 text-sm font-semibold text-white/58 transition-[background-color,border-color,color] duration-300 ease-out hover:border-sky-300/25 hover:bg-sky-400/[0.06] hover:text-sky-100"
        >
          See the process
          <ArrowRight className="ml-2 inline h-4 w-4 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-x-0.5 group-hover:opacity-100" />
        </a>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        {["Custom websites", "Quote tools", "Lead automations"].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-white/38">
            <CheckCircle2 className="h-4 w-4 text-sky-200/35" />
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function WhatWeBuild() {
  const [activeId, setActiveId] = useState(buildItems[0].id);
  const activeItem =
    buildItems.find((item) => item.id === activeId) ?? buildItems[0];
  const ActiveIcon = activeItem.icon;

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#030303] px-6 pb-24 pt-20 text-white lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 z-10 h-[18vh] bg-gradient-to-b from-[#030303] via-[#030303]/58 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_5%,rgba(56,189,248,0.035),transparent_32%),radial-gradient(circle_at_82%_70%,rgba(37,99,235,0.03),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.012] [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:4px_4px]" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.026] px-4 py-2 text-sm text-white/48 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <Rocket className="h-3.5 w-3.5 -rotate-45 text-sky-200/70" />
            What We Build
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
            Lead systems disguised as{" "}
            <span className="bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
              beautiful websites.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/48">
            We redesign the parts of your website that actually turn visitors
            into customers: the first impression, the quote flow, the intake
            process, and the follow-up system.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {buildItems.map((item, index) => {
            const isActive = item.id === activeId;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`group relative h-[160px] transform-gpu overflow-hidden rounded-[1.5rem] border p-5 text-left transition-[transform,border-color,box-shadow,background-color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] will-change-transform hover:-translate-y-0.5 ${
                  isActive
                    ? "border-sky-200/34 bg-[#050913] shadow-[0_18px_50px_rgba(56,189,248,0.10)]"
                    : "border-white/[0.06] bg-white/[0.018] shadow-[0_14px_34px_rgba(0,0,0,0.28)] hover:border-white/[0.11] hover:bg-white/[0.028]"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(150deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.008)_42%,transparent_100%)]" />

                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-[72%] transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-35"
                  }`}
                  style={{
                    background:
                      "radial-gradient(circle at 50% 100%, rgba(125,211,252,0.20), rgba(37,99,235,0.10) 38%, transparent 76%)",
                  }}
                />

                <div
                  className={`pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-100/70 to-transparent transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                  }`}
                />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`grid h-8 w-8 place-items-center rounded-xl border transition-colors duration-500 ${
                          isActive
                            ? "border-sky-200/26 bg-sky-400/[0.08] text-sky-100"
                            : "border-white/[0.08] bg-white/[0.025] text-white/32 group-hover:text-white/48"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <p
                        className={`text-[10px] uppercase tracking-[0.22em] transition-colors duration-500 ${
                          isActive ? "text-sky-100/58" : "text-white/30"
                        }`}
                      >
                        {item.eyebrow}
                      </p>
                    </div>

                    <span
                      className={`text-xs transition-colors duration-500 ${
                        isActive ? "text-sky-100/36" : "text-white/14"
                      }`}
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-[1.08rem] font-semibold leading-tight tracking-[-0.04em] text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-5 text-white/40">
                      {item.short}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-[1.85rem] border border-white/[0.08] bg-[#05070d] shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
          <div className="relative min-h-[315px] overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/gradient.JPG')] bg-cover bg-center opacity-55" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.93)_0%,rgba(0,0,0,0.78)_46%,rgba(0,0,0,0.52)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_52%,rgba(56,189,248,0.08),transparent_34%)]" />

            <div className="relative z-10 grid min-h-[315px] gap-6 p-6 lg:grid-cols-[1fr_0.82fr] lg:p-7">
              <div className="flex flex-col justify-between">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/[0.09] bg-white/[0.035]">
                      <ActiveIcon className="h-[18px] w-[18px] text-sky-100/82" />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-sky-100/50">
                        Selected system
                      </p>
                      <h3 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-white sm:text-3xl">
                        {activeItem.title}
                      </h3>
                    </div>
                  </div>

                  <p className="max-w-2xl text-[0.96rem] leading-7 text-white/60">
                    {activeItem.detail}
                  </p>

                  <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {activeItem.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="flex items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-black/18 px-3.5 py-2.5 text-sm text-white/52"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-sky-100/62" />
                        {bullet}
                      </div>
                    ))}
                  </div>
                </div>

                <button className="group mt-6 w-fit rounded-full bg-white px-[18px] py-2.5 text-sm font-semibold text-black shadow-[0_12px_34px_rgba(255,255,255,0.06)] transition-[background-color,box-shadow] duration-300 ease-out hover:bg-sky-50 hover:shadow-[0_16px_45px_rgba(125,211,252,0.13)]">
                  Learn more
                  <ArrowRight className="ml-2 inline h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                </button>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="pointer-events-none absolute inset-8 rounded-full bg-sky-400/[0.045] blur-3xl" />

                <div className="relative w-full max-w-[320px] rounded-[1.65rem] border border-white/[0.10] bg-black/30 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-2.5 w-24 rounded-full bg-white/18" />
                    <div className="h-7 w-7 rounded-full border border-sky-300/22 bg-sky-300/12" />
                  </div>

                  {activeItem.id === "quote" ? (
                    <PreviewQuote />
                  ) : activeItem.id === "email" ? (
                    <PreviewEmail />
                  ) : activeItem.id === "proof" ? (
                    <PreviewGallery />
                  ) : activeItem.id === "seo" ? (
                    <PreviewSeo />
                  ) : activeItem.id === "intake" ? (
                    <PreviewIntake />
                  ) : (
                    <PreviewWebsite />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectedWork() {
  const [active, setActive] = useState(0);
  const activeItem = workItems[active];

  const goNext = () => setActive((current) => (current + 1) % workItems.length);
  const goPrev = () =>
    setActive((current) => (current - 1 + workItems.length) % workItems.length);

  const getOffset = (index: number) => {
    let offset = index - active;

    if (offset > workItems.length / 2) offset -= workItems.length;
    if (offset < -workItems.length / 2) offset += workItems.length;

    return offset;
  };

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-[#030303] px-6 py-28 text-white lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(56,189,248,0.09),transparent_34%),radial-gradient(circle_at_18%_72%,rgba(37,99,235,0.075),transparent_34%),radial-gradient(circle_at_82%_76%,rgba(125,211,252,0.055),transparent_36%)]" />
        <div className="absolute inset-0 opacity-[0.013] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:4px_4px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <h2 className="max-w-2xl tracking-[-0.065em]">
              <span className="block text-3xl font-light text-white/48 sm:text-4xl">
                Our
              </span>
              <span className="block text-6xl font-semibold leading-[0.9] text-sky-200 sm:text-7xl lg:text-8xl">
                Projects
              </span>
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-white/52 lg:justify-self-end">
            Website builds and lead-system demos showing how modern design,
            quote flows, intake forms, and proof sections come together for
            service businesses that need more than a pretty homepage.
          </p>
        </div>

        <div className="relative mx-auto h-[600px] max-w-6xl overflow-visible [perspective:1500px]">
          <div className="pointer-events-none absolute inset-x-20 top-1/2 h-40 -translate-y-1/2 rounded-full bg-sky-400/[0.09] blur-[85px]" />

          <div className="absolute left-1/2 top-1/2 h-[520px] w-full max-w-[820px] -translate-x-1/2 -translate-y-1/2">
            {workItems.map((item, index) => {
              const offset = getOffset(index);
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;
              const isNear = absOffset === 1;
              const isVisible = absOffset <= 1;

              const x = offset * 265;
              const rotateY = offset * -14;
              const rotateZ = offset * -1.7;
              const scale = isActive ? 1 : 0.8;
              const opacity = isActive ? 1 : isNear ? 0.36 : 0;
              const zIndex = isActive ? 40 : isNear ? 20 : 5;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (!isActive) setActive(index);
                  }}
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${x}px)`,
                    y: "-50%",
                    scale,
                    rotateY,
                    rotateZ,
                    opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 105,
                    damping: 24,
                    mass: 0.95,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    pointerEvents: isVisible ? "auto" : "none",
                    zIndex,
                  }}
                  className={`group absolute left-1/2 top-1/2 w-[760px] transform-gpu overflow-hidden rounded-[2.25rem] border bg-[#05070d] text-left shadow-[0_36px_105px_rgba(0,0,0,0.66)] will-change-transform [backface-visibility:hidden] ${
                    isActive ? "border-sky-200/32" : "border-white/[0.08]"
                  }`}
                >
                  <div className="absolute inset-0 z-0 rounded-[2.25rem] bg-[#05070d]" />

                  <div className="pointer-events-none absolute inset-0 z-30 rounded-[2.25rem] bg-gradient-to-br from-white/[0.08] via-transparent to-sky-300/[0.06]" />

                  <div className="relative z-20 flex items-center justify-between border-b border-white/[0.08] bg-black/80 px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-400/70" />
                      <span className="h-3 w-3 rounded-full bg-yellow-300/70" />
                      <span className="h-3 w-3 rounded-full bg-green-400/70" />
                    </div>

                    <div className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-white/45">
                      {item.status}
                    </div>
                  </div>

                  <div className="relative z-10 h-[470px] overflow-hidden bg-[#05070d]">
                    <img
                      src={item.image}
                      alt={`${item.title} website showcase`}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className={`block w-full transform-gpu object-cover object-top transition-transform duration-[2600ms] ease-[cubic-bezier(.16,1,.3,1)] ${
                        isActive
                          ? "h-[1050px] group-hover:-translate-y-[47%]"
                          : "h-[760px]"
                      }`}
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-black via-black/70 to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5 z-30 flex flex-wrap items-center gap-2">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.10] bg-black/60 px-3 py-1.5 text-xs text-white/70 backdrop-blur-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-50 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/[0.10] bg-white/[0.04] text-white/65 transition duration-200 hover:border-sky-200/30 hover:bg-sky-400/[0.08] hover:text-sky-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 z-50 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/[0.10] bg-white/[0.04] text-white/65 transition duration-200 hover:border-sky-200/30 hover:bg-sky-400/[0.08] hover:text-sky-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="transform-gpu rounded-[2rem] border border-white/[0.09] bg-white/[0.035] p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-full border border-sky-200/20 bg-sky-400/[0.08] px-3 py-1 text-xs uppercase tracking-[0.18em] text-sky-100/70">
                  {activeItem.industry}
                </span>
                <span className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/38">
                  {activeItem.status}
                </span>
              </div>

              <h3 className="text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl">
                {activeItem.title}
              </h3>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/56">
                {activeItem.description}
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {activeItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] bg-black/18 px-3 py-1.5 text-xs text-white/48"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const timelineTrackRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: timelineTrackRef,
    offset: ["start 60%", "end 60%"],
  });

  const rawLineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineScale = useSpring(rawLineScale, {
    stiffness: 110,
    damping: 30,
    mass: 0.55,
  });

  const steps = [
    {
      number: "01",
      title: "Audit",
      label: "Review the current site",
      text:
        "We look through the existing website, mobile layout, service pages, quote flow, calls-to-action, and overall first impression. The goal is to find where customers are getting confused, losing trust, or failing to take the next step.",
    },
    {
      number: "02",
      title: "Map",
      label: "Plan the lead system",
      text:
        "We decide what the business actually needs to turn visitors into better leads. That might be a redesign, quote tool, intake form, lead email, project gallery, service-area section, booking flow, seasonal offer, or a cleaner path from landing page to contact.",
    },
    {
      number: "03",
      title: "Design",
      label: "Shape the customer path",
      text:
        "We design around how real customers make decisions. What do they need to see first? What proof makes them trust the business? What details should they submit before the owner calls back? The site gets structured around that path instead of just looking pretty.",
    },
    {
      number: "04",
      title: "Build",
      label: "Code it custom",
      text:
        "We custom-code the front end and back end instead of forcing the business into a boxed website-builder template. That gives the site room for custom forms, quote logic, automated emails, lead summaries, service-specific flows, and features that basic builders usually cannot handle cleanly.",
    },
    {
      number: "05",
      title: "Launch",
      label: "Go live cleanly",
      text:
        "You can keep your existing domain. We connect the rebuilt site, forms, lead emails, hosting, and launch setup so the switch feels clean instead of technical. The goal is simple: the business gets a better website without getting buried in backend nonsense.",
    },
  ];

  const whyItems = [
    {
      title: "Custom-coded, not boxed in",
      text:
        "We build the front end and back end ourselves, so the site is not trapped inside a generic Wix, Squarespace, or WordPress template. If the business needs a quote flow, intake form, automated email, custom service logic, or a feature specific to how they sell, we can build around it.",
    },
    {
      title: "Built around how you quote",
      text:
        "Most websites collect vague contact messages. We can build tools around real pricing factors, service options, add-ons, location rules, job details, and customer inputs so owners get cleaner leads instead of chasing basic information.",
    },
    {
      title: "Launch handled cleanly",
      text:
        "You can keep your existing domain. We handle the rebuild, forms, lead emails, hosting setup, and launch connection so the business gets the upgrade without getting dragged into the technical mess.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let bestIndex = activeStep;
        let bestRatio = 0;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.getAttribute("data-step-index"));

          if (!Number.isNaN(index) && entry.intersectionRatio > bestRatio) {
            bestIndex = index;
            bestRatio = entry.intersectionRatio;
          }
        });

        setActiveStep((current) => (current === bestIndex ? current : bestIndex));
      },
      {
        threshold: [0.35, 0.5, 0.65],
        rootMargin: "-38% 0px -38% 0px",
      }
    );

    const refs = stepRefs.current;

    refs.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => {
      refs.forEach((step) => {
        if (step) observer.unobserve(step);
      });
    };
  }, [activeStep]);

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#030303] px-6 py-24 text-white lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#030303]" />

        <div className="absolute right-[-20%] top-[-12%] h-[760px] w-[980px] rounded-full bg-sky-300/[0.14] blur-[90px]" />
        <div className="absolute right-[2%] top-[12%] h-[520px] w-[760px] rounded-full bg-blue-500/[0.08] blur-[82px]" />
        <div className="absolute right-[-4%] top-[18%] h-[640px] w-[720px] bg-[radial-gradient(circle_at_70%_10%,rgba(186,245,255,0.10),rgba(56,189,248,0.06)_32%,transparent_70%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(3,3,3,1)_0%,rgba(3,3,3,0.95)_42%,rgba(3,3,3,0.62)_100%)]" />

        <div className="absolute inset-0 opacity-[0.012] [background-image:radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:4px_4px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.28em] text-sky-100/60">
            Our process
          </p>

          <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.06em] text-white sm:text-5xl lg:text-[4rem]">
            From old site to{" "}
            <span className="bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
              lead system.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/50">
            A simple rebuild process designed to keep the owner out of the
            technical mess.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl">
          <div ref={timelineTrackRef} className="relative">
            <div className="pointer-events-none absolute left-1/2 top-[44px] hidden h-[calc(100%-88px)] w-px -translate-x-1/2 bg-white/[0.10] md:block" />

            <motion.div
              style={{ scaleY: lineScale, transformOrigin: "top" }}
              className="pointer-events-none absolute left-1/2 top-[44px] hidden h-[calc(100%-88px)] w-[2px] -translate-x-1/2 transform-gpu rounded-full bg-gradient-to-b from-sky-100 via-sky-300 to-blue-500 will-change-transform md:block"
            />

            <div className="space-y-10 md:space-y-0">
              {steps.map((step, index) => {
                const leftSide = index % 2 === 0;
                const isActive = index === activeStep;
                const isPast = index < activeStep;

                return (
                  <div
                    key={step.number}
                    ref={(element) => {
                      stepRefs.current[index] = element;
                    }}
                    data-step-index={index}
                    className="relative grid min-h-[210px] gap-6 md:grid-cols-[1fr_96px_1fr] md:gap-0"
                  >
                    <div
                      className={`flex items-center ${
                        leftSide
                          ? "md:justify-end md:pr-10"
                          : "md:col-start-3 md:pl-10"
                      }`}
                    >
                      <div className="max-w-md">
                        <p
                          className={`mb-3 text-xs uppercase tracking-[0.24em] transition-colors duration-300 ${
                            isActive
                              ? "text-sky-100/80"
                              : isPast
                              ? "text-sky-100/50"
                              : "text-white/28"
                          }`}
                        >
                          {step.number}
                        </p>

                        <h3
                          className={`text-4xl font-semibold tracking-[-0.065em] transition-colors duration-300 sm:text-5xl ${
                            isActive
                              ? "text-sky-200"
                              : isPast
                              ? "text-sky-100/55"
                              : "text-white/38"
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <div className="absolute left-0 top-[34px] flex items-center md:static md:col-start-2 md:row-start-1 md:justify-center">
                      <div
                        className={`relative z-10 grid h-11 w-11 place-items-center rounded-full border bg-[#030303] transition-[border-color,background-color] duration-300 ${
                          isActive
                            ? "border-sky-200/55 bg-sky-400/[0.055]"
                            : isPast
                            ? "border-sky-200/30 bg-sky-400/[0.025]"
                            : "border-white/[0.12]"
                        }`}
                      >
                        <div
                          className={`rounded-full transition-[height,width,background-color] duration-300 ${
                            isActive
                              ? "h-3 w-3 bg-sky-100"
                              : isPast
                              ? "h-2.5 w-2.5 bg-sky-200/80"
                              : "h-2.5 w-2.5 bg-white/32"
                          }`}
                        />
                      </div>
                    </div>

                    <div
                      className={`flex items-center pl-16 md:pl-0 ${
                        leftSide
                          ? "md:col-start-3 md:pl-10"
                          : "md:col-start-1 md:row-start-1 md:justify-end md:pr-10"
                      }`}
                    >
                      <div
                        className={`relative max-w-md overflow-hidden rounded-[1.7rem] border p-6 transition-[border-color,background-color] duration-300 ${
                          isActive
                            ? "border-sky-200/20 bg-sky-400/[0.05]"
                            : isPast
                            ? "border-sky-200/[0.09] bg-white/[0.023]"
                            : "border-white/[0.06] bg-white/[0.016]"
                        }`}
                      >
                        <div
                          className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(125,211,252,0.11),transparent_45%)] transition-opacity duration-300 ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                        />

                        <div className="relative z-10">
                          <h4
                            className={`text-xl font-semibold tracking-[-0.045em] transition-colors duration-300 ${
                              isActive ? "text-white" : "text-white/78"
                            }`}
                          >
                            {step.label}
                          </h4>

                          <p
                            className={`mt-4 text-sm leading-7 transition-colors duration-300 ${
                              isActive ? "text-white/66" : "text-white/44"
                            }`}
                          >
                            {step.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-14 overflow-hidden rounded-[2.25rem] border border-white/[0.09] bg-[#05070d] shadow-[0_30px_90px_rgba(0,0,0,0.44),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/gradient2.JPG')] bg-cover bg-center opacity-70" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.74)_48%,rgba(0,0,0,0.48)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_42%,rgba(125,211,252,0.13),transparent_34%)]" />

              <div className="relative z-10 grid gap-7 p-6 sm:p-8 lg:grid-cols-[0.32fr_1.68fr] lg:items-stretch lg:p-9">
                <div className="relative hidden min-h-[360px] items-center justify-center lg:flex">
                  <div className="absolute inset-y-4 right-0 w-px bg-gradient-to-b from-transparent via-white/[0.10] to-transparent" />

                  <div className="-rotate-90 whitespace-nowrap text-[4.6rem] font-semibold leading-none tracking-[-0.075em] text-white/[0.18]">
                    Why LeadOn
                  </div>
                </div>

                <div className="lg:hidden">
                  <h3 className="text-4xl font-semibold tracking-[-0.06em] text-white/78">
                    Why LeadOn
                  </h3>
                </div>

                <div className="grid gap-3">
                  {whyItems.map((item, index) => (
                    <div
                      key={item.title}
                      className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.075] bg-black/28 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_40%,rgba(56,189,248,0.055))]" />

                      <div className="relative z-10 flex gap-4">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-sky-200/18 bg-sky-400/[0.09] text-xs font-semibold text-sky-100/80">
                          0{index + 1}
                        </div>

                        <div>
                          <h4 className="text-base font-semibold tracking-[-0.035em] text-white">
                            {item.title}
                          </h4>

                          <p className="mt-2 text-sm leading-6 text-white/52">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    contact: "",
    website: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Form failed to send.");
      }

      setStatus("success");
      setFormData({
        name: "",
        business: "",
        contact: "",
        website: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#030303] px-6 pb-32 pt-12 text-white lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(56,189,248,0.08),transparent_34%),radial-gradient(circle_at_85%_70%,rgba(37,99,235,0.06),transparent_35%)]" />
        <div className="absolute inset-0 opacity-[0.012] [background-image:radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:4px_4px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/[0.09] bg-white/[0.026] shadow-[0_35px_110px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative overflow-hidden p-8 sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.055)_0%,transparent_40%,rgba(56,189,248,0.08)_100%)]" />

              <div className="relative z-10">
                <div className="mb-7 flex items-center gap-3">
                  <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.10] bg-white/[0.045] shadow-[0_18px_55px_rgba(0,0,0,0.20)]">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.10] via-transparent to-sky-300/[0.08] opacity-70" />
                    <img
                      src="/images/leadpilot-logo.png"
                      alt="LeadOn logo"
                      className="relative h-7 w-7 object-contain"
                    />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-sky-100/58">
                      Contact
                    </p>
                    <p className="mt-1 text-sm text-white/35">
                      LeadOn site review
                    </p>
                  </div>
                </div>

                <h2 className="max-w-2xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
                  Ready to{" "}
                  <span className="bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
                    revamp your site?
                  </span>
                </h2>

                <p className="mt-7 max-w-xl text-base leading-8 text-white/52">
                  Send us your current website and what you want improved. We’ll
                  review the site, look for missed lead opportunities, and map
                  out what would actually help the business.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    "Free site review",
                    "Custom quote tools",
                    "Lead forms + emails",
                    "Built around your services",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/18 px-4 py-3 text-sm text-white/56"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-100/64" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[1.7rem] border border-sky-200/16 bg-sky-400/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <p className="text-sm font-semibold text-white">
                    Prefer direct contact?
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/48">
                    Call or text this number, or fill out the form and we’ll get
                    back to you.
                  </p>

                  <a
                    href="tel:2043994585"
                    className="mt-4 inline-flex items-center rounded-2xl border border-sky-200/20 bg-black/28 px-5 py-3 text-xl font-semibold tracking-[-0.035em] text-sky-100 shadow-[0_18px_50px_rgba(0,0,0,0.24)] transition hover:border-sky-100/35 hover:bg-sky-400/[0.08] hover:text-white"
                  >
                    204-399-4585
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.08] bg-black/24 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/34">
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition duration-200 placeholder:text-white/25 focus:border-sky-200/28 focus:bg-sky-400/[0.045]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/34">
                      Business
                    </label>
                    <input
                      name="business"
                      type="text"
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="Company name"
                      className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition duration-200 placeholder:text-white/25 focus:border-sky-200/28 focus:bg-sky-400/[0.045]"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/34">
                      Email / Phone
                    </label>
                    <input
                      name="contact"
                      type="text"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="Where should we reach you?"
                      required
                      className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition duration-200 placeholder:text-white/25 focus:border-sky-200/28 focus:bg-sky-400/[0.045]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/34">
                      Current site
                    </label>
                    <input
                      name="website"
                      type="text"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="yourwebsite.com"
                      className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition duration-200 placeholder:text-white/25 focus:border-sky-200/28 focus:bg-sky-400/[0.045]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/34">
                    What do you want improved?
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what feels outdated, what services you sell, and whether you want quote tools, intake forms, automated emails, or a full redesign."
                    required
                    className="w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 text-sm leading-6 text-white outline-none transition duration-200 placeholder:text-white/25 focus:border-sky-200/28 focus:bg-sky-400/[0.045]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative w-full overflow-hidden rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-black shadow-[0_14px_45px_rgba(255,255,255,0.07)] transition-[background-color,box-shadow,opacity] duration-300 ease-out hover:bg-sky-50 hover:shadow-[0_18px_65px_rgba(125,211,252,0.26)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="pointer-events-none absolute inset-y-0 left-[-45%] w-[42%] rotate-12 bg-gradient-to-r from-transparent via-sky-300/55 to-transparent opacity-0 blur-sm transition-all duration-700 ease-out group-hover:left-[110%] group-hover:opacity-100" />
                  <span className="relative z-10">
                    {status === "loading"
                      ? "Sending..."
                      : "Request free site review"}
                    <ArrowRight className="ml-2 inline h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                  </span>
                </button>

                {status === "success" && (
                  <p className="text-center text-sm text-sky-100">
                    Message sent. We’ll get back to you soon.
                  </p>
                )}

                {status === "error" && (
                  <p className="text-center text-sm text-red-300">
                    Something went wrong. Try again or text 204-399-4585.
                  </p>
                )}

                <p className="text-center text-xs leading-5 text-white/32">
                  No spam. No pressure. Just a clear look at what your website
                  could be doing better.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewWebsite() {
  return (
    <div className="space-y-2.5">
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/14" />
            <span className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <div className="h-2 w-14 rounded-full bg-sky-300/25" />
        </div>

        <div className="bg-gradient-to-br from-sky-300/24 via-blue-500/10 to-transparent p-3">
          <div className="h-2 w-20 rounded-full bg-white/32" />
          <div className="mt-3 h-3 w-32 rounded-full bg-white/26" />
          <div className="mt-2 h-2 w-24 rounded-full bg-white/14" />

          <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
            <div className="h-8 rounded-xl bg-white/[0.08]" />
            <div className="h-8 w-16 rounded-xl bg-sky-300/85" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 p-3">
          <div className="h-10 rounded-xl bg-white/[0.08]" />
          <div className="h-10 rounded-xl bg-sky-300/[0.10]" />
          <div className="h-10 rounded-xl bg-white/[0.08]" />
        </div>
      </div>
    </div>
  );
}

function PreviewQuote() {
  return (
    <div className="space-y-2.5">
      {[
        ["Service type", "Deck install"],
        ["Project size", "240 sq ft"],
        ["Timeline", "2–4 weeks"],
      ].map(([label, value]) => (
        <div
          key={label}
          className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.06] px-3 py-2.5"
        >
          <span className="text-xs text-white/45">{label}</span>
          <span className="text-xs font-medium text-white/75">{value}</span>
        </div>
      ))}

      <div className="rounded-xl border border-sky-300/20 bg-sky-400/10 px-3 py-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/55">Estimated range</span>
          <span className="text-sm font-semibold text-sky-100">$7.5k–$9k</span>
        </div>
        <div className="mt-2.5 h-2 rounded-full bg-white/10">
          <div className="h-2 w-[72%] rounded-full bg-sky-300/60" />
        </div>
      </div>

      <div className="rounded-xl bg-sky-300 px-4 py-2.5 text-center text-sm font-semibold text-black">
        Send quote request
      </div>
    </div>
  );
}

function PreviewIntake() {
  return (
    <div className="space-y-2.5">
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.06] p-3.5">
        <p className="text-sm font-semibold text-white">New intake form</p>
        <p className="mt-1 text-xs text-white/45">Pool opening request</p>
      </div>

      {[
        ["Customer name", "Required"],
        ["Location", "Winnipeg"],
        ["Preferred date", "This month"],
        ["Photos", "Attached"],
      ].map(([label, value]) => (
        <div
          key={label}
          className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.05] px-3 py-2.5 text-xs"
        >
          <span className="text-white/48">{label}</span>
          <span className="text-white/70">{value}</span>
        </div>
      ))}
    </div>
  );
}

function PreviewEmail() {
  return (
    <div className="space-y-2.5">
      <div className="rounded-2xl border border-sky-300/20 bg-sky-400/10 p-3.5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-white">New lead received</p>
            <p className="mt-2 text-xs leading-5 text-white/48">
              Deck install • Winnipeg • 2–4 weeks • $8,450 budget
            </p>
          </div>
          <div className="h-7 w-7 rounded-full bg-sky-300/18" />
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-white/[0.05] p-3">
        <p className="text-xs text-white/45">Missing info</p>
        <p className="mt-1 text-xs text-white/70">Gate count + photos</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/[0.06] px-3 py-2.5 text-xs text-white/55">
          Customer
        </div>
        <div className="rounded-xl bg-sky-300 px-3 py-2.5 text-xs font-semibold text-black">
          Reply
        </div>
      </div>
    </div>
  );
}

function PreviewGallery() {
  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-2 gap-2.5">
        <div className="relative h-20 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.10] to-sky-300/[0.08]">
          <div className="absolute bottom-2 left-2 h-2 w-14 rounded-full bg-white/18" />
        </div>

        <div className="relative h-20 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-sky-300/[0.18] to-blue-500/[0.08]">
          <div className="absolute bottom-2 left-2 h-2 w-16 rounded-full bg-sky-100/22" />
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-white/70">
            Cedar fence install
          </p>
          <p className="text-xs text-sky-100/70">Before / After</p>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          <div className="h-8 rounded-lg bg-white/[0.07]" />
          <div className="h-8 rounded-lg bg-sky-300/[0.10]" />
          <div className="h-8 rounded-lg bg-blue-400/[0.12]" />
          <div className="h-8 rounded-lg bg-white/[0.07]" />
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl bg-black/18 px-3 py-2">
          <span className="text-xs text-white/45">4 project photos</span>
          <span className="text-xs text-sky-100/70">View</span>
        </div>
      </div>
    </div>
  );
}

function PreviewSeo() {
  return (
    <div className="space-y-2.5">
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.06] p-3.5">
        <p className="text-sm font-semibold text-white">Service areas</p>
        <p className="mt-1 text-xs text-white/45">Local visibility map</p>
      </div>

      {["Winnipeg", "Selkirk", "East St. Paul", "St. Clements"].map(
        (item, index) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.05] px-3 py-2.5"
          >
            <span className="text-xs text-white/55">{item}</span>
            <span
              className={`h-2 rounded-full ${
                index === 0 ? "w-12 bg-sky-300" : "w-2 bg-sky-300/70"
              }`}
            />
          </div>
        )
      )}
    </div>
  );
}
