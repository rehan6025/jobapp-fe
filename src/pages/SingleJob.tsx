import { useNavigate, useParams } from "react-router-dom";
import { getJobById } from "../store/slices/jobsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { formatDate } from "date-fns";
import { Building, Clock, MapPin } from "lucide-react";
import { getJobTypeColor } from "../components/jobs/JobCard";
import {
    applyToJobs,
    getUserApplications,
} from "../store/slices/applicationsSlice";

const SingleJob = () => {
    const { jobid } = useParams();
    if (!jobid) {
        return <div>No job found</div>;
    }
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);
    const { currentJob, isLoading } = useAppSelector((state) => state.jobs);
    const { userApplications } = useAppSelector((state) => state.applications);
    const dispatch = useAppDispatch();

    const [resumeUrl, setResumeUrl] = useState("");
    const [applyStatus, setApplyStatus] = useState<null | string>(null);

    useEffect(() => {
        dispatch(getUserApplications());
    }, [dispatch]);
    useEffect(() => {
        if (userApplications.some((app) => app.job === jobid)) {
            setApplyStatus("You have already applied for this job.");
        }
    }, [userApplications, jobid]);

    const handleApply = async () => {
        if (!resumeUrl) return;
        try {
            await dispatch(
                applyToJobs({ jobId: jobid, data: { resumeUrl } })
            ).unwrap();
            setApplyStatus("Application submitted!");
        } catch (err: any) {
            if (
                err?.response?.data?.message ===
                    "Already applied for this job" ||
                err?.message?.includes("status code 403")
            ) {
                setApplyStatus("You have already applied for this job.");
            } else {
                setApplyStatus("Failed to apply. Try again.");
            }
        }
    };

    useEffect(() => {
        if (jobid) {
            dispatch(getJobById(jobid));
        }
    }, [dispatch, jobid]);

    if (isLoading) {
        return <LoadingSpinner size="lg" />;
    }

    if (!currentJob) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="text-lg text-gray-500">Job not found.</span>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto bg-white/80 rounded-xl shadow-lg p-8 mt-8 ">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {currentJob.title}
                </h1>
            </div>
            {user?.role === "seeker" && (
                <div className="my-4 flex flex-col sm:flex-row items-center gap-2">
                    <input
                        type="url"
                        placeholder="Paste your resume URL (Google Drive, Dropbox, etc.)"
                        value={resumeUrl}
                        onChange={(e) => setResumeUrl(e.target.value)}
                        className="border rounded px-3 py-2 w-full sm:w-2/3 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        className="py-2 bg-blue-500 px-4 rounded-full text-blue-100 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
                        onClick={handleApply}
                        disabled={
                            !!applyStatus &&
                            applyStatus !== "Failed to apply. Try again."
                        }
                    >
                        Apply
                    </button>
                </div>
            )}
            {applyStatus && (
                <div className="text-sm text-green-600 mb-2">{applyStatus}</div>
            )}
            <div className="flex items-center text-gray-600 mb-2 ">
                <Building className="h-5 w-5 mr-2" />
                <span>{currentJob.company.name}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="capitalize">{currentJob.location}</span>
            </div>
            <span
                className={`${getJobTypeColor(
                    currentJob.employmentType
                )} inline-block px-3 py-1 rounded-full text-xs font-medium capitalize  mb-4 `}
            >
                {currentJob.employmentType.replace("-", " ")}
            </span>
            <p className="text-gray-700 mb-4">{currentJob.description}</p>
            <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>
                    Posted{" "}
                    {currentJob.createdAt
                        ? formatDate(
                              new Date(currentJob.createdAt),
                              "dd MMM yyyy"
                          )
                        : "N/A"}
                </span>
            </div>
            <div className="mt-4 text-gray-700">
                By {currentJob.postedBy.username}
            </div>
            <div className="text-gray-700">
                Contact - {currentJob.postedBy.email}
            </div>

            {currentJob.company.website && (
                <div className="mt-4">
                    <a
                        href={currentJob.company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Company Website
                    </a>
                </div>
            )}
        </div>
    );
};

export default SingleJob;
