<script setup lang="ts">

import {auth} from "@/firebase";
import {AuthService} from "@/servises/auth.service";
import {useUserData} from "@/stores/user";
import {storeToRefs} from "pinia";
import {watch} from "vue";
import {useRouter} from "vue-router";

const { user } = storeToRefs(useUserData())
const router = useRouter()

// watch(user, () => {
// 	if (user.value.accessToken) {
// 		router.push('/')
// 	}
// }, {deep: true})

</script>

<template>
	<main class="login">
<!--		{{user}}-->

		<h1>Manage your habits</h1>

		<div class="form">
			<button
				class="btn btn-add-habit"
				@click="AuthService.signInWithGoogle"
			>Sign in With Google
			</button>
		</div>
	</main>
</template>

<style scoped lang="scss">
h1 {
	text-align: center;
	font-size: 2rem;
	font-weight: 500;
	color: whitesmoke;
}

.btn-add-habit {
	display: block;
	margin: 20px auto;
}
</style>
