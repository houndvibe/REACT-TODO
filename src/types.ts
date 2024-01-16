export interface userProps {
  id: string;
  nickName: string;
  firstName: string;
  lastName: string;
  age: number;
  password: string;
}
export interface todoProps {
  id: string;
  userId:string
  title: string;
  isCompleted: boolean;
  startDate: string;
  endDate: number;
  description:string
}