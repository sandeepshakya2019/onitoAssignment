import DataTables from "datatables.net-dt";
import { useEffect, useRef } from "react";
import "datatables.net-dt/css/jquery.dataTables.css";
import { columns } from "./constant";
import { useSelector } from "react-redux";

let dt;

function ReactDataTables() {
  const { finalDetails } = useSelector((state) => state.formDetails);
  const tableRef = useRef(null);

  useEffect(() => {
    dt = new DataTables(tableRef.current, {
      columns: columns,
    });
    return () => {
      dt.destroy();
    };
  }, []);

  useEffect(() => {
    if (Object.keys(finalDetails).length === 0) {
      return;
    }
    dt.row.add(finalDetails);
    dt.draw();
  }, [finalDetails]);

  return <table ref={tableRef}></table>;
}

export default ReactDataTables;
