import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ProjectsContext = createContext({});
export const ProjectsContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const projectsContextValue = () => useContext(ProjectsContext);

ProjectsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
