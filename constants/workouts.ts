export type Exercise = {
  name: string;
  weight: number;
  failed: boolean;
};
export type Workout = {
  name: string;
  id: number;
  date: Date;
  exercises: Exercise[];
};

export const initialWorkouts: Workout[] = [
  {
    name: "A",
    id: 1,
    date: new Date(2025, 9, 2),
    exercises: [
      { name: "Squat", weight: 100, failed: true },
      { name: "Bench Press", weight: 100, failed: false },
      { name: "Barbell Row", weight: 100, failed: false },
    ],
  },
  {
    name: "B",
    id: 2,
    date: new Date(2025, 9, 3),
    exercises: [
      { name: "Squat", weight: 100, failed: false },
      { name: "Overhead Press", weight: 100, failed: false },
      { name: "Deadlift", weight: 100, failed: false },
    ],
  },
];
