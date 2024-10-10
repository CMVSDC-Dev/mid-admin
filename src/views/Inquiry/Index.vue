<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import DatePicker from '@/components/Forms/DatePicker/Index';
import DefaultCard from '@/components/Forms/DefaultCard';
import InputGroup from '@/components/Forms/InputGroup';
import SelectGroup from '@/components/Forms/SelectGroup';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Inquiry } from '@/services/MID-API';
// import moment from 'moment';
import moment from '@/plugins/moment';
import { reactive, ref, watch } from 'vue';

const pageTitle = ref('MID Inquiry')

const isSearched = ref(false);

const getInitialFormData = () => ({
  LastName: '',
  FirstName: '',
  MiddleName: '',
  Alias: '',
  BirthDate: '',
  MaidenName: '',
  Gender: null,
  CompanyId: null,
  WildSearch: '',
  processing: false,
});

const form = reactive(getInitialFormData());

const resetUserForm = () => Object.assign(form, getInitialFormData());

const genderOptions = [
  { text: 'C', value: 'C' },
  { text: 'Male', value: 'M' },
  { text: 'Female', value: 'F' },
];

const companyOptions = [
  { value: '209', text: 'AETNA LIFE' },
  { value: '187', text: 'Allianz PNB Life ' },
  { value: '182', text: 'Allstate Life Ins. Co.' },
  { value: '205', text: 'Asian Life & General' },
  { value: '207', text: 'AXA Philippines' },
  { value: '185', text: 'BDO Life' },
  { value: '204', text: 'Beneficial Life Ins.Co. In' },
  { value: '178', text: 'Berkley Int. Life Ins. Co., In' },
  { value: '189', text: 'BF Life Ins. Corp.' },
  { value: '190', text: 'BPI-Philam' },
  { value: '172', text: 'CAP Life Ins. Corp.' },
  { value: '211', text: 'CARITAS' },
  { value: '215', text: 'CLIMBS Life & General Insurance Cooperative' },
  { value: '200', text: 'CMG Life Ins. Co., Inc.' },
  { value: '214', text: 'Cooperative Ins. Sys Of Phils.' },
  { value: '199', text: 'Country Bankers Life Ins.' },
  { value: '234', text: 'Eastwest Ageas Life Ins. Corp' },
  { value: '195', text: 'First Guarantee Life Assur. Co' },
  { value: '206', text: 'Fortune Life Ins. Co., Corp.' },
  { value: '216', text: 'FWD Life Insurance Corp.' },
  { value: '235', text: 'Generali Life' },
  { value: '175', text: 'ING Life Ins. Co.(phil), Inc.' },
  { value: '188', text: 'Insular Life Assur. Co., Ltd.' },
  { value: '180', text: 'John Honcock Life Ins. Corp.' },
  { value: '193', text: 'Manila Bankers life Ins. Corp.' },
  { value: '192', text: 'Manulife Philippines' },
  { value: '210', text: 'MAPFRE ASIA' },
  { value: '237', text: 'Maxicare Life Insurance Corporation' },
  { value: '186', text: 'MetLife Ins. Co. (Phil), Inc.' },
  { value: '194', text: 'National Life Ins. Co. (Phil)' },
  { value: '176', text: 'Nippon Life Ins. Co.(Phil),Inc' },
  { value: '179', text: 'Paramount Life Insurance' },
  { value: '198', text: 'Phil. Int. Life Ins. Co.Inc.' },
  { value: '202', text: 'Phil. Life Financial' },
  { value: '208', text: 'Phil. Prudential Life Ins. Co.' },
  { value: '173', text: 'Philam Equit. Life Assurance Company' },
  { value: '196', text: 'Philam Life' },
  { value: '170', text: 'Philippine Life Insurance Association' },
  { value: '191', text: 'Pioneer Life Inc.' },
  { value: '238', text: 'Premier Life Insurance' },
  { value: '174', text: 'Pru Life Ins. Corp. Of U.K.' },
  { value: '184', text: 'Prumerica Life Ins. Co., Inc.' },
  { value: '236', text: 'SeaInsure Life' },
  { value: '183', text: 'Sony Life Ins. (Phil.) Corp.' },
  { value: '197', text: 'Sun Life GrePa  Assur. Corp.' },
  { value: '171', text: 'SunLife Financial' },
  { value: '203', text: 'Travellers Life Assur. Phil.' },
  { value: '201', text: 'United Coconut Planters' },
  { value: '181', text: 'Urbancorp Life & Gen. Ins., In' },
  { value: '239', text: 'XXX' },
  { value: '177', text: 'ZurichLife Ins. Phil., Inc.' },
];

