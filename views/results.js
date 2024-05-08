const getResultsTableHTML = (data) => {
  const headHTML = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="style.css" rel="stylesheet" type="text/css"/>
    <title>Quiz Results</title>
  </head>
  <body>
    <table id="result-table">
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Responses</th>
        </tr>
      </thead>
      <tbody>`;

  let middleHTML = '';

  for (const key in data) {
    const studentName = key;
    const responses = data[key].responses.map(response => {
      return `
        <tr>
          <td>${response.questionId}</td>
          <td>${response.answeredOptionId}</td>
          <td>${response.isCorrect ? 'Yes' : 'No'}</td>
        </tr>`;
    }).join('');
    
    middleHTML += `
      <tr>
        <td>${studentName}</td>
        <td>
          <table>
            <thead>
              <tr>
                <th>Question ID</th>
                <th>Answered Option ID</th>
                <th>Correct</th>
              </tr>
            </thead>
            <tbody>
              ${responses}
            </tbody>
          </table>
        </td>
      </tr>`;
  }

  const bottomHTML = `
      </tbody>
    </table>
    <script src="resultsTable.js"></script>
  </body>
</html>`;

  return headHTML + middleHTML + bottomHTML;
};

module.exports = {
  getResultsTableHTML,
};