import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getGamesItems, selectGamesCoins, selectGamesItems, selectGamesProviders } from "../../redux/slices/games.slice";
import { useAppDispatch } from "../../redux/store";
import { GamePreview } from "../GamePreview/GamePreview";
import cs from './catalog.module.css'

export const Catalog: FC = () => {
  const [limit, setLimit] = useState(12)
  const [provider, setProvider] = useState<string>()
  const [coin, setCoin] = useState<string>()

  const providers = useSelector(selectGamesProviders)
  const coins = useSelector(selectGamesCoins)
  const items = useSelector(selectGamesItems({ limit, provider, coin }))

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getGamesItems())
  }, [dispatch])

  useEffect(() => {
    setProvider(providers[0])
  }, [providers])

  useEffect(() => {
    setCoin(coins[0])
  }, [coins])

  const onChangeProvider = (provider: string) => setProvider(provider)

  const onChangeCoin = (coin: string) => setCoin(coin)

  return <div>
    <div className={cs.selectsBlock}>
      <div>
        <div>Select provider</div>
        <select onChange={({ target }) => onChangeProvider(target.value)}>
          {providers.map((provider) => <option key={provider} value={provider}>{provider}</option>)}
        </select>
      </div>
      <div>
        <div>Select coin</div>
        <select onChange={({ target }) => onChangeCoin(target.value)}>
          {coins.map((coin) => <option key={coin} value={coin}>{coin}</option>)}
        </select>
      </div>
    </div>
    <div className={cs.gamesList}>{items.map((item) => <GamePreview key={item.id} item={item} />)}</div>
    <div className={cs.loadMoreBlock}>
      <button onClick={() => setLimit((state) => state += 12)}>Load more</button>
    </div>
  </div>
}