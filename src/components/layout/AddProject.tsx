import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import PropTypes from "prop-types";
import { projectsContextValue } from "../../contexts/projectContext";
import { callApiServer } from "../../helper/ApiHelper";

export const AddProject = ({ shouldShow = false }) => {
  const [projectName, setProjectName] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const { projects, setProjects } = projectsContextValue();
  const [form] = Form.useForm();

  const addProject = async () => {
    const fieldsValue = await form.validateFields();
    const res = await callApiServer("POST", "project-management/project", fieldsValue);
  };

  return (
    <div>
      <span>+</span>
      <span onClick={() => setVisibleModal(true)}>Add project</span>
      <Modal
        key={"modal-add-project"}
        visible={visibleModal}
        title="Add new project"
        onOk={addProject}
        onCancel={() => setVisibleModal(false)}
        footer={[
          <Button key="back" onClick={() => setVisibleModal(false)}>
            Cancel
          </Button>,
          <Button type="primary" loading={showSpinner} onClick={addProject}>
            Add
          </Button>,
        ]}
      >
        <div>
          <Form form={form} key={"login-form"}>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input project name !" },
              ]}
            >
              <Input
                placeholder="Project name"
                type="text"
                style={{ height: "37px" }}
                allowClear
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

AddProject.propTypes = {
  shouldShow: PropTypes.bool,
};
