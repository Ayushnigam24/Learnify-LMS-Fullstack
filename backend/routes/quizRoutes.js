import express from "express";
import { Quiz, QuizAttempt } from "../model/quizModels.js";
import { Courses, Lecture } from "../model/table.js";
import { isAuth } from "../middleware/isAuth.js";

const quizRouter = express.Router();


// ─── 1. Attempt Status Check ──────────────────────────────────────────
// GET /api/quiz/attempt/:courseId
quizRouter.get("/attempt/:courseId", isAuth, async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ course: req.params.courseId });
    if (!quiz) return res.json({ attempted: false });

    const attempt = await QuizAttempt.findOne({
      quiz: quiz._id,
      user: req.user._id,
    });

    if (!attempt) return res.json({ attempted: false, quizId: quiz._id });

    res.json({
      attempted: true,
      passed: attempt.passed,
      score: attempt.score,
      attempt,
    });
  } catch (err) {
    console.error("Attempt check error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// ─── 2. AI Quiz Generate ──────────────────────────────────────────────
// POST /api/quiz/generate/:courseId
quizRouter.post("/generate/:courseId", isAuth, async (req, res) => {
  try {
    const { courseId } = req.params;

    // Agar quiz pehle se exist karta hai to wahi return karo
    const existing = await Quiz.findOne({ course: courseId });
    if (existing) return res.json({ quiz: existing });

    // Course fetch karo
    const course = await Courses.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course nahi mila" });

    // Lectures alag se fetch karo
    const lectures = await Lecture.find({ course: courseId });

    // Har lecture ka title + description use karo for better quiz
    const lectureContent = lectures.length > 0
      ? lectures.map((l, i) =>
          `Lecture ${i + 1}: ${l.title}${l.discription ? " — " + l.discription : ""}`
        ).join("\n")
      : `Course: ${course.title}`;

    // ── Groq API call (Free + Fast) ──
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 2000,
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: "You are a quiz generator for an online LMS. Always respond with valid JSON only. No markdown, no explanation, no extra text.",
          },
          {
            role: "user",
            content: `Course: "${course.title}"

Here are all the lectures with their content:
${lectureContent}

Based on the above lecture titles and descriptions, generate exactly 10 multiple choice questions that test understanding of these specific topics.
Return ONLY a valid JSON array with this exact structure:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0
  }
]
correctIndex is the 0-based index of the correct option.`,
          },
        ],
      }),
    });

    const aiData = await response.json();

    // Response validate karo
    if (!aiData.choices || !aiData.choices[0]) {
      console.error("Groq error response:", aiData);
      return res.status(500).json({ message: "AI response error", raw: aiData });
    }

    const rawText = aiData.choices[0].message.content.trim();
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const questions = JSON.parse(cleaned);

    // DB mein save karo
    const quiz = await Quiz.create({
      course: courseId,
      questions,
      passingScore: 70,
    });

    res.json({ quiz });
  } catch (err) {
    console.error("Quiz generation error:", err);
    res.status(500).json({ message: "Quiz generate karne mein error", error: err.message });
  }
});


// ─── 3. Quiz Fetch (answers hidden from frontend) ─────────────────────
// GET /api/quiz/:courseId
quizRouter.get("/:courseId", isAuth, async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ course: req.params.courseId });
    if (!quiz) return res.status(404).json({ message: "Quiz nahi mila" });

    const safeQuiz = {
      _id: quiz._id,
      passingScore: quiz.passingScore,
      questions: quiz.questions.map((q) => ({
        question: q.question,
        options: q.options,
      })),
    };

    res.json({ quiz: safeQuiz });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// ─── 4. Quiz Submit ───────────────────────────────────────────────────
// POST /api/quiz/submit/:quizId
quizRouter.post("/submit/:quizId", isAuth, async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.user._id;

    const prev = await QuizAttempt.findOne({ quiz: req.params.quizId, user: userId });
    if (prev) return res.json({ attempt: prev, alreadyAttempted: true });

    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz nahi mila" });

    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (Number(answers[i]) === q.correctIndex) correct++;
    });

    const score = Math.round((correct / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    const attempt = await QuizAttempt.create({
      quiz: quiz._id,
      course: quiz.course,
      user: userId,
      answers,
      score,
      passed,
    });

    res.json({ attempt, passed, score });
  } catch (err) {
    console.error("Submit error:", err);
    res.status(500).json({ message: "Submit error", error: err.message });
  }
});


export default quizRouter;