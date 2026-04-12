import { useState } from "react";

const LANGFLOW_URL = "https://langflow-aigenesis-dev.azurewebsites.net/";

export default function AgentConsolePage() {
  const [viewMode, setViewMode] = useState<"embed" | "newtab">("embed");

  const langflowUrl = LANGFLOW_URL;

  if (viewMode === "newtab") {
    window.open(langflowUrl, "_blank");
    setViewMode("embed");
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-foreground">Agent Console</h1>
        <button
          onClick={() => setViewMode("newtab")}
          className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          Open in New Tab
        </button>
      </div>
      <div className="flex-1 border border-neutral-700 rounded-lg overflow-hidden bg-background">
        <iframe
          src={langflowUrl}
          className="w-full h-full"
          style={{ border: "none", minHeight: "calc(100vh - 200px)" }}
          title="Langflow Agent Console"
        />
      </div>
    </div>
  );
}