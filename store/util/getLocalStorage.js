function getLocalStorage(key, initial) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initial;
  } catch (error) {
    console.error(error);
    return initial;
  }
}

export default getLocalStorage;
