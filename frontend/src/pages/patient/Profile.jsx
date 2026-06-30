import { useAuth } from "../../pages/context/AuthContext.jsx";
import { getImageUrl } from "../../utils/helper.js";

function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Patient Profile</h2>
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-32 h-32 shrink-0">
          <img
            src={user.profileImage ? getImageUrl(user.profileImage) : "https://ui-avatars.com/api/?name=" + user.name + "&background=10b981&color=fff"}
            alt={user.name}
            className="w-full h-full object-cover rounded-full border-4 border-green-100"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
          <p className="text-gray-600 mb-1">Age: {user.age}</p>
          <p className="text-gray-600 mb-1">Email: {user.email}</p>
          <p className="text-gray-600">Phone: {user.phone}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h4 className="font-semibold text-blue-800 mb-3">History of Surgery</h4>
          {user.historyOfSurgery && user.historyOfSurgery.length > 0 ? (
            <ul className="list-disc pl-5 text-gray-700">
              {user.historyOfSurgery.map((s, i) => (
                <li key={i} className="mb-1">{s}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No surgery history recorded.</p>
          )}
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <h4 className="font-semibold text-red-800 mb-3">History of Illness</h4>
          {user.historyOfIllness && user.historyOfIllness.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.historyOfIllness.map((illness, i) => (
                <span key={i} className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded border border-red-200">
                  {illness}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No illness history recorded.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
