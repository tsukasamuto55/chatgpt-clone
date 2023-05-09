import { useState } from 'react';
import Form from './components/Form';
import { Configuration, OpenAIApi } from 'openai';
import './App.css';

function App() {
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [outputs, setOutputs] = useState([]);
  const [prompt, setPrompt] = useState('');

  const clickHandler = async e => {
    e.preventDefault();

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
  };

  const changeHandler = e => {
    setModel(e.target.value);
  };

  return (
    <>
      <div className='model__container'>
        <label htmlFor='model' className='model__label'>
          Choose a chat model
        </label>
        <select
          className='model__select'
          onChange={changeHandler}
          name='model'
          id='model'
        >
          <option value='gpt-3.5-turbo'>gpt-3.5-turbo</option>
          <option value='gpt-4'>gpt-4</option>
        </select>
      </div>

      <Form clickHandler={clickHandler} setPrompt={setPrompt} prompt={prompt} />

      {outputs.map((output, index) => (
        <div key={index}>
          <p>{prompt}</p>
          <p>{output}</p>
          <br />
        </div>
      ))}
    </>
  );
}

export default App;
