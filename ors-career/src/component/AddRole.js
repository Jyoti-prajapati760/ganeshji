import React, { Component } from 'react'

export default class AddRole extends Component {
  constructor() {
    super()
    this.state = {
      "name": "",
      "discription": "",
      "msg":'',
    }
    this.pid = window.location.pathname.split("/")[2]
    // console.log("Pid :",this.pid)
    if (this.pid) {
      this.getOne(this.pid)
    }
  }
  getOne(id) {
    console.log("id in get method ", id)
    fetch("https://manraj-ors-1.onrender.com/role/" + id).then((res) => res.json()).then((result) => {
      console.log("Get a user data : ", result);
      // this.setState(result)
      this.setState({
        "name": result.name,
        "discription": result.discription,
      })

    })
  }

  handleSubmit() {
    // console.log("This is sbmit function", this.state);
    if (this.pid) {
      console.log("PUT")
      fetch('https://manraj-ors-1.onrender.com/role/' + this.pid, {
        method: 'PUT',
        body: JSON.stringify({
          name:this.state.name,
          discription:this.state.discription
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((result) =>  {
          console.log(result)
          if(result.acknowledged){
            this.setState({msg:"From submitted"})
            setTimeout(()=>{
              window.location.pathname="/RoleList"
            },2500)
          }});
    } else {
      console.log("Post")

      fetch('https://manraj-ors-1.onrender.com/role', {
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
        <h1>Add role</h1> 
        <p>{this.state.msg}</p>
        <div className={'from'}>
        <from >
        <label htmlFor='name'> Name :
        <input type="text" placeholder='' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
        </label><br /><br />

        <label htmlFor='discription'>Discription :
        <input type="text" placeholder='' value={this.state.discription} onChange={(e) => this.setState({ discription: e.target.value })} />
        </label> <br /><br />

        
        <button onClick={() => this.handleSubmit()}>Submit</button>

        </from>
        </div>
     

      </>
    )
  }
}
