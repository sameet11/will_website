import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import toast from 'react-hot-toast';

const UserProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      // Optional: You can render a loading state here if needed
    } else if (!session) {
      // Redirect to the login page if not authenticated
      signIn();
    }
  }, [session, status, router]);

  const { data: aadharverified, error } = api.user.verifyCheck.useQuery();
  if(error){
    toast.error("something went wrong");
    router.reload();
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return router.replace('/');
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-1/2 mx-auto mt-8 space-y-8">
      <img src={session.user.image} alt="Profile Picture" className="w-32 h-32 rounded-full mx-auto mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 text-center">{session.user.name}</h2>
      <p className="text-gray-600 text-center">{session.user.email}</p>
      {aadharverified ? (
        <div className="flex justify-center gap-x-2 text-green-700">
          <FiCheckCircle size={20} />
          <p>Verified</p>
        </div>
      ) : (
        <div className="flex justify-center text-red-600 gap-x-2">
          <FiXCircle size={20} />
          <p>Not Verified</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;








