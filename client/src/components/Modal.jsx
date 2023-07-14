import React, { useState } from "react";
import axios from 'axios';

import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

const Modal = ({ customerList, setCustomerList }) => {
  const [open, setOpen] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerSurname, setCustomerSurname] = useState("");
  const [customerAge, setCustomerAge] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState(0);


  //! Update Customer
  const updateCustomer = (updatedCustomer) => {
    axios.put(`http://localhost:3001/update/${updatedCustomer.id}`, updatedCustomer).then(res => {
      const updatedList = customerList.map(customer => {
        if(customer.id === updatedCustomer.id){
          return updatedCustomer;
        }
        return customer;  
      });
      setCustomerList(updatedList)
    })

    setOpen(false);
  };

  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Button onClick={handleOpen}>Edit</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Edit Customer
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              name="customerName"
              label="Customer Name"
              size="lg"
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <Input
              label="Customer Surname"
              size="lg"
              name="customerSurname"
              onChange={(e) => setCustomerSurname(e.target.value)}
            />
            <Input
              label="Customer Age"
              size="lg"
              name="customerAge"
              onChange={(e) => setCustomerAge(e.target.value)}
            />
            <Input
              label="Customer Email"
              type="email"
              size="lg"
              name="customerEmail"
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
            <Input
              label="Customer Phone Number"
              type="number"
              size="lg"
              name="customerPhoneNumber"
              onChange={(e) => setCustomerPhoneNumber(e.target.value)}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button className="bg-green-500" onClick={updateCustomer} fullWidth>
              Update
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default Modal;
