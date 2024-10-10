<script setup>
// import { Header, Item, ServerOptions } from 'vue3-easy-data-table';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
import { User } from '@/services/MID-API';
import { Link } from '@inertiajs/vue3';
import debounce from 'lodash/debounce';
import { ref, watch } from 'vue';
// import { useToast } from "vue-toastification"

// const toast = useToast()
// const page = usePage()

const pageTitle = ref('Users')

const searchField = ref('name');
const searchValue = ref('');

const headers = [
  { text: 'ID', value: 'id', sortable: true },
  { text: 'Name', value: 'name', sortable: true },
  // { text: 'Role', value: 'role', sortable: true },
  { text: 'Email', value: 'email' },
  { text: 'Company', value: 'company_name', sortable: true },
  { text: 'Action', value: 'action' },
];

const items = ref([]);

const loading = ref(false);
const serverItemsLength = ref(0);
const serverOptions = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: 'name',
  sortType: 'asc',
});

const fetchData = async () => {
  loading.value = true;
  const options = serverOptions.value
  Object.assign(options, { searchField: searchField.value, searchValue: searchValue.value });
  // console.log(options)
  await User.fetchRecords(options).then(response => {
    items.value = response.data.data.map((item) => {
      return {
        ...item,
        role: item.roles[0]?.name
      }
    });
    serverItemsLength.value = response.data.total;
    loading.value = false;
  });
};

// initial load
fetchData();

// onMounted(() => {
//   if (page.props.flash.success) {
//     toast.success(page.props.flash.success)
//   }
// })

watch(serverOptions, () => { fetchData(); }, { deep: true });
watch(searchValue, debounce(async () => { fetchData() }, 800), { deep: true });
</script>

<template>

  <AuthenticatedLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <!-- Main Content Start -->
    <div>
      <div class="grid grid-cols-2 gap-4 mb-2">
        <div class="flex">
          <span>Search field:</span>
          <div class="ml-2 max-w-sm min-w-[200px]">
            <select
              v-model="searchField"
              class="mr-2 w-full bg-slate-100 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-500 rounded-md px-2 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
              <option
                v-for="(item, index) in headers"
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

        <div class="text-end">
          <Link href="/users/create"
            class="items-center px-4 py-2 bg-gray-800 dark:bg-primary-500 dark:hover:bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            Create New User
          </Link>
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
      <template #item-action="item">
            <Link :href="`/users/${item.id}/edit`" class="px-2 py-1 inline-flex items-center bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700  tracking-widest shadow-sm hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150">
                Edit
            </Link>
        </template>
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
