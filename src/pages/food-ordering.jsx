import React, { useState } from "react";
import styles from "./styles/food-ordering.module.css";

const FoodOrdering = () => {
  const [itemCounts, setItemCounts] = useState({}); 
  const [totalPrice, setTotalPrice] = useState({});

  // list of munu item
  const menuItem = [
    { id: 1, category: "kadhai paneer", price: 120 },
    { id: 2, category: "dal tadka", price: 100 },
    { id: 3, category: "naan", price: 20 },
    { id: 4, category: "roti", price: 10 },
  ];

  const incrementItem = (itemId, price) => {
    console.log("itemId", itemId);
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: (prevCounts[itemId] || 0) + 1,
    }));

    setTotalPrice((prevPriceCount) => ({
      ...prevPriceCount,
      [price]: (prevPriceCount[price] || 0) + 1 * price,
    }));
  };

  const decrementItem = (itemId, price) => {
    setItemCounts((prevCounts) => {
      const currentCount = prevCounts[itemId] || 0;
      if (currentCount > 0) {
        return {
          ...prevCounts,
          [itemId]: currentCount - 1,
        };
      }
      return prevCounts;
    });

    setTotalPrice((prevPriceCount) => {
      const currentPriceCount = prevPriceCount[price] || 0;
      if (currentPriceCount > 0) {
        return {
          ...prevPriceCount,
          [price]: currentPriceCount - 1 * price,
        };
      }
      return prevPriceCount;
    });
  };

  // calculate total price of all item
  let total = Object.values(totalPrice).reduce((prev, curr) => {
    return prev + curr;
  }, 0);

  const displayMenuItem = () => {
    return (
      <>
        <div className={styles.foodcontainer}>
          <h1>Food Ordering</h1>
          <br />
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Category</th>
                <th>Price(&#x20B9;)</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {menuItem.map((item, index) => (
                <tr key={index}>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => decrementItem(index, item.price)}
                    >
                      -
                    </button>
                    <button> {itemCounts[index] || 0} </button>
                    <button
                      className={styles.button}
                      onClick={() => incrementItem(index, item.price)}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <button> {totalPrice[item.price] || 0} </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.totalPrice}>Total Price = &#x20B9; {total} </div>
        </div>
      </>
    );
  };

  return (
    <>
      {displayMenuItem()}
    </>
  )
};

export default FoodOrdering;
