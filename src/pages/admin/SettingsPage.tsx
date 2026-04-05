import { GlassPanel } from "@/components/ui/glass-panel";

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold text-on-surface">Settings</h1>
        <p className="text-on-surface-variant mt-1">System configuration and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">General Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-on-surface">Company Name</p>
                <p className="text-xs text-on-surface-variant">Aigenesis Insurance</p>
              </div>
              <button className="text-xs text-primary hover:underline">Edit</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-on-surface">Timezone</p>
                <p className="text-xs text-on-surface-variant">America/New_York (EST)</p>
              </div>
              <button className="text-xs text-primary hover:underline">Edit</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-on-surface">Date Format</p>
                <p className="text-xs text-on-surface-variant">MM/DD/YYYY</p>
              </div>
              <button className="text-xs text-primary hover:underline">Edit</button>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-on-surface">Two-Factor Auth</p>
                <p className="text-xs text-tertiary">Enabled</p>
              </div>
              <button className="text-xs text-primary hover:underline">Configure</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-on-surface">Session Timeout</p>
                <p className="text-xs text-on-surface-variant">30 minutes</p>
              </div>
              <button className="text-xs text-primary hover:underline">Edit</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-on-surface">Password Policy</p>
                <p className="text-xs text-on-surface-variant">Strong (12+ chars)</p>
              </div>
              <button className="text-xs text-primary hover:underline">Edit</button>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">API Configuration</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-on-surface">API Access</p>
                <p className="text-xs text-tertiary">Enabled</p>
              </div>
              <button className="text-xs text-primary hover:underline">Manage</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-on-surface">Rate Limiting</p>
                <p className="text-xs text-on-surface-variant">1000 req/min</p>
              </div>
              <button className="text-xs text-primary hover:underline">Edit</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-on-surface">Webhooks</p>
                <p className="text-xs text-on-surface-variant">3 active endpoints</p>
              </div>
              <button className="text-xs text-primary hover:underline">Manage</button>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h3 className="text-lg font-headline font-semibold text-on-surface mb-4">Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-on-surface">Email Notifications</p>
                <p className="text-xs text-tertiary">Enabled</p>
              </div>
              <button className="text-xs text-primary hover:underline">Configure</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-on-surface">Slack Integration</p>
                <p className="text-xs text-on-surface-variant">Not connected</p>
              </div>
              <button className="text-xs text-primary hover:underline">Connect</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-on-surface">Alert Thresholds</p>
                <p className="text-xs text-on-surface-variant">Custom configured</p>
              </div>
              <button className="text-xs text-primary hover:underline">Edit</button>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}