import Client from "./Client";

interface Meta {
    request_id: string
}


interface RegisterResponse {
    meta: Meta,
    data: Client
}

export default RegisterResponse;
