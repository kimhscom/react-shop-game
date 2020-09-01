import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItem } from "../../../_actions/user_actions";

function CartPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    let cartItem = [];

    // Check if the product is in the cart in the Redux User state
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItem.push(item.id);
        });
        dispatch(getCartItem(cartItem, props.user.userData.cart));
      }
    }
  }, []);

  return <div>CartPage</div>;
}

export default CartPage;
