<script setup>
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import InputGroup from '@/components/Forms/InputGroup.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const updatePassword = () => {
    form.put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
            if (form.errors.password) {
                form.reset('password', 'password_confirmation');
                passwordInput.value.focus();
            }
            if (form.errors.current_password) {
                form.reset('current_password');
                currentPasswordInput.value.focus();
            }
        },
    });
};
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Update Password</h2>

            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Ensure your account is using a long, random password to stay secure.
            </p>
        </header>

        <form @submit.prevent="updatePassword" class="mt-6 space-y-6">
            <div>
              <InputGroup
                type="password"
                ref="currentPasswordInput"
                v-model="form.current_password"
                name="current_password"
                label="Current Password"
                placeholder="Enter current password"
                :error="form.errors.current_password"
                customClasses="mb-4.5"
                required
              /><!-- autocomplete="current-password" -->
            </div>

            <div>
              <InputGroup
                type="password"
                ref="passwordInput"
                v-model="form.password"
                name="password"
                label="New Password"
                placeholder="Enter new password"
                :error="form.errors.password"
                autocomplete="new-password"
                customClasses="mb-4.5"
                required
              />
            </div>

            <div>
              <InputGroup
                type="password"
                v-model="form.password_confirmation"
                name="password_confirmation"
                label="Confirm Password"
                placeholder="Enter re-enter new password"
                :error="form.errors.password_confirmation"
                autocomplete="new-password"
                customClasses="mb-4.5"
                required
              />
            </div>

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
