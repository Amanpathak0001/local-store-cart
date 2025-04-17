import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Order } from "@/types";
import { CheckCircle, ArrowRight } from "lucide-react";
import { convertUSDToINR, formatCurrency } from "@/utils/currencyConverter";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  
  useEffect(() => {
    const lastOrderString = localStorage.getItem("lastOrder");
    if (lastOrderString) {
      try {
        const lastOrder = JSON.parse(lastOrderString);
        setOrder(lastOrder);
      } catch (error) {
        console.error("Error parsing last order", error);
      }
    } else {
      navigate("/");
    }
  }, [navigate]);
  
  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-8">We couldn't find your order details.</p>
            <Button 
              onClick={() => navigate("/")}
              className="bg-shop-primary hover:bg-shop-secondary"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900">Order Confirmed!</h1>
            <p className="text-lg text-gray-600 mt-2">
              Thank you for your purchase
            </p>
          </div>
          
          <div className="border-t border-b py-4 my-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Order Number:</span>
              <span>{order.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Date:</span>
              <span>{new Date(order.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Payment Method:</span>
              <span className="capitalize">{order.paymentMethod.replace('-', ' ')}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-4">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex items-center">
                  <div className="w-16 h-16 mr-4 bg-gray-50 rounded flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {formatCurrency(item.product.price * item.quantity, 'USD')}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatCurrency(convertUSDToINR(item.product.price * item.quantity), 'INR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <div className="flex flex-col items-end">
                  <span>{formatCurrency(order.total, 'USD')}</span>
                  <span className="text-sm text-gray-600">
                    {formatCurrency(convertUSDToINR(order.total), 'INR')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-medium">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/")}
              className="bg-shop-primary hover:bg-shop-secondary"
              size="lg"
            >
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
