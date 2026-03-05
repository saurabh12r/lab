import partnershipData from "@/data/partnership.json";

export function getPartnershipBenefits() {
  return JSON.parse(JSON.stringify(partnershipData.benefits));
}

export function getPartnershipServices() {
  return [...(partnershipData.services as string[])];
}

export function getPartnershipCompany() {
  return JSON.parse(JSON.stringify(partnershipData.company));
}
