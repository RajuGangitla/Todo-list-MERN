import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";

const Spinnerr = () => {
  return (
    <Wrapper>
      <div>
        <Spinner animation="border" className="spinner"/>
      </div>
    </Wrapper>
  );
};
export default Spinnerr;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;
  height: 100vh;
  .spinner{
    width: 5rem;
    height: 5rem;
    color: blanchedalmond;
  }
`;
