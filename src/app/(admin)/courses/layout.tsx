import { ReactNode } from "react"

export default function CoursesLayout({
    children,
    modal
}: {
    children: ReactNode
    modal: ReactNode
}) {
    return (
        <>
            {children}
            {modal}
        </>
    )
}
