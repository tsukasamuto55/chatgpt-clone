const Form = ({ submitHandler, setPrompt, prompt }) => {
  return (
    <form className='form-section' onSubmit={submitHandler}>
      <textarea
        rows='5'
        className='form-control'
        placeholder='Ask me anything...'
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      ></textarea>
      <button type='submit' className='btn'>
        Generate Response
      </button>
    </form>
  );
};

export default Form;
