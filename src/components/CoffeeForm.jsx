import { useState } from "react";
import { coffeeOptions } from "../utils";
import Modal from "./Modal";
import Authentication from "./Authentication";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function CoffeeForm(props) {
  const { isAuthenticated } = props;
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 5, 10, 15, 30, 45];

  const [showModal, setShowModal] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
  const [coffeeCost, setCoffeeCost] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const { globalUser, globalData, setGlobalData } = useAuth();

  async function handleSubmitForm() {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }
    if (!selectedCoffee) {
      return;
    }

    try {
      const newGlobalData = {
        ...(globalData || {}),
      };

      const nowTime = Date.now();
      const timeToSubtract = hour * 60 * 60 * 1000 + minute * 60 * 100;
      const timestamp = nowTime - timeToSubtract;
      const newData = {
        name: selectedCoffee,
        cost: coffeeCost,
      };
      newGlobalData[timestamp] = newData;

      setGlobalData(newGlobalData);
      console.log(timestamp, selectedCoffee, coffeeCost);

      const userRef = doc(db, "users", globalUser.uid);
      const res = await setDoc(
        userRef,
        { [timestamp]: newData },
        { merge: true }
      );

      clearForm();
    } catch (error) {
      console.log(error.message);
    }
  }

  function clearForm() {
    setSelectedCoffee(null);
    setShowCoffeeTypes(false)
    setCoffeeCost(0);
    setHour(0);
    setMinute(0);
  }

  function handleClosemodal() {
    setShowModal(false);
  }

  return (
    <>
      {showModal && (
        <Modal handleClosemodal={handleClosemodal}>
          <Authentication handleClosemodal={handleClosemodal} />
        </Modal>
      )}
      <div className="section-header">
        <i className="fa-solid fa-pencil" />
        <h2>Start Tracking Today</h2>
      </div>
      <h4>Select coffee type</h4>
      <div className="coffee-grid">
        {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
          return (
            <button
              key={optionIndex}
              className={
                "button-card " +
                (option.name === selectedCoffee ? "coffee-button-selected" : "")
              }
              onClick={() => {
                setSelectedCoffee(option.name);
                setShowCoffeeTypes(false);
              }}
            >
              <h4>{option.name}</h4>
              <p>{option.caffeine} mg</p>
            </button>
          );
        })}
        <button
          className={
            "button-card " + (showCoffeeTypes ? "coffee-button-selected" : "")
          }
          onClick={() => {
            setSelectedCoffee(null);
            setShowCoffeeTypes(true);
          }}
        >
          <h4>Other</h4>
          <p>n/a</p>
        </button>
      </div>
      {showCoffeeTypes && (
        <select
          name="coffee-list"
          id="coffee-list"
          onChange={(e) => {
            setSelectedCoffee(e.target.value);
          }}
        >
          <option value={null}>Select type</option>
          {coffeeOptions.slice(5).map((option, optionIndex) => {
            return (
              <option value={option.name} key={optionIndex}>
                {option.name} ({option.caffeine} mg)
              </option>
            );
          })}
        </select>
      )}
      <h4>Add the cost ($)</h4>
      <input
        className="w-full"
        type="number"
        placeholder="4.50"
        value={coffeeCost}
        onChange={(e) => {
          setCoffeeCost(e.target.value);
        }}
      />
      <h4>Time since consumption</h4>
      <div className="time-entry">
        <div>
          <h6>Hours</h6>
          <select
            id="hours-select"
            value={hour}
            onChange={(e) => {
              setHour(e.target.value);
            }}
          >
            {hours.map((hour, hourIndex) => {
              return (
                <option key={hourIndex} value={hour}>
                  {hour}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <h6>Mins</h6>
          <select
            id="mins-select"
            value={minute}
            onChange={(e) => {
              setMinute(e.target.value);
            }}
          >
            {minutes.map((minute, minuteIndex) => {
              return (
                <option key={minuteIndex} value={minute}>
                  {minute}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button onClick={handleSubmitForm}>Add Entry</button>
    </>
  );
}
