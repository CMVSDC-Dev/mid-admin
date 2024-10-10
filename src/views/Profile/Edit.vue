<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import ProfileCard from '@/Pages/Profile/Partials/ProfileCard';
import { usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import AccessTokenForm from './Partials/AccessTokenForm';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

const pageTitle = ref('Profile')
defineProps({
  members: Object,
  mustVerifyEmail: Boolean,
  status: String,
})
const user = usePage().props.auth.user;

</script>

<template>

  <AuthenticatedLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <!-- Main Content Start -->
    <ProfileCard />
    <div class="mt-4 mx-auto space-y-6">
        <div class="p-4 sm:p-8 bg-white dark:bg-boxdark shadow sm:rounded-lg">
            <UpdateProfileInformationForm
                :must-verify-email="mustVerifyEmail"
                :status="status"
                class="max-w-xl"
                :members="members"
            />
        </div>

        <div class="p-4 sm:p-8 bg-white dark:bg-boxdark shadow sm:rounded-lg">
            <UpdatePasswordForm class="max-w-xl" />
        </div>

        <div class="p-4 sm:p-8 bg-white dark:bg-boxdark shadow sm:rounded-lg">
          <AccessTokenForm class="max-w-xl" :user="user" />
        </div>

        <div v-if="user.id !== 1" class="p-4 sm:p-8 bg-white dark:bg-boxdark shadow sm:rounded-lg">
            <DeleteUserForm class="max-w-xl" />
        </div>
    </div>
    <!-- Main Content End -->
  </AuthenticatedLayout>
</template>
