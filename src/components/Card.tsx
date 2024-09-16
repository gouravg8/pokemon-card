type CardProps = {
  name: string;
  hp: number;
  spAttack: number;
  spDefence: number;
  spSpeed: number;
  image: string;
  id: number;
};
const Card = ({
  name,
  hp,
  spAttack,
  spDefence,
  spSpeed,
  image,
  id,
}: CardProps) => {
  return (
    <div className=" w-full flex flex-col justify-center items-center gap-4 rounded-lg py-4 px-8 hover:transform hover:scale-105 duration-300 hover:cursor-pointer">
      <div className="flex justify-between items-center w-full border-b-2 pb-2">
        <h1 className="text-2xl">#{id}</h1>
        <h1 className="text-xl">HP {hp}</h1>
      </div>
      <div>
        <img src={image} alt="images" srcSet="" className="w-72 md:w-64 h-64" />
      </div>
      <div>
        <p className="text-3xl font-semibold">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
      </div>
      <div className="flex justify-between items-center w-full border-t-2 pt-4">
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">{spAttack}</p>
          <p className="text-sm">Attack</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">{spDefence}</p>
          <p className="text-sm">Defence</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">{spSpeed}</p>
          <p className="text-sm">Speed</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
