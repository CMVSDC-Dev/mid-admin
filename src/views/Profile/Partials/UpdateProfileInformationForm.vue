<script setup>
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import InputError from '@/components/Forms/InputError.vue';
import InputGroup from '@/components/Forms/InputGroup.vue';
import InputLabel from '@/components/Forms/InputLabel.vue';
import { Link, useForm, usePage } from '@inertiajs/vue3';
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

const props = defineProps({
  members: Object,
  mustVerifyEmail: Boolean,
  status: String,
})

const user = usePage().props.auth.user;

const members = props.members.map((item) => {
  return { value: item.Id, label: `${item.Name} ( ${item.Code} )` };
})

const form = useForm({
  name: user.name,
  email: user.email,
  member_id: user.member_id,
  company_id: user.company_id,
});
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h2>

            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Update user account's profile information.
            </p>
        </header>

        <form @submit.prevent="form.patch(route('profile.update'))" class="mt-6 space-y-6">
            <div>
              <InputGroup
                type="text"
                v-model="form.name"
                name="name"
                label="Name"
                placeholder="Enter Name"
                :error="form.errors.name"
                autocomplete="name"
                customClasses="mb-4.5"
                required
              />
            </div>

            <div>
              <InputGroup
                type="text"
                v-model="form.email"
                name="email"
                label="Email"
                placeholder="Enter valid email address"
                :error="form.errors.email"
                autocomplete="username"
                customClasses="mb-4.5"
                required
              />
            </div>

            <div v-if="mustVerifyEmail && user.email_verified_at === null">
                <p class="text-sm mt-2 text-gray-800 dark:text-gray-200">
                    Your email address is unverified.
                    <Link
                        :href="route('verification.send')"
                        method="post"
                        as="button"
                        class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Click here to re-send the verification email.
                    </Link>
                </p>

                <div
                    v-show="status === 'verification-link-sent'"
                    class="mt-2 font-medium text-sm text-green-600"
                >
                    A new verification link has been sent to your email address.
                </div>
            </div>

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

            <!-- <div>
              <InputGroup
                type="text"
                v-model="form.jwt_secret"
                name="jwt_secret"
                label="Personal Access Token (Secret Key)"
                placeholder="Click Generate button to generate a new secret key"
                :error="form.errors.jwt_secret"
                customClasses="mb-4.5"
                required
                isReadonly
              />
            </div> -->

            <div class="flex items-center gap-4">
                <PrimaryButton :disabled="form.processing">Save</PrimaryButton>
                <Transition
                    enter-active-class="transition ease-in-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out"
                    leave-to-class="opacity-0"
                >
                    <p v-if="form.recentlySuccessful" class="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                </Transition>
            </div>
        </form>
    </section>
</template>
