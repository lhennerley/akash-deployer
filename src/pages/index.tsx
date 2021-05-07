import { GetServerSideProps, NextPage } from "next";
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

  return (
    <div className="bg-akash-grey h-screen">
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex">
        <div className="w-3/12">
          <div className="text-white text-2xl font-extralight">Your Wallet</div>
        </div>
      </div>

    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  // const result = await fetch("http://localhost:3000/api/apps");
  // const data = await result.json();
  const data = {};
  return {
    props: { data },
  };
};

export default HomePage;
