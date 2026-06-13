import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getAllJobs } from "../store/slices/jobsSlice";
import { Filter, LocationEdit, Search } from "lucide-react";
import JobList from "../components/jobs/JobList";

const JobsPage = () => {
    const dispatch = useAppDispatch();
    const { jobs, isLoading } = useAppSelector((state) => state.jobs);
    const [filters, setFilters] = useState({
        search: "",
        location: "",
        type: "",
    });

    useEffect(() => {
        dispatch(getAllJobs(filters));
    }, [dispatch, filters]);

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const jobTypes = [
        { value: "full-time", label: "Full time" },
        { value: "part-time", label: "Part time" },
        { value: "internship", label: "Internship" },
        { value: "freelance", label: "Freelance" },
    ];

    return (
        <div className="min-h-screen space-y-8">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl">
                    Discover Your Next Oppurtunity
                </h1>
                <p className="">
                    Browse through {jobs.length} available positions from top
                    companies
                </p>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6 ">
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="relative">
                        <div className="absolute items-center  left-0 pl-3 flex top-3  pointer-events-none ">
                            <Search className="w-5 h-5 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search Jobs, companies or keywords..."
                            onChange={(e) =>
                                handleFilterChange("search", e.target.value)
                            }
                            className="w-full pl-10 py-2 rounded-lg border border-gray-500 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute items-center  left-0 pl-3 flex top-3  pointer-events-none">
                            <LocationEdit className="w-5 h-5 text-gray-500" />
                        </div>
                        <input
                            type="Location"
                            placeholder="Location"
                            onChange={(e) =>
                                handleFilterChange("location", e.target.value)
                            }
                            className="pl-10 py-2 pr-3 w-full border border-gray-500 rounded-lg focus:outline-none focus:ring-2 
                            focus:ring-blue-300 focus:border-transparent"
                        />
                    </div>

                    <div className="relative">
                        <div className="flex items-center absolute pl-3 left-0 inset-y-0 pointer-events-none">
                            <Filter className="w-5 h-5 text-gray-400" />
                        </div>
                        <select
                            value={filters.type}
                            id="selected-type"
                            className="w-full pl-10 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 
                            focus:ring-blue-300 focus:border-transparent 
                            appearance-none "
                            onChange={(e) =>
                                handleFilterChange("type", e.target.value)
                            }
                        >
                            {jobTypes.map((job) => (
                                <option value={job.value} key={job.value}>
                                    {job.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <JobList jobs={jobs} isLoading={isLoading} />
        </div>
    );
};

export default JobsPage;
