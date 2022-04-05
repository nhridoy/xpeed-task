import React from "react";

const useList = () => {
  const [columns, setColumns] = React.useState([]);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    let column = [];

    fetch(" http://localhost/api/list.php")
      .then((response) => response.json())
      .then((json) => {
        let colObj = json.data.headers[0];
        console.log(colObj);
        for (let key in colObj) {
          if (!colObj[key].hidden) {
            let obj = {
              Header: colObj[key].title,
              accessor: key,
            };
            //   console.log(obj);
            column.push(obj);
          }
        }

        setColumns(column);
        setData(json.data.rows);
      });
  }, []);
  return { columns, data };
};
export default useList;
