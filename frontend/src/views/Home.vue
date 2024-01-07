<script setup lang="ts">
import HabitCalendar from "@/components/HabitCalendar.vue";
import HabitInput from "@/components/HabitInput.vue";
import {useHabitsRefStore, useHabitsStore} from "@/stores/habits";
import {storeToRefs} from "pinia";
import {HabitService} from "@/servises/habit.service";

const {habits} = useHabitsRefStore()

HabitService.getHabits()

</script>

<template>
	<main>
		<HabitInput
			v-for="habit of habits"
			:key="habit.id"
			:habit="habit"
		/>

		<HabitCalendar
			v-for="habit of habits"
			:key="habit.id"
			:habit="habit"
		/>

	</main>
</template>
