import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type InfoField = {
  label: string;
  value: ReactNode;
};

type FivePanelsSectionProps = {
  expanded: boolean;
  onToggle: () => void;
};

const CARD_SHADOW =
  "shadow-[0_0_0_1px_rgba(10,13,18,0.18)_inset,0_-2px_0_0_rgba(10,13,18,0.05)_inset,0_1px_2px_rgba(10,13,18,0.05)]";

function StatusPill({
  variant,
  children,
}: {
  variant: "warning" | "muted";
  children: ReactNode;
}) {
  const variantClasses =
    variant === "warning"
      ? "border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815]"
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
        "flex h-9 w-9 items-center justify-center rounded-lg border border-[#D5D7DA] bg-white",
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

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-base font-medium leading-6 text-[#181D27]">
      {children}
    </h3>
  );
}

function SectionDivider() {
  return <div className="h-px w-full bg-[#E9EAEB]" />;
}

const ACCOUNT_INFO_FIELDS: InfoField[] = [
  { label: "Location Code", value: "-" },
  { label: "Location Name", value: "-" },
  { label: "Location Phone", value: "-" },
  { label: "Account Name", value: "Flatirons" },
  { label: "Account Number", value: "1234578" },
  { label: "DOT Regulated Account", value: "N" },
  { label: "Reference ID", value: "-" },
];

const COLLECTION_SITE_FIELDS: InfoField[] = [
  { label: "Collection Site Address", value: "-" },
  { label: "Collection Site Address", value: "-" },
  { label: "City", value: "-" },
  { label: "State", value: "-" },
  { label: "State", value: "-" },
  { label: "Zip", value: "-" },
  { label: "Collector Name", value: "Sue Jeans" },
  { label: "Collector Phone", value: "604624562" },
  { label: "PSC Collection Site", value: "1" },
];

const SPECIMEN_DETAILS_FIELDS: InfoField[] = [
  {
    label: "Test Lab ID",
    value: "Point Of Care Test performed at the collection site",
  },
  { label: "Specimen ID", value: "059544444" },
  { label: "Split Specimen", value: "0" },
  { label: "DOT Specimen Result", value: "Negative" },
  { label: "Date Specimen Collected", value: "2025-04-25 17:41:00 GMT" },
  { label: "Specimen Lab Receipt Date", value: "2025-04-25 17:41:00 GMT" },
  { label: "Specimen Lab Report Date", value: "2025-04-25 17:41:00 GMT" },
  { label: "Specimen Temperature", value: "-" },
  { label: "Temperature in Range", value: "1" },
  { label: "Specimen Transmission", value: "First time reporting" },
  { label: "Overall Specimen Result", value: "Negative" },
];

export function FivePanelsSection({
  expanded,
  onToggle,
}: FivePanelsSectionProps) {
  return (
    <section
      id="five-panels-section"
      className="rounded-xl border border-[#E9EAEB] bg-white shadow-sm"
    >
      <div className="px-4 pt-5 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold leading-7 text-[#181D27]">
              5 Panels
            </h2>
            <StatusPill variant="warning">Pending</StatusPill>
            <StatusPill variant="muted">1</StatusPill>
          </div>
          <IconButton
            onClick={onToggle}
            aria-label={expanded ? "Collapse 5 Panels" : "Expand 5 Panels"}
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
        <div className="space-y-2.5 px-4 pb-5 pt-3 sm:px-6">
          <div
            className={cn(
              "space-y-3 rounded-lg border border-[#E9EAEB] bg-white p-4",
              CARD_SHADOW,
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base font-medium leading-6 text-[#181D27]">
                  5 Panels
                </span>
                <span className="text-base font-medium leading-6 text-[#181D27]">
                  Sue Jane
                </span>
                <StatusPill variant="warning">Pending</StatusPill>
              </div>
              <IconButton aria-label="More 5 Panels actions">
                <ChevronDown className="h-4 w-4 text-[#A4A7AE]" />
              </IconButton>
            </div>

            <div className="space-y-3">
              <SectionTitle>Account Information</SectionTitle>

              <div className="space-y-2">
                {ACCOUNT_INFO_FIELDS.map((field, index) => (
                  <InfoItem key={`account-${index}`} {...field} />
                ))}
              </div>

              <SectionDivider />

              <SectionTitle>MRO Information</SectionTitle>

              <SectionDivider />

              <SectionTitle>MRO From CCF</SectionTitle>

              <SectionDivider />

              <SectionTitle>Collection Site</SectionTitle>

              <div className="space-y-2">
                {COLLECTION_SITE_FIELDS.map((field, index) => (
                  <InfoItem key={`collection-${index}`} {...field} />
                ))}
              </div>

              <SectionDivider />

              <SectionTitle>Specimen Details</SectionTitle>

              <SectionDivider />

              <SectionTitle>Test ID</SectionTitle>

              <div className="space-y-2">
                {SPECIMEN_DETAILS_FIELDS.map((field, index) => (
                  <InfoItem key={`specimen-${index}`} {...field} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
