
export const fetchUserLogin = async (email: string, password: string): Promise<any> => {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({
                email,
                password
            }),
            next: { revalidate: 0 }
        });
        
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return null;
    }
};

export const fetchCreateSession = async (userId: string, userDevice: string, userIp: string, sessionToken: string, sessionExpires: Date): Promise<any> => {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/create-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({
                userId,
                userDevice,
                userIp,
                sessionToken,
                sessionExpires
            }),
            next: { revalidate: 0 }
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear sesión:', error);
        return null;
    }
}

export const fetchActiveSession = async (sessionToken: string): Promise<any> => {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/active-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({
                sessionToken
            }),
            next: { revalidate: 0 }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener sesión activa:', error);
        return null;
    }
}

export const saveVerificationToken = async (userId: string, token: string): Promise<any> => {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/save-verification-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({
                userId,
                token,
                expires
            }),
            next: { revalidate: 0 }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al guardar o actualizar veirificacion del token:', error);
        return null;
    }
}

export const fetchEmailVerification = async (sessionToken: string): Promise<any> => {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/email-verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({
                sessionToken
            }),
            next: { revalidate: 0 }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al verificar el email:', error);
        return null;
    }
}

export const updateUserDeleteEmailVerification = async (userId: string, token: string): Promise<any> => {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/update-user-verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({
                userId,
                token,
            }),
            next: { revalidate: 0 }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar user del token:', error);
        return null;
    }
}