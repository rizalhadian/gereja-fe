import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
    Col,
    Form,
    FormInput,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button
} from "shards-react";




class Login extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            identifier: "",
            password: "",
            user: ""
        }

        this.user = {
            jwt: "",
            user: {

            }
        }
    }

    login(data){
        const headers = { 
            'Content-Type': 'application/json',
        };

        axios.post('auth/local', data, {headers})
        .then(response => {
            alert("Login Berhasil");
            
            localStorage.setItem('jwt', response.data.jwt)

            window.location.href = "/admin/keluarga";
        })
        .catch(error => {
            this.setState({ errorMessage: error.message });
            console.error('There was an error!', error.message);
            alert("Login Gagal !, "+error);
        });
    }

    mySubmitHandler = (event) => {
        this.login(this.state);
    }

    handleInputChanged(event) {
        this.setState({
            [event.target.name] : event.target.value,
        });
    }

    cekState(event){
        console.log( localStorage.getItem('jwt') )
    }


    render() {
        return (
            <Col sm="12" md="12">
                <strong className="text-muted d-block mb-2">Login</strong>
                <Form >
                    <FormGroup>
                        <InputGroup className="mb-3">
                        <InputGroupAddon type="prepend">
                            <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <FormInput placeholder="Username" name="identifier" value={this.state.identifier} onChange={this.handleInputChanged.bind(this)}/>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <FormInput
                        type="password"
                        placeholder="Password"
                        name="password" value={this.state.password} onChange={this.handleInputChanged.bind(this)}
                        />
                    </FormGroup>
                    <Button type="button" onClick={this.mySubmitHandler}>Submit</Button>
                    <Button type="button" onClick={this.cekState}>Cek User</Button>
                    </Form>
            </Col>
        )
    }
}

export default Login;
