import React from "react";
import lightLogo from "../assets/dark-theme-fyp-logo-removebg-preview-scaled.png";

const ResDialog = ({ papers = [] }) => {
  return (
    <div className="flex justify-center space-x-6 items-center p-12 rounded-[80px] bg-zinc-700 ml-4">
      <span className="w-[5%] rounded-full" >
          <img src={lightLogo} className="rounded-full h-10 w-10  bg-zinc-950 p-2" alt="app-logo"  />
      </span>
      <span className="w-[95%]">
          {papers && (
            <>
              <table className="w-full text-sm text-left rtl:text-right text-gray-400">
              <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">Title</th>
                      <th scope="col" className="px-6 py-3">Publication Date</th>
                      <th scope="col" className="px-6 py-3">Authors</th>
                      <th scope="col" className="px-6 py-3">Score</th>
                  </tr>
              </thead>
              <tbody>
                  {papers.map((paper, index) => (
                      <tr key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-600">
                          <td className="px-6 py-4"><a href={paper.metadata.link[0]}>{paper.metadata.title}</a></td>
                          <td className="px-6 py-4">{paper.metadata.published_date}</td>
                          <td className="px-6 py-4">{paper.metadata.categories ? paper.metadata.authors.join(', ') : 'No authors available'}</td>
                          <td className="px-6 py-4">{paper.score}</td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </span>
    </div>
  )
}

export default ResDialog