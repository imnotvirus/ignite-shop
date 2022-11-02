import { styled } from "../styles";

const Button = styled("button", {
  backgroundColor: "$rocketseat",
});
export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <Button>Click me</Button>
    </div>
  );
}
