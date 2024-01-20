export interface userProps {
  id: string;
  nickName: string;
  firstName: string;
  lastName: string;
  age: number;
  password: string;
}

export interface potentialUserProps {
  password: string;
  id: string;
}

export interface usersListProps {
  isMenuCompact: boolean;
  setIsMenuCompact: () => void;
}

export interface userItemProps {
  user: userProps;
  isOpen: boolean;
  isCompact: boolean;
  handleCloseAll: () => void;
}

export interface TodoStaticPannelProps {
  handleChangeViewParams: (type: string, value: string) => void;
}

export interface todoListViewParamsProps {
  filterType: string;
  sortType: string;
}

export type todoStatus = "completed" | "in-progress" | "not started";

export interface todoListProps {
  currentUserTodos: todoProps[];
  viewParams: todoListViewParamsProps;
}

export interface sortFunctionsByTypesProps {
  ["new first"]: (a: todoProps, b: todoProps) => number;
  ["old first"]: (a: todoProps, b: todoProps) => number;
}

export interface todoItemProps {
  todoItem: todoProps;
  isOpen: boolean;
  handleCloseAllTodos: () => void;
  index: number;
}

export interface todoProps {
  id: string;
  userId: string;
  title: string;
  status: todoStatus;
  startDate: string;
  endDate: string;
  description: string;
}
