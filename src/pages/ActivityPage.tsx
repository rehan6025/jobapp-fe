import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
    getUserApplications,
    getJobApplications,
    updateApplicationStatus,
} from "../store/slices/applicationsSlice";
import { deleteJob, getUserJobs } from "../store/slices/jobsSlice";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
    Briefcase,
    FileText,
    Users,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

type ApplicationStatus = "applied" | "reviewing" | "accepted" | "rejected";

const STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = [
    { value: "applied", label: "Applied" },
    { value: "reviewing", label: "Reviewing" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
];

function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const ActivityPage = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const {
        isLoading: appsLoading,
        userApplications,
        jobApplications,
    } = useAppSelector((state) => state.applications);
    const { isLoading: jobsLoading, userJobs } = useAppSelector(
        (state) => state.jobs
    );

    const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
    const [pendingStatus, setPendingStatus] = useState<
        Record<string, ApplicationStatus>
    >({});

    useEffect(() => {
        if (!user) return;
        if (user.role === "seeker") {
            dispatch(getUserApplications());
        } else if (user.role === "poster") {
            dispatch(getUserJobs());
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (expandedJobId) {
            dispatch(getJobApplications(expandedJobId));
        }
    }, [dispatch, expandedJobId]);

    const isSeeker = user?.role === "seeker";
    const isPoster = user?.role === "poster";

    const handleToggleJob = (jobId: string) => {
        setExpandedJobId((prev) => (prev === jobId ? null : jobId));
    };

    const handleChangeStatus = (
        applicationId: string,
        status: ApplicationStatus
    ) => {
        setPendingStatus((prev) => ({ ...prev, [applicationId]: status }));
    };

    const handleUpdateStatus = (applicationId: string) => {
        const status = pendingStatus[applicationId];
        if (!status) return;
        dispatch(updateApplicationStatus({ applicationId, status }));
    };

    const handleDelete = (jobId: string) => {
        dispatch(deleteJob(jobId));
        wait(2000);
    };

    const getJobLabel = (job: unknown): string => {
        if (typeof job === "string") return job;
        if (job && typeof job === "object") {
            const j = job as { title?: string; _id?: string };
            return j.title || j._id || "Unknown Job";
        }
        return "Unknown Job";
    };

    const getApplicantLabel = (applicant: unknown): string => {
        if (typeof applicant === "string") return applicant;
        if (applicant && typeof applicant === "object") {
            const a = applicant as {
                username?: string;
                email?: string;
                _id?: string;
            };
            return a.username || a.email || a._id || "Unknown Applicant";
        }
        return "Unknown Applicant";
    };

    if (!user) {
        return <LoadingSpinner size="lg" />;
    }

    return (
        <div className="min-h-screen space-y-8">
            <div className="flex items-center gap-3">
                {isSeeker ? (
                    <FileText className="w-7 h-7 text-blue-600" />
                ) : (
                    <Briefcase className="w-7 h-7 text-blue-600" />
                )}
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold">
                        {isSeeker ? "My Applications" : "My Posted Jobs"}
                    </h1>
                    <p className="text-gray-600">
                        {isSeeker
                            ? "Track the status of jobs you have applied to."
                            : "View your jobs and manage applicants."}
                    </p>
                </div>
            </div>

            {isSeeker && (
                <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
                    {appsLoading ? (
                        <LoadingSpinner size="lg" />
                    ) : userApplications.length === 0 ? (
                        <p className="text-gray-600">
                            You haven't applied to any jobs yet.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {userApplications.map((app) => (
                                <div
                                    key={app._id}
                                    className="border border-gray-200 rounded-lg p-4 bg-white"
                                >
                                    <div className="flex flex-wrap gap-2 items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-gray-800 font-medium">
                                                Application ID: {app._id}
                                            </span>
                                            <span className="text-gray-600 text-sm">
                                                Job:{" "}
                                                {getJobLabel(
                                                    app.job as unknown
                                                )}
                                            </span>
                                            <a
                                                className="text-blue-600 text-sm"
                                                href={app.resumeUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                View Resume
                                            </a>
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium capitalize bg-gray-100 text-gray-800">
                                            {app.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {isPoster && (
                <div className="space-y-4">
                    {jobsLoading ? (
                        <LoadingSpinner size="lg" />
                    ) : userJobs.length === 0 ? (
                        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-gray-500 p-6">
                            <p className="text-gray-600">
                                You haven't posted any jobs yet.
                            </p>
                        </div>
                    ) : (
                        userJobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20"
                            >
                                <div className="relative">
                                    <button
                                        className="w-full text-left p-6 flex items-center justify-between hover:shadow-xl hover:border-transparent  hover:scale-[1.003]  transition-all rounded-xl"
                                        onClick={() => handleToggleJob(job._id)}
                                    >
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                {job.title}
                                            </h2>
                                            <p className="text-gray-600 text-sm">
                                                {job.company.name} •{" "}
                                                {job.location}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 mr-14">
                                            <Users className="w-5 h-5 text-gray-600" />
                                            {expandedJobId === job._id ? (
                                                <ChevronUp className="w-5 h-5 text-gray-600" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-600" />
                                            )}
                                        </div>
                                    </button>
                                    <button
                                        className="absolute right-0 top-0 mr-4 mt-7 text-red-500  hover:bg-red-400 hover:text-white transition-all duration-300 border-black bg-red-100 rounded-lg px-1 py-2 hover:scale-[1.03]"
                                        type="button"
                                        onClick={() => handleDelete(job._id)}
                                    >
                                        Delete
                                    </button>
                                </div>

                                <div
                                    className={`
                                        overflow-hidden transition-all duration-300 ease-in-out
                                        ${
                                            expandedJobId === job._id
                                                ? "max-h-[1000px] opacity-100"
                                                : "max-h-0 opacity-0"
                                        }
                                      `}
                                >
                                    <div className="border-t border-gray-200 p-6">
                                        {appsLoading ? (
                                            <LoadingSpinner size="md" />
                                        ) : jobApplications.length === 0 ? (
                                            <p className="text-gray-600">
                                                No applications yet.
                                            </p>
                                        ) : (
                                            <div className="space-y-4">
                                                {jobApplications.map((app) => (
                                                    <div
                                                        key={app._id}
                                                        className="border border-gray-200 rounded-lg p-4 bg-white"
                                                    >
                                                        <div className="grid md:grid-cols-3 gap-4 items-center">
                                                            <div>
                                                                <p className="text-gray-800 font-medium">
                                                                    Application
                                                                    ID:{" "}
                                                                    {app._id}
                                                                </p>
                                                                <p className="text-gray-600 text-sm">
                                                                    Applicant:{" "}
                                                                    {getApplicantLabel(
                                                                        app.applicant as unknown
                                                                    )}
                                                                </p>
                                                                <a
                                                                    className="text-blue-600 text-sm"
                                                                    href={
                                                                        app.resumeUrl
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    View Resume
                                                                </a>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <select
                                                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                                                    value={
                                                                        pendingStatus[
                                                                            app
                                                                                ._id
                                                                        ] ??
                                                                        (app.status as ApplicationStatus)
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleChangeStatus(
                                                                            app._id,
                                                                            e
                                                                                .target
                                                                                .value as ApplicationStatus
                                                                        )
                                                                    }
                                                                >
                                                                    {STATUS_OPTIONS.map(
                                                                        (
                                                                            opt
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    opt.value
                                                                                }
                                                                                value={
                                                                                    opt.value
                                                                                }
                                                                            >
                                                                                {
                                                                                    opt.label
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                                <button
                                                                    onClick={() =>
                                                                        handleUpdateStatus(
                                                                            app._id
                                                                        )
                                                                    }
                                                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                                                >
                                                                    Update{" "}
                                                                </button>
                                                            </div>
                                                            <div className="md:text-right">
                                                                <span className="px-3 py-1 rounded-full text-xs font-medium capitalize bg-gray-100 text-gray-800">
                                                                    Current:{" "}
                                                                    {app.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default ActivityPage;
