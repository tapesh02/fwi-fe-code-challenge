import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';

import { updatePlayer, fetchAllPlayers } from '../appState/players';
import cn from 'classnames';
import styles from './PlayerForm.module.scss';

const UpdatePlayerForm = ({ id, setShowUpdateFrom }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const updateNameRef = useRef(null);
  const upadateWinningsRef = useRef(null);

  const [countryData, setCountryData] = useState([]);
  const [countryCode, setCountryCode] = useState('');
  const [updatedData, setUpdatedData] = useState({
    name: '',
    winnings: '',
    country: 'AG',
  });

  const handleInputChange = (event) => {
    setUpdatedData({ ...updatedData, [event.target.name]: event.target.value });
  };

  const handleSelect = (event) => {
    setCountryCode(event.target.value);
    const data = { ...updatedData, country: event.target.value };
    setUpdatedData(data);
  };

  const submitUpdatedData = (event) => {
    event.preventDefault();
    dispatch(updatePlayer({ id, updatedData }));
    alert.success('Player details updated successfully');
    setTimeout(() => {
      event.target.reset();
      setCountryCode(event.target.reset());
      dispatch(fetchAllPlayers());
      setShowUpdateFrom(!setShowUpdateFrom);
    }, 1000);
  };

  useEffect(() => {
    const getCodes = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v2/all`);
        const responseJson = await response.json();
        setCountryData(responseJson);
      } catch (error) {
        console.log(error);
      }
    };
    getCodes();
  }, []);

  return (
    <>
      <div className={styles.formBg}>
        <div className={styles.mainForm}>
          <div className={styles.fromHeader}>
            <h3 className={styles.headerText}>
              Update Player Details
              <hr />
            </h3>
          </div>
          <form onSubmit={submitUpdatedData} className={styles.fromSection}>
            <div className={styles.nameInputMain}>
              <label htmlFor="name" className={styles.lable}>
                Full Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="enter player full name"
                onChange={handleInputChange}
                className={styles.input}
                required
                ref={updateNameRef}
              />
            </div>

            <div className={styles.winningsInputMain}>
              <label htmlFor="winningsInputMain" className={styles.lable}>
                Winning Amount
              </label>
              <input
                name="winnings"
                type="text"
                placeholder="enter amount"
                onChange={handleInputChange}
                className={styles.input}
                required
                ref={upadateWinningsRef}
              />
            </div>

            <div className={styles.countryInputMain}>
              <label htmlFor="country" className={styles.lable}>
                Select Country
              </label>
              <select
                name="country"
                className={styles.select}
                value={countryCode}
                onChange={handleSelect}
              >
                {countryData.map((country, i) => (
                  <option key={i} value={country.alpha2Code}>
                    {country.name.substring(0, 35)}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.mainBtns}>
              <div className={styles.innerBtns}>
                <button
                  className={cn(styles.button, styles.updateBtn)}
                  type="submit"
                >
                  Update
                </button>
                <button
                  className={styles.button}
                  onClick={() => setShowUpdateFrom(!setShowUpdateFrom)}
                >
                  Cancle
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePlayerForm;
