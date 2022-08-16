import React from "react";
import { ListGroup } from "react-bootstrap";
import useServices from "../../hooks/useServices";

const ManageServices = () => {
  const [services, setServices] = useServices();
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you want to delete this service?");
    if (proceed) {
        const url = `http://localhost:5000/service/${id}`
      fetch(url, {
        method:'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        const remaining = services.filter(service => service._id !== id);
        setServices(remaining)
      })
    } else {
    }
  };
  return (
    <div>
      <h1>This is your manage services</h1>
      {services.map((service) => (
        <ListGroup style={{width:"50%", margin:"10px"}}>
          <ListGroup.Item>{service.name}</ListGroup.Item>
          <button onClick={()=>handleDelete(service._id)}>X</button>
        </ListGroup>
      ))}
    </div>
  );
};

export default ManageServices;
