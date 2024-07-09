import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import React, { useState, useEffect } from "react";
import { Employee } from "@/lib/Employee";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export const EmployeesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(3); // State to control employees per page
  const [totalPages, setTotalPages] = useState(0);

  // State to hold employees data
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Function to fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees"); // Adjust the API endpoint as needed
      const data = await response.json();
      return data; // Return the fetched employees
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  // Effect hook to fetch employees on component mount
  useEffect(() => {
    // Fetch your employees data here and set it in state
    // For demonstration, assuming fetchEmployees() returns all employees
    const fetchEmployeesData = async () => {
      const fetchedEmployees = await fetchEmployees();
      setEmployees(fetchedEmployees);
      setTotalPages(Math.ceil(fetchedEmployees.length / employeesPerPage));
    };

    fetchEmployeesData();
  }, [employeesPerPage]);

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the current employees to display
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const router = useRouter();

  return (
    <div>
      <main className="flex-1 p-4 sm:px-6 sm:py-0">
        {/* Employees Cards */}
        <div className="grid gap-6 my-5">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {currentEmployees.map((employee) => (
              // TODO: Change background color of the card based on the employee's color
              <Card
                key={employee.id}
                style={{ backgroundColor: employee.color }}
              >
                <CardContent className="flex flex-col items-center gap-4 p-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>
                      {employee.fname[0]}
                      {employee.lname[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1 text-center">
                    <div className="font-semibold">
                      {employee.fname} {employee.lname}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {employee.fname}@implify.com
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => router.push(`/employee/${employee.id}`)}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pagination Logic */}
        <Pagination>
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i} onClick={() => handlePageChange(i + 1)}>
                <PaginationLink href="#">{i + 1}</PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
};
