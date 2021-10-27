import "whatwg-fetch";
import baseUrl from "constants/env";
//fetch
export const fetchBase = (
    method = "GET",
    endPoint = "",
    params = {},
    customeHeaders = {},
    signal
) => {

    return Request(
        method,
        baseUrl.keyghost + endPoint,
        params,
        customeHeaders,
        signal
    );
};

export const urlFetch = (
    method = "GET",
    endPoint = "",
    params = {},
    customeHeaders = {},
    urlType,
    signal
) => {
    return Request(
        method,
        urlType ? baseUrl[urlType] + endPoint : endPoint,
        params,
        customeHeaders,
        signal
    );
};

export const Request = (
    method = "GET",
    endPoint = "",
    params = {},
    customeHeaders = {},
    signal
) => {
    let url = endPoint;
    //设置请求头部
    const headers = {
        "Content-Type": "application/json",
        ...customeHeaders,
    };
    const options = { method, headers, signal };
    //请求为各个请求时，对请求参数进行处理
    if (method === "GET") {
        const queryString = `${Object.keys(params)
            .map((k) => [k, params[k]].map(encodeURIComponent).join("="))
            .join("&")}`;
        if (!queryString && url.indexOf('?') > -1) {
            const query = url.split('?')[1]
            if (query && Object.values(query)[0] === null) {
                const urlArr = url.split('?')
                url = urlArr[0] + '?' + encodeURIComponent(urlArr[1])
            }
        }
        url = queryString ? url + "?" + queryString : url
            // url = url + "?" + queryString;
    } else if (method === "POST" || method === "PUT" || method === "DELETE") {
        if (headers["Content-Type"] === "application/x-www-form-urlencoded" || headers["Content-Type"] === "text/plain") {
            //options.body = JSON.stringify(params)
            options.body = `${Object.keys(params)
                .map((k) => [k, params[k]].join("="))
                .join("&")}`;
        } else if (headers["Content-Type"] === "multipart/form-data") {
            delete headers["Content-Type"];
            const formData = new FormData();
            Object.keys(params).forEach((key) => formData.append(key, params[key]));
            options.body = formData;

        } else {
            options.body = JSON.stringify(params);
        }
    }
    return fetch(url, options).then((res) => {
        //错误code码处理
        if (!res.ok) {
            return res.json().then((e) => Promise.reject({ message: e.message }));
        }
        const contentType = res.headers.get("content-type");
        //对返回体进行处理
        if (/json/.test(contentType)) {
            return res.json().then((res1) => {
                if (res1 && res1.code && res1.code == 403) {
                    return Promise.reject(res1)
                } else {
                    if (res1.code && res1.code != 200 && !res1.data) res1.data = {}
                    return Promise.resolve(res1)
                }
            })
        }
        if (/text/.test(contentType)) {
            return res.text().then(res => JSON.parse(res).data);
        }
        if (/image\/png/.test(contentType)) {
            return res.blob().then((blob) => URL.createObjectURL(blob));
        }
        if (contentType.indexOf("download") > -1 || contentType.indexOf("openxmlformats") > -1 || contentType.indexOf("excel") > -1) {
            return res.blob().then((blob) => URL.createObjectURL(blob));
        }
        return null
    });
};
