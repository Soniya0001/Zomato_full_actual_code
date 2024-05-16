import React from "react";
import Modal from 'react-modal';
import axios from "axios";

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModal: false,
            signupModal: false,
            name: '',
            email: '',
            password: ''
        }
    }

    // For Modal
    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    google = () => {
        // window.open(`${BASE_URL}/auth/google`, "_self");
        window.open("http://localhost:5500/auth/google", "_self");
    }

    logout = () => {
        // window.open(`${BASE_URL}/auth/logout`, "_self");
        window.open("http://localhost:5500/auth/logout", "_self");
    };

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    };

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    };

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    handleSignUp = (e) => {
        const { name, email, password } = this.state
        e.preventDefault();
        axios.post('http://localhost:5500/signup', { name, email, password })
            .then(result => console.log(result))
            .catch(err => console.log(err))
    };

    handleLogin = (e) => {
        const { name, email, password } = this.state
        e.preventDefault();
        axios.post('http://localhost:5500/login', { email, password })
            .then(result => {
                console.log(result)
                if (result.data === "Success") {
                    alert("Logged in successfully")
                    console.log(name)
                }
                if (result.data === "Invalid Password") {
                    alert("Invalid Password")
                }
                if (result.data === "No record found!!!") {
                    alert("No record found!!!")
                }
            })
            .catch(err => console.log(err))
    };


    render() {
        const { loginModal } = this.state;
        const { signupModal } = this.state;
        const { user } = this.props;
        return (
            <div>
                <div className="position-absolute end-0 me-5 z-3">

                    {console.log(user)}
                    {!user ? (
                        <form class="d-flex nav-form">
                            <button type="button" class="btn btn-danger me-2" onClick={() => { this.handleModal('loginModal', true) }}>Login</button>
                            <button type="button" class="btn btn-outline-light" onClick={() => { this.handleModal('signupModal', true) }}>Create an account</button>
                        </form>

                    ) : (
                        <form class="d-flex nav-form">
                            <img src={user.photos[0].value} className="circle" alt=" " />
                            <p className="text-white m-3">{user.displayName}</p>
                            <p className="text-white m-3">{user.name}</p>
                            <button type="button" class="btn btn-outline-light py-0 px-" onClick={this.logout}>Logout</button>
                        </form>
                    )}


                    <Modal
                        isOpen={loginModal}
                        style={customStyles}
                    >
                        <div>
                            {/* <h4 style={{ color: "#192F60;" }} className="fw-bold d-inline">Login</h4> */}
                            <div onClick={() => this.handleModal('loginModal', false)} className="close"><i class="bi bi-x-lg"></i></div>
                        </div>

                        <div>
                            <div className="m-3">
                                <h2 className="m-3 fw-bold">Login</h2>
                                <form onSubmit={this.handleLogin}>

                                    <div class="mb-3">

                                        <label for="exampleInputEmail1" class="form-label" >Email address</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1"
                                            name="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.handleEmailChange} required />
                                        <div id="emailHelp" class="form-text">
                                            We'll never share your email with anyone else.</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Password</label>
                                        <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} class="form-control" id="exampleInputPassword1" required />
                                    </div>

                                    <div class=" d-flex justify-content-center  btn-group" role="group" aria-label="Basic example">
                                        <button type="submit" class="btn btn-primary justify-content-center">Login</button>
                                        <button type="cancel" onClick={() => this.handleModal('loginModal', false)}class="btn btn-danger justify-content-center d-flex ms-4 align-items-center" >Close</button>
                                    </div>
                                </form >
                            </div>
                        </div>

                        <div className="justify-content-center">
                            <p className="d-flex justify-content-center fw-bold">OR</p>
                            <div className="d-flex justify-content-center">
                                <input type="button" className="btn btn-success " value="CONTINUE WITH GOOGLE" onClick={this.google} />
                            </div>
                        </div>

                    </Modal>

                    <Modal
                        isOpen={signupModal}
                        style={customStyles}
                    >
                        <div>
                            {/* <h4 style={{ color: "#192F60;" }} className="fw-bold d-inline">Sign up</h4> */}
                            <div onClick={() => this.handleModal('signupModal', false)} className="close"><i class="bi bi-x-lg"></i></div>
                        </div>

                        <div>
                            <div className="m-3">
                                <h2 className="m-3 fw-bold">Sign up</h2>
                                <form onSubmit={this.handleSignUp}>
                                    <div class="mb-3">
                                        <div class="mb-1">
                                            <label for="exampleInputText1" class="form-label">Name</label>
                                            <input type="text" class="form-control" name="name" id="exampleInputName1"
                                                value={this.state.name} onChange={this.handleNameChange} required />
                                        </div>
                                        <label for="exampleInputEmail1" class="form-label" >Email address</label>
                                        <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleEmailChange} id="exampleInputEmail1" aria-describedby="emailHelp" required />
                                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Password</label>
                                        <input type="password" name="password" class="form-control" id="exampleInputPassword1" value={this.state.password} onChange={this.handlePasswordChange} required />
                                    </div>
                                    <div class=" d-flex justify-content-center  btn-group" role="group" aria-label="Basic example">
                                        <button type="submit" class="btn btn-primary justify-content-center">Sign up</button>
                                        <button type="cancel" onClick={() => this.handleModal('signupModal', false)} class="btn btn-danger justify-content-center d-flex ms-4 align-items-center" >Close</button>
                                    </div>
                                </form >
                                {/* <button type="cancel" onClick={() => this.handleModal('signupModal', false)} class="btn btn-danger justify-content-center d-flex ms-4 align-items-center" >Close</button> */}
                            </div>
                        </div>
                        <div className="justify-content-center">
                            <p className="d-flex justify-content-center fw-bold">OR</p>
                            <div className="d-flex justify-content-center">
                                <input type="button" className="btn btn-success " value="CONTINUE WITH GOOGLE" onClick={this.google} />
                            </div>
                        </div>
                    </Modal>

                </div>
            </div>
        )
    }
}

export default Header;