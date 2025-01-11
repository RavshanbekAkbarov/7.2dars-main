import { Form, useActionData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

// Firestore
import { useFireStore } from "../hooks/useFireStore";

// Components
import FormInput from "../components/FormInput";
import FormTextare from "../components/FormTextare";
import { useCollection } from "../hooks/useCollection";

// Utilis
import { validateCreateData } from "../utilis";

export async function action({ request }) {
  const form = await request.formData();
  const name = form.get("name");
  const description = form.get("description");
  const dueTo = form.get("dueTo");

  return { name, description, dueTo };
}

const animatedComponents = makeAnimated();

const ProjectTypes = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "smm", label: "SMM" },
  { value: "marketing", label: "Marketing" },
];

function Create() {
  const navigate = useNavigate();
  const { addDocument } = useFireStore();
  const { doc } = useCollection("users");
  const createActionData = useActionData();
  const [assignedUsers, setAssignedUsers] = useState(null);
  const [projectType, setProjectType] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    setUsers(
      doc?.map((document) => {
        return { value: { ...document }, label: document.displayName };
      })
    );
  }, [doc]);

  const selectProjectType = (type) => {
    setProjectType(type);
  };

  const selectUser = (user) => {
    setAssignedUsers(user);
  };

  useEffect(() => {
    if (createActionData) {
      const { valid, errors } = validateCreateData({
        ...createActionData,
        assignedUsers,
        projectType,
      });

      if (valid) {
        addDocument("projects", {
          ...createActionData,
          assignedUsers,
          projectType,
          createdAt: serverTimestamp(new Date()),
        }).then(() => {
          navigate("/");
        });
      } else {
        setError(errors);
      }
    }
  }, [createActionData, assignedUsers, projectType]);

  return (
    <div className="max-w-[600px] bg-sky-500 rounded-2xl m-auto mt-10">
      <h2 className="text-3xl font-semibold text-center pt-5 text-white">
        Create a new Project
      </h2>
      <Form
        action=""
        method="post"
        className="flex flex-col gap-6 max-w-[500px] ml-8 mt-10"
      >
        <FormInput
          label="Project name"
          type="text"
          placeholder="Write project name here"
          name="name"
          error={error.name && "input-error"}
          errorText={error.name}
        />
        <FormTextare
          label="Project description"
          placeholder="Type here"
          name="description"
          error={error.description && "input-error"}
          errorText={error.description}
        />
        <FormInput
          label="Set due to"
          type="date"
          name="dueTo"
          error={error.dueTo && "input-error"}
          errorText={error.dueTo}
        />
        <label className="form-control">
          <div className="label">
            <span className="label-text text-white text-base">
              Project type:
            </span>
          </div>
          <Select
            onChange={selectProjectType}
            options={ProjectTypes}
            components={animatedComponents}
            className={`${error.projectType ? "border-red-500" : ""}`}
            isMulti
          />
          {error.projectType && (
            <p className="text-error text-sm mt-1">{error.projectType}</p>
          )}
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text text-white text-base">
              Assign user:
            </span>
          </div>
          <Select
            onChange={selectUser}
            options={users}
            components={animatedComponents}
            isMulti
            className={`${error.assignedUsers ? "border-red-500" : ""}`}
          />
          {error.assignedUsers && (
            <p className="text-error text-sm mt-1">{error.assignedUsers}</p>
          )}
        </label>
        <div className="flex justify-end">
          <button className=" btn btn-activ w-full mb-6">Add Project</button>
        </div>
      </Form>
    </div>
  );
}

export default Create;
