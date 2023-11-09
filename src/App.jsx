import { useState } from 'react';
import Form from './components/Form';
import { Configuration, OpenAIApi } from 'openai';
import './App.css';

function App() {
  const [model, setModel] = useState('gpt-4-1106-preview');
  const [outputs, setOutputs] = useState([]);
  const [prompt, setPrompt] = useState('');

  const submitHandler = async e => {
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

    setPrompt(''); // reset user input
    console.log(response.data.usage);
    setOutputs(prevOutputs => [
      // to me, prevOutputs makes more sense
      ...prevOutputs,
      {
        id: crypto.randomUUID(),
        prompt: prompt,
        output: response.data.choices[0].message.content,
      }, // create object which saves past prompts
    ]);
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
          <option value='gpt-3.5-turbo-1106'>gpt-3.5 Turbo</option>
          <option defaultValue={model} value='gpt-4-1106-preview'>
            GPT-4 Turbo
          </option>
        </select>
      </div>

      <Form
        submitHandler={submitHandler}
        setPrompt={setPrompt}
        prompt={prompt}
      />

      {outputs.map(item => (
        <div key={item.id}>
          <p className='user-prompt'>{item.prompt}</p>
          <p>{item.output}</p>
          <br />
        </div>
      ))}
    </>
  );
}

export default App;
