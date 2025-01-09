import { useCollection } from "../hooks/useCollection";

function OnlineUsersr() {
  const { doc } = useCollection("users");

  return (
    <div className="w-[350px] bg-indigo-600  p-10 text-white">
      <ul className="space-y-4">
        {doc &&
          doc.map((doc) => {
            return (
              <li
                key={doc.id}
                className={`flex items-center gap-2 p-3 rounded-2xl ${
                  doc.online
                    ? "bg-green-100 border-2 border-green-500 text-green-800"
                    : "bg-red-100 border-2 border-red-500 text-red-800"
                }`}
              >
                <div className="w-10 h-10 overflow-hidden rounded-full border-2 border-white">
                  <img
                    src={doc.photoURL}
                    alt={`${doc.displayName} profili`}
                    className="object-cover w-full h-full"
                  />
                </div>

                <p>{doc.displayName}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default OnlineUsersr;
