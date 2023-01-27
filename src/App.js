import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import {ReactQueryDevtools} from "react-query/devtools"
import './App.css';
import Nav from './components/Nav';
import Favorite from './pages/Favorite';
import Home from './pages/Home';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/favorites" element={<Favorite/>}/>
      </Routes>
    </div>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
    </QueryClientProvider>
  );
}

export default App;
