import { Course } from "../models/course.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
    try {
        const { courseTitle, category } = req.body;
        if (!courseTitle || !category) {
            return res.status(400).json({
                message: "Course title and category is required",
            });
        }

        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id,
        });

        return res.status(201).json({
            course,
            message: "Course created.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create course",
        });
    }
};

export const togglePublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { publish } = req.query; // true, false
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found!",
            });
        }

        //public status based on the query parameter
        course.isPublished = publish === "true";
        await course.save();

        const statusMessage = course.isPublished ? "Published" : "Unpublished";
        return res.status(200).json({
            message: `Course is ${statusMessage}`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to update status",
        });
    }
};

export const editCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice,
        } = req.body;
        const thumbnail = req.file;

        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found!",
            });
        }

        let courseThumbnail;
        if (thumbnail) {
            if (course.thumbnail) {
                const publicId = course.courseThumbnail
                    .split("/")
                    .pop()
                    .split(".")[0];
                await deleteMediaFromCloudinary(publicId);
            }
            //upload a thumbnail on cloudinary
            courseThumbnail = await uploadMedia(thumbnail.path);
        }

        const updatedData = {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice,
            courseThumbnail: courseThumbnail?.secure_url,
        };

        course = await Course.findByIdAndUpdate(courseId, updatedData, {
            new: true,
        });

        return res.status(200).json({
            message: "Course updated successfully",
            course,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create course",
        });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found!",
            });
        }

        return res.status(200).json({
            course,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create course",
        });
    }
};

export const getPublishedCourse = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate({
            path: "creator",
            select: "name photoUrl",
        });
        if (!courses) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        return res.status(200).json({
            courses,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create course",
        });
    }
};

export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.id;
        const courses = await Course.find({ creator: userId });
        if (!courses) {
            return res.status(404).json({
                courses: [],
                message: "Course not found",
            });
        }

        return res.status(200).json({
            courses,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create course",
        });
    }
};

export const searchCourse = async (req, res) => {
    try {
        const { query = "", categories = [], sortByPrice = "" } = req.query;
        console.log(categories);

        //create search query
        const searchCriteria = {
            isPublished: true,
            $or: [
                { courseTitle: { $regex: query, $options: "i" } },
                { subTitle: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
            ],
        };

        //if categories selected
        if (categories.length > 0) {
            searchCriteria.category = { $in: categories };
        }

        //define sorting order
        const sortOptions = {};
        if (sortByPrice === "low") {
            sortOptions.coursePrice = 1; // sort by price in asc
        } else if (sortByPrice === "high") {
            sortOptions.coursePrice = -1; // des order
        }

        let courses = (
            await Course.find(searchCriteria).populate({
                path: "creator",
                select: "name photoUrl",
            })
        ).toSorted(sortOptions);

        return res.status(200).json({
            success: true,
            courses: courses || [],
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create course",
        });
    }
};
