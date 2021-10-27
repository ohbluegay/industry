import { urlFetch } from "./request";

export const getMapGeo = (params) => urlFetch('GET', `/map/${params.code}_full.json`, {}, {})