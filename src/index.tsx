/* @refresh reload */

import { batch } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { render, setProperty } from 'solid-js/web';
import { GameState, startingGameState, update } from './game';
import Game from './ui';


// QUIN - you should never need to change this file!
// this glues everything else together & does some fucky stuff to
// let the auto updating work without resetting the game state.
// i might need to change it tho cos this is fucky af.


let updateFunction = update;
const state: GameState = createMutable(startingGameState);


// bind all methods in state
function bindMethods(obj: any) {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "function") {
      obj[key] = value.bind(obj);
    } else if (typeof value === "object") {
      bindMethods(value);
    }
  }
}
bindMethods(state);


// trying to fix the thing where it live reloads
// this is a bit shit but it works for now
if (import.meta.hot) {
  import.meta.hot.accept("./game", mod => {
    if (!mod) return;

    updateFunction = mod.update;
    merge(state, mod.startingGameState);

    function merge(x: any, y: any) {
      if (x === null) return;
      if (typeof x !== 'object') return;

      for (const key of Object.keys(y)) {
        if (!Object.hasOwn(x, key)) {
          x[key] = y[key];
        } else if (typeof y[key] === "function") {
          x[key] = y[key].bind(x);
        }
        else {
          merge(x[key], y[key]);
        }
      }
    }
  });
}

// set the update loop to run every 1 second (1000 milliseconds)
setInterval(() => batch(() => updateFunction(state)), 1000);

const root = document.getElementById('root');
render(() => <Game game={state} />, root!);