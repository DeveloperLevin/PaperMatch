import './App.css';
import NavBar from './components/NavBar';
import Main from './components/Main';  

function App() {
  return (
    <>
      <NavBar />
      <div className="app bg-zinc-800 text-white h-full flex-grow">
        <Main />
      </div>
    </>
  );
}

export default App;
