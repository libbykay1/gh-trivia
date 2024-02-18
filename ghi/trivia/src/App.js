import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Round from './Round';
import Received from './Received';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="submissionreceived/:round" element={<Received />} />
        <Route path="round/:round" element={<Round />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
