const getRandomString = function () {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const codeLength = 6;
  let str = "";
  for (let i = 0; i < codeLength; i++) {
    str += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return str;
};

const mapOptionsToQuestions = (questions, options) => {
  if (questions.length !== options.length) {
    throw new error(
      "Number of options objects to map  does not match with number of questions!",
    );
  }

  questions.forEach((question) => {
    question.options = options.filter((optionObj) =>
      optionObj.every((option) => option.questionId === question.id),
    )[0];
  });
  return questions;
};
module.exports = {
  getRandomString,
  mapOptionsToQuestions,
};
