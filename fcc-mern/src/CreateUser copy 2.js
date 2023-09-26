import React, { useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";

export default function CreateUser() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Id", field: "_id" },
      { title: "First Name", field: "fname" },
      { title: "Last Name", field: "lname" },
      { title: "Email", field: "email" },
      { tile: "Role", field: "role" }
      // ,{ title: "Role", field: "role", type: "object" }
    ],
    data: []
  });

  //const { columns, data } = state;

  useEffect(() => {
    const tfunc = async () => {
      const res = await axios.get("http://localhost:5000/api/users");
      const wst = await res.data;

      setState(s => ({ ...s, data: wst }));
      console.log(wst);

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
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
    />
  );
}
