import './TitleHeader.css';

function TitleHeader({ title }) {
    const className = String(title).toLowerCase().trim().replace(' ', '-');

    return <h2 className={`${className}`}>{title}</h2>;
}

export default TitleHeader;
