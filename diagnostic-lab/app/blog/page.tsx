import type { Metadata } from "next";
import Link from "next/link";
import { getBlogCategories, getBlogPosts } from "@/services/blogService";

export const metadata: Metadata = {
  title: "Health Blog – Quick Care Pathology",
  description:
    "Expert medical articles, health tips, and the latest diagnostic news to keep you informed and healthy.",
};

export default function BlogPage() {
  const CATEGORIES = getBlogCategories();
  const BLOG_POSTS = getBlogPosts();
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <div className="bg-[#f6f7f8] font-[Inter,sans-serif] text-slate-900 antialiased min-h-screen flex flex-col">

        {/* ── HEADER ── */}
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="size-8 text-[#0a6a99] flex items-center justify-center bg-[#0a6a99]/10 rounded-lg group-hover:bg-[#0a6a99]/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.5 16.5L16.5 10.5L15.09 9.09L10.5 13.67L8.91 12.09L7.5 13.5L10.5 16.5Z" fill="currentColor" fillRule="evenodd" />
                  </svg>
                </div>
                <span className="text-slate-900 text-lg font-bold tracking-tight">Quick Care Pathology</span>
              </Link>
              <nav className="hidden lg:flex items-center gap-6">
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/">Home</Link>
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/tests">Tests</Link>
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/packages">Packages</Link>
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/upload-prescription">Upload Prescription</Link>
                <Link className="text-slate-600 text-sm font-medium text-[#0a6a99] transition-colors" href="/blog">Blog</Link>
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/contact">Contact</Link>
                <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/partnership">Partnership</Link>
                <a className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="#">About Us</a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:flex h-10 px-5 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 text-sm font-semibold hover:bg-slate-50 transition-colors">
                Login
              </Link>
              <Link href="/packages" className="h-10 px-5 items-center justify-center rounded-full bg-[#0a6a99] text-white text-sm font-semibold hover:bg-[#0a6a99]/90 transition-all shadow-lg shadow-[#0a6a99]/20 flex gap-2">
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                <span className="hidden sm:inline">Book Test</span>
              </Link>
            </div>
          </div>
        </header>

        {/* ── MAIN ── */}
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
              <Link href="/" className="hover:text-[#0a6a99] transition-colors">Home</Link>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="text-slate-700 font-medium">Health Blog</span>
            </nav>

            {/* Hero */}
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Health &amp; Wellness Insights
              </h1>
              <p className="mt-3 text-lg text-slate-600 max-w-2xl">
                Expert medical articles, health tips, and the latest diagnostic news to keep you informed and healthy.
              </p>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    cat === "All"
                      ? "bg-[#0a6a99] text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-[#0a6a99]/50 hover:text-[#0a6a99]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Blog grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                >
                  <Link href="/blog/article" className="block aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0a6a99] mb-2">
                      {post.category}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-slate-600 flex-1 line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <Link
                      href="/blog/article"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#0a6a99] hover:text-[#064b6e] transition-colors"
                    >
                      Read More
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors disabled:opacity-50" disabled aria-label="Previous page">
                <span className="material-symbols-outlined text-[24px]">chevron_left</span>
              </button>
              <button className="min-w-[2.5rem] h-10 rounded-lg bg-[#0a6a99] text-white text-sm font-semibold shadow-sm">
                1
              </button>
              <button className="min-w-[2.5rem] h-10 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
                2
              </button>
              <button className="min-w-[2.5rem] h-10 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
                3
              </button>
              <span className="px-2 text-slate-400 text-sm">...</span>
              <button className="min-w-[2.5rem] h-10 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
                12
              </button>
              <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" aria-label="Next page">
                <span className="material-symbols-outlined text-[24px]">chevron_right</span>
              </button>
            </div>

            {/* Newsletter */}
            <section className="mt-16 md:mt-20 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10 text-center">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Subscribe to our newsletter
              </h2>
              <p className="mt-3 text-slate-600 max-w-xl mx-auto">
                Get the latest health tips, diagnostic news, and exclusive offers delivered straight to your inbox.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a6a99]/50 focus:border-transparent"
                />
                <button className="h-12 px-6 rounded-xl bg-[#0a6a99] text-white text-sm font-bold shadow-md shadow-[#0a6a99]/20 hover:bg-[#085780] transition-colors shrink-0">
                  Subscribe
                </button>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                We care about your data in our{" "}
                <a href="#" className="text-[#0a6a99] hover:underline">privacy policy</a>.
              </p>
            </section>
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer className="mt-auto border-t border-slate-200 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">© 2026 Quick Care Pathology. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="#">Privacy Policy</a>
              <a className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="#">Terms of Service</a>
              <Link className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="/partnership">Business Partnership</Link>
              <Link className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors" href="/support">Support</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
