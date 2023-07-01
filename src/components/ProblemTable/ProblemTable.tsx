import { problems } from '@/mockProblems/problems';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { AiFillYoutube } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import YouTube from 'react-youtube';

type ProblemTableProps = {};

const colorToProblem: { [diffuculty: string]: string } = {
  Easy: 'text-dark-green-s',
  Medium: 'text-dark-yellow',
  Hard: 'text-dark-pink'
};

const colorToId = (key: number): string => {
  return key % 2 === 1 ? 'bg-dark-layer-1' : '';
};

const ProblemTable: FC<ProblemTableProps> = () => {
  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: ''
  });

  const changeStatusVideo = (videoId: string) => {
    setYoutubePlayer({
      isOpen: !!videoId,
      videoId: videoId || ''
    });
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        changeStatusVideo('');
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      <tbody className="text-white">
        {problems.map((problem, key) => {
          const difficultyProblem = colorToProblem[problem.difficulty];

          return (
            <tr className={colorToId(key)} key={problem.id}>
              <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                <BsCheckCircle fontSize={18} width={18} />
              </th>

              <td className="px-6 py-4">
                <Link
                  href={`/problems/${problem.id}`}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  {problem.title}
                </Link>
              </td>

              <td className={`px-6 py-4 ${difficultyProblem}`}>
                {problem.difficulty}
              </td>

              <td className="px-6 py-4">{problem.category}</td>

              <td className="px-6 py-4">
                {problem.videoId ? (
                  <AiFillYoutube
                    fontSize={28}
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => {
                      changeStatusVideo(problem.videoId as string);
                    }}
                  />
                ) : (
                  <p className="text-gray-400">Coming soon</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>

      {youtubePlayer.isOpen && (
        <tfoot className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
          <div className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"></div>
          <div className="w-full z-50 h-full px-6 relative max-4-4xl">
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="w-full relative">
                <IoClose
                  fontSize={35}
                  className="cursor-pointer absolute -top-16 right-0"
                  onClick={() => {
                    changeStatusVideo('');
                  }}
                />
                <YouTube
                  videoId={youtubePlayer.videoId}
                  loading="lazy"
                  iframeClassName="w-full min-h-[500px]"
                />
              </div>
            </div>
          </div>
        </tfoot>
      )}
    </>
  );
};
export default ProblemTable;
