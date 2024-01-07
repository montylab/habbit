<script setup lang="ts">
import {ref} from "vue";
import HabitSettings from "@/components/HabitSettings.vue";
import {HabitService} from "@/servises/habit.service";
import {storeToRefs} from "pinia";
import {useHabitsStore} from "@/stores/habits";

const {habits} = storeToRefs(useHabitsStore())

HabitService.getHabits()

const addNewHabit = () => {
	HabitService.createHabit({})
}
</script>

<template>
	<main class="habits">
		<h1>Manage your habits</h1>

		<button class="btn btn-add-habit" @click="addNewHabit()">Add new habit</button>

		<div class="list">
			<div
				v-for="habit of habits"
				:key="habit.id"
				class="habit">
				<HabitSettings :habit-id="habit.id"/>
			</div>
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