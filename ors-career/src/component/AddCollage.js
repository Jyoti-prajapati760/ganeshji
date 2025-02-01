import React, { Component } from 'react'

export default class AddCollage extends Component {
  
  constructor() {
    super()
    this.state = {
      "collegeName": "",
      "address": "",
      "mobileNo": "",
      "city": "",
      "state": "",
      "msg":'',
      "isTrue":''
    }
    this.pid = window.location.pathname.split("/")[2]
    // console.log("Pid :",this.pid)
    if (this.pid) {
      this.getOne(this.pid)
    }
  }
  
  getOne(id) {
    console.log("id in get method ", id)
    fetch("https://manraj-ors-1.onrender.com/college/" + id).then((res) => res.json()).then((result) => {
      console.log("Get a user data : ", result);
      // this.setState(result)
      this.setState({
        "collegeName": result.collegeName,
        "address": result.address,
        "mobileNo": result.mobileNo,
        "city": result.city,
        "state": result.state
      })
    })
  }
  

  handleSubmit() {
    // console.log("This is sbmit function", this.state);
    this.setState({isTrue:true})
    if (this.pid) {
      console.log("PUT")
      fetch('https://manraj-ors-1.onrender.com/college/'+this.pid, {
        method: 'PUT',
        body: JSON.stringify({
          collegeName:this.state.collegeName,
          address:this.state.address,
          mobileNo:this.state.mobileNo,
          city:this.state.city,
          state:this.state.state
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          if(result.acknowledged){
            this.setState({msg:"from submitted"})
            setTimeout(()=>{
              window.location.pathname="/AddUser"
            },2000)
          }
        });
    } else {
      console.log("Post")

   try{
    fetch('https://manraj-ors-1.onrender.com/college', {
      method: 'POST',
      body: JSON.stringify({
        collegeName:this.state.collegeName,
        address:this.state.address,
        mobileNo:this.state.mobileNo,
        city:this.state.city,
        state:this.state.state
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
          window.location.pathname = "/AddCollage"
        }, 3000)
        // console.log("if run")
      }
      else {

        console.log("Add user Post :", result)
        this.setState({ msg: result.message })

      }
    })
   }catch(error){
    console.log("Error catch :",error)
   }
    }
  }
  render() {
    return (
      <>
        <h1>Add Collage</h1>
        <p>{this.state.msg}</p>
        <div className={'from'}>
      
        <label htmlFor='collegeName'> Name :
        <input type="text" placeholder='Enter Name' value={this.state.collegeName} onChange={(e) => this.setState({ collegeName: e.target.value })} />
        {this.state.isTrue && !this.state.collegeName && <p>Must not be empty</p>}
        </label><br /><br />

        <label htmlFor='address'>Address:
        <input type="text" placeholder='Enter Address' value={this.state.address} onChange={(e) => this.setState({ address: e.target.value })} />
        {this.state.isTrue && !this.state.address && <p>Must not be empty</p>}
        </label> <br /><br />

        <label htmlFor='mobileNo'>Phone Number :
        <input type="number" placeholder='Enter phone number' value={this.state.mobileNo} onChange={(e) => this.setState({ mobileNo: e.target.value })} />
        {this.state.isTrue && !this.state.mobileNo && <p>Must not be empty</p>}
        </label><br /><br />

        <label htmlFor='city'>City :
        <input type="text" placeholder='Enter your city' value={this.state.city} onChange={(e) => this.setState({ city: e.target.value })} />
        {this.state.isTrue && !this.state.city && <p>Must not be empty</p>}
        </label><br /><br />

        <label htmlFor='state'> state :
        <input type="text" placeholder='Enter your state' value={this.state.state} onChange={(e) => this.setState({ state: e.target.value })} />
        {this.state.isTrue && !this.state.state && <p>Must not be empty</p>}
        </label><br /><br />

        <button onClick={() => this.handleSubmit()}>Submit</button>
        <button> Reset </button>

        </div>
      

      </>
    )
  }
}


