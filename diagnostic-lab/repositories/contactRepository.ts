import contactData from "@/data/contact.json";

export function getContactInfo() {
  return JSON.parse(JSON.stringify(contactData));
}
