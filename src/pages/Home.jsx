import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";

function Home() {
  const { doc: documents, error } = useCollection("projects");

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!documents || documents.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-2 text-red-400 font-medium ">
        Sizda hali loyiha mavjud emas:(
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center px-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1200px]">
        {documents.map((doc) => {
          let dueDate = "Not available";
          if (doc.dueTo) {
            dueDate = new Date(doc.dueTo).toLocaleDateString();
          }

          return (
            <Link
              to={`/about/${doc.id}`}
              key={doc.id}
              className="group card bg-gray-800 shadow-lg rounded-lg border mt-5 border-gray-700"
            >
              <div className="card-body p-6">
                <h2 className="card-title text-2xl font-semibold text-gray-300">
                  {doc.name || "Unnamed Project"}
                </h2>
                <p className="text-gray-400 mb-4">
                  Due Date:
                  <span className="font-medium text-blue-400 ml-2">
                    {dueDate}
                  </span>
                </p>
                <hr className="border-gray-600 mb-4" />
                <div className="flex -space-x-4">
                  {doc.assignedUsers && doc.assignedUsers.length > 0 ? (
                    doc.assignedUsers.map((u, index) => (
                      <div
                        key={index}
                        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700"
                      >
                        <img
                          src={u.photoURL || "/default-avatar.png"}
                          alt={`${u.name || "User"} avatar`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No users assigned</p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
