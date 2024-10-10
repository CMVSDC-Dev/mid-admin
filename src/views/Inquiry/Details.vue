<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault';
import DefaultCard from '@/components/Forms/DefaultCard';
import InputGroup from '@/components/Forms/InputGroup';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Entry } from '@/services/MID-API';
// import moment from 'moment';
import moment from '@/plugins/moment';
import { onMounted, computed, ref } from 'vue';
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const pageTitle = ref('Impairment Information');

const entry = ref(null)
const items = ref([]);

const date = ref(null);

const formattedDate = computed({
  get() {
    const dateObj = new Date(date.value);
    return moment(dateObj).format('LL')
  },
  set(newValue) {
    date.value = newValue;
  }
});

const headers = [
  { text: 'Date Reported', value: 'ReportedDate', sortable: true },
  { text: 'Underwriting Date', value: 'UnderwritingDate', sortable: true },
  { text: 'N/L Code', value: 'NumberLetterCode' },
  { text: 'IC Date', value: 'ImpairmentDate', sortable: true },
  { text: 'Impairment Code', value: 'ImpairmentCodes' },
  { text: 'IC Description', value: 'ImpairmentDescription' },
  { text: 'Action Code', value: 'ActionCode' },
  { text: 'V/R', value: 'vr' },
  { text: 'Remarks', value: 'Remarks' },
  { text: 'Action', value: 'action' },
];

const loading = ref(false);

const fetchData = async () => {
  await Entry.fetchRecord(route.params.id)
    .then((response) => {
      const data = response.data.data
      // console.log('response:', response.data)
      entry.value = data
      items.value = data.impairments
      date.value = data.BirthDate
    });
};

onMounted(() => {
  fetchData()
});
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
        <DefaultCard cardTitle="PERSONAL INFORMATION">
          <form v-if="entry">
            <div class="p-6.5">
              <div class="mb-4.5 flex flex-col gap-6 md:flex-row">
                <InputGroup
                  horizontal
                  disabled
                  v-model="entry.LastName"
                  label="Last Name"
                  type="text"
                  customClasses="w-full" />
                <InputGroup
                  horizontal
                  disabled
                  v-model="entry.FirstName"
                  label="First Name"
                  type="text"
                  customClasses="w-full" />
                <InputGroup
                  horizontal
                  disabled
                  v-model="entry.MiddleName"
                  label="Middle Name"
                  type="text"
                  customClasses="w-full" />
              </div>

              <div class="mb-4.5 flex flex-col gap-6 md:flex-row">
                <InputGroup
                  horizontal
                  disabled
                  v-model="entry.Alias"
                  label="Alias"
                  type="text"
                  customClasses="w-full" />
                <InputGroup
                  horizontal
                  disabled
                  v-model="entry.MaidenName"
                  label="Maiden Name"
                  type="text"
                  customClasses="w-full" />
                <InputGroup
                  horizontal
                  disabled
                  v-model="entry.OtherName"
                  label="Chinese Name"
                  type="text"
                  customClasses="w-full" />
              </div>

              <div class="mb-4.5 flex flex-col gap-6 md:flex-row">
                <InputGroup
                  horizontal
                  disabled
                  v-model="entry.Suffix"
                  label="Suffix"
                  type="text"
                  customClasses="w-full" />
                <InputGroup
                  horizontal
                  disabled
                  v-model="entry.Gender"
                  label="Gender"
                  type="text"
                  customClasses="w-full" />
                <InputGroup
                  horizontal
                  disabled
                  v-model="entry.PolicyNumber"
                  label="Policy Number"
                  type="text"
                  customClasses="w-full" />
              </div>

              <div class="mb-4.5 flex flex-col gap-6 md:flex-row">
                <InputGroup
                  horizontal
                  disabled
                  v-model="formattedDate"
                  label="Birth Date"
                  type="text"
                  customClasses="w-full" />
                <InputGroup
                  horizontal
                  disabled
                  v-model="entry.BirthPlace"
                  label="Birth Place"
                  type="text"
                  customClasses="w-full" />
                <InputGroup
                  horizontal
                  disabled
                  v-model="entry.Nationality"
                  label="Nationality"
                  type="text"
                  customClasses="w-full" />
              </div>

            </div>
          </form>
        </DefaultCard>

        <EasyDataTable
        :loading="loading"
        :headers="headers"
        :items="items"
        theme-color="#64748B"
        table-class-name="customize-table"
        header-text-direction="center"
        body-text-direction="center"
        border-cell
      >
        <template #item-reporteddate="item">
          {{ moment(item.ReportedDate).format('LL') }}
        </template>
        <template #item-underwritingdate="item">
          {{ moment(item.UnderwritingDate).format('LL') }}
        </template>
        <template #item-NumberLetterCode="item">
          {{ item.NumberCode + item.LetterCode }}
        </template>
        <template #item-impairmentdate="item">
          {{ moment(item.ImpairmentDate).format('LL') }}
        </template>
        <template #item-impairmentcodes="item">
          {{ item.ImpairmentCodes + ' ' + item.OldImpairmentCode }}
        </template>
      </EasyDataTable>
      </div>
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
