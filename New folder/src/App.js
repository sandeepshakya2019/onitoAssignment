import { useEffect, useMemo, useState } from "react";
import PersonalDetailsForm from "./PersonalDetailsForm";
import AddressDetailsForm from "./AddressDetailsForm.js";
import ReactDataTables from "./ReactDataTables.js";

const columns = [
  { data: "id", title: "Id" },
  { data: "name", title: "Name" },
  { data: "age", title: "Age" },
  { data: "sex", title: "Sex" },
  { data: "mobile", title: "Mobile" },
  { data: "idtype", title: "Govt Issued ID Type" },
  // { data: "address", title: "Address" },
  // { data: "state", title: "State" },
  // { data: "city", title: "City" },
  // { data: "country", title: "Country" },
  // { data: "pincode", title: "Pincode" },
];

function App() {
  const [personalDetails, setPersonalDetails] = useState({});

  return (
    <div>
      <PersonalDetailsForm
        setPersonalDetails={setPersonalDetails}
        personalDetails={personalDetails}
      />
      <ReactDataTables data={personalDetails} columns={columns} />
    </div>
  );
}

export default App;
