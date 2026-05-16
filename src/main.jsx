import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Home,
  MapPin,
  Phone,
  Mail,
  Star,
  ArrowRight,
  Award,
  Handshake,
  Users,
  TrendingUp,
  Menu,
  CheckCircle,
  Megaphone,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BRAND_GOLD = "#C6A15B";
const BRAND_SAGE = "#7B8070";
const LOGO_SRC = "/images/menendez-logo-gold.png";
const FOOTER_LOGO_SRC = "/images/menendez-logo-secondary-white.png";
const KW_ANTELOPE_VALLEY_LOGO_SRC = "/images/kw-antelope-valley-logo.jpg";
const CEO_IMAGE_SRC = "/images/silvia-garcia.avif";
const ALEX_IMAGE_SRC = "/images/alex-menendez.png";
const RELATIONSHIPS_IMAGE_SRC = "/images/buyer-presentation-doorway.png";

// Backward-compatible aliases so older sections keep working without redeclaration errors.
const gold = BRAND_GOLD;
const sage = BRAND_SAGE;
const logo = LOGO_SRC;
const ceoImage = CEO_IMAGE_SRC;

const pages = ["Home", "About", "Buyers", "Sellers", "Listings", "Testimonials", "Contact"];
const pageSlugs = {
  Home: "/",
  About: "/about",
  Buyers: "/buyers",
  Sellers: "/sellers",
  Listings: "/listings",
  Testimonials: "/testimonials",
  Contact: "/contact",
};
const pagesBySlug = Object.fromEntries(Object.entries(pageSlugs).map(([page, slug]) => [slug, page]));

function normalizePath(pathname) {
  const path = `/${String(pathname || "").replace(/^\/+|\/+$/g, "")}`;
  return path === "/" ? "/" : path.toLowerCase();
}

function getPageFromPath(pathname) {
  return pagesBySlug[normalizePath(pathname)] || "Home";
}

function getSlugForPage(page) {
  return pageSlugs[page] || "/";
}

const listings = [
  {
    price: "$2,895,000",
    address: "12345 Encino Ave",
    location: "Encino, CA 91436",
    details: "5 BD  |  4.5 BA  |  4,200 SQ FT",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop",
  },
  {
    price: "$1,695,000",
    address: "4521 Woodley Ave",
    location: "Sherman Oaks, CA 91403",
    details: "4 BD  |  3 BA  |  2,800 SQ FT",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    price: "$3,250,000",
    address: "11600 Dona Pepita Dr",
    location: "Studio City, CA 91604",
    details: "6 BD  |  6 BA  |  5,100 SQ FT",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function runDevelopmentChecks() {
  if (typeof console === "undefined") return;
  console.assert(pages.length === 7, "Expected seven pages.");
  console.assert(listings.length >= 3, "Expected at least three listing cards.");
  console.assert(Boolean(LOGO_SRC && CEO_IMAGE_SRC), "Expected brand asset paths.");
  console.assert(pages.includes("Contact"), "Expected Contact page.");
  console.assert(typeof HeroTicker === "function", "Expected HeroTicker component.");
}

function GoldMotionCTA({ children, onClick, dark = false, className = "" }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.03, boxShadow: "0 18px 38px rgba(198,161,91,.35)" }}
      whileTap={{ scale: 0.97 }}
      className={`relative overflow-hidden px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] ${dark ? "text-neutral-900" : "text-black"} ${className}`}
      style={{
        background: dark ? "rgba(255,255,255,0.45)" : `linear-gradient(135deg, ${BRAND_GOLD}, #f1d38a, ${BRAND_GOLD})`,
        border: dark ? `1px solid ${BRAND_GOLD}` : "none",
      }}
    >
      <motion.span
        className="pointer-events-none absolute top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-white/50 blur-2xl"
        initial={{ left: "-35%", opacity: 0 }}
        animate={{ left: ["-35%", "45%", "135%"], opacity: [0, 0.75, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.8, ease: "easeInOut" }}
      />
      <span className="relative inline-flex items-center gap-3">
        {children} <ArrowRight size={16} />
      </span>
    </motion.button>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="mb-12 text-center">
      {eyebrow && <p className="mb-3 text-xs uppercase tracking-[0.35em]" style={{ color: BRAND_GOLD }}>{eyebrow}</p>}
      <h2 className="font-serif text-4xl leading-tight text-neutral-950 md:text-5xl">{title}</h2>
      <div className="mx-auto mt-5 h-px w-28" style={{ backgroundColor: BRAND_GOLD }} />
      {text && <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">{text}</p>}
    </div>
  );
}

function Nav({ page, setPage }) {
  const handleNavClick = (event, item) => {
    event.preventDefault();
    setPage(item);
  };

  return (
    <header
      className="sticky top-0 z-50 overflow-hidden border-b border-[#7B8070]/15 backdrop-blur-[32px] backdrop-saturate-150 shadow-[0_10px_35px_rgba(66,67,64,0.12)]"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.82)" }}
    >
      <div className="absolute inset-0 bg-[#7B8070]/[0.035]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/80" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[#7B8070]/20" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href={getSlugForPage("Home")} onClick={(event) => handleNavClick(event, "Home")} className="text-left">
          <img src={LOGO_SRC} alt="Menendez Realty Group Logo" className="h-20 w-auto object-contain" />
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {pages.map((item) => (
            <a
              key={item}
              href={getSlugForPage(item)}
              onClick={(event) => handleNavClick(event, item)}
              className={`text-xs font-semibold uppercase tracking-[0.2em] transition ${page === item ? "text-[#C6A15B]" : "text-[#424340]/85 hover:text-[#C6A15B]"}`}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden xl:block">
            <GoldMotionCTA onClick={() => setPage("Contact")} className="px-6 py-3 text-[11px]">
              Book A Consultation
            </GoldMotionCTA>
          </div>
          <button type="button" className="lg:hidden text-[#424340]"><Menu /></button>
        </div>
      </div>
    </header>
  );
}

function PageHero({ title, subtitle, children, image = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1800&auto=format&fit=crop" }) {
  return (
    <section className="relative overflow-hidden px-6 py-28 text-center text-neutral-950">
      <img src={image} className="absolute inset-0 h-full w-full object-cover" alt="Luxury home" />
      <div className="absolute inset-0 bg-white/75" />
      <div className="absolute inset-0 bg-[#f8f6f1]/30" />
      <motion.div className="relative mx-auto max-w-4xl" variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.7 }}>
        <p className="mb-4 text-xs uppercase tracking-[0.45em]" style={{ color: BRAND_GOLD }}>Menendez Realty Group</p>
        <h1 className="font-serif text-5xl leading-tight md:text-7xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-700">{subtitle}</p>
        {children}
      </motion.div>
    </section>
  );
}

function BulletList({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3">
          <CheckCircle className="mt-1 shrink-0" size={18} style={{ color: gold }} />
          <p className="text-neutral-700">{item}</p>
        </div>
      ))}
    </div>
  );
}

