require("dotenv").config(); // Load environment variables from .env
const questions = require("./questions"); // Import questions
const categoriesData = require("./az-400-categories"); // Import categories object
const fs = require("fs");
const OpenAI = require("openai"); // Import OpenAI SDK

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API Key. Please set it in the .env file.");
}

// Helper function to extract the correct answer from the rationale
function extractCorrectAnswer(rationale) {
  console.log("correctAnswer rationale: ", rationale);

  // Adjusted regex to capture multiple letters with "and" or commas
  const match = rationale.match(
    /Correct\s*[\n-]*\s*Answer\s*[^\w]*([A-Z](?:\s*(?:and|,)\s*[A-Z])*)\s*/i
  );

  if (!match) {
    console.error("No valid answer found in rationale: ", rationale);
    return "Answer not found"; // Fallback value if extraction fails
  }

  const correctAnswer = match[1].trim(); // Extract and trim the answer (e.g., "C and D")
  return correctAnswer; // Return the extracted correct answer
}

// Helper function to extract the rationale
function extractRationale(rationale) {
  console.log("rationale: ", rationale);

  // Adjusted regex to find the correct answer section and capture everything after it
  const match = rationale.match(
    /Correct\s*[\n-]*\s*Answer\s*[^\w]*[A-Z](?:\s*(?:and|,)\s*[A-Z])*\s*(.*)/is
  );

  if (!match) {
    console.error(
      "No explanation found after answer in rationale: ",
      rationale
    );
    return "Explanation not found"; // Fallback value if extraction fails
  }

  const explanation = match[1].trim(); // Extract everything after the answer
  return explanation; // Return the extracted explanation
}

// Function to classify a question into a main category
async function classifyCategory(question) {
  console.log("classifyCategory starting");
  const categoryKeys = Object.keys(categoriesData); // Get the main category names
  console.log("categoryKeys: ", categoryKeys);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `You are an expert in Azure development. Please classify the following question into one of these categories: ${categoryKeys.join(
            ", "
          )}.\n\nMake sure to choose the most relevant category based on the context of Azure development. Respond with only the category name.\n\nQuestion: ${
            question.question
          }`,
        },
      ],
    });

    let result = completion.choices[0].message.content.trim().toLowerCase();

    // Extract only the category name from the result
    const categoryMatch = categoryKeys.find((category) =>
      result.includes(category.toLowerCase())
    );

    if (!categoryMatch) {
      console.error("Category not found in result: ", result);
      return "No Category Found"; // Fallback if category classification fails
    }

    console.log("Selected Category:", categoryMatch);
    return categoryMatch;
  } catch (error) {
    console.error("Error classifying category:", error);
    return "Error in Category Classification"; // Fallback in case of error
  }
}

// Function to classify a subcategory based on the selected category
async function classifySubcategory(question, selectedCategory) {
  const subcategories = categoriesData[selectedCategory]?.subcategories;

  if (!subcategories) {
    console.error(`No subcategories found for category: ${selectedCategory}`);
    return "No Subcategory Found"; // Fallback value if no subcategories exist
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `You are an Azure development expert. For the selected category "${selectedCategory}", choose the most relevant subcategory from the following options: ${subcategories.join(
            ", "
          )}.\n\nMake sure to select the most appropriate subcategory for this Azure-related question. Respond with only the subcategory name.\n\nQuestion: ${
            question.question
          }`,
        },
      ],
    });

    let result = completion.choices[0].message.content.trim().toLowerCase();

    // Extract only the subcategory name from the result
    const subcategoryMatch = subcategories.find((subcategory) =>
      result.includes(subcategory.toLowerCase())
    );

    if (!subcategoryMatch) {
      console.error("Subcategory not found in result: ", result);
      return "No Subcategory Found"; // Fallback if no subcategory is found
    }

    console.log("Selected Subcategory:", subcategoryMatch);
    return subcategoryMatch;
  } catch (error) {
    console.error("Error classifying subcategory:", error);
    return "Error in Subcategory Classification"; // Fallback in case of error
  }
}

// Function to process all questions
async function transformQuestions() {
  const transformedQuestions = [];

  for (const question of questions) {
    try {
      console.log(`Classifying question: ${question.question}`);

      // First, classify the main category
      const selectedCategory = await classifyCategory(question);
      if (!selectedCategory) {
        console.error(
          `Failed to classify category for question: ${question.question}`
        );
        continue; // Skip to the next question
      }

      console.log("selectedCategory: ", selectedCategory);

      // Then, classify the subcategory based on the selected category
      const selectedSubcategory = await classifySubcategory(
        question,
        selectedCategory
      );
      if (!selectedSubcategory) {
        console.error(
          `Failed to classify subcategory for question: ${question.question}`
        );
        continue;
      }

      console.log("selectedSubcategory: ", selectedSubcategory);

      // Extract the correct answer and rationale
      const correctAnswer = extractCorrectAnswer(question.rationale);
      console.log("correctAnswer: ", correctAnswer); // Log extracted answer

      const normalizedRationale = extractRationale(question.rationale);
      console.log("normalizedRationale: ", normalizedRationale); // Log normalized rationale

      // Push the processed question into the transformedQuestions array
      transformedQuestions.push({
        ...question,
        category: selectedCategory,
        subcategory: selectedSubcategory,
        scrapedRationale: correctAnswer,
        normalizedRationale: normalizedRationale,
        // confirmedCorrectAnswer: question.correctAnswer,
      });

      console.log("Successfully transformed question: ", question.question);
    } catch (error) {
      console.error(`Error processing question: ${question.question}`, error);
      continue; // Ensure the loop continues to the next question in case of an error
    }
  }

  // Log the final array after all questions have been processed
  console.log(
    "transformedQuestions (after processing all): ",
    transformedQuestions
  );

  if (transformedQuestions.length > 0) {
    console.log("All questions processed.");
    return transformedQuestions;
  } else {
    console.error("No questions were successfully processed.");
    return null;
  }
}

// Start transformation
transformQuestions().then((transformed) => {
  if (transformed && transformed.length > 0) {
    // Save the transformed questions to a new file
    fs.writeFileSync(
      "transformedQuestions.json",
      JSON.stringify(transformed, null, 2)
    );
    console.log("Transformed questions saved to transformedQuestions.json");
  } else {
    console.error("No transformed questions to save.");
  }
});
