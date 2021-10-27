import { urlFetch } from "./request";

export const getSource = (params) => urlFetch('GET', `/source/${params.source}.json`, {}, {})