import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class StudentList extends Component {
  constructor() {
    super()
    this.state = {
      data :[]
    }
  }

  listData() {
    fetch('https://manraj-ors-1.onrender.com/student')
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        this.setState({ data: json })
      });
  }
  componentDidMount() {
    this.listData();
  }

  deleteHandel(id){
    console.log("Delet data", id)
    fetch('https://manraj-ors-1.onrender.com/student/' + id, { method: "DELETE" })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.listData();
      });
  }

  render() {
    // console.log(this.state.data)
    return (
      <>
        <h1>Student List</h1>
       <div className={'list'}>
       <table border={1}>
            <thead>
              <tr className={'header'}>
                <th>FirstName</th>
                <th>LastName</th>
                <th>EmailId</th>
                <th>CollegeId</th>
                <th>mobileNo</th>
                <th>Opreation</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map((item) => {
                  return (
                    <tr className={'list'} key={item._id}>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.emailId}</td>
                      <td>{item.collegeId}</td>
                      <td>{item.mobileNo}</td>
                      <td>
                      <Link to={`/AddStudent/${item._id}`}>Edit</Link>
                      <button onClick={() => this.deleteHandel(item._id)}>Del</button> 
                        </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

       </div>
      </>
    )
  }
}
