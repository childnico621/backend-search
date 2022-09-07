// import fetch from 'node-fetch';
import axios from 'axios';
import { Author } from '../models/Intefaces/Author';
import { BaseItem } from '../models/Intefaces/BaseItem';
import { DetailItem } from '../models/Intefaces/DetailItem';
import { Price } from '../models/Intefaces/Price';

const apiEndpoint = `https://api.mercadolibre.com`;


// const agent = new https.Agent({ rejectUnauthorized: false });

export const getBaseItem = async (id: string) => {

  try {
    let origin: string = `${apiEndpoint}/items/${id}`;
    let data = (await axios.get(origin)).data;
    //let decimals = await getDecimalsForCurrencyItem(data.currency_id);

    let result = buildBaseItem(data);
    console.log(result);
    return result;
  } catch (error) {
    return error
  }
};

export const getDetailItem = async (id: string) => {

  try {
    let origin: string = `${apiEndpoint}/items/${id}`;
    let data = (await axios.get(origin)).data;
    //let decimals = await getDecimalsForCurrencyItem(data.currency_id);

    let result = buildDetailItem(await buildBaseItem(data), data.sold_quantity, await getDescriptionItem(data.id));
    //console.log('resultado: ',result);
    let author=new Author();
    return {author,  item:result};
  } catch (error) {
    return error
  }
};

//https://api.mercadolibre.com/items/MLA928422060/description

export const getDescriptionItem = async (id: string) => {
  try {
    let origin: string = `${apiEndpoint}/items/${id}/description`;
    return (await axios.get(origin)).data.plain_text
  } catch (error) {
    return error
  }

};

export const search = async (find: string) => {

  try {
    let origin = `${apiEndpoint}/sites/MLA/search?q=${find}&limit=4`;
    let data = (await axios.get(origin)).data;
    return buildResult(data);
  } catch (error) {
    return error
  }
};

const getDecimalsForCurrencyItem = async (id: string) => {
  try {
    let origin: string = `${apiEndpoint}/currencies/${id}`;
    return (await axios.get(origin)).data.decimal_places;
  } catch (error) {
    return 0;
  }

};

const buildBaseItem = async (data: any): Promise<BaseItem> => {

  let result = {
    id: data.id,
    title: data.title,
    price: new Price(data.currency_id, data.price, await getDecimalsForCurrencyItem(data.currency_id)),
    picture: (data.pictures)? data.pictures[0].url : data.thumbnail,
    condition: data.condition,
    free_shipping: data.shipping.free_shipping
  } as BaseItem;
  return new BaseItem(result);
}


const buildDetailItem = (data: BaseItem, sold_quantity: number, description: string): DetailItem => {

  return new DetailItem(data, sold_quantity, description);
}

const buildResult = async (query: any) => {
  let lista: BaseItem[] = [];
  await Promise.all(query.results.map(async (item: any) => {
    let result = await buildBaseItem(item)
    // let result = {
    //   id: item.id,
    //   title: item.title,
    //   price: new Price(item.currency_id, item.price, item.decimals),
    //   picture: item.pictures[0].url,
    //   condition: item.condition,
    //   free_shipping: item.shipping.free_shipping
    // } as BaseItem;

    lista.push(new BaseItem(result))
  }));

  return { author: new Author(), items: lista, categories: [] };
}
// https://api.mercadolibre.com/currencies/:id

// const dataToBaseItem = (data: any): BaseItem => {
//   let item: BaseItem;
//   item.id = data.id;

//   console.log(item);
//   return item;
// }