function HeroTicker() {
  const keywords = [
    "Antelope Valley Experts",
    "Buyer Guidance",
    "Seller Strategy",
    "Clear Communication",
    "Local Market Knowledge",
    "Professional Marketing",
    "Trusted Representation",
    "Smooth Closings",
  ];
  const tickerItems = [...keywords, ...keywords, ...keywords];

  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-y border-[#7B8070]/20 bg-white/75 py-4 backdrop-blur-xl">
      <motion.div
        className="flex w-max items-center gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      >
        {tickerItems.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-8">
            <span className="text-sm font-bold uppercase tracking-[0.28em] text-[#424340]">{item}</span>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: gold }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function PropertyCard({ item }) {
  return (
    <div className="group border border-neutral-200 bg-white shadow-sm">
      <div className="overflow-hidden">
        <img src={item.image} className="h-72 w-full object-cover transition duration-700 group-hover:scale-105" alt={item.address} />
      </div>
      <div className="p-6">
        <p className="font-serif text-2xl" style={{ color: gold }}>{item.price}</p>
        <p className="mt-3 text-neutral-950">{item.address}</p>
        <p className="text-sm text-neutral-500">{item.location}</p>
        <p className="mt-5 text-xs uppercase tracking-[0.18em] text-neutral-600">{item.details}</p>
        <button type="button" className="mt-6 w-full border py-4 text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 transition hover:bg-[#C6A15B] hover:text-black" style={{ borderColor: gold }}>
          View Property
        </button>
      </div>
    </div>
  );
}

function HomePage({ setPage }) {
  return (
    <>
      <section className="relative overflow-hidden bg-white pb-16 text-neutral-950 md:min-h-[88svh]">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1727271173705-c9c6fad3acbb?q=80&w=2200&auto=format&fit=crop" className="h-full w-full object-cover object-[58%_center] opacity-45" alt="Farmhouse chic living room interior decor" />
          <div className="absolute inset-0 bg-white/72" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/32" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/88" />
        </div>
        <div className="relative mx-auto grid min-h-[calc(88svh-4rem)] max-w-7xl items-center gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(380px,.9fr)] lg:gap-16 lg:py-24">
          <motion.div className="max-w-3xl" variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.8 }}>
            <h1 className="max-w-4xl text-[clamp(2.15rem,9.4vw,2.8rem)] font-medium leading-[1.12] tracking-[-0.04em] text-neutral-950 md:text-[4.25rem]">
              <span className="block whitespace-nowrap">Trusted Real Estate</span>
              <span className="block whitespace-nowrap">Guidance Across</span>
              <span className="block whitespace-nowrap">the Antelope Valley</span>
            </h1>
            <h2
              className="mt-7 max-w-3xl text-2xl leading-relaxed text-[#2f302e] md:text-3xl"
            >
              Helping Buyers, Sellers & Families Move Forward With Confidence
            </h2>
            <div className="mt-9 max-w-3xl space-y-5">
              <p className="text-base leading-8 text-neutral-700 md:text-lg">At Menendez Realty Group, we believe real estate is more than a transaction - it's a major life decision. Whether you're buying your first home, upgrading for your growing family, downsizing, or preparing to sell for top dollar, our team is committed to guiding you every step of the way with honesty, communication, and strategy.</p>
              <p className="max-w-2xl text-base leading-8 text-neutral-700 md:text-lg">Led by REALTORS&reg; Silvia Garcia and Alex Menendez, our mission is to create a smooth, stress-free experience while protecting your best interests from consultation to closing.</p>
              <p className="text-base font-bold leading-7 text-neutral-950 md:text-lg">Your goals become our priority from day one.</p>
            </div>
            <div className="mt-11 grid max-w-2xl grid-cols-2 gap-3 sm:gap-4">
              <GoldMotionCTA onClick={() => setPage("Buyers")} className="!px-3 !py-3 text-[9px] tracking-[0.14em] shadow-[0_18px_45px_rgba(198,161,91,.24)] sm:!px-8 sm:!py-4 sm:text-xs sm:tracking-[0.22em]">Start Your Home Search</GoldMotionCTA>
              <GoldMotionCTA onClick={() => setPage("Contact")} dark className="!px-3 !py-3 bg-white/80 text-[9px] tracking-[0.14em] shadow-[0_18px_45px_rgba(123,128,112,.16)] backdrop-blur sm:!px-8 sm:!py-4 sm:text-xs sm:tracking-[0.22em]">Schedule A Consultation</GoldMotionCTA>
            </div>
          </motion.div>
          <motion.div
            className="relative hidden min-h-[700px] lg:block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <div className="absolute right-0 top-1/2 h-[640px] w-[94%] -translate-y-[48%] border border-[#C6A15B]" />
            <div className="absolute right-5 top-1/2 h-[620px] w-[94%] -translate-y-1/2 overflow-hidden shadow-[0_30px_80px_rgba(66,67,64,.16)]">
              <img src={ceoImage} className="h-full w-full origin-top scale-105 object-cover object-[center_top]" alt="Silvia Garcia" />
            </div>
          </motion.div>
        </div>
        <HeroTicker />
      </section>

      <section className="bg-[#fbfaf7] px-6 py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-full w-full border" style={{ borderColor: gold }} />
            <img src={RELATIONSHIPS_IMAGE_SRC} className="relative h-[620px] w-full bg-white object-contain object-center" alt="Silvia Garcia standing in a doorway" />
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em]" style={{ color: gold }}>Introduction</p>
            <h2 className="font-serif text-5xl leading-tight text-neutral-950">Real Estate Built on Relationships, Integrity & Results</h2>
            <p className="mt-8 text-lg leading-8 text-neutral-700">At Menendez Realty Group, we are proud to serve buyers and sellers throughout the Antelope Valley and surrounding communities with exceptional service and personalized support.</p>
            <p className="mt-5 text-lg leading-8 text-neutral-700">We understand that every client's situation is different. Some buyers need education and guidance through their first purchase. Some sellers want maximum exposure and aggressive marketing. Others simply want a team they can trust to communicate clearly and handle the details professionally.</p>
            <p className="mt-5 text-lg font-semibold text-neutral-900">That's exactly what we provide.</p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {[
                "Strong communication",
                "Local market knowledge",
                "Strategic negotiation",
                "Professional marketing",
                "Organized transaction management",
                "Honest guidance from start to finish",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 shrink-0" size={18} style={{ color: gold }} />
                  <p className="text-neutral-700">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg leading-8 text-neutral-700">When you work with our team, you are never navigating the process alone.</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Featured Services" title="How We Help Our Clients" />
          <div className="grid gap-8 lg:grid-cols-2">
            <ServiceCard
              title="Buyers"
              text="From first-time buyers to growing families, we help you navigate the home buying process with clarity and confidence."
              bullets={["Personalized home search", "Neighborhood guidance", "Offer strategy", "Negotiation support", "Contract-to-close guidance", "Trusted lender recommendations"]}
              button="Explore Buyer Services"
              onClick={() => setPage("Buyers")}
            />
            <ServiceCard
              title="Sellers"
              text="We create customized marketing strategies designed to maximize exposure, attract qualified buyers, and help you sell with confidence."
              bullets={["Professional marketing", "Strategic pricing guidance", "Open house coordination", "Social media exposure", "Negotiation management", "Full transaction support"]}
              button="Explore Seller Services"
              onClick={() => setPage("Sellers")}
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-28" style={{ backgroundColor: "rgba(123,128,112,0.10)" }}>
        <div className="mx-auto max-w-5xl text-center">
          <SectionTitle eyebrow="Our Mission" title="Guidance Rooted In Integrity & Excellence" />
          <p className="text-xl leading-9 text-neutral-700">At Menendez Realty Group, our mission is to provide every client with exceptional service, honest guidance, and strategic representation throughout the real estate process.</p>
          <p className="mt-6 text-xl leading-9 text-neutral-700">We are committed to creating a smooth and stress-free experience through clear communication, strong organization, and professional support. Our goal is to protect our clients' best interests while delivering results with integrity, dedication, and excellence.</p>
        </div>
      </section>

      <MissionShapeDivider />
      <WhyChoose />
      <TestimonialsPreview setPage={setPage} />

      <section className="bg-[#fbfaf7] px-6 py-28">
        <div className="mx-auto max-w-6xl text-center">
          <SectionTitle eyebrow="Rooted In Community" title="Serving Beyond Real Estate" />
          <p className="mx-auto max-w-4xl text-xl leading-9 text-neutral-700">At Menendez Realty Group, serving our community goes beyond real estate.</p>
          <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-neutral-700">We proudly participate in local outreach efforts including RED Day through Keller Williams, supporting organizations like Grace Resources and helping provide food distribution, essential supplies, and assistance to local families in need.</p>
          <p className="mt-6 text-xl font-semibold text-neutral-900">We believe strong communities create stronger homes.</p>
        </div>
      </section>

      <LuxuryCTA setPage={setPage} title="Let's Make Your Next Move a Successful One" button="Contact Us Today" />
    </>
  );
}

