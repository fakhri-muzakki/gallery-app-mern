import HomeClient from "./HomeClient";
import { getData } from "@/libs/api";
import type { APIResponse } from "@/types";

export const revalidate = 30;

export default async function Home() {
  const apiUrl = process.env.API_URL;
  const data = await getData<APIResponse>(`${apiUrl}/products`);

  return <HomeClient initialData={data.data} />;
}
