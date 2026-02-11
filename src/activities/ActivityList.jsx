import { useState } from "react";
import { useAuth } from "../AuthContext.jsx";
import { useMutation } from "../context/ApiContext.jsx";


export default function ActivityList({ activities }) {
  const { token } = useAuth();
  const [error, setError] = useState("");

  const { mutate: deleteActivity } = useMutation("/activities", {
    method: "DELETE",
    tagsToInvalidate: ["activities"],
  });

  async function handleDelete(id) {
    setError("");

    try {
      await deleteActivity(`/activities/${id}`);
    } catch (err) {
      setError("You are unable to delete this activity.");
    }
  }
  return (
    <>
    {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {activities.map((activity) => (
          <li key={activity.id} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span>{activity.name}</span>

            {/* Only logged-in users see delete */}
            {token && (
              <button
                onClick={() => handleDelete(activity.id)}
                disabled={deleting}
              >
                Delete
              </button>
          )}
        </li>
      ))}
    </ul>
    </>
  );
}
