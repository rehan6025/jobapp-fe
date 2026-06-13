import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { createJob } from "../store/slices/jobsSlice";

type FormData = {
    title: string;
    location: string;
    description: string;
    company: {
        name: string;
        website: string;
    };
    employmentType: "full-time" | "part-time" | "freelance" | "internship";
};

const PostJobPage = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        title: "",
        location: "",
        description: "",
        company: {
            name: "",
            website: "",
        },
        employmentType: "full-time",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        if (name.startsWith("company.")) {
            const field = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                company: {
                    ...prev.company,
                    [field]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            postedBy: user?._id as string,
        };

        setSubmitted(true);
        dispatch(createJob(payload));
    };

    return (
        <div className="min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="shadow-xl rounded-lg max-w-4xl bg-white/70 mx-auto p-4"
            >
                <h2 className="text-5xl mb-8 mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text font-bold text-center">
                    Post A New Job
                </h2>

                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="font-medium text-sm text-gray-700"
                    >
                        Job Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Ex. Software Engineer"
                        className="block px-4 py-2 w-full border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="companyName"
                        className="font-medium text-sm text-gray-700"
                    >
                        Company Name
                    </label>
                    <input
                        type="text"
                        id="companyName"
                        name="company.name"
                        value={formData.company.name}
                        onChange={handleChange}
                        placeholder="Enter company's name"
                        className="block px-4 py-2 w-full border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="companyWebsite"
                        className="font-medium text-sm text-gray-700"
                    >
                        Company Website
                    </label>
                    <input
                        type="text"
                        id="companyWebsite"
                        name="company.website"
                        value={formData.company.website}
                        onChange={handleChange}
                        placeholder="Enter company's website"
                        className="block px-4 py-2 w-full border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="location"
                        className="font-medium text-sm text-gray-700"
                    >
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Ex. Delhi, India"
                        className="block px-4 py-2 w-full border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="employmentType"
                        className="font-medium text-sm text-gray-700"
                    >
                        Employment Type
                    </label>
                    <select
                        id="employmentType"
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleChange}
                        className="block px-4 py-2 w-full border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="freelance">Freelance</option>
                        <option value="internship">Internship</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="font-medium text-sm text-gray-700"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter description..."
                        className="block px-4 py-2 w-full border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent h-26"
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitted}
                    className={`w-full py-2 px-4  text-white font-semibold rounded-lg shadow-md  ${
                        submitted == false
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-green-600"
                    } `}
                >
                    {submitted == false ? "Post Job" : "Posted!"}
                </button>
            </form>
        </div>
    );
};

export default PostJobPage;
