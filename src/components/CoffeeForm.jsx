import { useState } from "react";
import { coffeeOptions } from "../utils";

export default function CoffeeForm() {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 5, 10, 15, 30, 45];
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
  const [coffeeCost, setCoffeeCost] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  function handleSubmitForm() {
    console.log(selectedCoffee, coffeeCost, hour, minute);
  }

  return (
    <>
      <div className="section-header">
        <i class="fa-solid fa-pencil"></i>
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
