import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, Content } from "../components/layout";
// import "../styles/header.scss";
import { ProjectsContextProvider, SelectedProjectContextProvider } from '../contexts';

const DashboardPage = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  return (
    <SelectedProjectContextProvider>
      <ProjectsContextProvider>
        <main
          data-testid="application"
          className={darkMode ? 'darkmode' : undefined}
        >
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Content />
        </main>
      </ProjectsContextProvider>
    </SelectedProjectContextProvider>
  );
};

DashboardPage.propTypes = {
  darkModeDefault: PropTypes.bool,
};

export default DashboardPage;