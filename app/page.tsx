import HomeClient from "./HomeClient";
import { getData } from "@/libs/api";
import type { APIResponse } from "@/types";

export default async function Home() {
  const apiUrl = process.env.API_URL;
  const data = await getData<APIResponse>(`${apiUrl}/products`);

  return <HomeClient initialData={data.data} />;
}
