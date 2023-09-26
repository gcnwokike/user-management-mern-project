import React, { useEffect } from "react";
import "./icon.css";

import MaterialTable from "material-table";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";

export default function ViewUser() {
  //const [onEd, setEd] = React.useState(true);

  const [state, setState] = React.useState({
    columns: [
      { title: "First Name", field: "fname" },
      { title: "Last Name", field: "lname" },
      { title: "Email", field: "email" },
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
      const res = await axios.get("http://localhost:5000/api/auth");
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
      title="Chatfeedback App Users"
      columns={state.columns}
      data={state.data}
      options={{ exportButton: true }}
    />
  );
}
