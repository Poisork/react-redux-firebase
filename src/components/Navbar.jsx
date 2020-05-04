import React from 'react'
import { NavLink } from 'react-router-dom'
import T from 'prop-types'

const Navbar = ({ links, cb = () => {}, rightSide = false }) => (
  <nav>
    <div className="nav-wrapper purple darken-3 px1">
      <ul className="left">
        {links.map(([link, nameLink]) =>
          <li key={link}>
            <NavLink to={`/${link}`}>{nameLink}</NavLink>
          </li>)}
      </ul>
      {rightSide && <ul className="right">
        <li onClick={cb}><NavLink to='/auth'>Logout</NavLink></li>
      </ul>}
    </div>
  </nav>
)

Navbar.propTypes = {
  links: T.arrayOf(T.arrayOf(T.string)).isRequired,
  cb: T.func,
  rightSide: T.bool.isRequired
}

export default Navbar
