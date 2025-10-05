import { Link, NavLink } from "react-router";
import Container from "../components/layout/Container";

export default function Notfound() {
  return (
    <Container>
      {/* Logo */}
      <Link to="/">
        <img src="/images/گروه-اطلس-1.png" />
      </Link>

      {/* navbar list */}
      <ul>
        <li>
          <NavLink to="/">products</NavLink>
        </li>
        <li>
          <NavLink to="/">pricing</NavLink>
        </li>
      </ul>

      <h1>Page not found 😢</h1>
    </Container>
  );
}
