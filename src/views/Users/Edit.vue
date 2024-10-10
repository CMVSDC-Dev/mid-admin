<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { defineProps, ref } from 'vue';
import AccessTokenForm from './Partials/AccessTokenForm.vue';
import DeleteUserForm from './Partials/DeleteUserForm.vue';
import ProfileCard from './Partials/ProfileCard.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';

const props = defineProps({
  user: Object,
  members: Object,
  mustVerifyEmail: Boolean,
  status: String,
})

const authUser = usePage().props.auth.user;

const form = useForm({
  name: props.user.name,
  email: props.user.email,
})

const submit = () => {
  form.put(route('users.update', props.user.id))
}

const pageTitle = ref('User Edit')
</script>

<template>

  <AuthenticatedLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <!-- Main Content Start -->
    <ProfileCard :user="user" />
    <div class="mt-4 mx-auto space-y-6">
        <div class="p-4 sm:p-8 bg-white dark:bg-boxdark shadow sm:rounded-lg">
            <UpdateProfileInformationForm
              :must-verify-email="mustVerifyEmail"
              :status="status"
              class="max-w-xl"
              :user="user"
              :members="members"
            />
        </div>

        <div class="p-4 sm:p-8 bg-white dark:bg-boxdark shadow sm:rounded-lg">
            <UpdatePasswordForm class="max-w-xl" :user="user" />
        </div>

        <div v-if="authUser.id == 1 || authUser.id == user.id" class="p-4 sm:p-8 bg-white dark:bg-boxdark shadow sm:rounded-lg">
          <AccessTokenForm class="max-w-xl" :user="user" />
        </div>

        <div v-if="authUser.id == 1 || user.id !== 1" class="p-4 sm:p-8 bg-white dark:bg-boxdark shadow sm:rounded-lg">
          <DeleteUserForm class="max-w-xl" :user="user" />
        </div>
    </div>
    <!-- Main Content End -->
  </AuthenticatedLayout>
</template>

