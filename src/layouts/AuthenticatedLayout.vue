<script setup>
import HeaderArea from '@/components/Header/HeaderArea.vue';
import SidebarArea from '@/components/Sidebar/SidebarArea.vue';
import { useToast } from "vue-toastification";
const toast = useToast()

</script>

<template>
  <!-- ===== Page Wrapper Start ===== -->
  <div class="flex h-screen overflow-hidden">
    <!-- ===== Sidebar Start ===== -->
    <SidebarArea />
    <!-- ===== Sidebar End ===== -->

    <!-- ===== Content Area Start ===== -->
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <!-- ===== Header Start ===== -->
      <HeaderArea />
      <!-- ===== Header End ===== -->

      <!-- ===== Main Content Start ===== -->
      <main>
        <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <slot></slot>
        </div>
      </main>
      <!-- ===== Main Content End ===== -->

      <footer class="mt-auto bg-white text-gray-600 dark:bg-boxdark dark:text-gray-200 py-4 px-10">
        <div class="container mx-auto md:flex text-center md:text-left md:justify-between">
            <div class="md:w-3/4">
                <p>&copy; {{ new Date().getFullYear() }} Copyright: <strong><a href="#">{{ appName }}</a>.</strong> All rights reserved.</p>
            </div>
            <div class="md:w-1/4">
                <p class="md:float-right"><b>Version</b> {{ appVersion }}</p>
            </div>
        </div>
      </footer>
    </div>
  </div>
  <!-- ===== Page Wrapper End ===== -->

  <!-- <header>
    <nav>
      <RouterLink :to="{ name: 'dashboard' }" class="nav-link">Dashboard</RouterLink>

      <div v-if="authStore.user" class="flex items-center space-x-6">
        <p class="text-sm text-slate-300">
          Welcome back {{ authStore.user.name }}
        </p>
        <RouterLink :to="{ name: 'create' }" class="nav-link">
          New Post
        </RouterLink>
        <form @submit.prevent="authStore.logout">
          <button class="nav-link">Logout</button>
        </form>
      </div>

      <div v-else class="space-x-6">
        <RouterLink :to="{ name: 'register' }" class="nav-link">
          Register
        </RouterLink>
        <RouterLink :to="{ name: 'login' }" class="nav-link">
          Login
        </RouterLink>
      </div>
    </nav>
  </header> -->
</template>
