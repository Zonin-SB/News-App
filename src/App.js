import { Routes, Route } from 'react-router-dom';
import NewsPage from './Pages/NewsPage';
function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<NewsPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
