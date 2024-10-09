<script setup>
import DangerButton from '@/components/Buttons/DangerButton.vue';
import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
import InputError from '@/components/Forms/InputError.vue';
import InputLabel from '@/components/Forms/InputLabel.vue';
import TextInput from '@/components/Forms/TextInput.vue';
import Modal from '@/components/Modal.vue';
import { useForm } from '@inertiajs/vue3';
import { nextTick, ref } from 'vue';

const props = defineProps({
  user: Object,
});

const user = props.user;

const confirmingUserDeletion = ref(false);
const passwordInput = ref(null);

const form = useForm({
    id: user.id,
    password: '',
});

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;

    nextTick(() => passwordInput.value.focus());
};

const deleteUser = () => {
    form.delete(route('users.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    confirmingUserDeletion.value = false;

    form.clearErrors();
    form.reset();
};
</script>

<template>
    <section class="space-y-6">
        <header>
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Delete Account</h2>

            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Once this user account is deleted, all of its resources and data will be permanently deleted. Before deleting
                this account, please download any data or information that you wish to retain.
            </p>
        </header>

        <DangerButton @click="confirmUserDeletion">Delete Account</DangerButton>

        <Modal :show="confirmingUserDeletion" @close="closeModal" class="dark:bg-gray-600">
            <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Are you sure you want to delete this user account?
                </h2>

                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once this account is deleted, all of its resources and data will be permanently deleted. Please
                    enter your password to confirm you would like to permanently delete this account.
                </p>

                <div class="mt-6">
                    <input type="hidden" name="id" v-model="form.id" />
                    <InputLabel for="password" value="Password" class="dark:text-gray-400 sr-only" />

                    <TextInput
                        id="password"
                        ref="passwordInput"
                        v-model="form.password"
                        type="password"
                        class="mt-1 block w-3/4 text-gray-600"
                        placeholder="Password"
                        @keyup.enter="deleteUser"
                    />

                    <InputError :message="form.errors.password" class="mt-2" />
                </div>

                <div class="mt-6 flex justify-end">
                    <SecondaryButton @click="closeModal" class="uppercase px-5"> Cancel </SecondaryButton>

                    <DangerButton
                        class="ms-3"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        @click="deleteUser"
                    >
                        Delete Account
                    </DangerButton>
                </div>
            </div>
        </Modal>
    </section>
</template>
