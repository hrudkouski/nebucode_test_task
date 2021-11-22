import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleWare, { ThunkAction } from 'redux-thunk';

import { UsersActionTypes, usersReducer } from './users_reducer';

const rootReducer = combineReducers({
  usersPage: usersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppActionType = UsersActionTypes;
export type GetActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U }
  ? U
  : never;
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionType
>;
