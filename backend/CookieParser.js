// Function to parse the raw cookie header into an object
function parseCookies(cookieHeader) {
  const cookieList = cookieHeader.split(';');
  const cookies = {};
  
  cookieList.forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    cookies[name] = value;
  });
  return cookies;
}

// Access specific cookies by their names
export default parseCookies; // This will give you the value of the 'token' cookie




