const BASE_URL = process.env.NEXT_PUBLIC_ENVIRONMENT === 'local' ?
`http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:8080` : process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev' ?
`https://${process.env.NEXT_PUBLIC_BACKEND_HOST}` : process.env.NEXT_PUBLIC_ENVIRONMENT === 'prod' ?
`https://${process.env.NEXT_PUBLIC_BACKEND_HOST}` : null;

export type CallBack = (response: any, error?: any) => void;

export interface ExecuteOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    headers?: Record<string, string>
    body?: any,
    queryParams?: Record<string, string>,
    callback?: CallBack,
    isFormData?: boolean
}

type Endpoints = {
    experiment: 'run' | 'status' | 'results'
}

type ApiCategory = keyof Endpoints;
type ApiAction<T extends ApiCategory> = Endpoints[T];

export default async function execute<T extends ApiCategory>(
    category: T,
    action: ApiAction<T>, 
    options: ExecuteOptions = {}
) {
    const { method = 'GET', headers = {}, body, queryParams, callback, isFormData } = options;

    if(!BASE_URL){
        console.error('No base URL. Check environment variable in .env');
        return; 
    }

    const queryString = queryParams ?
    '?' + new URLSearchParams(queryParams)?.toString()
    : '';

    const endpoint = `${BASE_URL}/${category}/${action}${queryString}`;

    try {
        const response = await fetch(endpoint, {
            method: method,
            headers: isFormData ? headers : {
                'Content-Type': 'application/json',
                ...headers
            },
            body: isFormData ? body : body ? JSON.stringify(body) : undefined
        });

        const data = await response.json();

        if(response.ok){
            if(callback) callback(data);
            return data;      
        }else{
            const error = new Error(data?.message || 'API call failed');
            throw error;
        }
    } catch(error) {
        console.error('Error executing api call: ', error);
        if(callback) callback(null, error);
    }
}