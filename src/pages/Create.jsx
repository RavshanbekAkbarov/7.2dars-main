import { Form, useActionData } from "react-router-dom";
import FormTextare from "../components/FormTextare";
import FormInput from "../components/FormInput";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

const animatedComponents = makeAnimated();

export async function action({ request }) {
  const form = await request.formData();
  const name = form.get("name");
  const description = form.get("description");
  const dueTo = Timestamp.formData(new Date())
  return { name, description, dueTo };
}

const UserOptions = [
  { value: "user1", label: "User1" },
  { value: "user2", label: "User2" },
  { value: "user3", label: "User3" },
];
const ProjectTypes = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "smm", label: "SMM" },
  { value: "marketin", label: "Marketing" },
];

function Create() {
  const createActionData = useActionData;
  const [assignetUsera, setAssignertUsers] = useState(null);
  const [projectTpe, setProjectTYpe] = useState(null);

  const selectUser = (user) => {
    setAssignertUsers(user);
  };
  const selectProjectType = (type) => {
    setProjectTYpe(type);
  };
  useEffect(() => {
    if (createActionData) {
      console.log({ ...createActionData, assignetUsera, projectTpe , createdAt:serverTimestamp(new Date())});
    }
  }, [createActionData]);
  return (
    <div>
      <h2 className="text-3xl font-semibold "> Create a new Project</h2>
      <Form
        method="post"
        className="flex flex-col gap-6 max-w-[500px] ml-8 mt-20 "
      >
        <FormInput
          label="Project name "
          type="text "
          placeholder="Write poject name here"
          name="name"
        />
        <FormTextare
          label="Project deskription "
          placeholder="type here"
          name="description"
        />
        <FormInput label="Set due to" type="date" name="dueTo" />
        <label className="form-control">
          <div className="label">
            <span className="label-text">Project type: </span>
          </div>
          <Select
            onChange={selectUser} 
            options={ProjectTypes}
            components={animatedComponents}
            isMulti
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Assign user: </span>
          </div>
          <Select
            onChange={selectProjectType}
            options={UserOptions}
            components={animatedComponents}
            isMulti
          />
        </label>

        <div className="flex justify-end">
          <button className=" btn btn-primary">Add Project</button>
        </div>
      </Form>
    </div>
  );
}

export default Create;
