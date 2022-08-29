const baseUrl = process.env.NURUCK_API_URL;


export const fetchConToken = async( endpoint, data, method = 'GET' ) => {

  const url = `${ baseUrl }/${ endpoint }`;
  const token = localStorage.getItem('token') || '';

  if ( method === 'GET' ) {
      const resp = await fetch( url, {
          headers: {
              'x-token': token,
              'Authorization': `Bearer ${token}`
          }
      });
      return await resp.json();
  } else {
      const resp = await fetch( url, {
          method,
          headers: {
              'Content-type': 'application/json',
              'x-token': token,
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify( data )
      })

      return await resp.json();
  }

}