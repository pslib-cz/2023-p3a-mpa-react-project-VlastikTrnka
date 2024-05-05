import { useState, useContext } from 'react';
import { DashboardContext } from '../Provider/NHLContext';
import { useNavigate } from 'react-router-dom';
import styles from '../CSSModules/Schedule.module.css';
import stylesSkaterLeaders from '../CSSModules/SkaterLeaders.module.css';

type CategoryType = 'points' | 'assists' | 'goals' | 'toi' | 'penaltyMins' | 'faceoffLeaders';

const categoryLabels: Record<CategoryType, string> = {
  points: 'Points',
  assists: 'Assists',
  goals: 'Goals',
  toi: 'Time on Ice',
  penaltyMins: 'Penalty Minutes',
  faceoffLeaders: 'Faceoff Leaders'
};

const SkaterLeaders = () => {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>('points');
    const { data } = useContext(DashboardContext);
    const navigate = useNavigate();
    const skaterLeaders = data.topskaters;

    const categories: CategoryType[] = ['points', 'assists', 'goals', 'toi', 'penaltyMins', 'faceoffLeaders'];

    const handleCategoryChange = (category: CategoryType) => {
        setSelectedCategory(category);
    };

    const renderLeadersTable = (category: CategoryType) => {
        const leaders = skaterLeaders[category];
        return leaders.map((leader) => (
            <div className={stylesSkaterLeaders.playerCard} key={leader.id} >
                <img className={stylesSkaterLeaders.playerCard__img} src={leader.headshot} alt={`${leader.firstName.default} ${leader.lastName.default}`} />
                <p className={stylesSkaterLeaders.playerCard__player}>{`${leader.firstName.default} ${leader.lastName.default} - ${leader.teamAbbrev}`}</p>
                <p className={stylesSkaterLeaders.playerCard__value}>{`${leader.value}`}</p>
            </div>
        ));
    };

    return (
        <div className={stylesSkaterLeaders.SkaterLeadersWrapper}>
            <button className='btnBack' onClick={() => navigate('/player-stats')}>Go Back</button>
            <h1>Skater Leaders</h1>
            <div className={styles.daysOfWeek}>
                {categories.map(cat => (
                    <button key={cat} onClick={() => handleCategoryChange(cat)} className={`${styles.dayButton} ${cat === selectedCategory ? styles.activeButton : ''}`}>
                        {categoryLabels[cat]}
                    </button>
                ))}
            </div>
            <div className={stylesSkaterLeaders.playerCard__box}>{renderLeadersTable(selectedCategory)}</div>
        </div>
    );
};

export default SkaterLeaders;
