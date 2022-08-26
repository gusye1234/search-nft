import React, { Component } from 'react'
// import "./style.css"

class Navbar extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-dark fixed-top logo-bg flex-md-nowrap p-0">
                    <a
                        className="navbar-brand col-sm-3 col-md-2 mr-0"
                        href="https://futurex.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                    ><img src={require("../logo.png")} alt='logo' width={40} height={40} /> Search NFT</a>
                    <ul className="navbar-nav px-3">
                        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                            <small className="text-secondary">
                                <small id="account">{this.props.account}</small>
                            </small>
                        </li>
                    </ul>


                </nav></div>
        );
    }
}

export default Navbar;