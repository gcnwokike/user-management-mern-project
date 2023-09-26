import React, { Fragment, useEffect } from "react";
import "./icon.css";

import MaterialTable from "material-table";
import axios from "axios";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";

export default function CreateUser() {
  const [state, setState] = React.useState({
    columns: [
      { title: "First Name*", field: "fname" },
      { title: "Last Name*", field: "lname" },
      { title: "Email*", field: "email" },
      {
        title: "[HIDDEN] PASSWORD INPUT ONLY*",
        field: "password",
        emptyValue: "**PASSWORD HIDDEN**",
        render: () => {
          return <Typography>**PASSWORD HIDDEN**</Typography>;
        }
      },
      {
        title: "Created",
        field: "createdAt",
        readOnly: true,
        editable: "never"
      },
      {
        title: "Last Edited",
        field: "updatedAt",
        readOnly: true,
        editable: "never"
      }
    ],

    data: [],
    alert: ""
  });

  const removeAlert = () => {
    setTimeout(() => {
      setState(s => ({ ...s, alert: "" }));
    }, 5000);
  };

  useEffect(() => {
    const tfunc = async () => {
      const res = await axios.get("http://localhost:5000/api/auth");
      const wst = await res.data;
      setState(s => ({ ...s, data: wst }));
    };

    tfunc();
  }, []);

  return (
    <Fragment>
      <Box
        align="center"
        style={{
          //backgroundColor: "red",
          //color: "#F8F8F8",
          color: "red",
          margin: "1rem 0",
          padding: "2px 2px 2px 2px",
          fontWeight: "bold"
        }}
      >
        {state.alert}
      </Box>
      <MaterialTable
        title="Editable User Table"
        columns={state.columns}
        data={state.data}
        localization={{
          body: {
            editRow: {
              saveTooltip: "Save",
              cancelTooltip: "Cancel",
              deleteText: "Are you sure you want to delete this User?"
            }
          }
        }}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();

                const addUser = async () => {
                  const user = await axios.post(
                    "http://localhost:5000/api/auth/create",
                    newData
                  );

                  const res = await axios.get("http://localhost:5000/api/auth");
                  const wst = await res.data;
                  setState(s => ({ ...s, data: wst }));
                  setState(s => ({ ...s, alert: user.data }));
                  removeAlert();

                  console.log(user.data);
                };
                try {
                  addUser().catch(
                    err =>
                      setState(s => ({
                        ...s,
                        alert: `${err.message} Api Server Not Responding Check Your Internet Connection and Try Again`
                      })),

                    removeAlert()
                  );
                } catch (err) {
                  console.log(err.message);
                }
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const updateUser = async () => {
                  axios.post(
                    `http://localhost:5000/api/auth/update/${oldData._id}`,
                    newData
                  );
                  if (oldData) {
                    const res = await axios.get(
                      "http://localhost:5000/api/auth"
                    );
                    const wst = await res.data;
                    setState(s => ({ ...s, data: wst }));
                  }
                };

                updateUser();
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const deleteUser = async () => {
                  await axios.delete(
                    `http://localhost:5000/api/auth/delete/${oldData._id}`
                  );

                  const res = await axios.get("http://localhost:5000/api/auth");
                  const wst = await res.data;
                  setState(s => ({ ...s, data: wst }));
                };
                deleteUser();
              }, 600);
            })
        }}
        options={{
          exportButton: true
        }}
      />
    </Fragment>
  );
}
