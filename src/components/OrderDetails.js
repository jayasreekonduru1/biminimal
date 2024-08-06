import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaIndianRupeeSign } from 'react-icons/fa6';
// import { IoIosCheckmarkCircle } from "react-icons/io";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const OrderDetails = () => {
  const userEmail = useSelector((state) => state.order.userEmail);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (userEmail) {
      const storedOrders = JSON.parse(localStorage.getItem(userEmail));
      setOrders(storedOrders || []);
    }
  }, [userEmail]);

  const handleDownloadInvoice = (order) => {
    const doc = new jsPDF();
    doc.text('Order Invoice', 20, 20);
    doc.autoTable({
      startY: 30,
      head: [['Name', 'Email', 'Address', 'City', 'State', 'Zip']],
      body: [[order.name, order.email, order.address, order.city, order.state, order.zip]],
    });

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Product Name', 'Quantity', 'Price', 'Total']],
      body: order.cartItems.map((item) => [item.name, item.cartQuantity, item.price, item.price * item.cartQuantity]),
    });

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Total Amount']],
      body: [[order.cartTotalAmount]],
    });

    doc.save('invoice.pdf');
  };

  return (
    <div className="order-details-container d-flex flex-column align-items-center p-4 gap-3">
      <h3>Order Details</h3>
      {orders.length > 0 ? (
        <div className=" d-flex flex-wrap justify-content-center gap-3 order-summary ">
          {orders.map((order, index) => (
            <div key={index} className='border p-2 mb-2 order-container'>
              {/* <div className="order-item d-flex justify-content-between border p-2 mb-2">
                <div className="item-details">
                  <h4>Name: {order.name}</h4>
                  <p>Email: {order.email}</p>
                  <p>Address: {order.address}, {order.city}, {order.state} - {order.zip}</p>
                </div>
              </div> */}
              {order.cartItems.map((item) => (
                <div className="order-item d-flex justify-content-between align-items-center border p-2 mb-2" key={item.id}>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.cartQuantity}</p>
                    <p>Price: <FaIndianRupeeSign />{item.price}</p>
                  </div>
                  <div className="item-total-price">
                    Total: <FaIndianRupeeSign />{item.price * item.cartQuantity}
                  </div>
                </div>
              ))}
              <div className="order-total d-flex justify-content-end w-100 mt-3">
                <h4>Total Price: <FaIndianRupeeSign />{order.cartTotalAmount}</h4>
              </div>
              <div className="d-flex justify-content-end w-100 mt-3">
                <button className="btn btn-dark" onClick={() => handleDownloadInvoice(order)}>Download Invoice</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No order details available</p>
      )}
    </div>
  );
};

export default OrderDetails;


// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { FaIndianRupeeSign } from 'react-icons/fa6';
// import { IoIosCheckmarkCircle } from "react-icons/io";
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const OrderDetails = () => {
//   const userEmail = useSelector((state) => state.order.userEmail);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (userEmail) {
//       const storedOrders = JSON.parse(localStorage.getItem(userEmail));
//       setOrders(storedOrders || []);
//     }
//   }, [userEmail]);

//   const handleDownloadInvoice = (order) => {
//     const doc = new jsPDF();
//     doc.text('Order Invoice', 20, 20);
//     doc.autoTable({
//       startY: 30,
//       head: [['Name', 'Email', 'Address', 'City', 'State', 'Zip']],
//       body: [[order.name, order.email, order.address, order.city, order.state, order.zip]],
//     });

//     doc.autoTable({
//       startY: doc.lastAutoTable.finalY + 20,
//       head: [['Product Name', 'Quantity', 'Price', 'Total']],
//       body: order.cartItems.map((item) => [item.name, item.cartQuantity, item.price, item.price * item.cartQuantity]),
//     });

//     doc.autoTable({
//       startY: doc.lastAutoTable.finalY + 20,
//       head: [['Total Amount']],
//       body: [[order.cartTotalAmount]],
//     });

//     doc.save('invoice.pdf');
//   };

//   return (
//     <div className="order-details-container d-flex flex-column align-items-center p-4 gap-3">
//       <h3>Order Details</h3>
//       {orders.length > 0 ? (
//         <div className="d-flex flex-wrap justify-content-center gap-3 order-summary w-100">
//           {orders.map((order, index) => (
//             <div key={index} className='border p-2 mb-2 order-container'>
//               {/* <div className="order-item d-flex justify-content-between border p-2 mb-2">
//                 <div className="item-details">
//                   <h4>Name: {order.name}</h4>
//                   <p>Email: {order.email}</p>
//                   <p>Address: {order.address}, {order.city}, {order.state} - {order.zip}</p>
//                 </div>
//               </div> */}
//               {order.cartItems.map((item) => (
//                 <div className="order-item d-flex justify-content-between align-items-center border p-2 mb-2" key={item.id}>
//                   <div className="item-details">
//                     <h4>{item.name}</h4>
//                     <p>Quantity: {item.cartQuantity}</p>
//                     <p>Price: <FaIndianRupeeSign />{item.price}</p>
//                   </div>
//                   <div className="item-total-price">
//                     Total: <FaIndianRupeeSign />{item.price * item.cartQuantity}
//                   </div>
//                 </div>
//               ))}
//               <div className="order-total d-flex justify-content-end w-100 mt-3">
//                 <h4>Total Price: <FaIndianRupeeSign />{order.cartTotalAmount}</h4>
//               </div>
//               <div className="d-flex justify-content-end w-100 mt-3">
//                 <button className="btn btn-dark" onClick={() => handleDownloadInvoice(order)}>Download Invoice</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No order details available</p>
//       )}
//     </div>
//   );
// };

// export default OrderDetails;



