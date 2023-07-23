import { Link } from "react-router-dom";
import Styled from "../Components/styled";

export default function HomePage() {
  return (<>
    <Styled.PageTitle>QuoBot &ndash; Real or AI?</Styled.PageTitle>

    <Styled.Paragraph className="my-8">Welcome to QuoBot! Test yourself to differentiate between quotes
      from real authors and historical figures versus similar ones generated
      by OpenAI's advanced Large Language Model, ChatGPT.</Styled.Paragraph>

    <div className="flex justify-center">
      <Link className={Styled.linkClassNames} to="/search">Let's Begin</Link>
    </div>
  </>)
}