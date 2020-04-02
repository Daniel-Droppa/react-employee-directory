import React from "react";
import "./employeeTable.css";

function EmployeeTable(props) {

  return (
     <tr>
       <td>
         <img src={props.image} alt={props.name}/>
       </td>
       <td>
         <p>{props.name}</p>
       </td>
       <td>
         <p>{props.number}</p>
       </td>
       <td>
         <p>{props.email}</p>
       </td>
       <td>
         <p>{props.location}</p>
       </td>
     </tr>
  );
}

export default EmployeeTable;