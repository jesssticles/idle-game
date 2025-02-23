// sets the time in seconds between updates
export const updateRate: number = 0.1;

// sets up the state for the game
// we can also put functions here which we can trigger from the UI
export const startingGameState = {
	resources: {
		wood: 0,
		coal: 0,
		iron: 0,
		snow: 0,
		sugar: 0,
	},

	addWood() {
		this.resources.wood += 1;
	},

	addCoal() {
		this.resources.coal += 10;
	},
};
export type GameState = typeof startingGameState;

// gets called every updateRate seconds - all game logic happens here
export function update(state: GameState) {
	state.resources.wood += updateRate * 1.0;
}
