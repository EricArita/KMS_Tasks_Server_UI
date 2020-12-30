import React, { useState } from "react";
import PropTypes from "prop-types";
import { projectsContextValue } from "../contexts";
import { IndividualProject } from "./IndividualProject";
import { AddProject } from "./AddProject";

export const Projects = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { projects, setProjects } = projectsContextValue();

  return (
    <ul className="sidebar__projects">
      {projects &&
        projects.map(
          (project) =>
            project.parent === null && (
              <li
                key={project.id}
                data-testid="project-action-parent"
                data-doc-id={project.docId}
                className={
                  active === project.id
                    ? "active sidebar__project"
                    : "sidebar__project"
                }
              >
                <div
                  role="button"
                  data-testid="project-action"
                  tabIndex={0}
                  aria-label={`Select ${project.name} as the task project`}
                  onClick={() => {
                    setActive(project.id);
                    // setSelectedProject(project.id);
                  }}
                >
                  <IndividualProject project={project} />
                </div>
              </li>
            )
        )}
      <li className="sidebar__addProject">
        <AddProject />
      </li>
    </ul>
  );
};

Projects.propTypes = {
  activeValue: PropTypes.number,
};
