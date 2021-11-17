import * as React from 'react';

import SearchEngineOptimization from '../components/SearchEngineOptimization';

import * as UTILS from '../utils';

export default function Home() {
  const [state, setState] = React.useState({
    alphabet: UTILS.ALPHABET,
    words: '',
    randomWord: '',
    letters: [],
    clickedLetters: [],
    matchedLetters: [],
    lives: 6,
    initialLives: 6,
    clickedButton: null,
    gameStarted: false,
    chosenLevel: '',
    gameOver: false
  });

  const getInitialState = () => {
    setState({
      alphabet: UTILS.ALPHABET,
      words: '',
      randomWord: '',
      letters: [],
      clickedLetters: [],
      matchedLetters: [],
      lives: 6,
      initialLives: 6,
      clickedButton: null,
      gameStarted: false,
      chosenLevel: '',
      gameOver: false
    });
  };

  const animalsGame = () => {
    const random = UTILS.getRandom(UTILS.ANIMALS);
    const letters = UTILS.splitLetters(random);

    setState({
      ...state,
      clickedButton: 'animals',
      clickedLetters: [],
      gameStarted: true,
      letters: letters,
      lives: state.initialLives,
      matchedLetters: [],
      randomWord: random,
      words: UTILS.ANIMALS
    });
  };

  const phrasalVerbsGame = () => {
    const random = UTILS.getRandom(UTILS.PHRASALVERBS);
    const letters = UTILS.splitLetters(random);

    setState({
      ...state,
      clickedButton: 'phrasalVerbs',
      clickedLetters: [],
      gameStarted: true,
      letters: letters,
      lives: state.initialLives,
      matchedLetters: [],
      randomWord: random,
      words: UTILS.PHRASALVERBS
    });
  };

  const checkLetter = (e) => {
    let letterDoesNotEqualE = true;

    let localClickedLetters = [...state.clickedLetters, e];
    let localLives = state.lives;
    let localMatchedLetters = state.matchedLetters;

    for (const letter in state.letters) {
      if (state.letters[letter] === e) {
        letterDoesNotEqualE = false;
        localMatchedLetters.push(e);

        break;
      }
    }

    if (letterDoesNotEqualE) {
      localLives -= 1;
    }

    if (localLives === 0) {
      const word = state.randomWord;
      getInitialState();
      alert(`You lost! The word was ${word}.`);
    } else {
      let foundAllLetters = true;
      const word = state.randomWord;

      for (let letter in word) {
        if (!localMatchedLetters.includes(word[letter].toUpperCase())) {
          foundAllLetters = false;
          break;
        }
      }

      if (foundAllLetters) {
        getInitialState();
        alert(`Congratulations on winning Hangman! The word was ${word}.`);
      } else {
        setState({
          ...state,
          clickedLetters: localClickedLetters,
          lives: localLives,
          matchedLetters: localMatchedLetters
        });
      }
    }
  };

  const setLevel = (lives, level) => {
    setState({
      ...state,
      initialLives: lives,
      chosenLevel: level
    });
  };

  return (
    <>
      <SearchEngineOptimization title="Home" />
      <main className="grid grid-cols-1 text-center">
        {!state.gameStarted ? (
          <>
            <p className="text-xl">
              Choose a difficulty level...&nbsp;
              {state.chosenLevel &&
                `At this level you will have ${state.initialLives} lives.`}
            </p>
            <div className="grid grid-cols-3">
              <button
                className="game-mode"
                onClick={() => setLevel(10, 'easy')}
                disabled={state.chosenLevel === 'easy'}
              >
                Easy
              </button>
              <button
                className="game-mode"
                onClick={() => setLevel(6, 'medium')}
                disabled={state.chosenLevel === 'medium'}
              >
                Medium
              </button>
              <button
                className="game-mode"
                onClick={() => setLevel(2, 'hard')}
                disabled={state.chosenLevel === 'hard'}
              >
                Hard
              </button>
            </div>
            {state.chosenLevel && (
              <>
                <p>Choose the category you would like to play!</p>
                <div className="grid grid-cols-2">
                  <button
                    onClick={animalsGame}
                    disabled={state.clickedButton === 'animals'}
                    className="game-mode"
                  >
                    Animals
                  </button>
                  <button
                    onClick={phrasalVerbsGame}
                    disabled={state.clickedButton === 'phrasalVerbs'}
                    className="game-mode"
                  >
                    Phrasal Verbs
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <p>
              Your lives: <b>{state.lives}</b>
            </p>
            <div id="word-container">
              <ul id="word" aria-label="the word to guess">
                {state.letters.map((letter) => (
                  <li
                    className={
                      state.matchedLetters.includes(letter)
                        ? 'foundedLetter'
                        : 'letter'
                    }
                  >
                    {letter}
                  </li>
                ))}
              </ul>
            </div>
            <div
              id="alphabet"
              className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12"
            >
              {state.alphabet.map((alpha) => (
                <button
                  className={
                    state.clickedLetters.includes(alpha)
                      ? 'disabled'
                      : state.gameStarted
                      ? ''
                      : 'disabled'
                  }
                  disabled={
                    state.clickedLetters.includes(alpha)
                      ? true
                      : state.gameStarted
                      ? false
                      : true
                  }
                  onClick={() => checkLetter(alpha)}
                >
                  {alpha}
                </button>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
