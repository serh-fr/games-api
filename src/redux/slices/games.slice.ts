import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";

export interface GameItem {
  readonly id: string;
  readonly title: string;
  readonly provider: string;
  readonly collections: {
    readonly novelty: number;
    readonly popularity: number;
    readonly slots: number;
    readonly _hd: number;
    readonly all: number;
  }
  readonly real: {
    readonly [coin: string]: {
      readonly id: number;
    }
  }
  readonly demo: string;
}

interface InitialState {
  gamesItems: GameItem[]
  gamesProviders: string[]
  gamesCoins: string[],
  gameItem?: GameItem
}

const initialState: InitialState = {
  gamesItems: [],
  gamesProviders: [],
  gamesCoins: []
}

export const gamesSlice = createSlice({
  name: 'gamesSlice',
  initialState,
  reducers: {
    setGameItems: (state, action: PayloadAction<GameItem[]>) => {
      state.gamesItems = action.payload
    },
    setGameProviders: (state, action: PayloadAction<string[]>) => {
      state.gamesProviders = action.payload
    },
    setGameCoins: (state, action: PayloadAction<string[]>) => {
      state.gamesCoins = action.payload
    },
    setGameItem: (state, action: PayloadAction<GameItem>) => {
      state.gameItem = action.payload
    }
  },
})

export const { setGameItems, setGameCoins, setGameProviders, setGameItem } = gamesSlice.actions;

export const getGamesItems = () => async (dispatch: AppDispatch) => {
  try {
    const response = await (await fetch('./games_test.json')).json() as { readonly [item: string]: GameItem }

    const providers = new Set<string>()
    const coins = new Set<string>()

    const items = Object.entries(response).map(([key, value]) => {
      providers.add(value.provider)
      
      Object.keys(value.real).forEach((coin) => coins.add(coin))

      return { ...value, id: key.replace('/', '_') }
    }).sort((a, b) => a.collections.popularity - b.collections.popularity)

    dispatch(setGameItems(items))
    dispatch(setGameProviders(Array.from(providers)))
    dispatch(setGameCoins(Array.from(coins)))
  } catch (err) {
    console.error(err)
  }
}

export const getGameItemById = () => async (dispatch: AppDispatch) => {
  try {
    const response = await (await fetch('../games_test.json')).json() as { readonly [item: string]: GameItem }

    const item = response['softswiss_AlohaKingElvis'.replace('_', '/')]

    if (item) dispatch(setGameItem(item))
  } catch (err) {
    console.error(err)
  }
}

export const selectGamesItems = ({ limit = 12, provider, coin }: { readonly limit?: number; readonly provider?: string; readonly coin?: string }) => (state: RootState) => {
  let items = state.gamesSlice.gamesItems

  if (provider) items = items.filter((game) => game.provider === provider)

  if (coin) items = items.filter((game) => coin in game.real)

  return items.slice(0, limit)
}
export const selectGamesProviders = (state: RootState) => Array.from(state.gamesSlice.gamesProviders)
export const selectGamesCoins = (state: RootState) => Array.from(state.gamesSlice.gamesCoins)
export const selectGameItem = (state: RootState) => state.gamesSlice.gameItem

export default gamesSlice.reducer