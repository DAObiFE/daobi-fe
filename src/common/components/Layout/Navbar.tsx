import { useAccount } from "wagmi";
import Wallet from "./Wallet";
import useRoles from "@/hooks/useRoles";
import Image from "next/image";

const Navbar = () => {
  const { address } = useAccount();
  const {
    isChancellor,
    balanceDB,
    currentChancellor,
    userCourtName,
    rolesLoading,
  } = useRoles(address);

  return (
    <nav className="w-full border-b border-color-mode">
      <div className="flex justify-between items-center px-6 py-4 mx-auto max-w-screen-2xl h-16">
        <div className="w-1/3">
          {/* light mode */}
          <div className="relative w-16 h-16 dark:hidden">
            <Image
              src="/logo_light.png"
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
          {/* dark mode */}
          <div className="hidden relative w-16 h-16 dark:flex">
            <Image
              src="/logo_dark.png"
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="flex justify-center items-center mx-auto space-x-3 w-1/3 text-center whitespace-nowrap">
          <div className="hidden flex-col justify-center items-center lg:flex">
            <p>
              Today&#39;s Chancellor is
              {currentChancellor.address.length > 1 ? " " : "..."}
              <a
                href={`https://mumbai.polygonscan.com/address/${currentChancellor.address}`}
              >
                {currentChancellor.courtName}
              </a>
            </p>
            {address && (
              <div className="hidden whitespace-nowrap md:inline">
                {`${
                  !rolesLoading && isChancellor
                    ? "👑 Welcome Chancellor! 🏰"
                    : `🌾 Maybe one day${
                        userCourtName.length > 0 ? ", " + userCourtName : ""
                      }... 🌾`
                }
              `}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center mr-0 w-2/3 text-right md:w-1/3">
          {address && (
            <div className="inline-block w-1/3">{`${balanceDB}`} $DB</div>
          )}
          <Wallet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
