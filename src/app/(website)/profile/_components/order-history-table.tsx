/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Eye, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";

const OrderHistoryTable = () => {
  const session = useSession();
  const token = session?.data?.accessToken;

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/my-orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
    enabled: !!token,
  });

  if (isLoading)
    return (
      <div className="p-10 text-center text-orange-500">Loading Orders...</div>
    );

  // Check if there are no orders
  const hasNoOrders = !ordersData?.data || ordersData.data.length === 0;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-[#333333] font-serif">
          Order History
        </h1>
        <p className="text-gray-500 text-sm">
          Manage your personal information and profile details.
        </p>
      </div>

      {hasNoOrders ? (
        // Empty State Message
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
            <ShoppingBag size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Orders Yet
          </h3>
          <p className="text-gray-500 text-center max-w-md mb-6">
            You haven&apos;t placed any orders yet. Start exploring our products
            and place your first order!
          </p>
        </div>
      ) : (
        // Orders Table
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-0">
              <thead>
                <tr className="text-[#F59E0B] border-b border-gray-100 text-sm uppercase tracking-wider">
                  <th className="pb-4 font-semibold px-2">Equipment</th>
                  <th className="pb-4 font-semibold px-2">Order DATE</th>
                  <th className="pb-4 font-semibold px-2">AMOUNT</th>
                  <th className="pb-4 font-semibold px-2">STATUS</th>
                  <th className="pb-4 font-semibold px-2 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ordersData?.data?.map((order: any) => (
                  <tr
                    key={order._id}
                    className="text-sm text-[#4F4F4F] hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-5 px-2">
                      {order.items[0]?.equipment?.title || "Product Name"}
                    </td>
                    <td className="py-5 px-2">
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    {/* <td className="py-5 px-2 font-bold text-gray-800">
                      ${order.totalAmount.toFixed(2)}
                    </td> */}
                    <td className="py-5 px-2">
                      <span
                        className={`px-3 py-1 rounded-md text-xs font-medium ${
                          order.paymentStatus === "paid"
                            ? "bg-[#E6F9F1] text-[#10B981]"
                            : "bg-[#FFF1F2] text-[#F43F5E]"
                        }`}
                      >
                        {order.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className="py-5 px-2 text-right">
                      <button className="inline-flex items-center gap-1.5 text-gray-700 hover:text-[#F59E0B] transition-colors font-medium">
                        <Eye size={18} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Figma Style Pagination - Only show when there are orders */}
          <div className="flex justify-center items-center gap-2 mt-10">
            <button className="p-2 border border-gray-200 rounded-full text-gray-400 hover:border-[#F59E0B] hover:text-[#F59E0B]">
              <ChevronLeft size={18} />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  page === 2
                    ? "bg-[#F59E0B] text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="text-gray-400 mx-1">...</span>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-sm text-gray-600">
              6
            </button>
            <button className="p-2 border border-gray-200 rounded-full text-gray-400 hover:border-[#F59E0B] hover:text-[#F59E0B]">
              <ChevronRight size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderHistoryTable;
