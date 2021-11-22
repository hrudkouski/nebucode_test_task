import React, {
  FC,
  useEffect,
  useState,
  KeyboardEvent,
  ChangeEvent,
  MouseEvent,
} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getResponseUsers } from '../redux/users_reducer';
import { getUsersSelector } from '../selectors/users_selectors';
import { ReturnComponentType } from '../types';

import s from './AutocompleteInput.module.css';

enum Class {
  Active = 'active',
}
enum Key {
  Enter = 'Enter',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
}

export const AutocompleteInput: FC = (): ReturnComponentType => {
  const [inputText, setInputText] = useState<string>('');
  const [isShow, setIsShow] = useState<boolean>(false);
  const [active, setActive] = useState<number>(-1);
  const [filtered, setFiltered] = useState<string[]>([]);

  const usersNames = useSelector(getUsersSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResponseUsers());
  }, [dispatch]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    const newFilteredSentences = usersNames.filter(
      (el: string) => el.toLowerCase().indexOf(value.toLowerCase()) > -1,
    );
    setActive(0);
    setFiltered(newFilteredSentences);
    setIsShow(true);
    setInputText(e.currentTarget.value);
  };

  const onClickHandler = (e: MouseEvent<HTMLElement>): void => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    const target = e.target as HTMLElement;
    setInputText(target.innerText);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === Key.Enter) {
      setActive(0);
      setIsShow(false);
      setInputText(filtered[active]);
    }
    if (e.key === Key.ArrowUp) {
      if (active !== -1) {
        setActive(active - 1);
      }
    }
    if (e.key === Key.ArrowDown) {
      if (active !== filtered.length - 1) {
        setActive(active + 1);
      }
    }
  };

  const renderAutocomplete = (): ReturnComponentType => {
    if (isShow && inputText) {
      if (filtered.length) {
        return (
          <ul role="presentation" className={s.autocomplete} onClick={onClickHandler}>
            {filtered.map((suggestion, index) => {
              let className;
              if (index === active) {
                className = s[Class.Active];
              }
              return (
                <li className={className} key={suggestion}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      }
      return (
        <div className={s.no_autocomplete}>
          <span>Ooops... No such name ☹</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={s.outer}>
      <input
        onChange={onChangeHandler}
        onKeyDown={onKeyDown}
        value={inputText}
        placeholder="Search name..."
        type="text"
      />
      {renderAutocomplete()}
    </div>
  );
};
