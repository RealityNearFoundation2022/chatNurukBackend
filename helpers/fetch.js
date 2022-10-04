const baseUrl = process.env.NURUCK_API_URL;

const fetchConToken = async( endpoint, token, data, method = 'GET' ) => {
  const url = `${ baseUrl }/${ endpoint }`;
  if ( method === 'GET' ) {
      const resp = await fetch( url, {
          headers: {
            //   'x-token': token,
              'Authorization': `Bearer ${token}`
          }
      });
      return await resp.json();
  } else {
      const resp = await fetch( url, {
          method,
          headers: {
              'Content-type': 'application/json',
            //   'x-token': token,
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify( data )
      })
      return await resp.json();
  }
}
module.exports = { fetchConToken }
