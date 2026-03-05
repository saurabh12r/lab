import mediaData from "@/data/media.json";
import bannersData from "@/data/banners.json";

export function getPromos() {
  return JSON.parse(JSON.stringify(mediaData.promos));
}

export function getBanners(): { id: string; title: string; imageUrl: string; link: string; startDate: string; endDate: string | null; status: string }[] {
  return JSON.parse(JSON.stringify(bannersData));
}
