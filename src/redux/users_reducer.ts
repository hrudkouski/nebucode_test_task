import { toast } from 'react-hot-toast';

import { AppThunkType, GetActionsTypes } from './store';

import { GetUsersType, usersApi } from 'api/users_api';

enum Users {
  SET_USERS = 'nebucode_test_task/users_reducer/SET_USERS',
}

const initialState = {
  users: [] as GetUsersType[],
};

export const usersReducer = (
  state = initialState,
  action: UsersActionTypes,
): UsersPageInitialStateType => {
  switch (action.type) {
    case Users.SET_USERS:
      return { ...state, users: [...action.users] };
    default:
      return state;
  }
};

export const usersActions = {
  setUsers: (users: GetUsersType[]) =>
    ({
      type: Users.SET_USERS,
      users,
    } as const),
};

export const getResponseUsers = (): AppThunkType => async dispatch => {
  try {
    const res = await usersApi.getUsers();
    dispatch(usersActions.setUsers(res));
    toast.success('Users have been received');
  } catch (err) {
    toast.error('Some error occurred');
  }
};

export type UsersPageInitialStateType = typeof initialState;
export type UsersActionTypes = GetActionsTypes<typeof usersActions>;
