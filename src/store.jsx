import { create } from "zustand";

const useStore = create((set, get) => ({
  playerOneName: "Player 1",
  playerTwoName: "Player 2",
  playerOne: 0,
  playerTwo: 0,
  scoreValue: 1,
  startGame: false,
  endGame: false,
  winner: "",
  gift: false,
  reinit: false,
  namePlayerOne: (name) => {
    set((state) => ({ playerOneName: (state.playerOneName = name) }));
  },
  namePlayerTwo: (name) => {
    set((state) => ({ playerTwoName: (state.playerTwoName = name) }));
  },
  launchGame: () => {
    set((state) => ({ start: (state.startGame = true) }));
  },
  stopGame: (player) => {
    const { playerOne, playerTwo, playerOneName, playerTwoName } = get();
    if (playerOne === 10 || playerTwo === 10) {
      set((state) => ({ endGame: (state.endGame = true) }));
    }
    if (player === "playerOne") {
      set((state) => ({ winner: (state.winner = playerOneName) }));
    }

    if (player === "playerTwo") {
      set((state) => ({ winner: (state.winner = playerTwoName) }));
    }
  },
  increaseScore: (player, value) => {
    if (player === "playerOne") {
      set((state) => ({ playerOne: state.playerOne + value }));
    }

    if (player === "playerTwo") {
      set((state) => ({ playerTwo: state.playerTwo + value }));
    }
  },
  removeScrore: () => {
    set({ playerOne: 0 });
  },
  getGift: (status) => {
    set((state) => ({ gift: (state.gift = status) }));
  },
  removeGift: () => {
    set((state) => ({ gift: (state.gift = false) }));
  },
  reinitPosition: (status) => {
    set((state) => ({ reinit: (state.reinit = status) }));
  },
}));

export { useStore };
