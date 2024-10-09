<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { onMounted, reactive } from "vue";

const { errors } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

onMounted(() => (errors.value = {}));
</script>

<template>
  <main>
    <h1 class="title">Login to your account</h1>

    <form
      @submit.prevent="authenticate('login', form)"
      class="w-1/2 mx-auto space-y-6"
    >
      <div>
        <input type="text" placeholder="Email" v-model="form.email" />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          v-model="form.password"
        />
        <p v-if="errors.password" class="error">{{ errors.password }}</p>
      </div>

      <button class="primary-btn">Login</button>
    </form>
  </main>
</template>
