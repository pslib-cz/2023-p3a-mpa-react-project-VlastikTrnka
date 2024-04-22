import React, { useState, useContext } from 'react';
import { DashboardContext } from '../Provider/NHLContext';
import { useNavigate } from 'react-router-dom';

type GoalieCategory = 'savePctg' | 'shutouts' | 'wins' | 'goalsAgainstAverage';

const GoalieLeaders = () => {
    const [selectedCategory, setSelectedCategory] = useState<GoalieCategory>('wins');
    const { data } = useContext(DashboardContext);
    const navigate = useNavigate();
    const goalieLeaders = data.topgoalies;

    const handleCategoryChange = (category: GoalieCategory) => {
        setSelectedCategory(category);
    };

    const renderLeadersTable = (category: GoalieCategory) => {
        const leaders = goalieLeaders[category];
        return leaders.map((leader) => (
            <div key={leader.id}>
                <img src={leader.headshot} alt={`${leader.firstName.default} ${leader.lastName.default}`} />
                <p>{`${leader.firstName.default} ${leader.lastName.default} - ${leader.teamAbbrev}`}</p>
                <p>{`Value: ${leader.value}`}</p>
            </div>
        ));
    };

    return (
        <div>
            <button onClick={() => navigate('/player-stats')}>Go Back</button>
            <h1>Goalie Leaders</h1>
            
            <button onClick={() => handleCategoryChange('savePctg')}>Save Percentage</button>
            <button onClick={() => handleCategoryChange('shutouts')}>Shutouts</button>
            <button onClick={() => handleCategoryChange('wins')}>Wins</button>
            <button onClick={() => handleCategoryChange('goalsAgainstAverage')}>Goals Against Average</button>

            <div>{renderLeadersTable(selectedCategory)}</div>
        </div>
    );
};

export default GoalieLeaders;
