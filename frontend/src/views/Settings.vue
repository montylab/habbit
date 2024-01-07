<script setup lang="ts">

import {ref} from "vue";

const theme = ref('light')
</script>

<template>
	<main :class="theme">
		<div class="items">
			<div class="item">
				<div class="name">Theme</div>
				<div class="value">
					<select v-model="theme">
						<option value="dark">Dark</option>
						<option value="light">Light</option>
					</select>
				</div>
			</div>
		</div>
	</main>
</template>

<style lang="scss" scoped>
.dark {
	background: #282828;

	.name {
		color: whitesmoke;
	}
}

.light {
	background: #ffa100;
}


.items {
	display: flex;
	flex-direction: column;
}

.item {
	padding: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.name {
	font-size: 1.5rem;
	color: #282828;
}

.value {
	select {
		font-size: 1.5rem;
		height: 40px;
		padding: 0 10px;
	}
}
</style>
