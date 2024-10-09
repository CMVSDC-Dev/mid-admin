import { createRouter, createWebHistory } from "vue-router";

// import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard";
import Entry from "@/views/Entry";
import Inquiry from "@/views/Inquiry";
import InquiryDetails from "@/views/Inquiry/Details";
import Register from "@/views/Auth/Register.vue";
import Login from "@/views/Auth/Login.vue";
import Create from "@/views/Posts/Create.vue";
import Show from "@/views/Posts/Show.vue";
import Update from "@/views/Posts/Update.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      meta: { auth: true },
    },
    /***** AUTH ROUTES *****/
    // {
    //   path: "/register",
    //   name: "register",
    //   component: Register,
    //   meta: { guest: true },
    // },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { guest: true },
    },
    {
      path: "/create",
      name: "Create",
      component: Create,
      meta: { auth: true },
    },
    /***** MID ROUTES *****/
    {
      path: "/entries",
      name: "Entries",
      component: Entry,
      meta: { auth: true },
    },
    {
      path: "/inquiries",
      name: "Inquiries",
      component: Inquiry,
      meta: { auth: true },
    },
    {
      path: "/inquiries/details/:id",
      name: "Inquiry Details",
      component: InquiryDetails,
      meta: { auth: true },
    },
    /***** SETTINGS ROUTES *****/
    {
      path: "/settings",
      name: "Settings",
      component: Dashboard,
      meta: { auth: true },
    },
    {
      path: "/profile",
      name: "Profile",
      component: Dashboard,
      meta: { auth: true },
    },
    {
      path: "/users",
      name: "Users",
      component: Dashboard,
      meta: { auth: true },
    },
    {
      path: "/monitoring-config",
      name: "Monitoring Config",
      component: Dashboard,
      meta: { auth: true },
    },
    /***** POST ROUTES *****/
    // {
    //   path: "/posts/:id",
    //   name: "show",
    //   component: Show,
    // },
    // {
    //   path: "/posts/update/:id",
    //   name: "update",
    //   component: Update,
    //   meta: { auth: true },
    // },
  ],
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.getUser();

  if (authStore.user && to.meta.guest) {
    return { name: "Dashboard" };
  }

  if (!authStore.user && to.meta.auth) {
    return { name: "Login" };
  }
});

export default router;
