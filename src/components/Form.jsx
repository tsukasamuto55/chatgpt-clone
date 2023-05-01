const Form = ({ clickHandler, setPrompt, prompt }) => {
  return (
    <div className='form-section'>
      <textarea
        rows='5'
        className='form-control'
        placeholder='Ask me anything...'
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      ></textarea>
      <button type='submit' onClick={clickHandler} className='btn'>
        Generate Response
      </button>
    </div>
  );
};

export default Form;
