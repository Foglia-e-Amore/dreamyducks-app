import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomepageMain from './components/HomepageMain/HomepageMain.js';
import EQL from './components/ElementQuickLearn/EQL.js';
import Timer from './components/Timer/Timer.js';
import Restaurant from './components/Restaurant/Restaurant.js';
import NoPageFound from './components/NoPageFound/NoPageFound.js';

function App() {
  return (
    <div className="App">
      <Routes basename='/dreamyducks-react-app'>
            <Route index element={<HomepageMain  />} />
            <Route path="projects" element={<HomepageMain />} />
            <Route path="projects/eql" element={<EQL />} />
            <Route path="projects/timer" element={<Timer />} />
            <Route path="projects/restaurant" element={<Restaurant />} />
            <Route path="*" element={<NoPageFound />} />
      </Routes>
    </div>
  );
}

export default App;
