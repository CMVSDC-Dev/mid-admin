<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Entry } from '@/services/MID-API';
import debounce from 'lodash/debounce';
import { ref, watch } from 'vue';

const pageTitle = ref('API Entries')

const searchField = ref('LastName');
const searchValue = ref('');

const options = [
  { text: 'Last Name', value: 'LastName' },
  { text: 'First Name', value: 'FirstName' },
  { text: 'Middle Name', value: 'MiddleName' },
  { text: 'Gender', value: 'Gender' },
];

const headers = [
  { text: 'ID', value: 'Id', sortable: true },
  { text: 'Last Name', value: 'LastName', sortable: true },
  { text: 'First Name', value: 'FirstName', sortable: true },
  { text: 'Middle Name', value: 'MiddleName', sortable: true },
  { text: 'Gender', value: 'Gender', sortable: true },
  { text: 'Company', value: 'CompanyName' },
];

const items = ref([]);

const loading = ref(false);
const serverItemsLength = ref(0);
const serverOptions = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: 'LastName',
  sortType: 'asc',
});

const fetchData = async () => {
  loading.value = true;
  const options = serverOptions.value
  Object.assign(options, { searchField: searchField.value, searchValue: searchValue.value, isApi: true });
  // console.log(options)
  await Entry.fetchRecords(options).then(response => {
    items.value = response.data.data;
    serverItemsLength.value = response.data.total;
    loading.value = false;
  });
};

// initial load
fetchData();

watch(serverOptions, () => { fetchData(); }, { deep: true });
watch(searchValue, debounce(async () => { fetchData() }, 800), { deep: true });
</script>

<template>
  <Head :title="pageTitle" />

  <AuthenticatedLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <!-- Main Content Start -->
    <div>
      <div class="flex mb-2">
        <span>Search field:</span>
        <div class="ml-2 max-w-sm min-w-[200px]">
          <select
            v-model="searchField"
            class="mr-2 w-full bg-slate-100 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-500 rounded-md px-2 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
            <option
              v-for="(item, index) in options"
              :key="index"
              :value="item.value">
              {{ item.text }}
            </option>
          </select>
        </div>
        <span class="ml-2">Search value: </span>
        <div class="ml-2 max-w-sm min-w-[200px]">
          <input
            v-model="searchValue"
            class="w-full bg-slate-100 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-500 rounded-md px-2 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Type here..." />
        </div>
      </div>

      <EasyDataTable
        v-model:server-options="serverOptions"
        :server-items-length="serverItemsLength"
        :loading="loading"
        :headers="headers"
        :items="items"
        :search-field="searchField"
        :search-value="searchValue"
        theme-color="#64748B"
        table-class-name="customize-table"
        header-text-direction="center"
        body-text-direction="center"
        border-cell
        buttons-pagination
      >
        <!-- <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
          <button
            class="bg-gray-500 text-white font-bold px-2 rounded-lg mr-2"
            :class="isFirstPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'"
            :disabled="isFirstPage"
            @click="prevPage">
            prev page
          </button>
          <button
            class="bg-gray-500 text-white font-bold px-2 rounded-lg"
            :class="isLastPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'"
            :disabled="isLastPage"
            @click="nextPage">
            next page
          </button>
        </template> -->
      </EasyDataTable>
    </div>
    <!-- Main Content End -->
  </AuthenticatedLayout>
</template>
<style lang="scss">
.vue3-easy-data-table[data-v-32683533] {
  @apply dark:border-gray-500 !important;
}
// .vue3-easy-data-table__main[data-v-32683533], 
// .vue3-easy-data-table__body td[data-v-32683533],
// .vue3-easy-data-table__footer[data-v-32683533] {
//   @apply dark:text-white bg-white shadow-default dark:bg-boxdark
// }

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
</style>