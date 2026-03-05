import * as mediaRepository from "@/repositories/mediaRepository";

export function getPromos() {
  return mediaRepository.getPromos();
}

export function getBanners() {
  return mediaRepository.getBanners();
}
