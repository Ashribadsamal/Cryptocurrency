import React from 'react';
// import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css';
import Header from './Component/Header';
import CoinPages from './Pages/CoinPages';
import Home from './Pages/Home';
import {makeStyles} from '@material-ui/core'

function App() {
  const useStyles = makeStyles(()=>({
    App:{
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles()

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header/>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/coins/:id" element={<CoinPages/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
