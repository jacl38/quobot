import { Link } from "react-router-dom";
import Styled from "../Components/styled";

export default function HomePage() {
  return (<>
    <Styled.PageTitle>QuoBot &ndash; Real or AI?</Styled.PageTitle>

    <Styled.Paragraph className="my-8 animate-fadeSlideIn">
      Welcome to QuoBot! Test yourself to differentiate between quotes
      from real authors and historical figures versus similar ones generated
      by OpenAI's advanced Large Language Model, ChatGPT.
    </Styled.Paragraph>

    <Styled.Paragraph className="my-8 opacity-0 animate-fadeSlideIn animation-delay-100">
      If you guess with an accuracy of 50%, this means that the AI is able to
      generate believable quotes that may be indistinguishable from real ones.
      Greater accuracy means that you are able to tell the difference between
      real and AI-modified quotes.
    </Styled.Paragraph>

    <div className="flex justify-center opacity-0 animate-fadeSlideIn animation-delay-200">
      <Link className={Styled.linkClassNames} to="/search">Let's Begin</Link>
    </div>
  </>)
}