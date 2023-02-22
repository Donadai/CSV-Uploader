import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeUploadForm from "./components/EmployeeUploadForm";
import EmployeeTable from "./components/EmployeeTable";
import {useEffect, useState} from "react";

function App() {
    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        fetch('/api/employees')
            .then((response) => response.json())
            .then((data) => setEmployeeData(data))
            .catch((error) => console.log(error));
    }, []);

    const updateEmployeeData = (newData) => {
        setEmployeeData(newData);
    };

  return (
    <div className="App">
      <EmployeeUploadForm onUploadSuccess={updateEmployeeData}/>
      <EmployeeTable employeeData={employeeData}/>
    </div>
  );
}

export default App;
