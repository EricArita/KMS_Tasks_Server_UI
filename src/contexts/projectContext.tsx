import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { callApiServer } from "../helper/ApiHelper";

export const ProjectsContext = createContext({});
export const ProjectsContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    let res = await callApiServer("GET", "project-management/projects");
    setProjects(res ? res.data : undefined);
  }

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const projectsContextValue = () => useContext<any>(ProjectsContext);

ProjectsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
