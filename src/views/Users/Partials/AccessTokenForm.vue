<script setup>
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
import InputGroup from '@/components/Forms/InputGroup.vue';
import Modal from '@/components/Modal.vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import { useToast } from "vue-toastification";
const toast = useToast()

const props = defineProps({
  user: Object,
});

const user = props.user;
const page = usePage();

const confirmingUpdateToken = ref(false);
const secretKeyInput = ref(null);

const form = useForm({
  id: user.id,
  jwt_secret: user.jwt_secret,
});

const confirmUpdateToken = () => {
  confirmingUpdateToken.value = true;
};

const updateToken = () => {
  form.patch(route('users.update.token'), {
    preserveScroll: true,
    onSuccess: () => { closeModal(), toast.success('Access Token updated successfully.') },
    onError: () => secretKeyInput.value.focus(),
    onFinish: () => form.jwt_secret = page.props.flash.data.token,
  });
};

const closeModal = () => {
  confirmingUpdateToken.value = false;
};
</script>

<template>
    <section class="space-y-6">
        <header>
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Personal Access Token</h2>

            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Once this access token is re-generated, all of its connected applications should need to be updated. Before updating this token, please copy & save the old token somewhere else.
            </p>
        </header>

        <InputGroup
            type="text"
            ref="secretKeyInput"
            v-model="form.jwt_secret"
            name="jwt_secret"
            label="Personal Access Token (Secret Key)"
            placeholder="Click Generate button to generate a new secret key"
            :error="form.errors.jwt_secret"
            customClasses="mb-4.5"
            isReadonly
          />

        <PrimaryButton @click="confirmUpdateToken">Generate New Access Token</PrimaryButton>

        <Modal :show="confirmingUpdateToken" @close="closeModal" class="dark:bg-gray-600">
            <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Are you sure you want to generate new access token?
                </h2>

                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Once this access token is re-generated, all of its connected applications should need to be updated.
                </p>

                <div class="mt-6 flex justify-end">
                    <SecondaryButton @click="closeModal" class="uppercase px-5"> Cancel </SecondaryButton>

                    <PrimaryButton
                        class="ms-3"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        @click="updateToken"
                    >
                      Generate Token
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    </section>
</template>
