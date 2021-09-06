import Authentication from "./component/Auth/Authentication";
import { Switch, Route } from "react-router-dom";
function App() {
  return (
    <Switch>
      <Route path="/auth"><Authentication /></Route>
    </Switch>

  );
}

export default App;
