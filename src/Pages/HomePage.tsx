import { Link } from "react-router-dom";
import Styled from "../Components/styled";

export default function HomePage() {
  return (<>
    <Link className={Styled.linkClassNames} to="/search">Begin</Link>
  </>)
}