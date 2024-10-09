<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboard';
import { ref } from 'vue';
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts';

const dashboardStore = useDashboardStore()

const props = defineProps({
    total: {
        type: Object,
    },
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const chart = ref(null)

</script>

<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8"
  >
    <div class="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
      <div class="flex w-full flex-wrap gap-3 sm:gap-5">
        <div class="flex min-w-47.5">
          <span
            class="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary-500"
          >
            <span class="block h-2.5 w-full max-w-2.5 rounded-full bg-primary-500"></span>
          </span>
          <div class="w-full">
            <p class="font-semibold text-primary-500">Total Entries</p>
            <p class="text-sm font-medium">09/11/2024 - {{ numberWithCommas(props.total.entries) }}</p>
          </div>
        </div>
        <div class="flex min-w-47.5">
          <span
            class="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary-500"
          >
            <span class="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary-500"></span>
          </span>
          <div class="w-full">
            <p class="font-semibold text-secondary-500">Total Inquiries</p>
            <p class="text-sm font-medium">09/11/2024 - {{ numberWithCommas(props.total.inquiries) }}</p>
          </div>
        </div>
      </div>
      <div class="flex w-full max-w-45 justify-end">
        <div class="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
          <button
            class="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
          >
            Day
          </button>
          <button
            class="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
          >
            Week
          </button>
          <button
            class="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark bg-white shadow-card dark:bg-boxdark"
          >
            Month
          </button>
        </div>
      </div>
    </div>
    <div>
      <div id="chartOne" class="-ml-5">
        <VueApexCharts
          type="area"
          height="350"
          :options="dashboardStore.apexOptions"
          :series="dashboardStore.chartData.series"
          ref="chart"
        />
      </div>
    </div>
  </div>
</template>