function ServiceCard({ title, text, bullets, button, onClick }) {
  return (
    <div className="border border-neutral-200 bg-[#faf8f4] p-10 shadow-sm">
      <h3 className="font-serif text-4xl text-neutral-950">{title}</h3>
      <p className="mt-5 text-lg leading-8 text-neutral-700">{text}</p>
      <div className="mt-8"><BulletList items={bullets} /></div>
      <div className="mt-10"><GoldMotionCTA onClick={onClick}>{button}</GoldMotionCTA></div>
    </div>
  );
}

function MissionShapeDivider() {
  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: "rgba(123,128,112,0.10)" }} aria-hidden="true">
      <svg className="block h-24 w-full md:h-32" viewBox="0 0 1440 150" preserveAspectRatio="none">
        <path
          d="M0 82C184 28 332 24 508 70C702 121 847 125 1035 76C1198 34 1316 36 1440 72V150H0V82Z"
          fill="#ffffff"
        />
        <path
          d="M0 82C184 28 332 24 508 70C702 121 847 125 1035 76C1198 34 1316 36 1440 72"
          fill="none"
          stroke={BRAND_GOLD}
          strokeWidth="3"
          opacity="0.85"
        />
      </svg>
    </div>
  );
}

function TestimonialShapeDivider() {
  return (
    <div className="relative h-16 overflow-hidden bg-white md:h-20" aria-hidden="true">
      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2" style={{ backgroundColor: BRAND_GOLD }} />
    </div>
  );
}

