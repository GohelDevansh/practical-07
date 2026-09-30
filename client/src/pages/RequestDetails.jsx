import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function RequestDetails() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    loadRequest();
  }, []);

  const loadRequest = async () => {
    try {
      const res = await api.get(`/requests/${id}`);
      setRequest(res.data.request);
    } catch (err) {
      console.error(err);
    }
  };

  if (!request) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/hospital">← Back</Link>

      <h1>{request.patientName}</h1>

      <p>Blood Group: {request.bloodGroup}</p>
      <p>Status: {request.status}</p>
      <p>Urgency: {request.urgency}</p>
      <p>Units Needed: {request.unitsNeeded}</p>
      <p>City: {request.city}</p>
    </div>
  );
}

export default RequestDetails;