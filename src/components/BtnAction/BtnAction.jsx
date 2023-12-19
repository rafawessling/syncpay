import './BtnAction.css';
import '../../styles/global.css';

export default function BtnAction({ color, name }) {
    return <button className={`${color}`}>{name}</button>;
}
