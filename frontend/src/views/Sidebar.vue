<script setup lang="ts">
import {RouterLink} from "vue-router";
import {ref} from "vue";
import {storeToRefs} from "pinia";
import {useUserData} from "@/stores/user";

const isOpen = ref(false)
const {user} = storeToRefs(useUserData())

const checkClosing = (event: Event) => {
	if (
		event.target?.tagName === 'A'
		|| event.target?.classList.contains('overlay')
	) {
		isOpen.value = false
	}
}

</script>

<template>
	<div :class="{'open': isOpen}">

		<div :class="{sidebar: true}">
			<div class="user">
				<h2>Hey, {{ user.displayName }}!</h2>
			</div>

			<nav @click="checkClosing">
				<RouterLink to="/">Home</RouterLink>
				<RouterLink to="/settings">Settings</RouterLink>
				<RouterLink to="/habits">Habits</RouterLink>
				<RouterLink to="/profile">Profile</RouterLink>
<!--				<RouterLink to="/login">Log in</RouterLink>-->
				<RouterLink to="/logout">Log out</RouterLink>
			</nav>
		</div>

		<div class="overlay" @click="checkClosing" />

		<button
			:class="'burger-close toggle ' + (isOpen && 'open')"
			@click="isOpen = !isOpen"
		>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</button>
	</div>
</template>

<style scoped lang="scss">
.overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 89;

	background: rgba(0,0,0,0.5);
	transition: all 0.5s ease;
	opacity: 0;
	visibility: hidden;

	.open & {
		opacity: 1;
		visibility: visible;
	}
}


.toggle {
	position: absolute;
	top: 20px;
	left: 20px;
	z-index: 99;
}

.user {
	padding-left: 20px;
	margin-bottom: 20px;
}

.sidebar {
	width: 70%;
	min-width: 200px;
	max-width: 300px;
	height: 100%;
	padding-top: 80px;

	position: absolute;
	top: 0;
	left: 0;
	z-index: 90;

	transform: translateX(-110%);

	background: whitesmoke;
	box-shadow: -10px 0 20px 0 #2c3e50;

	transition: all 0.4s ease;

	.open & {
		transform: translateX(0);
	}

	nav {
		display: flex;
		flex-direction: column;


		a {
			height: 40px;
			text-decoration: none;
			color: #282828;
			font-size: 18px;
			line-height: 40px;
			padding-left: 20px;


			&:hover, &:active {
				background: #039be5;
			}
		}
	}
}



.burger-close {
	width: 40px;
	height: 30px;

	transform: rotate(0deg);
	transition: .5s ease-in-out;
	cursor: pointer;

	background: none;
	border: none;
	outline: none;


	&.open  span {
		background: #888;
	}

}

.burger-close  span {
	display: block;
	position: absolute;
	height: 6px;
	width: 100%;
	background: #FFF;
	border-radius: 9px;
	opacity: 1;
	left: 0;
	transform: rotate(0deg);
	transition: all .25s ease-in-out;
}

/* Icon 3 */

.burger-close  span:nth-child(1) {
	top: 0px;
}

.burger-close  span:nth-child(2), .burger-close  span:nth-child(3) {
	top: 15px;
}

.burger-close  span:nth-child(4) {
	top: 30px;
}

.burger-close.open span:nth-child(1) {
	top: 18px;
	width: 0%;
	left: 50%;
}

.burger-close.open span:nth-child(2) {
	transform: rotate(45deg);
}

.burger-close.open span:nth-child(3) {
	transform: rotate(-45deg);
}

.burger-close.open span:nth-child(4) {
	top: 18px;
	width: 0%;
	left: 50%;
}
</style>
