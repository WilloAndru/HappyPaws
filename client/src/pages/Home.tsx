import { useEffect, useState } from "react";
import ScrollableRow from "../components/ScrollableRow";
import {
  getOffers,
  getPopular,
  getFood,
  getGromming,
} from "../services/productsService";
import { MdOutlineLocalMall } from "react-icons/md";
import { GiColombia } from "react-icons/gi";
import { FaCheckCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

function Home() {
  const [offersList, setOffersList] = useState<any[]>([]);
  const [popularList, setPopularList] = useState<any[]>([]);
  const [foodList, setFoodList] = useState<any[]>([]);
  const [groomingList, setGroomingList] = useState<any[]>([]);

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
    setPopularList(mockOffers);
    setFoodList(mockOffers);
    setGroomingList(mockOffers);

    // Aquí iría tu fetch real
    // async () => {
    //   const offersData = await getOffers();
    //   setOffersList(offersData);
    //   const popularData = await getPopular();
    //   setOffersList(popularData);
    //   const foodData = await getFood();
    //   setOffersList(foodData);
    //   const grommingData = await getGromming();
    //   setOffersList(grommingData);
    // }
  }, []);

  return (
    <main className="flex flex-col gap-16">
      <ScrollableRow title="Promotions and offers" listItems={offersList} />
      <ScrollableRow title="Most popular" listItems={popularList} />
      <ScrollableRow title="Food" listItems={foodList} />
      <ScrollableRow title="Grooming" listItems={groomingList} />
      <section className="flex flex-col gap-8 p-8 bg-white rounded-2xl">
        <h3>HappyPaws</h3>
        <div className="grid grid-cols-2 gap-4">
          <p>
            Discover the perfect place for you and your furry friends at
            HappyPaws! At our stores, you’ll find everything your pets need from
            premium food and tasty treats to grooming essentials, toys,
            accessories, and even special care products. HappyPaws is your one
            stop destination for amazing deals and irresistible discounts.
          </p>
          <p>
            Explore our categories of pet food, grooming, toys, accessories,
            hygiene products, and everything your beloved companions need. Save
            on every item on your shopping list! We offer a wide selection from
            trusted brands to our own exclusive lines always with competitive
            prices and the best quality.
          </p>
        </div>
        <div className="grid grid-cols-4">
          <div className="flex flex-col gap-4 items-center">
            <MdOutlineLocalMall className="text-6xl text-cyan-500" />
            <p>A complete petshop all in one place</p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <GiColombia className="text-6xl text-cyan-500" />
            <p>Colombian pride</p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <FaCheckCircle className="text-6xl text-cyan-500" />
            <p>Excellent prices and quality</p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <FaCartShopping className="text-6xl text-cyan-500" />
            <p>Wide variety of products</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
