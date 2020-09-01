import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItem } from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";

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
  }, [props.user.userData]);

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>

      <div>
        <UserCardBlock products={props.user.cartDetail} />
      </div>
    </div>
  );
}

export default CartPage;
