import type { Job } from "../../store/slices/jobsSlice";
import LoadingSpinner from "../common/LoadingSpinner";
import JobCard from "./JobCard";

interface JobListProps {
    jobs: Job[];
    isLoading?: boolean;
    emptyMessage?: string;
}

const JobList = ({
    jobs,
    isLoading = false,
    emptyMessage = "No jobs found",
}: JobListProps) => {
    if (isLoading) {
        return <LoadingSpinner size="lg" />;
    }

    console.log(jobs.length);

    if (jobs.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8">
                    <p className="text-gray-500 text-lg">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, index) => (
                <JobCard job={job} key={index} />
            ))}
        </div>
    );
};

export default JobList;
