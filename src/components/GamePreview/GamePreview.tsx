import { FC } from "react";
import { Link } from "react-router-dom";
import { GameItem } from "../../redux/slices/games.slice";
import cs from './game-preview.module.css';

interface GamePreviewProps {
  readonly item: GameItem
}

export const GamePreview: FC<GamePreviewProps> = ({ item }) => {
  return <div className={cs.previewBlock}>
    <div className={cs.previewImageBlock}>
      <Link to={`/games/${item.id}`}>
        <img className={cs.previewImage} src={`https://cdn2.softswiss.net/i/s2/${item.id}.png`} alt={item.id} />
      </Link>
    </div>
    <div className={cs.previewTitle}>
      {item.title}
    </div>
  </div>
}