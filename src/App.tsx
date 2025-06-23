import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient"; 

export default function AdminDashboard() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchWorkers = async () => {
    const { data, error } = await supabase.from("worker_applications").select("*");
    if (error) {
      console.error("Lỗi lấy danh sách thợ:", error);
    } else {
      setWorkers(data);
    }
    setLoading(false);
  };

  fetchWorkers();
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
