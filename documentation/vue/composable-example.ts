// TS modules imports.
import { computed, type ComputedRef, shallowRef } from 'vue'

export function useSomething(): UseSomethingResult {
  // Private constants.
  const _something = shallowRef(true)

  // # API

  // # Init

  return {
    something: computed(() => logic()),
  }

  // # Private logic

  function logic(): boolean {
    return _something.value
  }
}

interface UseSomethingResult {
  readonly something: ComputedRef<boolean>
}
