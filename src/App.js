import './style/App.css';
import Header from './shared/header';
import Footer from './shared/footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
          <Header />
          <Outlet />
          <Footer />
    </div>
  );
}

export default App;
