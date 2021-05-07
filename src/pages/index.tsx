import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import MarketplaceApp from "../components/MarketplaceApp";
import MarketplaceAppDeploy from "../components/MarketplaceAppDeploy";
import Navbar from "../components/Navbar";
import useKeplr from "../hooks/useKeplr";

type Data = {
  repository: Repository;
};
type Repository = {
  object: { repoEntries: TreeEntry[] };
};
export type TreeEntry = {
  name: string;
  type: string;
  object: any;
  children: { entries: TreeEntry[] };
};

const HomePage: NextPage<{ data: Data }> = (data) => {
  const cosmos = useKeplr("akashnet-2");
  const [activeApp, setActiveApp] = useState<TreeEntry>()

  // TODO: Add pagination
  const appFolders = data.data.repository.object.repoEntries.filter(
    (r, i) => r.type === "tree" && (i > 0 && i < 30)
  );

  return (
    <div className="bg-akash-grey h-screen">
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex">
        <div className="w-3/12">
          <div className="text-white text-2xl font-extralight">Your Wallet</div>
        </div>
      </div>
      {/* <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex">
        <div className="w-6/12 border-solid border-gray-600 border border-rounded flex flex-wrap rounded-lg m-2">
          {appFolders.map((f, index) => (
            <MarketplaceApp key={index} name={f.name} onClick={() => setActiveApp(f)}></MarketplaceApp>
          ))}
        </div>
        {activeApp &&
          <div className="w-6/12 border-solid border-gray-600 border border-rounded flex flex-wrap rounded-lg m-2">
            <MarketplaceAppDeploy appFiles={activeApp.children.entries}></MarketplaceAppDeploy>
          </div>
        }
      </div> */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const result = await fetch("http://localhost:3000/api/apps");
  const data = await result.json();
  return {
    props: { data },
  };
};

export default HomePage;
