"use client";

import {DashboardHeader} from "./header";
import { EmployeesPage } from "./EmployeesPage";

export default function Dashboard() {

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DashboardHeader />
      <EmployeesPage/>
    </div>
  );
}
