<script setup lang="ts">
import {onUpdated, ref, watch} from "vue";
import {useHabitsStore} from "@/stores/habits";
import {HabitService} from "@/servises/habit.service";
import debounce from "debounce";
import {generateFalseHistory} from "@/data-mockers";

const props = defineProps<{
	habitId: string
}>()

const {habitId} = props

const {getHabitByID} = useHabitsStore()
const habit = getHabitByID(habitId)

watch(() => habit, () => {
	saveHabit()
}, {deep: true})

const saveHabit = debounce(() => {
	if (habit) {
		console.log('saved')
		habit.dates = generateFalseHistory()
		HabitService.saveHabitSettings(habit)
	}
}, 500)

const deleteHabit = () => {
	if (habit) {
		HabitService.deleteHabit(habit.id)
	}
}

</script>

<template>
	<div class="habit-settings" v-if="habit">
		<h1 class="green">{{ habit.name }}</h1>
		<div class="items">
			<div class="item">
				<div class="name">Enabled</div>
				<div class="value">
					<input type="checkbox" v-model="habit.isEnabled">
				</div>
			</div>


			<div class="item">
				<div class="name">Name</div>
				<div class="value">
					<input type="text" v-model=" habit.name">
				</div>
			</div>
			<div class="item">
				<div class="name">Color</div>
				<div class="value">
					<select v-model="habit.color">
						<option value="red">Red</option>
						<option value="orange">Orange</option>
						<option value="blue">Blue</option>
						<option value="green">Green</option>
					</select>
				</div>
			</div>

			<div class="item">
				<div class="name">Icon</div>
				<div class="value">
					<select v-model="habit.icon">
						<option value="heart">heart</option>
						<option value="circle">circle</option>
						<option value="smile">smile</option>
						<option value="football">football</option>
					</select>
				</div>
			</div>

			<div class="item">
				<div class="name">Frequency</div>
				<div class="value">
					<select v-model="habit.frequency">
						<option value="1">Daily</option>
						<option value="2">Every other day</option>
						<option value="7">Weekly</option>
						<option value="14">Bi-Weekly</option>
						<option value="30">Monthly</option>
					</select>
				</div>
			</div>

			<div class="item">
				<div class="name">Chart</div>
				<div class="value">
					<select v-model="habit.chartView">
						<option value="+7">Last 7 days</option>
						<option value="+31">Last 31 day</option>
						<option value="+365">Last 365 days</option>
						<option value="streak">Last streak</option>
						<option value="creation">From the creation</option>
					</select>
				</div>
			</div>
		</div>

		<button class="btn btn-delete" @click="deleteHabit">Delete Habit</button>
	</div>
</template>

<style scoped lang="scss">
.items {
	display: flex;
	flex-direction: column;
	justify-content: space-between;


	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.5rem;
		margin-bottom: 12px;
	}
}

.habit-settings {
	margin-bottom: 20px;

	background: whitesmoke;
	border-radius: 8px;

	padding: 16px;
	gap: 8px;

	.value {
		display: flex;
		justify-content: flex-end;
	}

	input {
		width: 40px;
		height: 40px;
		font-size: 1.5rem;
	}

	select {
		height: 40px;
		padding: 0 10px;
		font-size: 1.5rem;
	}

	input[type=text] {
		width: 70%;
		align-self: flex-end;
		padding: 0 10px;
		font-size: 1.5rem;
	}
}

h1 {
	font-weight: 500;
	font-size: 2rem;
	line-height: 40px;
}

.btn-delete {
	display: block;
	margin: 40px auto 0;
	background: #e0e0e0;


	&:hover {
		background: #e9492d;
	}
}
</style>
