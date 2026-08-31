import { Button } from "~/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet"

const Example = () => (
  <Sheet>
    <SheetTrigger render={<Button variant="outline" />}>Menu</SheetTrigger>
    <SheetContent side="left">
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>
      <nav className="flex flex-col gap-4 p-4">
        <a className="font-medium text-sm hover:underline" href="#">
          Home
        </a>
        <a className="font-medium text-sm hover:underline" href="#">
          Products
        </a>
        <a className="font-medium text-sm hover:underline" href="#">
          About
        </a>
        <a className="font-medium text-sm hover:underline" href="#">
          Contact
        </a>
      </nav>
    </SheetContent>
  </Sheet>
)

export default Example
