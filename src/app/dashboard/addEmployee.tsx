import React, { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import AddEmployeeModal from "@/components/add/addEmployeeModal";

function AddEmployee() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="flex justify-center my-4 w-full">
      <button
        className="ml-4 p-2 bg-blue-500 text-white rounded hover:shadow-lg transition-shadow flex items-center"
        onClick={openModal}
      >
        <User className="h-4 w-4 mr-2" />
        <span>Add Employee</span>
      </button>
      {showModal && (
        <AddEmployeeModal show={showModal} onClose={closeModal} />
      )}
    </div>
  );
}

export default AddEmployee;
