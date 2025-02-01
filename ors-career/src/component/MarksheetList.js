import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class MarksheetList extends Component {
  constructor() {
    super()
    this.state = {
      data :[]
    }
  }
  listData() {
    fetch('https://manraj-ors-1.onrender.com/marksheet')
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
    fetch('https://manraj-ors-1.onrender.com/marksheet/' + id, { method: "DELETE" })
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
        <h1>Marksheet List</h1>
        <div className={'list'}>
        <table border={1}>
            <thead>
              <tr className={'header'}>
                <th>Name</th>
                <th>Student Id</th>
                <th>roll no</th>
                <th>physics</th>
                <th>chemistry</th>
                <th>Maths</th>
                <th>opreation</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map((item) => {
                  return (
                    <tr className={'list'} key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.studentId}</td>
                      <td>{item.rollNo}</td>
                      <td>{item.physics}</td>
                      <td>{item.chemistry}</td>
                      <td>{item.maths}</td>
                        <td>
                          <Link to={`/AddMarksheet/${item._id}`}>Edit</Link>
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