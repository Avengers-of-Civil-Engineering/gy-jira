import { useQuery } from "react-query";
import { User } from "types/user";
import { get } from "./request";

export const useUsers = (param?: Partial<User>) => {
  return useQuery<User[], Error>(["users", param], () =>
    get("/api/v1/users/", param)
  );
};
