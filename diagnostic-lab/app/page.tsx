import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trutest Diagnostics",
  description:
    "Book blood tests, full body checkups, and upload prescriptions online. Get accurate reports delivered to your app within 24 hours.",
};

export default function Home() {
  return (
    <>
      {/* Google Fonts: Inter + Material Symbols */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f7f8] text-[#0d171c] font-[Inter,sans-serif] antialiased">

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white/90 backdrop-blur-md px-10 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0a6a99]/10 text-[#0a6a99]">
              <span className="material-symbols-outlined text-[28px]">medical_services</span>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-[#0d171c]">
              Trutest Diagnostics
            </h2>
          </div>

          <div className="flex flex-1 justify-end gap-8">
            <nav className="hidden items-center gap-8 lg:flex">
              <Link className="text-sm font-semibold text-[#0d171c] hover:text-[#0a6a99] transition-colors" href="/">Home</Link>
              <Link className="text-sm font-medium text-slate-600 hover:text-[#0a6a99] transition-colors" href="/tests">Tests</Link>
              <Link className="text-sm font-medium text-slate-600 hover:text-[#0a6a99] transition-colors" href="/packages">Packages</Link>
              <Link className="text-sm font-medium text-slate-600 hover:text-[#0a6a99] transition-colors" href="/upload-prescription">Upload Prescription</Link>
              <Link className="text-sm font-medium text-slate-600 hover:text-[#0a6a99] transition-colors" href="/blog">Blog</Link>
              <Link className="text-sm font-medium text-slate-600 hover:text-[#0a6a99] transition-colors" href="/partnership">Partnership</Link>
              <a className="text-sm font-medium text-slate-600 hover:text-[#0a6a99] transition-colors" href="#">About Us</a>
              <Link className="text-sm font-medium text-slate-600 hover:text-[#0a6a99] transition-colors" href="/contact">Contact</Link>
            </nav>
            <div className="flex gap-3">
              <button className="flex h-10 cursor-pointer items-center justify-center rounded-lg bg-slate-100 px-4 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors">
                <span className="material-symbols-outlined mr-2 text-[18px]">location_on</span>
                <span>New York</span>
              </button>
              <Link href="/login" className="flex h-10 cursor-pointer items-center justify-center rounded-lg bg-[#0a6a99] px-6 text-sm font-bold text-white shadow-md shadow-[#0a6a99]/20 hover:bg-[#085780] transition-colors">
                <span>Login</span>
              </Link>
            </div>
          </div>
        </header>

        {/* ── MAIN ───────────────────────────────────────────────── */}
        <main className="flex flex-col">

          {/* ── HERO SECTION ───────────────────────────────────────── */}
          <section className="relative mx-auto w-full max-w-[1440px] px-4 py-6 md:px-10">
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 z-0 h-full w-full bg-cover bg-center opacity-60 mix-blend-overlay"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBH-Qb6TT9wGTbbLaNa2vGJDX_Cg3EO5gGkbAHD-3ucjIwIDf5ayscenW4JmL6ZAxfQW4a695Li2UHKSdAeqRuJlzoUx0kGAKDXTBgaI4zVBi1gY0nSdeYyy91eR-5F25tiZPbARPjb72Y1pXv5XqAgTCwiZMunuzv3e_wwwlPLuJA9Fx8p7-z4W5esmmrr4gOe9qdkMH7qX6rq80QWmWNy0AShJCRkiwnFLKAKChe_oXVLlIABBo8iteXm1xNx2-ZLmfLyE2N81taN")',
                }}
              />
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0a6a99]/90 to-slate-900/80" />

              <div className="relative z-10 flex min-h-[520px] flex-col items-center justify-center px-6 py-20 text-center">
                <span className="mb-4 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                  Trusted by 10,000+ Patients
                </span>

                <h1 className="mb-6 max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                  Advanced Diagnostics <br className="hidden md:block" /> You Can Trust completely.
                </h1>

                <p className="mb-10 max-w-2xl text-lg font-medium text-slate-100/90 md:text-xl">
                  Book blood tests, full body checkups, and upload prescriptions online.
                  Get accurate reports delivered to your app within 24 hours.
                </p>

                {/* Search Bar */}
                <div className="mb-10 w-full max-w-2xl">
                  <label className="relative flex w-full items-center">
                    <span className="absolute left-4 flex items-center text-slate-400">
                      <span className="material-symbols-outlined text-[24px]">search</span>
                    </span>
                    <input
                      className="h-14 w-full rounded-2xl border-none bg-white pl-12 pr-4 text-lg font-medium text-slate-900 shadow-lg placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#0a6a99]/30"
                      placeholder="Search for tests (e.g., CBC, Thyroid, Vitamin D)"
                      type="text"
                    />
                    <button className="absolute right-2 top-2 bottom-2 rounded-xl bg-[#0a6a99] px-6 text-sm font-bold text-white hover:bg-[#085780]">
                      Search
                    </button>
                  </label>
                </div>

                {/* Hero CTAs */}
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/packages" className="flex h-12 items-center justify-center rounded-xl bg-white px-8 text-base font-bold text-[#0a6a99] shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl">
                    <span className="material-symbols-outlined mr-2">medical_information</span>
                    Book Health Package
                  </Link>
                  <Link href="/upload-prescription" className="flex h-12 items-center justify-center rounded-xl bg-white/10 px-8 text-base font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20 border border-white/20">
                    <span className="material-symbols-outlined mr-2">upload_file</span>
                    Upload Prescription
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ── HOW IT WORKS ──────────────────────────────────────── */}
          <section className="py-16 px-6 md:px-20 bg-white">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">How It Works</h2>
                <p className="mt-4 text-lg text-slate-600">Get tested in 4 simple steps from the comfort of your home.</p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {/* Step 1 */}
                <div className="relative flex flex-col items-center text-center group">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#e6f0f5] text-[#0a6a99] transition-colors group-hover:bg-[#0a6a99] group-hover:text-white">
                    <span className="material-symbols-outlined text-[40px]">search</span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">1. Book Test</h3>
                  <p className="text-sm text-slate-600">Select your test or health package and book a slot via website or app.</p>
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-slate-100 -z-10" />
                </div>

                {/* Step 2 */}
                <div className="relative flex flex-col items-center text-center group">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#e6f0f5] text-[#0a6a99] transition-colors group-hover:bg-[#0a6a99] group-hover:text-white">
                    <span className="material-symbols-outlined text-[40px]">home_health</span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">2. Home Collection</h3>
                  <p className="text-sm text-slate-600">Our certified phlebotomist will visit your home to collect the sample.</p>
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-slate-100 -z-10" />
                </div>

                {/* Step 3 */}
                <div className="relative flex flex-col items-center text-center group">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#e6f0f5] text-[#0a6a99] transition-colors group-hover:bg-[#0a6a99] group-hover:text-white">
                    <span className="material-symbols-outlined text-[40px]">science</span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">3. Lab Processing</h3>
                  <p className="text-sm text-slate-600">Samples are processed in our NABL accredited state-of-the-art labs.</p>
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-slate-100 -z-10" />
                </div>

                {/* Step 4 */}
                <div className="relative flex flex-col items-center text-center group">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#e6f0f5] text-[#0a6a99] transition-colors group-hover:bg-[#0a6a99] group-hover:text-white">
                    <span className="material-symbols-outlined text-[40px]">description</span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">4. Digital Report</h3>
                  <p className="text-sm text-slate-600">Receive accurate digital reports via email and app within 24 hours.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── POPULAR PACKAGES ──────────────────────────────────── */}
          <section className="bg-[#f6f7f8] py-16 px-4 md:px-10">
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">Popular Health Packages</h2>
                  <p className="mt-2 text-slate-600">Curated packages for comprehensive health monitoring.</p>
                </div>
                <Link className="hidden text-sm font-bold text-[#0a6a99] hover:text-[#085780] sm:flex items-center" href="/packages">
                  View all packages{" "}
                  <span className="material-symbols-outlined ml-1 text-base">arrow_forward</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {/* Card 1 – Basic Health Check */}
                <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="rounded-lg bg-green-100 px-3 py-1 text-xs font-bold uppercase text-green-700">Save 20%</div>
                    <button className="text-slate-400 hover:text-red-500">
                      <span className="material-symbols-outlined">favorite</span>
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Basic Health Check</h3>
                  <p className="mt-1 text-sm text-slate-500">Ideal for annual screening.</p>
                  <div className="my-4 border-t border-slate-100 pt-4">
                    <ul className="space-y-3">
                      {["Complete Blood Count", "Lipid Profile", "Blood Sugar Fasting"].map((t) => (
                        <li key={t} className="flex items-start text-sm text-slate-700">
                          <span className="material-symbols-outlined mr-2 text-[20px] text-green-600">check_circle</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-4">
                    <div className="mb-4 flex items-baseline">
                      <span className="text-2xl font-black text-slate-900">$49</span>
                      <span className="ml-2 text-sm text-slate-400 line-through">$62</span>
                    </div>
                    <Link href="/packages" className="w-full rounded-xl bg-[#0a6a99] py-3 text-sm font-bold text-white shadow-md shadow-[#0a6a99]/20 hover:bg-[#085780] transition-colors flex items-center justify-center">
                      Book Now
                    </Link>
                  </div>
                </div>

                {/* Card 2 – Comprehensive Body Profile (Best Value) */}
                <div className="flex flex-col rounded-2xl border border-[#0a6a99]/20 bg-white p-6 shadow-md ring-1 ring-[#0a6a99]/10">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="rounded-lg bg-[#0a6a99] px-3 py-1 text-xs font-bold uppercase text-white">Best Value</div>
                    <button className="text-slate-400 hover:text-red-500">
                      <span className="material-symbols-outlined">favorite</span>
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Comprehensive Body Profile</h3>
                  <p className="mt-1 text-sm text-slate-500">Full body analysis including vital organs.</p>
                  <div className="my-4 border-t border-slate-100 pt-4">
                    <ul className="space-y-3">
                      {["Liver Function Test", "Kidney Function Test", "Thyroid Profile", "Urine Analysis"].map((t) => (
                        <li key={t} className="flex items-start text-sm text-slate-700">
                          <span className="material-symbols-outlined mr-2 text-[20px] text-green-600">check_circle</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-4">
                    <div className="mb-4 flex items-baseline">
                      <span className="text-2xl font-black text-slate-900">$99</span>
                      <span className="ml-2 text-sm text-slate-400 line-through">$140</span>
                    </div>
                    <button className="w-full rounded-xl bg-[#0a6a99] py-3 text-sm font-bold text-white shadow-md shadow-[#0a6a99]/20 hover:bg-[#085780] transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>

                {/* Card 3 – Premium Wellness */}
                <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="rounded-lg bg-green-100 px-3 py-1 text-xs font-bold uppercase text-green-700">Save 15%</div>
                    <button className="text-slate-400 hover:text-red-500">
                      <span className="material-symbols-outlined">favorite</span>
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Premium Wellness</h3>
                  <p className="mt-1 text-sm text-slate-500">Includes advanced cardiac markers.</p>
                  <div className="my-4 border-t border-slate-100 pt-4">
                    <ul className="space-y-3">
                      {["Vitamin D & B12", "Iron Studies", "Cardiac Risk Markers"].map((t) => (
                        <li key={t} className="flex items-start text-sm text-slate-700">
                          <span className="material-symbols-outlined mr-2 text-[20px] text-green-600">check_circle</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-4">
                    <div className="mb-4 flex items-baseline">
                      <span className="text-2xl font-black text-slate-900">$199</span>
                      <span className="ml-2 text-sm text-slate-400 line-through">$235</span>
                    </div>
                    <button className="w-full rounded-xl bg-[#0a6a99] py-3 text-sm font-bold text-white shadow-md shadow-[#0a6a99]/20 hover:bg-[#085780] transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>

                {/* Card 4 – Senior Citizen Care */}
                <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="rounded-lg bg-green-100 px-3 py-1 text-xs font-bold uppercase text-green-700">Save 10%</div>
                    <button className="text-slate-400 hover:text-red-500">
                      <span className="material-symbols-outlined">favorite</span>
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Senior Citizen Care</h3>
                  <p className="mt-1 text-sm text-slate-500">Tailored for ages 60+.</p>
                  <div className="my-4 border-t border-slate-100 pt-4">
                    <ul className="space-y-3">
                      {["Bone Health Profile", "Diabetes Screening", "Electrolytes"].map((t) => (
                        <li key={t} className="flex items-start text-sm text-slate-700">
                          <span className="material-symbols-outlined mr-2 text-[20px] text-green-600">check_circle</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-4">
                    <div className="mb-4 flex items-baseline">
                      <span className="text-2xl font-black text-slate-900">$129</span>
                      <span className="ml-2 text-sm text-slate-400 line-through">$145</span>
                    </div>
                    <button className="w-full rounded-xl bg-[#0a6a99] py-3 text-sm font-bold text-white shadow-md shadow-[#0a6a99]/20 hover:bg-[#085780] transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile: View all */}
              <div className="mt-8 flex justify-center sm:hidden">
                <Link href="/packages" className="flex items-center rounded-lg border border-slate-300 bg-white px-6 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
                  View all packages{" "}
                  <span className="material-symbols-outlined ml-1 text-base">arrow_forward</span>
                </Link>
              </div>
            </div>
          </section>

          {/* ── WHY CHOOSE US ─────────────────────────────────────── */}
          <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-base font-semibold leading-7 text-[#0a6a99]">Our Promise</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Why Choose Trutest Diagnostics?
                </p>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  We combine advanced technology with expert care to deliver diagnostic services you can rely on.
                </p>
              </div>

              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                  {[
                    {
                      icon: "verified",
                      title: "NABL Accredited Labs",
                      desc: "Our laboratories adhere to the highest international quality standards, ensuring 100% accurate results every time.",
                    },
                    {
                      icon: "biotech",
                      title: "Latest Technology",
                      desc: "We use fully automated analyzers and AI-assisted reporting tools to minimize human error and speed up processing.",
                    },
                    {
                      icon: "schedule",
                      title: "Timely Reports",
                      desc: "Get your reports delivered digitally within 24 hours for most routine tests, so you can consult your doctor sooner.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex flex-col">
                      <dt className="flex items-center gap-x-3 text-base font-bold leading-7 text-slate-900">
                        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-[#0a6a99] text-white">
                          <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        {item.title}
                      </dt>
                      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                        <p className="flex-auto">{item.desc}</p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {/* ── DOWNLOAD APP CTA ──────────────────────────────────── */}
          <section className="bg-slate-900 py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Download the Trutest App
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-slate-300">
                    Track your health trends, book tests on the go, and access your family&apos;s medical records securely in one place.
                  </p>
                  <div className="mt-8 flex gap-4">
                    <button className="flex items-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 hover:bg-slate-100">
                      <span className="material-symbols-outlined mr-2">ios</span>
                      App Store
                    </button>
                    <button className="flex items-center rounded-xl bg-transparent border border-slate-600 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800">
                      <span className="material-symbols-outlined mr-2">android</span>
                      Play Store
                    </button>
                  </div>
                </div>

                <div className="relative h-64 overflow-hidden rounded-2xl md:h-80 lg:h-96">
                  <div
                    className="absolute inset-0 h-full w-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCgIDPe7Ohix0_GJL7g-9-yIWyWKUMEc_K5i0hupa_tNIhEb1CGXUdS8GPfXitqz3qwUx_eZMN4PnDIzMtOV5Z0XokwtLmHaFMxPQfHcXAiZLyE5fBb02LdbYISItZXGs1WBaOTPB9gqgSSDhN4Om1HqIZ-bWIbIUmnSZ24pRfskOQHeCC7tvTYnVSsswZwSMAMJdFXjstrgF8hUlYUzHUxcZ48VE11LKI6gR9CRoR3Yhx5t0zNJ9Qy5NOVCCbqSMBxAmM0ngxMfGx-")',
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a6a99] text-white">
                    <span className="material-symbols-outlined text-[20px]">medical_services</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Trutest</h3>
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  Empowering better health through precision diagnostics and accessible care.
                </p>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-sm font-semibold leading-6 text-slate-900">Services</h3>
                <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
                  {["Pathology Tests", "Radiology", "Corporate Wellness", "Covid-19 Testing"].map((s) => (
                    <li key={s}><a className="hover:text-[#0a6a99]" href="#">{s}</a></li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-sm font-semibold leading-6 text-slate-900">Company</h3>
                <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
                  <li><a className="hover:text-[#0a6a99]" href="#">About Us</a></li>
                  <li><a className="hover:text-[#0a6a99]" href="#">Careers</a></li>
                  <li><Link className="hover:text-[#0a6a99]" href="/blog">Blog</Link></li>
                  <li><Link className="hover:text-[#0a6a99]" href="/partnership">Business Partnership</Link></li>
                  <li><Link className="hover:text-[#0a6a99]" href="/contact">Contact</Link></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-sm font-semibold leading-6 text-slate-900">Support</h3>
                <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
                  {["Help Center", "Terms of Service", "Privacy Policy"].map((s) => (
                    <li key={s}><a className="hover:text-[#0a6a99]" href="#">{s}</a></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16 border-t border-slate-200 pt-8 sm:mt-20 lg:mt-24 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs leading-5 text-slate-500">© 2024 Trutest Diagnostics. All rights reserved.</p>
              <Link href="/admin" className="text-xs font-medium text-slate-500 hover:text-[#0a6a99] transition-colors">Admin</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
