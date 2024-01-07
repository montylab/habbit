import {ref, computed} from 'vue'
import {defineStore, storeToRefs} from 'pinia'

export interface Habit {
    id: string
    name: string
    dates: any
    frequency: string
    color: string
    icon: string
    createdAt: number
    updateAt: number
    isEnabled: boolean
    chartView: string
}

export const useHabitsStore = defineStore('habits', () => {
    const habits = ref<Habit[]>([])

    function setHabits(newHabits: Habit[]) {
        habits.value = newHabits
    }

    function getHabitByID(id: string): Habit | undefined {
        return habits.value.find(h => h.id === id)
    }


    return {
        habits,
        setHabits,
        getHabitByID
    }
}, {persist: true})

//export const HabitsRefStore = storeToRefs(useHabitsStore())
export const useHabitsRefStore = () => storeToRefs(useHabitsStore())
