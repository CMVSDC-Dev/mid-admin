<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import DataStatsOne from './Widgets/DataStats/DataStatsOne';
import { Analytics, Inquiry, MonitoringConfig, Settings } from '@/services/MID-API';
import { useDashboardStore } from '@/stores/dashboard';
import moment from 'moment';
import { computed, onMounted, ref, watch } from 'vue';
import { useToast } from "vue-toastification";
const toast = useToast()

const configs = ref([]);

const lastResetDate = ref(moment().format('YYYY-MM-DD hh:mm:ss'));

const newResetDate = ref(lastResetDate)

const dashboardStore = useDashboardStore()
const dateRange = ref([]);
const formatter = ref({ date: 'YYYY-MM-DD', month: 'MMMM' });
const start = ref(null);
const end = ref(null);

const convertDate = (newDate, pattern) => {
  let format = pattern ?? 'MMM D, YYYY hh:mma (ddd)';
  // console.log(moment(newDate).format(format))
  return moment(newDate).format(format);
}

const headers = [
  // { text: 'ID', value: 'Id', sortable: true },
  { text: 'Company', value: 'CompanyName', sortable: true },
  { text: 'Total Entries', value: 'TotalEntries', sortable: true },
  { text: 'Total Inquiries', value: 'TotalInquiries', sortable: true },
  { text: 'Last Request Date', value: 'LastRequestDate', sortable: true },
];

const items = ref([]);

const formattedItems = computed(() => {
    return items.value.map(item => ({
      ...item,
      date: item.LastRequestDate ? moment(item.LastRequestDate).format('MMM DD, YYYY hh:mma') : ''
    }));
})

const loading = ref(false);
const serverItemsLength = ref(0);
const serverOptions = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: 'LastRequestDate',
  sortType: 'desc',
});

const fetchData = async () => {
  loading.value = true;
  await Inquiry.countEntries(serverOptions.value).then(response => {
    items.value = response.data.data;
    serverItemsLength.value = response.data.total;
    loading.value = false;
  });
};

// Function to check last request date
function checkLastRequestDate(lastRequestDate) {
  if (!lastRequestDate) return 'bg-white dark:bg-transparent';
  const totalDays = getNumberOfDays(new Date(lastRequestDate), new Date())
  return getColorBasedOnDays(totalDays)
}

// Function to evaluate the condition based on the number of days and return the corresponding color
function getColorBasedOnDays(daysSinceLastRequest) {
  if (configs.value.length > 0) {
    for (const config of configs.value.sort((a, b) => b.days - a.days)) {
      if (evaluateCondition(daysSinceLastRequest, config.condition, config.days)) {
        return config.color;
      }
    }    
  }
  return null; // Fallback color if no condition matches
}

// Helper function to evaluate the operator condition
function evaluateCondition(value1, operator, value2) {
  switch (operator) {
    case "<":
      return value1 < value2;
    case "<=":
      return value1 <= value2;
    case ">":
      return value1 > value2;
    case ">=":
      return value1 >= value2;
    case "==":
      return value1 == value2;
    case "!=":
      return value1 != value2;
    default:
      return false;
  }
}

// Example usage: Let's say we want to evaluate 6 days since the last request
// const daysSinceLastRequest = 6;
// const color = getColorBasedOnDays(daysSinceLastRequest);
// console.log(`The color for ${daysSinceLastRequest} days is:`, color);

const resetMonitoring = async () => {
  await Settings.resetMonitoring()
    .then(response => {
      toast.success(response.data.message);
      newResetDate.value = response.data.data;
      fetchData();
      updateResetDate();
    })
    .catch(error => {
        console.error(error);
    });
}

const getConfigs = async () => {
  await MonitoringConfig.fetchRecords()
    .then(response => {
      configs.value = response.data;
    })
    .catch(error => {
        console.error(error);
    });
}

// Calculate number of days between two dates
function getNumberOfDays(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);
  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;
  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();
  // Calculating the number of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);
  return diffInDays;
}
// console.log(getNumberOfDays(lastResetDate, "2024-09-26"));

watch(serverOptions, () => { fetchData(); }, { deep: true });

watch(dateRange, async (newDate) => {
  dashboardStore.dateRange = newDate;
  // if (!newDate) return
  start.value = newDate[0];
  end.value = newDate[1];
  getCount();
  // console.log('selected date:', newDate)
});

