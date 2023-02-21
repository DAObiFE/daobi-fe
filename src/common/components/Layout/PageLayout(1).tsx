import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import JsonTable from "./JsonTable";

const PageLayout = ({ children }: { children: ReactNode }): JSX.Element => (
  <>
    <div className="flex flex-col justify-between mx-auto w-full min-h-screen">
      <div className="flex flex-col h-full grow">
        <Navbar />
        {children}
        <h1>Faction Registry</h1>
        <JsonTable src="/data/factions.json" />
      </div>
      <Footer />
    </div>
  </>
);

export default PageLayout;
