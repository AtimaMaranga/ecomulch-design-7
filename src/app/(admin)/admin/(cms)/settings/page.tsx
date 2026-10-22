import { SettingsEditor } from "@/components/admin/settings-editor";
import { getSettings } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSettings();
  return <SettingsEditor settings={settings} />;
}
