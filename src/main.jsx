import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Search, Users, LayoutGrid, Table2, ArrowUpDown, RefreshCw, MapPin, Phone, Globe, UserRound } from "lucide-react";
import "./style.css";

const API_URL = "https://6a830a1ecb486d2434033464.mockapi.io/nguoidung";

// Thay các thông tin bên dưới bằng thông tin nhóm của bạn trước khi nộp.
const GROUP_NAME = "NHÓM ...";
const MEMBERS = ["Thành viên 1 - MSSV: ...", "Thành viên 2 - MSSV: ..."];

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadUsers() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Không thể tải dữ liệu từ máy chủ.");
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Tải dữ liệu thất bại. Hãy kiểm tra kết nối Internet rồi thử tải lại.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadUsers(); }, []);

  const filteredUsers = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase("vi");
    return [...users]
      .filter((user) => (user.hoten || "").toLocaleLowerCase("vi").includes(keyword))
      .sort((a, b) => {
        const nameA = (a.hoten || "").toLocaleLowerCase("vi");
        const nameB = (b.hoten || "").toLocaleLowerCase("vi");
        return sortOrder === "asc" ? nameA.localeCompare(nameB, "vi") : nameB.localeCompare(nameA, "vi");
      });
  }, [users, search, sortOrder]);

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand"><span className="brand-icon"><Users size={22} /></span><span>USER<span className="brand-light">HUB</span></span></div>
        <div className="top-label">BÀI TẬP FRONTEND REACT</div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">DANH BẠ HỆ THỐNG</p>
            <h1>Quản lý người dùng</h1>
            <p className="subtitle">Tra cứu, lọc và sắp xếp thông tin người dùng trong một giao diện đơn giản.</p>
          </div>
          <div className="hero-symbol"><Users size={54} strokeWidth={1.5} /></div>
        </section>

        <section className="stats-row">
          <div className="stat-card"><div className="stat-icon"><Users size={20}/></div><div><span className="stat-label">Tổng người dùng</span><strong>{users.length}</strong></div></div>
          <div className="stat-card"><div className="stat-icon pale"><Search size={20}/></div><div><span className="stat-label">Kết quả tìm kiếm</span><strong>{filteredUsers.length}</strong></div></div>
        </section>

        <section className="directory">
          <div className="section-heading">
            <div><h2>Danh sách người dùng</h2><p>Dữ liệu được lấy trực tiếp từ MockAPI.</p></div>
            <button className="refresh-btn" onClick={loadUsers} disabled={loading}><RefreshCw size={16} className={loading ? "spin" : ""}/> Làm mới</button>
          </div>

          <div className="toolbar">
            <label className="searchbox"><Search size={19}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm theo họ và tên..." aria-label="Tìm theo họ và tên"/>{search && <button className="clear-btn" onClick={() => setSearch("")} aria-label="Xóa tìm kiếm">×</button>}</label>
            <div className="toolbar-actions">
              <button className="sort-btn" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}><ArrowUpDown size={16}/>{sortOrder === "asc" ? "Tên A → Z" : "Tên Z → A"}</button>
              <div className="view-toggle">
                <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} aria-label="Hiển thị dạng lưới"><LayoutGrid size={17}/></button>
                <button className={view === "table" ? "active" : ""} onClick={() => setView("table")} aria-label="Hiển thị dạng bảng"><Table2 size={17}/></button>
              </div>
            </div>
          </div>

          {loading ? <div className="message"><span className="loader"></span><p>Đang tải danh sách người dùng...</p></div> :
           error ? <div className="message error"><p>{error}</p><button onClick={loadUsers}>Thử lại</button></div> :
           filteredUsers.length === 0 ? <div className="message"><Search size={30}/><p>Không tìm thấy người dùng phù hợp.</p><span>Thử nhập một tên khác nhé.</span></div> :
           view === "grid" ? (
            <div className="user-grid">
              {filteredUsers.map((user) => <article className="user-card" key={user.id}>
                <div className="card-top"><div className="avatar">{(user.hoten || "?").trim().charAt(0).toLocaleUpperCase("vi")}</div><span className="user-id">ID {user.id}</span></div>
                <h3>{user.hoten || "Chưa có tên"}</h3>
                <div className="user-detail"><MapPin size={16}/><span>{user.diachi || "Chưa có địa chỉ"}</span></div>
                <div className="user-detail"><Globe size={16}/><span>{user.quocgia || "Chưa có quốc gia"}</span></div>
                <div className="user-detail"><Phone size={16}/><span>{user.phone || "Chưa có số điện thoại"}</span></div>
              </article>)}
            </div>
           ) : (
            <div className="table-wrap"><table><thead><tr><th>ID</th><th>Họ và tên</th><th>Địa chỉ</th><th>Quốc gia</th><th>Điện thoại</th></tr></thead><tbody>
              {filteredUsers.map((user) => <tr key={user.id}><td><span className="table-id">{user.id}</span></td><td className="name-cell"><span className="mini-avatar">{(user.hoten || "?").trim().charAt(0).toLocaleUpperCase("vi")}</span>{user.hoten || "Chưa có tên"}</td><td>{user.diachi || "—"}</td><td>{user.quocgia || "—"}</td><td>{user.phone || "—"}</td></tr>)}
            </tbody></table></div>
           )}
          <div className="list-footer"><span>Đang hiển thị <b>{filteredUsers.length}</b> / <b>{users.length}</b> người dùng</span><span className="live-status"><i></i> Kết nối dữ liệu</span></div>
        </section>

        <section className="group-panel">
          <div className="group-heading"><div className="group-icon"><UserRound size={21}/></div><div><h2>Thông tin nhóm thực hiện</h2><p>Vui lòng cập nhật thông tin thật trước khi nộp bài.</p></div></div>
          <div className="group-info"><div><span className="info-label">Tên nhóm</span><strong>{GROUP_NAME}</strong></div><div><span className="info-label">Thành viên</span>{MEMBERS.map((member, index) => <strong key={index} className="member">{member}</strong>)}</div></div>
        </section>
        <footer>© 2026 UserHub · Bài tập thực hành ReactJS</footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
