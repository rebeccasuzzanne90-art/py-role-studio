import { getFeatureFlags } from "@/lib/admin";
import { FeatureFlagsList } from "@/components/admin/feature-flags-list";

export const revalidate = 0;

export default async function FeaturesPage() {
  let flags: Awaited<ReturnType<typeof getFeatureFlags>> = [];

  try {
    flags = await getFeatureFlags();
  } catch {
    // Supabase not configured
  }

  return <FeatureFlagsList flags={flags} />;
}
