import { useState, useContext } from 'react';
import { DashboardContext } from '../Provider/NHLContext';
import { useNavigate } from 'react-router-dom';
import styles from '../CSSModules/Schedule.module.css';
import stylesLeaders from '../CSSModules/SkaterLeaders.module.css';

type GoalieCategory = 'savePctg' | 'shutouts' | 'wins' | 'goalsAgainstAverage';

const categoryLabels: Record<GoalieCategory, string> = {
  savePctg: 'Save Percentage',
  shutouts: 'Shutouts',
  wins: 'Wins',
  goalsAgainstAverage: 'Goals Against Average'
};

const GoalieLeaders = () => {
    const [selectedCategory, setSelectedCategory] = useState<GoalieCategory>('wins');
    const { data } = useContext(DashboardContext);
    const navigate = useNavigate();
    const goalieLeaders = data.topgoalies;

    const categories: GoalieCategory[] = ['savePctg', 'shutouts', 'wins', 'goalsAgainstAverage'];

    const handleCategoryChange = (category: GoalieCategory) => {
        setSelectedCategory(category);
    };

    const formatValue = (value: number) => {
        if (value % 1 !== 0) {
            return value.toFixed(2);
        }
        return value;
    };

    const renderLeadersTable = (category: GoalieCategory) => {
        const leaders = goalieLeaders[category];
        return leaders.map((leader) => (
            <div className={stylesLeaders.playerCard} key={leader.id}>
                <div className={stylesLeaders.playerCard__intro}>
                    <img className={stylesLeaders.playerCard__img} src={leader.headshot} alt={`${leader.firstName.default} ${leader.lastName.default}`} />
                    <p className={stylesLeaders['playerCard__info--teamAbbrev']}>{`${leader.teamAbbrev}`}</p>
                </div>
                <div className={stylesLeaders.playerCard__info}>
                    <p className={stylesLeaders['playerCard__info--player']}>{`${leader.firstName.default}`} <strong>{`${leader.lastName.default}`}</strong></p>
                    <p className={stylesLeaders['playerCard__info--value']}>{formatValue(leader.value)}</p>
                </div>
            </div>
        ));
    };

    return (
        <div className={stylesLeaders.SkaterLeadersWrapper}>
            <button className='btnBack' onClick={() => navigate('/player-stats')}>Go Back</button>
            <h1>Goalie Leaders</h1>
            <div className={styles.daysOfWeek}>
                {categories.map(cat => (
                    <button key={cat} onClick={() => handleCategoryChange(cat)} className={`${styles.dayButton} ${cat === selectedCategory ? styles.activeButton : ''}`}>
                        {categoryLabels[cat]}
                    </button>
                ))}
            </div>
            <div className={stylesLeaders.playerCard__box}>{renderLeadersTable(selectedCategory)}</div>
        </div>
    );
};

export default GoalieLeaders;
