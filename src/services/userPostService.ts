import axios from "axios";
import { userProps } from "../types";
import { nanoid } from "@reduxjs/toolkit";

const JSON_SERVER_USERS: string = "http://localhost:3000/users";

export default class UsersPostService {
  static async getUsers() {
    return (await axios.get(JSON_SERVER_USERS)) as userProps[];
  }

  static async addUser(userName: string) {
    const newUser = {
      id: nanoid(),
      name: userName,
    };
    await axios.post(JSON_SERVER_USERS, newUser);
    return newUser as userProps;
  }

  static async deleteUserById(userId: string) {
    await axios.delete(`${JSON_SERVER_USERS}/${userId}`);
    return userId as string;
  }
}
