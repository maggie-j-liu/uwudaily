import { FiPlusCircle } from "react-icons/fi";
import Link from "next/link";
import UwU from "./UwU";
import useAuth from "utils/useAuth";
const UpdateSkeleton = () => {
  const { user } = useAuth();
  return (
    <Link href={user === null ? "/sign-in" : "/new"}>
      <a>
        <div className="h-full border-4 border-dashed border-blue-400 rounded-lg px-8 py-8 text-center flex flex-col justify-center items-center">
          <FiPlusCircle className="w-16 h-16 text-blue-500" />
          <p className="text-lg font-medium text-blue-500">
            add a new entry to your uwudaily log
          </p>
        </div>
      </a>
    </Link>
  );
};

export default UpdateSkeleton;
