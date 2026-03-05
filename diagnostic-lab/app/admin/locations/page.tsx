"use client";

import { useState } from "react";

const PRIMARY = "#1349ec";
const BG_LIGHT = "#f6f6f8";

type AreaStatus = "Active" | "Inactive";

interface ServiceArea {
  id: string;
  name: string;
  zipCodes: string;
  status: AreaStatus;
}

interface Location {
  id: string;
  city: string;
  createdDate: string;
  areas: ServiceArea[];
}

const DUMMY_LOCATIONS: Location[] = [
  {
    id: "LOC-001",
    city: "New York",
    createdDate: "Jan 15, 2023",
    areas: [
      { id: "A1", name: "Manhattan", zipCodes: "10001 - 10282", status: "Active" },
      { id: "A2", name: "Brooklyn", zipCodes: "11201 - 11256", status: "Active" },
      { id: "A3", name: "Queens", zipCodes: "11004 - 11697", status: "Active" },
      { id: "A4", name: "Staten Island", zipCodes: "10301 - 10314", status: "Inactive" },
    ],
  },
  {
    id: "LOC-002",
    city: "Los Angeles",
    createdDate: "Feb 10, 2023",
    areas: [
      { id: "A5", name: "Downtown LA", zipCodes: "90012 - 90015", status: "Active" },
      { id: "A6", name: "Santa Monica", zipCodes: "90401 - 90405", status: "Active" },
    ],
  },
  {
    id: "LOC-003",
    city: "Chicago",
    createdDate: "Mar 5, 2023",
    areas: [
      { id: "A7", name: "Loop", zipCodes: "60601 - 60606", status: "Active" },
      { id: "A8", name: "North Side", zipCodes: "60613 - 60618", status: "Active" },
    ],
  },
  {
    id: "LOC-004",
    city: "Houston",
    createdDate: "Apr 20, 2023",
    areas: [
      { id: "A9", name: "Downtown Houston", zipCodes: "77002 - 77010", status: "Active" },
    ],
  },
];

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<Location[]>(DUMMY_LOCATIONS);
  const [selectedId, setSelectedId] = useState<string>(DUMMY_LOCATIONS[0].id);
  const [citySearch, setCitySearch] = useState("");
  const [showAddCity, setShowAddCity] = useState(false);
  const [showAddArea, setShowAddArea] = useState(false);

  const filteredCities = citySearch.trim()
    ? locations.filter((l) => l.city.toLowerCase().includes(citySearch.toLowerCase()))
    : locations;

  const selected = locations.find((l) => l.id === selectedId) ?? locations[0];

  const toggleAreaStatus = (areaId: string) => {
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === selectedId
          ? {
              ...loc,
              areas: loc.areas.map((a) =>
                a.id === areaId ? { ...a, status: (a.status === "Active" ? "Inactive" : "Active") as AreaStatus } : a
              ),
            }
          : loc
      )
    );
  };

  const deleteArea = (areaId: string) => {
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === selectedId ? { ...loc, areas: loc.areas.filter((a) => a.id !== areaId) } : loc
      )
    );
  };

  const addCity = (city: string) => {
    const id = `LOC-${String(Date.now()).slice(-6)}`;
    setLocations((prev) => [...prev, { id, city, createdDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), areas: [] }]);
    setSelectedId(id);
    setShowAddCity(false);
  };

  const addArea = (name: string, zipCodes: string) => {
    if (!selected) return;
    const id = `A${String(Date.now()).slice(-4)}`;
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === selectedId ? { ...loc, areas: [...loc.areas, { id, name, zipCodes, status: "Active" as AreaStatus }] } : loc
      )
    );
    setShowAddArea(false);
  };

  const deleteLocation = (id: string) => {
    setLocations((prev) => prev.filter((l) => l.id !== id));
    if (selectedId === id && locations.length > 1) setSelectedId(locations.find((l) => l.id !== id)?.id ?? "");
  };

  return (
    <div className="flex flex-col min-h-full font-[Inter,sans-serif]" style={{ background: BG_LIGHT }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 lg:px-10 py-8 flex flex-col gap-6">
        {/* Page header — Stitch */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
          <div className="flex min-w-72 flex-col gap-1">
            <h1 className="text-[32px] font-bold leading-tight tracking-tight text-slate-900">
              Manage Locations & Service Areas
            </h1>
            <p className="text-slate-500 text-sm font-normal leading-normal">
              Add, edit, or delete cities and their corresponding service areas.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddCity(true)}
            className="flex items-center justify-center rounded-xl h-10 px-4 gap-2 text-sm font-bold shadow-sm hover:opacity-90 transition-opacity text-white"
            style={{ backgroundColor: PRIMARY }}
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add New City
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Cities list — Stitch */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <h3 className="font-semibold text-base text-slate-900">Cities</h3>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                  <input
                    type="text"
                    placeholder="Search cities..."
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    className="pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 bg-white text-sm focus:ring-[#1349ec] focus:border-[#1349ec] w-48 text-slate-900 placeholder:text-slate-500"
                  />
                </div>
              </div>
              <ul className="divide-y divide-slate-100">
                {filteredCities.map((loc) => (
                  <li
                    key={loc.id}
                    className={`p-4 flex justify-between items-center cursor-pointer border-l-4 transition-colors group ${
                      selectedId === loc.id
                        ? "bg-[#1349ec]/5 border-[#1349ec]"
                        : "border-transparent hover:bg-slate-50"
                    }`}
                    onClick={() => setSelectedId(loc.id)}
                  >
                    <div>
                      <h4 className={`font-medium ${selectedId === loc.id ? "text-[#1349ec]" : "text-slate-700"}`}>
                        {loc.city}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {loc.areas.length} Service Areas · {loc.createdDate}
                      </p>
                    </div>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="p-1.5 text-slate-400 hover:text-[#1349ec] rounded-lg hover:bg-white transition-colors"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteLocation(loc.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white transition-colors"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Areas table + preview — Stitch */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-200 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Areas in {selected?.city}</h3>
                  <p className="text-sm text-slate-500">Manage specific service zones within this city.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddArea(true)}
                  className="flex items-center justify-center rounded-lg h-9 px-3 gap-1.5 text-sm font-semibold transition-colors bg-[#1349ec]/10 text-[#1349ec] hover:bg-[#1349ec]/20"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Add Area
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Area Name</th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Zip Codes</th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selected?.areas.length ? (
                      selected.areas.map((area) => (
                        <tr key={area.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-4 text-sm font-medium text-slate-900">{area.name}</td>
                          <td className="px-5 py-4 text-sm text-slate-500">{area.zipCodes}</td>
                          <td className="px-5 py-4">
                            <button
                              type="button"
                              onClick={() => toggleAreaStatus(area.id)}
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                area.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-slate-100 text-slate-800"
                              }`}
                            >
                              {area.status}
                            </button>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button type="button" className="text-slate-400 hover:text-[#1349ec] mx-1 transition-colors">
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteArea(area.id)}
                              className="text-slate-400 hover:text-red-500 mx-1 transition-colors"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-5 py-8 text-center text-sm text-slate-500">
                          No service areas yet. Click &quot;Add Area&quot; to add one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Preview — Stitch */}
            <div className="bg-slate-50 rounded-xl border border-dashed border-slate-300 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-slate-400 text-[20px]">visibility</span>
                <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Frontend Dropdown Preview</h4>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 max-w-md">
                <label className="block text-sm font-medium text-slate-700 mb-2">Select your location for testing</label>
                <div className="space-y-4">
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-slate-300 rounded-md focus:ring-[#1349ec] focus:border-[#1349ec] sm:text-sm text-slate-900">
                    {locations.map((l) => (
                      <option key={l.id} value={l.id}>{l.city}</option>
                    ))}
                  </select>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-slate-300 rounded-md focus:ring-[#1349ec] focus:border-[#1349ec] sm:text-sm text-slate-900">
                    <option value="">Select Area...</option>
                    {selected?.areas.map((a) => (
                      <option key={a.id} disabled={a.status === "Inactive"} value={a.id}>
                        {a.name}{a.status === "Inactive" ? " (Currently Unavailable)" : ""}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1349ec] hover:opacity-90"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    View Available Tests
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add City modal (simplified) */}
      {showAddCity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowAddCity(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add New City</h3>
            <input
              type="text"
              placeholder="City name"
              id="new-city-name"
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#1349ec] mb-4"
              onKeyDown={(e) => e.key === "Enter" && addCity((e.target as HTMLInputElement).value)}
            />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setShowAddCity(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50">Cancel</button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("new-city-name") as HTMLInputElement;
                  if (el?.value.trim()) addCity(el.value.trim());
                }}
                className="px-4 py-2 rounded-lg text-white hover:opacity-90"
                style={{ backgroundColor: PRIMARY }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Area modal */}
      {showAddArea && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowAddArea(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add Area to {selected.city}</h3>
            <input
              type="text"
              placeholder="Area name"
              id="new-area-name"
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#1349ec] mb-3"
            />
            <input
              type="text"
              placeholder="Zip codes (e.g. 10001 - 10282)"
              id="new-area-zip"
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#1349ec] mb-4"
              onKeyDown={(e) => e.key === "Enter" && (document.getElementById("new-area-add-btn") as HTMLButtonElement)?.click()}
            />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setShowAddArea(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50">Cancel</button>
              <button
                id="new-area-add-btn"
                type="button"
                onClick={() => {
                  const nameEl = document.getElementById("new-area-name") as HTMLInputElement;
                  const zipEl = document.getElementById("new-area-zip") as HTMLInputElement;
                  if (nameEl?.value.trim()) addArea(nameEl.value.trim(), zipEl?.value?.trim() ?? "");
                }}
                className="px-4 py-2 rounded-lg text-white hover:opacity-90"
                style={{ backgroundColor: PRIMARY }}
              >
                Add Area
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
