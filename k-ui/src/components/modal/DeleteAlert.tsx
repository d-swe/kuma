import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
  import { Dispatch, SetStateAction } from "react";
  
  export function DeleteAlert({ showAlert, setShowAlert, onConfirm, description} : {
    showAlert: boolean, 
    setShowAlert: Dispatch<SetStateAction<boolean>>,
    onConfirm: () => void,
    description: string
    }) {

    return (
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {onConfirm(), setShowAlert(false)}} className="bg-red-500">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  