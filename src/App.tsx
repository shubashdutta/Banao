import React, { useEffect, useRef, useState } from "react";
import {
  Droplets,
  Zap,
  Sparkles,
  UserRound,
  Hammer,
  BriefcaseBusiness,
  Home,
  Search,
  CalendarDays,
  ShieldCheck,
  Navigation,
  TrendingUp,
  CheckCircle2,
  Smartphone,
  Wrench,
  Settings,
  Scissors,
  SprayCan,
  Plug,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "animate.css";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import AppPhone from "@/components/AppPhone";
import ServiceCard from "@/components/ServiceCard";
import HowItWorks from "@/components/HowItWorks";
import TrustCard from "@/components/TrustCard";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import ProModal from "@/components/ProModal";
import CtaBanner from "./components/CtaBanner";
import TestimonialPage from "./components/Testimonial";
import HomeAllImage from "@/Assets/Image/BanaoHomeAll.png";

import AppHomeImage from "@/Assets/Image/BanaoAppImage.png";

import OverLayImage from "@/Assets/Image/OverLayImage.jpeg";
import PartnersShowcase from "./components/landingPage/ourPartnerPage";

// const services = [
//   {
//     icon: Droplets,
//     name: "Plumbing",
//     bgColor: "#EBF2FA",
//     iconColor: "#3B82F6",
//   },
//   {
//     icon: Zap,
//     name: "Electrical",
//     bgColor: "#FFF8E7",
//     iconColor: "#F59E0B",
//   },
//   {
//     icon: Sparkles,
//     name: "Cleaning",
//     bgColor: "#FFF0F3",
//     iconColor: "#EC4899",
//   },
//   {
//     icon: UserRound,
//     name: "Beauty",
//     bgColor: "#F3EEFF",
//     iconColor: "#8B5CF6",
//   },
//   {
//     icon: Hammer,
//     name: "Carpentry",
//     bgColor: "#FDF8F0",
//     iconColor: "#D97706",
//   },
//   {
//     icon: BriefcaseBusiness,
//     name: "Handyman",
//     bgColor: "#E8F4F2",
//     iconColor: "#2F7D72",
//   },
//   {
//     icon: Home,
//     name: "Maintenance",
//     bgColor: "#FFF0E8",
//     iconColor: "#FF6B35",
//   },
// ];

const services = [
  {
    icon: Wrench,
    name: "Plumbing",
    bgColor: "#FFF0E8",
    iconColor: "#FF6B35",
  },
  {
    icon: Plug,
    name: "Electrical",
    bgColor: "#FFF0E8",
    iconColor: "#FF6B35",
  },
  {
    icon: SprayCan,
    name: "Cleaning",
    bgColor: "#FFF0E8",
    iconColor: "#FF6B35",
  },
  {
    icon: Scissors,
    name: "Beauty",
    bgColor: "#FFF0E8",
    iconColor: "#FF6B35",
  },
  {
    icon: Hammer,
    name: "Carpentry",
    bgColor: "#FFF0E8",
    iconColor: "#FF6B35",
  },
  {
    icon: Wrench,
    name: "Handyman",
    bgColor: "#FFF0E8",
    iconColor: "#FF6B35",
  },
  {
    icon: Settings,
    name: "Maintenance",
    bgColor: "#FFF0E8",
    iconColor: "#FF6B35",
  },
];
const trustItems = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description: "Every professional is vetted and background-checked.",
    bgColor: "#E8F4F2",
    iconColor: "#2F7D72",
  },
  {
    icon: CheckCircle2,
    title: "Clear Pricing",
    description: "Know what you pay upfront. No hidden charges.",
    bgColor: "#FFF0E8",
    iconColor: "#FF6B35",
  },
  {
    icon: CalendarDays,
    title: "Easy Booking",
    description: "Book in seconds. Pick your time and location.",
    bgColor: "#EBF2FA",
    iconColor: "#3B82F6",
  },
  {
    icon: Navigation,
    title: "Real-time Updates",
    description: "Track your professional and get arrival updates.",
    bgColor: "#F3EEFF",
    iconColor: "#8B5CF6",
  },
];

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Plumbing");
  const [proModalOpen, setProModalOpen] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  const handleOpenBooking = (serviceName = "Plumbing") => {
    setSelectedService(serviceName);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717]">
      {/* <Navbar onBookClick={() => handleOpenBooking("Plumbing")} /> */}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-shape" />
        <div className="hero-bg-shape-2" />
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-eyebrow">HOME SERVICES, MADE EASY</div>
              <h1 className="hero-headline capitalize">
                Need it fixed?
                <br />
                <span className="orange">Just Banao.</span>
              </h1>
              <p className="hero-subtitle">
                Plumbing, electrical, cleaning, beauty & more — right at your
                doorstep.
              </p>
              <div className="hero-buttons">
                <Button
                  variant="primary"
                  size="lg"
                  showArrow
                  onClick={() => handleOpenBooking("Plumbing")}
                >
                  Book a Service
                </Button>
                <Button variant="outline" size="lg" href="#download">
                  <Smartphone size={16} />
                  Get the App
                </Button>
              </div>
              <div className="hero-social-proof">
                <div className="hero-avatars">
                  <div
                    className="hero-avatar"
                    style={{ background: "#FF6B35" }}
                  >
                    R
                  </div>
                  <div
                    className="hero-avatar"
                    style={{ background: "#2F7D72" }}
                  >
                    S
                  </div>
                  <div
                    className="hero-avatar"
                    style={{ background: "#3B82F6" }}
                  >
                    A
                  </div>
                </div>
                <div className="hero-social-text">
                  <strong>Trusted by homeowners</strong>
                  <br />
                  across Nepal
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-blob" />
              <div className="hero-phone-wrapper">
                {/* <AppPhone screen="home" /> */}

                <img src={AppHomeImage} alt="AppImage" className=" h-full " />
              </div>

              {/* Floating Cards */}
              <div
                className="floating-card floating-card-1"
                onClick={() => handleOpenBooking("Plumbing")}
                role="button"
                tabIndex={0}
              >
                <div
                  className="floating-card-icon"
                  style={{ background: "#EBF2FA" }}
                >
                  <Droplets size={18} color="#3B82F6" />
                </div>
                <span className="floating-card-name">Plumbing</span>
              </div>
              <div
                className="floating-card floating-card-2"
                onClick={() => handleOpenBooking("Electrical")}
                role="button"
                tabIndex={0}
              >
                <div
                  className="floating-card-icon"
                  style={{ background: "#FFF8E7" }}
                >
                  <Zap size={18} color="#F59E0B" />
                </div>
                <span className="floating-card-name">Electrical</span>
              </div>
              <div
                className="floating-card floating-card-3"
                onClick={() => handleOpenBooking("Cleaning")}
                role="button"
                tabIndex={0}
              >
                <div
                  className="floating-card-icon"
                  style={{ background: "#FFF0F3" }}
                >
                  <Sparkles size={18} color="#EC4899" />
                </div>
                <span className="floating-card-name">Cleaning</span>
              </div>
              <div
                className="floating-card floating-card-4"
                onClick={() => handleOpenBooking("Beauty")}
                role="button"
                tabIndex={0}
              >
                <div
                  className="floating-card-icon"
                  style={{ background: "#F3EEFF" }}
                >
                  <UserRound size={18} color="#8B5CF6" />
                </div>
                <span className="floating-card-name">Beauty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* <section id="services" className="services-section">
        <div className="container">
          <div className="section-eyebrow">EVERYDAY HELP</div>
          <h2 className="section-heading capitalize">
            Whatever your home needs.
          </h2>
          <p className="section-sub">One app. Everyday services.</p>

          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard
                key={service.name}
                {...service}
                onClick={() => handleOpenBooking(service.name)}
              />
            ))}
          </div>
        </div>
      </section> */}

      <section id="services" className="services-section py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Title and Navigation Buttons */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="section-eyebrow text-[#FF6B35] font-semibold tracking-wider text-xs uppercase mb-2">
                EVERYDAY HELP
              </div>
              <h2 className="section-heading capitalize text-3xl sm:text-4xl font-extrabold text-neutral-900">
                Whatever your home needs.
              </h2>
              <p className="section-sub text-neutral-500 mt-1 text-sm sm:text-base">
                One app. Everyday services.
              </p>
            </div>

            {/* Previous & Next Circular Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={scrollLeft}
                className="w-11 h-11 rounded-full bg-white border border-neutral-200/90 flex items-center justify-center shadow-sm hover:border-[#FF6B35] hover:text-[#FF6B35] text-neutral-700 transition-all cursor-pointer active:scale-95"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                className="w-11 h-11 rounded-full bg-white border border-neutral-200/90 flex items-center justify-center shadow-sm hover:border-[#FF6B35] hover:text-[#FF6B35] text-neutral-700 transition-all cursor-pointer active:scale-95"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Slider Container with ref attached */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto gap-3 sm:gap-4 pb-6 pt-2 snap-x snap-mandatory scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {services.map((service) => (
              <div
                key={service.name}
                className="w-[150px] sm:w-[180px] lg:w-[200px] flex-shrink-0 snap-start"
              >
                <ServiceCard
                  {...service}
                  onClick={() => handleOpenBooking(service.name)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      {/* <section className="editorial-section">
        <svg
          className="nepal-illustration"
          viewBox="0 0 800 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 300 L150 80 L250 180 L350 50 L450 160 L550 30 L650 140 L750 70 L800 120 L800 300 Z"
            fill="#171717"
            opacity="0.5"
          />
          <rect
            x="340"
            y="200"
            width="120"
            height="100"
            fill="#171717"
            opacity="0.3"
          />
          <polygon
            points="340,200 400,150 460,200"
            fill="#171717"
            opacity="0.4"
          />

          <circle cx="280" cy="250" r="25" fill="#2F7D72" opacity="0.3" />
          <circle cx="520" cy="240" r="30" fill="#2F7D72" opacity="0.3" />
          <rect
            x="277"
            y="260"
            width="6"
            height="40"
            fill="#171717"
            opacity="0.2"
          />
          <rect
            x="517"
            y="255"
            width="6"
            height="45"
            fill="#171717"
            opacity="0.2"
          />
        </svg>

        <div className="container">
          <div className="editorial-text">
            Your home.
            <br />
            Your time.
            <br />
            <span className="orange">Your Banao.</span>
          </div>
        </div>
      </section> */}

      <CtaBanner />

      {/* How It Works */}
      <HowItWorks />

      {/* App Experience Section */}
      <section id="download" className="app-section">
        <div className="container">
          <div className="app-grid">
            <div>
              <div className="section-eyebrow">APP EXPERIENCE</div>
              <h2 className="section-heading capitalize">
                Everything you need.
                <br />
                in a few taps.
              </h2>
              <p className="section-sub">
                Find professionals, choose a time, track your booking and get
                the job done — all from one app.
              </p>

              <div style={{ marginTop: "32px" }}>
                <Button
                  variant="primary"
                  size="lg"
                  showArrow
                  onClick={() => handleOpenBooking("Plumbing")}
                >
                  Get the Banao App
                </Button>
              </div>

              <div className="app-features">
                <div className="app-feature">
                  <div className="app-feature-icon">
                    <CalendarDays size={18} color="#FF6B35" />
                  </div>
                  Easy Booking
                </div>
                <div className="app-feature">
                  <div className="app-feature-icon">
                    <Navigation size={18} color="#2F7D72" />
                  </div>
                  Live Tracking
                </div>
                <div className="app-feature">
                  <div className="app-feature-icon">
                    <ShieldCheck size={18} color="#3B82F6" />
                  </div>
                  Secure Payments
                </div>
              </div>
            </div>

            <div className="app-phones-display">
              <img src={HomeAllImage} alt="" />
              {/* <div className="app-phone-side app-phone-side-left">
                <AppPhone screen="profile" small />
              </div>
              <div className="app-phone-center">
                <AppPhone screen="home" />
              </div>
              <div className="app-phone-side app-phone-side-right">
                <AppPhone screen="booking" small />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Professionals Section */}
      <section id="pros" className="pros-section">
        <div className="container">
          <div className="pros-grid">
            <div>
              <div className="section-eyebrow">FOR PROFESSIONALS</div>
              <h2 className="section-heading capitalize">
                People you can count on.
              </h2>
              <p className="section-sub">
                Join the Banao Pro community and get steady work, fair pay and a
                growing customer base.
              </p>
              <div style={{ marginTop: "32px" }}>
                <Button
                  variant="primary"
                  size="lg"
                  showArrow
                  onClick={() => setProModalOpen(true)}
                >
                  Become a Banao Pro
                </Button>
              </div>
            </div>

            <div className="pros-features">
              <div className="pros-feature">
                <div className="pros-feature-icon">
                  <ShieldCheck size={22} color="#FF6B35" />
                </div>
                <div>
                  <div className="pros-feature-title">Verified & Trusted</div>
                  <div className="pros-feature-desc">
                    Build your reputation with verified reviews and a trusted
                    profile.
                  </div>
                </div>
              </div>
              <div className="pros-feature">
                <div className="pros-feature-icon">
                  <CalendarDays size={22} color="#FF6B35" />
                </div>
                <div>
                  <div className="pros-feature-title">Flexible Work</div>
                  <div className="pros-feature-desc">
                    Choose when and where you work. Manage your own schedule.
                  </div>
                </div>
              </div>
              <div className="pros-feature">
                <div className="pros-feature-icon">
                  <TrendingUp size={22} color="#FF6B35" />
                </div>
                <div>
                  <div className="pros-feature-title">Grow Your Income</div>
                  <div className="pros-feature-desc">
                    Access a growing customer base and build a sustainable
                    career.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Visual Card */}
          {/* <div className="pros-visual" style={{ marginTop: "64px" }}>
            <div className="pros-card-visual">
              <div className="pros-card-avatar">
                <UserRound size={32} color="white" />
              </div>
              <div className="pros-card-name">Sita Maharjan</div>
              <div className="pros-card-role">
                Electrical specialist · Kathmandu
              </div>
              <div className="pros-card-stats">
                <div>
                  <div className="pros-card-stat-value">312</div>
                  <div className="pros-card-stat-label">Jobs done</div>
                </div>
                <div>
                  <div className="pros-card-stat-value">4.8</div>
                  <div className="pros-card-stat-label">Avg rating</div>
                </div>
                <div>
                  <div className="pros-card-stat-value">2yr</div>
                  <div className="pros-card-stat-label">On Banao</div>
                </div>
              </div>
            </div>
          </div> */}

          <TestimonialPage />
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <div className="section-eyebrow">WHY BANAO</div>
            <h2 className="section-heading">Simple. Useful. Trustworthy.</h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Designed to keep the service experience clear and simple.
            </p>
          </div>

          <div className="trust-grid">
            {trustItems.map((item) => (
              <TrustCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA */}
      <section
        ref={sectionRef}
        className=" relative overflow-hidden  py-10 px-6 md:px-12 text-white"
      >
        {/* Dynamic Background SVG with glowing / layered aesthetic */}
        <svg
          className="final-cta-bg absolute inset-0 w-full h-full pointer-events-none opacity-20"
          viewBox="0 0 1200 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M200 400 L200 250 L400 120 L600 250 L600 400"
            stroke="url(#gradient-line-1)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M600 400 L600 280 L750 180 L900 280 L900 400"
            stroke="url(#gradient-line-2)"
            strokeWidth="2"
            fill="none"
          />
          <rect
            x="350"
            y="280"
            width="60"
            height="80"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            fill="none"
          />
          <rect
            x="440"
            y="300"
            width="40"
            height="40"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            fill="none"
          />
          <circle
            cx="150"
            cy="350"
            r="40"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.3"
            fill="none"
          />
          <circle
            cx="950"
            cy="340"
            r="50"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.3"
            fill="none"
          />
          <defs>
            <linearGradient
              id="gradient-line-1"
              x1="200"
              y1="400"
              x2="600"
              y2="120"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.1" />
              <stop offset="1" stopColor="white" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient
              id="gradient-line-2"
              x1="600"
              y1="400"
              x2="900"
              y2="180"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.8" />
              <stop offset="1" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Ambient background glow for high conversion focus */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[300px] bg-primary/10 blur-[120px] rounded-full"></div>
        </div>

        {/* Main Content Container */}
        {/* <div className="container relative z-10 mx-auto flex flex-col items-center justify-center text-center max-w-3xl">
          <a
            href="#"
            className="group select-none flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-105"
            aria-label="Banao Home"
          >
            <img
              src={Logo}
              alt="Banao Logo"
              className="h-10 w-auto object-contain "
            />
          </a>

          <h2 className="final-cta-headline text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Got a job? <br />
            <span className=" text-orange-600">Just Banao.</span>
          </h2>

          <p className="final-cta-sub text-lg sm:text-xl text-neutral-300 mb-8 font-normal max-w-md">
            Home services, just a few taps away.
          </p>

          <div className="final-cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              showArrow
              onClick={() => handleOpenBooking("Plumbing")}
              className="w-full sm:w-auto shadow-lg shadow-primary/25"
            >
              Book a Service
            </Button>

            <Button
              variant="white"
              size="lg"
              href="#download"
              className="w-full sm:w-auto transition-all hover:bg-neutral-100"
            >
              <Smartphone size={18} className="mr-2" />
              Download the App
            </Button>
          </div>
        </div> */}

        <div className="relative w-full py-12 lg:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
              {/* Left Side: Cutout/Illustration Image bleeding from left */}
              <div
                className={`w-full lg:w-1/2 flex justify-start -ml-4 sm:-ml-8 lg:-ml-12 ${
                  isVisible
                    ? "animate__animated animate__fadeInLeft animate__fast"
                    : "opacity-0"
                }`}
              >
                <img
                  src={OverLayImage}
                  alt="Banao Illustration"
                  className="w-full max-w-md lg:max-w-lg h-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Right Side: Content & Actions */}
              <div
                className={`w-full lg:w-1/2 flex flex-col items-start text-left ${
                  isVisible
                    ? "animate__animated animate__fadeInRight animate__fast"
                    : "opacity-0"
                }`}
              >
                <h2 className="final-cta-headline text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black mb-4 leading-tight">
                  Got a job? <br />
                  <span className="text-orange-600">Just Banao.</span>
                </h2>

                <p className="final-cta-sub text-lg sm:text-xl text-neutral-300 mb-8 font-normal max-w-md">
                  Home services, just a few taps away.
                </p>

                <div className="final-cta-buttons flex flex-col sm:flex-row items-center justify-start gap-4 w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    showArrow
                    onClick={() => handleOpenBooking("Plumbing")}
                    className="w-full sm:w-auto shadow-lg shadow-orange-600/25"
                  >
                    Book a Service
                  </Button>

                  <Button
                    variant="white"
                    size="lg"
                    href="#download"
                    className="w-full sm:w-auto transition-all hover:bg-neutral-100"
                  >
                    <Smartphone size={18} className="mr-2" />
                    Download the App
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}

      <PartnersShowcase />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialService={selectedService}
      />

      {/* Interactive Pro Onboarding Modal */}
      <ProModal isOpen={proModalOpen} onClose={() => setProModalOpen(false)} />
    </div>
  );
}
