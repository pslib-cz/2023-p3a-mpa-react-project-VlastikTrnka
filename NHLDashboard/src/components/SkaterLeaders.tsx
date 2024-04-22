import { useState, useContext } from 'react';
import { DashboardContext } from '../Provider/NHLContext';
import { useNavigate } from 'react-router-dom';

type Category = 'points' | 'assists' | 'goals' | 'toi' | 'penaltyMins' | 'faceoffLeaders';

const SkaterLeaders = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category>('points');
    const { data } = useContext(DashboardContext);
    const navigate = useNavigate();
    const skaterLeaders = data.topskaters;

    const handleCategoryChange = (category: Category) => {
        setSelectedCategory(category);
    };

    const renderLeadersTable = (category: Category) => {
        const leaders = skaterLeaders[category];
        return leaders.map((leader) => (
            <div key={leader.id}>
                <img src={leader.headshot} alt={`${leader.firstName.default} ${leader.lastName.default}`} />
                <p>{`${leader.firstName.default} ${leader.lastName.default} - ${leader.teamAbbrev}`}</p>
                <p>{`${leader.value}`}</p>
            </div>
        ));
    };

    return (
        <div>
            <button onClick={() => navigate('/player-stats')}>Go Back</button>
            <h1>Skater Leaders</h1>
            <button onClick={() => handleCategoryChange('points')}>Points</button>
            <button onClick={() => handleCategoryChange('assists')}>Assists</button>
            <button onClick={() => handleCategoryChange('goals')}>Goals</button>
            <button onClick={() => handleCategoryChange('toi')}>Time On Ice</button>
            <button onClick={() => handleCategoryChange('penaltyMins')}>Penalty Minutes</button>
            <button onClick={() => handleCategoryChange('faceoffLeaders')}>Faceoff Leaders</button>

            <div>{renderLeadersTable(selectedCategory)}</div>
        </div>
    );
};

export default SkaterLeaders;
