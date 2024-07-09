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
import LoadingSkeleton from "@/components/loading";
import { User } from "lucide-react";
import UserCard from "@/components/card";

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

  if (currentEmployees.length == 0) return <LoadingSkeleton />;

  return (
    <div>
      <main className="flex-1 p-4 sm:px-6 sm:py-0">
        {/* Employees Cards */}
        <div className="grid gap-6 my-5">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center">
            {currentEmployees.map((employee) => (
              <UserCard key={employee.id} {...employee} />
            ))}

            {/* Add Employee Card */}
            <Button
              className="rounded-3xl h-fit w-fit max-w-md mx-auto hover:shadow-2xl transition-shadow"
              onClick={() => router.push("/dashboard/add")}
            >
              <CardContent className="p-6 text-center flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                  <User className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="mt-4 text-lg font-bold text-muted-foreground">
                  Add Employee
                </h2>
              </CardContent>
            </Button>
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
