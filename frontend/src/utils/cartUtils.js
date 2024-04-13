export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // izracun cijene (zbroj svih cijena)
  const itemsPrice = state.cartItems.reduce((acc, item) => acc + (item.price * 100 * 1) / 100, 0);
  state.itemsPrice = addDecimals(itemsPrice);

    //cijena isporuke --> ako je narudžba skuplja od 50k nema, inace 1k
    state.shippingPrice = addDecimals(state.itemsPrice > 50000 ? 0 : 1000);

    state.totalPrice = (
      Number(state.itemsPrice) +
      Number(state.shippingPrice)).toFixed(2);

    // Save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}