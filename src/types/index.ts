// TypeScript Types
export type Habit = {
    id: string;
    title: string;
    description: string;
    streak: number;
};

export type Group = {
    id: string;
    name: string;
    members: string[];
};
