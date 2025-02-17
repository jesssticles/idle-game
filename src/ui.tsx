import { type Component } from 'solid-js';
import { GameState } from './game';

const Game: Component<{ game: GameState }> = ({ game }) => {
  return (
    <>
      <h1>We have {game.resources.wood} wood.</h1>
      <h1>We have {game.resources.coal} coal.</h1>
      <button onClick={() => game.addWood()}>get wood!</button>
      <button onClick={() => game.addCoal()}>add coal!</button>
    </>
  );
};

export default Game;