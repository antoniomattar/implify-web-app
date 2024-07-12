import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EmployeeInput from "@/components/EmployeeInput";
import { Employee } from "@/lib/Employee";
import axios from "axios";

export default function AddEmployeeModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const [employee, setEmployee] = useState<Omit<Employee, "id" | "photo">>({
    address: "",
    city: "",
    color: "",
    county: "",
    company: "",
    fname: "",
    lname: "",
  });

  if (!show) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEmployee((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(employee);
    axios.post("/api/employees", employee);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md mx-auto max-h-full overflow-y-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Add User</CardTitle>
            <CardDescription>
              Enter the users information to create a new account.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 md:space-y-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <EmployeeInput
                  id="fname"
                  label="First Name"
                  value={employee.fname}
                  onChange={handleChange}
                  placeholder="John"
                />
                <EmployeeInput
                  id="lname"
                  label="Last Name"
                  value={employee.lname}
                  onChange={handleChange}
                  placeholder="Doe"
                />
                <EmployeeInput
                  id="address"
                  label="Address"
                  value={employee.address}
                  onChange={handleChange}
                  placeholder="123 Main St"
                />
                <EmployeeInput
                  id="city"
                  label="City"
                  value={employee.city}
                  onChange={handleChange}
                  placeholder="San Francisco"
                />
                <EmployeeInput
                  id="color"
                  label="Color"
                  value={employee.color}
                  onChange={handleChange}
                  placeholder="Blue"
                />
                <EmployeeInput
                  id="county"
                  label="County"
                  value={employee.county}
                  onChange={handleChange}
                  placeholder="San Mateo"
                />
                <EmployeeInput
                  id="company"
                  label="Company"
                  value={employee.company}
                  onChange={handleChange}
                  placeholder="Acme Inc"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button onClick={onClose} className="bg-red-500 hover:bg-red-700">
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-700">
                Create User
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
