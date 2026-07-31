/**
 * WhatsApp integration utility
 * Default WhatsApp number (user can change this)
 */
export const WHATSAPP_NUMBER = "916266007182";

/**
 * Formats enquiry form data into a beautifully formatted WhatsApp text message
 */
export function buildWhatsAppMessage({ name, phone, destination, travelDate, travelers, message, packageTitle }) {
  let text = `✨ *NEW TRAVEL ENQUIRY — Travel Culture* ✨\n\n`;
  text += `👤 *Name:* ${name || "N/A"}\n`;
  text += `📞 *Phone:* ${phone || "N/A"}\n`;

  if (packageTitle) {
    text += `📦 *Package:* ${packageTitle}\n`;
  }
  text += `📍 *Destination:* ${destination || "General Enquiry"}\n`;

  if (travelDate) {
    text += `📅 *Travel Date:* ${travelDate}\n`;
  }
  if (travelers) {
    text += `👥 *Travelers:* ${travelers} Person(s)\n`;
  }
  if (message) {
    text += `💬 *Message/Notes:* ${message}\n`;
  }

  text += `\n--- Sent via TravelCulture.com ---`;
  return text;
}

/**
 * Returns full WhatsApp Web/App redirect URL
 */
export function getWhatsAppURL(formData) {
  const textMessage = typeof formData === "string" ? formData : buildWhatsAppMessage(formData);
  const encoded = encodeURIComponent(textMessage);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Direct trigger helper
 */
export function openWhatsAppEnquiry(formData) {
  const url = getWhatsAppURL(formData);
  window.open(url, "_blank", "noopener,noreferrer");
}
