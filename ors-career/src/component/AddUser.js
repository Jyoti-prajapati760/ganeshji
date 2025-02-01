import React, { Component } from 'react'

export default class AddUser extends Component {
  constructor() {
    super()
    this.state = {
      "firstName": "",
      "lastName": "",
      "loginId": "",
      "password": "",
      "roleId": "",
      "msg": '',
      "isTrue": false,
    }
    this.pid = window.location.pathname.split("/")[2]
    // console.log("Pid :",this.pid)
    if (this.pid) {
      this.getOne(this.pid)
    }
  }

  getOne(id) {
    console.log("id in get method ", id)
    fetch("https://manraj-ors-1.onrender.com/user/" + id).then((res) => res.json()).then((result) => {
      console.log("Get a user data : ", result);
      // this.setState(result)
      this.setState({
        "firstName": result.firstName,
        "lastName": result.lastName,
        "loginId": result.loginId,
        "password": result.password,
        "roleId": result.roleId,
      })

    })
  }

  handleSubmit() {
    // console.log("This is sbmit function", this.state);
    this.setState({ isTrue: true })
    if (this.pid) {
      console.log("PUT")

      fetch('https://manraj-ors-1.onrender.com/user/' + this.pid, {
        method: 'PUT',
        body: JSON.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          loginId: this.state.loginId,
          password: this.state.password,
          roleId: this.state.roleId
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          if (result.acknowledged) {
            this.setState({ msg: "From submitted" })
            setTimeout(() => {
              window.location.pathname = "/UserList"
            }, 2500)
          }
        });
    } else {
      console.log("Post")

      try {
        fetch('https://manraj-ors-1.onrender.com/user', {
          method: 'POST',
          body: JSON.stringify({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            loginId: this.state.loginId,
            password: this.state.password,
            roleId: this.state.roleId,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json()).then((result) => {
            console.log("result", result)
            if (result.loginId === this.state.loginId) {

              this.setState({ isTrue: true })
              setTimeout(() => {
                window.location.pathname = "/AddUser"
              }, 2000)
              // console.log("if run")
            }
            else {

              console.log("Add user Post :", result)
              this.setState({ msg: result.message })

            }
          })
      } catch (error) {
        console.log("Error catch :", error)
      }
    }
  }
  render() {
    return (
      <>
        <h1>Add User</h1>
        <p>{this.state.msg}</p>
        <div className={'from'}>
          {/* <from  > */}
          <label htmlFor='firstName'>First Name :
            <input type="text" placeholder='Enter Firstname' value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
            {this.state.isTrue && !this.state.firstName && <p>Must not be empty</p>}
          </label><br /><br />

          <label htmlFor='lastName'>Last Name :
            <input type="text" placeholder='Enter Lastname' value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
            {this.state.isTrue && !this.state.lastName && <p>Must not be empty</p>}
          </label> <br /><br />

          <label htmlFor='loginId'>Email Id :
            <input type="email" placeholder='Enter loginid' value={this.state.loginId} onChange={(e) => this.setState({ loginId: e.target.value })} />
            {this.state.isTrue && !this.state.loginId && <p>Must not be empty</p>}
          </label><br /><br />

          <label htmlFor='password'>Password :
            <input type="password" placeholder='Enter password' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
            {this.state.isTrue && !this.state.password && <p>Must not be empty</p>}
          </label><br /><br />

          <label> Roll Id :
            <input type="text" placeholder='Enter Roll Id' value={this.state.roleId} onChange={(e) => this.setState({ roleId: e.target.value })} />
            {this.state.isTrue && !this.state.roleId && <p>Must not be empty</p>}

          </label><br /><br />

          <button onClick={() => this.handleSubmit()}>Submit</button>

          <button> Reset </button>

          {/* </from> */}
        </div>

      </>
    )
  }
}
