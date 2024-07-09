"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Employee } from "@/lib/Employee";
import LoadingSkeleton from "@/components/loading";
import Header from "@/app/dashboard/header";
import UserCard from "@/components/card";

export default function Page({ params }: { params: { id: string } }) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const id = params.id;

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        const { data } = await axios.get(`/api/employees/${id}`);
        if (data) setEmployee(data[0]);
      };
      fetchEmployee();
    }
  }, [id]);

  const handleUpdate = async () => {
    await axios.put(`/api/employees/${id}`, employee);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    // Open a confirmation dialog before deleting

    
    await axios.delete(`/api/employees/${id}`);
    router.push("/dashboard");
  };

  if (!employee) return <LoadingSkeleton />;

  return (
    <div>
      <Header />

      <div className="container mx-auto p-4">
        {isEditing ? (
          <div className="bg-white shadow-md rounded p-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fname"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fname"
                type="text"
                value={employee.fname}
                onChange={(e) =>
                  setEmployee({ ...employee, fname: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lname"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lname"
                type="text"
                value={employee.lname}
                onChange={(e) =>
                  setEmployee({ ...employee, lname: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                value={employee.address}
                onChange={(e) =>
                  setEmployee({ ...employee, address: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                type="text"
                value={employee.city}
                onChange={(e) =>
                  setEmployee({ ...employee, city: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="county"
              >
                County
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="county"
                type="text"
                value={employee.county}
                onChange={(e) =>
                  setEmployee({ ...employee, county: e.target.value })
                }
              />
            </div>


            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="company"
              >
                Company
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="company"
                type="text"
                value={employee.company}
                onChange={(e) =>
                  setEmployee({ ...employee, company: e.target.value })
                }
              />
            </div>
            {/* Add other fields similarly */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded p-6">
            <h1 className="text-2xl font-bold mb-4">
              {employee.fname} {employee.lname}
            </h1>
            <p className="text-gray-700 mb-4">
              Living at {employee.address}, {employee.city}, {employee.county}
              </p>
              <p className="text-gray-700 mb-4">
                Works at {employee.company}
              </p>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Back to Dashboard */}
      <div className="container mx-auto p-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}
