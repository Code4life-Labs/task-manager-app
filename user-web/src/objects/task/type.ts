export type TaskModelType = {
  _id: string;
  creatorId: string;
  priorityId: string;
  statusId: string;
  sizeId: string;
  name: string;
  description: string;
  progress: number;
  startAt: number;
  endAt: number;
  createdAt: number;
  updatedAt: number;
};

export type TaskType = TaskModelType;

export type NewTaskType = {
  creatorId: string;
  priorityId: string;
  statusId: string;
  sizeId: string;
  name: string;
  description: string;
  progress: number;
  startAt: number;
  endAt: number;
};

export type UpdateTaskType = Partial<NewTaskType>;

export type TaskSizeModelType = {
  _id: string;
  name: string;
  value: string;
  createdAt: number;
  updatedAt: number;
};

export type TaskSizeType = TaskSizeModelType;

export type TaskPriorityModelType = {
  _id: string;
  name: string;
  value: string;
  createdAt: number;
  updatedAt: number;
};

export type TaskPriorityType = TaskPriorityModelType;

export type TaskStatusModelType = {
  _id: string;
  name: string;
  value: string;
  createdAt: number;
  updatedAt: number;
};

export type TaskStatusType = TaskStatusModelType;
