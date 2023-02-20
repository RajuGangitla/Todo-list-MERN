import { useAppContext } from "../context/appContext";
import styled from "styled-components";

const Form = () => {
  const { search, setSearch } = useAppContext();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Wrapper>
      <div className="form">
        <form>
          <input
            type="text"
            name="search"
            value={search}
            placeholder="Enter a todo . . ."
            className="task-input"
            onChange={handleChange}
            required
          />
        </form>
      </div>
    </Wrapper>
  );
};
export default Form;

const Wrapper = styled.div`
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .task-input {
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    max-width: 800px;
    width: 100%; // set the default width to 100%
  }
`;
