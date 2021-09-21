import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
    NavLink
} from "react-router-dom";

/**
 * A function that adds links to pages and outputs HTML.
 * @returns HTML output
 */
function NavMenu() {
    const {t} = useTranslation();
    return (
        <Nav className="me-auto ms-auto">
            <NavLink exact to={"/"} className={"nav-link"}>
                <FontAwesomeIcon icon={"home"} className="me-2"></FontAwesomeIcon>
                {t('home')}
            </NavLink>
            <NavLink to={"/books"} className={"nav-link"}>
                <FontAwesomeIcon icon={"book"} className="me-2"></FontAwesomeIcon>
                {t('book.books')}
            </NavLink>
            <NavLink to="/authors" className={"nav-link"}>
                <FontAwesomeIcon icon={"user"} className="me-2"></FontAwesomeIcon>
                {t('book.authors')}
            </NavLink>
        </Nav>
    )
}

export default NavMenu