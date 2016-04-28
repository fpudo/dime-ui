
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { push } from 'react-router-redux'
import { IndexLink } from 'react-router'

import { logOut } from '../actions'
import NavLink from '../components/NavLink'

class NavBar extends Component {
    onClickLogOut() {
        this.props.logOut()
        this.props.push('/login')
    }
    render() {
        const { isAuthenticated } = this.props
        return (
            <header className="navbar navbar-fixed-top navbar-dark bg-inverse" role="banner">
                <nav className="nav navbar-nav">
                    <IndexLink to="/" className="navbar-brand" activeClassName="active">DiMe dashboard</IndexLink>
                    <ul className="nav navbar-nav clearfix">
                        <li className={`nav-item ${isAuthenticated ? '' : 'invisible'}`}>
                            <NavLink to="/events" className="nav-link">Events</NavLink>
                        </li>
                        <li className={`nav-item ${isAuthenticated ? '' : 'invisible'}`}>
                            <NavLink to="/documents" className="nav-link">Documents</NavLink>
                        </li>
                        {!isAuthenticated &&
                        <li className="nav-item pull-xs-right">
                            <NavLink to="/login" className="nav-link">Log In</NavLink>
                        </li>
                        }
                        {isAuthenticated &&
                        <li className="nav-item pull-xs-right">
                            <button onClick={this.onClickLogOut.bind(this)} className="btn btn-primary">
                                Logout
                            </button>
                        </li>
                        }
                    </ul>
                </nav>
            </header>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logOut, push }, dispatch)
}
function mapStateToProps(state) {
    const { isAuthenticated } = state.auth
    return {
        isAuthenticated,
    };
}
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(NavBar)
// { pure: false } is a workaround for active class see => https://github.com/react-bootstrap/react-router-bootstrap/issues/152