const appendTableFooter = () => {
  // Add Last Reset Date div element inside datatable's footer
  const container = document.querySelector('.vue3-easy-data-table__footer')
  const div = document.createElement('div');
  div.className = "mr-5 font-bold text-blue-400 ";
  div.innerHTML = '<span class="text-gray-400">Last Reset Date: </span><span id="reset-date">' + convertDate(lastResetDate) + '</span>';
  container.prepend(div);
}

const updateResetDate = () => {
  const container = document.querySelector('#reset-date')
  container.innerHTML = convertDate(newResetDate.value);
}

onMounted(async () => {
  await getConfigs();
  fetchData();
  appendTableFooter()
})
</script>

<template>
  <Head title="Dashboard" />

  <AuthenticatedLayout>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <DataStatsOne />
    </div>

    <!-- <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5"> -->
      <!-- ====== Chart One Start -->
      <!-- <ChartOne :total="total" /> -->
      <!-- ====== Chart One End -->

      <!-- ====== Chart Two Start -->
      <!-- <ChartTwo :total="total" /> -->
      <!-- ====== Chart Two End -->
    <!-- </div> -->

    <div class="container mx-auto mt-6">
      <!-- Config for the table -->
      <div class="my-4">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Monitor <small>as of {{ convertDate(newResetDate) }}</small></h2>
        <div class="flex space-x-4">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-400">Legend:</h2>
          <!-- Loop through config data and display it -->
          <div
            v-for="config in configs.sort((a, b) => a.order - b.order)"
            :key="config.key"
            class="flex items-center">
            <span :class="['w-4 h-4 inline-block mr-2', config.color]"></span>
            <span class="text-sm text-gray-700 dark:text-gray-400">{{ config.status }}: {{ config.description }}</span>
          </div>
        </div>
      </div>

      <EasyDataTable
        v-model:server-options="serverOptions"
        :server-items-length="serverItemsLength"
        :loading="loading"
        :headers="headers"
        :items="formattedItems"
        theme-color="#64748B"
        table-class-name="customize-table"
        header-text-direction="center"
        body-text-direction="center"
        border-cell
        buttons-pagination
      >
        <template #item-LastRequestDate="config">
          <div :class="configs.length > 0 ? 'bg-white' : ''">
            <div class="text-center dark:text-gray-800" :class="checkLastRequestDate(config.LastRequestDate)">
              {{ config.LastRequestDate ? moment(config.LastRequestDate).format("LLL") : '' }}
            </div>
          </div>
        </template>
        <template #footer>
        <!-- Custom prepended content -->
        <div class="custom-footer-content">
          <!-- Your prepended content goes here -->
          <p>Custom Data: </p>
        </div>
        <!-- Original footer content here (if needed) -->
        <div class="original-footer-content">
          <!-- Example: pagination or summary -->

        </div>
      </template>
      </EasyDataTable>
      <button
        @click="resetMonitoring"
        class="bg-orange-500 text-white py-2 px-4 mt-4 rounded"
        >
        Reset Monitoring Date
      </button>
    </div>
  </AuthenticatedLayout>
</template>
<style lang="scss">
[data-headlessui-state='open'] {
  label {
    @apply ring-0 outline-none;
  }
  .date-btn {
    @apply dark:bg-slate-700 bg-slate-900 text-white;
  }
}

.vue3-easy-data-table[data-v-32683533] {
  @apply dark:border-gray-500 !important;
}

.easy-data-table__rows-selector ul.select-items li[data-v-4ca5de3a] {
  @apply dark:bg-boxdark
}

.easy-data-table__rows-selector .rows-input__wrapper .triangle[data-v-4ca5de3a] {
  --easy-table-footer-font-color: #64748B
}

.vue3-easy-data-table__main[data-v-32683533]:is(.dark *),
.vue3-easy-data-table__body td[data-v-32683533]:is(.dark *),
.vue3-easy-data-table__footer[data-v-32683533]:is(.dark *) {
  @apply dark:border-gray-700 dark:text-white bg-white shadow-default dark:bg-boxdark
}

.vue3-easy-data-table__header th[data-v-32683533]:is(.dark *) {
  @apply dark:bg-gray-800 dark:border-gray-500
}

.vue3-easy-data-table__message[data-v-32683533]:is(.dark *) {
  @apply text-gray-800 dark:text-white
}

.direction-center:first-child {
  text-align: left !important;
}
</style>
