import { Building, Clock, MapPin } from "lucide-react";
import type { Job } from "../../store/slices/jobsSlice";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export const getJobTypeColor = (type: string) => {
    switch (type) {
        case "full-time":
            return "bg-green-100 text-green-800";
        case "part-time":
            return "bg-blue-100 text-blue-800";
        case "freelance":
            return "bg-purple-100 text-purple-800";
        case "internship":
            return "bg-yellow-100 text-yellow-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const JobCard = ({ job }: { job: Job }) => {
    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300  p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {job.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                        <Building className="h-4 w-4 mr-2" />
                        <span>{job.company.name}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="capitalize">{job.location}</span>
                    </div>
                </div>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getJobTypeColor(
                        job.employmentType
                    )}`}
                >
                    {job.employmentType.replace("-", " ")}
                </span>
            </div>
            <p className="text-gray-700 mb-4 max-h-20 overflow-auto ">
                {job.description}
            </p>

            <div className="flex text-center gap-2 items-center mt-auto">
                <Clock className="w-4 h-4 text-gray-600" />
                <span>
                    Posted{" "}
                    {job?.createdAt
                        ? format(new Date(job.createdAt), "dd MMM yyyy")
                        : "N/A"}
                </span>

                <Link
                    to={`/jobs/${job._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-auto hover:bg-blue-700 transition-colors duration-200"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default JobCard;
