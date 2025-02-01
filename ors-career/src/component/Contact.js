import React from 'react'

export default class Contact extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "Jyoti"
        }
    }
        handlesState(){
            console.log("first");
            this.setState({ name: "jojo" })
        }
        render(){
            return (
                <div>
                    Contact{this.state.name}
                    <button onClick={() => this.handlesState()}>click</button>
                </div>
            )

        }
    
}