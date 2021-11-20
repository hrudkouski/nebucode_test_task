import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getResponseUsers } from '../bll/users_reducer';
import { GetUsersItemsType } from '../dal/users_api';
import { ReturnComponentType } from '../types';

import { AppRootStateType } from 'bll/store';

export const AutocompleteInput: FC = (): ReturnComponentType => {
  const dispatch = useDispatch();
  const usersNames = useSelector<AppRootStateType>(state =>
    state.usersPage.users.map((el: GetUsersItemsType) => (
      <div key={el.id}>{el.name}</div>
    )),
  );

  useEffect(() => {
    dispatch(getResponseUsers());
  }, [dispatch]);

  return (
    <>
      <input placeholder="Search name..." type="text" />
      <button type="button">Send</button>
      {usersNames}
    </>
  );
};
