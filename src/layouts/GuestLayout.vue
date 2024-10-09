<script setup>

</script>

<template>
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-boxdark">

        <div>
            <router-link to="/">
                <!-- <ApplicationLogo class="w-40 h-40 fill-current text-gray-500" /> -->
                <h1 class="text-5xl font-extrabold">{{ appName }}</h1>
            </router-link>
            <p class="text-center"><b>Version</b> {{ appVersion }}</p>
        </div>

        <div class="w-full sm:max-w-md mt-4 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg dark:bg-gray-900" >
            <slot />
        </div>

      </div>

</template>
