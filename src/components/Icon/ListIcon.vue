<template>
    <Icon :icon="icon" />
  </template>
  <script>
  import Icon from '@/components/Icon';
  export default {
    components: {
      Icon,
    },
    data() {
        return {
            icon: "heroicons:document-text"
        }
    }
  };
  </script>
  <style lang=""></style>
