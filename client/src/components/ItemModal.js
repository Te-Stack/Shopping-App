import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    label,
} from "reactstrap"
import {connect} from "react-redux"
import {addItem} from "../actions/itemActions"
//const {v4 : uuidv4} = require("uuid")


class ItemModal extends Component {
    state = {
        modal:false,
        name:""
    }

    toggle=()=>{
        this.setState({
            modal:!this.state.modal
        })
    }

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit=(e)=>{
        e.preventDefault()
        const newItem = {
            //id:uuidv4(),
            name:this.state.name  
        }

        //Add item via addItem action
        this.props.addItem(newItem)

        //Close modal
        this.toggle()



    }
    render() {
        return (
            <div>
                <Button
                color="dark"
                style={{marginBottom:"2rem"}}
                onClick={this.toggle}
                >Add Item</Button>

                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup >
                                <label for="item">Item</label>
                                <input type="text" name="name" id="item" placeholder="Add Shopping item" onChange={this.onChange}>
                                </input>
                                <Button
                                color="dark"
                                style={{marginTop:"2rem"}} 
                                block>Add Item</Button>

                            </FormGroup>

                        </Form>
                    </ModalBody>

                </Modal>
                
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    item:state.item

})

export default connect(mapStateToProps,{addItem})(ItemModal)
