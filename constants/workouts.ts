export type Exercise = {
  name: string;
  weight: number;
  failed: boolean;
};
export type Workout = {
  name: string;
  id: number;
  date: string;
  exercises: Exercise[];
};

export const initialWorkouts: Workout[] = [
  {
    name: "A",
    id: 1,
    date: "2023-08-01",
    exercises: [
      { name: "Squat", weight: 100, failed: false },
      { name: "Bench Press", weight: 100, failed: false },
      { name: "Barbell Row", weight: 100, failed: false },
    ],
  },
  {
    name: "B",
    id: 2,
    date: "2023-08-02",
    exercises: [
      { name: "Squat", weight: 100, failed: false },
      { name: "Overhead Press", weight: 100, failed: false },
      { name: "Deadlift", weight: 100, failed: false },
    ],
  },
];
