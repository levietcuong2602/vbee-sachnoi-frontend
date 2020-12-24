const methodOfPayments = [
  {
    id: 1,
    name: "<p>Chuyển khoản trực tiếp</p><p> cho Vbee</p>",
    icon: "/images/payment/b1.png",
    description:
      "Quý Khách có thể chuyển khoản bằng Internet Banking, tại máy ATM hoặc Quầy giao dịch ngân hàng, hoặc chuyển khoản qua điện thoại. * Lưu ý: Vui lòng chuyển tiền chính xác theo thông tin tài khoản ngân hàng và nội dung chuyển khoản. Sẽ được hiển thị sau khi quý khách hoàn click Xác nhận đặt hàng bên dưới - Đơn hàng được thanh toán tại máy ATM, vì không thể ghi chú nội dung thanh toán nên qúy khách vui lòng thông báo qua email hoặc gọi trực tiếp tổng đài để được hỗ trợ. - Đơn hàng của quý khách chỉ được xác nhận thanh toán sau khi nhận được thông báo từ Ngân hàng với nội dung thanh toán đầy đủ. Bất cập: một số Ngân hàng không hỗ trợ kiểm tra sau 19h00: Agribank, Đông Á, Sacombank, Vietinbank,...",
    content:
      "<p><strong>Th&ocirc;ng tin chuyển khoản:</strong></p>\r\n<p><strong>Hà Nội:</strong>&nbsp; Hà Nội: Số 101-Tòa nhà B1, đường Nguyễn Khánh Toàn, P. Quan Hoa, Q. Cầu Giấy.</p>\r\n            \r\n<p><strong>TP. Hồ Chí Minh: </strong> Số 3/40 Thích Quảng Đức, P.3, Q. Phú Nhuận</p>\r\n\r\n<p><strong>Điện thoại:</strong>&nbsp;0965277888</p>\r\n\r\n<p><strong>Tên tài khoản: </strong>CÔNG TY CỔ PHẦN DỊCH VỤ VÀ GIẢI PHÁP XỬ LÝ DỮ LIỆU VBEE</p>\r\n            \r\n<p><strong>Số tài khoản: </strong>19133255559010</p>\r\n\r\n<p><strong>Ngân hàng: </strong>TechcomBank - CN Hà Nội</p>",
    activeName: "zero",
    isBank: 1,
    bankOnline: 0,
    published: 1
  },
  {
    id: 2,
    name: "<p>Thanh toán bằng thẻ ATM/</p><p> Internet banking</p>",
    icon: "/images/payment/b2.png",
    description:
      "Quý Khách cần đăng ký Internet Banking để sử dụng hình thức thanh toán này",
    content:
      "<p><strong>Th&ocirc;ng tin chuyển khoản:</strong></p>\r\n<p><strong>Hà Nội:</strong>&nbsp; Hà Nội: Số 101-Tòa nhà B1, đường Nguyễn Khánh Toàn, P. Quan Hoa, Q. Cầu Giấy.</p>\r\n            \r\n<p><strong>TP. Hồ Chí Minh: </strong> Số 3/40 Thích Quảng Đức, P.3, Q. Phú Nhuận</p>\r\n\r\n<p><strong>Điện thoại:</strong>&nbsp;0965277888</p>\r\n\r\n<p><strong>Tên tài khoản: </strong>CÔNG TY CỔ PHẦN DỊCH VỤ VÀ GIẢI PHÁP XỬ LÝ DỮ LIỆU VBEE</p>\r\n            \r\n<p><strong>Số tài khoản: </strong>19133255559010</p>\r\n\r\n<p><strong>Ngân hàng: </strong>TechcomBank - CN Hà Nội</p>",
    activeName: "first",
    isBank: 1,
    bankOnline: 2,
    published: 1
  },
  {
    id: 3,
    name: "<p>Thanh toán bằng thẻ card,</p><p> Master card</p>",
    icon: "/images/payment/b3.png",
    description:
      "Thông tin thẻ của quý khách được mã hóa, bảo mật an toàn bởi tổ chức thẻ tín dụng lớn nhất thế giới",
    content:
      "<p><strong>Th&ocirc;ng tin chuyển khoản:</strong></p>\r\n<p><strong>Hà Nội:</strong>&nbsp; Hà Nội: Số 101-Tòa nhà B1, đường Nguyễn Khánh Toàn, P. Quan Hoa, Q. Cầu Giấy.</p>\r\n            \r\n<p><strong>TP. Hồ Chí Minh: </strong> Số 3/40 Thích Quảng Đức, P.3, Q. Phú Nhuận</p>\r\n\r\n<p><strong>Điện thoại:</strong>&nbsp;0965277888</p>\r\n\r\n<p><strong>Tên tài khoản: </strong>CÔNG TY CỔ PHẦN DỊCH VỤ VÀ GIẢI PHÁP XỬ LÝ DỮ LIỆU VBEE</p>\r\n            \r\n<p><strong>Số tài khoản: </strong>19133255559010</p>\r\n\r\n<p><strong>Ngân hàng: </strong>TechcomBank - CN Hà Nội</p>",
    activeName: "second",
    isBank: 0,
    bankOnline: 1,
    published: 1
  },
  {
    id: 4,
    name: "<p>Thanh toán trực tiếp tại</p><p> văn phòng Vbee</p>",
    icon: "/images/payment/b4.png",
    description: "Quý khách có thể thanh toán trực tiếp tại các chi nhánh",
    content:
      "<p><strong>Th&ocirc;ng tin chuyển khoản:</strong></p>\r\n<p><strong>Hà Nội:</strong>&nbsp; Hà Nội: Số 101-Tòa nhà B1, đường Nguyễn Khánh Toàn, P. Quan Hoa, Q. Cầu Giấy.</p>\r\n            \r\n<p><strong>TP. Hồ Chí Minh: </strong> Số 3/40 Thích Quảng Đức, P.3, Q. Phú Nhuận</p>\r\n\r\n<p><strong>Điện thoại:</strong>&nbsp;0965277888</p>\r\n\r\n<p><strong>Tên tài khoản: </strong>CÔNG TY CỔ PHẦN DỊCH VỤ VÀ GIẢI PHÁP XỬ LÝ DỮ LIỆU VBEE</p>\r\n            \r\n<p><strong>Số tài khoản: </strong>19133255559010</p>\r\n\r\n<p><strong>Ngân hàng: </strong>TechcomBank - CN Hà Nội</p>",
    activeName: "four",
    isBank: 0,
    bankOnline: 0,
    published: 1
  },
  {
    id: 5,
    name: "<p>Thanh toán trực tiếp tại</p><p> văn phòng của Quý khách</p>",
    icon: "/images/payment/b5.png",
    description:
      "Nhân viên sẽ đến thu tiền tại địa chỉ quý khách yêu cầu, hình thức này chỉ áp dụng cho TP.HCM và Hà Nội",
    content:
      "<p><strong>Th&ocirc;ng tin chuyển khoản:</strong></p>\r\n<p><strong>Hà Nội:</strong>&nbsp; Hà Nội: Số 101-Tòa nhà B1, đường Nguyễn Khánh Toàn, P. Quan Hoa, Q. Cầu Giấy.</p>\r\n            \r\n<p><strong>TP. Hồ Chí Minh: </strong> Số 3/40 Thích Quảng Đức, P.3, Q. Phú Nhuận</p>\r\n\r\n<p><strong>Điện thoại:</strong>&nbsp;0965277888</p>\r\n\r\n<p><strong>Tên tài khoản: </strong>CÔNG TY CỔ PHẦN DỊCH VỤ VÀ GIẢI PHÁP XỬ LÝ DỮ LIỆU VBEE</p>\r\n            \r\n<p><strong>Số tài khoản: </strong>19133255559010</p>\r\n\r\n<p><strong>Ngân hàng: </strong>TechcomBank - CN Hà Nội</p>",
    activeName: "five",
    isBank: 0,
    bankOnline: 0,
    published: 1
  }
];
export default methodOfPayments;
