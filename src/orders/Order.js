import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosPrivate from "../api/axiosPrivate";
import auth from "../firebase.init";

const Order = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getOrders = async () => {
      const email = user.email;
      const url = `http://localhost:5000/orders?email=${email}`;
      try {
        const { data } = await axiosPrivate?.get(url);
        setOrders(data);
      } catch (error) {
        console.log(error.message);
        if (error?.response.status === 401 || error?.response.status === 403) {
          signOut(auth);
          toast("Something went wrong!!. Please login again")
          navigate("/login");
        }
      }
    };
    getOrders();
  }, [user]);

  return (
    <div>
      <h1>This is your order:{orders?.length}</h1>
    </div>
  );
};

export default Order;
