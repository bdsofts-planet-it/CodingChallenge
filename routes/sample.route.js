const fs = require("fs");
const express = require("express");
const router = express.Router();
const filePath = "./sourcefile/sample.txt";

router.get("/numberofwords", (req, res, next) => {   

  try {    
    const analysisResult = analyzeText(filePath);
    console.log("Total Words:"+ analysisResult['Word Count']);
    res.status(200).json({
      status: true,
      data: "Total Words:" + analysisResult["Word Count"],
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
 
});

router.get("/numberofcharacters", (req, res, next) => {   

  try {    
    const analysisResult = analyzeText(filePath);
    console.log("Total Words:"+ analysisResult['Character Count']);
    res.status(200).json({
      status: true,
      data: "Total Characters:" + analysisResult["Character Count"],
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
 
});

router.get("/numberofsentences", (req, res, next) => {   

  try {    
    const analysisResult = analyzeText(filePath);
    console.log("Total Sentence:"+ analysisResult['Line Count']);
    res.status(200).json({
      status: true,
      data: "Total Sentence:" + analysisResult["Line Count"],
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
 
});

router.get("/numberofparagraphs", (req, res, next) => {   

  try {    
    const analysisResult = analyzeText(filePath);
    console.log("Total Paragraph:"+ analysisResult['Paragraph Count']);
    res.status(200).json({
      status: true,
      data: "Total Paragraph:" + analysisResult["Paragraph Count"],
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
 
});

router.get("/longestwords", (req, res, next) => {   

  try {    
    const analysisResult = analyzeText(filePath);
    console.log("Longest words in Paragraph:"+ analysisResult['Longest words in Paragraph']);
    res.status(200).json({
      status: true,
      data: "Longest words in Paragraph:" + analysisResult["Longest words in Paragraph"],
      'total words': "Length of the longest words:" + analysisResult["Length of the longest words"]      
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
 
});

router.get("/all", (req, res, next) => {   

  try {    
    const analysisResult = analyzeText(filePath);
    // console.log("Analysis Results:");
    // for (const [key, value] of Object.entries(analysisResult)) {
    //     console.log(`${key}: ${value}`);
    // }
    res.status(200).json(analysisResult)
  } catch (error) {
    console.error("Error:", error.message);
  }
 
});


router.post("/sample", async (req, res, next) => {
  console.log("Post Method working fine");
});

router.delete("/sample", async (req, res) => {
  console.log("Delete Method working fine");
});

function analyzeText(filePath) {
  const text = fs.readFileSync(filePath, "utf-8");

  // Counting words
  const wordCount = text.split(/\s+/).filter((word) => word).length;

  // Counting characters
  const charCount = text.length;

  // Counting paragraphs
  const paragraphCount = text
    .split(/\n\s*\n/)
    .filter((paragraph) => paragraph.trim()).length;

  // Counting lines
  const lineCount = text.split("\n").filter((line) => line.trim()).length;

  // Average word length
  const words = text.split(/\s+/).filter((word) => word);
  const totalWordLength = words.reduce((acc, word) => acc + word.length, 0);
  const averageWordLength = totalWordLength / wordCount || 0;

  // Longest words in paragraphs
  const longestWordsInParagraphs = words.map(words => {
    const wordsInParagraph = words.match(/\b\w+\b/g);
    if (!wordsInParagraph) return null;
    return wordsInParagraph.reduce((longest, current) => current.length > longest.length ? current : longest, '');
});

// Longest word in entire text
// Find the maximum length
let maxLength = 0;
for (const word of longestWordsInParagraphs) {
    if (word.length > maxLength) {
        maxLength = word.length;
    }
}

// Find all words with maximum length
const maxLenWords = [];
for (const word of longestWordsInParagraphs) {
    if (word.length === maxLength) {
        maxLenWords.push(word);
    }
}

console.log("Words with maximum length:", maxLenWords);
console.log("Length of the longest words:", maxLength); 

  return {
    "Word Count": wordCount,
    "Character Count": charCount,
    "Paragraph Count": paragraphCount,
    "Line Count": lineCount,
    "Longest words in Paragraph": maxLenWords,
    "Length of the longest words": maxLength
  };
}

module.exports = router;
