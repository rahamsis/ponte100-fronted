'use server';

/* eslint-disable */

export async function getGrados() {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/grados`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            next: { revalidate: 0 }
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error al obtener los temas:', error);
        throw new Error("Error al obtener los temas");
    }
}

export async function getGradosById(id: string) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/gradosById?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            next: { revalidate: 0 }
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error al obtener el grado (getGradosById):', error);
        throw new Error("Error al obtener el grado (getGradosById)");
    }
}

export async function updateGradoByUserId(userId: string, idGrado: string) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/updateUserGrado`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({
                userId,
                idGrado
            }),
            next: { revalidate: 0 }
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error actualizando grado:", error);
        return { success: false, error };
    }
}

export async function getMainMenu() {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/mainmenu`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            next: { revalidate: 0 }
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error al obtener el menu principal:', error);
        throw new Error("Error al obtener el menu principal");
    }
}

// **************************** Inicio de los simuladores *****************************************
export async function fetchTemas() {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/temas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            next: { revalidate: 0 }
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error al obtener los temas:', error);
        throw new Error("Error al obtener los temas");
    }
}

export async function fetchQuestionByIdTema(idTema: string, limit: number) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/questions-by-idtema`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ idTema, limit }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data.map((row: any) => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));

        // return data;
    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        throw new Error("Error al obtener las preguntas");
    }
}

export async function fetchQuestionRamdonWithLimit(limit: number) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/questions-random-with-limit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ limit }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data.map((row: any) => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));

    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        throw new Error("Error al obtener las preguntas");
    }
}

export async function fetchSaveIncorrectQuestions(userId: string, correctQuestionsIds: string[]) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/save-incorrect-questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ userId, correctQuestionsIds }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al guardar las preguntas fallidas (fetchSaveIncorrectQuestions):', error);
        throw new Error("Error al guardar las preguntas fallidas (fetchSaveIncorrectQuestions");
    }
}

export async function fetchQuestionSiecopol(limit: number) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/questions-siecopol`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ limit }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data.map((row: any) => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));

    } catch (error) {
        console.error('Error al obtener las preguntas (fetchQuestionSiecopol):', error);
        throw new Error("Error al obtener las preguntas (fetchQuestionSiecopol");
    }
}


export async function fetchValidatePersonByCipAndDni(email: any, cip: string, dni: string) {
    try {
        if (email === null || email === undefined) {
            return false
        }

        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/validate-person-by-cipdni`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ email, cip, dni }),
            next: { revalidate: 0 }
        });

        const data = await response.json();

        if (data.length === 0) {
            return false;
        }

        return data.map((row: any) => ({
            userId: row.userId,
        }));

    } catch (error) {
        console.error('Error al validar persona por CIP y DNI:', error);
        throw new Error("Error al validar persona por CIP y DNI");
    }
}

export async function fetchIncorrectQuestions(userId: string, quantity: number) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/incorrect-questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ userId, quantity }),
            next: { revalidate: 0 }
        });

        const data = await response.json();

        return data.map((row: any) => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer,
            intentos: row.intentos
        }));
    } catch (error) {
        console.error('Error al obtener las preguntas fallidas (fetchGetIncorrectQuestions):', error);
        throw new Error("Error al obtener las preguntas fallidas (fetchGetIncorrectQuestions");
    }
}

export async function updateIncorrectQuestions(userId: string, correctQuestionsIds: string[], incorrectQuestionIds: string[]) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/update-incorrect-questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ userId, correctQuestionsIds, incorrectQuestionIds }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al actualizar las preguntas fallidas (updateIncorrectQuestions):', error);
    }
}

