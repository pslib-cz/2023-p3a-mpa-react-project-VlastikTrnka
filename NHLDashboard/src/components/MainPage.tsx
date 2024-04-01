import React from 'react';
import Style from './MainPage.module.css';

const MainPage = () => {
  return (
    <div className={Style.homePage}>
      <header className={Style.homeHeader}>
        National Hockey League
      </header>
      <section className={Style.dashboardLinks}>
        <div className={Style.dashboardLink + ' ' + Style.buildOwn}>
          <span>Build your own dashboard</span>
        </div>
        <div className={Style.dashboardLink + ' ' + Style.nhlDashboard}>
          <span>NHL Dashboard</span>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
