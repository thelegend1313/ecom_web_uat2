import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../card/CheckoutForm';
import { payment } from "../../api/stripe";
import useEcomStore from "../../store/ecom-store";

const stripePromise = loadStripe("pk_test_51RmbDUPDC7tuqqBCeFISdurGHzW25VZgMbiMXELraIIRydOmYnHPft3IkjEa9fdu7rSYp7PaqK6ZkWlntR0buiMZ001ThU52wh");


const Payment = () => {
  const token = useEcomStore((state) => state.token);
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    payment(token)
      .then((res) => {
        console.log(res)
        setClientSecret(res.data.clientSecret)
      })
      .catch((err) =>
        console.log(err)
      )
  }, [])
  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    <div>
      Payment1
      {clientSecret && (
        <Elements options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}

    </div>
  )
}

export default Payment