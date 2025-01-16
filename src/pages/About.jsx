import { useParams, useNavigate } from "react-router-dom";
import { useFireStore } from "../hooks/useFireStore";
import { useState, useEffect } from "react";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { VscSend } from "react-icons/vsc";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

function About() {
  const [project, setProject] = useState(null);
  const { user } = useSelector((store) => store.user);
  const [content, setContent] = useState("");
  const { deleteDocument, updateDocument } = useFireStore("projects");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("Foydalanuvchi ma'lumotlari topilmadi!");
      return;
    }

    const message = {
      id: uuidv4(),
      content,
      createdAt: Timestamp.fromDate(new Date()),
      owner: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.uid,
      },
    };

    try {
      const existingComments = project.comments || [];
      await updateDocument(
        {
          comments: [...existingComments, message],
        },
        id
      );
      setContent("");
    } catch (error) {
      console.error("Error updating document:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "projects", id), (doc) => {
      if (doc.exists()) {
        setProject(doc.data());
      } else {
        console.error("Hujjat topilmadi!");
        setProject(null);
      }
    });

    return () => unsubscribe();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteDocument(id);
      console.log("Document deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting document:", error.message);
    }
  };

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <p className="text-2xl text-white font-semibold">
          Hujjat topilmadi yoki o‘chirildi!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-black text-white min-h-screen">
      {/* Project Details */}
      <div className="bg-gray-800 rounded-2xl p-5 shadow-lg">
        <div className="mb-5">
          <h2 className="text-3xl font-bold">{project.name}</h2>
          <h3 className="text-lg italic font-semibold text-gray-400">
            {project.projectType}
          </h3>
        </div>
        <p className="bg-gray-900 text-white p-4 rounded-md shadow-md">
          {project.description}
        </p>
        <hr className="my-5 border-t border-gray-600" />
        <div className="flex justify-end gap-4">
          <button
            className="py-2 px-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-500 transition-all"
            type="button"
            onClick={() => updateDocument({ completed: true }, id)}
          >
            Completed
          </button>
          <button
            className="py-2 px-4 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-500 transition-all"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Chat Section */}
      <div className="bg-gray-800 rounded-2xl p-5 shadow-lg">
        <h1 className="text-center text-4xl font-bold mb-10">Chat</h1>
        {Array.isArray(project.comments) && project.comments.length > 0 ? (
          project.comments.map((comment) => (
            <div
              key={comment.id}
              className={`flex ${
                user.uid === comment.owner.id ? "justify-end" : "justify-start"
              } mb-5`}
            >
              <div
                className={`p-4 rounded-xl text-white shadow-lg ${
                  user.uid === comment.owner.id ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                <div className="flex items-center mb-2">
                  <img
                    className="w-8 h-8 rounded-full mr-3"
                    src={comment.owner.photoURL}
                    alt={`${comment.owner.displayName}'s avatar`}
                  />
                  <span className="font-bold">{comment.owner.displayName}</span>
                </div>
                <p>{comment.content}</p>
                <time className="text-sm text-gray-300">
                  {new Date(
                    comment.createdAt.seconds * 1000
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
            </div>
          ))
        ) : (
          <h4 className="text-center text-gray-400 italic">No Comment Yet</h4>
        )}
        <form onSubmit={handleSubmit} className="mt-5">
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="w-full h-24 p-3 rounded-lg shadow-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write a message..."
            required
          ></textarea>
          <button
            type="submit"
            className="w-full mt-3 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-500 transition-all"
          >
            Send <VscSend className="inline-block ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default About;
