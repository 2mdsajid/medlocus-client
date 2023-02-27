import localForage from 'localforage';
import Cookies from 'js-cookie';

const storelocalStorage = async (key, value) => {
  try {
    await localForage.setItem(key, value);
    // console.log('local storage data stored successfully!');
  } catch (error) {
    console.error('Error storing local storage data: ', error);
  }
};

const loadlocalStorage = async (key) => {
  try {
    const value = await localForage.getItem(key);
    //   console.log('local storage data loaded successfully!');
    return value;
  } catch (error) {
    console.error('Error loading local storage data: ', error);
  }
};

const updatelocalStorage = async (key, newValue) => {
  try {
    const oldValue = await localForage.getItem(key);
    const updatedValue = { ...oldValue, ...newValue }; // merge old and new values
    await localForage.setItem(key, updatedValue);
    //   console.log('local storage data updated successfully!');
  } catch (error) {
    console.error('Error updating local storage data: ', error);
  }
};

const deletelocalStorage = async (key) => {
  try {
    await localForage.removeItem(key);
    // console.log(`local storage data with key "${key}" has been deleted.`);
  } catch (error) {
    console.error(`Error deleting local storage data with key "${key}":`, error);
  }
}


const userLoggedIn = async () => {
  // const res = await fetch('/checkloggedin', {
  //   method: 'GET',
  //   headers: {
  //     // because there is cookies
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'
  //   },

  //   // bwcause cookies is there
  //   credentials: 'include'
  // })

  // const data = await res.json()

  const user_logged = Cookies.get("logintoken");
  console.log(user_logged)

  // console.log(data)

  if (user_logged) {
    console.log('true')
  } else {
    console.log('false')
    // return false
  }
}

export { storelocalStorage, loadlocalStorage, updatelocalStorage, deletelocalStorage, userLoggedIn }