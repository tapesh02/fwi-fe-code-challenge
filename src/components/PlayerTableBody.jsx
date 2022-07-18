import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Flag from 'react-world-flags';
import { useAlert } from 'react-alert';

import { getPlayers, deletePlayer } from '../appState/players';
import UpdatePlayerFrom from './UpdatePlayerForm';

import Avatar from './Avatar';
import styles from './PlayerTableBody.module.scss';

import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

export default function PlayerTableBody() {
  const dispatch = useDispatch();
  const players = useSelector(getPlayers);
  const alert = useAlert();

  const [pId, setpId] = useState('');
  const [showUpdateFrom, setShowUpdateFrom] = useState(false);

  const handleShowUpdateFrom = (id) => {
    setpId(id);
    setShowUpdateFrom(true);
  };

  const handleDelete = (id) => {
    dispatch(deletePlayer(id));
    alert.success(`player has been deleted `);
  };

  return (
    <>
      {showUpdateFrom && (
        <UpdatePlayerFrom id={pId} setShowUpdateFrom={setShowUpdateFrom} />
      )}
      <div className={styles.tableSection}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}> Avatar </th>
              <th className={styles.th}> Player </th>
              <th className={styles.th}> Winnings </th>
              <th className={styles.th}> Country </th>
              <th className={styles.th}> Action </th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {players.map(({ id, name, winnings, country, imageUrl }) => (
              <tr key={id} className={styles.tr}>
                <td className={styles.td}>
                  <Avatar src={imageUrl} size={40} round={true} />
                </td>
                <td className={styles.td}>{name}</td>
                <td className={styles.td}>
                  {winnings.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </td>
                <td className={styles.td}>
                  <div className={styles.flagsMain}>
                    <Flag code={country} />
                    {country}
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.tooltip}>
                    <button
                      className={styles.button}
                      onClick={() => handleDelete(id)}
                    >
                      <AiFillDelete size={18.5} />
                    </button>
                    <span className={styles.tooltiptext}>delete</span>
                  </div>
                  <div className={styles.tooltip}>
                    <button
                      className={styles.button}
                      onClick={() => handleShowUpdateFrom(id)}
                    >
                      <BiEdit size={18.5} />
                    </button>
                    <span className={styles.tooltiptext}>edit</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
