const {
  getResponsesByAccessCode,
  getCountOfQuestions,
  getQuizIdByCode,
} = require("../db/queries");
const { getGroupedData } = require("../helpers/index");
const { getResultsTableHTML } = require("../views/results");

const getResponsesByQuizId = async (req, res) => {
  const accessCode = req.query.code;
  try {
    const responses = await getResponsesByAccessCode(accessCode);
    const groupedData = getGroupedData(responses);
    const quizId = await getQuizIdByCode(accessCode);
    const { questionCount } = await getCountOfQuestions(quizId);

    for (const key in groupedData) {
      const correctAnswersCount = groupedData[key].responses.reduce(
        (sum, currentQuestion) => {
          if (currentQuestion.isCorrect === 1) {
            return sum + 1;
          } else {
            return sum;
          }
        },
        0,
      );

      groupedData[key].grade = correctAnswersCount
        ? (questionCount / correctAnswersCount) * 100
        : 0;
    }
    const html = getResultsTableHTML(groupedData);
    res.set("Content-Type", "text/html");
    res.send(html);
  } catch (err) {
    console.error("ERROR ON GETTING RESPONSES\n", err);
  }
};

module.exports = {
  getResponsesByQuizId,
};
