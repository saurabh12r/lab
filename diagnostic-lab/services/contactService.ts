import * as contactRepository from "@/repositories/contactRepository";

export function getContactInfo() {
  return contactRepository.getContactInfo();
}
