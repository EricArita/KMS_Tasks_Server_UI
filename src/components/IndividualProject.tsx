import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { projectsContextValue, selectedProjectContextValue } from "../contexts";
import { callApiServer } from "../helper/ApiHelper";

export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = projectsContextValue();
  // const { selectedProject, setSelectedProject } = selectedProjectContextValue();

  const deleteProject = async (projectId) => {
    const res = await callApiServer("DELETE", `project-management/project/${projectId}`);
    if (res.ok) {
      message.success("Delete project successfully");
      let newArray = projects.filter(proj => proj.id !== projectId);
      setProjects([...newArray]);
    }
    else {
      message.error(res.message);
    }
  };

  return (
    <>
      <span className="sidebar__dot"></span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
        tabIndex={0}
        role="button"
        aria-label="Confirm deletion of project"
      >
        <FaTrashAlt />
        <Modal
          key={"modal-delete-project"}
          visible={showConfirm}
          title="Delete project"
          footer={[
            <Button key="back" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>,
            <Button type="primary" onClick={() => deleteProject(project.id)}>
              Delete
            </Button>,
          ]}
        >
          <span>
            Are you use to remove this project?
          </span>
        </Modal>
      </span>
    </>
  );
};

IndividualProject.propTypes = {
  project: PropTypes.object.isRequired,
};
