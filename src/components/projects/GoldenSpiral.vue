<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :style="{ opacity }"
    aria-hidden="true"
  >
    <g :stroke="color" stroke-width="0.4" opacity="0.4">
      <line x1="50" y1="0" x2="50" y2="200" />
      <line x1="81" y1="0" x2="81" y2="200" />
      <line x1="100" y1="0" x2="100" y2="200" />
      <line x1="119" y1="0" x2="119" y2="200" />
      <line x1="150" y1="0" x2="150" y2="200" />
      <line x1="0" y1="50" x2="200" y2="50" />
      <line x1="0" y1="81" x2="200" y2="81" />
      <line x1="0" y1="100" x2="200" y2="100" />
      <line x1="0" y1="119" x2="200" y2="119" />
      <line x1="0" y1="150" x2="200" y2="150" />
    </g>

    <polygon
      points="100,8 192,100 100,192 8,100"
      :stroke="color"
      stroke-width="0.6"
      fill="none"
      opacity="0.5"
    />

    <g :stroke="color" stroke-width="0.8" fill="none" opacity="0.9">
      <path d="M 100,162 A 62,62 0 0 1 38,100" />
      <path d="M 61.7,100 A 38.3,38.3 0 0 1 100,61.7" />
      <path d="M 100,76.4 A 23.6,23.6 0 0 1 123.6,100" />
      <path d="M 114.6,100 A 14.6,14.6 0 0 1 100,114.6" />
      <path d="M 100,109 A 9,9 0 0 1 91,100" />
      <path d="M 94.5,100 A 5.5,5.5 0 0 1 100,94.5" />
      <path d="M 100,96.6 A 3.4,3.4 0 0 1 103.4,100" />
      <path d="M 102.1,100 A 2.1,2.1 0 0 1 100,102.1" />
    </g>

    <path
      d="M 100,162 A 62,62 0 0 0 38,100 A 38.3,38.3 0 0 0 100,61.7"
      :stroke="color"
      stroke-width="0.5"
      fill="none"
      opacity="0.3"
    />
  </svg>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number | string
    color?: string
    opacity?: number | string
  }>(),
  {
    size: 200,
    color: '#ffffff',
    opacity: 0.12,
  },
)
</script>
