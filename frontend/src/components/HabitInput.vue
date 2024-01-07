<script setup lang="ts">
import {ref, watch} from "vue";
import type {Habit} from "@/stores/habits";
import {HabitService} from "@/servises/habit.service";

const props = defineProps<{
	habit: Habit
}>()

const date = new Date()
const currentDateMark = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

const {habit} = props
const isChecked = ref(false)

watch(habit, () => {
	isChecked.value = Boolean(habit?.dates?.[currentDateMark])
}, {deep: true, immediate: true})

const toggleHabit = () => {
	//isChecked.value = !is
	HabitService.setHabitDateState(habit, currentDateMark, isChecked.value)
}

</script>

<template>
	<div class="habit">
		<h1 class="green">{{ habit.name }}</h1>
		<input type="checkbox" v-model="isChecked" @change="toggleHabit">
	</div>
</template>

<style scoped lang="scss">
.habit {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;

	background: whitesmoke;
	border-radius: 8px;

	padding: 16px;
	gap: 8px;

	input {
		min-width: 40px;
		width: 40px;
		height: 40px;
	}
}

h1 {
	font-weight: 500;
	font-size: 2rem;
	line-height: 40px;
}
</style>
