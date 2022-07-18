import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import { fetchAllPlayers } from '../appState/players';
import PlayerTableBody from './PlayerTableBody';
import PlayerTableHeader from './PlayerTableHeader';
import styles from './PlayerTable.module.scss';
import AddPlayerForm from './AddPlayerForm';

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
};

export default function PlayerTable() {
  const dispatch = useDispatch();
  const [showFrom, setShowFrom] = useState(false);

  const handleShowFrom = () => {
    setShowFrom(true);
  };

  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, [dispatch]);

  return (
    <>
      <Provider template={AlertTemplate} {...options}>
        {showFrom && <AddPlayerForm setShowFrom={setShowFrom} />}

        <div className={styles.tableBg}>
          <div className={styles.mainTable}>
            <PlayerTableHeader handleShowFrom={handleShowFrom} />
            <PlayerTableBody />
          </div>
        </div>
      </Provider>
    </>
  );
}
