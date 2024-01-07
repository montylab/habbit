<script setup>

import {ref} from "vue";
import {storeToRefs} from "pinia";
import {useUserData} from "@/stores/user.ts";

const username = ref('monty')
const defaultAvatarURL = ref('https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg')

const {user} = storeToRefs(useUserData())

</script>

<template>
	<div class="profile">
		<h1>Hello, {{ user.displayName }}!</h1>

		<img class="avatar" width="100" height="100" :src="user.avatarURL || defaultAvatarURL" alt="avatar">
		<h2 v-if="user.email" class="email">{{ user.email }}</h2>

		<button class="btn btn-delete-account" @click="">Delete Account</button>
	</div>
</template>

<style>

.profile {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.avatar {
	width: 100px;
	height: 100px;
	line-height: 100px;

	border-radius: 50%;
	margin: 40px 0 40px 0;
	background: white;

	text-align: center;

}

.btn-delete-account {
	margin-top: 40px;
	&:hover {
		background: #e73212;
	}
}


</style>
