import React, { Component } from 'react'

export default class Login extends Component {
    constructor(){
        super()
        this.state={
          loginId: "",
          password: "",
          isTrue: false,
          msg: ""
        }
    } 
    handleSubmit(event) {
      console.log("handleSubmit", this.state);

    try {
      fetch("https://manraj-ors-1.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({ loginId: this.state.loginId, password: this.state.password }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      }).then((responce) => responce.json()).then((result) => {
        console.log("Result :", result.message)

        if (result.message === 'No result found') {
          this.setState({ msg: result.message })
          console.log("If run")
        } else if (result.message === "Enter LoginId And Password") {
          this.setState({ isTrue: true })
          console.log(result.message);
        } else {
          localStorage.setItem("token", JSON.stringify(result))
          window.location.pathname = "/"
        }
      })

    } catch (error) {
      console.log("This is a catch error :", error)
    }
  }
  render() {
    return (
      <>
      <h1>Login From</h1>
      <div className={'from'} >
    
        <label htmlFor="email" id={"one"}>Username : </label>
          <input type="text" name="" placeholder='Enter your  Email' id="email"
            value={this.state.loginId}
            onChange={(e) => this.setState({ loginId: e.target.value })} /> <br /><br />
                  {
          this.state.isTrue && !this.state.loginId && <p style={{ color: "red" }}>Must not be empty</p>
            }

          <label htmlFor="password">Password : </label>
          <input type="password" name="password" placeholder='password' id="password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })} />
             <br /><br />
             {
          this.state.isTrue && !this.state.password && <p style={{ color: "red" }}>Must not be empty</p>
             }
            <button className='button1' onClick={(event) => this.handleSubmit(event)}>Login</button>
    
      </div>
      </>
    )
  }
}
