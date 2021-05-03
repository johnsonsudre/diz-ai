import React from "react";
import Link from "next/link";
import useSWR from "swr";
import PageTitle from "../components/PageTitle";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Index = () => {
  const { data, error } = useSWR("/api/get-promo", fetcher);
  return (
    <React.Fragment>
      <PageTitle title="Home" />
      {/* <img src={data.companyBrand} className="mx-auto" alt={data.companyName} /> */}
      <div className="mt-10 lg:mx-80 font-normal text-center text-lg md:text-3xl">
        <b>
          {!data && "..."}
          {data && data.companyName}
        </b>
        , sempre buscando atender melhor você. Estamos sempre
        abertos a ouvir sua opnião.
      </div>
      <Link href="/research">
        <div className="cursor-pointer text-center bg-brand text-md font-black text-primary m-12 px-2 py-2  md:mx-auto md:text-3xl md:px-10 md:py-5 xl:mx-96 rounded-xl shadow-md hover:bg-brand-light">
          <a>Dar opnião ou sugestão e ganhar cupom</a>
        </div>
      </Link>
      <div className="text-center my-12 font-bold">
        {!data && <p>Carregando...</p>}
        {data && data.promoShow && (
          <p className="text-3xl font-black pb-3 uppercase">{data.promoName}</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default Index;
