import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';

import { sortby } from '../appState/players';

import styles from './PlayerTableHeader.module.scss';

const sortByOptions = [
  {
    label: 'By name',
    value: 'name',
  },
  {
    label: 'By winnings',
    value: 'winnings',
  },
  {
    label: 'By country',
    value: 'country',
  },
];

const sortOrderOptions = [
  {
    label: 'Descending',
    value: 'desc',
  },
  {
    label: 'Ascending',
    value: 'asc',
  },
];

export default function PlayerTableHeader({ handleShowFrom }) {
  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const sortbyvalue = sortBy.value === undefined ? 'name' : sortBy.value;
  const sortordervalue =
    sortOrder.value === undefined ? 'desc' : sortOrder.value;

  useEffect(() => {
    dispatch(sortby({ sortbyvalue, sortordervalue }));
  }, [sortbyvalue, sortordervalue]);

  return (
    <>
      <div className={styles.tableHeader}>
        <p>Player Details</p>
        <div className={styles.headerActions}>
          <Select
            placeholder="Sort by"
            options={sortByOptions}
            className={styles.select}
            value={sortBy}
            instanceId
            onChange={setSortBy}
          />

          <Select
            placeholder="Sort Order"
            options={sortOrderOptions}
            className={styles.select}
            value={sortOrder}
            instanceId
            onChange={setSortOrder}
          />

          <button
            className={styles.addPlayerBtn}
            onClick={() => handleShowFrom()}
          >
            Add Player
          </button>
        </div>
      </div>
    </>
  );
}
