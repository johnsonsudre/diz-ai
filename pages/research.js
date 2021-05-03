import React from "react";
import { useState } from "react";
import moment from "moment";
import PageTitle from "../components/PageTitle";
import {toPng} from 'html-to-image';
import { saveAs } from 'file-saver';

const Research = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    date: "",
    coupon: moment().format("YYMMDDHHmmSSS"),
    score: null,
    promoName: "",
    promoMessage: "",
  });
  const scores = [0, 1, 2, 3, 4, 5];
  const [success, setSuccess] = useState(false);
  const [dataReturned, setDataReturned] = useState({});

  const onCapture = async ()=> {
    console.log(document.getElementById('coupon'))
    const image = await toPng(document.getElementById('coupon'))
    console.log(image)
    saveAs(image, 'Meu_Cupom-'+dataReturned.coupon+'.png')
   }

  const validateForm = () => {
    if (form.name === "") {
      alert("Nome não pode ser vazio.");
    } else {
      if (form.email === "" && form.whatsapp === "") {
        alert("Preencha email ou telefone.");
      } else {
        if (form.score === null) {
          alert("Dê sua nota.");
        } else {
          return true;
        }
      }
    }
    return false;
  };

  const add = async () => {
    if (validateForm())
      try {
        const response = await fetch("/api/add", {
          method: "POST",
          body: JSON.stringify(form),
        });
        const data = await response.json();
        setSuccess(true);
        setDataReturned(data);
      } catch (err) {
        console.log(err);
      }
  };

  const onChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.name;
    setForm((old) => ({
      ...old,
      [key]: value,
    }));
  };



  return (
    <div className="px-6">
      <PageTitle title="Pesquisa" />
      {!success && (
        <div className="max-w-md mx-auto p-6">
          <div className="text-center">
            <div id="couponBitmap"></div>
            <h1 className="text-2xl font-bold">Críticas e sugestões</h1>
            <p className="font-thin uppercase">
              Preencha os dados, participe de promoções e concorra a prêmios
            </p>
          </div>
          <label className="block">Seu nome</label>
          <input
            type="text"
            name="name"
            onChange={onChange}
            value={form.name}
            placeholder="Digite seu nome"
            className="w-full text-center placeholder-gray-200 shadow border-2 border-tertiary rounded-xl text-tertiary text-2xl font-bold p-2 mb-6"
          />
          <label className="block">E-mail</label>
          <input
            type="text"
            name="email"
            onChange={onChange}
            value={form.email}
            placeholder="Digite seu email"
            className="w-full text-center placeholder-gray-200 shadow border-2 border-tertiary rounded-xl text-tertiary text-2xl font-bold p-2 mb-6"
          />
          <label className="block">Whattsapp</label>
          <input
            type="text"
            name="whatsapp"
            onChange={onChange}
            value={form.whatsapp}
            placeholder="Nº de Whatsapp"
            className="w-full text-center placeholder-gray-200 shadow border-2 border-tertiary rounded-xl text-tertiary text-2xl font-bold p-2 mb-6"
          />
          <label className="block">Dê sua nota</label>
          <div className="flex border-2 rounded-xl">
            {scores.map((score) => (
              <div
                key={score}
                className="flex-1 text-center font-black text-2xl"
              >
                {score}
                <br />
                <input
                  type="radio"
                  className="form-radio h-8 w-8"
                  name="score"
                  value={score}
                  onChange={onChange}
                />
              </div>
            ))}
          </div>

          <button
            onClick={add}
            className="mt-16 w-full bg-brand font-bold text-primary py-3 rounded-lg shadow-lg hover:bg-tertiary"
          >
            Gerar meu cupom
          </button>
        </div>
      )}
      {success && (
        <div className="max-w-md mx-auto p-6">
          <div className="text-center">
            <div id="couponBitmap"></div>
            <h1 className="text-2xl font-bold">Baixe seu cupom</h1>
            <p className="font-thin uppercase mb-4">
              Sua crítica é muito importante para nós!!
            </p>
          </div>
          <div
            id="coupon" 
            className="bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3"
            role="alert"
          >
            <p className="text-2xl font-black text-center pb-3">
              {dataReturned.promoName}
            </p>
            <p className="uppercase text-center pb-5">
              Obrigado por contribuir com sua sugestão e/ou crítica.
            </p>
            <p className="font-bold p-6 border-2 border-green-500 rounded-xl uppercase text-center">
              Parabéns<i>{" " + form.name}</i>
              {"!"}
              <br />
              {dataReturned.promoMessage}
            </p>
            <p className="pt-4 uppercase text-center">Seu cupom:</p>
            <p className="pb-10 text-2xl md:text-4xl font-black text-center">
              {dataReturned.coupon}
            </p>
          </div>
          <p className="text-center">
              Baixe o cupom e apresente-o na próxima compra.
            </p>
          <button
            onClick={onCapture}
            className="mt-8 w-full bg-brand font-bold text-primary py-3 rounded-lg shadow-lg hover:bg-tertiary"
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default Research;
