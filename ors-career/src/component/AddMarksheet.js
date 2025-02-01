import React, { Component } from 'react'
import { matchRoutes } from 'react-router-dom'

export default class AddMarksheet extends Component {
  constructor() {
    super()
    this.state = {
      "name": "",
      "studentId": "",
      "rollNo": "",
      "physics": "",
      "chemistry": "",
      "maths": "",
      "msg":''
    }
    this.pid = window.location.pathname.split("/")[2]
    // console.log("Pid :",this.pid)
    if (this.pid) {
      this.getOne(this.pid)
    }
  }
  getOne(id) {
    console.log("id in get method ", id)
    fetch("https://manraj-ors-1.onrender.com/marksheet/" + id).then((res) => res.json()).then((result) => {
      console.log("Get a user data : ", result);
      // this.setState(result)
      this.setState({
        "name": result.name,
        "studentId": result.studentId,
        "rollNo": result.rollNo,
        "physics": result.physics,
        "chemistry": result.chemistry,
        "maths": result.maths,
      })

    })
  }
  

  handleSubmit() {
    // console.log("This is sbmit function", this.state);
    if (this.pid) {
      console.log("PUT")
      fetch('https://manraj-ors-1.onrender.com/marksheet/' + this.pid, {
        method: 'PUT',
        body: JSON.stringify(
          {
            name:this.state.name,
            studentId:this.state.studentId,
            rollNo:this.state.rollNo,
            physics:this.state.physics,
            chemistry:this.state.chemistry,
            maths:this.state.maths
          }

        ),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((result) =>{
          console.log(result)
          if(result.acknowledged){
            this.setState({msg:"From submitted"})
            setTimeout(()=>{
              window.location.pathname="/MarksheetList"
            },2500)
          }        });
    } else {
      console.log("Post")

      fetch('https://manraj-ors-1.onrender.com/marksheet', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((result) => console.log(result));
    }
  }
  render() {
    return (
      <>
        <h1>Add Marksheet</h1> 
        <p>{this.state.msg}</p>
    <div className={'from'} >
        <label htmlFor='name'> Name :
        <input type="text" placeholder='' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
        </label><br /><br />

        <label htmlFor='studentId'>studentId:
        <input type="text" placeholder='' value={this.state.studentId} onChange={(e) => this.setState({ studentId: e.target.value })} />
        </label> <br /><br />

        <label htmlFor='rollNo'>Roll No:
        <input type="text" placeholder='' value={this.state.rollNo} onChange={(e) => this.setState({ rollNo: e.target.value })} />
        </label><br /><br />

        <label htmlFor='physics'>Physics :
        <input type="number" placeholder='' value={this.state.physics} onChange={(e) => this.setState({ physics: e.target.value })} />
        </label><br /><br />

        <label htmlFor='chemistry'> Chemistry :
        <input type="number" placeholder='' value={this.state.chemistry} onChange={(e) => this.setState({ chemistry: e.target.value })} />
        </label><br /><br />

        <label htmlFor='maths'> Maths :
        <input type="number" placeholder='' value={this.state.maths} onChange={(e) => this.setState({ maths: e.target.value })} />
        </label><br /><br />

        <button onClick={() => this.handleSubmit()}>Submit</button>
    </div>

      </>
    )
  }
}
