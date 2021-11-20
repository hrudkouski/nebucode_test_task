import { AppThunkType, GetActionsTypes } from './store';

import { GetUsersItemsType, usersApi } from 'dal/users_api';

enum Users {
  SET_USERS = 'nebucode_test_task/users_reducer/SET_USERS',
}

// Initial State
const initialState = {
  users: [] as GetUsersItemsType[],
};

// Reducer
export const usersReducer = (
  // eslint-disable-next-line default-param-last
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

// Action Creators
export const usersActions = {
  setUsers: (users: GetUsersItemsType[]) =>
    ({
      type: Users.SET_USERS,
      users,
    } as const),
};

// ThunkCreator
export const getResponseUsers = (): AppThunkType => async dispatch => {
  const res = await usersApi.getUsers();
  dispatch(usersActions.setUsers(res));
};

// Types
export type UsersPageInitialStateType = typeof initialState;
export type UsersActionTypes = GetActionsTypes<typeof usersActions>;
