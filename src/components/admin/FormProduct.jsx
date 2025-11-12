// rafce
import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
//import { numberFormat } from "../../utils/number";
//import { dateFormat } from "../../utils/dateformat";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  colorId: "",
  branchId: "",
  promoId: "",
  images: [],
  status: "",
  hot_point: 0,
  code: "",
  code_group: "",
  factory_code: "",
  factory_code_group: "",
  bar_code: "", bar_code_group: ""
};
const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getBranch = useEcomStore((state) => state.getBranch);
  const branch = useEcomStore((state) => state.branch);
  const getPromo = useEcomStore((state) => state.getPromo);
  const promo = useEcomStore((state) => state.promo);
  const getColor = useEcomStore((state) => state.getColor);
  const color = useEcomStore((state) => state.color);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  // console.log(products)

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    colorId: "",
    branchId: "",
    promoId: "",
    images: [],
    status: "",
    hot_point: 0,
    code: "",
    code_group: "",
    factory_code: "",
    factory_code_group: "",
    bar_code: "", bar_code_group: ""
  });

  useEffect(() => {
    // code
    getCategory();
    getColor();
    getProduct(100);
    getBranch();
    getPromo();
  }, []);

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      console.log(res);
       console.log("ggggggggggggggggggggggggggggg");
      setForm(initialState);
      getProduct();
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("จะลบจริงๆ หรอ")) {
      try {
        // code
        const res = await deleteProduct(token, id);
        console.log(res);
        toast.success("Deleted สินค้าเรียบร้อยแล้ว");
        getProduct();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1>เพิ่มข้อมูลสินค้า</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-group row">
          <div class="col-sm-3 mb-3 mb-sm-0">
            <input type="text"
              class="form-control form-control-user"
              value={form.title}
              onChange={handleOnChange}
              placeholder="Title"
              name="title" />
          </div>
          <div class="col-sm-3 mb-3 mb-sm-0">
            <input type="text"
              class="form-control form-control-user"
              value={form.description}
              onChange={handleOnChange}
              placeholder="description"
              name="description" />
          </div>
          <div class="col-sm-3 mb-3 mb-sm-0">
            <input type="number"
              class="form-control form-control-user"
              value={form.price}
              onChange={handleOnChange}
              placeholder="price"
              name="price" />
          </div>
        </div>
        <hr />
        <div class="form-group row">
          <div class="col-sm-3 mb-3 mb-sm-0">
            <input type="text"
              class="form-control form-control-user"
              value={form.quantity}
              onChange={handleOnChange}
              placeholder="quantity"
              name="quantity" />
          </div>
          <div class="col-sm-3 mb-3 mb-sm-0">
            <select
              className="border"
              name="categoryId"
              onChange={handleOnChange}
              required
              value={form.categoryId}
            >
              <option value="" disabled>
                Please Select
              </option>
              {categories.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              className="border"
              name="colorId"
              onChange={handleOnChange}
              required
              value={form.colorId}
            >
              <option value="" disabled>
                Please Select
              </option>
              {color.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div class="col-sm-3 mb-3 mb-sm-0">
            <select
              className="border"
              name="branchId"
              onChange={handleOnChange}
              required
              value={form.branchId}
            >
              <option value="" disabled>
                Please Select
              </option>
              {branch.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              className="border"
              name="promoId"
              onChange={handleOnChange}
              required
              value={form.promoId}
            >
              <option value="" disabled>
                Please Select
              </option>
              {promo.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr />
         <div class="form-group row">
          <div class="col-sm-3 mb-3 mb-sm-0">
            <input type="text"
              class="form-control form-control-user"
              value={form.status}
              onChange={handleOnChange}
              placeholder="status"
              name="status" />
          </div>
          <div class="col-sm-3 mb-3 mb-sm-0">
            <input type="text"
              class="form-control form-control-user"
              value={form.hot_point}
              onChange={handleOnChange}
              placeholder="hot_point"
              name="hot_point" />
          </div>
          <div class="col-sm-3 mb-3 mb-sm-0">
            <input type="number"
              class="form-control form-control-user"
              value={form.code}
              onChange={handleOnChange}
              placeholder="code"
              name="code" />
          </div>
        </div>
         <hr />
        <div class="form-group row">
          <div class="col-sm-3 mb-3 mb-sm-0">
            <input type="text"
              class="form-control form-control-user"
              value={form.code_group}
              onChange={handleOnChange}
              placeholder="code_group"
              name="code_group" />
          </div>
          <div class="col-sm-3 mb-3 mb-sm-0">
            <input type="text"
              class="form-control form-control-user"
              value={form.factory_code}
              onChange={handleOnChange}
              placeholder="factory_code"
              name="factory_code" />
          </div>
          <div class="col-sm-3 mb-3 mb-sm-0">
            <input type="number"
              class="form-control form-control-user"
              value={form.factory_code_group}
              onChange={handleOnChange}
              placeholder="factory_code_group"
              name="factory_code_group" />
          </div>
        </div>
         <hr />
        <div class="form-group row">
          <div class="col-sm-3 mb-3 mb-sm-0">
            <input type="text"
              class="form-control form-control-user"
              value={form.bar_code}
              onChange={handleOnChange}
              placeholder="bar_code"
              name="bar_code" />
          </div>
          <div class="col-sm-3 mb-3 mb-sm-0">
            <input type="text"
              class="form-control form-control-user"
              value={form.bar_code_group}
              onChange={handleOnChange}
              placeholder="bar_code_group"
              name="bar_code_group" />
          </div>
        
        </div>
      </form>
      <form onSubmit={handleSubmit}>


        {/* Upload file  */}
        <Uploadfile form={form} setForm={setForm} />

        <button type="submit" class="btn btn-success">Add Product</button>

        <hr />
        <br />
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-200 border">
              <th scope="col">No.</th>
              <th scope="col">รูปภาพ</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">รายละเอียด</th>
              <th scope="col">ราคา</th>
              <th scope="col">จำนวน</th>
              <th scope="col">จำนวนที่ขายได้</th>
              <th scope="col">วันที่อัปเดต</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              // console.log(item)
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>

                  <td>
                    {item.images.length > 0 ? (
                      <img
                        className="w-24 h-24 rounded-lg shadow-md"
                        src={item.images[0].url}
                      />
                    ) : (
                      <div
                        className="w-24 h-24 bg-gray-200 rounded-md 
                                                    flex items-center justify-center shadow-sm"
                      >
                        No Image
                      </div>
                    )}
                  </td>

                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.sold}</td>
                  <td>{item.updatedAt}</td>
                  <td className="flex gap-2">
                    <p
                      className="bg-yellow-500 rounded-md p-1 
                                            hover:scale-105 hover:-translate-y-1 hover:duration-200
                                            shadow-md"
                    >
                      <Link to={"/admin/product/" + item.id}>
                        <Pencil />
                      </Link>
                    </p>

                    <p
                      className="bg-red-500 rounded-md p-1 shadow-md
                                                hover:scale-105 hover:-translate-y-1 hover:duration-200
                                                "
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash />
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduct;
