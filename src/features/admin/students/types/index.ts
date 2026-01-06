export interface UIStudent {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    phone: string;
    enrolledCourses: string[]; // List of course names
    registrationDate: string;
    status: "active" | "inactive" | "blocked";
}
