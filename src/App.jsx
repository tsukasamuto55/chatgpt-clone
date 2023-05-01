import { useState } from 'react';
import Form from './components/Form';
import { Configuration, OpenAIApi } from 'openai';

function App() {
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [outputs, setOutputs] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = async e => {
    e.preventDefault();
    setIsLoading(true);

    const configuration = new Configuration({
      organization: import.meta.env.VITE_ORGANIZATION_ID,
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: model,
      messages: [{ role: 'user', content: prompt }],
    });

    setOutputs(currentOutputs => [
      ...currentOutputs,
      response.data.choices[0].message.content,
    ]);
    console.log(prompt);
    setIsLoading(false);
  };
  return (
    <>
      <Form clickHandler={clickHandler} setPrompt={setPrompt} prompt={prompt} />
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        outputs.map((output, index) => (
          <div key={index}>
            <p>{prompt}</p>
            <p>{output}</p>
            <br />
          </div>
        ))
      )}
    </>
  );
}

export default App;
