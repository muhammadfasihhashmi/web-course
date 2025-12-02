import { useState } from "react";

function Form({ setRecords }) {
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState("");

  function handleQuantity(event) {
    setQuantity(event.target.value);
  }
  function handleItem(event) {
    setItem(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const itemList = {
      id: Date.now(),
      quantity,
      item,
    };
    setRecords((record) => [...record, itemList]);
    setQuantity(1);
    setItem("");
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="form-title ">What do you need for your 😍 trip?</h1>
      <select className="select" value={quantity} onChange={handleQuantity}>
        {Array.from({ length: 20 }, (_, index) => index + 1).map(
          (item, index) => (
            <option key={index}>{item}</option>
          )
        )}
      </select>
      <input type="text" className="input" value={item} onChange={handleItem} />
      <button type="submit" className="btn">
        Add
      </button>
    </form>
  );
}

export default Form;
