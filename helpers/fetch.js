const baseUrl = process.env.NURUCK_API_URL;

const fetchConToken = async( endpoint, data, method = 'GET' ) => {
  const url = `${ baseUrl }/${ endpoint }`;
  // window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjI2ODE3ODcsInN1YiI6IjEifQ.eJgmQ9oD-7I_W5sSxiwyxICgqZ1prrz6YPUueCKb0C0");
  const token = localStorage.getItem('token') || '';
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