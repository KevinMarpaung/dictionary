import { Link } from "react-router-dom";

export default function Button(props) {
  const { warna, children = "berikan text", ukuran, to, padding } = props;

  return (
    <Link to={to}>
      <div
        className={`font-poppins text-white cursor-pointer ${warna} rounded-lg text-center ${ukuran} ${padding}`}
      >
        {children}
      </div>
    </Link>
  );
}
