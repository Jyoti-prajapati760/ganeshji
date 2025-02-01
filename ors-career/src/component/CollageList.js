import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class CollageList extends Component {
  constructor() {
    super()
    this.state = {
      data :[]
    }
  }

  listData() {
    fetch('https://manraj-ors-1.onrender.com/college')
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
    fetch('https://manraj-ors-1.onrender.com/college/' + id, { method: "DELETE" })
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
        <h1>Collage List</h1>
        <div className={'list'}>
        <table border={1}>
            <thead>
              <tr className={'header'}>
                <th>collageName</th>
                <th>address</th>
                <th>city</th>
                <th>mobileNo</th>
                <th>opreation</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map((item) => {
                  return (
                    <tr className={'list'} key={item._id}>
                      <td>{item.collegeName}</td>
                      <td>{item.address}</td>
                      <td>{item.city}</td>
                      <td>{item.mobileNo}</td>
                      <td>
                       <Link to={`/AddCollage/${item._id}`}>Edit</Link>
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

