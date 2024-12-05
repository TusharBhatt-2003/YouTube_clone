import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // Get User details from Frontend
  // Validation - not empty
  // Check if user already exists: username, email
  // Check for images, Check for Avatar
  // Upload them to cloudinary, Avatar
  // Create User Object - Create Entry in DB
  // Remove Password and refresh Token Field from response
  // Check for User Creation
  // Return response

  const { username, email, fullname, password } = req.body;
  console.log(username, email, fullname, password);

  // Validation
  if (
    [username, email, fullname, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All files are required");
  }

  // Check if user already exists: username, email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  console.log(req.files);

  // Check for images, Check for Avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.file &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(404, "Avatar file is required");
  }

  // Upload them to cloudinary, Avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(500, "Failed to upload avatar to cloudinary");
  }

  // Create User Object - Create Entry in DB
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // Remove Password and refresh Token Field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // Check for User Creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the User");
  }

  // Return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered successfully"));
});

export { registerUser };
