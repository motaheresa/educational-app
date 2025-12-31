import { Modal } from "@/components/ui/modal-parallel";
import AddCoursePage from "../../create/page";

export default function InterceptedCreateData() {
    return (
        <Modal>
            <div className="bg-background rounded-lg max-h-[90vh] overflow-y-auto">
                <AddCoursePage />
            </div>
        </Modal>
    )
}
