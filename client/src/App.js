import { Route } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing.jsx';
import Home from './components/Home.jsx'
import Detail from './components/Detail.jsx'
import Create from './components/Create.jsx'

function App() {
  return (
    <div className="App">
      <Route path={'/'} exact component={Landing}/>
      <Route path={'/home'} component={Home}/>
      <Route path={'/detail/:name'} component={Detail}/>
      <Route path={'/create'} component={Create}/>
    </div>
  );
}

export default App;
