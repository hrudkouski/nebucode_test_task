import { GetUsersType } from '../api/users_api';
import { AppRootStateType } from '../redux/store';

export const getUsersSelector = (state: AppRootStateType): string[] =>
  state.usersPage.users.map((el: GetUsersType) => el.name);
