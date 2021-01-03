import React, { Component,Fragment } from 'react'
import {
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        Container
      }
       from 'reactstrap';
import {connect} from "react-redux"
import PropTypes from "prop-types"
import LoginModal from './Auth/LoginModal';
import Logout from './Auth/logout';
import RegisterModal from './Auth/RegisterModal';


class AppNavBar extends Component {
    state ={
        isOpen:false
    }

    static propTypes = {
        auth:PropTypes.object.isRequired
    }

    toggle = ()=>{
        this.setState({
            isOpen:!this.state.isOpen
        }) 
    }
    render() {
        const {isAuthenticated, user } = this.props.auth

        const authlinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                    <strong>{user ? `Welcome ${user.name}` : ""}</strong>
                    </span>
                    <Logout/>
                </NavItem>
            </Fragment>
        )

        const guestlinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        )

        return (

            
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">ShoppingList</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated? authlinks : guestlinks}
                        </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
                
            </div>
        )
    }
}

const mapStateToProps = state =>({
    auth:state.auth
})

export default connect(mapStateToProps,null)(AppNavBar)
