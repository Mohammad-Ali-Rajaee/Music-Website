const Form = () => {
  return (
    <form className="flex items-center w-max rounded-md" >
      <input className="h-10 w-52 pl-4 rounded-l-md focus-within:outline-none" type="text" placeholder="Search Music Here ..." />
      <button type="submit">
        <span class="lnr lnr-magnifier rounded-r-md h-10 w-10 flex items-center justify-center text-white"></span>
      </button>
    </form>

  );
};

export default Form;