export async function fetchTableExams() {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/table-exams`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            next: { revalidate: 0 }
        });

        const data = await response.json();

        return data.map((row: any) => ({
            idExamen: row.idExamen,
            titulo: row.titulo,
            descripcion: row.descripcion
        }));
    } catch (error) {
        console.error('Error al obtener los examenes (fetchTableExams):', error);
        throw new Error("Error al obtener los examenes (fetchTableExams");
    }
}

export async function fetchQuestionSiecopolWhitOffset(idExamen: string) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/questions-siecopol-with-offset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ idExamen }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data.map((row: any) => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));

    } catch (error) {
        console.error('Error al obtener las preguntas (fetchQuestionSiecopolWhitOffset):', error);
        throw new Error("Error al obtener las preguntas (fetchQuestionSiecopolWhitOffset");
    }
}

export async function fetchQuestionAndAnswer(idTema: string) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/questions-and-answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ idTema }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data.map((row: any) => ({
            id: row.id,
            question: row.question,
            idTema: idTema,
            tema: row.tema,
            claves: row.claves,
            correctAnswer: row.correctAnswer
        }));

        // return data;
    } catch (error) {
        console.error('Error al obtener las preguntas y respuestas:', error);
        throw new Error("Error al obtener las preguntas y respuestas");
    }
}

export async function fetchQuestionHabilidades(idTema: string, limit: number) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/questions-habilidades`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ idTema, limit }),
            next: { revalidate: 0 }
        });

        const data = await response.json();

        return data.map((row: any) => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));

        // return data;
    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        throw new Error("Error al obtener las preguntas");
    }
}

export async function fetchTallerByUserId(idUsuario:string) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/talleres-by-userId?userId=${idUsuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            // next: { revalidate: 0 }
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al obtener las preguntas (fetchTallerByUserId):', error);
        throw new Error("Error al obtener las preguntas (fetchTallerByUserId");
    }
}

export async function fetchQuestionToTaller(index: number, limit: number, offset: number) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/questions-taller`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ index, limit, offset }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data.map((row: any) => ({
            id: row.id,
            question: row.question,
            tema: row.tema,
            options: row.options.split("||"), // Convertir string a array
            correctAnswer: row.correctAnswer
        }));

    } catch (error) {
        console.error('Error al obtener las preguntas (fetchQuestionToTaller):', error);
        throw new Error("Error al obtener las preguntas (fetchQuestionToTaller");
    }
}

export async function fetchResultProgress(userId: string) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/progress-result`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ userId, }),
            next: { revalidate: 0 }
        });

        const data = await response.json();

        // Normalizar el resultado
        const rows = Array.isArray(data) ? data : data ? [data] : [];

        return rows.map((row: any) => ({
            idProgreso: row.idProgreso,
            idUsuario: row.idUsuario,
            tipoExamen: row.tipoExamen,
            timer: row.timer,
            intentos: row.intentos,
            totalPreguntas: row.totalPreguntas,
            correctas: row.correctas,
            // incorrectas: row.incorrectas,
            nulas: row.nulas,
            createdDate: row.createdDate,
            updatedDate: row.updatedDate
        }));

    } catch (error) {
        console.error('Error al obtener el reultado del progreso (fetchResultProgress):', error);
        throw new Error("Error al obtener el reultado del progreso (fetchResultProgress");
    }
}

export async function getQuantityFallidas(userId: string) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/quantityFallidas?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            next: { revalidate: 0 }
        });

        const data = await response.json();
        
        return data.map((row: any) => ({
            cantidadFallidas: row.cantidadFallidas,
        }));

    } catch (error) {
        console.error('Error al traer los datos del grado por el userId (gradoObjetivoByUserId):', error);
    }
}

export async function saveOrUpdateProgress(idUsuario: string, tipoExamen: string, timer: number, totalPreguntas: number, correctas: number,
    incorrectas: number, nulas: number,) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/save-or-update-progress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            body: JSON.stringify({ idUsuario, tipoExamen, timer, totalPreguntas, correctas,  incorrectas, nulas}),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al guardar las preguntas fallidas (fetchSaveIncorrectQuestions):', error);
        throw new Error("Error al guardar las preguntas fallidas (fetchSaveIncorrectQuestions");
    }
}

export async function getGradoObjetivoByUserId(userId: string) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/gradoObjetivoByUserId?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al traer los datos del grado por el userId (gradoObjetivoByUserId):', error);
    }
}

