import { cn } from "@/lib/utils";

interface ApplicantDetail {
  label: string;
  value: string;
}

interface ApplicantDetailsProps {
  name?: string;
  details: ApplicantDetail[];
  className?: string;
}

export function ApplicantDetails({ name, details, className }: ApplicantDetailsProps) {
  return (
    <div className={cn("rounded-xl overflow-hidden", className)}>
      <div className="bg-[#0b0b0b] px-4 py-3">
        <h3 className="text-sm font-semibold text-white">Applicant Details</h3>
      </div>
      <div className="bg-[#1a1a1a] p-4 space-y-3">
        {name && (
          <div className="flex items-center justify-between pb-3 border-b border-[#333]">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Applicant Name</span>
            <span className="text-sm font-medium text-white">{name}</span>
          </div>
        )}
        {details.map((detail, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-wider">{detail.label}</span>
            <span className="text-sm text-white bg-[#252525] px-3 py-1.5 rounded-md min-w-[140px] text-right">
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}