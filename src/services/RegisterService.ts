import RegisterRequest from "../interfaces/RegisterRequest";
import RegisterResponse from "../interfaces/RegisterResponse";
 
const SUPERMETRICS_SERVICE_HOST: (string | undefined) = process.env.REACT_APP_SUPERMETRICS_SERVICE_HOST;
const ENDPOINT: string = SUPERMETRICS_SERVICE_HOST ? `${SUPERMETRICS_SERVICE_HOST}register` : "";

const handleResponse = (response: Response): Promise<RegisterResponse> => {

    let registerResponse: RegisterResponse = {};

    return response.json()
        .then((data: RegisterResponse) => {
            registerResponse = data;
            return registerResponse;

        }).catch((error: any) => {
            registerResponse.error = handleError(error);
            return registerResponse;
        })
}

const handleError = (error?: any) => {

    let errorProcessed: Error;

    if (error && typeof(error) == "string") {
        errorProcessed = new Error(error);

    } else if (error && error instanceof Error) {
        errorProcessed = error;

    } else {
        errorProcessed = new Error("Unknown error");
    }

    return errorProcessed;
}

function _checkDataErrors(registerRequest: RegisterRequest): Error | null {

    let error = null;

    if (!ENDPOINT) {
        error = new Error("Server endpoint is missing");
    
    } else if (!registerRequest) {
        error = new Error("Required data for register is missing");

    } else {

        if (!registerRequest.client_id) {
            error = new Error("Client_id is missing");

        } else if (!registerRequest.email) {
            error = new Error("Email is missing");
        
        } else if (!registerRequest.name) {
            error = new Error("Name is missing");
        }
    }

    return error;
}

export async function doRequest(registerRequest: RegisterRequest): Promise<RegisterResponse> {

    let registerResponse: RegisterResponse = {};

    let error = _checkDataErrors(registerRequest);

    if (error) {
        registerResponse.error = error
        return registerResponse;
    }

    try {

        const option = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerRequest)
        };

        await fetch(ENDPOINT, option)
            .then(async (response: Response) => {
                registerResponse = await handleResponse(response);

            }).catch((error: any) => {
                registerResponse.error = handleError(error);
            })


    } catch(error: any) {
        registerResponse.error = handleError(error);
    }

    return registerResponse;
}



export async function registerClient(registerRequest: RegisterRequest): Promise<RegisterResponse> {

    let registerResponse: RegisterResponse = await doRequest(registerRequest);
    return registerResponse;
}


const RegisterService = {
    registerClient
}

export default RegisterService;
