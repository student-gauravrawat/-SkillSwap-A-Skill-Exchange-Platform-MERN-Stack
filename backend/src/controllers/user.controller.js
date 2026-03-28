import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import mongoose, { isValidObjectId } from "mongoose";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudnary.js";
import jwt from "jsonwebtoken";
import { Learningskill } from "../models/learningskills.model.js";
import { Offerskill } from "../models/offerskills.model.js";
import {generateOtp} from "../utils/generateOtp.js"
import {sendEmail} from "../utils/sendEmail.js"

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password } = req.body;

  if ([fullName, email, username, password].some((fields) => !fields || fields.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (!email.endsWith("@gmail.com")) {
    throw new ApiError(400, "without @gmail.com email is not acceptable.");
  }

  const existedUser = await User.findOne({
    $or:  [
        { username }, 
        { email }
      ]
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const otp = generateOtp()

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    fullName,
    password,
    emailOtp: otp,
    emailOtpExpiry: Date.now() + 10 * 60 * 1000
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  await sendEmail(email, otp)

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "Account register Sucessfully. OTP has been sent to your email. please check your mail or span box!"));
});

const verifyEmailOtp = asyncHandler( async(req, res)=>{
   const {email, otp} = req.body

   const user = await User.findOne({email})

   if(!user){
      throw new ApiError(400, "User not found")
   }

   if(user.emailVerified){
      throw new ApiError(400, "Email is alredy verified")
   }

   if(user.emailOtp !== otp){
      throw new ApiError(400, "Invalid OTP")
   }
  
  if(user.emailOtpExpiry < Date.now()){
     throw new ApiError(400, "OTP expired")
  }

  user.emailVerified = true
  user.emailOtp = undefined
  user.emailOtpExpiry = undefined

  await user.save()

  return res.status(200)
            .json(new ApiResponse(200, {}, "Email verified sucessfully"))

})

const resendEmailOtp = asyncHandler( async(req, res)=>{
     const {email} = req.body

    if(!email){
      throw new ApiError(404, "Email is required")
    }

    const user = await User.findOne({email})

    if(!user){
       throw new ApiError(404, "User is not found")
    }    

    if(user.emailVerified){
       throw new ApiError(400, "Email already verified")
    }

    const otp = generateOtp()

    user.otp = otp
    user.emailOtpExpiry = Date.now() + 10 * 60 * 1000

    await user.save()
    await sendEmail(email, otp)

    return res.status(200)
              .json(new ApiResponse(200, {}, "New OTP has been sent to your email"))
})

const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "username or email is required");
  }

  if (!password) {
    throw new ApiError(400, "password is required");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exists");
  }

  if(!user.emailVerified){
     throw new ApiError(403, "Please verify your email first")
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  // const loggedUser = await User.findById(user._id).select("-password -refreshToken")

  const loggedUser = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(user._id),
      },
    },
    {
      $lookup: {
        from: "offerskills",
        localField: "_id",
        foreignField: "owner",
        as: "offerskills",
      },
    },
    {
      $lookup: {
        from: "learningskills",
        localField: "_id",
        foreignField: "owner",
        as: "learningskills",
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        email: 1,
        avatar: 1,
        profession: 1,
        location: 1,
        about: 1,
        availability: 1,
        offerskills: 1,
        learningskills: 1,
      },
    },
  ]);

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedUser,
          // accessToken,
          // refreshToken,
        },
        "User logged In Sucessfully"
      )
    );
});

const logOut = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // console.log(decodedToken)

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!(newPassword === confirmPassword)) {
    throw new ApiError(401, "New passwold and confirm password are not mathing");
  }

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Old password is incorrect!");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password changed sucessfully"));
});

const updateUser = asyncHandler(async (req, res) => {
  const updates = {};
  const allowedFields = [
    "fullName",
    "email",
    "profession",
    "location",
    "availability",
    "about",
  ];

  allowedFields.forEach((key) => {
    if (req.body[key]) {
      updates[key] = req.body[key].trim();
    }
  });

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, "At least one field must be provided to update");
  }

  const userUpdate = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: updates },
    { new: true }
  ).select("-password -refreshToken");

  if (!userUpdate) {
    throw new ApiError(500, "user update unsucessfully");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, userUpdate, "Account details  updated sucessfully")
    );
});

const uploadAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.files?.avatar?.[0]?.path;

  console.log(req.files);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar files is required");
  }

  console.log(avatarLocalPath);

  const isUser = await User.findById(req.user?._id);

  if (isUser?.avatar?.url) {
    throw new ApiError(400, "Avatar is already available");
  }

  const avatarFile = await uploadOnCloudinary(avatarLocalPath);

  if (!avatarFile) {
    throw new ApiError(400, "upload file failed");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: {
          url: avatarFile?.url,
          public_id: avatarFile?.public_id,
        },
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(500, "avatar upload on server failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar upload sucessfully"));
});

const updateAvatar = asyncHandler(async (req, res) => {
  const avtarLocalPath = req.file?.path;

  if (!avtarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.findById(req.user?._id);

  const avatarPublicId = user.avatar.public_id;

  const avatar = await uploadOnCloudinary(avtarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Error while uploading on avtar");
  }

  const uploadAvatar = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: {
          url: avatar.url,
          public_id: avatar.public_id,
        },
      },
    },
    { new: true }
  );

  if (!uploadAvatar) {
    throw new ApiError(500, "Avatar update failed");
  }

  if (updateAvatar) {
    deleteOnCloudinary(avatarPublicId);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, uploadAvatar, "Update Sucessfully"));
});

