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

const animatedComponents = makeAnimated();

const ProjectTypes = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "smm", label: "SMM" },
  { value: "marketing", label: "Marketing" },
];

export async function action({ request }) {
  const form = await request.formData();
  const name = form.get("name");
  const description = form.get("description");
  const dueTo = form.get("dueTo");

  return { name, description, dueTo };
}

function Create() {
  const navigate = useNavigate();
  const { addDocument } = useFireStore("projects");
  const { doc } = useCollection("users");
  const createActionData = useActionData();
  const [assignedUsers, setAssignedUsers] = useState(null);
  const [projectType, setProjectType] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    if (doc) {
      setUsers(
        doc.map((user) => ({
          value: user,
          label: `${user.displayName} (${user.email})`,
        }))
      );
    }
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
        addDocument({
          ...createActionData,
          assignedUsers: assignedUsers?.map((u) => u.value),
          projectType: projectType?.map((type) => type.value),
          createdAt: serverTimestamp(),
        }).then(() => {
          toast.success("Project added successfully!");
          navigate("/");
        });
      } else {
        setError(errors);
      }
    }
  }, [createActionData, assignedUsers, projectType]);

  return (
    <div className="max-w-[600px] bg-gray-900 text-white rounded-2xl m-auto mt-10 shadow-xl p-6">
      <h2 className="text-3xl font-bold text-center pb-4 border-b border-gray-600">
        Create a New Project
      </h2>
      <Form action="" method="post" className="flex flex-col gap-6 mt-6">
        <FormInput
          label="Project Name"
          type="text"
          placeholder="Enter project name"
          name="name"
          error={error.name && "input-error"}
          errorText={error.name}
          className="bg-gray-800 text-white border border-gray-700 rounded-lg p-3"
        />
        <FormTextare
          label="Project Description"
          placeholder="Type project description"
          name="description"
          error={error.description && "input-error"}
          errorText={error.description}
          className="bg-gray-800 text-white border border-gray-700 rounded-lg p-3"
        />
        <FormInput
          label="Set Due Date"
          type="date"
          name="dueTo"
          error={error.dueTo && "input-error"}
          errorText={error.dueTo}
          className="bg-gray-800 text-white border border-gray-700 rounded-lg p-3"
        />
        <label className="form-control">
          <span className="label-text text-base mb-1 block">Project Type:</span>
          <Select
            onChange={selectProjectType}
            options={ProjectTypes}
            components={animatedComponents}
            isMulti
            className="text-black rounded-lg"
          />
          {error.projectType && (
            <p className="text-red-500 text-sm mt-1">{error.projectType}</p>
          )}
        </label>
        <label className="form-control">
          <span className="label-text text-base mb-1 block">Assign Users:</span>
          <Select
            onChange={selectUser}
            options={users}
            components={animatedComponents}
            isMulti
            className="text-black  rounded-lg"
          />
          {error.assignedUsers && (
            <p className="text-red-500 text-sm mt-1">{error.assignedUsers}</p>
          )}
        </label>
        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-blue-500 transition-all mt-4">
          Add Project
        </button>
      </Form>
    </div>
  );
}

export default Create;
