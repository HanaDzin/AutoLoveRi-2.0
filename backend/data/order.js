const orders = [
{
    user: "65bead13f28c9c2c859d6a34", 
    orderItems: [
        {
            brand: "Audi",
            model: "A5",
            image: "/src/assets/Audi.png",
            price: 50000,
            car: "65bead13f28c9c2c859d6a37",  
        },
        
    ],
    shippingAddress: {
        address: "Andrije Mohorovičića",
        city: "Rijeka",
        postalCode: "51000",
        country: "Croatia",
    },
    paymentMethod: "Credit Card",
    paymentResult: {
        id: "",
        status: "",
        update_time: "",
        email_address: "maja@email.com",
    },
    itemsPrice: 23000,  
    shippingPrice: 1000,  
    totalPrice: 24000,  
    isPaid: false,
    paidAt: "",
    isDelivered: false,
    deliveredAt: null,
}
]

export default orders;
