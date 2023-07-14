import React from "react";
import { Button, Card, Typography } from "@material-tailwind/react";

import Modal from "./Modal";
import axios from "axios";

const TABLE_HEAD = [
  "Customer Name",
  "Customer Surname",
  "Customer Age",
  "Customer Email",
  "Customer Phone Number",
  "Edit",
  "Delete",
];

const Table = ({ customerList, setCustomerList, updateCustomer }) => {
  //! Delete Customer
  const deleteCustomer = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((res) => {
      setCustomerList(
        customerList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div>
      <Card className="overflow-scroll h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customerList && customerList.length > 0 ? (
              customerList.map((customer, key) => (
                <tr key={key} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {customer.customerName}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {customer.customerSurname}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {customer.customerAge}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {customer.customerEmail}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {customer.customerPhoneNumber}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Modal
                      customer={customer}
                      updateCustomer={updateCustomer}
                    />
                  </td>
                  <td className="p-4">
                    <Button
                      onClick={() => deleteCustomer(customer.id)}
                      className="bg-red-500"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <h1 className="text-center text-4xl p-5">No Customers</h1>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Table;
