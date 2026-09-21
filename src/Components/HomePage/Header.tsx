import Container from "../Container";
import Logo from "../Shared/Logo";

export default function Header() {
  return (
    <Container className="pt-6 sm:pt-8 fixed sm:relative w-full z-50">
      <Logo />
    </Container>
  );
}
