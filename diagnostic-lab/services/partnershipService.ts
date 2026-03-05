import * as partnershipRepository from "@/repositories/partnershipRepository";

export function getPartnershipBenefits() {
  return partnershipRepository.getPartnershipBenefits();
}

export function getPartnershipServices() {
  return partnershipRepository.getPartnershipServices();
}

export function getPartnershipCompany() {
  return partnershipRepository.getPartnershipCompany();
}
