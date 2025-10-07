import { ReactNode } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

type InfoField = {
  label: string;
  value: ReactNode;
};

type CreditEmploymentReportSectionProps = {
  expanded: boolean;
  onToggle: () => void;
};

const CARD_SHADOW =
  "shadow-[0_0_0_1px_rgba(10,13,18,0.18)_inset,0_-2px_0_0_rgba(10,13,18,0.05)_inset,0_1px_2px_rgba(10,13,18,0.05)]";

function StatusPill({
  variant,
  children,
}: {
  variant: "success" | "muted";
  children: ReactNode;
}) {
  const variantClasses =
    variant === "success"
      ? "border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]"
      : "border-[#E9EAEB] bg-[#FAFAFA] text-[#414651]";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium leading-[18px]",
        variantClasses,
      )}
    >
      {children}
    </span>
  );
}

function IconButton({
  children,
  className,
  "aria-label": ariaLabel,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-[#D5D7DA] bg-white",
        CARD_SHADOW,
        "transition hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#344698]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        className,
      )}
    >
      {children}
    </button>
  );
}

function InfoItem({ label, value }: InfoField) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-base font-normal leading-6 text-[#717680]">
        {label}
      </span>
      <div className="text-base font-normal leading-6 text-[#181D27]">
        {value}
      </div>
    </div>
  );
}

function SectionDivider() {
  return <div className="h-px w-full bg-[#E9EAEB]" />;
}

const INFO_FIELDS: InfoField[] = [
  {
    label: "Transunion Truvi Employment Cred Rpt For",
    value: "Sue Janes",
  },
  { label: "User Ref", value: "PDT2906762" },
  { label: "Date Report Printed", value: "05/02/2025" },
  { label: "Central Standard Time", value: "08:51" },
  { label: "Bureau", value: "11" },
  { label: "In Our Files Since", value: "06/2023" },
  { label: "Subject Name", value: "Jean, Sue" },
  { label: "Social Security Number", value: "XXX-XXX-9999" },
  {
    label: "Current Address Reported",
    value: "1016 Street., Houston Tx . 48230",
  },
];

const SPECIAL_MESSAGE =
  "****Address Alert: Current Input Address Does Not Match File Address(Es)";

const TABLE_DATA = [
  {
    date: "05/02/2025",
    subcode: "P2906762",
    subscriberName: "Sue Jean",
  },
];

export function CreditEmploymentReportSection({
  expanded,
  onToggle,
}: CreditEmploymentReportSectionProps) {
  return (
    <section className="rounded-xl border border-[#E9EAEB] bg-white shadow-sm">
      <div className="px-4 pt-5 sm:px-6">
        <div className="flex items-center justify-between gap-3 md:flex-nowrap">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 md:flex-nowrap">
            <h2 className="truncate text-lg font-semibold leading-7 text-[#181D27]">
              Credit Employment Report
            </h2>
            <StatusPill variant="success">Completed - Verified</StatusPill>
            <StatusPill variant="muted">1</StatusPill>
          </div>
          <IconButton
            onClick={onToggle}
            aria-label={
              expanded
                ? "Collapse Credit Employment Report"
                : "Expand Credit Employment Report"
            }
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 text-[#A4A7AE] transition-transform",
                expanded && "rotate-180",
              )}
            />
          </IconButton>
        </div>
      </div>

      {expanded && (
        <div className="space-y-2 px-4 pb-5 pt-3 sm:px-6">
          <div className="space-y-2">
            {INFO_FIELDS.map((field, index) => (
              <InfoItem key={`info-${index}`} {...field} />
            ))}
          </div>

          <SectionDivider />

          <InfoItem label="Special Messages" value={SPECIAL_MESSAGE} />

          <SectionDivider />

          <div className="space-y-2">
            <p className="text-base font-normal leading-6 text-[#181D27]">
              The Following Companies Have Requested A Copy Of The Subject's
              File For
            </p>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E9EAEB]">
                    <th className="px-3 py-1.5 text-left text-xs font-semibold leading-[18px] text-[#717680]">
                      Date
                    </th>
                    <th className="px-3 py-1.5 text-left text-xs font-semibold leading-[18px] text-[#717680]">
                      Subcode
                    </th>
                    <th className="px-3 py-1.5 text-left text-xs font-semibold leading-[18px] text-[#717680]">
                      Subscriber Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_DATA.map((row, index) => (
                    <tr key={index} className="border-b border-[#E9EAEB]">
                      <td className="px-3 py-3 text-sm font-medium leading-5 text-[#181D27]">
                        {row.date}
                      </td>
                      <td className="px-3 py-3 text-sm font-medium leading-5 text-[#181D27]">
                        {row.subcode}
                      </td>
                      <td className="px-3 py-3 text-sm font-medium leading-5 text-[#181D27]">
                        {row.subscriberName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              className={cn(
                "mt-2 flex min-h-9 items-center gap-1 rounded-lg border border-[#D5D7DA] bg-white px-2 py-1.5",
                CARD_SHADOW,
                "transition hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#344698]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
              )}
            >
              <span className="px-0.5 text-sm font-semibold leading-5 text-[#414651]">
                See File
              </span>
              <ExternalLink className="h-4 w-4 text-[#A4A7AE]" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
