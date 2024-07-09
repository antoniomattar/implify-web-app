"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import { Employee } from "@/lib/Employee";
import { useRouter } from "next/navigation";
import Header from "./header";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { EmployeesPage } from "./EmployeesPage";

export default function Dashboard() {
  // State to hold employees data
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Function to fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees"); // Adjust the API endpoint as needed
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  // Effect hook to fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <EmployeesPage/>
    </div>
  );
}