function WhyChoose() {
  const items = [
    [Award, "Client-First Service", "We prioritize your needs, goals, timeline, and comfort level throughout the entire process."],
    [Phone, "Strong Communication", "You'll never feel left in the dark. We believe clear, consistent communication creates confidence."],
    [Handshake, "Strategic Negotiation", "Whether buying or selling, we work hard to protect your investment and position you for success."],
    [MapPin, "Local Market Expertise", "We understand the Antelope Valley market and help clients make informed decisions based on real-time market conditions."],
    [ShieldCheck, "Professional Support", "From inspections and escrow to marketing and closing, we handle the details so you can focus on what matters most."],
  ];
  return (
    <section className="px-6 py-24 text-neutral-900" style={{ background: "linear-gradient(180deg, #ffffff 0%, rgba(123,128,112,0.10) 100%)" }}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Why Work With Us" title="Why Clients Choose Menendez Realty Group" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {items.map(([Icon, title, body]) => (
            <div key={title} className="border border-neutral-200 bg-white/80 p-7 text-center shadow-sm">
              <Icon className="mx-auto mb-5" style={{ color: gold }} size={32} />
              <h3 className="font-serif text-xl text-neutral-950">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsPreview({ setPage }) {
  const reviews = [
    ["Silvia Garcia made everything feel clear and manageable from day one. She took the time to explain each step, answered all of my questions, and helped me win in a multiple-offer situation.", "Zachery", "Palmdale"],
    ["Silvia did an outstanding job helping me structure an owner carry deal for our ranch property in Rosamond. Her knowledge and attention to detail gave us complete confidence throughout the transaction.", "Juan", "Willow Springs"],
    ["We could not have asked for a better agent. Silvia never stopped until she found us the perfect home and always maintained an uplifting, caring attitude.", "The Bedoya Family", "Rosamond"],
  ];
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Testimonial Preview" title="What Our Clients Are Saying" />
        <div className="grid gap-7 md:grid-cols-3">
          {reviews.map(([review, name, location]) => (
            <div key={name} className="border border-neutral-200 bg-white p-8 shadow-sm">
              <div className="mb-5 flex gap-1" style={{ color: gold }}>{[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
              <p className="text-2xl font-medium leading-9 text-neutral-900">"{review}"</p>
              <p className="mt-6 text-sm font-semibold text-neutral-700">- {name}</p>
              <p className="text-sm text-neutral-500">{location}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center"><GoldMotionCTA onClick={() => setPage("Testimonials")}>Read More Reviews</GoldMotionCTA></div>
      </div>
    </section>
  );
}

function AboutPage({ setPage }) {
  const promiseItems = [
    "To always do the right thing, even when it's not the easiest",
    "To communicate clearly and consistently",
    "To honor every client's goals and priorities",
    "To protect your best interests throughout the transaction",
    "To guide you with honesty, professionalism, and integrity",
    "To reduce stress by handling the details with care",
    "To provide strategic representation from beginning to end",
  ];

  return (
    <>
      <PageHero title="Meet Menendez Realty Group" subtitle="Local Experts. Trusted Advisors. Dedicated Advocates.">
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-lg leading-8 text-neutral-700">
          <p>At Menendez Realty Group, real estate is about helping people move confidently into the next chapter of their lives.</p>
          <p>Our team is committed to providing honest guidance, exceptional communication, and a personalized experience for every client we serve.</p>
        </div>
      </PageHero>
      <section className="bg-[#fbfaf7] px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-full w-full border" style={{ borderColor: gold }} />
            <img src={ceoImage} className="relative h-[640px] w-full object-cover" alt="Silvia Garcia" />
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em]" style={{ color: gold }}>Our Story</p>
            <h2 className="font-serif text-5xl leading-tight text-neutral-950">Built on Service, Communication & Integrity</h2>
            <p className="mt-6 text-lg leading-8 text-neutral-700">Menendez Realty Group was founded on the belief that clients deserve transparency, strong representation, and a real estate experience that feels organized, supportive, and stress-free.</p>
            <p className="mt-5 text-lg leading-8 text-neutral-700">We understand that buying or selling a home can feel overwhelming, especially in a competitive market. That's why we prioritize communication, education, and strategic planning throughout every step of the process.</p>
            <p className="mt-5 text-lg leading-8 text-neutral-700">Whether you're purchasing your first home, selling a longtime family property, or investing in your future, our goal is simple:</p>
            <p className="mt-4 text-xl font-semibold leading-8 text-neutral-950">Protect your best interests while helping you achieve the best possible outcome.</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[[ShieldCheck, "Integrity First"], [Phone, "Clear Communication"], [TrendingUp, "Market Knowledge"], [Award, "Service Excellence"]].map(([Icon, title]) => (
                <div key={title} className="border border-neutral-200 bg-white p-6 shadow-sm">
                  <Icon style={{ color: gold }} />
                  <p className="mt-4 font-semibold text-neutral-900">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Meet The Team" />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="border border-neutral-200 bg-[#fbfaf7] p-8 shadow-sm">
              <img src={ceoImage} className="mb-7 h-72 w-full object-cover object-top" alt="Silvia Garcia headshot" />
              <p className="font-serif text-3xl text-neutral-950">Silvia Garcia | REALTOR&reg;</p>
              <div className="mt-6 space-y-5 text-lg leading-8 text-neutral-700">
                <p>Silvia Garcia is a dedicated real estate professional serving buyers and sellers throughout the Antelope Valley. Known for her strong communication, market knowledge, and client-first approach, Silvia is committed to making every transaction clear, organized, and stress-free.</p>
                <p>Her passion for helping others, combined with her attention to detail and strategic guidance, allows her clients to feel supported and confident from consultation to closing.</p>
                <p>Silvia was awarded the BOLD Award in 2022 and is also a proud partner in a Real Estate Academy where she helps support and educate future professionals in the industry.</p>
              </div>
            </div>
            <div className="border border-neutral-200 bg-[#fbfaf7] p-8 shadow-sm">
              <img src={ALEX_IMAGE_SRC} className="mb-7 h-72 w-full object-contain object-bottom" alt="Alex Menendez headshot" />
              <p className="font-serif text-3xl text-neutral-950">Alex Menendez | REALTOR&reg;</p>
              <div className="mt-6 space-y-5 text-lg leading-8 text-neutral-700">
                <p>Alex Menendez is known for his strong work ethic, professionalism, and commitment to serving clients with excellence.</p>
                <p>As a motivated real estate professional, Alex takes pride in being responsive, dependable, and solution-oriented throughout the buying and selling process. His goal is to ensure every client feels informed, supported, and confident every step of the way.</p>
                <p>Alex believes that real estate is ultimately about relationships and works hard to create an experience built on trust, honesty, and communication.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-neutral-900" style={{ backgroundColor: "rgba(123,128,112,0.10)" }}>
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="Our Promise" title="Our Commitment to Clients" />
          <p className="mb-8 text-center text-xl leading-9 text-neutral-700">We promise:</p>
          <div className="grid gap-4 md:grid-cols-2">
            {promiseItems.map((item, index) => (
              <div
                key={item}
                className={`flex items-start gap-3 border border-neutral-200 bg-white/85 p-5 shadow-sm ${index === promiseItems.length - 1 ? "md:col-span-2 md:mx-auto md:w-[calc(50%_-_0.5rem)]" : ""}`}
              >
                <CheckCircle className="mt-1 shrink-0" size={19} style={{ color: gold }} />
                <p className="text-base leading-7 text-neutral-700">{item}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-xl font-semibold leading-9 text-neutral-950">At Menendez Realty Group, we believe relationships matter more than transactions.</p>
        </div>
      </section>

      <LuxuryCTA
        setPage={setPage}
        title="Work With a Team That Puts You First"
        text="Whether you're buying, selling, or planning your next move, Menendez Realty Group is here to help you navigate the process with confidence."
        button="Connect With Our Team"
      />
    </>
  );
}

function BuyersPage({ setPage }) {
  const buyerSupportItems = [
    "Answer your questions",
    "Explain the process clearly",
    "Coordinate showings",
    "Provide local market insight",
    "Help you evaluate neighborhoods",
    "Strategically structure offers",
    "Negotiate on your behalf",
    "Guide you from contract to closing",
  ];

  const buyerReasons = [
    [Phone, "Clear Communication", "We keep you informed at every stage so you always know what's happening."],
    [MapPin, "Local Expertise", "We provide insight into neighborhoods, market trends, pricing, and opportunities throughout the Antelope Valley."],
    [Handshake, "Strong Negotiation", "We work hard to help you secure favorable terms while protecting your investment."],
    [Users, "Professional Guidance", "From inspections to escrow timelines, we help simplify the process and reduce stress."],
    [ShieldCheck, "Trusted Connections", "We connect buyers with reliable lenders, inspectors, contractors, and service providers."],
  ];

  const financingItems = [
    "Loan options",
    "FHA, VA & conventional financing",
    "Down payment expectations",
    "Closing costs",
    "Pre-approval preparation",
    "What to avoid during underwriting",
  ];

  return (
    <>
      <PageHero title="Helping You Find the Right Home With Confidence" subtitle="Strategic Guidance for Buyers Across the Antelope Valley" image="https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1800&auto=format&fit=crop">
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-lg leading-8 text-neutral-700">
          <p>Buying a home is one of the biggest financial decisions you'll ever make - and you shouldn't have to navigate it alone.</p>
          <p>At Menendez Realty Group, we help buyers feel informed, prepared, and confident throughout every step of the home buying process.</p>
          <p>Whether you're a first-time buyer, relocating, upgrading, or investing, we are committed to helping you find the right home while protecting your best interests along the way.</p>
        </div>
        <div className="mt-9">
          <GoldMotionCTA onClick={() => setPage("Contact")}>Schedule a Buyer Consultation</GoldMotionCTA>
        </div>
      </PageHero>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em]" style={{ color: gold }}>Buyer Experience</p>
            <h2 className="font-serif text-5xl leading-tight text-neutral-950">A Personalized Home Buying Experience</h2>
            <p className="mt-7 text-xl leading-9 text-neutral-700">Your goals drive everything we do.</p>
            <p className="mt-5 text-lg leading-8 text-neutral-700">We take the time to understand your needs, timeline, lifestyle, budget, and long-term vision so we can create a strategy tailored specifically to you.</p>
            <p className="mt-8 text-lg font-semibold text-neutral-950">We believe buying a home should feel exciting - not overwhelming.</p>
          </div>
          <div className="border border-neutral-200 bg-[#fbfaf7] p-8 shadow-sm">
            <p className="mb-6 text-lg font-semibold text-neutral-950">Our team is here to:</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {buyerSupportItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 shrink-0" size={18} style={{ color: gold }} />
                  <p className="text-neutral-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-neutral-900" style={{ background: "linear-gradient(180deg, #ffffff 0%, rgba(123,128,112,0.10) 100%)" }}>
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Why Buy With Us" title="Why Buyers Choose Menendez Realty Group" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {buyerReasons.map(([Icon, heading, body]) => (
              <div key={heading} className="border border-neutral-200 bg-white/85 p-7 text-center shadow-sm">
                <Icon className="mx-auto mb-5" style={{ color: gold }} size={32} />
                <h3 className="font-serif text-2xl text-neutral-950">{heading}</h3>
                <p className="mt-4 text-sm leading-7 text-neutral-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em]" style={{ color: gold }}>Financing</p>
            <h2 className="font-serif text-5xl leading-tight text-neutral-950">Financing Guidance You Can Trust</h2>
            <p className="mt-7 text-lg leading-8 text-neutral-700">Understanding financing is a major part of the buying process.</p>
            <p className="mt-5 text-lg leading-8 text-neutral-700">Our trusted lender network helps ensure you receive professional guidance every step of the way.</p>
          </div>
          <div className="border border-neutral-200 bg-[#fbfaf7] p-8 shadow-sm">
            <p className="mb-6 text-lg font-semibold text-neutral-950">We help buyers understand:</p>
            <div className="space-y-4">
              {financingItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 shrink-0" size={18} style={{ color: gold }} />
                  <p className="text-neutral-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LuxuryCTA
        setPage={setPage}
        title="Let's Find the Right Home Together"
        text="Whether you're ready to start touring homes or simply have questions about the process, we're here to help."
        button="Start Your Home Search"
      />
    </>
  );
}

function SellersPage({ setPage }) {
  const sellerReasons = [
    [TrendingUp, "Strategic Pricing Guidance", "We help position your property competitively based on current market conditions."],
    [Megaphone, "High-Level Marketing", "We combine digital exposure, local networking, and professional presentation to maximize visibility."],
    [Handshake, "Skilled Negotiation", "We work hard to protect your equity and negotiate favorable terms."],
    [CheckCircle, "Organized Transaction Management", "From listing to closing, we manage the details to help reduce stress."],
    [Users, "Client-Focused Service", "Your goals remain our top priority throughout the process."],
  ];

  return (
    <>
      <PageHero title="Strategic Marketing Designed to Sell Your Home" subtitle="Professional Representation. Maximum Exposure. Strong Results." image="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1800&auto=format&fit=crop">
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-lg leading-8 text-neutral-700">
          <p>Selling your home requires more than simply putting it on the market.</p>
          <p>At Menendez Realty Group, we create customized marketing strategies designed to position your property competitively, attract qualified buyers, and maximize your home's value.</p>
          <p>Our goal is to make the selling process smooth, organized, and stress-free while helping you achieve the strongest possible outcome.</p>
        </div>
        <div className="mt-9">
          <GoldMotionCTA onClick={() => setPage("Contact")}>Request a Home Valuation</GoldMotionCTA>
        </div>
      </PageHero>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <SectionTitle eyebrow="Seller Experience" title="A Smarter Approach to Selling" />
          <p className="text-xl leading-9 text-neutral-700">Every property and every seller's goals are different.</p>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-neutral-700">Whether your priority is maximizing profit, selling quickly, or creating the most convenient experience possible, we build a strategy tailored to your goals.</p>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-neutral-700">From preparation and pricing to negotiations and closing, we guide you through every step with communication, professionalism, and strategic support.</p>
        </div>
      </section>

      <section className="bg-[#f8f6f1] px-6 py-24 text-neutral-900">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Why Sell With Us" title="Why Sellers Choose Menendez Realty Group" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {sellerReasons.map(([Icon, heading, body]) => (
              <div key={heading} className="border border-neutral-200 bg-white p-7 text-center shadow-sm">
                <Icon className="mx-auto mb-5" style={{ color: gold }} size={32} />
                <h3 className="font-serif text-2xl text-neutral-950">{heading}</h3>
                <p className="mt-4 text-sm leading-7 text-neutral-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LuxuryCTA
        setPage={setPage}
        title="Thinking About Selling?"
        text="Let's discuss your goals, your property, and the best strategy for your next move."
        button="Schedule a Seller Consultation"
      />
    </>
  );
}

function ListingsPage({ setPage }) {
  return (
    <>
      <PageHero title="Explore Available Properties" subtitle="Find Homes Throughout the Antelope Valley & Surrounding Areas">
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-lg leading-8 text-neutral-700">
          <p>Browse current listings and discover homes that fit your lifestyle, goals, and budget.</p>
          <p>Whether you're searching for your first home, a larger property for your growing family, or your next investment opportunity, Menendez Realty Group is here to guide you through the process.</p>
        </div>
        <div className="mt-9">
          <GoldMotionCTA onClick={() => setPage("Listings")}>Search Listings</GoldMotionCTA>
        </div>
      </PageHero>
      <section className="bg-[#fbfaf7] px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-4 bg-white p-5 shadow-sm md:grid-cols-6">
          <input className="border border-neutral-200 px-4 py-3 md:col-span-2" placeholder="City, neighborhood, ZIP" />
          <input className="border border-neutral-200 px-4 py-3" placeholder="Min Price" />
          <input className="border border-neutral-200 px-4 py-3" placeholder="Max Price" />
          <input className="border border-neutral-200 px-4 py-3" placeholder="Beds" />
          <button type="button" className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-black" style={{ backgroundColor: gold }}>Search</button>
        </div>
      </section>
      <section className="bg-[#fbfaf7] px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Featured Listings" title="Featured Properties" text="IDX Featured Listings Integration" />
          <div className="grid gap-7 md:grid-cols-3">{listings.map((item) => <PropertyCard key={item.address} item={item} />)}</div>
        </div>
      </section>
      <LuxuryCTA
        setPage={setPage}
        title="Need Help Finding the Right Home?"
        text="Let our team help you narrow down your search and identify the best opportunities for your goals."
        button="Contact Our Team"
      />
    </>
  );
}

function TestimonialsPage({ setPage }) {
  const reviews = [
    [
      "Zachery",
      "Palmdale",
      [
        "As a first-time home buyer, I was nervous about the process - especially using an FHA loan in a competitive market. Silvia Garcia made everything feel clear and manageable from day one. She took the time to explain each step, answered all of my questions, and made sure I understood what to expect.",
        "When I finally found the right home, I was competing against multiple offers, and Silvia helped me put together a strong, strategic offer that ultimately won.",
        "I couldn't have asked for a better agent to represent me and highly recommend her to any first-time buyers looking for someone knowledgeable, patient, and truly dedicated.",
      ],
    ],
    [
      "Juan",
      "Willow Springs",
      [
        "Silvia did an outstanding job helping me structure an owner carry deal for our ranch property in Rosamond. She explained the process clearly, made sure all terms were properly negotiated, and protected our interests every step of the way.",
        "Her knowledge of creative financing and attention to detail gave us complete confidence throughout the transaction. We highly recommend her to anyone looking for a knowledgeable and strategic real estate professional.",
      ],
    ],
    [
      "The Bedoya Family",
      "Rosamond",
      [
        "In 2022 my husband and I purchased our first home. Silvia was our agent in our search, and let me tell you that without her expertise and knowledge we would have been lost.",
        "She did not stop until she met all our quirky requests and expectations in our ideal home. Silvia was aggressive in her home research for us. Not only did she find us the perfect home but always maintained her uplifting, cheerful, and caring attitude.",
        "We cannot thank her enough. We will always recommend her and continue to use her as our agent.",
      ],
    ],
  ];
  return (
    <>
      <PageHero title="Real Stories From Real Clients" subtitle="Built on Trust, Communication & Results">
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-lg leading-8 text-neutral-700">
          <p>At Menendez Realty Group, our greatest accomplishment is the trust our clients place in us.</p>
          <p>We are honored to help individuals and families navigate some of life's biggest transitions and are proud of the relationships we continue to build long after closing day.</p>
        </div>
      </PageHero>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="What Clients Are Saying" />
          <div className="grid gap-7 lg:grid-cols-3">
            {reviews.map(([name, location, paragraphs]) => (
            <div key={name} className="border border-neutral-200 bg-[#fbfaf7] p-8 shadow-sm">
              <div className="mb-5 flex gap-1" style={{ color: gold }}>{[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
              <h3 className="font-serif text-2xl text-neutral-950">{name} | {location}</h3>
              <div className="mt-6 space-y-5 text-base leading-8 text-neutral-700">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>"{paragraph}"</p>
                ))}
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialShapeDivider />

      <section className="px-6 py-24 text-neutral-900" style={{ background: "linear-gradient(180deg, #ffffff 0%, rgba(123,128,112,0.10) 100%)" }}>
        <div className="mx-auto max-w-5xl text-center">
          <SectionTitle eyebrow="Client Experience" title="More Than Transactions" />
          <p className="text-xl leading-9 text-neutral-700">Our clients are more than sales numbers.</p>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-neutral-700">We believe in creating lifelong relationships through honesty, professionalism, communication, and genuine care for the people we serve.</p>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-neutral-700">From first-time buyers to longtime homeowners, our goal is always the same:</p>
          <p className="mx-auto mt-5 max-w-3xl text-xl font-semibold leading-9 text-neutral-950">To create a real estate experience that feels supported, strategic, and stress-free.</p>
        </div>
      </section>

      <LuxuryCTA
        setPage={setPage}
        title="Ready to Experience the Difference?"
        text="Whether you're buying or selling, Menendez Realty Group is here to guide you every step of the way."
        button="Let's Talk"
      />
    </>
  );
}

function ContactPage({ setPage }) {
  const serviceAreas = [
    "Antelope Valley",
    "Palmdale",
    "Lancaster",
    "Rosamond",
    "Quartz Hill",
    "Littlerock",
    "Lake Los Angeles",
    "Acton",
    "Santa Clarita",
    "Surrounding Southern California Communities",
  ];

  return (
    <>
      <PageHero title="Let's Connect" subtitle="We're Here to Help You Make Your Next Move With Confidence">
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-lg leading-8 text-neutral-700">
          <p>Whether you're buying, selling, investing, or simply exploring your options, Menendez Realty Group is ready to help.</p>
          <p>Reach out today to schedule a consultation or ask any questions about the market and your real estate goals.</p>
        </div>
      </PageHero>

      <section className="bg-[#fbfaf7] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Contact Information" />
          <ContactCard />
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <SectionTitle title="Send Us a Message" />
          <form className="grid gap-5 bg-white p-8 shadow-sm md:grid-cols-2">
            <input className="border border-neutral-200 px-5 py-4 outline-none focus:border-[#C6A15B]" placeholder="Name" />
            <input className="border border-neutral-200 px-5 py-4 outline-none focus:border-[#C6A15B]" placeholder="Email" />
            <input className="border border-neutral-200 px-5 py-4 outline-none focus:border-[#C6A15B]" placeholder="Phone Number" />
            <input className="border border-neutral-200 px-5 py-4 outline-none focus:border-[#C6A15B]" placeholder="Are You Buying or Selling?" />
            <textarea className="min-h-40 border border-neutral-200 px-5 py-4 outline-none focus:border-[#C6A15B] md:col-span-2" placeholder="Message" />
            <div className="md:col-span-2"><GoldMotionCTA>Submit</GoldMotionCTA></div>
          </form>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-6 py-24">
        <div className="mx-auto max-w-7xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <div className="flex flex-col justify-center bg-[#f4f0e8] p-8 md:p-10">
              <MapPin className="mb-5" style={{ color: gold }} size={38} />
              <h3 className="font-serif text-4xl leading-tight text-neutral-950">Proudly Serving</h3>
              <p className="mt-5 text-lg leading-8 text-neutral-700">Local guidance across the Antelope Valley and nearby Southern California communities.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {serviceAreas.map((area) => (
                  <p key={area} className="border border-white/70 bg-white/70 px-4 py-3 text-sm font-semibold text-neutral-700 shadow-sm">{area}</p>
                ))}
              </div>
            </div>
            <div className="relative min-h-[420px] bg-[#e9e2d3]">
              <iframe
                title="Map of Menendez Realty Group service areas"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-118.70%2C34.32%2C-117.65%2C34.95&layer=mapnik&marker=34.5794%2C-118.1165"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/85 to-transparent p-5">
                <p className="inline-flex items-center gap-2 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-neutral-700 shadow-sm">
                  <MapPin size={15} style={{ color: gold }} /> Antelope Valley Coverage
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LuxuryCTA
        setPage={setPage}
        title="Your Goals Matter to Us"
        text="At Menendez Realty Group, we are committed to helping you navigate your next move with professionalism, honesty, and care. We look forward to earning your trust and helping you achieve your real estate goals."
        button="Schedule Your Consultation"
      />
    </>
  );
}

function ProcessSection({ eyebrow, title, steps }) {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={eyebrow} title={title} />
        <div className="grid gap-5 md:grid-cols-5">
          {steps.map(([num, step, body]) => (
            <div key={step} className="border border-neutral-200 bg-white p-6 text-center shadow-sm">
              <p className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border font-serif text-xl" style={{ borderColor: gold, color: gold }}>{num}</p>
              <h3 className="font-serif text-xl text-neutral-950">{step}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturePanel({ title, items }) {
  return (
    <section className="px-6 py-24 text-neutral-900" style={{ backgroundColor: "rgba(123,128,112,0.10)" }}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Why Work With Us" title={title} />
        <div className="grid gap-8 md:grid-cols-4">
          {items.map(([Icon, heading, body]) => (
            <div key={heading} className="border border-neutral-200 bg-white/80 p-8 text-center shadow-sm">
              <Icon className="mx-auto mb-5" style={{ color: gold }} size={34} />
              <h3 className="font-serif text-2xl text-neutral-950">{heading}</h3>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarketingSection() {
  const items = [
    [TrendingUp, "Strategic Pricing Guidance", "We help position your property competitively based on current market conditions."],
    [Megaphone, "High-Level Marketing", "We combine digital exposure, local networking, and professional presentation to maximize visibility."],
    [Handshake, "Skilled Negotiation", "We work hard to protect your equity and negotiate favorable terms."],
    [CheckCircle, "Organized Transaction Management", "From listing to closing, we manage the details to help reduce stress."],
  ];
  return (
    <section className="bg-[#f8f6f1] px-6 py-24 text-neutral-900">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Why Sell With Us" title="Why Sellers Choose Menendez Realty Group" />
        <div className="grid gap-8 md:grid-cols-4">
          {items.map(([Icon, heading, body]) => (
            <div key={heading} className="border border-neutral-200 bg-white p-8 shadow-sm">
              <Icon style={{ color: gold }} />
              <h3 className="mt-5 font-serif text-2xl text-neutral-950">{heading}</h3>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="px-6 py-20 text-neutral-900" style={{ backgroundColor: "rgba(123,128,112,0.10)" }}>
      <div className="mx-auto grid max-w-7xl gap-8 text-center md:grid-cols-4">
        {[["300+", "Homes Sold"], ["250+", "Happy Clients"], ["10+", "Years Experience"], ["20+", "Communities Served"]].map(([num, label]) => (
          <div key={label}>
            <p className="font-serif text-5xl" style={{ color: gold }}>{num}</p>
            <p className="mt-2 uppercase tracking-widest text-neutral-600">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactCard() {
  return (
    <div className="grid gap-8 text-neutral-900 lg:grid-cols-2">
      <div className="border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-5">
          <img src={ceoImage} className="h-24 w-24 rounded-full object-cover object-top" alt="Silvia Garcia headshot" />
          <h3 className="font-serif text-3xl text-neutral-950">Silvia Garcia | REALTOR&reg;</h3>
        </div>
        <div className="mt-8 space-y-5 text-neutral-700">
          <p className="flex items-center gap-3"><Phone size={18} style={{ color: gold }} /> Phone: 818-822-7277</p>
          <p className="flex items-center gap-3"><Mail size={18} style={{ color: gold }} /> Email: casasbysilvia@kw.com</p>
          <p className="flex items-center gap-3"><Home size={18} style={{ color: gold }} /> Website: silviag.kw.com</p>
          <p className="flex items-center gap-3"><ShieldCheck size={18} style={{ color: gold }} /> DRE #02093549</p>
        </div>
      </div>
      <div className="border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-5">
          <img src={ALEX_IMAGE_SRC} className="h-24 w-24 rounded-full bg-[#fbfaf7] object-contain object-bottom" alt="Alex Menendez headshot" />
          <h3 className="font-serif text-3xl text-neutral-950">Alex Menendez | REALTOR&reg;</h3>
        </div>
        <div className="mt-8 space-y-5 text-neutral-700">
          <p className="flex items-center gap-3"><Phone size={18} style={{ color: gold }} /> Phone: 661-860-3284</p>
          <p className="flex items-center gap-3"><Mail size={18} style={{ color: gold }} /> Email: alex.menendez@kw.com</p>
        </div>
      </div>
    </div>
  );
}

function LuxuryCTA({
  setPage,
  title = "Let's Make Your Next Move a Successful One",
  text = "Whether you're buying your first home, selling your current property, or simply exploring your options, Menendez Realty Group is here to guide you with professionalism, care, and strategy.",
  button = "Contact Silvia",
}) {
  return (
    <section className="relative overflow-hidden px-6 py-24 text-center text-black">
      <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1800&auto=format&fit=crop" className="absolute inset-0 h-full w-full object-cover" alt="Luxury home background" />
      <div className="absolute inset-0 bg-white/70 backdrop-brightness-[0.9]" />
      <div className="absolute inset-0 bg-black/5" />
      <motion.div className="absolute inset-0 opacity-35" animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} style={{ background: "linear-gradient(120deg, transparent, rgba(198,161,91,.55), transparent)", backgroundSize: "220% 220%" }} />
      <div className="relative mx-auto max-w-3xl">
        <h2 className="font-serif text-4xl text-black md:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-black/70">{text}</p>
        <div className="mt-8"><GoldMotionCTA onClick={() => setPage("Contact")}>{button}</GoldMotionCTA></div>
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  const handleFooterLinkClick = (event, item) => {
    event.preventDefault();
    setPage(item);
  };

  return (
    <footer className="border-t border-white/10 px-6 py-10 text-white" style={{ backgroundColor: sage }}>
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <a href={getSlugForPage("Home")} onClick={(event) => handleFooterLinkClick(event, "Home")} className="text-left">
            <img src={FOOTER_LOGO_SRC} alt="Menendez Realty Group Logo" className="h-16 w-auto object-contain" />
          </a>
          <div className="mt-5 inline-flex rounded-sm border border-white/20 bg-white px-3 py-2 shadow-[0_14px_32px_rgba(0,0,0,0.12)]">
            <img src={KW_ANTELOPE_VALLEY_LOGO_SRC} alt="KW Antelope Valley Keller Williams Realty" className="h-auto w-[260px] max-w-full object-contain" />
          </div>
        </div>
        <div>
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.22em] text-white">Quick Links</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-white/70">
            {pages.map((item) => (
              <a key={item} href={getSlugForPage(item)} onClick={(event) => handleFooterLinkClick(event, item)} className="text-left hover:text-[#C6A15B]">{item}</a>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.22em] text-white">Connect With Us</p>
          <p className="text-sm text-white/70">casasbysilvia@kw.com</p>
          <p className="mt-2 text-sm text-white/70">818-822-7277</p>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-center text-sm text-white/50">&copy; 2026 Menendez Realty Group | Designed by Valleys Design Studio</p>
    </footer>
  );
}

export default function MenendezRealtyWebsite() {
  useEffect(() => {
    document.body.style.fontFamily = "'Canva Sans', Arial, sans-serif";

    const styleExists = document.querySelector('style[data-menendez-font-style="true"]');
    if (!styleExists) {
      const style = document.createElement("style");
      style.dataset.menendezFontStyle = "true";
      style.innerHTML = `@font-face{font-family:'Alegreya Sans';src:url('/fonts/alegreya-sans-thin.ttf') format('truetype');font-weight:100;font-style:normal;font-display:swap;} @font-face{font-family:'Alegreya Sans';src:url('/fonts/alegreya-sans-thin-italic.ttf') format('truetype');font-weight:100;font-style:italic;font-display:swap;} @font-face{font-family:'Alegreya Sans';src:url('/fonts/alegreya-sans-light.ttf') format('truetype');font-weight:300;font-style:normal;font-display:swap;} @font-face{font-family:'Alegreya Sans';src:url('/fonts/alegreya-sans-light-italic.ttf') format('truetype');font-weight:300;font-style:italic;font-display:swap;} @font-face{font-family:'Alegreya Sans';src:url('/fonts/alegreya-sans-regular.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap;} @font-face{font-family:'Alegreya Sans';src:url('/fonts/alegreya-sans-italic.ttf') format('truetype');font-weight:400;font-style:italic;font-display:swap;} @font-face{font-family:'Alegreya Sans';src:url('/fonts/alegreya-sans-medium.ttf') format('truetype');font-weight:500;font-style:normal;font-display:swap;} @font-face{font-family:'Alegreya Sans';src:url('/fonts/alegreya-sans-medium-italic.ttf') format('truetype');font-weight:500;font-style:italic;font-display:swap;} @font-face{font-family:'Alegreya Sans';src:url('/fonts/alegreya-sans-bold.ttf') format('truetype');font-weight:700;font-style:normal;font-display:swap;} @font-face{font-family:'Alegreya Sans';src:url('/fonts/alegreya-sans-bold-italic.ttf') format('truetype');font-weight:700;font-style:italic;font-display:swap;} @font-face{font-family:'Alegreya Sans';src:url('/fonts/alegreya-sans-extra-bold.ttf') format('truetype');font-weight:800;font-style:normal;font-display:swap;} @font-face{font-family:'Alegreya Sans';src:url('/fonts/alegreya-sans-extra-bold-italic.ttf') format('truetype');font-weight:800;font-style:italic;font-display:swap;} @font-face{font-family:'Alegreya Sans';src:url('/fonts/alegreya-sans-black.ttf') format('truetype');font-weight:900;font-style:normal;font-display:swap;} @font-face{font-family:'Alegreya Sans';src:url('/fonts/alegreya-sans-black-italic.ttf') format('truetype');font-weight:900;font-style:italic;font-display:swap;} @font-face{font-family:'Canva Sans';src:url('/fonts/canva-sans-vf.ttf') format('truetype');font-weight:400 900;font-style:normal;font-display:swap;} html,body,#root,*{font-family:'Canva Sans',Arial,sans-serif !important;} body{background:#fff;color:#1f211f;} h1,h1 *,h2,h2 *,h3,h3 *,h4,h4 *,h5,h5 *,h6,h6 *{font-family:'Alegreya Sans',Arial,sans-serif !important;letter-spacing:0;} h1,h1 *{font-weight:500 !important;}`;
      document.head.appendChild(style);
    }
  }, []);

  const [page, setCurrentPage] = useState(() => {
    if (typeof window === "undefined") return "Home";
    return getPageFromPath(window.location.pathname);
  });

  const setPage = (nextPage) => {
    const resolvedPage = pages.includes(nextPage) ? nextPage : "Home";
    const nextPath = getSlugForPage(resolvedPage);

    if (typeof window !== "undefined") {
      const currentPath = normalizePath(window.location.pathname);
      if (currentPath !== nextPath) {
        window.history.pushState({ page: resolvedPage }, "", nextPath);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setCurrentPage(resolvedPage);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    document.title = page === "Home" ? "Menendez Realty Group" : `${page} | Menendez Realty Group`;
  }, [page]);

  const pageMap = {
    Home: <HomePage setPage={setPage} />,
    About: <AboutPage setPage={setPage} />,
    Buyers: <BuyersPage setPage={setPage} />,
    Sellers: <SellersPage setPage={setPage} />,
    Listings: <ListingsPage setPage={setPage} />,
    Testimonials: <TestimonialsPage setPage={setPage} />,
    Contact: <ContactPage setPage={setPage} />,
  };

  runDevelopmentChecks();

  return (
    <main className="min-h-screen bg-white">
      <Nav page={page} setPage={setPage} />
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
        >
          {pageMap[page]}
        </motion.div>
      </AnimatePresence>
      <Footer setPage={setPage} />
    </main>
  );

}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MenendezRealtyWebsite />
  </React.StrictMode>
);



