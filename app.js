let products = [
  {
    productCode: "PRD-001",
    productName: "Điện Thoại Nova Xl",
    brand: "Nova Mobile",
    stockQuantity: 120,
    warrantyMonths: 12,
  },
  {
    productCode: "PRD-002",
    productName: "Máy tính bảng Nova Tab",
    brand: "Nova Mobile",
    stockQuantity: 35,
    warrantyMonths: 24,
  },
  {
    productCode: "PRD-003",
    productName: "Tai nghe Sky Buds",
    brand: "Bluesky Audio",
    stockQuantity: 80,
    warrantyMonths: 6,
  },
];

function validateProductCode(code) {
  if (code === null) {
    return "Hủy thao tác";
  }

  let upperCode = code.trim().toUpperCase();

  if (upperCode === "") {
    return "Lỗi: Mã sản phẩm không được để trống";
  }

  if (!/^PRD-\d{3}$/.test(upperCode)) {
    return "Lỗi: Sai tiền tố PRD- ";
  }

  if (findProductIndex(upperCode) !== -1) {
    return "Lỗi: Mã sản phẩm đã tồn tại";
  }

  return "";
}

function findProductIndex(code) {
  if (code === null || !code) {
    return -1;
  }

  let targetCode = code.trim().toUpperCase();

  for (let i = 0; i < products.length; i++) {
    if (products[i].productCode === targetCode) {
      return i;
    }
  }

  return -1;
}

