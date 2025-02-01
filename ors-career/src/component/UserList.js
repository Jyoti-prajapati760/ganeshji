import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class UserList extends Component {
  constructor() {
    super()
    this.state = {
      data :[]
    }
  }

  listData() {
    fetch('https://manraj-ors-1.onrender.com/user')
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        this.setState({ data: json })
      });
  }

  componentDidMount() {
    this.listData();
  }

  deleteHandel(id) {
    console.log("Delet data", id)
    fetch('https://manraj-ors-1.onrender.com/user/' + id, { method: "DELETE" })
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
        <h1>UserList</h1>
        <div className={'list'}>
        <table border={1}>
            <thead>
              <tr className={'header'}>
                <th>FirstName</th>
                <th>LastName</th>
                <th>EmailId</th>
                <th>Roll Id</th>
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
                      <td>{item.loginId}</td>
                      {/* <td>{item.password}</td> */}
                      <td>{item.roleId}</td>
                     <td>
                       <Link to={`/AddUser/${item._id}`}>Edit</Link>
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
