import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

function Nav() {
  return (
    <NavContainer>
        <h2>👁️👄👁️</h2>
        <NavItems>
                <StyledNavLink to="/">Domů</StyledNavLink>
    
                <StyledNavLink to="/favorites">Oblíbené</StyledNavLink> 
        </NavItems>
    </NavContainer>
  )
}

const NavContainer = styled.div`
    padding: 20px 0px 20px 40px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 3%), 0 1px 6px -1px rgb(0 0 0 / 2%), 0 2px 4px 0 rgb(0 0 0 / 2%);
    margin-bottom: 30px;
`
const NavItems = styled.ul`
    list-style: none;
    display: flex;
`
const StyledNavLink = styled(NavLink)`
    padding: 10px 20px;
    font-weight: bold;
    margin: 0px 5px;
    text-decoration: none;
    color: black;
    &.active {
    color: #1677ff;
  }
  &:hover{
    background-color: #FAFAFA;
  }
`
export default Nav