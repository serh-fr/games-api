import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getGameItemById, selectGameItem} from "../../redux/slices/games.slice";
import { useAppDispatch } from "../../redux/store";
import cs from './game-cart.module.css';

export const GameCart: FC = () => {
  const { game } = useParams<{ game: string }>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (game) dispatch(getGameItemById())
  }, [dispatch, game])

  const gameItem = useSelector(selectGameItem);

  return <div>
    <Link to='/games'><button>Main page</button></Link>
    <div className={cs.gameCartBlock}>{gameItem?.title}</div>
  </div>
}