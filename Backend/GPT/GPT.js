// urgency classifier function
checkUrgency = async (
  gender = "unknown",
  age = "unknown",
  situation = "unknown"
) => {
  try {
    // initialization
    const OpenAI = require("openai");
    require("dotenv").config();
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // prompt
    const message = `The patient's gender is ${gender}, and the age is ${age}. ${situation}. Classify whether this is critical (emergency prioritizes the patient) or non-critical (subject to wait time) in the Canadian emergency system. Your output must be either 'urgent' or 'non-urgent'.`;

    // use gpt
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
      temperature: 0,
      max_tokens: 5,
    });
    return response.choices[0].message.content;
  } catch (err) {
    return err.message;
  }
};

// sample use of checkUrgency function
// Define the main async function to use await
async function main() {
  try {
    let urgency = await checkUrgency("male", 63, "tummy ache and mouth bleeds");
    console.log(urgency);
  } catch (error) {
    // This will catch any errors thrown by the checkUrgency function
    console.error("Error:", error);
  }
}

// Call the main function
main();
