export interface APIStudent {
    id: string;
    name: string;
    phone: string;
    email: string;
    courses: string[];
    createdAt: string;
    status: string;
    image?: string;
}

export interface StudentsPayload {
    data: APIStudent[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    }
}

export interface APIStudentDetails {
    id: string;
    name: string;
    phone: string;
    email: string;
    parentPhone: string;
    notes: string;
    status: string;
    createdAt: string;
    image?: string;
    courses: {
        id: string;
        studentId: string;
        courseId: string;
        createdAt: string;
        course: {
            id: string;
            title: string;
            description: string;
            banner: string;
            price: number;
            grade: string;
            subject: string;
            createdAt: string;
        }
    }[];
}


export interface APIStudentsResponse {
    success: boolean;
    data: StudentsPayload;
}

export interface CreateStudentRequest {
    name: string;
    phone: string;
    email: string;
    parentPhone: string;
    notes: string;
    courses: string[];
}
