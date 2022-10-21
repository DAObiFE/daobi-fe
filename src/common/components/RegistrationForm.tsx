import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import TwitterAuth from "./TwitterAuth";
import Function from "@/components/Contract/Function";
import Contract from "./Contract";
import { VOTING_CONTRACT } from "@/ethereum/abis";
import Section from "./Contract/Section";

interface Props {
  address: string;
  isVerified: boolean;
  isRegistered: boolean;
  twitterSession: Session;
  authToken: string;
  signIn: () => void;
  signOut: () => void;
}

export const RegistrationForm = ({
  address,
  isVerified,
  isRegistered,
  twitterSession,
  authToken,
  signIn,
  signOut,
}: Props) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-6 w-full h-full text-center">
      <h3>Hello {`${address}.`}</h3>
      {!isVerified && !isRegistered && (
        <>
          <p className="max-w-prose break-normal w-fit">
            It looks like you have not yet completed registration.
            <br />
            To protect against bots, we require linking a Twitter account. Your
            address and username are not stored, and your Twitter will be
            disconnected afterwards.
          </p>
          {twitterSession && authToken ? (
            <TwitterAuth signOut={signOut} authToken={authToken} />
          ) : (
            <>
              <p>Click the button below to verify your Twitter.</p>
              <button
                className="p-2 border border-ready"
                onClick={() => signIn()}
              >
                Connect Twitter
              </button>
            </>
          )}
        </>
      )}
      {/* registration: {
      title: "Enter the Imperial Court",
      methods: {
        register: {
          _initialVote:
            "Please enter the address of the courtier whose faction you will be joining",
          _name: "Courtesy Name",
        },
      },
    }, */}
      {!isRegistered && isVerified && (
        <>
          <p>
            Twitter verification completed. Time to register your username and
            cast your first vote!
          </p>
          <Section
            {...VOTING_CONTRACT.userFriendlySections.registration}
            contractABI={VOTING_CONTRACT.ABI}
            contractAddress={VOTING_CONTRACT.address}
            // userFriendlySections={{
            //   registration: {
            //     ...VOTING_CONTRACT.userFriendlySections.registration,
            //   },
            // }}
            // functionName="register"
            // stateMutability="nonpayable"
            // inputs={[
            //   { json: { "internalType": "address", "name": "_initialVote", "type": "address" },  VOTING_C},
            //   { "internalType": "bytes6", "name": "_name", "type": "bytes6" }
            // ]}
            // outputs={func?.outputs}
            // contractABI={ABI}
            // contractAddress={address}
          />
        </>
      )}

      {isVerified && isRegistered && (
        <p>
          Congrats! You have already finished connecting your Twitter and
          registering to vote!
        </p>
      )}
    </div>
  );
};