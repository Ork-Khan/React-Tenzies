import { useState, useEffect } from 'react'
import {Dice} from './components/Dice'
import './App.css'

function App() {
  
  const [dices, setDices] = useState(randomNumbers());
  const [number, setNumber] = useState(null);
  const [count, setCount] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  
  checkWin();

  function randomDice() {
    return {
      number : Math.floor(Math.random() * 6) + 1,
      selected : false
    };
  }

  function randomNumbers() {
    let diceArray = [];
    for(let i = 0; i < 10; i++){
      diceArray[i] = randomDice();
    }

    return diceArray;
  }
  
  function handleRollClick(){
    if(hasWon){
      setDices(randomNumbers());
      setCount(0);
      setHasWon(false);
    }else{ 
      setCount(prev => prev+1);
      setDices(prev => prev.map( dice => dice.selected ? dice : randomDice()));   
    }
  }

  function handleDieClick(id, Dienumber) {
    if(number == null){
      setNumber(Dienumber)
    }else if(number != Dienumber){
      return;
    }

    setDices(prev => prev.map((die,index) => (id == index ? {...die, selected : true} : die)));
  }

  function checkWin() {
    let allSelected = true;

    for(let dice of dices){
      if(!dice.selected){
        allSelected = false;
        break;
      }
    }

    if(allSelected && !hasWon){
      setHasWon(true);
      setNumber(null);
    }
  }

  useEffect(() =>{
    if(hasWon)
      confetti({
        particleCount: 250,
        spread: 100,
        origin: { y: .6 }
      });
  }, [hasWon])

  return(
    <>
      <header>
        <h1>Tenzies</h1>
        <p>Roll until all selected dice are the same. Click each die to freeze it at its current value between rolls</p>
      </header>
      <main>
        <h1>Count {count}</h1>
        <div className="die-container">
          {
            dices.map((die,index) => 
              <Dice key={index} 
                    id={index}
                    selected={die.selected} 
                    number={die.number} 
                    handleClick={handleDieClick}
              />)
          }
        </div>
        <button className="roll-button" onClick={handleRollClick}>
          {hasWon ? 'New Game' :'Roll'}
        </button>
      </main>
    </>

  )
}

export default App
