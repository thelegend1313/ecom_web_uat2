
import React, { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import useEcomStore from "../../store/ecom-store";


const QuatationCard = () => {
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const printRef = React.useRef(null);




  useEffect(() => {
    hdlGetUserCart(token);
  }, []);
  const hdlGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        console.log('res.data.products' + res.data.products)
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);


      })
      .catch((err) => {
        console.log(err);
      });
  };



  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("examplepdf.pdf");
  };

  return (


    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <div ref={printRef} className="p-8 bg-white border border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
              <p className="text-sm text-gray-600">Invoice #INV-2024-001</p>
            </div>
            <div className="text-right">
              <h2 className="font-semibold">Company Name</h2>
              <p className="text-sm text-gray-600">
                123 Business Street
                <br />
                City, State 12345
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
            <p className="text-gray-700">
              Client Name
              <br />
              Client Address
              <br />
              City, State ZIP
            </p>
          </div>

          <table className="w-full mb-8 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-right">Quantity</th>
                <th className="border p-2 text-right">Unit Price</th>
                <th className="border p-2 text-right">ffff</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item, index) => (
          
                  <tr key={index} >
                      <td className="border p-2">{item.product.title}</td>
                      <td className="border p-2 text-right">{item.count}</td>
                      <td className="border p-2 text-right">{item.product.price}</td>
                      <td className="border p-2 text-right" >  {item.count * item.product.price}</td>
                  </tr>
                
              ))}
            
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between mb-2">
          
                <span>Subtotal:</span>
                <span>{cartTotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (10%):</span>
                <span>{cartTotal * 0.1}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{cartTotal+cartTotal * 0.1}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>

  )
}

export default QuatationCard