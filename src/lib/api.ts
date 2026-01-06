export const BASE_URL = "https://lmsbackend-production-f24f.up.railway.app";

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    

    const defaultHeaders = {
        "Content-Type": "application/json",
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
        cache: options.cache || 'no-store', // Default to no-store for dynamic data in server components
    };

    try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
            console.log(response);
            
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const json: ApiResponse<T> = await response.json();
        console.log(json);

        if (!json.success && json.success !== undefined) {
            // Some APIs might not return success field, checking if defined
            throw new Error(json.message || "Unknown API Error");
        }

        // If the API wrapper structure is consistently { success: true, data: ... }
        // return json.data;
        // However, the user provided example shows the response IS the object with success/data.
        // The type T should roughly match 'data' or the full response? 
        // Usually fetchAPI returns T, where T is the expected data.
        // Let's assume T is the type of 'data' field.

        
        return json.data;

    } catch (error) {
        console.error(`Fetch error for ${url}:`, error);
        throw error;
    }
}
