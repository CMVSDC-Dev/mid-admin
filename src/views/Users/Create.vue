<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import InputError from '@/components/Forms/InputError.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import InputLabel from '@/components/Forms/InputLabel.vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import { useForm } from '@inertiajs/vue3'
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import { ref } from 'vue'

const props = defineProps({
  token: String,
  members: Object
})

const pageTitle = ref('Create New User')

const members = props.members.map((item) => {
  return { value: item.Id, label: `${item.Name} ( ${item.Code} )` };
})

const form = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  company_id: '',
  member_id: '',
  jwt_secret: props.token
})

const submit = () => {
  form.post(route('users.store'))
}

// const fetchMembers = async () => {
//   await Member.fetchRecords({ sortBy: 'firstname' })
//     .then((response) => {
//       if (response.status == 200) {
//         members.value = response.data.data.map((item) => {
//           return { value: item.id, label: item.name };
//         });
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// onMounted(() => {
//   fetchMembers()
// })
</script>

<template>

  <AuthenticatedLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <!-- Main Content Start -->
    <div class="mt-4 mx-auto space-y-6">
      <div class="p-4 sm:p-8 bg-white dark:bg-boxdark shadow sm:rounded-lg">
        <section class="max-w-xl">
          <header>
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h2>

            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              New user account's profile information.
            </p>
          </header>

          <form @submit.prevent="submit" class="mt-6 space-y-6">
            <InputGroup label="Name"
              type="text"
              v-model="form.name"
              name="name"
              placeholder="Enter Name"
              :error="form.errors.name"
              autocomplete="name"
              customClasses="mb-4.5"
              required
            />

            <InputGroup label="Email"
              type="text"
              v-model="form.email"
              name="email"
              placeholder="Enter valid email address"
              :error="form.errors.email"
              autocomplete="username"
              customClasses="mb-4.5"
              required
            />

            <InputGroup label="Password"
              type="password"
              v-model="form.password"
              name="password"
              placeholder="Enter password"
              :error="form.errors.password"
              autocomplete="password"
              customClasses="mb-4.5"
              required
            />

            <InputGroup label="Confirm Password"
              type="password"
              v-model="form.password_confirmation"
              name="password_confirmation"
              placeholder="Enter re-enter password"
              :error="form.errors.password_confirmation"
              autocomplete="password"
              customClasses="mb-4.5"
              required
            />

            <div>
              <InputLabel class="dark:text-gray-400 mb-2" for="member_id" value="MID Member Account (Company Code)" />
              <Multiselect
                v-model="form.member_id"
                :options="members"
                name="member_id"
                :close-on-select="true"
                :searchable="true"
                required="true"
                :classes="{
                  container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border-stroke rounded border-[1.5px] text-black border-stroke bg-transparent font-normal outline-none transition focus:border-primary-500 active:border-primary-500 disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary-500',
                  search: 'bg-transparent w-full absolute inset-0 outline-none focus:ring-0 appearance-none box-border border-0 text-base font-sans rounded pl-3.5 rtl:pl-0 rtl:pr-3.5',
                  dropdown: 'max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full border border-gray-300 -mt-px overflow-y-scroll z-50 flex flex-col rounded-b',
                  dropdownTop: '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
                  dropdownHidden: 'hidden',
                  options: 'flex flex-col p-0 m-0 list-none bg-white dark:bg-gray-800',
                  optionsTop: '',
                  option: 'flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug py-2 px-3',
                  optionPointed: 'text-gray-800 bg-gray-100',
                  optionSelected: 'text-black bg-gray-300',
                  optionDisabled: 'text-gray-300 cursor-not-allowed',
                  optionSelectedPointed: 'text-black bg-gray-300 opacity-90',
                }"
              />
              <InputError class="mt-2" :message="form.errors.member_id" />
            </div>

            <InputGroup label="Personal Access Token (Secret Key)"
              type="text"
              v-model="form.jwt_secret"
              name="jwt_secret"
              :error="form.errors.jwt_secret"
              customClasses="mb-4.5"
              isReadonly
            />

            <div class="flex items-center gap-4">
              <PrimaryButton :disabled="form.processing">Create User</PrimaryButton>
            </div>
          </form>
        </section>
      </div>
    </div>
    <!-- Main Content End -->
  </AuthenticatedLayout>
</template>
