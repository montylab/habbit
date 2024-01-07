import {getDatabase, ref, set, push, update, get, remove} from "firebase/database";
import {useUserData} from "@/stores/user";
import type {Habit} from "@/stores/habits";
import {useHabitsStore} from "@/stores/habits";

export const HabitService = {
    async getHabits(): Promise<Habit[]> {
        const {setHabits} = useHabitsStore()

        const database = getDatabase();
        const {user} = useUserData()

        return get(ref(database, `users/${user.uid}/habits`))
            .then((snapshot) => {

                const habits = snapshot.exists() ? snapshot.val() as Habit[] : []
                const habitsArray = Object.values(habits)
                habitsArray.sort((a, b) => b.createdAt - a.createdAt)
                setHabits(habitsArray)

                console.log(
                    'habits retrieved from firebase',
                    habitsArray[0].dates['2024-01-06']
                )

                return habitsArray
            }).catch((error) => {
                console.error(error);
                return []
            });
    },

    async createHabit(habit: Partial<Habit>): Promise<any> {
        const database = getDatabase();

        const {user} = useUserData()

        const habitsListRef = ref(database, `users/${user.uid}/habits`);
        const newHabitRef = push(habitsListRef);

        return set(newHabitRef, {
            id: newHabitRef.key,
            isEnabled: true,
            frequency: 1,
            color: 'blue',
            icon: 'heart',
            dates: {},
            createdAt: Date.now(),
            updatedAt: Date.now(),

            ...habit
        }).then((result) => {
            this.getHabits()
            return result
        });
    },

    saveHabitSettings(habit: Partial<Habit>) {
        const database = getDatabase();

        const {user} = useUserData()

        if (habit.id) {
            update(ref(database, `users/${user.uid}/habits/${habit.id}`), {
                updatedAt: Date.now(),
                ...habit
            }).then((result) => {
                this.getHabits()
                console.log({result})
                return result
            });
        }
    },

    setHabitDateState(habit: Partial<Habit>, currentDateMark: string, isChecked: boolean) {
        const database = getDatabase();

        const {user} = useUserData()

        if (habit.id) {
            update(
                ref(database, `users/${user.uid}/habits/${habit.id}/dates`),
                {[currentDateMark]: isChecked}
            ).then((result) => {
                this.getHabits()
                console.log({result})
                return result
            });
        }
    },

    deleteHabit(habitId: string) {
        const database = getDatabase();
        const {user} = useUserData()

        return remove(ref(database, `users/${user.uid}/habits/${habitId}`))
            .then(() => {
                this.getHabits()
                return true
            }).catch((error) => {
                console.error(error);
                return []
            });
    },


    setup() {

    }
}

HabitService.setup()