import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type InfoField = {
  label: string;
  value: ReactNode;
};

type CBSVSectionProps = {
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

const REQUEST_INFO_FIELDS: InfoField[] = [
  { label: "Results from the SSA", value: "-" },
  { label: "Response Code", value: "0000" },
  { label: "Description", value: "Verification Succesfull" },
];

export function CBSVSection({ expanded, onToggle }: CBSVSectionProps) {
  return (
    <section
      id="cbsv-section"
      className={cn(
        "w-full self-stretch rounded-xl border border-[#E9EAEB] bg-white shadow-sm",
        !expanded && "pb-5",
      )}
    >
      <div className="px-4 pt-5 sm:px-6">
        <div className="flex items-center justify-between gap-3 md:flex-nowrap md:gap-4">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 md:flex-nowrap">
            <h2 className="text-lg font-semibold leading-7 text-[#181D27]">
              CBSV
            </h2>
            <StatusPill variant="success">Completed Clear</StatusPill>
            <StatusPill variant="muted">1</StatusPill>
          </div>
          <IconButton
            onClick={onToggle}
            aria-label={expanded ? "Collapse CBSV" : "Expand CBSV"}
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
                  CBSV
                </span>
                <span className="text-base font-medium leading-6 text-[#181D27]">
                  Sue Jane
                </span>
                <StatusPill variant="success">Completed Clear</StatusPill>
              </div>
              <IconButton aria-label="More CBSV actions">
                <ChevronDown className="h-4 w-4 text-[#A4A7AE]" />
              </IconButton>
            </div>

            <div className="space-y-4">
              <SectionTitle>Request Has Been Completed</SectionTitle>

              <div className="flex flex-col gap-2 md:grid md:grid-cols-3">
                {REQUEST_INFO_FIELDS.map((field, index) => (
                  <InfoItem key={`request-${index}`} {...field} />
                ))}
              </div>

              <SectionDivider />

              <InfoItem
                label="Note"
                value="SSA result code 0000 means that the name, date of birth, and social security number you supplied all match each other in the SSA's database. In addition, this person is not deceased."
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
