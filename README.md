# Bài tập ReactJS - Quản lý người dùng

## Chức năng
- Lấy dữ liệu từ MockAPI: `https://6a830a1ecb486d2434033464.mockapi.io/nguoidung`
- Hiển thị danh sách dạng lưới (Grid) hoặc bảng (Table).
- Tìm kiếm theo họ và tên.
- Sắp xếp tên tăng dần A → Z / giảm dần Z → A.
- Hiển thị tổng số và số kết quả tìm được; có nút tải lại dữ liệu.
- Có khu vực thông tin nhóm/thành viên.

**Lưu ý:** API người dùng hiện có các trường `id`, `hoten`, `diachi`, `quocgia`, `phone`, không có trường giá (`gia`/`price`). Vì vậy không thể sắp xếp theo giá với nguồn dữ liệu này. Nếu giảng viên bắt buộc sắp xếp giá, cần dùng API sản phẩm có trường giá hoặc bổ sung trường giá vào dữ liệu.

## Chạy trên VS Code
1. Cài Node.js bản LTS nếu máy chưa có.
2. Giải nén thư mục và mở thư mục `nguoidung-react` bằng VS Code.
3. Chọn **Terminal → New Terminal**.
4. Chạy:
   ```bash
   npm install
   npm run dev
   ```
5. Mở đường dẫn hiện trong terminal (thường là `http://localhost:5173`).

## Cập nhật thông tin nhóm
Mở `src/main.jsx`, sửa `GROUP_NAME` và mảng `MEMBERS` gần đầu file thành tên nhóm, họ tên và MSSV đúng của nhóm.

## Build để deploy
```bash
npm run build
```
Vite tạo thư mục `dist`.

### Deploy bằng Netlify
1. Đưa thư mục dự án lên GitHub (không cần đưa `node_modules`).
2. Đăng nhập Netlify và chọn thêm site mới từ GitHub.
3. Chọn repository của bài tập.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy, mở đường dẫn site được cấp và gửi link vào group lớp.

Có thể dùng Vercel tương tự: Import repository, Framework Preset `Vite`, Build Command `npm run build`, Output Directory `dist`.

## Chụp màn hình code trong VS Code
1. Mở `src/main.jsx` trong VS Code, chỉnh để thấy phần gọi API và xử lý tìm kiếm/sắp xếp.
2. Nhấn `Win + Shift + S`, kéo chọn cửa sổ VS Code và lưu ảnh.
3. Chụp thêm ảnh giao diện website chạy trong trình duyệt để minh họa kết quả.
