import { useEffect, useState } from "react";
import { getAllDoctors } from "../../services/doctorApi.js";
import DoctorCard from "../../components/DoctorCard.jsx";
import Loader from "../../components/Loader.jsx";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await getAllDoctors();
      setDoctors(res.data.doctors);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Our Doctors</h2>
      {doctors.length === 0 ? (
        <p className="text-gray-500">No doctors available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctors.map((doc) => (
            <DoctorCard key={doc._id} doctor={doc} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Doctors;
