import { FaPlus } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import useIdStore from "~/Store/useid";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const set=useIdStore();
  useEffect(() => {
    if (status === "loading") {
      // You should return a loading message or component here
      // This code won't render anything
    } else if (!session) {
      // Redirect to the login page if not authenticated
      signIn();
    }
  }, [session, status]);

  const { data: aadharverified, error: aadharError } = api.user.verifyCheck.useQuery();
  const { data: will, error: willError } = api.user.willCheck.useQuery();

  if (aadharError || willError) {
    toast.error("Something went wrong");
  }

  const handleClick = () => {
    if (!aadharverified) {
      router.push('/verifyAadhar');
    } else {
      router.push('/will/bankAccount');
    }
  };
  const willView=(id:string,title:string)=>{
    set.setWillId(id);
    router.push(`will/${title}`);
  }
  return (
    <>
      {will?.length === 0 ? (
        <div className="m-auto">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 w-44 h-8 rounded-full transform hover:scale-105 transition text-center text-lg font-semibold">
            <button onClick={handleClick}>
              Create Your Will <FaPlus className="inline" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-end w-full m-4">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 w-44 h-8 rounded-full transform hover:scale-105 transition text-center text-lg font-semibold">
            <button onClick={handleClick}>
              Create Your Will <FaPlus className="inline" />
            </button>
          </div>
          <div className=" mt-4 w-full border border-yellow-500 p-4">
            {will?.map((item, index) => (
              <div key={index}>
                <div className="w-full mt-4 shadow-lg hover:shadow-md transition rounded-lg border border-black">
                  <button onClick={()=>willView(item.id,`Will-${index+1}`)} className="w-full text-black py-4">Will-{index + 1}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