const headers = [
  { text: 'Name', value: 'FullName', sortable: true },
  // { text: 'First Name', value: 'FirstName', sortable: true },
  // { text: 'Middle Name', value: 'MiddleName' },
  { text: 'Birth Date', value: 'BirthDate' },
  { text: 'Gender', value: 'Gender' },
  { text: 'Maiden Name', value: 'MaidenName' },
  { text: 'Alias', value: 'Alias' },
  { text: 'Company', value: 'CompanyName' },
  { text: 'Policy No.', value: 'PolicyNumber' },
  { text: 'Action', value: 'action' },
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

const submitForm = async () => {
  isSearched.value = true;
  loading.value = true;
  const options = serverOptions.value
  Object.assign(options, form);
  // console.log('formData:', form)
  try {
    const response = await Inquiry.search(options);
    // console.log('Form submitted successfully:', response.data);
    items.value = response.data.data;
    serverItemsLength.value = response.data.total;
    loading.value = false;
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

// const fetchData = async () => {
//   loading.value = true;
//   const options = serverOptions.value
//   Object.assign(options, { searchField: searchField.value, searchValue: searchValue.value });
//   console.log(options)
//   await Inquiry.fetchRecords(options).then(response => {
//     items.value = response.data.data;
//     serverItemsLength.value = response.data.total;
//     loading.value = false;
//   });
// };

// initial load
// fetchData();

watch(serverOptions, () => { submitForm(); }, { deep: true });
// watch(searchValue, debounce(async () => { fetchData() }, 800), { deep: true });
</script>

<template>

  <AuthenticatedLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <!-- Main Content Start -->
    <!-- ====== Form Layout Section Start -->
    <div class="grid grid-cols-1 gap-9">
      <div class="flex flex-col gap-9">
        <!-- Contact Form Start -->
        <DefaultCard cardTitle="">
          <form @submit.prevent="submitForm">
            <div class="p-6.5">
              <div class="mb-4.5 flex flex-col gap-6 md:flex-row">
                <InputGroup
                  horizontal
                  v-model="form.LastName"
                  label="Last Name"
                  type="text"
                  placeholder="Enter last name"
                  customClasses="w-full" />
                <InputGroup
                  horizontal
                  v-model="form.FirstName"
                  label="First Name"
                  type="text"
                  placeholder="Enter first name"
                  customClasses="w-full" />
                <InputGroup
                  horizontal
                  v-model="form.MiddleName"
                  label="Middle Name"
                  type="text"
                  placeholder="Enter middle name"
                  customClasses="w-full" />
              </div>

              <div class="mb-4.5 flex flex-col gap-6 md:flex-row">
                <InputGroup
                  horizontal
                  v-model="form.Alias"
                  label="Alias"
                  type="text"
                  placeholder="Enter alias"
                  customClasses="w-full" />
                <InputGroup
                  horizontal
                  v-model="form.MaidenName"
                  label="Maiden Name"
                  type="text"
                  placeholder="Enter maiden name"
                  customClasses="w-full" />
                <DatePicker
                  horizontal
                  v-model="form.BirthDate"
                  label="Birth Date"
                  placeholder="mm/dd/yyyy" />
              </div>

              <div class="mb-4.5 flex flex-col gap-6 md:flex-row">
                <SelectGroup
                  horizontal
                  v-model="form.Gender"
                  label="Gender"
                  :options="genderOptions" />
                <SelectGroup
                  horizontal
                  v-model="form.CompanyId"
                  label="Company"
                  :options="companyOptions" />
                <InputGroup
                  horizontal
                  v-model="form.WildSearch"
                  label="Wild Search"
                  type="text"
                  customClasses="w-full"
                />
              </div>

              <SecondaryButton addClass="mr-2 px-4 py-2 uppercase" @click="resetUserForm">
                Clear
              </SecondaryButton>
              <PrimaryButton
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
                @click="serverOptions.page=1"
              >
                Search
              </PrimaryButton>
            </div>
          </form>
        </DefaultCard>
        <!-- Contact Form End -->
      </div>
    </div>

    <div v-if="isSearched" class="mt-5">
      <EasyDataTable
        v-model:server-options="serverOptions"
        :server-items-length="serverItemsLength"
        :loading="loading"
        :headers="headers"
        :items="items"
        theme-color="#64748B"
        table-class-name="customize-table"
        header-text-direction="center"
        body-text-direction="center"
        border-cell
        buttons-pagination
      >
        <template #item-BirthDate="item">
          {{ moment(item.BirthDate).format("MMMM D, YYYY") }}
        </template>

        <template #item-action="item">
            <router-link :to="{ name: 'Inquiry Details', params: { id: item.Id } }" class="px-2 py-1 inline-flex items-center bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700  tracking-widest shadow-sm hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150">
                View Details
            </router-link>
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
