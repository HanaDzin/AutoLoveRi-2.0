import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGetOrdersQuery } from '../../slices/ordersApiSlice'
import { Link } from 'react-router-dom'

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders); 

  return (
    <div className="dark:bg-dark px-10 pb-12 mt-16 dark:text-white text-center font-bold text-gray-900 min-h-[1200px]">
      <div className='items-center justify-center dark:bg-dark container p-10'>
      <h1 className=' text-3xl dark:text-primary text-left mb-6'>Pregled svih narudžbi</h1>

      {
        isLoading ? <h1>Učitavanje..</h1> : error ? <h1>{error}</h1> : (
          <div className="max-w-screen-xl">
          <div className="overflow-x-auto">
          <table class="text-md text-serif min-w-full">
            <thead className='shadow-lg'>
              <tr>
                <th className="px-4 py-2 ">ID</th>
                <th className="px-4 py-2 ">Korisnik</th>
                <th className="px-4 py-2 ">Datum</th>
                <th className="px-4 py-2 ">Ukupno</th>
                <th className="px-4 py-2 ">Plaćeno</th>
                <th className="px-4 py-2">Isporučeno</th>
              </tr>
          </thead>

          <tbody>
            { orders.map((order) => (
              <tr key={order._id} >
                <td className='px-4 py-2'>{order._id}</td>
                <td className='px-4 py-2'>{order.user && order.user.name}</td>
                <td className='px-4 py-2'>{order.createdAt.substring(0, 10)}</td>
                <td className='px-4 py-2'>{(order.totalPrice).toFixed(2)} €</td>
                <td className='px-4 py-2'>
                {
                  order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red'}} />
                  ) 
                }
                </td>
                <td className='px-4 py-2'>
                {
                  order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red'}} />
                  ) 
                }
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <button className='button-outline text-sm p-1'>Detalji</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
    </div>
  )}
</div>
</div>
)}

export default OrderListScreen