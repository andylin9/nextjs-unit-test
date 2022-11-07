import { Login } from "@/components/Login";

export default function Home() {
  const a = 2;
  const b = 4;
  return (
    <div>
      <a href="https://nextjs.org">Welcome to Next.js!</a>
      <ul>
        <li>Apple</li>
        <li>Banana</li>
        <li>Orange</li>
      </ul>
      <h1 data-testid="mytestid">Hello</h1>
      <span title="sum">{a + b}</span>
      <Login/>
    </div>
  );
}
