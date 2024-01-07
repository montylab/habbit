<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from "@/views/Sidebar.vue";
import {useUserStore} from "@/stores/user";

const {user} = useUserStore()
</script>

<template>
  <Sidebar v-if="user.accessToken" />

  <RouterView class="main-view" />
</template>

<style scoped>
.main-view {
	min-height: 100vh;
	padding: 80px 20px 20px 20px;
	background: #ff9400;
}

@media (min-width: 1024px) {
}
</style>
