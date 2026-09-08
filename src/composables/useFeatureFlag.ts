import { useFeatureFlagsStore } from '@/store/featureFlags.store'

export function useFeatureFlag(flag: string) {

  const store = useFeatureFlagsStore()

  return store.flags[flag as keyof typeof store.flags]
}