import React from 'react';
import { Link, withRouter } from 'react-router-dom';


function Navigation(props) {
    return (
        <div className="navigation">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <Link class="navbar-brand" to="/">
                        OutOfIdea - DecentralHacks
                    </Link>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                        <div class="collapse navbar-collapse" id="navbarResponsive">
                            <ul class="navbar-nav ml-auto">
                                <li
                                    class={`nav-item  ${
                                    props.location.pathname === "/" ? "active" : ""
                                    }`}
                                >
                                    <Link class="nav-link" to="/">
                                    Home
                                    <span class="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li
                                    class={`nav-item  ${
                                    props.location.pathname === "/vote" ? "active" : ""
                                    }`}
                                >
                                    <Link class="nav-link" to="/vote">
                                    Vote
                                    </Link>
                                </li>
                                <li
                                class={`nav-item  ${
                                props.location.pathname === "/register" ? "active" : ""
                                }`}
                            >
                                <Link class="nav-link" to="/register">
                                Register
                                </Link>
                            </li>
                            </ul>
                        </div>
                </div>
            </nav>
        </div>
    )
}

export default withRouter(Navigation);