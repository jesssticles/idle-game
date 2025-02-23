import { type Component } from "solid-js";
import { GameState } from "./game";

const Game: Component<{ game: GameState }> = ({ game }) => {
	return (
		<>
			<p>We have {game.resources.wood.toFixed(2)} wood.</p>
			<p>We have {game.resources.coal.toFixed(2)} coal.</p>
			<button onClick={() => game.addWood()}>get wood!</button>
			<button onClick={() => game.addCoal()}>add coal!</button>
		</>
	);
};

export default Game;
