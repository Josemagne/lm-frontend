import {} from "react";
import { Navbar as LMNavbar, Nav, Dropdown } from "rsuite";
import Library from "./assets/icons/library.svg";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div>
      <LMNavbar>
        <LMNavbar.Brand>
          <p>i</p>
        </LMNavbar.Brand>
        <Nav>
          <Nav.Item href="/">Books</Nav.Item>
          <Dropdown title="Books">
            <Nav.Item href="/">Viewer</Nav.Item>
            <Nav.Item href="/bookmodifier">Modifier</Nav.Item>
          </Dropdown>
          <Nav.Item>Coordinator</Nav.Item>
          <Nav.Item>FlashCards</Nav.Item>
        </Nav>
      </LMNavbar>
    </div>
  );
};

export default Navbar;
