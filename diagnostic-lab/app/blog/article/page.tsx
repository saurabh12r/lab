import type { Metadata } from "next";
import Link from "next/link";
import { getArticle } from "@/services/blogService";

export const metadata: Metadata = {
  title: "Article – Quick Care Pathology Blog",
  description: "Health and wellness insights from Quick Care Pathology.",
};

export default function BlogArticlePage() {
  const ARTICLE = getArticle();
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
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="size-8 text-[#0a6a99] flex items-center justify-center bg-[#0a6a99]/10 rounded-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.5 16.5L16.5 10.5L15.09 9.09L10.5 13.67L8.91 12.09L7.5 13.5L10.5 16.5Z" fill="currentColor" fillRule="evenodd" />
                </svg>
              </div>
              <span className="text-slate-900 text-lg font-bold tracking-tight">Quick Care Pathology</span>
            </Link>
            <nav className="hidden lg:flex items-center gap-6">
              <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/">Home</Link>
              <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/blog">Blog</Link>
              <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/contact">Contact</Link>
              <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/partnership">Partnership</Link>
              <Link className="text-slate-600 text-sm font-medium hover:text-[#0a6a99] transition-colors" href="/packages">Packages</Link>
            </nav>
            <Link href="/packages" className="h-10 px-5 flex items-center justify-center rounded-full bg-[#0a6a99] text-white text-sm font-semibold hover:bg-[#0a6a99]/90 transition-colors">
              Book Test
            </Link>
          </div>
        </header>

        <main className="flex-grow max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link href="/" className="hover:text-[#0a6a99] transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <Link href="/blog" className="hover:text-[#0a6a99] transition-colors">Health Blog</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-slate-700 font-medium line-clamp-1">{ARTICLE.title}</span>
          </nav>

          <article className="max-w-3xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0a6a99]">{ARTICLE.category}</span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">{ARTICLE.title}</h1>
            <p className="mt-3 text-slate-500 text-sm">
              {ARTICLE.author} · {ARTICLE.publishDate}
            </p>
            <div className="mt-6 aspect-video rounded-xl overflow-hidden bg-slate-100">
              <img src={ARTICLE.image} alt="" className="w-full h-full object-cover" />
            </div>
            <p className="mt-6 text-lg text-slate-600">{ARTICLE.excerpt}</p>
            <p className="mt-4 text-slate-600">{ARTICLE.content}</p>
          </article>

          <div className="max-w-3xl mx-auto mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#0a6a99] font-semibold text-sm hover:text-[#064b6e] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to Blog
            </Link>
          </div>
        </main>

        <footer className="mt-auto border-t border-slate-200 bg-white py-8">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <p className="text-sm text-slate-500">© 2026 Quick Care Pathology.</p>
            <div className="flex gap-6">
            <Link href="/blog" className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors">Blog</Link>
            <Link href="/contact" className="text-sm text-slate-500 hover:text-[#0a6a99] transition-colors">Contact</Link>
          </div>
          </div>
        </footer>
      </div>
    </>
  );
}
