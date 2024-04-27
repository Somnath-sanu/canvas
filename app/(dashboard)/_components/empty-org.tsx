import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CreateOrganization } from "@clerk/nextjs"
import Image from "next/image"

export const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
      src={"/elements.svg"}
      alt="Empty"
      height={200}
      width={200}
      />
      <h2 className="text-2xl font-semibold mt-6">Welcome to Board</h2>
      <p className="text-muted-foreground mt-2 text-sm">Create an organisation to get started</p>
      <div className="mt-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"lg"}>
            Create organization
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 text-gray-300 bg-transparent border-none max-w-[465px] ">
          <CreateOrganization/>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  )
}

//! as child so that it does not  mess u with styles and cause hydration errors