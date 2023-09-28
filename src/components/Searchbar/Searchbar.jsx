import React, { useState } from 'react';
import css from '../Styles.module.css';

export const Searchbar = ({ onFind }) => {
  const [find, setFind] = useState('');

  const onFormSubmit = e => {
    e.preventDefault();
    onFind(find);
  };
  const onFormInput = ({ target: { value } }) => {
    setFind(value);
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={onFormSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchButton}>
          <span className="button-label">Search</span>
        </button>

        <input
          value={find}
          name="find"
          onInput={onFormInput}
          className={css.SearchInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
