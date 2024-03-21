import { useState, useEffect } from 'react';
import axios from 'axios';

//pendding
//request tamamlanıp tamamlanmadığını koontrol edip, ardarda ikitane requet atmasını engeler. butonu disable yapar

export const useApiProgress = (apiMethod, apiPath, strictPath) => {
  const [pendingApiCall, setPendingApiCall] = useState(false);
  
  useEffect(() => {
    let requestInterceptor, responseInterceptor;

    //aynı aynda farkılı request yapıldığında .bunu çağrırız, kod tekrarı engellmek için tek bir fonk. yazdık 
    const updateApiCallFor = (method, url, inProgress) => {
      if (method !== apiMethod) {
        return;
      }
      if (strictPath && url === apiPath) {
        setPendingApiCall(inProgress);
      } else if (!strictPath && url.startsWith(apiPath)) {
        setPendingApiCall(inProgress);
      }
    };

    const registerInterceptors = () => {
      //request yapıldığında axiosdan kontrol edililebilir.  
      requestInterceptor = axios.interceptors.request.use(request => {
        const { url, method } = request;
        updateApiCallFor(method, url, true);
        return request;
      });

      //responso döndüğünde 
      responseInterceptor = axios.interceptors.response.use(
        response => {
          const { url, method } = response.config;
          updateApiCallFor(method, url, false);
          return response;
        },
        error => { //response error için
          const { url, method } = error.config;
          updateApiCallFor(method, url, false);
          throw error;
        }
      );
    };

    //unmount olurken tekrar request atmasın diye.
    const unregisterInterceptors = () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };

    registerInterceptors();

    return function unmount() {
      unregisterInterceptors();
    };
  }, [apiPath, apiMethod, strictPath]);

  return pendingApiCall;
};