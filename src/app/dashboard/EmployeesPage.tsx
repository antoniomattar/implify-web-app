import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Employee } from "@/lib/Employee";
import LoadingSkeleton from "@/components/loading";
import UserCard from "@/components/card";
import AddEmployee from "./addEmployee";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const EmployeesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(5);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [filter, setFilter] = useState({
    name: "",
    companies: [] as string[],
  });

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Function to fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees"); // Adjust the API endpoint as needed
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data; // Return the fetched employees
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      return [];
    }
  };

  // Effect hook to fetch employees on component mount
  useEffect(() => {
    const fetchEmployeesData = async () => {
      setLoading(true);
      const fetchedEmployees = await fetchEmployees();
      setEmployees(fetchedEmployees);
      setLoading(false);
    };

    fetchEmployeesData();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(Math.ceil(employees.length / employeesPerPage));
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(employees.length / employeesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleEmployeesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEmployeesPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page on employees per page change
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value,
    });
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleCompanyCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const companyName = event.target.value;
    setFilter((prevFilter) => {
      if (event.target.checked) {
        return {
          ...prevFilter,
          companies: [...prevFilter.companies, companyName],
        };
      } else {
        return {
          ...prevFilter,
          companies: prevFilter.companies.filter(
            (company) => company !== companyName
          ),
        };
      }
    });
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Get unique company names from employees
  const uniqueCompanies = Array.from(
    new Set(employees.map((employee) => employee.company))
  );

  // Apply filters to the employees list
  const filteredEmployees = employees.filter((employee) => {
    const matchesName = employee.fname
      .toLowerCase()
      .includes(filter.name.toLowerCase());
    const matchesCompany =
      filter.companies.length === 0 ||
      filter.companies.includes(employee.company);
    return matchesName && matchesCompany;
  });

  // Calculate the total pages based on filtered employees
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  // Calculate the current employees to display
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const router = useRouter();

  if (loading) return <LoadingSkeleton />;

  return (
    <div>
      <main className="flex-1 p-4 sm:px-6 sm:py-0">
        <div className="flex justify-between items-center my-4 gap-4">
          {/* Employees per page */}
          <div className="flex items-center">
            <label htmlFor="employeesPerPage" className="mr-2">
              Employees per page:
            </label>
            <select
              id="employeesPerPage"
              value={employeesPerPage}
              onChange={handleEmployeesPerPageChange}
              className="p-1 border border-gray-300 rounded"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center ml-auto gap-4">
            {/* Add Employee Card */}
            <AddEmployee />

            {/* Show Filters Button */}
            <button
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {isFilterVisible ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>

        {isFilterVisible && (
          <fieldset className="border border-gray-300 p-4 rounded mb-4">
            <legend className="text-lg font-semibold">Filters</legend>
            <div className="mb-4">
              <label htmlFor="nameFilter" className="mr-2">
                First Name:
              </label>
              <input
                id="nameFilter"
                name="name"
                type="text"
                value={filter.name}
                onChange={handleFilterChange}
                className="p-1 border border-gray-300 rounded"
              />
            </div>
            <div>
              <p className="font-semibold mb-2">Filter by company:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {uniqueCompanies.map((company) => (
                  <div key={company} className="flex items-center">
                    <input
                      type="checkbox"
                      id={company}
                      value={company}
                      checked={filter.companies.includes(company)}
                      onChange={handleCompanyCheckboxChange}
                      className="mr-2"
                    />
                    <label htmlFor={company}>{company}</label>
                  </div>
                ))}
              </div>
            </div>
          </fieldset>
        )}

        {/* Employees Cards */}
        <div className="grid gap-6 my-5">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center">
            {currentEmployees.map((employee) => (
              <UserCard key={employee.id} {...employee} />
            ))}
          </div>
        </div>

        {/* Pagination Logic */}
        <Pagination className="items-center">
          <button
            onClick={goToFirstPage}
            disabled={currentPage === 1}
            className="hover:bg-slate-100 rounded-lg p-3 m-3 text-xs"
          >
            First
          </button>
          <PaginationPrevious onClick={goToPreviousPage} />
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, i) => {
              const isActive = currentPage === i + 1;
              return (
                <PaginationItem
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`${
                    isActive ? "bg-slate-100 rounded-full" : ""
                  } p-2 m-1`}
                >
                  <PaginationLink>{i + 1}</PaginationLink>
                </PaginationItem>
              );
            })}
          </PaginationContent>
          <PaginationNext onClick={goToNextPage} />
          <button
            onClick={goToLastPage}
            disabled={currentPage === totalPages}
            className="hover:bg-slate-100 rounded-lg p-3 m-3 text-xs"
          >
            Last
          </button>
        </Pagination>
      </main>
    </div>
  );
};
