
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShoppingBag, CreditCard, Landmark, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Order, ShippingAddress } from "@/types";

const CheckoutPage = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const taxAmount = totalPrice * 0.1;
  const totalAmount = totalPrice + taxAmount;
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: ""
  });
  
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const isFormValid = () => {
    // Check shipping address fields
    const isShippingValid = Object.values(shippingAddress).every(value => value.trim() !== "");
    
    // Check payment details if credit card is selected
    let isPaymentValid = true;
    if (paymentMethod === "credit-card") {
      isPaymentValid = Object.values(cardDetails).every(value => value.trim() !== "");
    }
    
    return isShippingValid && isPaymentValid;
  };
  
  const handlePlaceOrder = () => {
    if (!isFormValid()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Create order object
      const order: Order = {
        id: `ORD-${Date.now()}`,
        items: [...cartItems],
        total: totalAmount,
        shippingAddress,
        paymentMethod,
        date: new Date().toISOString()
      };
      
      // Save to localStorage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));
      localStorage.setItem("lastOrder", JSON.stringify(order));
      
      // Clear cart and redirect
      clearCart();
      navigate("/order-confirmation");
    }, 2000);
  };
  
  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              You need to add products to your cart before checkout.
            </p>
            <Button 
              onClick={() => navigate("/")}
              className="bg-shop-primary hover:bg-shop-secondary"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    name="fullName" 
                    value={shippingAddress.fullName}
                    onChange={handleShippingChange}
                    className="mt-1"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={shippingAddress.address}
                    onChange={handleShippingChange}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    value={shippingAddress.city}
                    onChange={handleShippingChange}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input 
                    id="postalCode" 
                    name="postalCode" 
                    value={shippingAddress.postalCode}
                    onChange={handleShippingChange}
                    className="mt-1"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country" 
                    name="country" 
                    value={shippingAddress.country}
                    onChange={handleShippingChange}
                    className="mt-1"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              
              <RadioGroup 
                defaultValue="credit-card" 
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="cursor-pointer flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-shop-primary" />
                    Credit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                  <Label htmlFor="bank-transfer" className="cursor-pointer flex items-center">
                    <Landmark className="h-5 w-5 mr-2 text-shop-primary" />
                    Bank Transfer
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet" className="cursor-pointer flex items-center">
                    <Wallet className="h-5 w-5 mr-2 text-shop-primary" />
                    Digital Wallet
                  </Label>
                </div>
              </RadioGroup>
              
              {paymentMethod === "credit-card" && (
                <div className="mt-4">
                  <Tabs defaultValue="card-details">
                    <TabsList className="grid w-full grid-cols-1">
                      <TabsTrigger value="card-details">Card Details</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card-details" className="mt-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber" 
                            name="cardNumber" 
                            placeholder="1234 5678 9012 3456"
                            value={cardDetails.cardNumber}
                            onChange={handleCardDetailsChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardHolder">Card Holder Name</Label>
                          <Input 
                            id="cardHolder" 
                            name="cardHolder" 
                            placeholder="John Doe"
                            value={cardDetails.cardHolder}
                            onChange={handleCardDetailsChange}
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input 
                              id="expiryDate" 
                              name="expiryDate" 
                              placeholder="MM/YY"
                              value={cardDetails.expiryDate}
                              onChange={handleCardDetailsChange}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input 
                              id="cvv" 
                              name="cvv" 
                              placeholder="123"
                              value={cardDetails.cvv}
                              onChange={handleCardDetailsChange}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <Separator className="my-4" />
              
              <div className="max-h-80 overflow-y-auto space-y-4 mb-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center">
                    <div className="w-12 h-12 mr-4 bg-gray-50 rounded flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-sm text-gray-600">{item.quantity} x ${item.product.price.toFixed(2)}</p>
                    </div>
                    <div className="text-right font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              
              <Button 
                onClick={handlePlaceOrder}
                className="w-full bg-shop-primary hover:bg-shop-secondary"
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
              
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate("/cart")}
                  className="w-full"
                  disabled={isProcessing}
                >
                  Back to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
