/* @refresh reload */

import { batch } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { render } from 'solid-js/web';
import { GameState, startingGameState, update } from './state';
import Game from './Game';


// QUIN - you should never need to change this file!
// this glues everything else together & does some fucky stuff to
// let the auto updating work without resetting the game state.
// i might need to change it tho cos this is fucky af.


let updateFunction = update;
const state: GameState = createMutable(startingGameState);

// trying to fix the thing where it live reloads
// this is a bit shit but it works for now
if (import.meta.hot) {
    import.meta.hot.accept("./update", mod => {
        if (!mod) return;

        updateFunction = mod.update;
        merge(state, mod.startingGameState);

        function merge(x, y) {
            if (x === null) return;
            if (typeof x !== 'object') return;

            for (const key of Object.keys(y)) {
                if (!Object.hasOwn(x, key)) {
                    x[key] = y[key];
                } else {
                    merge(x[key], y[key]);
                }
            }
        }
    });
}

// set the update loop to run every 1 second (1000 milliseconds)
setInterval(async () => batch(() => updateFunction(state)), 1000);

const root = document.getElementById('root');
render(() => <Game state = {state}/>, root!);