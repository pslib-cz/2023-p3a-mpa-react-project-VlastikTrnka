import { useState, useContext } from 'react';
import { DashboardContext } from '../Provider/NHLContext';
import { useNavigate } from 'react-router-dom';
import styles from '../CSSModules/Schedule.module.css';
import stylesGoalieLeaders from '../CSSModules/SkaterLeaders.module.css';

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

    const renderLeadersTable = (category: GoalieCategory) => {
        const leaders = goalieLeaders[category];
        return leaders.map((leader) => (
            <div className={stylesGoalieLeaders.playerCard} key={leader.id}>
                <img className={stylesGoalieLeaders.playerCard__img} src={leader.headshot} alt={`${leader.firstName.default} ${leader.lastName.default}`} />
                <p className={stylesGoalieLeaders.playerCard__player}>{`${leader.firstName.default} ${leader.lastName.default} - ${leader.teamAbbrev}`}</p>
                <p className={stylesGoalieLeaders.playerCard__value}>{`Value: ${leader.value}`}</p>
            </div>
        ));
    };

    return (
        <div className={stylesGoalieLeaders.SkaterLeadersWrapper}>
            <button className='btnBack' onClick={() => navigate('/player-stats')}>Go Back</button>
            <h1>Goalie Leaders</h1>
            <div className={styles.daysOfWeek}>
                {categories.map(cat => (
                    <button key={cat} onClick={() => handleCategoryChange(cat as GoalieCategory)} className={`${styles.dayButton} ${cat === selectedCategory ? styles.activeButton : ''}`}>
                        {categoryLabels[cat]}
                    </button>
                ))}
            </div>
            <div className={stylesGoalieLeaders.playerCard__box}>{renderLeadersTable(selectedCategory)}</div>
        </div>
    );
};

export default GoalieLeaders;
