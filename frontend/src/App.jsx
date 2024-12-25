import './App.css';
import NavBar from './components/NavBar';
import Main from './components/Main';  

function App() {
  return (
    <>
      <NavBar />
      <div className="bg-zinc-800 text-white flex-grow">
        <Main />
      </div>
    </>
  );
}

export default App;
