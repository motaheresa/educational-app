export interface Option {
    id: string;
    text: string;
    isCorrect: boolean;
    questionId: string;
}

export interface Question {
    id: string;
    type: "MCQ" | "TRUE_FALSE";
    header: {
        text: string;
    };
    degree: number;
    assignmentId: string;
    options: Option[];
}

export interface APIExam {
    id: string;
    title: string;
    duration: number;
    passDegree: number;
    totalDegree: number;
    questionsCount: number;
    courseId: string;
    sectionId: string;
    createdAt: string;
    status: "DRAFT" | "PUBLISHED" | string;
    questions?: Question[];
    section?: {
        id: string;
        title: string;
        description: string;
        order: number;
        courseId: string;
        createdAt: string;
    };
}

export interface APIExamsResponse {
    success: boolean;
    data: APIExam[];
}
