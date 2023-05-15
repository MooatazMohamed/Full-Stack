import './style/App.css';
import Header from './shared/header';
import Footer from './shared/footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
          <Header />
          <div className='BG'>
            <Outlet />
          </div>
          <Footer />
    </div>
  );
}

export default App;