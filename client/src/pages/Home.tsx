import { useEffect, useState } from "react";
import ScrollableRow from "../components/ScrollableRow";
import { getOffers } from "../services/productsService";

function Home() {
  const [offersList, setOffersList] = useState<any[]>([]);

  useEffect(() => {
    // Mock temporal de datos
    const mockOffers = [
      { name: "Wireless Headphones", price: "$59.99", discount: 20 },
      { name: "Smartphone X", price: "$499.99", discount: 15 },
      { name: "Gaming Laptop", price: "$1,299.99", discount: 10 },
      { name: "Smartwatch Pro", price: "$199.99", discount: 25 },
      { name: "Bluetooth Speaker", price: "$89.99", discount: 30 },
      { name: "Mechanical Keyboard", price: "$149.99", discount: 18 },
      { name: "4K Monitor", price: "$349.99", discount: 12 },
      { name: "External SSD 1TB", price: "$129.99", discount: 22 },
      { name: "Wireless Mouse", price: "$39.99", discount: 35 },
      { name: "VR Headset", price: "$299.99", discount: 20 },
      { name: "Drone Pro Max", price: "$899.99", discount: 8 },
      { name: "Action Camera 4K", price: "$249.99", discount: 28 },
    ];

    setOffersList(mockOffers);

    // Aquí iría tu fetch real
    // async function fetchOffers() {
    //   const offersData = await getOffers();
    //   setOffersList(offersData);
    // }
    // fetchOffers();
  }, []);

  return (
    <div className="flex flex-col gap-32">
      <ScrollableRow title="Promotions and offers" listItems={offersList} />
    </div>
  );
}

export default Home;
