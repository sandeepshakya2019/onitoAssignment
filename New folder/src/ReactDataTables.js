import DataTables from "datatables.net-dt";
import { useEffect, useRef } from "react";
import "datatables.net-dt/css/jquery.dataTables.css";

let dt;

function ReactDataTables({ ...props }) {
  const tableRef = useRef(null);

  useEffect(() => {
    console.log("Initial render");
    // tableRef.current = null;
    dt = new DataTables(tableRef.current, {
      columns: props.columns,
    });
    return () => {
      console.log("clean");
      dt.destroy();
      tableRef.current.remove();
      tableRef.current = null;
      // tableRef.current.removeChild(tableRef.current.children[0]);
      console.log(tableRef);
      // tableRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (Object.keys(props.data).length === 0) {
      return;
    }
    dt.row.add(props.data);
    dt.draw();
  }, [props.data]);

  return <table ref={tableRef}></table>;
}

export default ReactDataTables;
