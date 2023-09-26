import React from "react";
import MaterialTable from "material-table";
import axios from "axios";

export default function CreateUser() {
  return (
    <MaterialTable
      title="Remote Data Preview"
      columns={[
        { title: "Nos", field: "tableData.id" },
        { title: "Id", field: "_id" },
        { title: "First Name", field: "fname" },
        { title: "Last Name", field: "lname" }
      ]}
      data={query =>
        axios
          .get(
            `http://localhost:5000/api/users?per_page=${
              query.pageSize
            }&page=${query.page + 1}`
          )
          .then(response => {
            console.log(response);
            return response;
          })
          .then(result => {
            console.log(result.data);
            console.log(result.data.page);
            return {
              data: result.data.message,
              page: result.data.page - 1,
              totalCount: result.data.total
            };
          })
      }
    />
  );
}
