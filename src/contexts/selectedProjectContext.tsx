import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SelectedProjectContext = createContext({});
export const SelectedProjectContextProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState('DASHBOARD');

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const selectedProjectContextValue = () => useContext(SelectedProjectContext);

SelectedProjectContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
