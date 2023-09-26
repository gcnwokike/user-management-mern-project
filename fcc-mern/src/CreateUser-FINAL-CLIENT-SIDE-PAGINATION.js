import React, { useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";

export default function CreateUser() {
  //const [onEd, setEd] = React.useState(true);

  const [state, setState] = React.useState({
    columns: [
      { title: "First Name", field: "fname" },
      { title: "Last Name", field: "lname" },
      { title: "Email", field: "email" },
      {
        title: "[HIDDEN] PASSWORD INPUT ONLY",
        field: "password",
        emptyValue: "**PASSWORD HIDDEN**",
        render: typin => {
          return <Typography>**PASSWORD HIDDEN**</Typography>;
        }

        //onEd
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
      // ,{ title: "Role", field: "role", type: "object" }
    ],
    data: []
  });

  //const { columns, data } = state;

  useEffect(() => {
    const tfunc = async () => {
      const res = await axios.get("http://localhost:5000/api/users");
      const wst = await res.data;
      //console.log(res);
      setState(s => ({ ...s, data: wst }));
      //console.log(wst);

      return wst;
    };
    tfunc();

    return;
  }, []);

  return (
    <MaterialTable
      title="Editable Example"
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
                  "http://localhost:5000/api/users",
                  newData
                );
                setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });

                console.log(user);
              };
              addUser();
              return <Redirect to="/" />;
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const updateUser = async () => {
                console.log(oldData._id);
                const user = axios.post(
                  `http://localhost:5000/api/users/update/${oldData._id}`,
                  newData
                );
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                  console.log(state.data[0]);
                }

                console.log(user);
              };

              updateUser();

              return <Redirect to="/" />;
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const deleteUser = async () => {
                console.log(oldData._id);
                const user = await axios.delete(
                  `http://localhost:5000/api/users/${oldData._id}`
                );
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
                console.log(user);
              };
              deleteUser();
            }, 600);
          })
      }}
    />
  );
}
