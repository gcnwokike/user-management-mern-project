import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";

function List() {
  const [items, setItems] = useState([]);

  //  const [] = items;

  useEffect(() => {
    const tfunc = async () => {
      const res = await axios.get("http://localhost:5000/api/users");
      const wst = await res.data;

      setItems(wst);
    };

    tfunc();
  }, []);

  // console.log(items);

  const columns = ["First Name", "Last Name", "Email", "Last Seen", "actions"];

  const data = items.map(item => {
    const data = [
      [item.fname],
      [item.lname],
      [item.email],
      [item.updatedAt],
      ["Hello"]
    ];

    return data;
  });

  //  console.log(data);
  return (
    <div>
      <MUIDataTable title={"Employee List"} data={data} columns={columns} />
    </div>
  );
}

export default List;
