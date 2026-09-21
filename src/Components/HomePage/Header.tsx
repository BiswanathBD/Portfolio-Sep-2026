import Container from "../Container";
import Logo from "../Shared/Logo";

export default function Header() {
  return (
    <Container className="hidden sm:block py-8 w-full z-50">
      <Logo />
    </Container>
  );
}
