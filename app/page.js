"use client";
import useSWR from "swr";
import Image from "next/image";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR(
    "https://randomuser.me/api/",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  const person = data.results[0];

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <article className="p-10 rounded-md hover:rounded-lg flex flex-col justify-center items-center grow-0">
        <Image
          src={person.picture.large}
          alt={`${person.name.first} ${person.name.last}`}
          width={100}
          height={100}
          className="rounded-md hover:rounded-lg"
          priority
        />

        <h1 className="text-2xl font-bold text-white mt-4">
          {person.name.first} {person?.name.last}
        </h1>
        <p className="text-gray-400 mt-1">{person?.email}</p>
      </article>
    </div>
  );
}
