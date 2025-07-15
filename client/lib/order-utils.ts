/**
 * Generates a random 5-digit order number
 * @returns A string representing a 5-digit order number (e.g., "73848")
 */
export function generateOrderNumber(): string {
  // Generate a random number between 10000 and 99999 (inclusive)
  const orderNumber = Math.floor(Math.random() * 90000) + 10000;
  return orderNumber.toString();
}

/**
 * Formats a full name from first, middle, and last name components
 * @param firstName - The first name
 * @param middleName - The middle name (optional)
 * @param lastName - The last name
 * @returns A formatted full name
 */
export function formatFullName(
  firstName: string,
  middleName?: string,
  lastName?: string,
): string {
  const nameParts = [firstName, middleName, lastName].filter(
    (part) => part && part.trim(),
  );
  return nameParts.join(" ");
}

/**
 * Extracts contact information from the contact fields array
 * @param contacts - Array of contact field objects
 * @returns Object with email and phone information
 */
export function extractContactInfo(
  contacts: Array<{
    type: "email" | "phone";
    value: string;
  }>,
): { email?: string; phone?: string } {
  const email = contacts.find((contact) => contact.type === "email")?.value;
  const phone = contacts.find((contact) => contact.type === "phone")?.value;

  return {
    email: email?.trim() || undefined,
    phone: phone?.trim() || undefined,
  };
}
