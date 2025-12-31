
import AddCoursePage from "../../create/page";
import { Modal } from "@/components/ui/modal-parallel";

export default function InterceptedCreatePage() {
    return (
        <Modal>
            <div className="bg-background rounded-lg h-[90vh] overflow-y-auto w-full max-w-5xl">
                <AddCoursePage />
            </div>
        </Modal>
    )
}