export async function getUserdata(userId: string) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/user-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ userId, }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data.map((row: any) => ({
            userId: row.userId,
            profile: row.profile,
            nombre: row.nombre,
            apellidos: row.apellidos,
            email: row.email,
            grupo: row.grupo,
            grado: row.grado,
            dni: row.dni,
            cip: row.cip,
            fechaNacimiento: row.fechaNacimiento,
            genero: row.genero,
            username: row.username,
            password: row.password,
            telefono: row.telefono,
            direccion: row.direccion,
            ciudad: row.ciudad,
            codigoPostal: row.codigoPostal,
            provincia: row.provincia,
            terminosCondiciones: row.terminosCondiciones
        }));

    } catch (error) {
        console.error('Error al traer los datos del usuario (getUserdata):', error);
    }
}

export async function updatetUserdata(userId: string, data: any) {
    try {
        const bodyData = { userId, ...data }

        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/user-update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify(bodyData),
            next: { revalidate: 0 }
        });

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Error al actualizar los datos del usuario (updatetUserdata):', error);
    }
}

export async function fetchAllUsers() {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/all-users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            // next: { revalidate: 0 }
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al obtener id de los usuarios (fetchAllUsers):', error);
        throw new Error("Error al obtener id de los usuarios (fetchAllUsers");
    }
}

export async function fetchAllTalleres() {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/all-talleres`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            // next: { revalidate: 0 }
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al obtener los Ids de los talleres (fetchAllTalleres):', error);
        throw new Error("Error al obtener Ids de los talleres (fetchAllTalleres");
    }
}

export async function InsertOrUpdateTallerToOneUser(idUsuario: string, idTaller: string, activo : boolean, idUsuarioregistro:string) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/backendApi/set-taller-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ idUsuario, idTaller, activo, idUsuarioregistro }),
            next: { revalidate: 0 }
        });

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Error al actualizar los datos del usuario and taller (InsertOrUpdateTallerToOneUser):', error);
    }
}

export async function getSignature(userId: string) {
    const response = await fetch(`${process.env.APP_BACK_END}/cloudinary/signature?public_id=${userId}`);
    const data = await response.json();
    return data;
}

// **************************** Inicio de Culqui **************************************************

interface FormDataToPay {
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    identityType: string;
    identityCode: string;
    direccion: string;
    provincia: string;
    codigoPostal: string;
    departamento: string;
    nombreProducto: string;
    precio: number;
}

export async function getFormToken(formData: FormDataToPay, token: string) {
    try {
        console.log('Creating payment intent with amount:');
        const totalEnCentimos = formData.precio * 100;
        // Enviar al backend para crear el cargo con el token
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/culqi/charge`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token,
                email: formData.email,
                amount: totalEnCentimos,
                producto: formData.nombreProducto,
                cliente: {
                    nombre: formData.nombre,
                    apellidos: formData.apellidos,
                    telefono: formData.telefono,
                    direccion: formData.direccion,
                    departamento: formData.departamento,
                    provincia: formData.provincia,
                    codigoPostal: formData.codigoPostal,
                    identityType: formData.identityType,
                    identityCode: formData.identityCode
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error en el backend:', errorData);
            throw new Error('No se pudo procesar el cargo con Culqi');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al crear el pago (createPaymentIntent):', error);
    }
}

// **************************** Fin de Culqui **************************************************

// **************************** Inicio de Zoom Meeting **************************************************
export async function startMeeting () {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/zoom/create-meeting`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            // body: JSON.stringify({ phone }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al iniciar una reunión (startMeeting):', error);
    }
}

export async function saveStartMeeting(idUsuario: string) {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/zoom/save-meeting`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            body: JSON.stringify({ idUsuario}),
            next: { revalidate: 0 }
        });

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Error al guardar datos de la reunión (saveStartMeeting):', error);
    }
}

export async function getActiveMeeting () {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/zoom/active-meeting`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            // body: JSON.stringify({ phone }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al consultar una reunión activa (getActiveMeeting):', error);
    }
}

export async function getLastMeeting () {
    try {
        const response = await fetch(`${process.env.APP_BACK_END}/zoom/last-meeting`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': '/'
            },
            // body: JSON.stringify({ phone }),
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al traer la ultima reunión (startMeeting):', error);
    }
}
