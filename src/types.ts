export interface userProps {
  id: string;
  nickName: string;
  firstName: string;
  lastName: string;
  age: number;
  password: string;
}

export type todoStatus = "completed" | "in-progress" | "not started";

export interface todoProps {
  id: string;
  userId: string;
  title: string;
  status: todoStatus;
  startDate: string;
  endDate: string;
  description: string;
}