function normalizeText(rawText) {
  if (!rawText) {
    return "";
  }

  let words = rawText.trim().toLowerCase().split(/\s+/);

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function inputIntegerInRange(message, min, max) {
  while (true) {
    let input = prompt(message);

    if (input === null) {
      return null;
    }

    let number = Number(input.trim());

    if (
      input.trim() !== "" &&
      Number.isInteger(number) &&
      number >= min &&
      number <= max
    ) {
      return number;
    }

    alert(`Vui lòng nhập số nguyên trong khoảng ${min} đến ${max}`);
  }
}

function displayProducts(list) {
  if (!list || list.length === 0) {
    console.log("Danh sách sản phẩm trống");
    return;
  }

  list.forEach((element, index) => {
    console.log(
      `${index + 1}. ${element.productCode}
${element.productName}
      Hãng sản xuất: ${element.brand}
      Số lượng tồn kho: ${element.stockQuantity}
      Thời gian bảo hành: ${element.warrantyMonths} tháng`,
    );
  });

  console.log(`Tổng cộng: ${list.length} sản phẩm`);
}

function handleCreateProduct() {
  let productCode = prompt("Nhập mã sản phẩm: ");

  if (productCode === null) {
    return;
  }

  productCode = productCode.trim().toUpperCase();

  let codeError = validateProductCode(productCode);

  if (codeError !== "") {
    alert(codeError);
    return;
  }

  let productName = prompt("Nhập tên sản phẩm: ");

  if (productName === null) {
    return;
  }

  productName = normalizeText(productName);

  if (productName === "") {
    alert("Tên sản phẩm không được để trống");
    return;
  }

  let brand = prompt("Nhập hãng sản xuất: ");

  if (brand === null) {
    return;
  }

  brand = normalizeText(brand);

  if (brand === "") {
    alert("Hãng sản xuất không được để trống");
    return;
  }

  // Giới hạn tồn kho từ 0 đến 500
  let stockQuantity = inputIntegerInRange(
    "Nhập số lượng tồn kho (0 - 500): ",
    0,
    500,
  );

  if (stockQuantity === null) {
    return;
  }

  // Giới hạn bảo hành từ 0 đến 36 tháng
  let warrantyMonths = inputIntegerInRange(
    "Nhập thời gian bảo hành (tháng, 0 - 36): ",
    0,
    36,
  );

  if (warrantyMonths === null) {
    return;
  }

  let newProduct = {
    productCode,
    productName,
    brand,
    stockQuantity,
    warrantyMonths,
  };

  products.push(newProduct);

  alert("Thêm sản phẩm thành công");
  console.log("Sản phẩm vừa thêm:", newProduct);
}

function handleUpdateProduct() {
  let productCode = prompt("Nhập mã sản phẩm cần cập nhật: ");

  if (productCode === null) {
    return;
  }

  let index = findProductIndex(productCode);

  if (index === -1) {
    alert(`Không tìm thấy sản phẩm có mã ${productCode.trim().toUpperCase()}`);
    return;
  }

  let product = products[index];

  let newProductName = prompt(
    `Nhập tên sản phẩm mới (hiện tại: ${product.productName}):`,
  );

  if (newProductName === null) {
    return;
  }

  newProductName = normalizeText(newProductName);

  if (newProductName === "") {
    alert("Tên sản phẩm không được để trống");
    return;
  }

  let newBrand = prompt(`Nhập hãng sản xuất mới (hiện tại: ${product.brand}):`);

  if (newBrand === null) {
    return;
  }

  newBrand = normalizeText(newBrand);

  if (newBrand === "") {
    alert("Hãng sản xuất không được để trống");
    return;
  }

  // Giới hạn tồn kho mới từ 0 đến 500
  let newStockQuantity = inputIntegerInRange(
    `Nhập số lượng tồn kho mới (hiện tại: ${product.stockQuantity}, 0 - 500):`,
    0,
    500,
  );

  if (newStockQuantity === null) {
    return;
  }

  // Giới hạn bảo hành mới từ 0 đến 36 tháng
  let newWarrantyMonths = inputIntegerInRange(
    `Nhập thời gian bảo hành mới (hiện tại: ${product.warrantyMonths} tháng, 0 - 36):`,
    0,
    36,
  );

  if (newWarrantyMonths === null) {
    return;
  }

  product.productName = newProductName;
  product.brand = newBrand;
  product.stockQuantity = newStockQuantity;
  product.warrantyMonths = newWarrantyMonths;

  alert("Cập nhật sản phẩm thành công");
  console.log("Sản phẩm sau cập nhật:", product);
}

function handleDeleteProduct() {
  let productCode = prompt("Nhập mã sản phẩm cần xóa: ");

  if (productCode === null) {
    return;
  }

  let index = findProductIndex(productCode);

  if (index === -1) {
    alert(`Không tìm thấy sản phẩm có mã ${productCode.trim().toUpperCase()}`);
    return;
  }

  let confirmDelete = prompt(
    `Bạn có chắc muốn xóa sản phẩm ${products[index].productName} không? (Y/N):`,
  );

  if (confirmDelete === null || confirmDelete.trim().toLowerCase() !== "y") {
    alert("Đã hủy thao tác xóa");
    return;
  }

  products.splice(index, 1);

  alert(`Xóa thành công, còn ${products.length} sản phẩm`);

  console.log(`Xóa thành công, còn ${products.length} sản phẩm`);
  displayProducts(products);
}

function handleSearchProduct() {
  let keyword = prompt("Nhập hãng sản xuất cần tìm kiếm: ");

  if (keyword === null) {
    return;
  }

  keyword = keyword.trim();

  if (keyword === "") {
    alert("Từ khóa tìm kiếm không được để trống");
    return;
  }

  let results = products.filter((element) =>
    element.brand.toLowerCase().includes(keyword.toLowerCase()),
  );

  if (results.length === 0) {
    alert(`Không tìm thấy sản phẩm thuộc hãng "${keyword}"`);
    return;
  }

  console.log(`Kết quả tìm kiếm theo hãng "${keyword}":`);
  displayProducts(results);

  alert(`Tìm thấy ${results.length} sản phẩm`);
}

function main() {
  let choice;

  do {
    choice = prompt(`
    ===========================================
        HỆ THỐNG QUẢN LÝ SẢN PHẨM CỬA HÀNG TEZONE
    ===========================================
        1. Hiển thị danh sách sản phẩm
        2. Thêm sản phẩm mới
        3. Cập nhật sản phẩm
        4. Xóa sản phẩm
        5. Tìm kiếm sản phẩm theo hãng sản xuất
        0. Thoát chương trình
    ===========================================
        Vui lòng nhập lựa chọn của bạn (0 - 5):
    `);

    if (choice === null) {
      alert("Thoát chương trình");
      break;
    }

    switch (choice.trim()) {
      case "1":
        displayProducts(products);
        break;

      case "2":
        handleCreateProduct();
        break;

      case "3":
        handleUpdateProduct();
        break;

      case "4":
        handleDeleteProduct();
        break;

      case "5":
        handleSearchProduct();
        break;

      case "0":
        alert("Thoát chương trình");
        break;

      default:
        alert("Lựa chọn không hợp lệ. Vui lòng thử lại.");
        break;
    }
  } while (choice.trim() !== "0");
}

main();
