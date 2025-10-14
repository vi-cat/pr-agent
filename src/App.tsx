import UserInput from "./components/UserInput";
import AgentOutput from "./components/AgentOutput";

function App() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">PR Agent</h1>
        <div className="columns">
          <div className="column is-half">
            <UserInput />
          </div>

          <div className="column is-half">
            <AgentOutput />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
