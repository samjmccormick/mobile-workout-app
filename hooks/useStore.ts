import { Workout, initialWorkouts } from "@/constants/workouts";
import { create } from "zustand";

export type ExerciseState = {
  [exerciseName: string]: {
    currentWeight: number;
    lastFailed: boolean;
    lastWorkoutId: number;
    lastDate: Date;
  };
};

type WorkoutState = {
  workouts: Workout[];
  exerciseState: ExerciseState;
  addWorkout: (workout: Workout) => void;
};

const initialExerciseState = initialWorkouts.reduce<ExerciseState>((acc, w) => {
  w.exercises.forEach((ex) => {
    acc[ex.name] = {
      currentWeight: ex.weight,
      lastFailed: ex.failed,
      lastWorkoutId: w.id,
      lastDate: w.date,
    };
  });
  return acc;
}, {});

export const useWorkoutStore = create<WorkoutState>((set) => ({
  workouts: initialWorkouts,
  exerciseState: initialExerciseState,
  addWorkout: (workout) =>
    set((state) => {
      const updatedExerciseState = { ...state.exerciseState };
      workout.exercises.forEach((ex) => {
        updatedExerciseState[ex.name] = {
          currentWeight: ex.weight,
          lastFailed: ex.failed,
          lastWorkoutId: workout.id,
          lastDate: workout.date,
        };
      });

      return {
        workouts: [...state.workouts, workout],
        exerciseState: updatedExerciseState,
      };
    }),
}));
