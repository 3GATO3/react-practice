import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";
function App() {
  const [count, setCount] = useState(0);
  const adAt = (userName) => `@${userName}`;

  return (
    <section className="App">
      <TwitterFollowCard
        formatUserName={adAt}
        isFolloing={true}
        name={"MIAU"}
        userName={"3gato3"}
      ><h1>hola</h1></TwitterFollowCard>
      <TwitterFollowCard
        formatUserName={adAt}
        initialIsFollowing={false}
        name={"MIAU"}
        userName={"3gato3"}
      ></TwitterFollowCard>
    </section>
  );
}

export default App;
