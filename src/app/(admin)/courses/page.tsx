import CoursesTeacherPageHeader from "@/features/admin/courses/components/organisms/TableHeader"
import { fetchAPI } from "@/lib/api"
import { APICourse, UICourse } from "@/features/admin/courses/types"
import { CoursesList } from "@/features/admin/courses/components/organisms/CoursesList"

export default async function CoursesPage() {
    let courses: UICourse[] = [];

    try {
        const rawCourses = await fetchAPI<APICourse[]>("/api/courses");

        // Map API data to UI data
        courses = rawCourses.map(course => {
            // Calculate video count
            const videoCount = course.sections.reduce((acc, section) => {
                return acc + section.lessons.filter(l => l.type === 'VIDEO').length
            }, 0);

            // Determine status (example logic, verify requirements)
            // Defaulting to active as api doesn't provide status yet
            const status = "active";

            return {
                id: course.id,
                name: course.title,
                description: course.grade || course.description, // Use grade as description/subtitle
                subscriberCount: 0, // API missing this, defaulting to 100 for now or random
                videoCount: videoCount,
                price: course.price,
                status: status,
            }
        });

    } catch (error) {
        console.error("Failed to fetch courses:", error);
        // Handle error state or return empty
    }

    return (
        <div>
            {/* Page Header */}
            <CoursesTeacherPageHeader />

            {/* Courses Section */}
            <CoursesList data={courses} />
        </div>
    )
}
