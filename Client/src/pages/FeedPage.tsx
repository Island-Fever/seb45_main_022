import Backdrop from '../components/common/Backdrop';
import Header from '../components/feed/Header';
import board from '../assets/feed/board.png';
import Main from '../components/feed/Main';
import { Outlet, useParams } from 'react-router';
import useFeedList from '../hooks/useFeedList';
import LoadingBar from '../components/common/LoadingBar';
import { Feed } from '../api/feed';
import { BackButton } from '../components/common/BackButton';
import { FrontButton } from '../components/common/BackButton';

const FeedPage = () => {
  const { categoryCodeParam } = useParams();
  const categoryCode = Number(categoryCodeParam);

  const sectionStyle = {
    backgroundImage: `url(${board})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const { feedListQuery } = useFeedList(categoryCode);
  const {
    data: feedList,
    isLoading,
    isError,
  } = feedListQuery as {
    data: Feed[];
    isLoading: boolean;
    isError: boolean;
  };

  if (isLoading)
    return (
      <Backdrop>
        <LoadingBar />
      </Backdrop>
    );

  if (isError) {
    return <p>{isError.toString()}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-feed bg-center bg-cover">
      <Backdrop>
        <div className="flex flex-col justify-between items-center gap-8 mt-8">
          <div className=" w-[1080px] h-[720px] p-[42px]" style={sectionStyle}>
            <Header categoryCode={categoryCode} />
            <Main feedList={feedList} categoryCode={categoryCode} />
          </div>
          <div className="flex gap-[900px]">
            {categoryCode !== 1 && <BackButton categoryCode={categoryCode} />}
            {categoryCode !== 13 && <FrontButton categoryCode={categoryCode} />}
          </div>
        </div>
      </Backdrop>
      <Outlet />
    </div>
  );
};

export default FeedPage;
