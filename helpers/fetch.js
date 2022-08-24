const baseUrl = process.env.BACKEND_API_URL;

// //Session storage Admin
localStorage.setItem('token',
    JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjE4NzYyMTYsInN1YiI6IjEifQ.cgI_RVAmouXdXFRo8P0deeAkVtNI4h9Y4oPEGjnVnko')
);

export const fetchConTokenUserMe = async ( ) => {
    const url = baseUrl/users/me;
    const token = localStorage.getItem('token') || '';
    if ( method === 'GET' ) {
        const resp = await fetch( url, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        return await resp.json();
    } else {
        const resp = await fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        })
        return await resp.json();
    }
}

export const fetchConTokenUsers = async( ) => {
    const url = baseUrl/users;
    const token = localStorage.getItem('token') || '';
    if ( method === 'GET' ) {
        const resp = await fetch( url, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        return await resp.json();
    } else {
        const resp = await fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        })
        return await resp.json();
    }
}
