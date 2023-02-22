const EmployeeTable = ({employeeData}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
            </tr>
            </thead>
            <tbody>
            {employeeData.map((employee) => (
                <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};
export default EmployeeTable;