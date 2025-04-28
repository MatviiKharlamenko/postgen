import { Container, Heading } from "@chakra-ui/react";
import IdeaGenerator from "./components/IdeaGenerator";

function App() {
  return (
    <Container maxW="container.md" py={10} centerContent>
      <Heading mb={6}>Генератор идей постов AI</Heading>
      <IdeaGenerator />
    </Container>
  );
}

export default App;
