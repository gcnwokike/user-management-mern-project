import React from "react";
import MaterialTable from "material-table";

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    this.tableRef = React.createRef();
  }

  render() {
    return (
      <MaterialTable
        title="Refresh Data Preview"
        tableRef={this.tableRef}
        columns={[
          { title: "Id", field: "_id" },
          { title: "First Name", field: "fname" },
          { title: "Last Name", field: "lname" }
        ]}
        data={query =>
          new Promise(async (resolve, reject) => {
            let url = await "http://localhost:5000/api/users?";
            url += "per_page=" + query.pageSize;
            url += "&page=" + (query.page + 1);
            fetch(url)
              .then(response => response.json())
              .then(result => {
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.total
                });
              });
          })
        }
        actions={[
          {
            icon: "refresh",
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: () =>
              this.tableRef.current && this.tableRef.current.onQueryChange()
          }
        ]}
      />
    );
  }
}
