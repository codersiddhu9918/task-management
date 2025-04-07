export enum TaskCategory {
  WORK = 'Work',
  PERSONAL = 'Personal',
  STUDY = 'Study',
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

// Updated Task interface
export interface Task {
  id?: number;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  user: { id: number };  // user is now an object with id
}
