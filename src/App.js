import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import SingleMovie from './component/SingleMovie';
import Error from './component/Error';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