const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const loggedInUserId = req.user?._id;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid User Id");
  }

  let loggedInUserOfferSkillNames = [];

  if (loggedInUserId && isValidObjectId(loggedInUserId)) {
    const offerskill = await Offerskill.find({ owner: loggedInUserId });
    loggedInUserOfferSkillNames = offerskill.map((skill) => skill.skillname);
  }

  // console.log(loggedInUserOfferSkillNames)

  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "offerskills",
        localField: "_id",
        foreignField: "owner",
        as: "offerskills",
      },
    },
    {
      $lookup: {
        from: "learningskills",
        localField: "_id",
        foreignField: "owner",
        as: "learningskills",
      },
    },
    {
      $addFields: {
        totalOfferskills: {
          $size: "$offerskills",
        },
        totalLearningskills: {
          $size: "$learningskills",
        },
        searchedUserLearningSkillNames: "$learningskills.skillname",
      },
    },
    {
      $addFields: {
        isMatched: {
          $cond: {
            if: {
              $gt: [
                {
                  $size: {
                    $setIntersection: [
                      "$searchedUserLearningSkillNames",
                      loggedInUserOfferSkillNames,
                    ],
                  },
                },
                0,
              ],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        email: 1,
        avatar: 1,
        profession: 1,
        location: 1,
        about: 1,
        availability: 1,
        totalOfferskills: 1,
        offerskills: 1,
        totalLearningskills: 1,
        learningskills: 1,
        isMatched: 1,
      },
    },
  ]);

  if (!user) {
    throw new ApiError(500, "getting data failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, " data fetched sucessfully"));
});

const getAllUser = asyncHandler(async (req, res) => {
  const { query, sortBy, sortType } = req.query;
  const loggedInUserId = req.user?._id;

  let loggedInUserOfferSkillNames = [];
  const pipeline = [];

  if (loggedInUserId && isValidObjectId(loggedInUserId)) {
    const offerskills = await Offerskill.find({ owner: loggedInUserId }).select("skillname -_id");
    loggedInUserOfferSkillNames = offerskills.map((s) => s.skillname);
  }
  // console.log(loggedInUserOfferSkillNames)

  if (query) {
    pipeline.push({
      $search: {
        index: "search-learing-skills",
        autocomplete: {
          query: query,
          path: "skillname",
          fuzzy: {
            maxEdits: 2,
          },
        },
      },
    });
  } else {
    throw new ApiError(400, "Query is required");
  }

  //*  here controlling loged-in-user offer skill in search result
  if (loggedInUserId && loggedInUserOfferSkillNames.length > 0) {
    pipeline.push({
      $match: {
        skillname: { $nin: loggedInUserOfferSkillNames },
        owner: { $ne: new mongoose.Types.ObjectId(loggedInUserId) },
      },
    });
  }

  //*  get offerskill all users
  pipeline.push({
    $lookup: {
      from: "users",
      localField: "owner",
      foreignField: "_id",
      as: "user",
    },
  });

  pipeline.push({ $unwind: "$user" });

  pipeline.push({
    $lookup: {
      from: "offerskills",
      localField: "owner",
      foreignField: "owner",
      as: "offerSkills",
    },
  });

  pipeline.push({
    $lookup: {
      from: "learningskills",
      localField: "owner",
      foreignField: "owner",
      as: "learningSkills",
    },
  });

  pipeline.push({
    $addFields: {
      userLearningSkillNames: "$learningSkills.skillname",
    },
  });

  pipeline.push({
    $addFields: {
      isMatched: {
        $cond: {
          if: {
            $gt: [
              {
                $size: {
                  $setIntersection: [
                    "$userLearningSkillNames",
                    loggedInUserOfferSkillNames,
                  ],
                },
              },
              0,
            ],
          },
          then: true,
          else: false,
        },
      },
    },
  });

  if(sortBy && sortType){
        pipeline.push(
          {
              $sort: {
                 [sortBy]: sortType === "asc" ? 1 : -1
              }
          }
        )
  } else{
      pipeline.push(
          { $sort: { createdAt: -1} }
      )
  }

  pipeline.push({
    $group: {
      _id: "$owner", // user unique
      user: { $first: "$user" },
      offerSkills: { $first: "$offerSkills" },
      learningSkills: { $first: "$learningSkills" },
      isMatched: { $first: "$isMatched" },
    },
  });

  pipeline.push({
    $project: {
      userId: "$user._id",
      fullName: "$user.fullName",
      email: "$user.email",
      avatar: "$user.avatar.url",
      profession: "$user.profession",
      location: "$user.location",
      availability: "$user.availability",
      offerSkills: "$offerSkills.skillname",
      learningSkills: "$learningSkills.skillname",
      isMatched: 1,
    },
  });

  const users = await Offerskill.aggregate(pipeline);

  if (!users) {
    throw new ApiError(500, "user aggregation failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, users, "user fetched sucessfully"));
});

const deleteAccount = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const userPublicId = user.avatar.public_id;
  const userDelete = await User.findByIdAndDelete(user._id);

   if (!userDelete) {
    throw new ApiError(500, "User not deleted");
  }

  await Offerskill.deleteMany({ owner: userId });
  await Learningskill.deleteMany({ owner: userId });

  await deleteOnCloudinary(userPublicId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Accouunt Delete Sucessfully"));
});

export {
  registerUser,
  login,
  logOut,
  changeCurrentPassword,
  refreshAccessToken,
  uploadAvatar,
  updateAvatar,
  updateUser,
  deleteAccount,
  getUser,
  getAllUser,
  verifyEmailOtp,
  resendEmailOtp
};
