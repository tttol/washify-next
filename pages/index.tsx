import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import scanAll from "../lib/client/logic/ddb/scan-all";
import Card from "@/component/Card";
import { parse } from "path";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const response: any = await scanAll();
  const items: string = JSON.stringify(response);
  return { props: { items } };
}

export default function Home({ items }: { items: string }) {
  // console.debug(items);
  const parsedItems: Array<Item> = JSON.parse(items);
  console.debug(parsedItems);
  return (
    <>
      <Head>
        <title>washify-next</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {parsedItems.map(e => Card(e))}
      </main>
    </>
  );
}
