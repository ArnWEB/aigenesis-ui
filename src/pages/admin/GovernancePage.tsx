import { useState } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

const PERSONAS = [
  { id: "executors", name: "Executors", description: "Enterprise analytics & reporting" },
  { id: "underwriter", name: "Underwriter", description: "Risk assessment & policy approval" },
  { id: "adjudicator", name: "Adjudicator", description: "Claims validation & processing" },
  { id: "customer-service", name: "Customer Service", description: "Tier 1 support & inquiries" },
  { id: "operations", name: "Operations", description: "Core system management" },
  { id: "customer-agent", name: "Field Agent", description: "Mobile field operations" },
];

const KNOWLEDGE_SOURCES = [
  { id: "googledrive", name: "Google Drive", type: "Cloud", icon: "📁", status: "connected", files: 142 },
  { id: "sharepoint", name: "SharePoint", type: "Enterprise", icon: "🏢", status: "connected", files: 89 },
  { id: "filesystem", name: "File System", type: "Local", icon: "💾", status: "connected", files: 256 },
  { id: "s3", name: "AWS S3", type: "Cloud Storage", icon: "☁️", status: "connected", files: 78 },
  { id: "confluence", name: "Confluence", type: "Wiki", icon: "📘", status: "disconnected", files: 0 },
  { id: "notion", name: "Notion", type: "Workspace", icon: "📝", status: "disconnected", files: 0 },
];

const knowledgeBase = [
  { category: "Policies", articles: 42, lastUpdated: "2026-04-01" },
  { category: "Procedures", articles: 28, lastUpdated: "2026-03-28" },
  { category: "Compliance", articles: 15, lastUpdated: "2026-03-25" },
  { category: "Training", articles: 56, lastUpdated: "2026-04-05" },
];

export function GovernancePage() {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestionStatus, setIngestionStatus] = useState<string>("");

  const toggleSource = (sourceId: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handleIngest = async () => {
    if (!selectedPersona || selectedSources.length === 0) return;
    
    setIsIngesting(true);
    setIngestionStatus("Connecting to knowledge sources...");
    
    for (let i = 0; i < selectedSources.length; i++) {
      const source = KNOWLEDGE_SOURCES.find(s => s.id === selectedSources[i]);
      setIngestionStatus(`Ingesting from ${source?.name}... (${i + 1}/${selectedSources.length})`);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setIngestionStatus("Processing and embedding documents...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIngestionStatus("Knowledge base updated successfully!");
    setIsIngesting(false);
    
    setTimeout(() => {
      setIngestionStatus("");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold text-on-surface">Knowledge Governance</h1>
        <p className="text-on-surface-variant mt-1">Manage knowledge base and ingest documents for AI</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassPanel className="p-4">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">Total Articles</span>
          <p className="text-2xl font-headline font-bold text-on-surface mt-1">141</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">Pending Review</span>
          <p className="text-2xl font-headline font-bold text-secondary mt-1">8</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">Compliance Score</span>
          <p className="text-2xl font-headline font-bold text-tertiary mt-1">96%</p>
        </GlassPanel>
        <GlassPanel className="p-4">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">Vector Embeddings</span>
          <p className="text-2xl font-headline font-bold text-on-surface mt-1">12.4K</p>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Select Persona</h3>
          <p className="text-sm text-on-surface-variant mb-4">Choose the AI persona that will use this knowledge</p>
          <div className="space-y-2">
            {PERSONAS.map((persona) => (
              <button
                key={persona.id}
                onClick={() => setSelectedPersona(persona.id)}
                className={cn(
                  "w-full p-3 rounded-lg border transition-all text-left",
                  selectedPersona === persona.id
                    ? "bg-primary/10 border-primary text-on-surface"
                    : "bg-surface-container-low border-outline-variant/20 text-on-surface-variant hover:border-primary/50"
                )}
              >
                <p className="text-sm font-medium">{persona.name}</p>
                <p className="text-xs text-on-surface-variant">{persona.description}</p>
              </button>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Knowledge Sources</h3>
          <p className="text-sm text-on-surface-variant mb-4">Select documents to ingest into knowledge base</p>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {KNOWLEDGE_SOURCES.map((source) => {
              const isDisabled = source.status === "disconnected";
              return (
                <button
                  key={source.id}
                  onClick={() => !isDisabled && toggleSource(source.id)}
                  disabled={isDisabled}
                  className={cn(
                    "w-full p-3 rounded-lg border transition-all flex items-center justify-between",
                    isDisabled && "opacity-50 cursor-not-allowed",
                    selectedSources.includes(source.id)
                      ? "bg-secondary/10 border-secondary text-on-surface"
                      : "bg-surface-container-low border-outline-variant/20 text-on-surface-variant hover:border-secondary/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{source.icon}</span>
                    <div className="text-left">
                      <p className="text-sm font-medium">{source.name}</p>
                      <p className="text-xs text-on-surface-variant">{source.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {source.status === "connected" ? (
                      <span className="px-2 py-1 text-[10px] rounded-full bg-tertiary/20 text-tertiary">
                        {source.files} files
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-[10px] rounded-full bg-error/20 text-error">
                        Connect
                      </span>
                    )}
                    {source.status === "connected" && (
                      <div className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center",
                        selectedSources.includes(source.id) ? "bg-secondary border-secondary" : "border-outline-variant"
                      )}>
                        {selectedSources.includes(source.id) && (
                          <svg className="w-3 h-3 text-on-secondary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <button
              onClick={handleIngest}
              disabled={!selectedPersona || selectedSources.length === 0 || isIngesting}
              className={cn(
                "w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
                !selectedPersona || selectedSources.length === 0
                  ? "bg-surface-container text-on-surface-variant cursor-not-allowed"
                  : isIngesting
                    ? "bg-secondary/50 text-on-secondary cursor-wait"
                    : "bg-gradient-to-r from-secondary to-secondary-dim text-on-secondary hover:brightness-110"
              )}
            >
              {isIngesting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Ingesting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Start Ingestion
                </>
              )}
            </button>
            
            {ingestionStatus && (
              <p className="mt-3 text-sm text-center text-secondary animate-pulse">
                {ingestionStatus}
              </p>
            )}
            
            {(!selectedPersona || selectedSources.length === 0) && !isIngesting && (
              <p className="mt-2 text-xs text-center text-on-surface-variant">
                {!selectedPersona ? "Select a persona" : "Select at least one knowledge source"}
              </p>
            )}
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="p-6">
        <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Knowledge Categories</h3>
        <div className="space-y-3">
          {knowledgeBase.map((kb) => (
            <div key={kb.category} className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg hover:bg-surface-bright/40 transition-colors cursor-pointer">
              <div>
                <p className="text-sm font-medium text-on-surface">{kb.category}</p>
                <p className="text-xs text-on-surface-variant">{kb.articles} articles</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-on-surface-variant">Last updated</p>
                <p className="text-xs text-primary">{kb.lastUpdated}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}