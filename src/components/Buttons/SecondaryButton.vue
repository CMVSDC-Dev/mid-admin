<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  addClass: {
    type: String,
    default: ''
  }
});
</script>

<template>
    <button
        :type="type"
        :class="addClass ?? 'px-4 py-4'"
        class="inline-flex items-center bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700  tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
    >
        <slot />
    </button>
</template>
