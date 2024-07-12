import React, { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import AddEmployeeModal from "@/components/add/addEmployeeModal";

function AddEmployee() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Button
        className="rounded-lg h-fit w-full max-w-xs mx-auto hover:shadow-lg transition-shadow"
        onClick={() => setShowModal(true)}
      >
        <CardContent className="p-3 text-center flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="mt-2 text-sm font-bold text-muted-foreground">
            Add Employee
          </h2>
        </CardContent>
      </Button>
      <AddEmployeeModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default AddEmployee;
