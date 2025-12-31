export interface Lesson {
    id: string;
    title: string;
    type: "VIDEO" | "QUIZ" | "FILE";
    order: number;
    meta: any | null;
    sectionId: string;
}

export interface Section {
    id: string;
    title: string;
    description: string;
    order: number;
    courseId: string;
    lessons: Lesson[];
}

export interface APICourse {
    id: string;
    title: string;
    description: string;
    banner: string | null;
    price: number;
    grade: string;
    subject: string;
    createdAt: string;
    sections: Section[];
}

// Maps to the UI Course interface
export interface UICourse {
    id: string;
    name: string;
    description: string;
    icon?: any; // ReactNode is not serializable if passed from server, but we can resolve this in client comp
    iconBg?: string;
    subscriberCount: number;
    videoCount: number;
    price: number;
    status: "active" | "inactive" | "soon";
}
