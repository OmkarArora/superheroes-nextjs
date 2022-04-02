import Link from "next/link";
import { MDBBtn } from "mdb-react-ui-kit";

function Navbar() {
  return (
    <nav className="navbar container">
      <Link href="/">
        <a className="navbar-brand">Superhero identity</a>
      </Link>
      <Link href="/addhero">
        <MDBBtn>New identity</MDBBtn>
      </Link>
    </nav>
  );
}

export default Navbar;
