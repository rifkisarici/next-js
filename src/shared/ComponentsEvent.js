import i18next from 'i18next';

export const onChangeAllObject = (object, selectName, setForm) => {
  let name = null, value = null;
  /* console.log("asds",object); */
  if (object.target === undefined) {//select için
    name = selectName;
    value = object
  } else if (object.target.type == "checkbox") {
    name = object.target.name;
    value = object.target.checked;
  } else if (object.target == "optionbox") {
    name = object.name;
    value = object.id;
  } else {
    name = object.target.name;
    value = object.target.value;
  }

  setForm((previousForm) => ({ ...previousForm, [name]: value }));
};

export const getApiCalls = async (param, getApi, setList, setNotFound) => {
  try {
    const response = await getApi(param);
    setList(response.data)
    setNotFound(false);
  } catch (error) {
    setNotFound(true);
  }
};

//gerek yok silinece
export const postApiCalls = async (body, postApi) => {
  try {
    await postApi(body);
    return true;
  } catch (error) {
    return false;
  }
};

export const getApiCallsListOfSelect = async (getApi, setList) => {
  try {
    const response = await getApi();
    setList(response.data.map((item) => (swapItemToSelectBox(item))))
  } catch (error) {
    //setErrors(apiError.response.data.message);
    console.log("response erorr");
  }
};

export const swapItemToSelectBox = (item) => {  
  return ({
    ...item,    
    value: item.id,
    label: (i18next.language == "en" && item.name_en) ? item.name_en : item.name,
    name: item.name,
    name_en: item.name_en
  })
}

export const searchItemSelect = async (getApi, setList, inputValue) => { 
  if (inputValue?.length > 2 || inputValue?.inputValue?.length > 2  ) {//inputValue?.inputValue?: software ve technical skiller için kullanıldı.Skill lerde inputValue obje döner
    try {
      const response = await getApi(inputValue)
      setList(response.data.map((item) => (swapItemToSelectBox(item))))
    } catch (error) {
      console.log("response erorr");
    }
    //veritabnında olmayan bir değer eklemek içim
    const body = { value: -1, label: inputValue?.inputValue || inputValue, name: "otherInput" }
    setList(oldArray => [...oldArray, body]);
  }
  else
    setList(null)
}
