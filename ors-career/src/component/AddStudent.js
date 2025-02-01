import React, { Component } from 'react'

export default class AddStudent extends Component {
  constructor() {
    super()
    this.state = {
      "firstName": "",
      "lastName": "",
      "emailId": "",
      "collegeId": "",
      "mobileNo":"",
      "msg":'',
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
    fetch("https://manraj-ors-1.onrender.com/student/" + id).then((res) => res.json()).then((result) => {
      console.log("Get a user data : ", result);
      // this.setState(result)
      this.setState({
        "firstName": result.firstName,
        "lastName": result.lastName,
        "emailId": result.emailId,
        "collegeId": result.collegeId,
        "mobileNo": result.mobileNo
      })

    })
  }


  handleSubmit() {
    // console.log("This is sbmit function", this.state);
    if (this.pid) {
      console.log("PUT")
      fetch('https://manraj-ors-1.onrender.com/student/' + this.pid, {
        method: 'PUT',
        body: JSON.stringify({
          firstName:this.state.firstName,
          lastName:this.state.lastName,
          emailId:this.state.emailId,
          collegeId:this.state.collegeId,
          mobileNo:this.state.mobileNo,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          if(result.acknowledged){
            this.setState({msg:"From submitted"})
            setTimeout(()=>{
              window.location.pathname="/StudentList"
            },2500)
          }        });
    } else {
      console.log("Post")

      try {
        fetch('https://manraj-ors-1.onrender.com/student', {
          method: 'POST',
          body: JSON.stringify({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailIdId: this.state.emailId,
            collegeId: this.state.collegeId,
            mobileNo: this.state.mobileNo,
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
                window.location.pathname = "/AddStudent"
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
        <h1>Add Student</h1> 
        <p>{this.state.msg}</p>
        <div className={'from'}>
        
        <label htmlFor='firstName'>First Name :
        <input type="text" placeholder='Enter Firstname' value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
        {this.state.isTrue && !this.state.firstName && <p>Must not be empty</p>}
        </label><br /><br />

        <label htmlFor='lastName'>Last Name :
        <input type="text" placeholder='Enter Lastname' value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
        {this.state.isTrue && !this.state.lastName && <p>Must not be empty</p>}
        </label> <br /><br />

        <label htmlFor='emailId'>Email Id :
        <input type="email" placeholder='Enter loginid' value={this.state.emailId} onChange={(e) => this.setState({ emailId: e.target.value })} />
        {this.state.isTrue && !this.state.emailId && <p>Must not be empty</p>}
        </label><br /><br />

        <label htmlFor='collegeId'>College Id :
        <input type="text" placeholder='Enter password' value={this.state.collegeId} onChange={(e) => this.setState({ collegeId: e.target.value })} />
        {this.state.isTrue && !this.state.collegeId && <p>Must not be empty</p>}
        </label><br /><br />

        <label htmlFor='mobileNo'> Mobile No:
        <input type="number" placeholder='Enter mobile number' value={this.state.mobileNo} onChange={(e) => this.setState({ mobileNo: e.target.value })} />
        {this.state.isTrue && !this.state.mobileNo && <p>Must not be empty</p>}
        </label><br /><br />

        <button onClick={() => this.handleSubmit()}>Submit</button>
        <button> Reset </button>

        </div>
       
      </>
    )
  }
}
