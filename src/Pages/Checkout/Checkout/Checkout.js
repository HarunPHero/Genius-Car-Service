import "../../../App.css"
import React from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import {useAuthState} from 'react-firebase-hooks/auth'
import auth from "../../../firebase.init";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
    const {serviceId} = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth) 
    if(user){
        console.log(user)
    }
    const handlePlaceOrder = e => {
        e.preventDefault()
        const order = {
            name: user.displayName,
            email: user.email,
            address: e.target.address.value,
            phone: e.target.phone.value,
            serviceId: serviceId,
            serviceName: service.name
        }
        axios.post('http://localhost:5000/order', order)
        .then(response=> {
            const {data} = response;
            if(data.insertedId){
                toast("Your order has booked!!!")
                e.target.reset()
            }
        })
        
    }
    return (
        <div className="App">
            <h2>Proceed to checkout</h2>
            <form onSubmit={handlePlaceOrder}>
                Name: <input className="mb-2 w-50 " type="text" value={user?.displayName} name="name" placeholder='Enter your name 'required readOnly/>
                <br />
                Email: <input className="mb-2 w-50" type="text" value={user?.email} name="email" placeholder='Enter your email 'required readOnly/>
                <br />
                Address: <input className="mb-2 w-50" type="text" name="address" placeholder='Enter your address 'required autoComplete="off"/>
                <br />
                Phone Number: <input className="mb-2 w-50" type="text" name="phone" placeholder='Enter your phone number 'required />
                <br />
                Your service: <input className="mb-2 w-50" type="text" name="service" placeholder={service.name} disabled />
                <br />
                {/* <input type="submit" value="submit" /> */}
                <button className="btn btn-warning">Submit</button>
            </form>
        </div>
    );
};

export default Checkout;