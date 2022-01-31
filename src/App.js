import './App.css';
import { Stopwatch } from './Components/Stopwatch';
import { Countdown } from './Components/Countdown';
import { XY } from './Components/XY';
import { Tabata } from './Components/Tabata';

const App = () => {
  return (
    <div>
      <Stopwatch />
      <Countdown />
      <XY />
      <Tabata />
    </div>
  );
};

export default App;
