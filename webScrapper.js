// This is a function to be used in browser to scrape questions
(function () {
  const questions = []; // Array to store questions for the current page

  // Extract the quiz page number from the URL and remove empty strings
  const urlParts = window.location.href
    .split("/")
    .filter((part) => part !== ""); // Filter out empty strings
  const pageNumber = urlParts[urlParts.length - 1]; // Assuming the last part is the page number

  // Function to scrape the current page
  function scrapePage() {
    document.querySelectorAll(".wpProQuiz_listItem").forEach((item) => {
      const questionText = item
        .querySelector(".wpProQuiz_question_text")
        ?.innerText.trim();
      const answerElements = item.querySelectorAll(
        ".wpProQuiz_questionList li"
      );
      const answers = Array.from(answerElements).map((li) =>
        li.innerText.trim()
      );
      const rationale = item
        .querySelector(".wpProQuiz_correct")
        ?.innerText.trim();

      if (questionText) {
        questions.push({
          question: questionText,
          answers: answers,
          rationale: rationale || "No rationale found", // Fallback if correct answer not found
          quizNumber: pageNumber, // Add the page number as a property
        });
      }
    });

    console.log(`Scraped questions for quiz page ${pageNumber}:`, questions);

    // Convert to JSON and download
    const data = JSON.stringify(questions, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `questions_page_${pageNumber}.json`; // Use the page number in the filename
    a.click();

    console.log(`Download started for questions_page_${pageNumber}.json`);
  }

  // Start scraping the current page
  scrapePage();
})();
