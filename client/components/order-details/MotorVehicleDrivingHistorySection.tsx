import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type InfoField = {
  label: string;
  value: ReactNode;
};

type MotorVehicleDrivingHistorySectionProps = {
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

const DRIVER_INFO_FIELDS: InfoField[] = [
  { label: "Texas Driver Record", value: "V6675" },
  { label: "Order Date", value: "01/06/2025" },
];

const MAIN_INFO_FIELDS: InfoField[] = [
  { label: "Host Used", value: "Online" },
  { label: "Reference", value: "CBCHEX:19675:700301" },
  { label: "License", value: "10998877" },
  { label: "Name", value: "Sue Jane" },
  { label: "Report Clear", value: "Yes" },
  { label: "Address", value: "-" },
  { label: "City", value: "-" },
  { label: "As of", value: "-" },
  { label: "Sex", value: "-" },
  { label: "Eyes", value: "-" },
  { label: "Hair", value: "-" },
  { label: "DOB", value: "-" },
  { label: "Height", value: "-" },
  { label: "Weight", value: "-" },
  { label: "Iss Date", value: "08/08/2024" },
  { label: "Exp Date", value: "11/24/2025" },
  { label: "Age", value: "45" },
];

const STATUS_FIELD: InfoField = { label: "Status", value: "Valid" };

const VIOLATIONS_FIELDS: InfoField[] = [
  {
    label: "Violations/Convictions And Failures to Appear And Accidents",
    value: "None to Report",
  },
  { label: "Suspensions/Revocations", value: "No Activity" },
];

const LICENSE_DETAILS_FIELDS: InfoField[] = [
  { label: "License", value: "Personal" },
  { label: "Issue", value: "06/01/2021" },
  { label: "Expire", value: "11/24/2025" },
  { label: "Status", value: "Valid" },
  { label: "Class", value: "R Regular Operator License" },
];

const MISC_STATE_DATA_FIELD: InfoField = {
  label: "Miscellaneous State Data",
  value:
    "EXPIRATION DATES IN THIS DOCUMENT MAY HAVE BEEN EXTENDED PURSUANT TO EXECUTIVE OR LEGISLATIVE ACTION OF THE ISSUING JURISDICTION RELATED TO COVID-19. PLEASE CONSULT WITH THE JURISDICTION FOR FURTHER DETAILS.",
};

export function MotorVehicleDrivingHistorySection({
  expanded,
  onToggle,
}: MotorVehicleDrivingHistorySectionProps) {
  return (
    <section
      id="motor-vehicle-driving-history"
      className={cn(
        "w-full self-stretch rounded-xl border border-[#E9EAEB] bg-white shadow-sm",
        !expanded && "pb-5",
      )}
    >
      <div className="px-4 pt-5 sm:px-6">
        <div className="flex items-start justify-between gap-3 md:items-center md:flex-nowrap md:gap-4">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center md:flex-nowrap">
            <h2 className="text-lg font-semibold leading-7 text-[#181D27]">
              Motor Vehicle Driving History
            </h2>
            <StatusPill variant="muted">1</StatusPill>
            <StatusPill variant="success">Completed - Verified</StatusPill>
          </div>
          <IconButton
            onClick={onToggle}
            aria-label={
              expanded
                ? "Collapse Motor Vehicle Driving History"
                : "Expand Motor Vehicle Driving History"
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
        <div className="space-y-2.5 px-4 pb-5 pt-3 sm:px-6">
          <div className="space-y-2.5">
            {DRIVER_INFO_FIELDS.map((field, index) => (
              <InfoItem key={`driver-${index}`} {...field} />
            ))}
          </div>

          <SectionDivider />

          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
            {MAIN_INFO_FIELDS.map((field, index) => (
              <InfoItem key={`main-${index}`} {...field} />
            ))}
          </div>

          <SectionDivider />

          <InfoItem {...STATUS_FIELD} />

          <SectionDivider />

          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
            {VIOLATIONS_FIELDS.map((field, index) => (
              <InfoItem key={`violations-${index}`} {...field} />
            ))}
          </div>

          <SectionDivider />

          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
            {LICENSE_DETAILS_FIELDS.map((field, index) => (
              <InfoItem key={`license-${index}`} {...field} />
            ))}
          </div>

          <SectionDivider />

          <InfoItem {...MISC_STATE_DATA_FIELD} />
        </div>
      )}
    </section>
  );
}
