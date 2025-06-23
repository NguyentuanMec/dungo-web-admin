import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_SUPABASE_URL + "/rest/v1/worker_applications", {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        Authorization: "Bearer " + import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWorkers(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 md:px-20">
      <h1 className="text-3xl font-bold mb-6">📋 Danh sách Thợ Đăng Ký</h1>
      <div className="bg-white p-4 rounded shadow">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Khu vực</th>
                <th>Kỹ năng</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((w) => (
                <tr key={w.id}>
                  <td>{w.full_name}</td>
                  <td>{w.phone_number}</td>
                  <td>{w.location}</td>
                  <td>{w.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
