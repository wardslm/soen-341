import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStackOverflow} from "@fortawesome/fontawesome-free-brands";
import {Link} from "react-router-dom";
import {useContext} from "react";
import UserContext from "./UserContext";

const StackOverflowHeader = styled.header`
  background-color: EDF8F8;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 1);
  display: grid;
  grid-template-columns: 220px 1fr 200px;
  grid-column-gap: 20px;
`;

const LogoHyperlink = styled(Link)`
  color: #f48024;
  text-decoration: none;
  display: inline-block;
  height: 50px;
  line-height: 30px;
  padding: 0px 15px;

  svg {
    margin-top: 7px;
    display: inline-block;
    float: left;
  }

  span {
    display: inline-block;
    padding-left: 5px;
    padding-top: 10px;
    font-size: 1.2rem;
    font-weight: 300;
  }

  b {
    font-weight: normal;
    display: inline-block;
    margin-left: 2px;
  }
`;

const SearchBarInput = styled.input`
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid #000;
  border-radius: 3px;
  background: rgba(121, 159, 168, 0.1);
  padding: 8px 10px;
  margin-top: 9px;
  color: #085e72;
`;

const ProfileLink = styled(Link)`
  color: #f48024;
  text-decoration: none;
  line-height: 50px;
  margin: 7px;
  font-weight: bold;
`;

function Header() {
    const {user} = useContext(UserContext);

    return (
        <StackOverflowHeader>
            <LogoHyperlink to={"/"} className="logo">
                <FontAwesomeIcon icon={faStackOverflow} size="2x"/>
                <span>
					stack<b>overflow</b>{" "}
				</span>
            </LogoHyperlink>
            <form action="" className="search">
                <SearchBarInput type="text" placeholder="Search..."/>
            </form>

            {user && (
                <ProfileLink to={"/account"} className="profile">
                    {user.email}
                </ProfileLink>
            )}

            {!user && (
                <span>
					<ProfileLink to={"/login"} className="profile">
						Log in
					</ProfileLink>
					<ProfileLink to={"/signup"} className="profile">
						Create Account
					</ProfileLink>
				</span>
            )}
        </StackOverflowHeader>
    );
}

export default Header;
