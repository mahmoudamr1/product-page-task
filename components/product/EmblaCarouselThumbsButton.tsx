type ThumbProps = {
  imgSrc: string;
  onClick: () => void;
  selected: boolean;
  index: number;
};

export const Thumb = ({ imgSrc, onClick, selected }: ThumbProps) => (
  <button
    onClick={onClick}
    className={`w-16 h-16 rounded overflow-hidden border-2 ${
      selected ? "border-black" : "border-transparent"
    }`}
  >
    <img src={imgSrc} alt="thumbnail" className="w-full h-full object-cover" />
  </button>
);
