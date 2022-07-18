import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';

import { addPlayer, fetchAllPlayers } from '../appState/players';
import styles from './PlayerForm.module.scss';

const AddPlayerForm = ({ setShowFrom }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const nameRef = useRef(null);
  const winningsRef = useRef(null);

  const [countryData, setCountryData] = useState([]);
  const [countryCode, setCountryCode] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    winnings: '',
    country: 'AG',
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSelect = (event) => {
    setCountryCode(event.target.value);
    const data = { ...formData, country: event.target.value };
    setFormData(data);
  };

  const handleSubmitData = (event) => {
    event.preventDefault();
    dispatch(addPlayer(formData));
    alert.success('Player has been added successfully');
    setTimeout(() => {
      event.target.reset();
      setCountryCode(event.target.reset());
      dispatch(fetchAllPlayers());
      setShowFrom(!setShowFrom);
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
              Add Player
              <hr />
            </h3>
          </div>
          <form onSubmit={handleSubmitData} className={styles.fromSection}>
            <div className={styles.nameInputMain}>
              <label htmlFor="name" className={styles.lable}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="enter player full name"
                name="name"
                onChange={handleInputChange}
                className={styles.input}
                required
                ref={nameRef}
              />
            </div>

            <div className={styles.winningsInputMain}>
              <label htmlFor="winningsInputMain" className={styles.lable}>
                Winning Amount
              </label>
              <input
                type="text"
                placeholder="enter amount"
                name="winnings"
                onChange={handleInputChange}
                className={styles.input}
                required
                ref={winningsRef}
              />
            </div>

            <div className={styles.countryInputMain}>
              <label htmlFor="country" className={styles.lable}>
                Select Country
              </label>
              <select
                className={styles.select}
                value={countryCode}
                onChange={handleSelect}
                name="country"
                required
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
                <button className={styles.button} type="submit">
                  Add
                </button>
                <button
                  className={styles.button}
                  onClick={() => setShowFrom(!setShowFrom)}
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

export default AddPlayerForm;
