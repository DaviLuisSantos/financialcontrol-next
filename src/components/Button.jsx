import { Button } from "@/components/ui/button"

export function ButtonDemo({ btnText, onClick = null }) {
    return (
        <Button onClick={onClick} id="button">
            {btnText}
        </Button>
    )
}