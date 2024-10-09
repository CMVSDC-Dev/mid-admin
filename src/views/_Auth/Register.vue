<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { onMounted, reactive } from "vue";

const { errors } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

onMounted(() => (errors.value = {}));
</script>

<template>
  <main>
    <h1 class="title">Register a new account</h1>

    <form
      @submit.prevent="authenticate('register', form)"
      class="w-1/2 mx-auto space-y-6"
    >
      <div>
        <input type="text" placeholder="Name" v-model="form.name" />
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
      </div>

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

      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          v-model="form.password_confirmation"
        />
      </div>

      <button class="primary-btn">Register</button>
    </form>
  </main>
</template>
