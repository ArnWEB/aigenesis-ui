import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { sampleUsers, PERSONA_LABELS } from "@/data/users";

export function DashboardPage() {
  const { user } = useAuthContext();
  const location = useLocation();
  
  const [selectedPersona, setSelectedPersona] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [additionalDetails, setAdditionalDetails] = useState<string>("");
  const [showSourceConfig, setShowSourceConfig] = useState(false);
  const [notification, setNotification] = useState<{show: boolean; message: string; type: "success" | "error"}>({show: false, message: "", type: "success"});
  
  const isAdminUsers = location.pathname === "/admin/users";
  const isAdminGovernance = location.pathname === "/admin/governance";
  const isAdminSettings = location.pathname === "/admin/settings";
  const isAdminDashboard = location.pathname === "/dashboard" && user?.role === "admin";
  
  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({show: true, message, type});
    setTimeout(() => setNotification({show: false, message: "", type: "success"}), 4000);
  };
  
  const roleConfig = useMemo(() => {
    const configs = {
      admin: {
        title: "Systems Overview",
        subtitle: "Real-time performance analytics and platform governance.",
        metrics: [
          { label: "Active Users", value: "1,247", change: "+12%", color: "primary" },
          { label: "System Uptime", value: "99.9%", change: "Optimal", color: "tertiary" },
          { label: "API Latency", value: "14ms", change: "Normal", color: "secondary" },
          { label: "Pending Reviews", value: "7", change: "+3", color: "error" },
        ],
      },
      executor: {
        title: "Executive Oversight",
        subtitle: `Welcome back, ${user?.name}. Here's your enterprise overview.`,
        metrics: [
          { label: "Global GWP", value: "$4.28B", change: "+12.4%", color: "primary" },
          { label: "Combined Ratio", value: "91.4%", change: "-2.1%", color: "secondary" },
          { label: "Net Loss Ratio", value: "64.2%", change: "-4.5%", color: "tertiary" },
          { label: "Active Policies", value: "1.2M+", change: "+8%", color: "primary" },
        ],
      },
      underwriter: {
        title: "Underwriter Dashboard",
        subtitle: "Risk assessment and policy management center.",
        metrics: [
          { label: "Pending Reviews", value: "24", change: "+5", color: "primary" },
          { label: "Risk Score", value: "72%", change: "+12%", color: "secondary" },
          { label: "Policies Approved", value: "156", change: "+18%", color: "tertiary" },
          { label: "Avg. Processing", value: "4.2h", change: "-15%", color: "primary" },
        ],
      },
      adjudicator: {
        title: "Adjudicator Command",
        subtitle: `Reviewing 12 pending high-priority claims.`,
        metrics: [
          { label: "Pending Claims", value: "12", change: "High", color: "error" },
          { label: "Avg Resolution", value: "4.2h", change: "-18%", color: "tertiary" },
          { label: "Verified Value", value: "$428.5k", change: "+12%", color: "primary" },
          { label: "AI Accuracy", value: "99.1%", change: "+0.4%", color: "secondary" },
        ],
      },
      customer_service: {
        title: "Customer Service Hub",
        subtitle: "Support desk and ticket management.",
        metrics: [
          { label: "Active Tickets", value: "24", change: "+12%", color: "primary" },
          { label: "Avg Response", value: "2.4m", change: "-15s", color: "secondary" },
          { label: "CSAT Score", value: "4.9", change: "Top", color: "tertiary" },
          { label: "Resolution Rate", value: "98%", change: "High", color: "primary" },
        ],
      },
      operations: {
        title: "Operations Center",
        subtitle: "System monitoring and agent management.",
        metrics: [
          { label: "Active Agents", value: "1,204", change: "+45", color: "primary" },
          { label: "CPU Load", value: "42.8%", change: "Normal", color: "secondary" },
          { label: "API Latency", value: "14ms", change: "Optimal", color: "tertiary" },
          { label: "GPU Compute", value: "88.2%", change: "Heavy", color: "error" },
        ],
      },
      customer_agent: {
        title: "Field Operations",
        subtitle: "Mobile agent workflow and ticket management.",
        metrics: [
          { label: "Active Tickets", value: "24", change: "+12%", color: "primary" },
          { label: "Response Time", value: "2.4m", change: "-15s", color: "secondary" },
          { label: "CSAT Score", value: "4.9", change: "Elite", color: "tertiary" },
          { label: "Resolution Rate", value: "98%", change: "High", color: "primary" },
        ],
      },
    };
    return configs[user?.role as keyof typeof configs] || configs.executor;
  }, [user]);

  const colorClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    tertiary: "bg-tertiary/10 text-tertiary border-tertiary/20",
    error: "bg-error/10 text-error border-error/20",
  };

  return (
    <div className="space-y-8">
      {/* Admin Dashboard - Ingestion Pipeline */}
      {isAdminDashboard && (
        <>
          <div>
            <h1 className="text-3xl font-headline font-bold text-on-surface">Systems Overview</h1>
            <p className="text-on-surface-variant mt-1">Real-time performance analytics and platform governance.</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <GlassPanel className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-on-surface-variant uppercase tracking-wider">Documents Processed</span>
              </div>
              <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">24,891</p>
              <p className="text-[10px] text-tertiary mt-1">+12% from last sync</p>
            </GlassPanel>
            <GlassPanel className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-on-surface-variant uppercase tracking-wider">Vectors Indexed</span>
              </div>
              <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">1.2M</p>
              <p className="text-[10px] text-primary mt-1">+8% from last sync</p>
            </GlassPanel>
            <GlassPanel className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-on-surface-variant uppercase tracking-wider">Avg. Processing Time</span>
              </div>
              <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">2.4s</p>
              <p className="text-[10px] text-secondary mt-1">-15% faster</p>
            </GlassPanel>
            <GlassPanel className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-on-surface-variant uppercase tracking-wider">Error Rate</span>
              </div>
              <p className="text-xl lg:text-2xl font-headline font-bold text-on-surface">0.02%</p>
              <p className="text-[10px] text-tertiary mt-1">Within acceptable range</p>
            </GlassPanel>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <GlassPanel className="lg:col-span-2 p-4 lg:p-6">
              <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Ingestion Trend (Last 7 Days)</h3>
              <div className="flex items-end justify-between h-32 lg:h-40 gap-2">
                {[{day:"Mon",value:65},{day:"Tue",value:78},{day:"Wed",value:82},{day:"Thu",value:71},{day:"Fri",value:89},{day:"Sat",value:45},{day:"Sun",value:38}].map((item,idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t" style={{height:`${item.value}%`}} />
                    <span className="text-[10px] text-on-surface-variant">{item.day}</span>
                  </div>
                ))}
              </div>
            </GlassPanel>
            <GlassPanel className="p-4 lg:p-6">
              <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Source Distribution</h3>
              <div className="space-y-3">
                {[{source:"SharePoint",p:42,c:"bg-primary"},{source:"Google Drive",p:28,c:"bg-secondary"},{source:"Azure Blob",p:18,c:"bg-tertiary"},{source:"Internal SQL",p:8,c:"bg-error"},{source:"Local Files",p:4,c:"bg-on-surface-variant"}].map((item,idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-on-surface-variant">{item.source}</span>
                      <span className="text-on-surface font-medium">{item.p}%</span>
                    </div>
                    <div className="h-2 bg-surface-container-highest rounded-full"><div className={cn("h-full rounded-full",item.c)} style={{width:`${item.p}%`}}/></div>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>
          
          <GlassPanel className="overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant/10">
              <h3 className="text-lg font-headline font-semibold text-on-surface">Active Ingestion Jobs</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-surface-container-high/30">
                  <th className="px-6 py-3 text-left text-xs font-label uppercase tracking-widest text-on-surface-variant">Job ID</th>
                  <th className="px-6 py-3 text-left text-xs font-label uppercase tracking-widest text-on-surface-variant">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-label uppercase tracking-widest text-on-surface-variant">Target Persona</th>
                  <th className="px-6 py-3 text-left text-xs font-label uppercase tracking-widest text-on-surface-variant">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-label uppercase tracking-widest text-on-surface-variant">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-label uppercase tracking-widest text-on-surface-variant">Started</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {[{id:"ING-7241",src:"SharePoint",persona:"Underwriter",prog:78,status:"Running",time:"10 min ago"},{id:"ING-7240",src:"Google Drive",persona:"Claims Adjuster",prog:100,status:"Completed",time:"2 hours ago"},{id:"ING-7239",src:"Azure Blob",persona:"Operations",prog:45,status:"Running",time:"25 min ago"},{id:"ING-7238",src:"Internal SQL",persona:"Executors",prog:100,status:"Completed",time:"5 hours ago"}].map((job,idx) => (
                  <tr key={idx} className="hover:bg-surface-variant/20">
                    <td className="px-6 py-4 text-sm font-medium text-primary">{job.id}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{job.src}</td>
                    <td className="px-6 py-4 text-sm text-on-surface">{job.persona}</td>
                    <td className="px-6 py-4"><div className="flex items-center gap-2"><div className="w-24 h-1.5 bg-surface-container-highest rounded-full"><div className={cn("h-full rounded-full",job.status==="Completed"?"bg-tertiary":"bg-secondary")} style={{width:`${job.prog}%`}}/></div><span className="text-xs text-on-surface-variant">{job.prog}%</span></div></td>
                    <td className="px-6 py-4"><span className={cn("px-2 py-1 rounded-full text-[10px] font-bold uppercase",job.status==="Completed"?"bg-tertiary/20 text-tertiary":"bg-secondary/20 text-secondary")}>{job.status}</span></td>
                    <td className="px-6 py-4 text-xs text-on-surface-variant">{job.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassPanel>
        </>
      )}

      {/* Admin Users Page */}
      {isAdminUsers && (
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-headline font-bold text-on-surface">User Management</h1>
              <p className="text-on-surface-variant mt-1">Manage platform users, roles, and permissions.</p>
            </div>
            <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium">Add User</button>
          </div>
          <GlassPanel className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-container-high/50">
                  <th className="px-6 py-4 text-left text-xs font-label uppercase tracking-widest text-on-surface-variant">User</th>
                  <th className="px-6 py-4 text-left text-xs font-label uppercase tracking-widest text-on-surface-variant">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-label uppercase tracking-widest text-on-surface-variant">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-label uppercase tracking-widest text-on-surface-variant">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-label uppercase tracking-widest text-on-surface-variant">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {sampleUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-surface-variant/30">
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-medium">{u.name.split(" ").map(n=>n[0]).join("")}</div><div><p className="text-sm font-medium text-on-surface">{u.name}</p><p className="text-xs text-on-surface-variant">{u.email}</p></div></div></td>
                    <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">{u.role.replace("_"," ")}</span></td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{u.department}</td>
                    <td className="px-6 py-4"><span className="flex items-center gap-2 text-xs text-tertiary"><span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"/>Active</span></td>
                    <td className="px-6 py-4 text-right"><button className="text-on-surface-variant hover:text-primary">•••</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassPanel>
        </div>
      )}

      {/* Admin Governance Page */}
      {isAdminGovernance && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-headline font-bold text-on-surface">Governance Console</h1>
            <p className="text-on-surface-variant mt-1">AI model controls and knowledge ingestion management.</p>
          </div>
          
          <GlassPanel className="p-6">
            <h3 className="text-lg font-headline font-semibold text-on-surface mb-6">Knowledge Ingestor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-on-surface-variant">Target Persona</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(PERSONA_LABELS).map(([key, value]) => (
                    <button key={key} onClick={()=>setSelectedPersona(key)} className={cn("p-3 rounded-lg border transition-all text-left",selectedPersona===key?"bg-primary/10 border-primary":"border-outline-variant/20 bg-surface-container-low hover:border-primary/30")}>
                      <span className={cn("text-xs font-medium",selectedPersona===key?"text-primary":"text-on-surface")}>{value.title}</span>
                      <p className="text-[10px] text-on-surface-variant">{value.subtitle}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-on-surface-variant">Data Source</label>
                <div className="space-y-2">
                  {[{id:"internal",n:"Internal SQL Cluster",s:"Live Production Database",l:"🗄️"},{id:"sharepoint",n:"SharePoint Ecosystem",s:"Microsoft 365 Documents",l:"🌐"},{id:"gdrive",n:"Google Drive Workspace",s:"Cloud Storage",l:"📁"},{id:"azure",n:"Azure Blob Storage",s:"Microsoft Cloud",l:"☁️"},{id:"local",n:"Local File System",s:"On-Premise Files",l:"📂"}].map((src) => (
                    <button key={src.id} onClick={()=>{setSelectedSource(src.id);setShowSourceConfig(src.id==="sharepoint"||src.id==="gdrive"||src.id==="azure");}} className={cn("w-full p-3 rounded-lg border transition-all text-left flex items-center gap-3",selectedSource===src.id?"bg-secondary/10 border-secondary":"border-outline-variant/20 bg-surface-container-low hover:border-secondary/30")}>
                      <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-xl">{src.l}</div>
                      <div><span className={cn("text-sm font-medium block",selectedSource===src.id?"text-secondary":"text-on-surface")}>{src.n}</span><span className="text-[10px] text-on-surface-variant">{src.s}</span></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {showSourceConfig && (
              <div className="mb-6 p-4 bg-surface-container rounded-xl">
                <h4 className="text-sm font-semibold text-on-surface mb-4">{selectedSource==="sharepoint"?"SharePoint":selectedSource==="gdrive"?"Google Drive":"Azure"} Configuration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedSource==="sharepoint"&&[<input key="1" placeholder="Site URL" className="bg-surface-container-lowest border-b border-outline-variant/30 py-2 text-on-surface text-sm"/>,<input key="2" placeholder="Library Name" className="bg-surface-container-lowest border-b border-outline-variant/30 py-2 text-on-surface text-sm"/>]}
                  {selectedSource==="gdrive"&&[<input key="1" placeholder="Service Account Email" className="bg-surface-container-lowest border-b border-outline-variant/30 py-2 text-on-surface text-sm"/>,<input key="2" placeholder="Drive ID" className="bg-surface-container-lowest border-b border-outline-variant/30 py-2 text-on-surface text-sm"/>]}
                  {selectedSource==="azure"&&[<input key="1" placeholder="Storage Account" className="bg-surface-container-lowest border-b border-outline-variant/30 py-2 text-on-surface text-sm"/>,<input key="2" placeholder="Container Name" className="bg-surface-container-lowest border-b border-outline-variant/30 py-2 text-on-surface text-sm"/>]}
                </div>
              </div>
            )}
            
            <div className="space-y-2 mb-6">
              <label className="text-xs uppercase tracking-widest text-on-surface-variant">Additional Instructions</label>
              <textarea placeholder="Add specific instructions..." className="w-full bg-surface-container-lowest border-b border-outline-variant/30 py-3 px-3 text-on-surface resize-none h-24" value={additionalDetails} onChange={(e)=>setAdditionalDetails(e.target.value)}/>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">🛡️</div>
                <div><p className="text-sm font-medium text-on-surface">Ready to Ingest</p><p className="text-xs text-on-surface-variant">Auto-refresh: 02:00 UTC</p></div>
              </div>
              <button onClick={()=>{const pl=selectedPersona?PERSONA_LABELS[selectedPersona]?.title:"Not selected";const sn=selectedSource==="internal"?"Internal SQL":selectedSource==="sharepoint"?"SharePoint":selectedSource==="gdrive"?"Google Drive":selectedSource==="azure"?"Azure":"Local";showNotification(`Knowledge ingestion started for ${pl} from ${sn}. Configuration saved.`);}}disabled={!selectedPersona||!selectedSource}className="px-6 py-3 bg-gradient-to-r from-secondary to-primary text-on-primary font-bold rounded-lg disabled:opacity-50 flex items-center gap-2">⟳ Re-ingest Knowledge Base</button>
            </div>
          </GlassPanel>
        </div>
      )}

      {/* Admin Settings Page */}
      {isAdminSettings && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-headline font-bold text-on-surface">Platform Settings</h1>
            <p className="text-on-surface-variant mt-1">Configure application and system parameters.</p>
          </div>
          <GlassPanel className="p-6">
            <h3 className="text-lg font-headline font-semibold text-on-surface mb-6">General Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="text-xs uppercase tracking-widest text-on-surface-variant block mb-2">Organization Name</label><input type="text" defaultValue="Aigenesis AI" className="w-full bg-surface-container-lowest border-b border-outline-variant/30 py-3 text-on-surface"/></div>
              <div><label className="text-xs uppercase tracking-widest text-on-surface-variant block mb-2">Support Email</label><input type="email" defaultValue="support@aegis.ai" className="w-full bg-surface-container-lowest border-b border-outline-variant/30 py-3 text-on-surface"/></div>
              <div><label className="text-xs uppercase tracking-widest text-on-surface-variant block mb-2">Session Timeout</label><input type="number" defaultValue="30" className="w-full bg-surface-container-lowest border-b border-outline-variant/30 py-3 text-on-surface"/></div>
              <div><label className="text-xs uppercase tracking-widest text-on-surface-variant block mb-2">Max Login Attempts</label><input type="number" defaultValue="5" className="w-full bg-surface-container-lowest border-b border-outline-variant/30 py-3 text-on-surface"/></div>
            </div>
            <div className="mt-6 flex justify-end"><button className="px-6 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium">Save Changes</button></div>
          </GlassPanel>
        </div>
      )}

      {/* Default Dashboard for other roles */}
      {!isAdminUsers && !isAdminGovernance && !isAdminSettings && !isAdminDashboard && (
        <>
          <div>
            <h1 className="text-3xl font-headline font-bold text-on-surface">{roleConfig.title}</h1>
            <p className="text-on-surface-variant mt-1">{roleConfig.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {roleConfig.metrics.map((metric, idx) => (
              <GlassPanel key={idx} className={cn("p-6", colorClasses[metric.color as keyof typeof colorClasses])}>
                <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">{metric.label}</p>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-headline font-bold text-on-surface">{metric.value}</span>
                  <span className="text-xs font-medium text-tertiary">{metric.change}</span>
                </div>
              </GlassPanel>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <GlassPanel className="lg:col-span-2 p-6">
              <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[1,2,3].map(i=>(
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-surface-container-low">
                    <div className="w-2 h-2 rounded-full bg-primary"/>
                    <div className="flex-1"><p className="text-sm text-on-surface">Activity item {i}</p><p className="text-[10px] text-on-surface-variant">2 minutes ago</p></div>
                  </div>
                ))}
              </div>
            </GlassPanel>
            <GlassPanel className="p-6">
              <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Quick Actions</h3>
              <div className="space-y-2">{["View Reports","Create Task","Search"].map(a=><button key={a} className="w-full p-3 text-left text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 rounded-lg">{a}</button>)}</div>
            </GlassPanel>
          </div>
        </>
      )}

      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-20 right-6 z-50 animate-slide-in">
          <div className={cn("flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border",notification.type==="success"?"bg-tertiary/20 border-tertiary text-tertiary":"bg-error/20 border-error text-error")}>
            {notification.type==="success"?<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>:<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
            <span className="text-sm font-medium text-on-surface">{notification.message}</span>
            <button onClick={()=>setNotification({show:false,message:"",type:"success"})} className="ml-2">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
