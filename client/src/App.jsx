import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import Table from "./components/Table";

import axios from "axios";

function App() {
  const [customerName, setCustomerName] = useState("");
  const [customerSurname, setCustomerSurname] = useState("");
  const [customerAge, setCustomerAge] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState(0);

  const [customerList, setCustomerList] = useState([]);

  //! Add Customer
  const addCustomer = () => {
    axios
      .post("http://localhost:3001/create", {
        customerName: customerName,
        customerSurname: customerSurname,
        customerAge: customerAge,
        customerEmail: customerEmail,
        customerPhoneNumber: customerPhoneNumber,
      })
      .then(() => {
        setCustomerList([
          ...customerList,
          {
            customerName: customerName,
            customerSurname: customerSurname,
            customerAge: customerAge,
            customerEmail: customerEmail,
            customerPhoneNumber: customerPhoneNumber,
          },
        ]);
      });
  };

  //! Get Customers
  const getCustomers = () => {
    axios.get("http://localhost:3001/customers").then((res) => {
      setCustomerList(res.data);
    });
  };


  return (
    <div className="flex">
      <div className="left bg-[#000000] h-[100vh] flex-[1] p-10 ">
        <div className="inputs flex flex-col items-center justify-center gap-y-10">
          <Input
            size="lg"
            label="Customer Name"
            className="text-white"
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <Input
            size="lg"
            label="Customer Surname"
            className="text-white"
            onChange={(e) => setCustomerSurname(e.target.value)}
          />
          <Input
            size="lg"
            label="Customer Age"
            className="text-white"
            onChange={(e) => setCustomerAge(e.target.value)}
          />
          <Input
            size="lg"
            label="Customer Email"
            className="text-white"
            type="email"
            onChange={(e) => setCustomerEmail(e.target.value)}
          />
          <Input
            size="lg"
            label="Customer Phone Number"
            className="text-white"
            type="number"
            onChange={(e) => setCustomerPhoneNumber(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center mt-10">
          <Button className="bg-green-500" onClick={addCustomer}>
            Add
          </Button>
        </div>
        <div className="flex items-center justify-center mt-10">
          <Button onClick={getCustomers}>Show Customers</Button>
        </div>
      </div>
      <div className="right bg-[#f2f2f2] flex-[4] ">
        <Table customerList={customerList} setCustomerList={setCustomerList} />
      </div>
    </div>
  );
}

export default App;
