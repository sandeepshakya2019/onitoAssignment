import PersonalDetailsForm from "./Components/Forms/PersonalDetailsForm.js";
import AddressDetailsForm from "./Components/Forms/AddressDetailsForm.js.js";
import ReactDataTables from "./Components/Table/ReactDataTables.js";
import { columns } from "./Components/Table/constant.js";
import { useSelector } from "react-redux";

function App() {
  const { fromStep } = useSelector((state) => state.formDetails);

  return (
    <div>
      {fromStep === 0 && <PersonalDetailsForm />}
      {fromStep === 1 && <AddressDetailsForm />}
      <div>
        <ReactDataTables columns={columns} />
      </div>
    </div>
  );
}

export default App;
