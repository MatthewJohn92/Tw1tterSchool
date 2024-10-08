import { useRouter } from "next/router";
import { GiPickle } from "react-icons/gi";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    router.push('/');
  }, [loginModal, router, currentUser]);

  return (
    <div onClick={() => router.push("/")}>
      <div
        className="
mt-6
lg:hidden
rounded-full
h-14
w-14
p-4
flex
items-center
justify-center
bg-green-800
hover:bg-opacity-80
transition
cursor-pointer
"
      >
        <GiPickle size={24} color="white" />
      </div>
      <div
        className="
      mt-6
      hidden
      lg:block
      px-4
      py-2
      rounded-full
      bg-green-800
      hover:bg-opacity-90
      cursor-pointer
      transition
      "
      >
        <p className="
        hidden
        lg:block
        text-center
        text-white
        text-[20px]">
Pickle!
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
