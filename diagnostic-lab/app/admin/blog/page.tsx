"use client";

import { useState } from "react";

const PRIMARY = "#1349ec";
const BG_LIGHT = "#f6f6f8";

type BlogStatus = "Published" | "Draft";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishDate: string;
  status: BlogStatus;
}

const DUMMY_BLOGS: BlogPost[] = [
  { id: "BLG-001", title: "Understanding Your Blood Test Results", slug: "/understanding-blood-tests", category: "Health Tips", author: "Dr. Sarah Lee", publishDate: "Oct 24, 2023", status: "Published" },
  { id: "BLG-002", title: "The Importance of Regular Health Checkups", slug: "/regular-health-checkups", category: "Wellness", author: "Dr. James Wilson", publishDate: "Oct 20, 2023", status: "Published" },
  { id: "BLG-003", title: "New Advanced MRI Technology", slug: "/advanced-mri-technology", category: "News", author: "Dr. Admin", publishDate: "Oct 18, 2023", status: "Draft" },
  { id: "BLG-004", title: "Diabetes Screening: What to Expect", slug: "/diabetes-screening", category: "Health Tips", author: "Dr. Sarah Lee", publishDate: "Oct 15, 2023", status: "Published" },
  { id: "BLG-005", title: "Seasonal Flu and Lab Testing", slug: "/seasonal-flu-testing", category: "News", author: "Dr. James Wilson", publishDate: "—", status: "Draft" },
];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(DUMMY_BLOGS);
  const [tab, setTab] = useState<"all" | "drafts">("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filtered = tab === "drafts" ? posts.filter((p) => p.status === "Draft") : posts;

  const togglePublish = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: (p.status === "Published" ? "Draft" : "Published") as BlogStatus } : p))
    );
  };

  const deleteBlog = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) setShowForm(false);
    setEditingId(null);
  };

  const openCreate = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (id: string) => {
    setEditingId(id);
    setShowForm(true);
  };

  const editingPost = editingId ? posts.find((p) => p.id === editingId) : null;

  return (
    <div className="flex flex-col min-h-full font-[Inter,sans-serif]" style={{ background: BG_LIGHT }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header — Stitch */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Content & Blog Management</h1>
              <p className="text-slate-500 text-sm mt-1">Manage articles, health tips, and clinic news.</p>
            </div>
            <button
              type="button"
              onClick={openCreate}
              className="flex items-center gap-2 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              Create New Blog
            </button>
          </div>

          {/* Tabs — Stitch */}
          <div className="flex border-b border-slate-200 gap-8">
            <button
              type="button"
              onClick={() => setTab("all")}
              className={`flex items-center gap-2 pb-3 pt-2 border-b-2 transition-colors ${
                tab === "all" ? "border-[#1349ec] text-[#1349ec]" : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">list_alt</span>
              <span className={`text-sm leading-normal ${tab === "all" ? "font-bold" : "font-medium"}`}>All Blogs</span>
            </button>
            <button
              type="button"
              onClick={() => setTab("drafts")}
              className={`flex items-center gap-2 pb-3 pt-2 border-b-2 transition-colors ${
                tab === "drafts" ? "border-[#1349ec] text-[#1349ec]" : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">edit_document</span>
              <span className={`text-sm leading-normal ${tab === "drafts" ? "font-bold" : "font-medium"}`}>Drafts</span>
            </button>
          </div>

          {/* Table — Stitch */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Title</th>
                    <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Category</th>
                    <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Author</th>
                    <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Publish Date</th>
                    <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filtered.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">{post.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{post.slug}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{post.category}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{post.author}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{post.publishDate}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            post.status === "Published"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEdit(post.id)}
                            className="p-1.5 text-slate-500 hover:text-[#1349ec] transition-colors rounded-md hover:bg-slate-100"
                            title="Edit"
                          >
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => togglePublish(post.id)}
                            className="p-1.5 text-slate-500 hover:text-[#1349ec] transition-colors rounded-md hover:bg-slate-100"
                            title={post.status === "Published" ? "Unpublish" : "Publish"}
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {post.status === "Published" ? "visibility_off" : "publish"}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteBlog(post.id)}
                            className="p-1.5 text-slate-500 hover:text-red-500 transition-colors rounded-md hover:bg-slate-100"
                            title="Delete"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Create/Edit Form — Stitch (visible when showForm) */}
          {showForm && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">
                {editingPost ? "Edit Blog" : "Create New Blog"}
              </h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Blog Title</label>
                    <input
                      type="text"
                      defaultValue={editingPost?.title}
                      placeholder="Enter title here..."
                      className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-[#1349ec] focus:border-[#1349ec] text-sm px-4 py-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Slug</label>
                    <input
                      type="text"
                      defaultValue={editingPost?.slug}
                      placeholder="/auto-generated-slug"
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 text-slate-500 focus:ring-[#1349ec] focus:border-[#1349ec] text-sm px-4 py-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Category</label>
                    <input
                      type="text"
                      defaultValue={editingPost?.category}
                      placeholder="e.g. Health Tips"
                      className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-[#1349ec] focus:border-[#1349ec] text-sm px-4 py-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Author</label>
                    <input
                      type="text"
                      defaultValue={editingPost?.author}
                      placeholder="Author name"
                      className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-[#1349ec] focus:border-[#1349ec] text-sm px-4 py-2"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Featured Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="space-y-1 text-center">
                      <span className="material-symbols-outlined text-4xl text-slate-400">add_photo_alternate</span>
                      <div className="flex text-sm text-slate-600 justify-center">
                        <span className="font-medium text-[#1349ec] hover:underline cursor-pointer">Upload a file</span>
                        <span className="pl-1">or drag and drop</span>
                      </div>
                      <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Content</label>
                  <div className="border border-slate-300 rounded-lg overflow-hidden bg-white">
                    <div className="bg-slate-50 border-b border-slate-300 px-3 py-2 flex items-center gap-2 text-slate-600">
                      <button type="button" className="p-1 hover:bg-slate-200 rounded"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
                      <button type="button" className="p-1 hover:bg-slate-200 rounded"><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
                      <button type="button" className="p-1 hover:bg-slate-200 rounded"><span className="material-symbols-outlined text-[18px]">format_underlined</span></button>
                      <div className="w-px h-5 bg-slate-300 mx-1" />
                      <button type="button" className="p-1 hover:bg-slate-200 rounded"><span className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
                      <button type="button" className="p-1 hover:bg-slate-200 rounded"><span className="material-symbols-outlined text-[18px]">format_list_numbered</span></button>
                      <div className="w-px h-5 bg-slate-300 mx-1" />
                      <button type="button" className="p-1 hover:bg-slate-200 rounded"><span className="material-symbols-outlined text-[18px]">link</span></button>
                      <button type="button" className="p-1 hover:bg-slate-200 rounded"><span className="material-symbols-outlined text-[18px]">image</span></button>
                    </div>
                    <textarea
                      placeholder="Start writing your blog post here..."
                      rows={10}
                      className="w-full border-none focus:ring-0 text-slate-900 bg-transparent p-4 text-sm resize-y"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    {editingPost ? "Update Blog" : "Publish Blog"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
