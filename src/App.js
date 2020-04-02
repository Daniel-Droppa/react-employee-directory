import React from 'react';
import API from "./utils/API";
import Wrapper from "./wrapper";
import EmployeeTable from "./employeetable/employeeTable"
// import './App.css';

class App extends React.Component {
  state = {
    employees: [],
    term: "",
    masterList: [],
    direction:"des",
    hasBeenSorted: false
  };

  componentDidMount() {
    API.getMany(100)
      .then(res => this.setState({ employees: res.data.results, masterList: res.data.results }))
      .catch(err => console.log(err));
  };
  handleSearch = event => {
    event.preventDefault();
    console.log(event.target.value);
    this.setState({term: event.target.value})
    const { value } = event.target;
    const searched = this.state.masterList.filter(employee =>
      employee.name.first.toLowerCase().includes(value.toLowerCase())
    );
    //searched.map(employee => console.log(employee));
    this.setState({ employees: searched });
  };
  handleSort =()=>{
    const sortedList = this.state.masterList.sort((a, b)=> {
      const x = a.name.first
      const z = b.name.first
      if(this.state.direction !=="asc"){
        if (x > z) {
          return 1;
        }
        if (x < z) {
          return -1;
        }
        return 0;

      }else{
        if (x < z) {
          return 1;
        }
        if (x > z) {
          return -1;
        }
        return 0;

      }
    });
    const newDirection = this.state.direction === "asc"? "des": "asc"
    this.setState({employees: sortedList, direction: newDirection})
    if(!this.state.hasBeenSorted) this.setState({hasBeenSorted: true})
  }
  displayDirection(){
    if(this.state.hasBeenSorted) return this.state.direction === "asc"? "⮟":"⮝"
  }
  render() {
    // const filtered = this.state.employees.filter(...);

    // then map over ^ to find the employees

    return (
      <Wrapper>
        <div className="search-bar">
          <input onChange={this.handleSearch} value={this.state.term} placeholder="search"></input>
        </div>
        <table className="table">
          <thead>
            <tbody>
              <tr>
                <th>Image</th>
                <th style={{cursor: "pointer"}} onClick={this.handleSort}>Name {this.displayDirection()}</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Location</th>
              </tr>
              {this.state.employees.map(employee => (
                <EmployeeTable

                  key={employee.login.uuid}
                  name={`${employee.name.first} ${employee.name.last}`}
                  image={employee.picture.large}
                  location={`${employee.location.city} ${employee.location.state}`}
                  email={employee.email}
                  number={employee.phone}
                />
              ))}
            </tbody>
          </thead>
        </table>
      </Wrapper>
    );
  }
}

export default App;

