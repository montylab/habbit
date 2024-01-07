<script setup lang="ts">

//todo: add Year, Month, Week, Streak

import {ref, toRef, toRefs, watch} from "vue";
import type {Habit} from "@/stores/habits";

const props = defineProps<{
	habit: Habit
}>()

const {habit} = toRefs(props)

//const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
//const days = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
//const views = ['daysInRow', 'month', 'year']
//const year = 2023;

const view = 'daysInRow'

const isDayChecked = (day: number | string, month: number | string, year: number | string) => {
	const dateMark = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

	return habit.dates[dateMark]
}

const getLastDaysArray = (days: number = 365) => {
	const dayArray = []

	for (let i = 0; i < days; i++) {
		const date = new Date(Date.now() - i * 3600 * 24 * 1000)
		const dateMark = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
		dayArray.push(dateMark)
	}

	return dayArray
}

const getLastStreakLength = () => {
	for (let i = 0; i < 1000; i++) {
		const date = new Date(Date.now() - i * 3600 * 24 * 1000)
		const dateMark = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
		if (!habit.value.dates[dateMark]) {
			return i+1
		}
	}

	return 1000
}



let daysToShow = 31
const {chartView} = habit.value
if (chartView[0] === '+') {
	daysToShow = parseInt(chartView)
} else if (chartView === 'streak') {
	daysToShow = getLastStreakLength()
} else if (chartView === 'creation') {
	const oldestMark =  Object.keys(habit.value.dates).sort()[0]
	debugger
	daysToShow = Object.keys(habit.value.dates).length
}

const daysArray = getLastDaysArray(daysToShow)

</script>


<template>
	<div class="habit">
		<h1 class="green">{{ habit.name }}</h1>
		<h3>
			You’ve fill 77 out of 99. Current streak is 12 Days. Max Streak 21.
		</h3>

		<div class="history">
			<div class="days-in-row"
				 v-if="view==='daysInRow'"
			>
				<div :class="{day: true, checked: habit.dates[day] }"
					 v-for="(day, dIndex) of daysArray"
					 :key="day"
					 :title="day"
				></div>
			</div>

			<!--			<div v-else
							class="month"
							 v-for="(month, mIndex) of months"
							 :key="month"
						>
			&lt;!&ndash;				{{ month }}&ndash;&gt;

							<div class="days">
								<div :class="{day: true, checked: isDayChecked(dIndex+1, mIndex+1, year) }"
									 v-for="(day, dIndex) of days"
									 :key="month + day"
									 :title="`${day} ${month} ${year}`"
								>
									&lt;!&ndash;					{{ day }}&ndash;&gt;
								</div>
							</div>

						</div>-->
		</div>
	</div>
</template>

<style scoped lang="scss">
.habit {
	margin-bottom: 40px;
}

h1 {
	font-weight: 500;
	font-size: 2.6rem;
	position: relative;
}

h3 {
	font-size: 1.2rem;
}

.history {
	display: flex;
	flex-direction: column;

	background: whitesmoke;
	border-radius: 8px;

	padding: 16px;
	gap: 4px;

	.days-in-row {
		--size: 24px;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.month {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.days {
		display: flex;
		justify-content: space-between;
		gap: 4px;
	}

	.day {
		background: #ddd;
		width: var(--size);
		height: var(--size);
		transition: all .6s ease;
		cursor: help;

		&.checked {
			background: #ffa100;
		}
	}
}

</style>
