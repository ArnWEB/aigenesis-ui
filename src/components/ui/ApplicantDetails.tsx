import { useState } from "react";
import { cn } from "@/lib/utils";

interface ApplicantDetail {
  label: string;
  value: string;
}

interface ApplicantDetailsProps {
  name?: string;
  details: ApplicantDetail[];
  onChange?: (details: ApplicantDetail[]) => void;
  editable?: boolean;
  className?: string;
}

export function ApplicantDetails({ name, details, onChange, editable = true, className }: ApplicantDetailsProps) {
  const [localDetails, setLocalDetails] = useState(details);

  const handleChange = (index: number, newValue: string) => {
    const updated = [...localDetails];
    updated[index] = { ...updated[index], value: newValue };
    setLocalDetails(updated);
    onChange?.(updated);
  };

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
        {localDetails.map((detail, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-wider">{detail.label}</span>
            {editable ? (
              <input
                type="text"
                value={detail.value}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="text-sm text-white bg-[#252525] px-3 py-1.5 rounded-md min-w-[140px] text-right border border-transparent hover:border-gray-600 focus:border-primary focus:outline-none w-full max-w-[200px]"
              />
            ) : (
              <span className="text-sm text-white bg-[#252525] px-3 py-1.5 rounded-md min-w-[140px] text-right">
                {detail.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}