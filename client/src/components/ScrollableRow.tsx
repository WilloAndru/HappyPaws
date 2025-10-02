import { Link } from "react-router-dom";

type ScrollableRowProps = {
  title: string;
  listItems: any[];
};

function ScrollableRow({ title, listItems }: ScrollableRowProps) {
  return (
    <div className="bg-white flex flex-col gap-4 p-6 rounded-2xl">
      <div className="flex justify-between">
        <h3>{title}</h3>
        <Link className="link font-bold" to="/">
          See more
        </Link>
      </div>
      <div className="overflow-hidden grid grid-cols-6">
        {listItems.map((item: any, index) => {
          return (
            <div
              key={index}
              className="relative p-4 hover:bg-gray-200 rounded-2xl gap-2 flex flex-col"
            >
              <div className="absolute top-2 left-2 rounded-2xl bg-cyan-500 p-2 text-white font-bold">
                -{item.discount}%
              </div>
              <img className="h-48" src={item.img} alt="product" />
              <h5>{item.name}</h5>
              <h5 className="text-cyan-700">{item.price}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScrollableRow;
