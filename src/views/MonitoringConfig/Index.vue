<template>

  <AuthenticatedLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <!-- Main Content Start -->
    <div class="grid grid-cols-1 gap-9">
      <div class="flex flex-col gap-9">
        <DefaultCard cardTitle="">
          <!-- Form for adding/editing a config -->
          <form @submit.prevent="submitForm">
            <div class="p-6.5">
              <div class="mb-4.5 flex flex-col gap-6 md:flex-row">
                <InputGroup
                  horizontal
                  v-model="form.status"
                  label="Status Name"
                  type="text"
                  placeholder="Enter status Name"
                  customClasses="w-full" />
                <InputGroup
                  horizontal
                  v-model="form.description"
                  label="Description"
                  type="text"
                  placeholder="Enter description"
                  customClasses="w-full" />
                <InputGroup
                  horizontal
                  v-model="form.order"
                  label="Order No."
                  type="number"
                  placeholder="Order number"
                  customClasses="w-full" />
              </div>
              <div class="mb-4.5 flex flex-col gap-6 md:flex-row">
                <InputGroup
                  horizontal
                  v-model="form.color"
                  label="Color (Tailwind CSS Class)"
                  type="text"
                  placeholder="Enter color (Tailwind CSS Class)"
                  customClasses="w-full" />
                <SelectGroup
                  horizontal
                  v-model="form.condition"
                  label="Condition"
                  :options="conditions"
                  customClasses="w-full" />
                <InputGroup
                  horizontal
                  v-model="form.days"
                  label="Days"
                  type="number"
                  placeholder="Enter number of days"
                  customClasses="w-full" />
              </div>

              <SecondaryButton addClass="mr-2 px-4 py-2 uppercase" @click="resetForm">
                Clear
              </SecondaryButton>
              <PrimaryButton
                class="dark:border-gray-500"
                :class="{ 'opacity-25': loading }"
                :disabled="loading"
              >
                {{ editing ? 'Update Config' : 'Add Config' }}
              </PrimaryButton>
              <span class="ml-6 mb-2 text-sm italic">
                Note: Kindly refer to this link for selecting desired background color: <a target="_blank" class="text-primary-500 hover:text-blue-700" href="https://tailwindcss.com/docs/background-color">Tailwind CSS Class</a>
              </span>
            </div>
          </form>

        </DefaultCard>
      </div>
    </div>
    <div class="container mx-auto">


      <!-- Config List Table -->
      <div class="mt-8" id="monitoring">
        <h2 class="text-lg font-semibold mb-2">Current Configs</h2>
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
          <template #item-color="item">
            <div class="bg-white">
              <div class="text-center dark:text-gray-800" :class="item.color">
                {{ item.color }}
              </div>
          </div>
          </template>
          <template #item-action="item">
            <div class="space-x-2 text-center">
              <button
                @click="editConfig(item)"
                class="bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                @click="deleteConfig(item.id)"
                class="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </template>
        </EasyDataTable>
      </div>

    </div>
    <!-- Main Content End -->
  </AuthenticatedLayout>
</template>

<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
import DefaultCard from '@/components/Forms/DefaultCard.vue';
import InputGroup from '@/components/Forms/InputGroup.vue';
import SelectGroup from '@/components/Forms/SelectGroup.vue';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
import { useForm } from '@inertiajs/vue3';
import '@vueform/multiselect/themes/default.css';
import { onMounted, ref } from 'vue';
import { useToast } from "vue-toastification";
const toast = useToast()

const pageTitle = ref('Monitoring Configs')

const headers = [
  { text: 'Order', value: 'order'},
  { text: 'Status', value: 'status'},
  { text: 'Description', value: 'description'},
  { text: 'Color', value: 'color' },
  { text: 'Condition', value: 'condition'},
  { text: 'Days', value: 'days'},
  { text: 'Action', value: 'action' },
];

const items = ref([]);

const serverItemsLength = ref(0);
const serverOptions = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: 'order',
  sortType: 'asc',
});

const conditions = [
  { text: 'Less than', value: '<' },
  { text: 'Greater than', value: '>' },
  { text: 'Equal to', value: '==' },
  { text: 'Less than or equal to', value: '<=' },
  { text: 'Greater than or equal to', value: '>=' },
];

// Form state for adding/editing
const form = useForm({
  status: '',
  description: '',
  order: '',
  color: '',
  condition: '',
  days: '',
});

const editing = ref(false);
const configId = ref(null);
const loading = ref(false);

// Function to fetch configs from the server
const fetchConfigs = async () => {
  try {
    const response = await axios.get('/api/settings/monitoring-configs');
    items.value = response.data; // Assign the fetched configs
  } catch (error) {
    console.error('Failed to fetch configs:', error);
  }
};

// Function to submit the form for adding or updating a config
const submitForm = async () => {
  loading.value = true; // Set loading to true when starting the submission
  try {
    if (editing.value) {
      // Update the existing config
      await form.put(`/monitoring-config/${configId.value}`, {
        preserveScroll: true,
        onSuccess: () => { resetForm(), fetchConfigs(), toast.success('Config updated successfully.') },
        // onFinish: () => resetForm(),
      });
     } else {
      // Create a new config
      await form.post('/monitoring-config', {
        preserveScroll: true,
        onSuccess: () => { resetForm(), fetchConfigs(), toast.success('Config added successfully.') },
        // onFinish: () => resetForm(), // Reset the form after submission
      });
    }
  } catch (error) {
    console.error('Error while submitting form:', error);
    // Handle error appropriately
    toast.error('Failed to submit the form. Please try again.');
  } finally {
    loading.value = false; // Reset loading state after submission attempt
  }
};

// Function to reset the form
const resetForm = () => {
  form.reset();
  editing.value = false;
  configId.value = null;
};

// Function to edit a config
const editConfig = (config) => {
  // form.value = { ...config };
  Object.assign(form, config);
  configId.value = config.id;
  editing.value = true;
};

// Function to delete a config
const deleteConfig = async (id) => {
  if (confirm('Are you sure you want to delete this config?')) {
    form.delete(`/monitoring-config/${id}`, {
      preserveScroll: true,
      onSuccess: () => { fetchConfigs(), toast.success('Config deleted successfully.') },
      onFinish: () => resetForm(),
    });
  }
};

// Fetch configs when the component is mounted
onMounted(() => {
  fetchConfigs();
});
</script>
<style lang="scss">
.vue3-easy-data-table[data-v-32683533] {
  @apply dark:border-gray-500 !important;
  --easy-table-body-row-height: 40px;
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
