import {} from "react";
import { Navbar as LMNavbar, Nav, Dropdown } from "rsuite";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div>
      <LMNavbar>
        <LMNavbar.Brand>Main</LMNavbar.Brand>
        <Nav>
          <Nav.Item href="/">Books</Nav.Item>
          <Dropdown>
            <Nav.Item href="/">Viewer</Nav.Item>
            <Dropdown.Item>Modifier</Dropdown.Item>
          </Dropdown>
          <Nav.Item>Coordinator</Nav.Item>
          <Nav.Item>FlashCards</Nav.Item>
        </Nav>
      </LMNavbar>
    </div>
  );
};

export default Navbar;
