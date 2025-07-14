import { InferenceClient } from '@huggingface/inference'

const api_Key = import.meta.env.VITE_API_KEY

const hf = new InferenceClient(api_Key);


export const getSimplified = async (page, desc) => {
  const completion = await hf.chatCompletion({
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    messages: [
      {
        role: "system",
        content: `youre a helpful ai that helps people with simplified searches on the
        ${page.name} website/software help them get the best ${page.group} searches. 
        your answers should always be a space separated list of the search prompts nothing more especicially without bullet points.`,
      },
      {
        role: "user",
        content: desc,
      },
    ],
    
    temperature: 0.7,
    max_tokens: 2048,
  })

  const response = completion.choices[0].message.content
  console.log("AI:", response)
  return response
}