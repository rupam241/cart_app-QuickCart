import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, onClick }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <span key={index} onClick={() => onClick(index + 1)}>
          {rating > index ? (
            <AiFillStar size={15} />
          ) : (
            <AiOutlineStar size={15} />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;
