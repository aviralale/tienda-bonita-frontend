interface TotalCardsProps {
  title: string;
  amount: number;
  percentage: number;
}

const TotalCards: React.FC<TotalCardsProps> = ({
  title,
  amount,
  percentage = 0,
}) => {
  return (
    <div
      className="flex flex-col justify-center bg-white rounded-3xl w-1/3 gap-10"
      style={{
        padding: "2rem",
      }}
    >
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl">{title}</h1>
        <span
          className={`${
            percentage < 0 ? "bg-[#F56464]" : "bg-[#C7F369]"
          } rounded-full min-w-[2rem]`}
          style={{
            padding: "0.25rem 0.5rem",
          }}
        >
          {percentage}%
        </span>
      </div>
      <div className="flex">
        <h1 className="text-5xl">
          रु. <strong>{amount}</strong>
        </h1>
      </div>
    </div>
  );
};

export default TotalCards;
