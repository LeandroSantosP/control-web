export const getItem = async () => {
  try {
    const data = await Promise.resolve(localStorage.getItem('auth'));

    return data && JSON.parse(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const setItem = async (data: any) => {
  try {
    return await Promise.resolve(
      localStorage.setItem('auth', JSON.stringify(data))
    );
  } catch (error) {
    return Promise.reject(error);
  }
};
