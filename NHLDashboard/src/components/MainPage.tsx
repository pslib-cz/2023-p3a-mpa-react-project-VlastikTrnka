import React from 'react';
import { Link } from 'react-router-dom';
import Style from './MainPage.module.css'; // Předpokládám, že máte definované styly

const MainPage: React.FC = () => {
  return (
    <div className={Style.homePage}>
      <header className={Style.homeHeader}>
        National Hockey League
      </header>
      <section className={Style.dashboardLinks}>
        <Link to="/dashboard" className={`${Style.dashboardLink} ${Style.nhlDashboard}`}>
          <span>NHL Dashboard</span>
        </Link>
        <Link to="/creative" className={`${Style.dashboardLink} ${Style.buildOwn}`}>
          <span>Build your own dashboard</span>
        </Link>
      </section>
    </div>
  );
};

export default MainPage;
