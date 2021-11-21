import { instance } from './api';

export const usersApi = {
  getUsers() {
    return instance.get<GetUsersType[]>(`users`).then(res => res.data);
  },
};

export type GetUsersType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: GetUserAddressType;
  phone: string;
  website: string;
  company: GetUserCompanyType;
};
export type GetUserAddressType = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GetUserAddressGeoType;
};
export type GetUserAddressGeoType = {
  lat: string;
  lng: string;
};
export type GetUserCompanyType = {
  name: string;
  catchPhrase: string;
  bs: string;
};
