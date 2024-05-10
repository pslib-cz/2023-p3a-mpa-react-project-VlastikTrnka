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

    const formatValue = (value: number) => {
        if (value % 1 !== 0) {
            return value.toFixed(3);
        }
        return value;
    };

    const renderLeadersTable = (category: CategoryType) => {
        const leaders = skaterLeaders[category];
        return leaders.map((leader) => (
            <div className={stylesSkaterLeaders.playerCard} key={leader.id} >
                <div className={stylesSkaterLeaders.playerCard__intro}>
                    <img className={stylesSkaterLeaders.playerCard__img} src={leader.headshot} alt={`${leader.firstName.default} ${leader.lastName.default}`} />
                    <p className={stylesSkaterLeaders['playerCard__info--teamAbbrev']}>{`${leader.teamAbbrev}`}</p>
                </div>
                <div className={stylesSkaterLeaders.playerCard__info}>
                    <p className={stylesSkaterLeaders['playerCard__info--player']}>{`${leader.firstName.default}`} <strong>{`${leader.lastName.default}`}</strong></p>
                    <p className={stylesSkaterLeaders['playerCard__info--value']}>{formatValue(leader.value)}</p>
                </div>
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
