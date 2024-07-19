<script setup lang="ts">

// meta

    definePageMeta({
        middleware: "redirect-if-logged-in",
    });

</script>

<template>
  <UCard>
    <template #header> Signing in... </template>

    Wait a moment while we sign you in...
  </UCard>
</template>
