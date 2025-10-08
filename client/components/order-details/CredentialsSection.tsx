import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type CredentialsSectionProps = {
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

const FIELD_LABELS = [
  "Organization",
  "Description",
  "License Location",
  "License State",
  "License Number",
  "Date Received",
  "License Status",
  "Order Comments",
  "Person Interviewed",
  "Researched By",
  "Research Comments",
];

const PROVIDED_BY_SUBJECT = [
  "YMCA",
  "CPRA Credentials",
  "USA",
  "TX",
  "1932299",
  "01/01/2024",
  "01/01/2027",
  "Active",
  "",
  "",
  "",
];

const PROVIDED_BY_SOURCE = [
  "YMCA",
  "CPRA Credentials",
  "USA",
  "TX",
  "1932299",
  "01/01/2024",
  "01/01/2027",
  "Active",
  "",
  "",
  "",
];

const RESEARCH_RESULTS = [
  "Verified",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

export function CredentialsSection({
  expanded,
  onToggle,
}: CredentialsSectionProps) {
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  return (
    <section
      id="credentials-professional-license"
      className={cn(
        "w-full self-stretch overflow-hidden rounded-xl border border-[#E9EAEB] bg-white shadow-sm",
        !expanded && "pb-5",
      )}
    >
      <div className="px-4 pt-5 sm:px-6">
        <div className="flex items-start justify-between gap-3 md:items-center md:flex-nowrap md:gap-4">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center md:flex-nowrap">
            <h2 className="text-lg font-semibold leading-7 text-[#181D27]">
              Credentials-Professional License #1
            </h2>
            <StatusPill variant="success">Completed - Verified</StatusPill>
            <StatusPill variant="muted">1</StatusPill>
          </div>
          <IconButton
            onClick={onToggle}
            aria-label={
              expanded
                ? "Collapse Credentials-Professional License"
                : "Expand Credentials-Professional License"
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
        <div className="px-4 pb-5 pt-3 sm:px-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="h-9 border-b border-[#E9EAEB] bg-white px-3 py-1.5 text-left"></th>
                  <th className="h-9 min-w-[153px] border-b border-[#E9EAEB] bg-white px-3 py-1.5 text-left text-xs font-semibold leading-[18px] text-[#717680]">
                    Provided by Subject
                  </th>
                  <th className="h-9 min-w-[153px] border-b border-[#E9EAEB] bg-white px-3 py-1.5 text-left text-xs font-semibold leading-[18px] text-[#717680]">
                    Provided by Source
                  </th>
                  <th className="h-9 min-w-[200px] border-b border-[#E9EAEB] bg-white px-3 py-1.5 text-left text-xs font-semibold leading-[18px] text-[#717680]">
                    Research Results
                  </th>
                </tr>
              </thead>
              <tbody>
                {FIELD_LABELS.map((label, index) => (
                  <tr
                    key={index}
                    onMouseEnter={() => setHoveredRowIndex(index)}
                    onMouseLeave={() => setHoveredRowIndex(null)}
                    className={cn(
                      "transition-colors",
                      hoveredRowIndex === index && "bg-[#F5F5F5]",
                    )}
                  >
                    <td className="h-9 min-w-[171px] border-b border-[#E9EAEB] px-3 py-1.5 text-xs font-semibold leading-[18px] text-[#717680]">
                      {label}
                    </td>
                    <td className="h-9 min-w-[153px] border-b border-[#E9EAEB] px-3 py-3 text-sm font-medium leading-5 text-[#181D27]">
                      {PROVIDED_BY_SUBJECT[index]}
                    </td>
                    <td className="h-9 min-w-[153px] border-b border-[#E9EAEB] px-3 py-3 text-sm font-medium leading-5 text-[#181D27]">
                      {PROVIDED_BY_SOURCE[index]}
                    </td>
                    <td className="h-9 min-w-[200px] border-b border-[#E9EAEB] px-3 py-3">
                      {RESEARCH_RESULTS[index] && (
                        <StatusPill variant="success">
                          {RESEARCH_RESULTS[index]}
                        </StatusPill>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
