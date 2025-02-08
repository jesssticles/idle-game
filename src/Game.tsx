import { type Component } from 'solid-js';
import { GameState } from './state';

const Game: Component<{state: GameState}> = ({state}) => {
  return (
    <>
      <h1>We have {state.resources.wood} wood.</h1>
      <h1>We have {state.resources.coal} coal.</h1>
      <button onClick={() => state.resources.wood += 1}>get wood!</button>
    </>
  );
};

export default Game;