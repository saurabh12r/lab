import supportData from "@/data/support.json";

export function getSupportInfo(): { supportPhone: string; whatsAppNumber: string } {
  const data = supportData as { support?: { supportPhone: string; whatsAppNumber: string } };
  return data.support ? JSON.parse(JSON.stringify(data.support)) : { supportPhone: "+1 (555) 012-3456", whatsAppNumber: "15550123456" };
}

export function getPreferredTimes(): string[] {
  return [...(supportData.preferredTimes as string[])];
}
