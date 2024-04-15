// Sample data
const adminData = [
    {
      question: '65e19eb8d663d5dcad3b07c8',
      options: '65e19eb8d663d5dcad3b07cc',
      _id: '65e2bdd6c6b3db4ccc3b0516' // This should be a string representation of ObjectId
    },
    {
      question: '65e19eb8d663d5dcad3b07c3',
      options: '65e19eb8d663d5dcad3b07c4',
      _id: '65e2bdd6c6b3db4ccc3b0517' // This should be a string representation of ObjectId
    }
  ];
  
  const userData = [
    {
      questionId: '65e19eb8d663d5dcad3b07c8',
      answerId: '65e19eb8d663d5dcad3b07cc',
      _id: '65e2bfd95afd172e9de23227' // This should be a string representation of ObjectId
    },
    {
      questionId: '65e19eb8d663d5dcad3b07c3',
      answerId: '65e19eb8d663d5dcad3b07c4',
      _id: '65e2bfd95afd172e9de23228' // This should be a string representation of ObjectId
    },
    {
      questionId: '65e19eb8d663d5dcad3b07be',
      answerId: '65e19eb8d663d5dcad3b07bf',
      _id: '65e2bfd95afd172e9de23229' // This should be a string representation of ObjectId
    }
  ];
  
  // Function to evaluate scores
  const evaluateScores = (adminData, userData) => {
    let score = 0;
  
    for (const adminQuestion of adminData) {
      for (const userQuestion of userData) {
        // Check if question IDs match
        if (adminQuestion.question === userQuestion.questionId) {
          // If options also match, increase score
          if (adminQuestion.options === userQuestion.answerId) {
            score++;
          }
          // Break the loop once a match is found
          break;
        }
      }
    }
  
    return score;
  };
  
  // Call the function to get the score
  const score = evaluateScores(adminData, userData);
  console.log('Score:', score);
  


  [
    {
      question: '65e19eb8d663d5dcad3b07c8',
      options: '65e19eb8d663d5dcad3b07cc',
      _id: new ObjectId('65e2bdd6c6b3db4ccc3b0516')
    },
    {
      question: '65e19eb8d663d5dcad3b07c3',
      options: '65e19eb8d663d5dcad3b07c4',
      _id: new ObjectId('65e2bdd6c6b3db4ccc3b0517')
    }
  ]
  [
    {
      questionId: '65e19eb8d663d5dcad3b07c8',
      answerId: '65e19eb8d663d5dcad3b39cc',
      _id: new ObjectId('65e2bfd95afd172e9de23227')
    },
    {
      questionId: '65e19eb8d663d5dcad3b07c3',
      answerId: '65e19eb8d663d5dcad3b07c4',
      _id: new ObjectId('65e2bfd95afd172e9de23228')
    },
    {
      questionId: '65e19eb8d663d5dcad3b07be',
      answerId: '65e19eb8d663d5dcad3b07bf',
      _id: new ObjectId('65e2bfd95afd172e9de23229')
    }
  ]
  