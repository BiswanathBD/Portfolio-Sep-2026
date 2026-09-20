import Container from "../Container";
import Logo from "../Shared/Logo";

export default function Header() {
  return (
    <Container className="py-6 sm:py-8">
      <Logo />
    </Container>
  );
}
