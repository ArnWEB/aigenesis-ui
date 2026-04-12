import { cn } from "@/lib/utils";

interface DocumentViewerProps {
  url: string;
  title?: string;
  className?: string;
}

export function DocumentViewer({ url, title = "Document", className }: DocumentViewerProps) {
  return (
    <div className={cn("rounded-xl overflow-hidden bg-[#1a1a1a]", className)}>
      <div className="bg-[#0b0b0b] px-4 py-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Open in new tab
          </a>
        )}
      </div>
      <div className="relative bg-[#252525]">
        {url ? (
          <iframe
            src={url}
            className="w-full h-[500px] border-0"
            title={title}
          />
        ) : (
          <div className="h-[500px] flex items-center justify-center text-gray-500">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm">No document available</p>
            </div>
          </div>
        )}
      </div>
      <div className="bg-[#1a1a1a] px-4 py-3 flex items-center justify-end gap-3">
        <button className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
          Reject
        </button>
        <button className="px-4 py-2 rounded-lg text-sm font-medium bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors">
          Approve
        </button>
      </div>
    </div>
  );
}