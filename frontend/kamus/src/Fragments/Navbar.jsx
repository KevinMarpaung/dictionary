import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <div className="  w-full cursor-pointer  border flex  border-black   justify-between py-4 text-black  ">
        <div className=" flex">
          <Link to={"/home"}>
            <div className="ml-4">⬅️</div>
          </Link>

          <h1 className="mx-6 font-bold font-sedwick ">
            <span className=" text-red-600">
              <span className="font-rubik">E- </span>KAMUS
            </span>
            BATAK
          </h1>
        </div>
      </div>
    </>
  );
}
