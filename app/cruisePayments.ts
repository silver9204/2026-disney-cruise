// Final payment statement issued 2026-09-10. Amounts are in USD cents.
// The original stays private in Drive; no passenger or booking identifiers are published.
export const cruisePaymentStatementUrl = "https://drive.google.com/file/d/1I0aVh8G98XOK-g7fZNcBCBhjSnD_tfIO/view?usp=drivesdk";
export const cruisePayments = [
  { date: "2025.09.30", label: "예약금", amountCents: 45840, method: "외부카드" },
  { date: "2026.09.10", label: "잔금", amountCents: 228940, method: "외부카드" },
];
export const cruisePaidCents = cruisePayments.reduce((sum, item) => sum + item.amountCents, 0);
export const usd = (cents: number) => `US$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
