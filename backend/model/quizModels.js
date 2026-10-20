import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question:     { type: String, required: true },
  options:      [{ type: String, required: true }],
  correctIndex: { type: Number, required: true },
});

const quizSchema = new mongoose.Schema(
  {
    course:       { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, unique: true },
    questions:    [questionSchema],
    passingScore: { type: Number, default: 70 },
  },
  { timestamps: true }
);

export const Quiz = mongoose.model("Quiz", quizSchema);


const attemptSchema = new mongoose.Schema(
  {
    quiz:    { type: mongoose.Schema.Types.ObjectId, ref: "Quiz",   required: true },
    course:  { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    user:    { type: mongoose.Schema.Types.ObjectId, ref: "User",   required: true },
    answers: [Number],
    score:   { type: Number,  required: true },
    passed:  { type: Boolean, required: true },
  },
  { timestamps: true }
);

attemptSchema.index({ quiz: 1, user: 1 }, { unique: true });

export const QuizAttempt = mongoose.model("QuizAttempt", attemptSchema);