// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Function to execute Python code and return result
  async function executePythonCode(code) {
    const response = await fetch('execute.py', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    });
  
    if (!response.ok) {
      throw new Error('Failed to execute code');
    }
  
    return await response.json();
  }
  
  const easyQuestion = "Fix the code to print 'Hello, World!'";
  const easyCodeSnippet = `print('Hello, World!')`;
  
  const mediumQuestion = "Fix the code to determine if a word is a palindrome";
  const mediumCodeSnippet = `
  def is_palindrome(s):
      return s == s[::-1]
  
  print(is_palindrome('radar'))  # Should print True
  `;
  
  const hardQuestion = "Fix the code to generate Fibonacci sequence";
  const hardCodeSnippet = `
  def fibonacci(n):
      if n <= 1:
          return n
      else:
          return fibonacci(n-1) + fibonacci(n-2)
  
  print(fibonacci(5))  # Should print 5
  `;
  
  const questions = [easyQuestion, mediumQuestion, hardQuestion];
  const codeSnippets = [easyCodeSnippet, mediumCodeSnippet, hardCodeSnippet];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function displayQuestion() {
    document.getElementById('question').textContent = questions[currentQuestionIndex];
    document.getElementById('codeSnippet').textContent = codeSnippets[currentQuestionIndex];
  }
  
  async function checkAnswer() {
    const codeInput = document.getElementById('codeInput').value.trim();
    const expectedCode = codeSnippets[currentQuestionIndex].replace(/\s+/g, '');
    const cleanedCodeInput = codeInput.replace(/\s+/g, '');
  
    if (expectedCode === cleanedCodeInput) {
      try {
        const { success, output } = await executePythonCode(codeInput);
        if (success) {
          score++; // Increase score
          localStorage.setItem('score', score); // Update score in localStorage
          document.getElementById('result').textContent = 'Correct! Well done!';
          document.body.style.backgroundColor = '#e6f7ff'; // Set calm background color
        } else {
          document.getElementById('result').textContent = 'Execution Error: ' + output;
        }
      } catch (error) {
        document.getElementById('result').textContent = 'Error: ' + error;
      }
    } else {
      document.getElementById('result').textContent = 'Incorrect. Please try again.';
    }
  
    if (currentQuestionIndex < 2) {
      currentQuestionIndex++;
      displayQuestion();
    } else {
      window.location.href = 'result.html';
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    questions = shuffleArray(questions);
    codeSnippets = shuffleArray(codeSnippets);
    displayQuestion();
  });
  