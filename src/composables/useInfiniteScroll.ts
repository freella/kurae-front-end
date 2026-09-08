import { ref, onMounted, onUnmounted } from 'vue'

export function useInfiniteScroll(
  callback: () => void,
  canLoadMore = () => true
) {
  const sentinel = ref<HTMLElement | null>(null)

  let observer: IntersectionObserver | null = null
  let isLoading = false

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      const entry = entries[0]

      if (entry?.isIntersecting && !isLoading && canLoadMore()) {
        isLoading = true
        callback()

        setTimeout(() => {
          isLoading = false
        }, 300)
      }
    })

    if (sentinel.value) {
      observer.observe(sentinel.value)
    }
  })

  onUnmounted(() => {
    if (observer && sentinel.value) {
      observer.unobserve(sentinel.value)
    }
  })

  return {
    sentinel,
  }
}