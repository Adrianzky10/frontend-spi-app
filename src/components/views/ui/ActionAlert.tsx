import { FaCheck } from "react-icons/fa";
import { LuCircleAlert } from "react-icons/lu";

interface Props {
  success?: boolean;
  error?: string;
  successMessage: string;
}

const ActionAlert = ({ success, error, successMessage }: Props) => {
  if (!success && !error) return null;

  return (
    <div
      className={`mt-5 flex items-center gap-2 rounded-xl p-4 ${
        success
          ? "border border-green-200 bg-green-50 text-green-700"
          : "border border-red-200 bg-red-50 text-red-700"
      }`}
    >
      {success ? (
        <FaCheck className="text-lg" />
      ) : (
        <LuCircleAlert className="text-lg" />
      )}

      <p>{success ? successMessage : error}</p>
    </div>
  );
};

export default ActionAlert;
